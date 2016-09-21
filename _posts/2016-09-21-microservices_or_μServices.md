---
layout: new_post
title: "Micro-services or μServices"
---

Yesterday someone very well known and respected in Java world _(I didn't ask him for permission, so I'm not mentioning his name)_, approached Liferay's booth at JavaOne. He expressed his concerns about the word "**μServices**" in the message printed on our booth's wall. I wasn't there at the time this happened. I spoke with my colleagues few minutes later, as the non-developers were getting worried we made a terrible and embarrassing typo. As a non-native English speaker I wasn't quite sure what the exact argument was, but it was clear to me the person believed we should have used "**micro-services**" instead. I urged to reassure my colleagues this is not a typo but an important differentiator in today's buzzword driven world.

![Liferay booth at JavaOne 2016](/assets/2016-09-21-microservices_or_mServices/liferaybooth.jpg)

<!--more-->

That is something that happens often in fact. Everyone is crazy about **micro-services** these days and what they usually mean by that is something that should probably have been called "[cohesive web-services](http://blog.osgi.org/2014/06/software-mixed-with-marketing-micro.html)". Whoever coined the **micro-services** term couple of years ago, clearly didn't known _(or didn't care)_ that [the concept of **µServices** was introduced back in 2010](http://blog.osgi.org/2010/03/services.html). It basically refers to the idea of using "OSGi service as a design primitive" where the term "micro" actually make sense.

So now we have two terms that are pronounced the same way but mean totally different things implementation wise! While **micro-services** is clearly a misuse for what it describes, I would be the most naive person in the word if was to believe a that a buzzword carefully implanted in so many minds by companies structuring their entire business around that buzzword, is something that can be changed.

Luckily we can at least write them differently. So, be my guest, and keep writing "**micro-services**" to describe cohesive web-services and keep fooling yourself they are "micro" just because what you compare them to is gigantic. But please be generous enough to let us, the OSGi and clean architecture fans, use "**μServices**" for the good old tiny, independent, cohesive Java services that allow us to achieve the same goals without the overhead of web-services. And as for the spoken form, I typically use "**in-VM μServices**" just so I can distinguish from the buzzword when I talk to biased people.

It's sad that even respectful and smart people don't know the facts. Luckily I could find the person who made the comment and chat with him for 5 minutes. That's all it took to get that person to understand what we meant by "**μServices**" and to admit he wasn't aware of the facts. He even expressed some interest in understanding better what OSGi has to offer these days. Of course that will not turn him into OSGi fan or advocate, but that is totally not the point. The point is to understand there are many technologies and methodologies and they all have strong and weak sides. The point is to know and not blindly trust buzzwords. The point is to respect each other regardless of what tech choices we've made.   
