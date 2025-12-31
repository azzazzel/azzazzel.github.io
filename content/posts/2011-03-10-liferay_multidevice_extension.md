---
layout: post
title: Liferay multi-device extension
date: 2011-03-10 05:52:15 +0100
mt_id: 18
blog_id: 1
post_id: 18
basename: liferay_multidevice_extension
image: /assets/liferay_multi_device_extension.jpg
categories:
  - liferay
topic:
  - "[[Liferay]]"
  - "[[Personal projects]]"
---

**UPDATE: The extension described here targets Liferay 6.0. It was contributed to Liferay and is [available out of the box since Liferay 6.1](/blog/2012/05/mobile_device_detection_in_liferay_61)**

Almost every portal related RFI/RFP my company has received in the last couple of years contained some requirements about mobile version. Fortunately the times when every device had it's own idea of how web content should be served are gone. Nowdays we can afford to pretty much ignore [WML](http://en.wikipedia.org/wiki/Wireless_Markup_Language), [C-HTML](http://en.wikipedia.org/wiki/CHTML), ... as almost any modern device understands at least [XHTML Mobile Profile](http://en.wikipedia.org/wiki/XHTML_Mobile_Profile). However this does not always mean there can be one mobile version for all. Here are some typical requirements:

- make a dedicated version for iPhone (imitate iPhone interface to make it look like native application)
- allow to switch between mobile and desktop version if device is smartphone
- provide alternative input methods if device does not have QWERTY keyboard
- design dedicated version for tablets

I have spent some time thinking about how to address this issues with [Liferay Portal](http://www.liferay.com). Having some experience with [WURFL](http://wurfl.sourceforge.net), [Volantice](http://www.volantis.com/) and designing web applications for mobile devices in general, I thought it would be great if I could dynamically change Liferay's look and feel based on device capabilities. And this is how [Liferay multi-device extension](http://sourceforge.net/projects/liferaymultidev/) was born.

<!--more-->

Actually now there are 3 Liferay plug-ins which work together to deliver this functionality:

- **multi-device-ext plugin** ([https://github.com/azzazzel/liferay-multi-device-ext](https://github.com/azzazzel/liferay-multi-device-ext)) is the core plug-in. It provides the look and feel change logic, generic data model and "extension points" for other plug-ins which deliver things like device recognition and rule definition. It does so by employing Liferay's internal bus and can dynamically switch to new implementation when compatible plug-in is deployed. If you know how to replace Lucene with Solr, you know what I'm talking about.

- **wurfl-web** ([https://github.com/azzazzel/liferay-wurfl-web](https://github.com/azzazzel/liferay-wurfl-web)) plug-in delivers device recognition based on WURFL. It contains WURFL API but does not contain WURFLD DB and patches. By default it expects to find the database in `${liferay.home}/wurfl/wurfl-latest.zip` however you may change this in portal-ext.properties:

```
# Wurfl's main devices file
wurfl.main=${liferay.home}/wurfl/wurfl-latest.zip

# Wurfl's patch files
wurfl.patches=
```

- **device-rules-hook** ([https://github.com/azzazzel/liferay-device-rules-hook](https://github.com/azzazzel/liferay-device-rules-hook)) extends Liferay's look and feel management interface by adding additional tab "Device Rules". At the moment rules can be based on device's brand, model, operating system, browser and pointing method as well as whether the device is tablet, has QWERTY keyboard

Here is how it works:

<iframe title="YouTube video player" width="640" height="390" src="http://www.youtube.com/embed/2CvY4eLWMHQ" frameborder="0" allowfullscreen=""></iframe>

The plug-ins are not yet in Liferay community plug-ins repository. I could'n figure out how to upload the EXT plugin and the other two make no sense without it. You can download plug-ins from here: [http://sourceforge.net/projects/liferaymultidev/files/](http://sourceforge.net/projects/liferaymultidev/files/) or get the source code from [https://github.com/azzazzel](https://github.com/azzazzel) and build them yoursef. If you do so, please let me know what you think.
