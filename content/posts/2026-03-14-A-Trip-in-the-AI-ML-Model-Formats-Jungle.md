---
layout: new_post
title: A Trip in the AI/ML Model Formats Jungle
date: 2026-03-14
image: /assets/ModelFormatsJungle.png
---

As developers, we can immediately recognize the structure of a `.csv` file and how it differs from a `.md` one. Want to experience the frustration of someone completely lost when faced with those extensions? Then take a trip through the `.bin`, `.pb`, `.h5`, `.nemo`, `.dduf`, `.pt`, `.pth`, `.ckpt`, `.safetensors`, `.onnx`, `.gguf`, ... jungle of model formats.

In the section "[The Model Artifact](/blog/2026/03/AI-ML-Models-Are-Not-Libraries#the-model-artifact)" of the previous post, I wrote that producing a model means storing the weights, biases, and architecture in a persistent form. Well, that was an oversimplification. In reality, what's actually stored and distributed varies considerably.

## Weights-Only Formats

Sometimes the architecture of a model _(more on that in follow-up posts)_ is "well known" or follows a standard. Moreover, the ML/math libraries that data scientists use already have at least the primitives for executing such architectures. In the simple example from the previous post, we used the "dot product" and "sigmoid" functions—both of which are available in every single ML framework. So, if we only need to share our model with fellow researchers who use the same framework, we don't need to embed those primitives within the model itself. All we share are the weights and biases we learned.

The non-Python application developer's nightmare is that the vast majority of models are "distributed" in such formats. This is also the primary driver behind the common perception that Python is the only viable option for running ML/AI models.

Here are the weights-only formats that you may see most often in model repositories:

- **`.bin` / `.pth` / `.pt`:** These are essentially serialized Python objects. They are one of the most common formats because many researchers use PyTorch. The original Python source code is needed to define the "class" before the data can be loaded.
- **`.safetensors`:** The successor to `.bin` addressing a security flow in those above that allows execution of malicious code upon loading.
- **`.ckpt`:** It's a snapshot of the model's state at a specific point in time. Like a core dump, it's heavy and often contains "optimizer states" that you don't actually need for inference.

## Mostly Self-Confined Formats

Storing the architecture within the model is what enables portability. Such model formats don't require the same framework used during training to run; instead, they target a specific inference runtime. Some runtimes are available as libraries that can be embedded in or used by different languages and software stacks, while others can run standalone.

If the architecture is well-known and natively supported by the targeted inference runtime, the model format may only store a reference to it. Otherwise, it may store a definition of the entire computational graph that the runtime instantiates.

As an application developer, those are your best friends:

- **`.onnx` ([Open Neural Network Exchange](https://onnx.ai/){target=\_blank}):** It's an open standard for machine learning interoperability that defines a standard set of operators. A model in `.onnx` format can run on the `ONNX Runtime` in C#, Java, or even in the browser via WebAssembly.
- **`.gguf`:** Currently the king of local LLMs. It is a single-file format that stores the weights, the architecture, and even the metadata (like the tokenizer). It's processed by the [ggml](https://github.com/ggml-org/ggml){target=\_blank} library, which is mostly used by [llama.cpp](https://github.com/ggml-org/llama.cpp){target=\_blank}, but it could hold other model architectures too.

The following are also mostly self-contained but somewhat less portable/embeddable:

- **`.pb` :** The format used by TensorFlow. It stores the computational graph as a frozen protobuf file. Like ONNX, it's designed for production environments and can be run via TensorFlow C++/Java (Legacy).
- **`.tf` / No extension:** This is a directory structure. It contains a `saved_model.pb` (the graph) and a `variables/` folder (the weights). It is a standard for production deployment via TensorFlow C++/Java/Go SDK
- **`.tflite` / `.litertlm`:** This is a highly optimized format for mobile and edge devices. The [LiteRT](https://ai.google.dev/edge/litert){target=\_blank} runtime has libraries for Kotlin/Java, C/C++, Swift / Objective-C, and even in browser JS/TS (via WASM)
- **`.dduf`:** It stands for **Diffusion Unified Format**, and it was created as self-contained format for diffusion models which normally consists of few sub-models (image decoder, text encoder, generator, denoising, ...). It's essentially an uncompressed ZIP file meant to be used with [`diffusers`](https://github.com/huggingface/diffusers){target=\_blank} Python library.

### Why "Mostly"?

Inference runtimes _(or rather the application they run within)_ often require more than just the model itself. They typically expect some configuration to be passed together with the model. Many models assume the input was prepared using certain tools like vocabularies and tokenizers. As a general rule, such resources do not make it into the model file and are distributed separately. You can think of those as "dependencies" or "sidecars".

Here are the most common ones:

- **`tokenizer.json` / `tokenizer_config.json`:** They contain the mapping table between words and token identifiers and are essential for LLMs. The application calling the runtime uses it to convert the user input into token IDs used in computation _(more on that in a separate future post)_
- **`preprocessor_config.json`:** They usually accompany image/audio models. It tells the app how to resize, crop, or normalize an input before the model can process it.
- **`config.json`:** Think of this as the `.env` or `application.properties` for the app/wrapper running the inference engine.

## Inspecting the Model's Content

As application developers who mostly just want to use models, we typically only care about the contract: the inputs and outputs. But sometimes those are not clear, and you might need to "peek under the hood" of a model file. When that happens, head over to [Netron.app](https://netron.app/){target=\_blank}.

This web app is a visualizer that takes a model file and renders it as a directed graph. It executes entirely in your browser and works with almost all model formats. Point it at a model, and it shows you the "flow" of data. It's a bit like using a decompiler or a profiler. It's especially helpful when dealing with a model that's not well documented, and you need to verify exactly what inputs the model expects and what the output shapes look like.

## Converting Between Model Formats

At the time of writing, the AI/ML ecosystem largely distributes models as weights-only or in formats specific to Python frameworks. This leaves application developers in other fields with two choices: incorporate Python infrastructure into their architecture, or convert the model to a portable format.

The good news is that most frameworks used to train models can export them as `.onnx`. The bad news is that doing so will likely require some Python scripting and familiarity with those libraries. Or, if you're feeling brave _(I'm trying to avoid the word "reckless" here)_ you can ask AI to do it for you. Conceptually, the process is straightforward: you use PyTorch, TensorFlow, JAX, and so on, to load the model from its original format and then export the loaded model as `.onnx`. In practice, however, this may require a much deeper understanding of the model architecture than an application developer is willing to learn. Especially when various things start to break.

## Open Models & Model Licensing

Many models, especially the popular LLMs, are proprietary and not publicly available. The format in which they are stored is irrelevant for an application developer, as we can only use them through the APIs and apps their vendors _(or partners)_ provide.

However, there are plenty of open models that we can download and run ourselves or embed in our apps. The meaning of "open" in this context is a bit tricky. While many vendors claim to release open-source models, they often actually release models with open weights.

- [Open Source AI Definition (OSAID 1.0)](https://opensource.org/ai/open-source-ai-definition){target=\_blank} mandates that a model grants the freedom to use, study, modify, and share it. To satisfy those expectations, a model must provide the weights, the parameters, the training code, and a detailed "provenance" of the data used, including how it was cleaned and labeled, so a skilled person could build a substantially equivalent system.
- [Open Weights](https://opensource.org/ai/open-weights){target=\_blank} specifies, on the other hand, that only the final weights and biases of a trained neural network need to be made available.

As with libraries, each model usually comes with a license. Some use traditional licenses like Apache 2.0, MIT, or GPL. Others have custom licenses with additional restrictions. For example, the Llama model licenses famously state that if you have more than 700 million monthly active users, you need to request a special license from Meta.

## Model Repositories

As of 2026, [Hugging Face](https://huggingface.co/){target=\_blank} is the largest model repository, hosting millions of models, datasets, and demo apps (Spaces). It's often referred to as the "GitHub" of AI, although if you're old enough to remember those days, it might bring back memories of the SourceForge era of open-source projects. As an application developer, this is your best bet - just be aware that you are a visitor in a data scientist's land.

[ModelZoo](https://modelzoo.co/){target=\_blank} is a curated collection of various models with one major advantage: unlike Hugging Face, it's not flooded with experimental or half-baked models. However, its benefit comes with a caveat - most of these models point to GitHub repos with source code, rather than exported model artifacts.

The [ONNX Model Zoo](https://github.com/onnx/models){target=\_blank} is a curated collection of pre-trained models in the ONNX format. Although the actual collection is now maintained on Hugging Face, the linked legacy README still provides valuable insights about the collection.

[Kaggle](https://www.kaggle.com/){target=\_blank} is primarily used for AI competitions, but it also hosts a vast library of models and datasets.

## Summary

The current AI hype and the LLM supremacy wars between the famous vendors paint a picture where using pricey services is the only option. A good software architect should remember that it isn't. Sometimes a smaller, specialized model is a much better fit. Sometimes there are strict compliance and data residency requirements to adhere to. It's good to observe the AI ecosystem evolving towards openness, but there are roadblocks. Figuring out what those model files are and how they're meant to be used was one such roadblock for me - hopefully it won't be for you.

There are repositories to find open models. Don't let the various unfamiliar formats scare you off. If you're lucky, the model you need will already be available in a portable format like `.onnx`. For local LLM models, `.gguf` will let you run them almost anywhere, thanks to `llama.cpp`. Even if you only find a weights-only format, you still have an option to convert it to a portable one. It may require some Python skills, but it's not rocket science.

---

::note{color='soft' title='AI for Application Developers Series' icon='mdi-light-book-multiple'}
The post is part of the [AI for Application Developers](/blog/2026/03/AI-for-Application-Developers) series - my personal notes on various AI topics converted to blog posts.

Please do not hesitate to **correct** me if I got something wrong, **contribute** if something is missing, **ask** me to clarify or simply **share** your experience and views.
::
