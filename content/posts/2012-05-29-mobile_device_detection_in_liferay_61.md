---
layout: post
title: Mobile device detection in Liferay 6.1
date: '2012-05-29 14:28:24 +0200'
mt_id: 26
blog_id: 1
post_id: 26
basename: mobile_device_detection_in_liferay_61
image: /assets/mobile_device_detection_liferay_6_1.jpg
categories:
  - liferay
---

I'm still getting a lot of questions about how to use the [multi-device extension](/blog/2011/03/liferay_multidevice_extension) in Liferay 6.1. The answer is, **you don't have to**! The code was contributed to Liferay and it's now available OOTB in Liferay 6.1.

<!--more-->

The following comparison table will give you a better idea of what went where:

<table width="100%" border="1" cellpadding="1" cellspacing="1">
  <tbody>
    <tr>
      <th width="34%" style="text-align: center; ">&nbsp;Feature</th>
      <th width="33%" style="text-align: center; ">Liferay 6.0&nbsp;</th>
      <th width="33%" style="text-align: center; ">Liferay 6.1</th>
    </tr>
    <tr>
      <th style="padding: 3px;">look and feel change logic, generic data model and &quot;extension points&quot; for other plug-ins.</th>
      <td style="padding: 3px;"><a href="http://sourceforge.net/projects/liferaymultidev/files/Multi-device%20portal%20extension/multi-device-ext-6.0.5.1.war/download">multi-device-ext</a> plugin</td>             
      <td style="padding: 3px;">integrated into Liferay's core. No need to install additional plug-in</td>
    </tr>
    <tr>
      <th style="padding: 3px;">Device recognition based on WURFL</th>
      <td style="padding: 3px;"><a href="http://sourceforge.net/projects/liferaymultidev/files/WURFL%20device%20recognition%20provider/wurfl-web-6.0.5.1.1.war/download">wurfl-web 6.0.5.x</a> plugin <small>(does not contain WURFLD DB)</small></td>
      <td style="padding: 3px;"><a href="http://sourceforge.net/projects/lportal/files/Liferay%20Plugins/6.1.0%20GA1/wurfl-web-6.1.0.1-ce-ga1-20120106155615760.war/download">wurfl-web 6.1.0.x</a> <small>(available under AGPL license, due to the fact WURFL itself switched to AGPL, as part of Liferay's official plug-ins. It contains the WURFL's database!)</small></td>
    </tr>
    <tr>
      <th style="padding: 3px;">Building device rules and applying actions to matched rules</th>
      <td style="padding: 3px;"><a href="http://sourceforge.net/projects/liferaymultidev/files/Device%20rules%20hook/device-rules-hook-6.0.5.1.war/download">device-rules-hook-6.0.5.x</a> plugin</td>
      <td style="padding: 3px;">Integrated into Liferay's core. No need to install additional plug-in  <small>(Provides somewhat different approach for managing rules and rule groups. Rules conditions simplified/limited to OS chooser and &quot;is tablet&quot; combo box.)</small></td>
    </tr>
  </tbody>
</table>

_So, to use device detection in Liferay 6.1, all you need to do is download and install the official wurfl-web plugin!_

If you get exception like this :

```
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
Exception in thread "liferay/hot_deploy-1" java.lang.NoClassDefFoundError: org/slf4j/impl/StaticLoggerBinder
at org.slf4j.LoggerFactory.getSingleton(LoggerFactory.java:230)
at org.slf4j.LoggerFactory.bind(LoggerFactory.java:121)
at org.slf4j.LoggerFactory.performInitialization(LoggerFactory.java:112)
at org.slf4j.LoggerFactory.getILoggerFactory(LoggerFactory.java:275)
at org.slf4j.LoggerFactory.getLogger(LoggerFactory.java:248)
at org.slf4j.LoggerFactory.getLogger(LoggerFactory.java:261)
at net.sourceforge.wurfl.core.resource.XMLResource.<clinit>(XMLResource.java:59)
at com.liferay.portal.mobile.device.wurfl.WURFLHolderImpl.getWURFLDatabase(WURFLHolderImpl.java:140)
at com.liferay.portal.mobile.device.wurfl.WURFLHolderImpl.initialize(WURFLHolderImpl.java:73)
at com.liferay.portal.mobile.device.wurfl.messaging.WURFLDeploymentMessageListener.doReceive(WURFLDeploymentMessageListener.java:52)
at com.liferay.portal.kernel.messaging.BaseMessageListener.receive(BaseMessageListener.java:25)
at com.liferay.portal.kernel.messaging.InvokerMessageListener.receive(InvokerMessageListener.java:65)
at com.liferay.portal.kernel.messaging.SerialDestination$1.run(SerialDestination.java:101)
at com.liferay.portal.kernel.concurrent.ThreadPoolExecutor$WorkerTask._runTask(ThreadPoolExecutor.java:669)
at com.liferay.portal.kernel.concurrent.ThreadPoolExecutor$WorkerTask.run(ThreadPoolExecutor.java:580)
at java.lang.Thread.run(Thread.java:662)
Caused by: java.lang.ClassNotFoundException: org.slf4j.impl.StaticLoggerBinder
at org.apache.catalina.loader.WebappClassLoader.loadClass(WebappClassLoader.java:1688)
at org.apache.catalina.loader.WebappClassLoader.loadClass(WebappClassLoader.java:1533)
... 16 more
```

Then:

- download `slf4j` from [http://www.slf4j.org/download.html](http://www.slf4j.org/download.html)
- unzip it and copy `slf4j-log4j12.jar` to `<LIFERAY_HOME/tomcat-7.0.23/webapps/wurfl-web/WEB-INF/lib` folder
- restart Liferay

Once you have this installed you can go ahead and define your rules. The following video demonstrates how:

<iframe width="700" height="450" src="http://www.youtube.com/embed/-m2wQt9vnZ4" frameborder="0" allowfullscreen=""></iframe>
