---
layout: post
title: Simple mobile device emulator in Firefox
date: 2011-10-28 01:22:12 +0200
mt_id: 21
blog_id: 1
post_id: 21
basename: simple_mobile_device_emulator_in_firefox
image: /assets/mobile_device_emulator.jpg
categories:
  - tips_and_tricks
  - software
topic:
  - "[[Personal projects]]"
---

After my "Pluggable mobile device detection" presentation during [Liferay Europe Symposium](http://www.liferay.com/events/liferay-symposiums/europe-2011/agenda) a lot of people asked about the mobile device emulator I was using. The truth is, it's not a real "emulator" but a simple combination of html page and a Firefox user script. However, it does the trick and for most people seems to be good enough (at least for a start). So, I made a promise to share it and finally found the time to blog about it.

<!--more-->

But before I go into details, here is a short video which demonstrates what it does (for those of you who didn't attend Liferay Europe Symposium and have no idea what I'm writing about):

<iframe width="560" height="315" src="http://www.youtube.com/embed/__gvtlJ-KLI" frameborder="0" allowfullscreen=""></iframe>

Now the details. First, make sure you have recent Firefox version installed. You'll also need one of the following Firefox extensions:

- [Scriptish](http://scriptish.org/)
- [Greasemonkey](https://addons.mozilla.org/pl/firefox/addon/greasemonkey/)

_NOTE: I've only tested it with Scriptish but it should work with Greasemonkey as well._

Having this in place you are ready to "install" the emulator. It's source code is available on [GitHub](https://github.com/azzazzel/phone_emulator). The `page` folder contains the host page together with required js, css and image files. I personally have [Apache](http://httpd.apache.org/) running locally on my machine so I have these files in its `<DocumentRoot>` and access the emulator via [http://localhost/phone_emulator.html](http://localhost/phone_emulator.html). However feel free to use any HTTP server you like (it may even work if you simply put it into a folder and access it via `file:///path/to/folder/phone_emulator.html`).

The HTML file provides the GUI:

- the URL text box
- the device tabs (it uses [tabifier library](http://www.barelyfitz.com/projects/tabber/) to create the tabs from `div` elements)
- the background image and the `iframe` element for each device

If you wish to add more devices simply

- add the following code replacing `${...}` with appropriate values

```html
<div
  class="device"
  title="<b>${TEXT TO BE DISPLAYED IN THE TAB}</b>"
>
  <div id="<b>${UNIQUE DEVICE ID}</b>">
    <input
      type="hidden"
      class="deviceUA"
      id="<b>${UNIQUE DEVICE ID}</b>_ua"
      value="<b>${DEVICE'S USER AGENT STRING}</b>"
    />
    <iframe
      class="deviceResult"
      id="<b>${UNIQUE DEVICE ID}</b>_result"
    ></iframe>
  </div>
</div>
```

- add appropriate CSS styles to display the background image and position the iframe

Finally, you need to install the [user script](https://github.com/azzazzel/phone_emulator/raw/master/userscript/phone_emulator.user.js). Its purpose is to omit "same origin" policy and load requested URL in every available `iframe`, each time changing the `User-Agent` header appropriately. The scripts is by default hooked to [http://localhost/phone_emulator.html](http://localhost/phone_emulator.html) location and will not run if you have placed the HTML file somewhere else. However you may edit the

```javascript
// @include        http://localhost/phone_emulator.html*
```

line and provide one or more different locations.

This is it! Just type [http://localhost/phone_emulator.html](http://localhost/phone_emulator.html) in Firefox and you should have the emulator runnig. To make sure you have installed it correctly, check the little green [Scriptish](http://scriptish.org/) icon in Firefox's status bar. It should say that 1 user script is enabled.

**Disclaimer**:

_This is not a real emulator and should not be used as such. It was NOT tested and is known to have at least the following issues/limitations:_

- the rendering is done by Firefox which may support a lot more features then actual device's browser
- it only emulates the page in the provided location. If you click on a link it the emulator it will be loadded using standard Firefox `User-Agent` header!
- some Javascripts (particularly Google APIs) and/or CSS may cause conflicts and not display properly

You've been warned, use it on your own risk ;) And of course if you feel you can make it better, extend it or build something else on top of it, go ahead and do so (just let me know).
