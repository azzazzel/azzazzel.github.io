---
layout: post
title: Liferay Portal Systems Development - review
date: 2012-04-01 14:52:53 +0200
mt_id: 25
blog_id: 1
post_id: 25
basename: liferay_portal_systems_development_-_review
categories:
  - liferay
topic:
  - "[[Liferay]]"
  - "[[Books]]"
---

<img src="https://www.packtpub.com/sites/default/files/imagecache/productview/5986OS_Liferay%20Portal%20System%20Development_Frontcover.jpg" style="float:right; margin: 10px" />
Imagine you are not a Java guru but a ... connoisseur of art. You are visiting a beautiful city called  Liferay and you know it's full of museums, art galleries, music halls, great architecture, ... You can certainly organize your trip in many different ways. One of them is taking the bus tour and this is what a [Liferay Portal Systems Development](http://www.packtpub.com/liferay-portal-systems-development/book) book would be in this analogy.  Actually it may even be a very good idea for a start. However, please note, the route is somewhat outdated and passes by places which no longer exists. Also the tour guide is all the time pointing out things, but as soon as the story becomes really interesting and you can't wait for the details, she moves to the next subject.

<!--more-->

OK, let me cut the analogy here and try to provide some (hopefully constructive) criticism and point out some cool Liferay features this book explains. In this order ;)

#### constructive criticism

As you may have already guessed, I found the book kind of hard to read. I've read almost all Liferay books out there but this one was the strangest in terms of language, chapter organization,  consistency of knowledge, ...

- My first impression (while reading about ServiceBuilder) was that the content is taken form Liferay's training slides. Fortunately it turned out that the book tries to provide more details and explain some concepts a bit better.

- Another impression (which remained till the end) was that some of the sections were created as copy/paste of the previous sections by only changing some key information. There are sentences (or even paragraphs) which simply does not fit in the context. For example a sentence starting with _"As you can see ..."_ without any code sample, diagram or anything that can actually let you see anything.

- The book is full of code examples but I think a lot of them are actually useless. For example:

  ```java
   public ClassLoaderProxy(Object obj, ClassLoader classLoader){}
    // see details in ClassLoaderProxy.java
    private String _className;
  ```
  > As shown in the preceding code, the method invoke uses a class named MethodHandler, which implements the interface Serializable.

  I guess method invoke got replaced by `// see details in ClassLoaderProxy.java`

  Or another example:

  > When the staging is disabled, either local live or remote live, the portal will remove all the properties from the field typeSettings of the table Group_. How come? The following code is a snippet from the method disableStaging of the class StagingImpl:

  ```java
  GroupLocalServiceUtil.updateGroup(liveGroup.getGroupId(), typeSettingsProperties.toString())
  ```
  If you understand how this single line of code removes *"all the properties from the field typeSettings of the table Group_"*, the chances are you don't need to read this book.     

- I guess the book was written before 6.1 was actually released and thus some important changes in Liferay's 6.1 versions are not reflected by the book. The most important is the fact that tunnel-web is gone in 6.1. It was merged to Liferay core and is no longer distributed as separate web application. However the book still mentions it in the sections about WebDAV, remote services and remote staging. If this is your main area of interest then you'll probably need to look for other sources to get familiar with the changes in 6.1.

- The book is full of tables. It would probably be safe to write that tables make between 1/3 and 1/2 of some chapters' content. Unfortunately the value added is negligible comparing to the space they take. Personally I would resign with most of them (perhaps making the book thinner of about 100 pages). For example there is a full page table describing  _"other entities and their definitions, such as, JournalArticleImage, JournalStructure, JournalTemplate, JournalFeed, and JournalContentSearch"_.  Assuming the reader understands the pattern `ServiceBuilder` uses to generate files and methods (described in the first chapter) this table provides nothing but names. Even the most valuable column "description" is not able to defend the usage of tables as most of the time it contains the value of the first column having capital letters replaced by space and appropriate lowercase letter. Like this:

  <table width="100%" border="1" cellpadding="1" cellspacing="1">         
    <tbody>
      <tr>
        <td style="text-align: center; "><b>object name</b></td>
        <td style="text-align: center; "><b>... other columns ...</b></td>
        <td style="text-align: center; "><b>description</b></td>
      </tr>
      <tr>
        <td>PortalCache</td>
        <td style="text-align: center; ">...</td>
        <td>Portal cache</td>
      </tr>
      <tr>
        <td>PortalCacheManager</td>
        <td style="text-align: center; ">...</td>
        <td>Portal cache manager</td>
      </tr>
      <tr>
        <td>SingleVMPool</td>
        <td style="text-align: center; ">...</td>
        <td>Simple VM pool</td>
      </tr>
    </tbody>
  </table>

- There are quite a few diagrams in the book. Fortunately most of them are entity diagrams which are rather self explanatory. The action/flow diagrams however are somewhat confusing. In my opinion they are not strict UML diagrams and it's hard to figure out whether an arrow means _"extends"_;, _"implements"_, _"uses"_ or something else. Particularly in LAR and staging sections, depending on how you interpret the arrows you may be surprised to discover the diagram is showing exactly the opposite of what is explained next to it.

Now, I understand, all of the above may sound as petty malices. However most of them can be fixed in the next edition and that is the main reason to point them out. What is hard to fix however (at least not without rewriting the whole book) is the fact that the book, in my opinion, does not keep the promise it makes in the first chapter

> This book is going to show you how to develop portal systems via a real example &ndash; knowledge base management.

This statement empowered by (page and a half long) list of requirements made me think, I was going to be walked through the process of building my own knowledge base solution. I mean starting from scratch and then adding features step by step by employing different APIs, tools, concepts, etc.

Unfortunately the approach turned out to be a completely different. The chapters and sections are merely informing the reader that there is something in the portal that can be used (one can guess how it's supposed to help fulfill a particular requirement).  For example let me show you how scheduling is described in _"Scheduling and messaging"_ chapter :

 - three paragraphs of what scheduling, Quartz and JMS  are respectively
 - one paragraph (5 sentences) about `scheduler.enabled` and `scheduler.job.name.max.length` properties
 - one table with interface names related to scheduler
 - one table with service names related to scheduler
 - one table with spring beans names related to scheduler
 - couple of paragraphs about some scheduler clustering properties
 - one table with interface names related to scheduler clustering

 That's it. Not a single word of how to use it or build your own schedulers. Not a single usage example. Not even an information about how this relates to the knowledge base management system we are building.  Unfortunately many sections follow this pattern and some (like _"Mobile device detectors"_ or _"Securing users' information"_ for example) contain even less information.

#### some cool Liferay features this book talks about

Despite of the criticism above, one can still learn a lot from this book. I've been working with Liferay for a several years and still was able to learn a few new things. Assuming you're a big boy/girl who does not need to be hand-holded and you don't mind digging into 3rd parties source codes to explore things by yourself - you may find this book a pretty good reference. In fact you may discover Liferay has some features you never thought you'll find in a portal.  So let me point out some of the things that may make this book worth buying :

- The ServiceBuilder chapter is quite good. Besides the basics it will also explain     
  - what are reserved table and column names and how to add your own
  - how to handle ID fields and what types of identifiers one can use
  - how to extend  ServiceBuilder to support, for example, BigDecimal
  - how to configure "fast development" so you don't have to manually redeploy all the time
- The Generic MVC portlets chapter also explains some useful but less known features like:
  - now AJAXable portlets are loaded and what render weight is used for
  - how to use direct JSP servlet to bypass FilterChain for specific resources
  - how to use model hints to fine tune entity fields
  - how to use dynamic and custom queries
- Other sections that only give you the basics but point out an interesting subject once you start looking for more information by yourself, will tell you about:     
  - Liferay sandbox and sandbox deployer - a cool new feature in 6.1
  - Class loader proxy and how to share plugin services.
  - How text is extracted from binary files (like DOC, XLS, PDF, ..) and what OCR tools are or can be used
  - How to use (and add your own) tokens in journal articles
  - How content indexing, faceted search and open search work

Of course this is by far not the complete list. It's just an attempt to extract the topics which can draw the attention of an average Liferay developer. But the truth is, unless you are a "Liferay Legend" _(if you use Liferay forums you know what I mean)_ you'll probably learn something new from this book. And for those of you who started working with Liferay not so long ago, there may be even some big surprises waiting around the corner.

As usual, whether the book is good or bad you'll have to decide by yourself.  I was just trying to get you prepared for what is inside. Hopefully you can adjust your expectations to avoid disappointments. Also, please note, this review is subjective and influenced by what I already know about Liferay and what is my vision of how a book should look like. So before you make any decision, please read the [sample chapter](http://www.packtpub.com/sites/default/files/5986OS-Chapter-3-Generic-MVC-Portlets.pdf?utm_source=packtpub&amp;utm_medium=free&amp;utm_campaign=pdf) and look for other opinions.
