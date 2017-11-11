---
layout: new_post
title: "Am I against JPMS and microservices?"
---

I started writing this on my way back home from Devoxx BE 2017. The reason is, two things happened during the conference, that made me ask myself this question.

First one was a conversation with a very well known person working on Java who was curious to know what benefits I _(or perhaps the company I work for)_ get from publicly speaking against JPMS _(a.k.a. JSR376 a.k.a. Jigsaw)_. The second was a message from a colleague of mine who was asking me to explain how do I feel about microservices because he apparently saw somewhere I'm publicly speaking against them.

That got me thinking. Is it possible that two of my most popular talks, namely "What's not new in modular Java?" and "Microservices and modularity or the difference between treatment and cure", were picturing me as the person who is against JPMS _(and therefore Java 9)_ and against microservices.

<!--more-->

### I must admit ...

... that is very likely. Especially to those people who only saw the slides but didn't see the talks ([recordings of which are available on YouTube by the way](https://www.youtube.com/playlist?list=PL5nbto3Wgyn1Z89SN8dXqqSIZdsqjlII5)). I don't do bullet points. I only use slides to make it easier for my listeners to memorize what I say by attaching to it some visual representation. That approach has a major drawback - looking at the slides alone one can interpret them in may different ways. That is unfortunate but it is unlikely that I'll change my presenting style any time soon. If I do, the change would be to rather not use slides at all. But I agree those slides in question, deserve an explanation and here it comes.

### So, what I have against JPMS and microservices?

NOTHING! I am not against JPMS/JSR376/Jigsaw/Java9! I am not against microservices!

I also have NOTHING against SpringBoot or Oracle or Netflix or Pivotal or any other technology or company I've mentioned in my talks. That's it. Now you all know!

### But, there is always a "but"

There are things that are very hard for me to accept. I find it hard to accept bending the truth. I can't accept that being right or wrong about purely technical aspect is a function of how much money your company is invested in given technology. I feel the need to react when I see arrogance and disrespect for people who have spend most of their lives contributing to the IT industry and Java ecosystem in particular. I'm against making young developers believe there is no need to use common sense or logic or reason about things, because there is already a solution from a famous company or person.

### Why do I care?

You may as well ask a parent why they say to a child _"do not touch that!"_. Is it because they are against the oven or the power socket? I have spend last two decades either writing or helping other people write enterprise software. I believe in OpenSource, giving back and sharing knowledge. I believe teaching young generation of developers fundamental software concepts is more important than promoting a product.

I learned that the hard way. I have "survived" more than one "buzzword tsunami". I have seen a lot of poorly designed software systems that seemed great idea at first. I've lost track of the number of terrible architectural decisions I have made myself. So today, when people claim they have designed an easy and universal solution for a complex problem, I'm very suspicious and I question it. Especially if the people making the claim, are in position to shape the minds of generations of developers.

### About JPMS

The Java Platform Architects are very smart people who are very well aware of the limitations and design issues JMPS has. They are also well aware of how vague terms such as modularity, strong encapsulation, reliable configuration, ... are. I wish they were both honest and brave enough to say something like _"We understand modular software means different things for different use-cases. This is what we've designed because it made most sense for JDK. Our design only covers some part of the whole concept. Those are the parts we'll cover in future Java releases. Those are the parts we do not plan to cover because of such and such reasons. We understand your use-case can be different and we'll do our best to make it easy for you to use those other solutions to solve the challenges you face."_

### About microservices

It is not much different. Consider the Netfix, Google, Amazon, ... examples showing you how thousands of microservices are easily orchestrated in the cloud and happily self-recover after a monkey has introduced a significant chaos. Those messages come from very smart people who are very well aware of the fact that what they show you is a particular approach for achieving application decomposition _(a.k.a modularity)_ that itself comes with some overhead and well hidden surprises. Yet microservices are presented with passion as THE modern application development style.

### About marketing

If you think about it, JPMS and microservices have very similar marketing strategy:

 - bend core concepts such as modularity and application decomposition to match the solution you have come up with.
 - pretend there has been nothing like your solution before.  
 - picture anyone not using your approach as old-fashioned or even ignorant.
 - make fun of and try to discredit anyone who dares to question your decisions.

That makes perfect sense from a vendor perspective but it's not doing a favor to the Java community as a whole. I do understand people operate under specific constraints and expectations imposed by the organization(s) paying their salaries. I do understand why they get upset when people who are not bound by the same constrains feel they have the right _(or perhaps even the responsibility)_ to point out the facts and question their decisions. Yet I also strongly believe it's in the best interest of the developers community to show the full picture so people can make educated decisions.

### Yes, I know. I can't fix that!

I would be stupid to believe that any single individual can. Never the less, I will continue to share my experience with younger fellow Java developers even if that bugs some well known people at well known organizations. I'm still full of respect for their knowledge and achievements. But I'm also full of respect for the knowledge and achievements of other people who dare to disagree with them.

So, I will continue to listen to everything all those people have to say and choose to agree or disagree based on my own experience and the challenges I face. I'll continue to speak up about application design principles and show how implementations differ. I am already working on something that would hopefully be practical enough to be useful but at the same time help developers better understand the concepts of modularity and decomposition. Stay tuned, I'll be writing about bits and pieces of that initiative shortly. Finally, please feel invited and encouraged to join me in that journey if you have experience in those subjects and feel in a similar way.
