---
layout: new_post
title: AI/ML Models Are Not Libraries
date: 2026-03-08
image: /assets/ModelsAreNotLibraries.png
---

The first time I wanted to use a model in my own application, I expected the experience to be similar to using a library or a framework. It seemed [Hugging Face](https://huggingface.co/) was the Maven Central or the npm _(or the CPAN for my old Perl friends)_ of the AI world. I was under the impression that models were language-agnostic and we could simply download them and interact with them via a standard API.

It turns out it's not that simple. To make sense of a model repository, we need to take a step back and understand what a model actually _is_.

## A Use Case for a Model

Let's assume we need a feature in a text editor that warns writers if a sentence is too long or too short. These terms are subjective; there is no one-size-fits-all rule, and opinions vary on what constitutes "correct" length. So, how do we write a program that takes any sentence as input and outputs "too short," "too long," or "OK"?

If we had a large enough dataset of unique sentences, we could ask humans to label them. Statistically, a large enough dataset should allow us to make an educated guess about how most readers will feel about a new sentence. However, we don't necessarily know _why_ the readers classified them that way.

A simplistic approach would be to assume character count is the deciding factor and hardcode the logic:

```ts
if (sentence.length() < min) return 'too short'
if (sentence.length() > max) return 'too long'
return 'OK'
```

But this might be the wrong assumption. What if the word count matters more? Or the average length of the words? What if syllables or punctuation play a role? Manually extracting this logic and hardcoding it is a fragile, uphill battle. What we need instead is a **classification model**.

## Building a Model

As software engineers, we want to map a problem directly to code: input text, perform logic, output a value. But when the "logic" is a black box of human intuition, we can't generate it by trying things out until it works. Or, can we?

If we can reduce the problem to a function that receives numbers, performs calculations, and produces other numbers, the challenge shifts from a software engineering to mathematical one.

### The Output

Turning the output into a number is straightforward: a `score` between `0` and `1` allows us to use configurable thresholds to produce the label we need.

### The Input

For the input, we've already considered calculating length, word count, etc. These are what the AI world calls **_features_** - numerical representations of object's characteristics. Let's say we represent each sentence as `[number_of_characters, number_of_words]` collection of features. So `[42, 7]` represents any sentence that has 24 characters and 7 words. In a more general form, this is a `[f1, f2, ..., fN]` sequence which in math terms is a **_tensor_** (multi-dimensional vector).

Finding the features that are somehow significant is a task for a data scientist, not software engineer. Figuring out what what formulas to apply on those tensors is what mathematicians are best at.

### The Math

What we need from the math is a score per sentence that we can compare to the score obtained from our readers. Say we ask a friendly mathematician who knows such formula and we get:

```
score = (w1 * f1) + (w2 * f2) + ... + (wN * fN) + γ
score = 1 / (1 + e^(‑score))
```

Here `[w1, w2, ..., wN]` are called **_weights_** and `γ` is called **_bias_**. You can think of the weights as "tuning knobs" for specific features while the bias is a sort of a "global knob".

I'm not a mathematician and I make no claims this is the right approach to solve this. It is just an example that calculates the dot product distance between the weight vector and the feature vector (with some bias). The idea here is that there exists a weights vector (and bias) that represent "the perfect length" of a sentence.

These weights are the values for that "perfect" sentence we don't know and need to "learn".

### The Training

To "learn" the actual values of the weight vector `[w1, w2, ..., wN]` and the bias `γ` , we could start with random ones and run multiple iterations over our dataset. After each we check how far our calculated score is from the human-labeled score and adjust the weights accordingly. We iterate until we find a combination that produces close-enough scores for most entries in our dataset. This iterative process is called **_training_**.

::note{variant='soft'}
The above is a massive oversimplification. In reality, training involves complex calculus and specialized tooling.
::

Once we are satisfied with the accuracy, we export a **model**.

### The Model Artifact

In essence, producing a model means storing in a persistent form the following:

- The **weight vector**: `[w1, w2, ..., wN]` - learned during training
- The **bias scalar**: `γ` - a constant to shift the output up or down regardless of the inputs
- The **architecture**: a computational graph that defines the sequence and the shape of the mathematical operations (in this case: perform a linear dot-product, add the bias, and apply a sigmoid).

The tricky part is how and where to store that.

If mathematicians used Java, Hugging Face would have been the largest repository of serialized Java classes. Instead, it is largely "serialized Python".

Jokes aside, serialization seems reasonable distribution practice if the sole recipients are fellow researchers who run the model in complete isolation. Sadly, historically that was the assumption, and that is how the model landscape has shaped.

I plan to publish a dedicated piece on model formats but generally speaking, the published model artifacts depends on the training tool used. It could be a serialized data structure, a tool-specific format, an archive of files, or something else entirely. If we were to indeed train the model described above, and give it to the world - out best bet for interoperability is [ONNX](https://onnx.ai/).

The size of a model (both in-memory and on-disk) largely depends on the number of its **_parameters_**.️

### The Parameters

What the AI world calls "parameters" is every learned value used in calculation. So, the above example is a super simple, 3-parameter _(two weights, one bias)_ model. For reference, LLMs (Large Language Models) typically count parameters in the billions. To understand the discrepancy, let's imagine we want to split each sentence into words and have features _(and biases)_ per word like `position` and `length`. Then we no longer have a vector but a matrix:

```
[
	[position, length],
	...
	[position, length]
]
```

Capping this to a maximum of 100 words per sentence, we would end up “learning” and storing 200 weights + 100 biases. In other words, this becomes a 300-parameter model. If we were to split further into syllables, we would end up with a tensor (3-dimensional array):

```
[
	[
		[position, length], ..., [position, length]
	],
	...
	[
		[position, length], ..., [position, length]
	]
]
```

Capping this to a maximum of 10 syllables per word gives us 2K weights + 1K biases, or a 3K-parameter model. Furthermore, we could introduce multiple layers and use the learned weights and biases from one layer as features for the next, which means even more parameters. We are still far from billions, but the exponential growth of parameters should be obvious by now.

Complex models (like LLMs) typically have architectures with orders of magnitude more complexity, include multiple layers, use various activation functions, and store other information, such as vocabularies and embeddings.

## Using a Model

Conceptually, all models are persisted chains of mathematical functions and numeric values. They accept numeric input and compute numeric output.

### Inference

Models are not like software libraries. You don't add them as a dependency to your application and call their API. The process of making the model do its work is called **_inference_** and at minimum we need an **_inference runtime_** capable of loading the model into memory and executing the computation graph.

It's the inference runtimes that an application can use as an library, not the model itself. But not all runtimes can run all models. What's more, some only work within specific programming language ecosystems. Therefore, the most common scenario today is to have a tiny wrapper around such runtime that exposes the model via remote services. The term **_inference provider_** refers to those who offer such services.

### Preprocessing and Postprocessing

The simple example we discussed above illustrate a few important facts that are often misunderstood:

1. The model itself never uses the actual use case data—text, image, sound, and so on. It's the responsibility of the program executing the model to convert the data into the tensor (scalar, vector, matrix, ...) that the model expects. This is often called **_preprocessing_**.
2. The model doesn't know the purpose of the computation it performs. In the example above, the model expects an input of the form `[number, number]`. We know these represent "number of characters" and "number of words," but the model doesn't. We could get an image, extract the number of pixels and the number of unique colors, and pass those to the model. It would happily do the calculation and produce an outcome. It just wouldn't have the meaning we expect it to have.
3. The model doesn't know the meaning of the outcome. It calculates a numeric tensor (scalar, vector, matrix, ...) as a result. It's the program executing the model that needs to interpret this value and convert it to "meaningful" result. This is known as **_postprocessing_**.

## Summary

Hopefully this post helps you understand better what models are and why we can't simply download one and embed it in our code. As frustrating as it is for an application developer, it's a perfectly normal situation for the academic world. Keep in mind people who build models are not software engineers. The requirements we must address while building libraries and tools for mass adoption are typically out-of-scope for them.

So, if you're for example a Java developer who finds a cool model on Hugging Face that does exactly what your enterprise system needs, don't celebrate just yet. Prepare yourself for a potentially disappointing discovery that it can only be used by some Python-specific runtime. If that is the case, hopefully there is room for another piece of critical infra in your architectural diagram.

---

::note{color='soft' title='AI for Application Developers Series' icon='mdi-light-book-multiple'}
The post is part of the [AI for Application Developers](/blog/2026/03/AI-for-Application-Developers) series - my personal notes on various AI topics converted to blog posts.

Please do not hesitate to **correct** me if I got something wrong, **contribute** if something is missing, **ask** me to clarify or simply **share** your experience and views.
::
