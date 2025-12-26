---
layout: post
title: More "Simple" than "XStream"
date: '2010-07-20 00:56:21 +0200'
mt_id: 13
blog_id: 1
post_id: 13
basename: more_simple_than_xstream
categories:
  - tips_and_tricks
  - misc
---

I guess every Java developer dealing with JAVA/XML serialization/deserialization knows about [XStream](http://xstream.codehaus.org). I was using it for years until yesterday. What happened yesterday? I found out XStream dos not work out of the box with [GAE](http://code.google.com/appengine/). Well is's not exactly XStream's fault. A lot of stuff does not work properly with GAE due to its limitations and odd security restrictions. But my hope to quickly find patch/workaround, went away as soon as I realized the problem was reported to XStream over an year ago ([http://jira.codehaus.org/browse/XSTR-566](http://jira.codehaus.org/browse/XSTR-566)) and there is still no good solution.

<meta http-equiv="content-type" content="text/html; charset=utf-8" />

This way I was forced to look for alternatives. And I found [Simple](http://simple.sourceforge.net/)! Conceptually it's a very similar to XStream. Serialization is really simple to use and revolves around several annotations and a single persister object. I got the impression it's noticeably faster than XStream. It's feature list is quite long (it even claims to be bean version tolerant) but so far I've used the standard stuff like converters, transformers, persister, etc.

However since "Simple"

- does not depend on 3rd party libraries
- is available in central Maven repository
- works out of the box with GAE
- is capable of doing everything XStream is doing

it's about to become my number one XML serialization/deserialization tool. At least until I discover it's dark sides.
