---
layout: post
title: Liferay plug-ins adapted to work with Liferay 6.0.5
date: '2010-11-08 22:12:16 +0100'
mt_id: 15
blog_id: 1
post_id: 15
basename: liferay-plug-ins-adapted-to-work-with-liferay-6-0-5
categories:
  - liferay
---

As soon as Liferay 6.0.5 was released I decided to adapt my plug-ins to the newest framework version. But as we all know, being determined to do something is not the same as having the time to do it. The good news is, a few days ago I finally quit saying myself "_never mind, you'll do it tomorrow_" and started getting things done. And now I'm happy to announce that [Custom Global Markup](http://www.liferay.com/downloads/liferay-portal/community-plugins/-/software_catalog/products/4846919), [Tailgate](http://www.liferay.com/downloads/liferay-portal/community-plugins/-/software_catalog/products/4924578) and [Liferay-UI Taglib Demo](http://www.liferay.com/downloads/liferay-portal/community-plugins/-/software_catalog/products/4906953) are already upgraded to work with Liferay 6.0.5.

<meta http-equiv="content-type" content="text/html; charset=utf-8" />

Please read my previous posts "[Custom global markup portlet](/blog/2010/04/custom_global_markup_portlet)" and "[Writing Liferay portlet to display a file in a way "tail -f" does](/blog/2010/05/writing_liferay_portlet_to_display_a_file_in_a_way_tail_-f_does/)" for more information about [Custom Global Markup](http://www.liferay.com/downloads/liferay-portal/community-plugins/-/software_catalog/products/4846919) and [Tailgate](http://www.liferay.com/downloads/liferay-portal/community-plugins/-/software_catalog/products/4924578) respectively.

<!--more-->

### The plugins for 5.2.3 versions ware build by [liferay-maven-sdk](https://github.com/azzazzel/liferay-maven-sdk) and this was one of my biggest concerns. I was a bit warred about how difficult will be to move to the native Maven support in Liferay 6. However, not trusting my own experience and struggling to think logically, I realized it should be only a matter of modifying the POM. And indeed it was. I simply removed 5.2.3 dependencies and maven plugins and added 6.0.5 ones ([here is the diff](https://github.com/azzazzel/Liferay-plugins/commit/6476d09685ba47559d860aa30eb3bb48caa42df4#diff-0)) and I was able to build my plugins using Liferay's 6 maven artifacts. Even ServiceBuilder worked without problems and additional configurations.

Apart from adapting the code there is one more significant change. While version control and issue tracker remain on GitHub, binary files were moved to new SourceForge project called "[liferay-plugins](http://sourceforge.net/projects/liferay-plugins/)". You are welcome to visit it and download, comment, rate, review, .... There are also some [screenshots](http://sourceforge.net/project/screenshots.php?group_id=368520) of the plug-ins.

While I thought having screenshots is cool, a (much younger) collegue of mine, pointed out that these days every self respecting project has instructional videos on YouTube. Well, my generation didn't spend their whole childhood in front of the TV so please excuse my ignorance. Not to give anyone another reason to complain here are the videos:

<object width="640" height="505"><param name="movie" value="http://www.youtube.com/v/hN4JbLx0vNo?fs=1&hl=pl_PL&rel=0&hd=1&color1=0x234900&color2=0x4e9e00"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/hN4JbLx0vNo?fs=1&hl=pl_PL&rel=0&hd=1&color1=0x234900&color2=0x4e9e00" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="505"></embed></object>

<object width="640" height="505"><param name="movie" value="http://www.youtube.com/v/5e5Ucw434SA?fs=1&hl=pl_PL&rel=0&hd=1&color1=0x234900&color2=0x4e9e00"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/5e5Ucw434SA?fs=1&hl=pl_PL&rel=0&hd=1&color1=0x234900&color2=0x4e9e00" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="505"></embed></object>
