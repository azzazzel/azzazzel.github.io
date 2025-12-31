---
layout: post
title: Liferay - preserve GWT portlet state between reloads
date: 2011-03-23 07:53:31 +0100
mt_id: 20
blog_id: 1
post_id: 20
basename: liferay_preserve_gwt_portlet_state_between_reloads
categories:
  - liferay
  - tips_and_tricks
topic:
  - "[[Liferay]]"
---

One of the problems with GWT _(which is even more noticeable in portal environment)_ is preserving it's state between page reloads. In a GWT-only application _(or single portlet on the page case)_ one can give user no other option but using only GWT controls to practically avoid page reloads. In most cases however this is not really possible nor wise thing to do. In portlet environments in particular, reloading the page is a very commmon thing to do, giving all portlets a chance to refresh their content after some action has taken place. The thing is, GWT portlets will, by default, render their initial state, which may not be what user expects.

For example, consider the GWT `Chatroom` portlet I was using in my previous posts [Liferay GWT portlet - how to make it "instanceable" and use GWT RPC](/blog/2011/01/liferay_gwt_portlet_how_to_make_it_instanceable_and_use_gwt_rpc/) and [Liferay GWT portlet - replacing GWT-RPC with JSON](/blog/2011/03/liferay_gwt_portlet_replacing_gwt-rpc_with_json/). Imagine user has entered a chatroom. Then she clicks on some other portlet on the page. The page is reloaded and `Chatroom` portlet returns to it's initial state. The user will have to enter the room again every time she clicks on another portlet. Let's see how this can be fixed.

<!--more-->

Many people think about GWT state as a summary of the states of all used GWT widgets (text fields, combo boxes, grids, tabs, ...). Instead I prefer to think in terms of application or "business logic" states. If you change the point of view, it may turn around not all GUI components contain significant information that must be saved and restored. For example it may be not so important to have particular tab selected or value of particular text box updated.

In case of `Chatroom` portlet, there are 2 states:

- `initial state` - the user is not in a chatroom (she may never entered one or just left one)
- `chatroom entered` - the user is in a chatroom

In fact this is made very clear in the code by providing 2 methods [displayInitialState](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/master/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/Chatroom.java#L180) and [displayChatroomState](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/master/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/Chatroom.java#L167) responsible for rendering appropriate GUI elements in particular states. Up until now during `Chatroom` initialization the [displayInitialState](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/master/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/Chatroom.java#L180) method was called. To fix the above problem the initialization has to be changed to call appropriate method depending on what is the current state. The question is where _(on the client side)_ one can store portlet state information so it survives page reloads.

The obvious answer is "cookies". However it has some drawbacks _(the major one being the fact that they may be unsupported/disabled in some browsers)_. Fortunately back in 2008 [Thomas Frank](http://www.thomasfrank.se/about.html) wrote and made public a very clever JavaScript library called [sessvars.js](http://www.thomasfrank.se/sessionvars.html) which uses `widow.name` property to store information that need to survive page reloads. In order to use it in the portlet it has to be added to the page and this is what [this commit](https://github.com/azzazzel/gwt-chatrooms-portlet/commit/5fc9f5914f7d38e354b6398616d03528ff36d8fd) does.

Now in order to actually save and load portlet state, the `ChatroomPortlet` object (defined in [chatrooms.js](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/eebb9c725b46a937c948977f3f47a703d34884e1/docroot/js/chatrooms.js)) has to be extended with 2 new methods: `setState` and `getState`. These methods respectively write to or read from a map*(key being portlet id and value portlet state)* which thanks to [sessvars.js](http://www.thomasfrank.se/sessionvars.html) can survive page reloads.

Having this prepared, the `Chatroom` class can be refactored to render portlet differently depending on it's state. This can be combined with GWT's history mechanism to handle clicks on browser's back and forward buttons. [This is how modified the code looks like](https://github.com/azzazzel/gwt-chatrooms-portlet/blob/eebb9c725b46a937c948977f3f47a703d34884e1/docroot/WEB-INF/src/com/commsen/sample/portlet/chatrooms/client/Chatroom.java). Basically the steps were as follows:

- provide `saveState` method to both save the current state and add history token
- call `saveState` method every time portlet state changes
- provide `handleState` method to render portlet UI according to current state
- make `Chatroom` class implement `ValueChangeHandler` and provide `onValueChange` method to handle history tokens.
- provide `getStateFromToken` method to retrieve the portlet state from history token.

All of the above mentioned changes are in [this commit](https://github.com/azzazzel/gwt-chatrooms-portlet/commit/eebb9c725b46a937c948977f3f47a703d34884e1). Feel free to explore what has changed and how.
