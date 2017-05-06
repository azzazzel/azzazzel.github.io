---
layout: new_post
title: "What to expect in post-JPMS Java world"
---

The atmosphere around Java 9 (and most notably JPMS a.k.a. JSR 376 a.k.a. Jigsaw) is getting really hot. Java community seams to be divided into 3 camps "developers who honestly believe JPMS can simplify modularity", "developers who have been dealing with modularity long enough to clearly see the issues Java platform architects don't want to see" and "developers who don't care (for now)". I personally think the 3rd group is by far the largest and this is the main issue and the main reason for the noise. Why? Because those are the developers who never cared about modularity. Most of them still don't care, but now they will be forced to learn about modularity. The question is what will they learn? Real modularity as described in [Modulariy Maturiy Model](http://enroute.osgi.org/appnotes/modularity-maturity-model.html) or limited version of it wrapped in a package with a label "simple" on it?

This is not a new thing! The battle between "good quality code" and "simple to write code that works" is something that takes place in every project! And you know which one wins most of the time. At least I think I've been in this industry long enough to know, so I though I'll write down a few prediction based on what I think will happen to JPMS and what impact it will have on Java projects in the following months.

<!--more-->


### Java 9 release will not be delayed again

I'm almost ready to bet on that! And no, it's not because I believe JPMS is good and ready to be released. Quite the opposite in fact. I think there are still many issues that needs to be addressed. But I've been observing the work on JPMS long enough to know no issue can stop Oracle from moving forward! Let me give you an example - here is a short summary of how Public Review was published:

   * Mar  7 : [Mark Reinhold asks for feedback on the draft he intends to post for Public Review](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-March/000799.html)
   * Mar  8 : David M. Lloyd: '[Right now a Public Review definitely does not seem appropriate ...](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-March/000804.html)'
   * Mar  8 : Robert Scholte: '[I agree with David. There are still quite some topics marked as Proposal posted or discussion active" ...](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-March/000809.html)'
   * Mar  9 : Neil Bartlett: '[I also agree with David. There is not sufficient consensus ...](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-March/000811.html)'
   * Mar 12 : Tim Ellison: '[... I think it is somewhat premature to call for a review until the EG has let the current discussion run its course ...](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-March/000821.html)'
   * Mar 15 : Mark Reinhold: '[We do not have consensus in this EG on moving forward to Public Review ... It is, however, in the best interest of the wider Java ecosystem to proceed ... I have therefore submitted the specification for Public Review](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-March/000828.html)'

So, if you are familiar with [Scott Stark's famous blog post](https://developer.jboss.org/blogs/scott.stark/2017/04/14/critical-deficiencies-in-jigsawjsr-376-java-platform-module-system-ec-member-concerns?_sscc=t) and/or you have heard that both [RedHat and IBM announced they will vote "No" on JPMS](http://mail.openjdk.java.net/pipermail/jpms-spec-experts/2017-April/000684.html), you may be thinking that it is in "**best interest of the wider Java ecosystem**" to spend some more time on Java 9 and deliver a better quality product. You are wrong! This is not the first time EG member points out that [inadequately addressed issues obligates them to vote "no"](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-February/000763.html). What do you think the reaction was? I'll simply quote [Mark Reinhold's response](http://mail.openjdk.java.net/pipermail/jpms-spec-observers/2017-February/000775.html) and let you decide for yourself where it fits in your own arrogance scale:

> "You can choose to vote "no" anyway, of course, if you decide that it is more important to protect your own narrow interests than it is to support the **broader interests of the entire Java ecosystem**."

Wow! Oracle is guarding the interests of the entire Java ecosystem while RedHat is only protecting their own narrow interests! This is the first time I witness a company mostly famous for its high price tags and very successful legal department to claim it represents the community better then widely recognized Open Source Software vendor! It comes as a surprise to me but who am I to argue with the Chief Architect.

What about IBM? Well, Mark Reinhold claims in his "[An Open Letter to the JCP Executive Committee](http://mreinhold.org/blog/to-the-jcp-ec)" that _"IBM has decided that their interests are best served by delaying this JSR"_ ! As you can see, here again he reaches for the universal argument "whoever disagree with us, is trying to sabotage us"!

So yes, I'm pretty sure Java 9 will be released as planned regardless of how many EG members vote "No"! Then Oracle's marketing machine will start to position it as the best modular system on Earth. And if someone dares to say something else ... well here is the next prediction:

### People raising concerns about JPMS will be "by definition, stupid and ugly"

I don't actually picture anyone repeating the [famous Linus Torvalds quote](https://www.youtube.com/watch?v=n-IgqiTD4XA) in some serious discussion, but I can sense this kind of attitude among Java platform architects and some enthusiastic JPMS supporters! And of course "stupid" and "ugly" are metaphors! What we will actually see is those being well masqueraded:  

  * Hidden message: __If you use those you are stupid!__
    * Making more fun of OSGi _(those of you who have been at JavaOne 2016 know what I mean)_ and now JBoss Modules.
    * Constantly repeating how complex other modular systems are
    * Pointing out products who tried other modular solutions and failed
  * Hidden message: __They are the competition and they are ugly!__
    * more and more companies being accused of sabotage or protecting own interests
    * more and more modularity experts being called biased
    * more fake claims that there are no successful modular systems so their authors are jealous  

I can't predict the scale, but I have no doubt those will be the main arguments. You can clearly see it in Mark Reinhold's comments mentioned above as well as in Mike Hearn's "[Is Jigsaw good or is it wack?](https://blog.plan99.net/is-jigsaw-good-or-is-it-wack-ec634d36dd6f)" blog post.

It is sad to see this happening! Especially taking into account that every other modular system must run on top of JPMS and play by its rules! In another words, no modular system can hurt JPMS in any way! However JPMS can make the life of the developers of real modular systems much much harder. In fact, reading JPMS mailing list I sometimes have the feeling this is an undocumented goal of JPMS.

### Most 3rd party module names will have version as part of the name

As much as Java platform architects tries to fight with it, I believe most 3rd party JPMS modules will contain a version in their name. Not only JPMS does not give any good way to version modules, it also tries to discourage usage of version numbers in the module names. Therefore if your module name ends with digit you'll see a warning message! Do you recall what people do when they have to deal with a system that enforces ridiculous rules? Yep, exactly that, they game the system! So I can picture modules ending with "\_" or "v" or something else after some meaningful version number!  

Why would developers need to do that you may ask? Because, unlike classpath, module path can not have 2 modules having the same packages! JPMS will not try to make any decisions in such case, but simply fail. So ultimately it's the developer that needs to know which module need to be on the module path! But when a developer has an app that depends on module "A" which depends on module "B" and there are several modules named "B" which one the developer should choose? Even if all those modules were assembled providing some version information _(lets leave aside the awkwardness of the [proposed version strings](http://download.java.net/java/jigsaw/docs/api/java/lang/module/ModuleDescriptor.Version.html))_, it is still hidden from the developer inside a compiled module-info class. So what is the most natural thing that developers inexperienced in modularity and forced to deal with modular system of limited functionality will do? They'll "solve" the problem themselves by calling modules "B_1_0_", "B_1_1_0_", ... and so then "A_1_0_2_" can depend on specific "B"! Easy! Wrong but easy and works!

Yet even this will not convince the people behind JPMS, they have made the wrong decision. Why? Because this works perfectly well for JDK itself. All the JDK modules are written by the same company and only released together (in few flavors) as JDK. Therefore versioning individual modules makes no sense as all conflicts are easy solvable. The strange belief that any software can be delivered this way, seems to be way too strong with Java platform architects.    

### IDEs will generate open modules by default

If you have read [Effective java](https://books.google.com/books/about/Effective_Java.html?id=ka2VUBqHiWkC&redir_esc=y) you may recall that **"The rule of thumb is simple: make each class or member as inaccessible as possible."**! There are number of articles, blog post, Q&As, ... that tells you to keep your classes "package private" unless you really need them to be public! Yet every single IDE I know, generates public class by default! Have you ever wandered why? Because working with "package private" classes is a pain. And for most developers, encapsulation is not good enough reason to deal with that pain. I'm pretty sure the same thing will happen with modules. Most (if not all) IDE will either generate them as open by default or will have an option to do so that most developers will turn on.

If you don't know how open (a.k.a. weak) module differs from a normal (a.k.a. strong) one, you can [read the proposal](http://mail.openjdk.java.net/pipermail/jpms-spec-experts/2016-October/000430.html)! Long story short, it's a workaround to fix broken reflection in JPMS. Long after the core concepts of JPMS were designed and developed it became clear that the decision to restrict access instead of visibility impacts every framework that uses reflection. Open _(originally called weak)_ packages are such that are not exported but can be accesses via reflection at runtime. Open module simple indicates all packages in that module are open.

Given the amount of popular frameworks using reflection, I can imagine most developers will choose to simply open their modules. Especially considering that there is no real penalty for doing so!  

### Tools to "export everything" will become popular

While many projects claim they don't care too much about JPMS since they can stay on classpath, that may not be very easy thing to do long term. I'm pretty sure there will be functionalities that will be available only as modules. There will be companies that would be forced one way or another to use modules. In general I'm pretty sure Oracle will make sure developers can't ignore JPMS as easy as they can ignore OSGi. And here again developers will have to game the system to stay productive.

The first [WeakeningAgent](https://gist.github.com/raphw/91c81b8afdfd76ccfd87508a0af0e8bb) was released several months ago. I suspect many more of those will show up shortly after Java 9 is released. If the tool needs to crack open, change, recompile and reassemble files, it will do so. There are many smart people out there working on really important projects that don't have any time to waste on pleasing some constrained modular system.

I'll personally be very sad to see this happening but I wouldn't blame anyone for trying to be productive. This could have been avoided if JPMS was to only modularize the JDK and give 3rd party developers the freedom to use modular system of choice for anything above that. Unfortunately "what works for JDK must work for you" attitude was adopted and JPMS was positioned as general purpose modular system despite the fact that fundamental features in any such system are clearly stated to be "non goals" for JPMS. Therefore many people believe JPMS stands on their way by adding restrictions while not solving any real problem. Contrast that with OSGi. It helps solve specific problems is certain types of applications and many developers appreciate its power and flexibility. Yet any Java developer not facing those problems does not even need to know OSGi exists. Much in the same way, every Java developer not getting any benefits from JPMS will have to make it "disappear". And there will be an app for that!

### Real modular systems will support JPMS modules

While there is an attempt to achieve some kind of interoperability between different modular systems and JPMS, I don't think this would result in anything useful. IMHO neither Oracle nor Java platform architects have any interest in that _(apart from getting an "yes" vote)_. Of course the topic has been discussed and everyone seems to agree interoperability is beneficial for the Java community. The issue here seams to be how is interoperability defined. For Oracle that is basically "adapt your non-standard platform to use JPMS internally". I don't see that happening. JPMS is way too limited and we are yet to discover how the layer concept will perform in large dynamic systems.

On the other hand, there is not a single thing JPMS can do, that other modular systems can not. So converting a JPMS module to some alternative format should be relatively easy using some heuristics. For example there are tools that can generate OSGi bundles out of plain JAR files. Given that JPMS modules contain even more meta information than plain JAR file, it should be even less problematic to convert those. And for developers who are already using modular systems, that would likely be the best option. That is to run their modular platform of choice on top of JPMS with minimal set of modules required by the platform. Then install/configure/update/unistall both platform specific as well as JPMS modules as needed. I'm not aware of anyone working on something like that, but I believe chances are we'll see something like that already in 2017.

### Summary

All of the above is my personal oppinion based on ... you don't want to know how many ... years of experience in software development. The pattern was always the same: someone had a great idea of making a complex domain look simple. Remember WebStart? CMP? CORBA? JNI? ... And I bet any Chief Architect at some point said something like "I've seen many projects fail due to bad decisions, I'll not let this happen to this project". Life however is perfect tester, history likes to repeat itself and meanwhile developers have things to do.

Happy coding everyone, with or without JPMS :)
