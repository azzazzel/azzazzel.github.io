---
layout: post
title: 'Liferay GWT portlet - replacing GWT-RPC with JSON '
date: '2011-03-17 19:05:14 +0100'
mt_id: 19
blog_id: 1
post_id: 19
basename: liferay_gwt_portlet_replacing_gwt-rpc_with_json
categories:
  - liferay
---

This is a continuation of my previous post [Liferay GWT portlet - how to make it "instanceable" and use GWT RPC](/blog/2011/01/liferay_gwt_portlet_how_to_make_it_instanceable_and_use_gwt_rpc/). The approach described there uses Liferay specific functionality called [PortalDelegateServlet](http://longgoldenears.blogspot.com/2008/03/portaldelegateservlet-servlet-session.html). This way one can easily use GWT RPC which somewhat simplifies client-server communication. However if you need to develop a JSR 286 portlet you need a more standard compatible way of doing AJAX calls. For this reason JSR 286 defines `serverResource` method and this post will show how to refactor the code to replace GWT RPC calls with exchanging JSON messages using serverResource method.

<!--more-->

## Let GWT know the prtlet URLs

First thing to do is to tell GWT what are the proper URLs to call the portlet. Therefore creating a `Chatroom` instance based on portlet id only, is no longer enough. To overcome this you need to provide a JavaScript object holding portlet URLs. _I, for example, have called it `ChatroomPortlet` and it's defined in [chatrooms.js](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/df808f66e36b1e0257c3d31bcd869779960f08a8/docroot/js/chatrooms.js) file._

Then, in [view.jsp](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/df808f66e36b1e0257c3d31bcd869779960f08a8/docroot/view.jsp), create and store that object instead of portlet id. _Of course for the purpose of this example only `resourceURL` is needed but in a real world scenario you'll probably also need `renderURL` and `actionURL`._ To map this JavaScript object to GWT class create JSNI class [ChatroomJsObject](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/df808f66e36b1e0257c3d31bcd869779960f08a8/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/ChatroomJsObject.java).

Next you need to modify [Chatroom](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/df808f66e36b1e0257c3d31bcd869779960f08a8/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/Chatroom.java)'s constructor to accept `ChatroomJsObject` instead of `String` representing portlet id. Of course this reflects how [GWTEntryPoint](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/df808f66e36b1e0257c3d31bcd869779960f08a8/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/GWTEntryPoint.java) creates `Chatroom` instances.

Have a look at [my commit](https://github.com/azzazzel/gwt-chatrooms-portlet/commit/df808f66e36b1e0257c3d31bcd869779960f08a8) to see what has changed.

## Create the JSR 286 portlet

Now you need to write a portlet and implement `serveResource` method. Basically the method contains the same logic that used to be in [ChatroomServiceImpl](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/9a084048e203bbf3c6642c522ceb60c51e8a480b/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/server/ChatroomServiceImpl.java). The only difference is that now it gets its input form JSON object and responds with JSON object. The portlet code is available [here](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/7da4cef3a7b9978da60c553d1704778ad280af30/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/server/ChatroomPortlet.java).

Of course don't forget to replace the default `MVCPortlet` with your own in [portlet.xml](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/7da4cef3a7b9978da60c553d1704778ad280af30/docroot/WEB-INF/portlet.xml)

Again [there is commit](https://github.com/azzazzel/gwt-chatrooms-portlet/commit/7da4cef3a7b9978da60c553d1704778ad280af30) which does above modifications, so you can check what has changed.

## Update GWT client-server calls

Having the portlet ready, it's time to change the GWT code to send and receive JSON to `resourceURL` instead of using GWT RPC. For this to work you need to add 2 GWT modules to [Chatrooms.gwt.xml](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/03a0e357411efae82fdd8160620b81c5b8e2b64b/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/Chatrooms.gwt.xml):

```
<inherits name="com.google.gwt.http.HTTP" />
<inherits name="com.google.gwt.json.JSON" />
```

To be able to convert JSON response to GWT class you'll have to provide another JSNI class [ChatroomMessageJsObject](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/03a0e357411efae82fdd8160620b81c5b8e2b64b/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/ChatroomMessageJsObject.java). Finally the `Chatroom` class itself needs to be updated:

- replace the body of `sendMessageToServer` method to create JSON object and send it to the portlet bu using RequestBuilder
- replace the body of `getMessages` method to covert JSON object from response to list of ChatroomMessageJsObject to be displayed.
- convert `lastMessageTime` form `Date` to `long` as there are some issues with passing dates in JSON

As usual you can refer to [my commit](https://github.com/azzazzel/gwt-chatrooms-portlet/commit/03a0e357411efae82fdd8160620b81c5b8e2b64b) to get an idea what and how has changed.

That's it. You are ready. Optionally you can do some cleanup by removing unused classes [like I did](https://github.com/azzazzel/gwt-chatrooms-portlet/commit/aa6b4a76b195316446df10e21b20d905e4ba77be).
