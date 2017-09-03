---
layout: new_post
title: "Cleaning up my GitHub mess"
---

You know how it goes. You continuously stack stuff in the most convenient place (shelf, drawer, desk, ...) and it's all fine, up until the moment you no longer can find what you need. That is the day when you need to put everything else aside and clean up your mess. Not sure if it is Conway's Law to blame but this seams to happen to my repositories on GitHib. And today was the day when I no longer could recall which repo is under which account, where it resides on my local hard drive and if it's actually in sync. So today was my GitHub cleanup day. Just in case you need to cleanup yours or if you use one of my projects and something is no longer where you expect it to be, here is what changed.

<!--more-->

### The root cause of the mess

[Azzazzel](https://github.com/azzazzel) is my private account which I have had since GitHub's early days. As of today it had over 30 repositories. If that was not enough, this user is member of [Commsen organization](https://github.com/Commsen) which represents the company I own _(that's why my open source projects use `com.commsen` as package prefix and Maven group id)_. That organization account had another 5 repos.

[MilenDyankov](https://github.com/milendyankov) is the GitHub account I created after I joined [Liferay](http://liferay.com). This user is member of [Liferay organization](https://github.com/liferay/) _(plus few other Liferay related ones)_ and this is where all Liferay related work goes. Unfortunately I've also occasionally used it to throw there demos, PoCs, small projects, ... As of today it had another 15 repositories.

Altogether there are 50+ repositories which contain:

 - clones of company projects
 - open source projects I'm working on or maintaining
 - open source projects I've released ages ago which are no longer maintained
 - clones of open source projects I've contributed to _(often just once)_ some time ago
 - demo code from my [talks](http://milendyankov.com/talks)
 - sample code to demonstrate a functionality or reproduce an issue

I'm sure for many of you those numbers are far from impressive, but for me this was the point where I started to get lost and I had to do something about it.

### Using more than one GitHub account

I've been using two github accounts for several years now. I didn't have to change anything to continue doing it. I just though I'll share with you my approach in case you have the same issue. So what I do is as simple as configuring my `~/.ssh/config` file like this:

```
Host milendyankov.github.com
    User git
    Hostname github.com
    IdentityFile ~/.ssh/<key_for_milendyankov_account>

Host azzazzel.github.com
    user git
    Hostname github.com
    IdentityFile ~/.ssh/<key_for_azzazzel_account>   
```

Then I make sure my git remotes use appropriate hostname instead of just `github.com`! For example:

```
→ git remote -v
origin	git@azzazzel.github.com:azzazzel/modular-dukes-forest.git (fetch)
origin	git@azzazzel.github.com:azzazzel/modular-dukes-forest.git (push)
```

This onetime configuration allows me to tie a particular local clone to appropriate GitHub account. Of course if you know of a better way, please let me know.


### Get rid of the clones

Back to clean up task. The most obvious thing is to get rid of what you don't need. It doesn't make sense to keep clones of someone's repo just because you've contributed to it in the past. I have no idea why I kept those so long but now they are gone. I can always clone them again if I need to.

### Decide what goes where

Now the hard part - the repositories that are (or could be) actually in use. After trying out different things I decided to group those into 4 categories:

 - **anything that contributes to artifacts managed by Liferay** goes under [MilenDyankov](https://github.com/milendyankov) account. Fortunately all _(currently 7)_ of those were already there so nothing to do about it.
 - **my demos, examples, PoCs, clones of projects in use, ...** go under [Azzazzel](https://github.com/azzazzel) account _(currently 20)_. I had to transfer ownership of few projects but GitHub makes the process really simple. It also automatically redirects to the new locations if you use the old URLs.
 - **my Open Source projects** go under [Commsen](https://github.com/Commsen) account _(currently 6)_. Here again I had to transfer ownership of quite a few projects!
 - **my old, no longer maintained projects** go under [Commsen Archive](https://github.com/CommsenArchive) account _(currently 11)_. Since GitHub does not provide an easy way to mark and filter out old projects, I had to improvise. I created a new organization account for archived projects and moved all old projects there.  

And that's it ... well, almost!

### Redirect project sites to new locations

While GitHub does great job redirecting all links to the Git repository on the Web and through Git activity, it doesn't redirect GitHub Pages associated with the repositories. Luckily quick search found me [Redirecting GitHub Pages after a repository move](https://gist.github.com/domenic/1f286d415559b56d725bee51a62c24a7) which was all I needed.

In my case project sites move from [Azzazzel](https://github.com/azzazzel) to [Commsen](https://github.com/Commsen) account. Since both already host websites _(milendyankov.com and commsen.com respectively)_, it was just a matter of creating the appropriate `[project-name]/index.html` files in the former with the following content:

```
<!DOCTYPE html>
<meta charset="utf-8">
<title>Redirecting to http://commsen.com/[project-name]/</title>
<meta http-equiv="refresh" content="0; URL=http://commsen.com/[project-name]/">
<link rel="canonical" href="http://commsen.com/[project-name]/">

```

Now you should be automatically redirected to the new place if you go to [WeDeploy Java client](http://milendyankov.com/wedeploy-client/) or [WeDeploy Maven Plugin](http://milendyankov.com/wedeploy-maven-plugin/) for example!

### Final thoughts
I'm about to clean up my local filesystem now, but I will not bother you with the details. Enough to say, now that I've decided in which space given codebase lives, it's kind of obvious how to restructure it.

I tested the changes as much as I could and everything seams to work fine _(including existing clones of the moved repositories)_. However if you encounter missing or broken links or any other issues, please let me know.

Of course, if you have a better strategy for keeping you GitHub accounts and repos nice and tidy, please share!
