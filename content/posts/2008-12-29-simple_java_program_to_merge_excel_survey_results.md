---
layout: post
title: Simple Java program to merge Excel survey results
date: 2008-12-29 14:13:20 +0100
mt_id: 4
blog_id: 1
post_id: 4
basename: simple_java_program_to_merge_excel_survey_results
categories:
  - software
topic:
  - "[[Java]]"
---

A friend of mine recently asked me about merging survey results, which reminded me I had similar problem about an year ago and have written a peace of code to solve it. It's not a framework or user friendly application and it's not well documented. It was written in a couple of hours to solve particular problem, but in case anyone is interested here is so called [SpreadSurvey](/assets/2008-12-29-simple_java_program_to_merge_excel_survey_results/SpreadSurvey.zip).

<!--more-->

The problem I was facing back then, was how to ask about 20 questions to about 50 people and get their answers into single excel file. There is plenty of tools and services out there for managing polls and surveys, but I was not allowed to place company related data outside company's network.  
So I prepared a survey as simple form in a excel file (unfortunately can not show the actual one here, but it was much like this sample one) and sent it to everyone in my target group, kindly asking them to fill it in and send it back. So I got back about 50 files containing filled forms. The question was how to merge them into single file?
Since I'm a Java geek and I had been using Apache POI already and those files had all the same structure, the answer was obvious. A simple Java program could iterate over those files extract any useful data and merge it into a single file. This is how an eclipse quickie called SpreadSurvey was born.

![survey.png](/assets/2008-12-29-simple_java_program_to_merge_excel_survey_results/survey.png)

Besides the files containing the answers it needs a template for the output file.Template is nothing more than another excel file containing some special tags. _{ss}:this_ extract data from the cell having exactly the same row and column as the one in template file. _{ss}:cell(C:R)_ extracts data from cell at column C and row R.The result file is produced by repeating (horizontally or vertically) the template area containing special tags for each result file. For example if we have a simple template and 3 files containing answers to the sample survey as shown in above images, then this:

```shell
$ java com.commsen.ss.MergeResults -t template.xls -r result.xls -d X /tmp/results/*
```

will print

```
Found expression at 1:2
Found expression at 1:3
Found expression at 1:4
Found expression at 1:5
Template expresions found in area 1:2 - 1:5
processing file: /tmp/results/survey_result1.xls
processing file: /tmp/results/survey_result2.xls
processing file: /tmp/results/survey_result3.xls
```

and will generate file`/tmp/result.xls` which looks like this:

![survey-result-1.png](/assets/2008-12-29-simple_java_program_to_merge_excel_survey_results/survey-result-1.png)

Alternatively the same data can be organized in columns instead of rows. Just need to provide different template

![survey-template-2.png](/assets/2008-12-29-simple_java_program_to_merge_excel_survey_results/survey-template-2.png)

and tell SpreadSurvey to repeat vertically

```shell
$ java com.commsen.ss.MergeResults -t template2.xls -r result2.xls -d **Y** /tmp/results/*
Found expression at 1:2
Found expression at 2:2
Found expression at 3:2
Found expression at 4:2
Template expresions found in area 1:2 - 4:2
processing file: /tmp/results/survey_result1.xls
processing file: /tmp/results/survey_result2.xls
processing file: /tmp/results/survey_result3.xls
```

and file `/tmp/result2.xls` will look like this:

![survey-result-2.png](/assets/2008-12-29-simple_java_program_to_merge_excel_survey_results/survey-result-2.png)

So as I said earlier there is no rocket science here. It' s just simple tool I wrote some time ago, that turned out to be useful for someone else. It was never meant to be released or further developed so there is no JavaDoc and the code is not documented either. Only this help screen shows how to use it:

```shell
$ java com.commsen.ss.MergeResults --help
Usage:  MergeResults [OPTION...] FILE...

Options:
  -t, --template-file=<filename>   Specify the name of the template file.
  -r, --result-file=<filename>     Specify the name of the result file.
  -O, --overwrite                 Add to overwrite result file if exists.
  -d, --direction=<X|Y>            Specify whether data is added in columns or
                                   rows (default is X)
  -S, --skip-broken               Add to skip broken files

Help options:
  -?, --help                      show this help message
  --usage                         show brief usage message
```

Feel free to use it and/or modify it as needed. Don't forget to send me feedback if you do so ;)  
The package contains source code as well as unmodified versions of used libraries : [POI](http://poi.apache.org/), [commons-io](http://commons.apache.org/io/) and [te-common](http://te-code.sourceforge.net/). _(Please check appropriate sites regarding licensing and terms of usage)_.
