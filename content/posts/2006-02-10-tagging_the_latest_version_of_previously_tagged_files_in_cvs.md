---
layout: post
title: "Tagging the latest version of previously tagged files in CVS "
date: 2006-02-10 03:06:44 +0100
mt_id: 3
blog_id: 1
post_id: 3
basename: tagging_the_latest_version_of_previously_tagged_files_in_cvs
categories:
  - tips_and_tricks
topic:
  - "[[Dev tools]]"
---

Some time ago a set of files ware committed to CVS repository and tagged (lets say with TAG1) . These files have changed a few times since then. Today I needed to tag the latest versions of all files that have ever been tagged TAG1 with TAG2.

<!--more-->

This

```
cvs -Q log -R -S -rTAG1 .
```

gave me the files I was looking for but with **/cvsroot/** in front and **,v ** at the end

```
/cvsroot/path/to/file1,v
/cvsroot/path/to/file2,v
...
```

so I had to remove it

```
cvs -Q log -R -S -rTAG1 . | sed s#/cvsroot/## | sed s#,v#\#
```

now I could actually retag these files

```
cvs -q tag TAG2 `cvs -Q log -R -S -rTAG1 . | sed s#/cvsroot/## | sed s#,v#\#`
```

It did the job but I think it's quite ugly way of doing such a "simple" operation.
There must be a another (simpler | non \*nix specific) way!
