---
layout: new_post
title: "Java EE, EE4J, OSGi, ... and the paradox of choice"
---


Not so long ago, I had very interesting conversation with someone who works on Java SE. At some point we discussed the donation of Java EE to Eclipse Foundation. I don't quite remember what statement I was making when I got this response _(not a precise quote)_:

> Do you seriously believe this whole EE4J thing has any chance to survive? Oh my god, you are so naive if you do! We sent Java EE there to die!

This was a private conversation and I didn't ask nor I was given a permission to quote my interlocutor, so I'm not going to tell you who that person was nor where and when exactly this conversation took place. But the sentence got stuck in my mind. It made me think about OSGi - a technology claimed dead by way too many Java developers. Funny enough, many OSGi projects are developed at Eclipse Foundation. All of a sudden the Eclipse Foundation started to look like a nursing home for terminally ill "used to be famous" Java technologies.

<!--more-->

### The symptoms of the disease

At first, this thought sounded ridiculous even to me. But thinking more about it, it kind of started to make sense. Ironically, it seams Java EE fell ill with the same "fatal disease" as OSGi. Namely "Too heavy/complex"! Much like in the OSGi case, the diagnose was made based on opinions of young "rock star" Java developers comparing the "old guy" to some "modern" technologies in their Know-It-All phase. But what exactly being "too heavy/complex" means?

#### Size

Java EE 8 is a [collection of about 40 specifications](http://www.oracle.com/technetwork/java/javaee/tech/java-ee-8-3890673.html). This is very similar to OSGi R6 which [consists of 40+ specifications](https://www.osgi.org/developer/downloads/release-6/release-6-download/). In both cases this results in hundreds of pages of reading which means learning it all can indeed be challenging and time consuming. Of course in both cases, in any practical scenario, people deal with less then a dozen of those, but the full size gives an excellent argument to pigeonhole them as "too complex".

#### Runtime

Most implementations of Java EE specifications need an application server runtime. Most of the OSGi specifications need an OSGi runtime. Both technologies have many implementations of the respective runtimes which come from different vendors and vary in size and OOTB functionalities. Many developers would pick the one having the most features OOTB. Just in case or because that's what other developers use. Then they realize they don't need most of them which immediately renders the technology "too heavy".

#### Strict rules

Java EE has strict rules regarding application isolation and cross-application interaction. OSGi goes further providing even better code isolation by drawing explicit boundaries between modules and making real use of packages. While those have their roots in battle tested software design principles know for decades, they have a significant "disadvantage". They make it extremely hard to practice cowboy style coding _(throw code at classpath and see if it sticks)_. Choosing to understand and play by the rules feels too old school for many Java developers. Fighting against the rules is way more "fun" but eventually results in something "too heavy and too complex".

From all of the above symptoms it seams to me the root cause is "too many options", which reminded me of a talk I saw back in 2006 on Google Tech Talks called "[The Paradox of Choice - Why More Is Less](https://www.youtube.com/watch?v=6ELAkV2fC-I)" by [Barry Schwartz](https://en.wikipedia.org/wiki/Barry_Schwartz_(psychologist)) _(if you don't have an hour to watch it, [this TED talk](https://www.ted.com/talks/barry_schwartz_on_the_paradox_of_choice) summarizes it well in 20 min)_.

### The paradox of choice

In contrast to many "modern" approaches, neither Java EE nor OSGi tell how exactly one should build software. Instead they provide a bunch of proven solutions for well know software problems. This is not surprising considering all those specifications were developed by people representing different companies with different business goals, intending to use the same tools in many different scenarios. They were designed to give developers maximum possible flexibility while enforcing common rules that everyone agrees upon. But that comes at the price of shifting of the burden and the responsibility for decision-making to the application developer.

#### Paralysis

According to Barry Schwartz, having too much choice leads to decision paralysis. Especially if one lacks crucial information. It's easy to say "I'll use Java EE" or "I'll go with OSGi". But then you have to decide on runtime, specifications, implementations, configuration, security, ... A less experienced developer without good understanding of the technology is easily paralyzed by overwhelming options. The only thing that comes to mind in such cases is "I'll just use what others use".

#### Regret

That approach also plays the role of safety net in case something goes wrong. "But I chose exactly what this other team uses, and it works for them!" is the ultimate defense strategy and the universal excuse. Yet the more options there are, the easier it is to regret anything disappointing about the option one chose.

### The obvious solution - one size fits all

Consider SpringBoot for example. One goes to [start.spring.io](http://start.spring.io/), clicks a few checkboxes, downloads ready to run application which is then customized. Yes, there are options but between implementations that are known to work in the well defined environment Spring Initializr creates. No hard choices, no potential inconsistencies and thus no paralysis. No decisions to be blamed for later on. One may dislike something down the road but since there was no better option, one can not be blamed. Forget about flexible, modular, carefully designed applications. Flexibility is achieved by making many "small" applications, each with embedded web server, talking to each other over the network.      

It keeps surprising me how well that approach sells. Giving up freedom for convenience and peace of mind seams to be a deal everyone is willing to make these days. No, this is no a  rant at SpringBoot. It's a general trend in software. Take [MicroProfile](https://microprofile.io/) as another example. It's nothing more than cutting down the options to the bare minimum and providing convenient tools around the limited set. Think about [JPMS](http://openjdk.java.net/projects/jigsaw/spec/). It's basically redefining modular applications and giving up on flexibility in order to trim down the implementation to minimal set of primitives.

It is amazing how software developers these days glorify speed, blindly adopt development strategies containing "micro" in the name and treat recourses as they were limitless.  

### My dream solution

While some people are busy to beg Oracle to allow them to keep the Java EE name and others rush to celebrate the victory of Spring, I for one am keeping my fingers crossed for EE4J project. I hope to see it become totally detached from Java EE, carefully designed set of specifications that serves well to those who value professionalism over speed. Moreover I think it would be awesome if the Eclipse Foundation and the OSGi Alliance can find a way to work together and evolve both EE4J and OSGi in sync to eventually make them fully compatible. I personally wouldn't even mind if they eventually merge under a common umbrella project.

Actually some effort towards better interoperability is already in place at the OSGi Alliance. In the not yet released OSGi R7 there is already specification for [JAX-RS Services support](https://www.youtube.com/watch?v=FR_yLECENUo). There is also a work in progress on a specification for [CDI Integration](https://www.youtube.com/watch?v=vMdEK5y1hmI) which will open the door for a variety of other EE4J technologies to be seamlessly integrated as well. It would be great to see EE4J also making a step towards OSGi soon. It can already benefit from nice specifications like [OSGi Promises](https://www.infoq.com/interviews/tim-ward-osgi-promises) and [OSGi PushStreams](https://vimeo.com/201982439) which do not require a OSGi runtime.

For the last several years I've been working with both Java EE and OSGi at the same time. I've seen their strengths and weaknesses and I always wanted a "best of both worlds" solution. So Eclipse Foundation and OSGi Alliance please make it happen. Because, as they say in Bulgaria, "United We Stand Strong" !
