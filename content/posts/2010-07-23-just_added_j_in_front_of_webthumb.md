---
layout: post
title: Just added 'J' in front of WebThumb
date: '2010-07-23 00:21:42 +0200'
mt_id: 14
blog_id: 1
post_id: 14
basename: just_added_j_in_front_of_webthumb
categories:
  - software
---

Yep, good guess, a Java API to [bluga.net webthumb](http://webthumb.bluga.net) in now available. Making your Java application display website thumbnails is now something really easy to implement. Get your API KEY form [bluga.net webthumb](http://webthumb.bluga.net), download [JWebThumb](http://sourceforge.net/projects/jwebthumb/files/) and start requesting and fetching thumbnails with just a few lines of code.

Why [bluga.net webthumb](http://webthumb.bluga.net)? Nope, I'm not gonna tell you it's the best tool out there, having unique features, ... or any of this marketing bla bla. The truth is, it was the first tool I found, that met my requirements

- custom size thumbnails
- support for both JPG an PNG
- web services or REST based API
- either creates thumbnail instantly or sends notification when done
- free version

<!--more-->

I gave it a try and it turned out it's quite fast and reliable. Not that I have been heavily using it, but so far I haven't had any problems with it. Most of the time when I request a thumbnail it estimates it will take about 20 second but in fact my servlet receives notification in less than 2 seconds.

So, after a few days of playing with webthumb's API I had a pile of Java snippets testing different aspects of it. Organizing the chaos resulted in version 0.1 of **JWebThumb** project. Added data model and error handling on the top of that and 0.2 version was ready to go public (under LGPL). As usual Maven helped create a [project site](http://jwebthumb.sourceforge.net/) from where you can learn how to use **JWebThumb**, the [source code](http://github.com/azzazzel/JWebThumb) is on GitHub and [downloads](http://sourceforge.net/projects/jwebthumb/files/) are available on SourceForge. If you find a bug or missing feature don't hesitate to [create an issue](http://github.com/azzazzel/JWebThumb/issues).

I consider 0.2 an early beta version. It works but it's not extensively tested and may have bugs. It uses [XStream](http://xstream.codehaus.org/) for XML serialization and deserialization thus you can not yet use it on [GAE](http://appengine.google.com/). So version 0.3 is already underway having [XStream](http://xstream.codehaus.org/) replaced by [Simple](http://simple.sourceforge.net/) so it works on [GAE](http://appengine.google.com/). But before I release it I would like to test it a bit more and perhaps add support for ['status' requests](http://webthumb.bluga.net/apidoc#status) missing in 0.2. So stay tuned, it shouldn't take too long.
