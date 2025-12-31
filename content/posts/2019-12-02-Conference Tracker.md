---
layout: new_post
title: Conference Tracker
date: 2019-12-02
image: /assets/2019-12-02-Conference_Tracker/conference_tracker.png
topic:
  - "[[DevRel]]"
  - "[[Public speaking]]"
---

I try hard to keep track of conferences around the world. Mainly in a Google spreadsheet but also in a calendar shared with my team. I always thought that if all the DevRel folks were to share and merge their spreadsheets (or whatever else they use) into one single place, it would literally save days of work.

As Liferay Portal (the product I mainly work with) transitions more and more into headless backend for React, Angular, Vue.js, ... based application, I felt it's time to get out of my Java comfort zone. I thought it would be nice to build a SPA that is more complex than "Hallo World", simple enough to be build in days rather than weeks, relatively good looking (for a non-designer like me) and ideally useful to someone.

And then something happened ... Love at first sight normally occurs to souls, but this time it enamored two ideas!

<!--more-->

### TL;DR

A love story like this deserves to be described with a few more words, but if you really want the spoiler, be my guest. The baby is called [Conference Tracker](https://milendyankov.com/ConferenceTracker) and it looks like this

![Conference tracker screenshot](/assets/2019-12-02-Conference_Tracker/conference_tracker.png)

### The inner beauty

I really don't want to waste your time with my struggles to compare and evaluate JavaScript Frameworks. All I'll say is that of the 3 major ones I found [Vue.js](https://vuejs.org/) to be one I can almost instantly understand and what is more important, it does not make my thinking-in-modules mind sacrifice too much. Surprisingly (to me) it turns out one can have well structured, modular SPAs.

Making them petty though is a whole different story. I'm generally not afraid of CSS but styling everything from scratch is not something I'm excited about. So I spent some time searching and I found [Quasar](https://quasar.dev/)! It comes with very good set of components, tools and extensions, making the applications look nice from the very begging. And it aparently can build SPA, SSR, PWA, Mobile, Cordova, Electron and bunch of other magical (to me) types of applications from the same source code. I'm yet to experiment with those.

If you are a backend developer like me, by now you probably have hard time refraining from yelling "cut the crap and tell me about the backend". Well, here comes the disappointment - there is no backend. At least not one that I have built. As I already told you, all data is in a [Google spreadsheet](https://docs.google.com/spreadsheets/d/1UEXmLwp8qEvvwBjiNQGSAB07QFSPVgD-10ieljAnevg/edit?usp=sharing) and the SPA gets it directly from there. It's not the most efficient way on earth to store data but it has its advantages - it allows people to collaborate on the data without the need to build and maintain custom backend. So please feel invited to

### Join the party

The spreadsheet is available to anyone in "comment only" mode. If you see mistakes, please add a comment. If you want to add a conference to it, use the [Google Form](https://forms.gle/vFcWJKWtqD7NrxmZ8). I'm willing do give write access to trusted editors, so if you think you should be one of them, drop me a line.

I consider this an experiment. I'm curious to see if the result of my learning exercise can evolve into something bigger. I have tons of ideas where to go from here, but I don't really want to invest my time in the unknown. So if you like it and you can see how Conference Tracker (or whatever it becomes) can deliver even more value to you, do not hesitate to drop me a line.
