---
layout: new_post
title: Data classes in Java
date: 2020-08-30
twitter: true
topic:
  - "[[Java]]"
  - "[[Dev tools]]"
---

I recently joined [AxonIQ](http://axoniq.io) to help them evolve their Developer Relations to the next level. One of the things I am currently evaluating is the steepness of the adoption curve of [Axon Framework](https://axoniq.io/product-overview/axon-framework) and [Axon Server](https://axoniq.io/product-overview/axon-server). One of the things that catch my attention was that, in almost all examples and demos, the classes representing events, commands and queries are written as Kotlin data classes ([here is an example](https://github.com/AxonIQ/giftcard-demo/blob/master/src/main/java/io/axoniq/demo/giftcard/api/api.kt)).

It got me thinking and last week I put this poll on Twitter

<blockquote class="twitter-tweet">
    <p lang="en" dir="ltr">Say you work on a project primarily written in <a href="https://twitter.com/hashtag/java?src=hash&amp;ref_src=twsrc%5Etfw">#java</a> and it needs a lot of data classes (only fields and methods for accessing them). What would you use to avoid the boilerplate code? Please RT for reach.</p>&mdash; Milen Dyankov (@milendyankov) <a href="https://twitter.com/milendyankov/status/1295411395874435072?ref_src=twsrc%5Etfw">August 17, 2020</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The tweet received some comments and suggestions about solutions and approaches I wasn't aware of. I thought that may be the case for other people too. So in this post I'll talk about the options one has to implement a data classes in Java (and JVM languages). I hope it'll help readers pick the right approach for their own use case.

<!--more-->

## What are data classes anyways

As you are probably well aware, Java is a class-based, object-oriented programming language. Therefore everything is an object (instance) of given class. In class-based OOP a class has data (fields) and behavior (methods). The idea that objects/classes have behavior is such a fundamental one that even the most basic types like `String` have tons of it (there are methods to split, concatenate, match, convert, ...). Sometimes though you just need to pass some data from one place to another and it comes handy to have a class encapsulating that data. There is no behavior, just the data. That's what's the term data classes usually refer to - classes that only have fields. Theoretically that's totally fine. Nothing is OOP or Java forces you to add behavior to your classes. Until there is.

## The assumed and expected "behavior"

While your objects don't have any behavior that matters, the environment (other Java classes, libraries, frameworks, ...) may assume or expect one.

The obvious example here are the famous `equals()` and `hashCode()` methods. They have default implementations so theoretically you may not bother implementing them. But anything outside your classes that needs to tell if two objects are the same, would expect you to implement them properly. There is no easy way to tell Java "these data objects are equal if all of their fields are equal". Same goes for the hash key which is crucial when your data classes are put in a `Map` for example.

In addition to that, there is the widely adopted [JavaBeans](https://en.wikipedia.org/wiki/JavaBeans#JavaBean_conventions) convention according to which all fields should be private and have getter and setter methods. You may not care much about that (and honestly speaking, you probably shouldn't) but if you are at the mercy of some frameworks that require beans or assume everything is a bean, then you do have some boilerplate code to write.

Rarely there may be cases when something would need to (re-)create, deserialize or make a copy of your data objects. That something may have it's own expectations about the class's constructor(s).

## Automating the boilerplate code

The above assumptions and expectations are what often transform an easy task into annoying one. Writing boilerplate code is not fun and may be time consuming. In the data classes context, there are several ways to automate that. I'll present them below with some of their pros and cons.

### Use Lombok's @Data

The winner in the poll is not a surprise. [Lombok](https://projectlombok.org/) comes with tons of other goodies that Java developers love. To crete your data class with it just add the fields you need, annotate it with [`@Data`](https://projectlombok.org/features/Data) and let Lombok do the rest for you:

```java
@Data public class User {
  private String name;
  private Integer age;
}
```

The really cool thing about this approach is that it does not modify your source code. Lombok is essentially an [annotation processor](https://openjdk.java.net/groups/compiler/processing-code.html#processor) that enhances the compiled classes directly. Therefore when you edit the file you only have the important data. All the boilerplate is added behind the scenes.

There are few downsides of that approach though. First, you don't see the generated code. It's probably not an issue for simple data classes but it may be for more complex ones. I've heard of projects who run into serialization/deserialization issues with Lombok generated classes. Another inconvenience is that by default IDEs will not be aware of Lombok. They will not run the annotation processor(s) and fail to compile your code. You'll have to configure your IDE's annotation processing options or install a Lombok plugin.

There is also one false drawback that is often brought up. Namely that Lombok is an additional dependency that you need to ship with your app. That's not true. Lombok is required at compile/build time only. It's not needed at runtime. Your application may use Lombok to produce a binary and then run perfectly fine without it. That said, if you introduce it, everyone (humans and systems) building the project would have to be able to work with it. Only in that sense it is an additional dependency.

### Use the IDE's code generation capabilities

Every IDE I'm aware of, has the ability to generate `equals()`, `hashCode()`, `toString()`, getters, setters and constructors. It may require a few mouse clicks and or remembering a few shortcuts but it's still way faster than typing all that code. Some IDEs will even allow you to provide your own templates for the code generation so that you know exactly what the code will look like.

The downside of this approach has is that you still will have all this boilerplate code in front of your eyes every time you look at the class. It may be harder to keep it clean and consistent when different people on the same team use different IDEs or differently configured code generators. In such cases the codebase tends to become messy over time with each data class using slightly different approach. It's also may be hard for newcomers to recognize those as data classes and before you know they may start adding behavior to them.

### Use Kotlin's data classes

Significantly reducing the boilerplate is one of the things most JVM languages pride themselves with. Kotlin - a JVM language whose popularity skyrocketed after Google announced it's the preferred language for Android apps - is no exception. Its [data classes](https://kotlinlang.org/docs/reference/data-classes.html) provide conceptually the same functionality you get with Lombok but with even simpler syntax:

```kotlin
data class User(var name: String, var age: Int)
```

Furthermore Kotlin allows you define multiple data classes in a single file (as you saw in the [Axon Framework's example](https://github.com/AxonIQ/giftcard-demo/blob/master/src/main/java/io/axoniq/demo/giftcard/api/api.kt) above) which is super convenient. If you already know Kotlin, that's probably as easy as it gets.

The drawback is - you are mixing languages. That means you need to add a Kotlin compiler to your development/build process. If adding Lombok as build time dependency concerns you, then picture adding a whole new language stack to the project. If not knowing what Lombok generated concerns you, imagine relying on a whole different language with own assumptions and priorities.

### Use classes with public fields

If you don't care about comparing objects and 3rd party's expectations, that's probably the best option. Personally that's my favorite approach for "passing data around" scenarios. Just make the fields public and forget about getters, setters and even constructors:

```java
public class User {
  public String name;
  public Integer age;
}
```

It fact OSGi's [Data Transfer Objects (DTO) specification](https://docs.osgi.org/specification/osgi.core/7.0.0/framework.dto.html) describes exactly that - an object with public fields and no behavior that represent the state of a related runtime object in a form suitable for easy transfer to some receiver.

### Use Immutables

A few people pointed out [Immutables](http://immutables.github.io/) as their preferred solution so I though I should mention it even though I have never used it myself. From the docs it seems to be an annotation processor similar to Lombok with heavy focus on immutability:

```java
@Value.Immutable public interface Person {
  String name();
  Integer age();
}
```

If I understood the concept correctly the main difference would be that it'll by default generate an immutable class and a builder for it. Something you can also do with Lombok if you want to, by using [`@Value`](https://projectlombok.org/features/Value) and [`@Builder`](https://projectlombok.org/features/Builder) annotations.

I have the feeling the pros and cons here are exactly the same as in Lombok case described above.

### Use records <small>(requires Java 14 or newer)</small>

A possible, long awaited, official solution to the data class boilerplate problem may have finally arrived to Java 14 thanks to [JEP 359: Records](https://openjdk.java.net/jeps/359). As you can see the syntax looks a lot like the Kotlin one:

```java
record Person (String name, Integer age) {}
```

That's another solution I have no experience with, so I'll refrain from speculating about pros and cons. At the time of writing, this is still a preview feature in a non-LTS Java version. You shouldn't be using that in production systems just yet. By the time it's production ready, it may look or behave differently. That said, it seems some unicorn projects are happy with it. I'm sure there will be tons of articles about it in the upcoming months.

## Summary

It all boils down to how nice you want to play with the expectations that 3rd parties may have. Public fields is by far the simplest and cleanest way if you don't care to comply. If you do, you'd have to pick one of the other options. I just wanted to give you an overview so you know what's out there. I'm not picking one for you nor rating them.

For the case of [Axon Framework](https://axoniq.io/product-overview/axon-framework) and [Axon Server](https://axoniq.io/product-overview/axon-server) samples and demos, I think we should find a way to demo the products using all fundamentally different possibilities (IDE generated, annotation processors based, modern JVM language based, public fields) to not give the false impression we require or favor one approach over another.
