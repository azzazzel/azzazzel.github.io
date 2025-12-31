---
layout: new_post
title: Developers about OSGi
date: 2016-09-30
topic:
  - "[[Modularity]]"
---

Some time ago I published a survey asking developers what they think about OSGi. It took a while to reach some reasonable amount of responses and then to process the results, but finally I'm ready to publish them.

In a few weeks period there were 220 responses to the survey. Even though there was no question about the location, I'm pretty sure they come mostly from Europe. That is because I could see the responses coming in groups as the survey was promoted at particular local JUGs. Another thing to take into account is that the information about it reached way more than 10000 developers (based on the published number of members of the groups the information was published). With that in mind you can hardly consider 220 responses representative. Never the less it gives you some ideas and things to think about.

<!--more-->

#### What is your favorite JVM programming language?

The question was put this way on purpose. I was interested in what JVM language people actually like and not what they use because of company rules and policies. What language people like tells me more about from what perspective their judgements are made. Surprisingly though, it seams Java is still strong:

<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/12lDBu_BM5DnStMOcKNKZ_J6jc6xaTIYzM2_DCZoKrxM/pubchart?oid=1184654248&amp;format=interactive"></iframe>

#### Years of experience in building software?

The purpose of the question was to make some analysis of how professional experience reflect opinions. You may be surprised to note that either our industry is getting old or young people don't care much about surveys:

<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/12lDBu_BM5DnStMOcKNKZ_J6jc6xaTIYzM2_DCZoKrxM/pubchart?oid=886915795&amp;format=interactive"></iframe>

#### What best describes the source of your knowledge about OSGi?

Before asking people about their opinion I think it's important to understand what how much of that it is backed by experience or knowledge. But then again, it's very likely that only people with strong opinions participated so don't be too quick to judge. This could also explain the low number of people not familiar with OSGi:

<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/12lDBu_BM5DnStMOcKNKZ_J6jc6xaTIYzM2_DCZoKrxM/pubchart?oid=621161433&amp;format=interactive"></iframe>

The answers under "other" were:

- Wrote my graduation thesis about it (static quality analysis tool)
- Apache Karaf helper
- I'm an OSGi EG chair
- I know OSGi, but don't USS it
- In the past I used and developed OSGI extensivly
- I have given training on OSGi
- I've experimented with OSGi and plan to use it in a team for a professional project

#### What would you primarily use OSGi for?

Time for some opinions (move your mouse over the answer to see full text). As people could give up to 4 answers, the numbers can hardly be presented as percents. I personally find them quite interesting though:

<iframe width="812.5" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/12lDBu_BM5DnStMOcKNKZ_J6jc6xaTIYzM2_DCZoKrxM/pubchart?oid=1980600680&amp;format=interactive"></iframe>

#### Think of a project where OSGi could add value but wasn't/wouldn't be used! What was/would be used instead of OSGi?

And finally alternatives. Over the years I learned that asking people "what you consider to be an alternative for X" gives you quite good idea about what they think about X. So here it is, and to my surprise "micro-services" is not the leader:

<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/12lDBu_BM5DnStMOcKNKZ_J6jc6xaTIYzM2_DCZoKrxM/pubchart?oid=412865583&amp;format=interactive"></iframe>

The answers under "other" were:

- not sure I understand the question
- Custom module system - none of the above provides for the same as OSGi (even microservices)
- "value added not worth the effort", primarily because the nice classloader scheme cannot be used outside of OSGi. Too tightly coupled to lot of cruft.
- Basically everywhere where you know it is going to be large, complex, and keep changing with time
- PF4J (2 answers)
- I could mark most of answers.
- Plain Java ClassLoaders
- Server farm solves 'hot' deployment of new jar versions
- I have no idea (2 answers)
- heh
- NetBeans platform
- custom classloaders

#### Summary

As I said in the beginning, I don't fool myself this survey is representative. There seams to be far more Java developers out there not aware of what modularity is and why it matters. So the only conclusion I can make for sure is that there is a lot of room to popularize OSGi among Java developers. If you want to learn more details, feel invited to attend my "OSGi for outsiders" talk at [OSGi Community Event 2016](https://www.eclipsecon.org/europe2016/session/osgi-outsiders) and [ApacheCon Europe 2016](https://apacheconeu2016.sched.org/event/8ULH?iframe=no).

If you want to play with the data yourself, [here it is in CSV format](/assets/2016-09-30-developers_about_OSGi/OSGi_survey_results.csv)!
