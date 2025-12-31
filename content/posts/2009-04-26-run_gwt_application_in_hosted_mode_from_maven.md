---
layout: post
title: Run GWT application in "hosted mode" from maven
date: 2009-04-26 12:39:35 +0200
mt_id: 8
blog_id: 1
post_id: 8
basename: run_gwt_application_in_hosted_mode_from_maven
categories:
  - tips_and_tricks
topic:
  - "[[Java]]"
---

It seems to get more and more [cloudy](http://www.infoworld.com/d/cloud-computing/nick-carr-many-ways-cloud-computing-will-disrupt-it-798) in the IT world these days . It's a matter of time before the rain (of applications) starts. When this happen one will need the proper tools, to be able to add his/hers own few drops.

So I though it's about time to start experimenting with [Google Web Toolkit](http://code.google.com/webtoolkit/). What I like the most about GWT is it's "hosted mode". The fact that Java code changes reflect the GUI right away and one don't have to wait for generate, compile, build, deploy, ... steps to complete is really speeding up the development process.

Since 99% of my projects use [Maven](http://maven.apache.org/) the first thing to look for (after reading GWT tutorials) was a GWT maven plug-in. No surprise here - there is one ([http://mojo.codehaus.org/gwt-maven-plugin](http://mojo.codehaus.org/gwt-maven-plugin)). The [GWT docs](http://code.google.com/webtoolkit/gettingstarted.html) and [gwt-maven-plugin docs](http://mojo.codehaus.org/gwt-maven-plugin/1.1-SNAPSHOT/) gives a lot of information how to create and build GWT applications. Unfortunately the released version of gwt-maven-plugin (1.0 at the time of writing) does not support hosted mode.

<!--more-->

The solution is to use the snapshot repository

```xml
  <pluginRepository>
    <id>mojo-snapshots</id>
    <url>http://snapshots.repository.codehaus.org</url>
  </pluginRepository>
```

and the 1.1-SNAPSHOT version :

```xml
  <pluginManagement>
    <plugins>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>gwt-maven-plugin</artifactId>
        <version>1.1-SNAPSHOT</version>
      </plugin>
    </plugins>
  </pluginManagement>
```

If the application only contains client code it can be then run in "hosted mode" by simply typing `mvn gwt:run`. The thing docs don't mention (again, at the time of writing this) is that "mvn gwt:run" will not build the server side of the application. Unless you do this yourself GWT-RPC call will not work. So there are three possible ways:

1. let the Eclipse (or whatever IDE you use) build the classes in `${basedir}/src/main/webapp/WEB-INF/classes`

   I personally don't like this approach. It does not solve the problem if you have multiple modules in maven as the dependent libraries will be still missing. Also you have to add some rules to your SCM system to ignore generated classes.

2. do `mvn compile war:inplace gwt:run`

   This will create extracted version of the war in "${basedir}/src/main/webapp". It will solve the problem even for multiple modules setup but you still will have to deal with the SCM ignore rules.

3. do `mvn compile war:exploded gwt:run`

   This will create extracted version of the WAR in a specified directory (by default it is `${project.build.directory}/${project.build.finalName}` as stated in [Maven WAR Plugin docs](http://maven.apache.org/plugins/maven-war-plugin/exploded-mojo.html#webappDirectory)). In order for this to work the `gwt-maven-plugin` needs to be told where the exploded war is by adding this to it's configuration in pom.xml :

   ```xml
    <hostedWebapp>
      ${project.build.directory}/${project.build.finalName}
    </hostedWebapp>
   ```

   This IMHO is the best approach. Solves the problem even in case of multiple modules and your SCM managed folders remain clean.
