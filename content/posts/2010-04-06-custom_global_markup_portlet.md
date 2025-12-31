---
layout: post
title: Custom global markup portlet
date: 2010-04-06 00:40:01 +0200
mt_id: 10
blog_id: 1
post_id: 10
basename: custom_global_markup_portlet
image: /assets/2010-04-06-custom_global_markup_portlet/CustomGlobalMarkupConfig.png
categories:
  - tips_and_tricks
  - liferay
topic:
  - "[[Liferay]]"
---

What would you do if a customer demands to "integrate" his Liferay based corporate portal with [Google Analytics](http://www.google.com/analytics), [Geminus](http://www.gemius.com/), [ClickTale](http://www.clicktale.com/), [Crazy Egg](http://www.crazyegg.com/), and whole bunch of other analytics tools available out there?

As you probably know, such services typically provide some piece of javascript (code or file) which needs to be added to every page of monitored web site. Each service also provides unique customer code/key (which is either already part of the javascript provided or needs to be placed in specific place). Regardless of whether using all of them at the same time is a smart thing to do, there are a few technical problems to solve:

- How to add custom code to every portal page
- How to deal with unique codes/keys through development, testing, staging, production phases
- How to minimize the impact of changing/removing custom code in production environment

<!--more-->

There are few ways to solve the first case

**Make the code part of the theme.**

This is easy to do but it has some drawbacks. First of all, depending on how theme is applied, the code may end up on every page in every community or only in few rarely visited pages. Also if your portal uses a number of themes than you need to either make a common theme and make the rest extend it, or you need to add it to each theme. This approach may be a serious maintenance challenge.

You may solve the problem with unique codes/keys by using portal properties but you'll not be able to easily modify or remove the java script code if you have disabled (and you should) hot deployment on production servers.

**Create custom portlet and add it to every page.**

Samuel Kong's excellent post [http://www.liferay.com/web/samuel.kong/blog/-/blogs/adding-a-javascript-to-every-page](http://www.liferay.com/web/samuel.kong/blog/-/blogs/adding-a-javascript-to-every-page) explains how to add javascript to every page. However be aware that if you blindly follow the example you'll add the code to EVERY page (not every page in given community). Following this approach you'll have to choose between two options

- one portlet having all javascript codes
- separate portlet per javascript code (or group of codes)

The first one is only acceptable if all javascript codes can ALWAYS be placed together and it kind of violates the "design by responsibility" concept. The second approach on the other hand deploys a lot of boilerplate code which in some cases may have impact on performance.
Unique codes/keys may be provided in portlet preferences but still it's not very convenient when portlets are automatically added via `layout.static.portlets.all` property. Also, as you have probably guessed, this approach does not solve the problem with modifying/removing javascript code in production environment.

**Use custom-global-markup-portlet**

custom-global-markup-portlet was written to solve all of the problems described above. The portlet is based on Samuel Kong's example, but it also provides convenient management interface in Liferay's control panel:

![Custom Global Markup Portlet Configuration](/assets/2010-04-06-custom_global_markup_portlet/CustomGlobalMarkupConfig.png)

As you can see from the above screenshot portal administrator can easly add/modify/delete any markup (javascript, CSS, HTML, ...). Here is how the portal look like after you save the above markups:

![Portal changed via Custom Global Markup Portlet](/assets/2010-04-06-custom_global_markup_portlet/CustomGlobalMarkupResult.png)

As you may have already noticed there are a few important features. First of all the markup can be divided into multiple entries and each entry can be enabled/disabled and placed on top (in <head> section) or bottom (before </html>) of the page. All entries are persisted into database which eliminates potential problems with maintaining different portlet preferences in different environments (development, staging, production). Also note that custom-global-markup-portlet is community scoped, which allows adding markup to pages of specific community.

You can download the latest version of custom-global-markup-portlet here: [http://github.com/azzazzel/Liferay-plugins/downloads](http://github.com/azzazzel/Liferay-plugins/downloads). It is part of [Commsen Lifery plugins](http://github.com/azzazzel/Liferay-plugins) which is free and open source project hosted at [GitHub](http://github.com) and released under [LGPL license](http://www.gnu.org/licenses/lgpl-2.1.html). It is developed with [liferay-maven-sdk](http://github.com/azzazzel/liferay-maven-sdk) and uses [Git SCM](http://git-scm.com/).
