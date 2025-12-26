---
layout: post
title: ATG session tracking cookies and subdomains.
date: '2009-01-29 14:50:58 +0100'
mt_id: 7
blog_id: 1
post_id: 7
basename: atg_session_tracking_cookies_and_subdomains
categories:
  - atg
  - tips_and_tricks
---

If an ATG based web application is available under few subdomains (domain.com, www.domain.com, shop.domain.com) keeping track of session cookies across subdomains may be a challenge. Session tracking cookies (like jsessionid) usually do not have domain property set, which means they are sent back to exactly the same host they came from. So if visitors switch to another subdomain while navigating through the application they would most likely end up having a new session. Depending on what information session holds, the number of visitors and how many simultaneous sessions the server can handle, this may or may not be a problem.

<!--more-->

The best solution is obviously not to let your visitors change the domain while browsing you site (for example by using relative links only). But if your application occupies the whole domain it may be easier and safer to set the domain property for all relevant cookies. Depending on what ATG modules you use, a number of cookies used for session tracking may vary.

Here is how this can be done on ATG 2006.3 running on JBoss 4.0.3.Since JBoss uses Tomcat as web container, we will add a valve to server.xml in which we'll replace a original `HttpServeltResponse` with custom wrapper. Actually this is a slightly modified version of the solution described here [https://jira.jboss.org/jira/browse/JBWEB-107](https://jira.jboss.org/jira/browse/JBWEB-107). So here is our valve:

```java
public class CookieRewriteValve extends ValveBase {
  private String domain = null;
  private String cookieNames = null;
  private Set cookiesToModify = null;

  public void postRegister(Boolean registrationDone) {
    if (registrationDone.booleanValue()) {
      if (cookieNames != null && cookieNames.trim().length() > 0) {
        cookiesToModify = new HashSet(Arrays.asList(cookieNames.toUpperCase().split(",\\s*")));
      }
    }
  }

  public void invoke(Request request, Response response) throws IOException, ServletException {
    CookieModifier.createThreadInstance(cookiesToModify, path, domain, secure, maxAge);
    response = new CookieRewriteResponseWrapper(response);
    request.setResponse(response);
    getNext().invoke(request, response);
  }

  public String getDomain() {
    return domain;
  }

  public void setDomain(String domain) {
    this.domain = domain;
  }

  public String getCookieNames() {
    return cookieNames;
  }

  public void setCookieNames(String cookieNames) {
    this.cookieNames = cookieNames;
  }
}
```

It has to be registered in "Engine" section of `<PATH_TO_JBOSS>/server/<SERVER_NAME>/deploy/jbossweb-tomcat55.sar/server.xml` like this

```xml
<Valve domain=".domain.com" cookieNames="jsessionid, ATG_SESSION_ID" className="cookie.rewrite.example.CookieRewriteValve"/>
```

At startup engine initializes declared valves and calls `postRegister` method on each. This is where we read, parse and store arguments. Later on the `invoke` method is called by the engine on every incoming request. This is where we create a new thread local instance of `CookieModifier` and wrap the original `Response` in `CookieRewriteResponseWrapper`. This wrapper is constructed by passing a reference to the original `Response`:

```java
public class CookieRewriteResponseWrapper extends org.apache.catalina.connector.Response

  protected Response res;

  public CookieRewriteResponseWrapper(Response res) {
    this.res = res;
  }
  ....
```

It also overwrites EVERY public method from `org.apache.catalina.connector.Response` like this:

```java
  public returnType methodName (parameters...) {
    return res.methodName (parameters...)
  }
```

except the `addCookie(Cookie cookie)` method which tries to get an instance of `CookieModifier` and use it to modify the cookie before it delegates the request to the original `Response` object:

```java
  public void addCookie(Cookie cookie) {
    CookieModifier cookieModifier = CookieModifier.getInstance();
    if (cookieModifier != null) {
      cookieModifier.modify(cookie);
    }
    res.addCookie(cookie);
  }
```

Finally here is how `CookieModifier` looks like:

```java
public class CookieModifier {

  protected String cookieDomain;
  protected Set cookiesToModify = null;
  protected boolean modifyAll = false;

  private static ThreadLocal threadInstance = new ThreadLocal();

  private CookieModifier(Set cookiesToModify, String cookieDomain) {
    this.cookieDomain = cookieDomain;
    this.cookiesToModify = cookiesToModify;
    if (cookiesToModify == null || cookiesToModify.isEmpty()) modifyAll = true;
  }

  public static void createThreadInstance(Set cookiesToModify, String cookieDomain) {
    threadInstance.set(new CookieModifier(cookiesToModify, cookieDomain));
  }

  public static CookieModifier getInstance() {
    return (CookieModifier) threadInstance.get();
  }

  public void modify(Cookie cookie) {
    if (modifyAll || cookiesToModify.contains(cookie.getName()))
      if (cookieDomain != null) cookie.setDomain(cookieDomain);
    }
  }

}
```

Note the static methods used to store a new instance of this class in current thread. It will become clear why this is important later.

So all we have to do now is to pack these classes in a jar file, place it in `<PATH_TO_JBOSS>/server/<SERVER_NAME>/lib` and add the valve line to `server.xml`. But if you try to run this, you will notice that while it works for "jsessionid" it does not for "ATG_SESSION_ID". This is because ATG itself wraps the `Response` object in DynamoHttpServletResponse which apparently does not make use of the original `addCookie` method! Fortunately though, ATG allows user to have custom implementations of `DynamoHttpServletResponse`. To tell ATG we have a custom implementation we need to add the following configuration to `/atg/dynamo/servlet/dafpipeline/DynamoHandler` component:

```
responseClass=cookie.rewrite.example.DynamoHttpServletResponseWrapper
```

Now when ATG needs to create `DynamoHttpServletResponse` it will actually create an instance of `DynamoHttpServletResponseWrapper`. But how can our implementation obtain access to appropriately configured instance of `CookieModifier`? It can do so because our `CookieRewriteValve`, executed earlier in the same thread, placed an instance of `CookieModifier` in thread local variable. Here is how `DynamoHttpServletResponseWrapper` looks like:

```java
public class DynamoHttpServletResponseWrapper extends DynamoHttpServletResponse {

  public void addCookie(Cookie cookie) {
    CookieModifier cookieModifier = CookieModifier.getInstance();
    if (cookieModifier != null) {
      cookieModifier.modify(cookie);
    }
    super.addCookie(cookie);
  }
}
```

That's it. Once we add this class to the jar created earlier and restart JBoss it should work like a charm ;)
