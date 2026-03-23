---
layout: new_post
title: Anatomy of a Model From a Developer Perspective
date: 2026-03-23
image: /assets/AnatomyOfAModel.png
---

In the old days, every IT organization had a dedicated, almost sacred role: the DBA (Database Administrator), often informally known as the "Gatekeeper of the Schema." These individuals ensured that the schema adhered to 3NF (Third Normal Form), that the appropriate fields were indexed, that no foreign keys were missing, that data was accurately partitioned, and that the overall structure resembled a proper "Star" or "Snowflake" schema. Most of this was a mystery to software developers who simply wanted to store and retrieve data via SQL, but it was crucial from a resource efficiency perspective.

It's a similar situation today. ML experts are the "Gatekeepers of the Model", and they happily use mystique terms like transformers, RNN, CNN, CLIP, BERT, GPT, LLaMA, ResNet, Whisper, etc. that mean absolutely nothing to a software developer. We are told it's not our concern and asked to just use the API. And when we complain about getting the wrong results, the explanation is that we used an unoptimized ~~query~~ prompt/context. Déjà vu!

However, AI/ML models share conceptual similarities with databases in several ways. You don't need to know how to build a database to use one, but it helps to understand in what way a relational database differs from a document store, a key-value store, or a graph database. The more you know about indexes, foreign keys, properties, labels, edges, vertices, and so on, the easier it is to pick the right database for the use case. It's the same with models.

## The Skeleton

As discussed in [this previous post](/blog/2026/03/AI-ML-Models-Are-Not-Libraries#using-a-model), all models are essentially complex chains of mathematical functions that accept numeric input and compute numeric output. That is yet another oversimplification, as internally, most models have a layered structure and specific expectations regarding the data format and structure. Conceptually, this is similar to how different databases expect data to be structured in tables, JSON documents, key-value pairs, or directional graphs, and how that shape impacts what operations are possible or easier to perform.

### Ingestion

While it's not a layer within the model, it's sort of an API for the model, or a contract, if you will. A model doesn't simply accept a bag of numbers. It expects those to be in a certain shape. It's the responsibility of the code executing the model to properly prepare the data. For example, Natural Language Processing (NLP) models expect a sequence of token IDs as an input. The caller needs to use a specific tokenizer to convert the raw text it has into such a sequence. Similarly, Computer Vision (CV) models may expect a sequence of fixed-size matrices. The code executing the model needs to slice an image or a video frame accordingly and prepare the matrices.

### Projection

Even though the input is already numerical, most models don't work directly with those numbers. They "project" them into vectors that carry some semantic meaning. So when a GPT model gets `[15546, 527, 499, 30]` _(the IDs of the `['How', 'are', 'you', '?']` tokens)_ it checks its id-to-vector lookup table and gets

```json
[
 [ 0.0154, -0.0211, 0.0892, -0.0441, 0.0123, ... ],
 [ -0.0031, 0.0456, -0.0112, 0.0334, -0.0089, ... ],
 [ 0.0221, -0.0104, 0.0558, 0.0112, -0.0445, ... ],
 [ -0.0552, 0.0012, -0.0334, -0.0021, 0.0991, ... ]
]
```

Sometimes the input values are not within a finite range, so a lookup table is not an option. In such cases, the model may use a function to project them to vectors. Ultimately, though, it's the tensors holding the semantic meaning and learned during training that the processor works with later on.

::note{variant='soft'}  
In some architectures, the boundary between these layers is fluid. For example, in Computer Vision, the "Projector" is often just the very first layer of the "Processor".
::

### Processor

This is the backbone of the model - the place where the heavy computation happens. The goal is to find meaningful relationships between the individual data points in the input. I'll not pretend I understand how this works in detail. What is important is that it produces some sort of raw relationship map.

The way I like to think about the processor is as if it were a stored procedure (or a script) in a database that does the heavy lifting and produces a giant table/view/graph/object/document. The information I want is there, but mixed within volumes of other data. I could extract it myself, but I'd rather have the model do it for me.

### Head

This is where the extraction happens. At this phase, the model converts the giant tensor from the processor into something simpler and more aligned to the caller's expectations.

Having a 'detachable' head allows ML engineers to reuse model architectures for different purposes. For example, the processor of a model designed to deal with text will produce a giant relationship map between tokens. Then different heads can be attached to this model to narrow down its purpose. Here are some examples of heads that operate on the same result from the processor to deliver different results:

- Flatten the giant tensor to a single vector representation of the input. We could use such a model to get the vectors for different texts, calculate the distance between them, and tell how semantically similar they are _(semantic search)_.
- Map the processor outcome to some predefined categories _(classification)_ or terms _(named entity recognition)_.
- Compute scores for each token in a fixed-size vocabulary representing the likelihood of that token being the next in the sequence _(prediction)_.
- Generate another sequence that is shorter _(summarization)_ or represents different application level data _(translation)_ while keeping the same meaning.

## The Architectures

The skeleton above describes the layers but doesn't tell what exactly sits in them. If it were referring to applications, it would be like saying we have `parser -> adapter -> service -> formatter` flow. It gives us a rough idea, but it is not enough to implement an actual solution. Defining what those layers do is what the ML world calls "Architecture". Mostly, it describes the specific computation algorithm the Processor is using, but that often implies how the other parts are structured.

::note{variant='soft'}  
The terminology in the ML world can be very confusing for an outsider. It's really hard to know exactly what a term means without the full context. I use "Architectures" here as that one seems to be the most popular, but you will also see "Models", "Design Patterns", or simply "Neural Networks". And if you dig into those in a bit more detail, you may start thinking they are just algorithms. It's no different than how we developers often call the same thing a module, a library, and a framework depending on the context.
::

### Transformer

This architecture is designed to process relatively long sequences of data points _(tokens, parts of an image, slices of a sound wave, ...)_. During training, the model builds a map of semantic connections between all entries in the training sequences. The computational graph is a multilayered math engine performing a series of calculations between the learned weights and any given sequence of data points. The result is a mathematical representation of the relationships between the data points within the input and within the model's vocabulary.

There are three flavors of the transformer architecture.

#### Encoder-Only

This architecture computes a complex tensor representing the relationships and stops there. To do that, the processor typically examines the entire sequence at once (comparing every data point to every other point).

The output depends on what head is attached. It could be a single vector representing the semantic meaning of the entire sequence. It could be a scalar identifying one of multiple predefined categories. Or it could be binary-like classification _(spam / not spam)_.

Models with this architecture are primarily used in semantic search, similarity assessment, classification, and named entity recognition (NER) use cases.

#### Encoder-Decoder

This architecture consists of two computational graphs: a headless encoder, as described above, and a decoder. Using such a model is a two-phase process. The code executing the model first runs the encoder to get the tensor representing the relationships in the input sequence. Then it runs the decoder passing that tensor.

The decoder's compute engine is designed to compute another vector that describes what the next data point should be like. Then the head converts this to a value that the calling code can handle. If more data points need to be generated _(text generation, sequential predictions)_ then the code calls the decoder in a loop, passing every time the tensor from the encoder and the sequence of tokens it builds from all previous iterations.

The primary use for such models is translation and summarization. Their ability to see relationships between all data points makes them extremely accurate. The drawback is that accuracy comes at the price of significant memory consumption.

#### Decoder-Only

In this architecture, there is no dedicated encoder. Instead, the decoder's processor computes the semantic representations of the input sequence on the fly during the generation phase. It does so by processing one data point at a time _(even though it technically has all)_ and comparing it to all previous points. After it processes the last point in the input sequence, it produces a vector describing the features of the next entry. The head then converts that vector to the expected target value.

In text generation _(the most common use case for this architecture)_, the head produces logits - a matrix of scores for each token in a fixed-size vocabulary representing the likelihood of it being the next in the sequence. The code calling the model picks the most probable one, adds it to the input sequence, and executes the model again.

Because there is only one processor, these models are easier to train on large datasets, tend to be more flexible, and scale better than Encoder-Decoder ones. Because they never "look forward", appending tokens to the input doesn't change the vectors already computed. This makes the once-computed vectors cacheable, which is great for chat-like scenarios.

This is the architecture most, if not all, Large Language Models (LLMs) employ.

### RNN/LSTM

Like transformers, Recurrent Neural Networks (RNNs) operate on sequences. Unlike a transformer, they don't get the entire sequence at once. Their input consists of a single item and the state computed during the previous iteration. Their output also has two parts - the state and whatever the head produces. The code executing the model is responsible for maintaining that state between iterations.

The Long Short-Term Memory architecture (LSTMs) is a specialized version of the same concept but with an improved memory management system. In RNNs, the state is overwritten at every step. In an LSTM, there are three logic gates that control what information is removed, retained, and added.

While largely replaced by transformers for text, this architecture is naturally suited for time-series data or streaming telemetry where the order of events is the most critical piece of information.

### SSM

The State Space Models (SSM) architecture is an evolution of the RNN concept, aiming to solve the "forgetting" and performance issues with long inputs. Similarly, it operates on a sequence of data points and needs the code to maintain a state from previous iterations. Therefore, the execution flow is identical to an RNN. The code passes the current data point and the previous state to the model, and it returns the result plus a new state to store for the next call.

The difference is how this state is calculated. I'll spare you the details _(mostly because I have trouble understanding them myself)_ but apparently SSM's computation graph is designed in a way that can better decide how to handle the new data point using less computation power. The fact that they don't carry the entire context is both an advantage and a disadvantage compared to transformers. [This paper](https://arxiv.org/html/2601.01237v1){target=_blank} benchmarks them against transformers and shows _"12.46× better memory efficiency and 10.67× faster inference at 4,096 tokens, with the efficiency gap growing as sequence length increases"_. The same paper also indicates that _"Transformer's explicit attention mechanism provides interpretable token-level attribution, and prior work demonstrates superior performance on tasks requiring precise associative recall"\_.

### CNN

Convolutional Neural Networks (CNN) process grid-like data by looking for local patterns. They are mostly used with images, but they can process anything that can be represented as a numeric grid - audio waves, text sequences, sensor data, and more.

The grid size is fixed per model. Historically, a `224 x 224` shape _(roughly 50K data points)_ was kind of the golden standard. Today's models may offer bigger grids like `512 x 512` or even `1024 x 1024`, but the hardware requirements for processing such a scale grow dramatically. To meet the ingestion requirements, the code running the model has two options: scale the input data to the expected size or chunk it into properly sized fragments and run the model independently for each. Also, the values in the cells must be in the `0.0 - 1.0` range, so the code needs to normalize those as well before executing the model.

The model projects the input grid into a feature map by sliding a smaller _(e.g., `3x3`)_ mask over it, performing a convolution. This is a fancy way of saying it calculates a dot-product at every possible stop to see how well any given grid fragment matches a specific pattern. The resulting tensor describes the features of all (overlapping) fragments of the input matrix. Then, in a number of layers, the model performs complex computations to find relationships between those fragments. The outcome is a dense, high-dimensional vector representing every pattern found.

Finally, different heads can be attached to extract meaningful data from those patterns. For example, a classification head may map it to scores like `[Cat: 0.98, Dog: 0.01, Hotdog: 0.01]`. A detection head may return the coordinates of where a pattern was found.

CNNs are the industry standard for image classification, object detection, and facial recognition, but could also be useful and efficient for speech processing, fraud detection, stock market prediction, and more.

### ViT

Technically, Vision Transformer (ViT) is an adaptation of the transformer architecture for vision. Instead of taking a fixed-size data grid as an input like CNNs do, it expects a sequence of small-size data grids _(e.g., `16x16` each)_ flattened to 1 dimension. At this point, the input is exactly what a transformer needs in order to start comparing every data point to every other data point and building a tensor of semantic knowledge. But there is a catch.

The sequence misses very important information about the positioning of the data points. There is nothing that says "this data point is top-right from this other data point". To solve that, the model has an internal grid of slots (e.g., `224 x 224`) where it puts the data points. Thus, the input sequence length must match the number of slots in that grid. It also means that input shapes like `112 x 448` and `448 x 112` are essentially a `224 x 224` ones for the model.

An evolution of that architecture is the "Native Dynamic-Resolution ViT" which doesn't use internal grids. Instead, it allows the caller to provide dimensions and relative positions of the data points. This makes it possible to process input images with variable resolutions.

### CLIP

Contrastive Language–Image Pre-training (CLIP) is what some people call a Meta-Architecture. Conceptually, it is a dual encoder that uses a transformer for text encoding and ViT or CNN for image encoding. A CLIP model is typically trained on a set of natural language fragments and a set of images and learns which mappings between those make sense and which don't. While each produces an embedding representing the input independently, they share the same [latent space](https://en.wikipedia.org/wiki/Latent_space){target=\_blank}, so vectors for texts and images that are semantically similar are closer to each other.

In reality, those are often distributed as a pair of two models (text and vision) that are trained to work together. From an application developer perspective, you run two models and get whatever their heads produce _(usually an embedding)_. Then the app plays the role of the final head. It could measure the distance between two vectors to estimate similarity. Or it could compare multiple text embeddings to one vision embedding to find the best description for an image.

Occasionally, there are combined unified releases that accept both the text and the image, run the two flows internally, and process the result through a specialized head.

### Latent Diffusion

This is the architecture for image generation, and it can literally flood you with complex math formulas if you Google it. Conceptually, though, it is reversing the process of adding noise to a dataset. During training, a model gets datasets and gradually adds noise to them. It does this in `timesteps` _(e.g., 1000 iterations)_ and learns a transition pattern from a meaningful dataset to "random" noise. Then, during inference, it is given some noise and a semantic representation of the desired outcome, and it works backwards to "restore" a dataset.

Technically, we can execute such a model with just noise. It will randomly select a tensor that represents the outcome and work towards it. For all practical terms, though, we want to provide that tensor ourselves. We can create it from:

- Text input like "Generate an image of a coffee cup" by using a CLIP model
- Source image by using a Variational Autoencoder (VAE) Encoder model
- both combined

Many application developers _(past me included)_ at this point think that we just send that data to the model and get the result. It's more complicated than that. The model has learned the migration paths from `timestep` to `timestep` and going back straight from 1000 to 1 would mean loosing most of the details. That doesn't mean we need to run all `timesteps` in reverse, but our code must orchestrate the generation. For that, we need a scheduler that runs the model in a loop _(e.g., 20 or 50 times)_ and on each iteration passes the current noisy latent tensor and the `timestep`. In return, it gets a tensor telling it how much noise to "subtract".

The model usually doesn't have a head because we need that latent tensor for the next iteration. Thus, the code running the process is typically the head. To convert that final latent tensor into a pixel map, we use yet another model _(e.g., VAE Decoder)_.

## The Implementations

I find that having a basic understanding of the architectures is essential for using models properly and efficiently. In practical terms, however, we look for an implementation not by architecture but by what problem it solves. So here are some implementations grouped by their primary use case.

### Text Generation & Reasoning (LLMs)

These are almost exclusively Decoder-Only Transformers.

The most prominent model families in that space are **GPT** by Open AI, **Claude** by Anthropic, and **Gemini** by Google. They are all proprietary, and we cannot get the model files. We can only interact with them via APIs.

The open-source / open-weight models families list includes **Llama**, **Mistral / Mixtral**, **Grok**, **GPT-OSS**, **DeepSeek**, **Qwen**, **MiniMax**, and many others. While mostly used via inference providers or apps like `Ollama` or `vLLM`, we can technically interact with them directly from our code. The issue is that those are very large models that require enormous GPU power and hundreds of GB of memory. We can still run quantized versions of them locally, though _(more on that in upcoming posts)_.

### Computer Vision & Image Analysis

These models power everything from FaceID to autonomous driving. If that's what your app needs, take a look at

- **ResNet:** This is the classic CNN implementation. It is an open-source model family. If you need to classify images on an edge device with no GPU, this is your go-to.
- **Segment Anything (SAM):** An open-weight model from Meta using a ViT architecture. It can "cut out" any object in an image.
- **YOLO (You Only Look Once):** The gold standard for real-time object detection using a CNN. It is open-source and can run on a live video feed at 60+ FPS, even on modest hardware.

### Audio & Speech Processing

Models that bridge the gap between sound waves and text are often implementations of the Encoder-Decoder Transformer or RNN architectures. The ones you'll likely hear most often about are

- **Whisper (OpenAI):** An open-weight implementation of an Encoder-Decoder Transformer.
- **Qwen2-Audio:** An open-weight models that can "hear" audio and respond to it without a separate STT (Speech-to-Text) block.
- **CosyVoice:** An open-source model for low-latency streaming audio

### Image & Media Generation

These are complex orchestrations, usually involving a Latent Diffusion loop. **DALL-E** from Open AI is the precursor but it's proprietary and only available through ChatGPT or the OpenAI API.

**Stable Diffusion** is the most popular open-weight implementation. Developers have built massive ecosystems around it (like [Stable Diffusion web UI](https://github.com/automatic1111/stable-diffusion-webui){target=\_blank} or [ComfyUI](https://www.comfy.org/){target=\_blank}) that allow wiring up the U-Net, VAE, and CLIP models manually for total creative control.

**Flux (Black Forest Labs)** is a state-of-the-art open-weight model that combines diffusion with a transformer backbone. It produces much higher quality text-within-images than older versions of Stable Diffusion.

### Semantic Search & Embeddings

This is a crowded space, but those that you should know about are

- **all-MiniLM-L6-v2:** The "classic" Encoder-Only Transformer. It is tiny (only 22M parameters) and incredibly fast.
- **BGE-Small / BGE-Base (BAAI):** The modern successor to MiniLM. It uses a similar Encoder architecture but was trained with much more advanced techniques.
- **Nomic Embed:** An open-source family of models that are incredibly popular for text-only RAG, but they also offer multimodal versions. They are known for "Matryoshka Embeddings", which lets us shrink the size of the data (from 768 down to 64 dimensions) to save on database costs without losing much accuracy.
- **OpenAI CLIP:** An open-weight CLIP (Dual-Encoder) model that started the trend of mapping different types of data (text, images, even audio) into the same vector space
- **Jina CLIP:** A powerful open-weight alternative that has much better text encoder (JinaBERT) that can handle long documents and 80+ languages, making it much more practical for real-world apps like search through PDF files using images.

## Summary

I remember when software developers had a mental equal sign between data persistence and DB2/Oracle! Today, we're much more discerning about choosing the right storage solution for the job, and it might not even be an RDBMS. Meanwhile, the "AI equals LLMs" mindset is gaining traction. While transformers are powerful and versatile, they're not always the best fit.

When looking at the AI landscape, it's tempting to go with the LLM that scored highest in a benchmark, but we should focus on finding the right tool for the problem at hand. I hope this post helps you do just that - make more informed decisions about your AI solutions.️

---

::note{color='soft' title='AI for Application Developers Series' icon='mdi-light-book-multiple'}
The post is part of the [AI for Application Developers](/blog/2026/03/AI-for-Application-Developers) series - my personal notes on various AI topics converted to blog posts.

Please do not hesitate to **correct** me if I got something wrong, **contribute** if something is missing, **ask** me to clarify or simply **share** your experience and views.
::
