---
layout: post
title: 'About complexity, modularity and OSGi '
date: '2013-02-06 10:56:02 +0100'
mt_id: 29
blog_id: 1
post_id: 29
basename: about_complexity_modularity_and_osgi
categories:
  - misc
  - OSGi
twitter: true
---

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Today I followed the link from this tweet:

<blockquote class="twitter-tweet"> <p>&ldquo;@<a href="https://twitter.com/nbartlett">nbartlett</a> New blog post: No Solution for Complexity?
  <a href="http://t.co/oZEdelzs" title="http://njbartlett.name/2013/02/04/no-solution-for-complexity.html">njbartlett.name/2013/02/04/no-&hellip;</a>
  <a href="https://twitter.com/search/%23OSGi">#OSGi</a>&rdquo;</p> &mdash; Raymond Aug&eacute; (@rotty3000)
  <a href="https://twitter.com/rotty3000/status/298968466914942977">February 6, 2013</a>
</blockquote>

which leads to a [this article](http://njbartlett.name/2013/02/04/no-solution-for-complexity.html). I read it quickly on my cell phone and got the following impression **"The solution for Complexity is modularity. The way you properly do modularity is OSGi. So OSGi is the solution for complexity!"**

<!--more-->

Without thinking too much I responded:

<blockquote class="twitter-tweet"> <p>@<a href="https://twitter.com/rotty3000">rotty3000</a> As much as I like
  <a href="https://twitter.com/search/%23OSGi">#OSGi</a>, I don't like articles that suggest it's the universal solution to all complexity issues.</p> &mdash; Milen Dyankov (@milendyankov)
  <a href="https://twitter.com/milendyankov/status/299057649595580416">February 6, 2013</a>
</blockquote>

Which caused an immediate reaction:

<blockquote class="twitter-tweet"> <p>@<a href="https://twitter.com/milendyankov">milendyankov</a> I didn't suggest that at all /cc @<a href="https://twitter.com/rotty3000">rotty3000</a></p> &mdash; Neil Bartlett (@nbartlett)
  <a href="https://twitter.com/nbartlett/status/299062113996001282">February 6, 2013</a>
</blockquote>

We exchanged a few more tweets but as Twitter is not the best platform for explaining what one have in mind, I thought I'll write it here.

Let me start by stating that now that I have read the article again, I must admit my first impression wasn't exactly correct. I now understand the intention and generally agree with it. However the article takes a few shortcuts which I would like to argue with:

> If only there were a way to create "firewalls" between different parts of a large system, so that we could be absolutely sure that the functionality within each firewall cannot break merely from adding new functionality outside it. Then we could know precisely the scope of any change, and test only the things that can potentially break rather than the entire universe.

This would be true given than all the "firewalls" are completely independent of each other. Something I have never seen so far in any of the complex systems I've been working on in the last 10 years. And even if it was the case, you will need to take care of the "glue code", provide communication interfaces resistible to changes, ensure data consistency between modules, ...

I mean, think about SOA, the most modular approach I can think of. Can you "be **absolutely** sure" that when you change one service it will not brake any other? What about changing the data model for example? What about missing service? My experience tells me there is no such thing as "<u>absolutely</u> sure"!</p> <p>Need more visual example? OK, think about setting up a network. Each switch, router, ... is separate module placed in a rack, which in turn is also a module, ... Does this reduces the complexity of your network? Yes? Well, [think again](http://www.itdisasters.com/2009/10/15/can-you-find-the-network/):

![](http://www.itdisasters.com/wp-content/uploads/2009/10/wire_wrap1.png)

Modularity is a good thing, no doubt about it, but only when it makes sense for particular project and is done right! Sometimes it does solve complexity issues but sometimes it just moves them to different layer. And it has it's price.

> Nevertheless there is one technology that is mature, well proven and has stood the test of time: OSGi.<br/>
> . . .<br/>
> Look it up, and perhaps you could save your bank from making headlines for all the wrong reasons.

Absolutely agree with the first part. However will it really save your bank? Many believe OSGi is way too complex by itself. If fact I think this (whether true or not) is the main reason why OSGi is still not as popular and widely used as I would like it to be. May be Neil is right:

<blockquote class="twitter-tweet"> <p>@<a href="https://twitter.com/milendyankov">milendyankov</a> And I believe those who find OSGi complex are mistaken about the true source of that complexity.</p> &mdash; Neil Bartlett (@nbartlett)
  <a href="https://twitter.com/nbartlett/status/299082760658771969">February 6, 2013</a>
</blockquote>

but do the test yourself. Pick randomly 10 or 20 average developers and ask them to explain to you how Java class loading works. Or at least simply ask what is causing this message:

```
Exception in thread "main" java.lang.ClassCastException: com.my.company.MyClass cannot be cast to com.my.company.MyClass</code>
```

and see how many correct answers you get (in case you don't know [read this](http://plumbr.eu/blog/cryptic-error-messages-in-java)). Got many correct answers? Good for you, you have some really good developers around. Now try to ask the same but in context of JBoss, Glassfish, WebSphere, ... It becomes more complex right? Why?Among the other things, because it is modular. Jars, wars, ears, deployment contexts, ... Will OSGi reduce this complexity and save your bank? Well, it may or may not, depends on what your use case is.

### Don't get me wrong, OSGi is a great platform!

It's getting better and better with each release. And much easier to use ([Bndtools](http://bndtools.org), [iPOJO](http://felix.apache.org/site/apache-felix-ipojo.html), [Blueprint](http://wiki.osgi.org/wiki/Blueprint), ...) and much more user/administrator friendly ([Karaf](http://karaf.apache.org), [Virgo](http://www.eclipse.org/virgo/), ... ) then it used to be some years ago. And while it will not automatically solve all your modularity problems and reduce the complexity of your application it may indeed be very helpful.
