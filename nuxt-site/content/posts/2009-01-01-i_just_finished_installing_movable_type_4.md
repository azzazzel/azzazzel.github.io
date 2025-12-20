---
layout: post
title: I just finished installing Movable Type
date: '2009-01-01 23:42:34 +0100'
mt_id: 1
blog_id: 1
post_id: 1
basename: i_just_finished_installing_movable_type_4
categories:
  - tips_and_tricks
---

Welcome to my new blog powered by Movable Type. Finally got it up and running but it took me a few hours. Cutting the long story short, here is a note of what problems I had and how they were solved.

<!--more-->

Since there was no Movable Type package for Ubuntu 8.04 I downloaded version 4.23 from [http://www.movabletype.org/](http://www.movabletype.org/) and unpacked it locally. Then I created `/usr/lib/cgi-bin/movabletype/ `folder, copied in there `*.cgi` files from `/path/to/movabletype/` and made symlinks to these folders

```
/usr/lib/cgi-bin/movabletype/default_templates -> /path/to/movabletype/default_templates
/usr/lib/cgi-bin/movabletype/lib              -> /path/to/movabletype/lib
/usr/lib/cgi-bin/movabletype/plugins          -> /path/to/movabletype/plugins
/usr/lib/cgi-bin/movabletype/tmpl             -> /path/to/movabletype/tmpl
```

I already had Apache configured so it was time to start the installation wizard. But after typing `http://milen.commsen.com/cgi-bin/movabletype/mt.cgi` in Firefox I got:

```
Got an error: Base class package "Class::Accessor::Fast" is empty.
   (Perhaps you need to 'use' the module which defines that package first.)
```

Took me a while to figure out the name of the package containing this Perl module but once it was discovered

```shell
apt-get install libclass-accessor-perl
```

solved this issue and made room for t the next one:

```
Got an error: Base class package "Data::ObjectDriver::BaseObject" is empty.
  (Perhaps you need to 'use' the module which defines that package first.)
```

The same problem, just different module, except this time there was no Ubuntu package for it. So I had to install it from [CPAN](http://www.cpan.org/), which was quite easy to do using `cpan` command.

```shell
bash$ cpan

cpan shell -- CPAN exploration and modules installation (v1.7602)
ReadLine support available (try 'install Bundle::CPAN')

cpan>
```

I then typed

```shell
cpan> install Data::ObjectDriver
```

and after a while got this message:

```
*** Checking for Perl dependencies...
[Core Features]
- Test::Exception                  ...missing.
- DBI                              ...loaded. (1.601)
- Class::Accessor::Fast            ...loaded. (0.31)
- Class::Data::Inheritable         ...missing.
- Class::Trigger                   ...missing.
- List::Util                       ...loaded. (1.18)
==> Auto-install the 3 mandatory module(s) from CPAN? [y]
```

Since missing modules depend on other missing modules I just let `cpan` handle dependencies and few minutes later problem was solved and now I had:

```
Got an error: mutiple trigger registration in one add_trigger() call is deprecated.
```

Thanks to Google I found the solution in another blog entry called "[Movable Type with Class::Trigger 0.12](http://www.glorat.net/2008/11/movable-type-with-classtrigger-012.html)" and after changing

```perl
MT::Placement->add_trigger(
    post_save   => \&flush_category_cache,
    post_remove => \&flush_category_cache
);
```

to

```perl
MT::Placement->add_trigger(
    post_save   => \&flush_category_cache
);
MT::Placement->add_trigger(
    post_remove => \&flush_category_cache
);
```

in `MT/Entry.pm` I finally got installation wizard running. At some point, after checking for required modules, the wizard complained about missing `Image::Size` and I had had to do

```
apt-get install libimage-size-perl.
```

There was also warning about missing optional modules so I also installed:

```
libmail-sendmail-perl
libsoap-lite-perl
libxml-atom-perl
perlmagick
libgd-gd2-noxpm-perl
```

Rest of configuration process went without problems but after completing the wizard I got:

```
Got an error: Can't locate YAML/Tiny.pm in @INC ...
```

Another Perl module missing? Looks like wizard didn't check for this one. So

```shell
apt-get install libyaml-tiny-perl
```

added it but then another one showed up:

```
Got an error: Can't locate JSON.pm in @INC
```

This was fixed by

```shell
apt-get install libjson-perl
```

and finally there was "Create Your Account" screen. Creating an account and adding a blog went without problems and I was able to move my old posts from Blogger and add this one.
