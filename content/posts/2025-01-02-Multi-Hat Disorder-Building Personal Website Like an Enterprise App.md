---
layout: new_post
title: Multi-Hat Disorder - Building Personal Website Like an Enterprise App
date: 2026-01-02
image: /assets/multi-hat-disorder.jpg
topic:
  - '[[Software Architecture]]'
---

While I’ve been focused on helping companies grow, my personal brand has taken a hit. I’ve never been interested in being an influencer or a showman, but I’ve come to realize that technical expertise alone isn’t enough anymore. It seems that, in today's world, a "personal brand" carries as much, if not more, weight than the substance itself.

It's been a smooth journey for me over the last two decades. Each new professional opportunity has resulted from someone knowing and appreciating what I’ve achieved in my past roles and engagements. I haven’t had to promote myself; it was the word-of-mouth regarding my knowledge and experience that spoke for me.

As much as I’d like to believe that is still the case, it would be naive and irresponsible to ignore the changes in the software development landscape over recent years. I took a hard look at my personal website (last redesigned in 2016) and had to admit that I wouldn’t intuitively trust the person it portrays for today’s projects. So, I sat down to revamp it.

## Wearing All the Hats

The great thing about building a personal website is that I get to wear multiple hats. I’m the _client_, the _architect_, the _developer_, and the _copywriter_. It's like a proof of concept for a real project, where the toughest negotiations are with myself. I tend to have strong opinions when playing each of those roles, so the most challenging part was letting go and finding agreement on tradeoffs.

Now that I've done the exercise, I'm sharing my thought process. Keep in mind **this isn't a blueprint, a set of best practices, or a pattern to follow**. It's merely food for thought. The irony, sarcasm, and exaggerations are intentional.

## Defining the Goals

A project needs clear goals. If I were to write a formal RFP for it, these points would likely be on it:

```markdown
Objectives

- Show strong professional profile and industry positioning
- Present clear value proposition
- Establish credibility and seniority

Target Audience

- Companies looking for consultants / subcontractors
- Engineering managers, CTOs, PMs
- Architects, team leaders, and developers learning new concepts
- Conference and tech event organizers

Requirements

- Fast, accessible, and SEO-friendly site
- Content editable without developer involvement
- Mobile-first, responsive layout
- Minimal to none hosting costs
- Crawlable without JavaScript
```

Obviously this is just a very small subset but sufficient to illustrate **why** the software is needed and **what** outcome is expected. No project, not even a personal website one, should move forward without answering those questions first.

::hint
If you want to build an RFP-style list like the one above, I strongly recommend chatting with your favorite AI assistant. Don't expect a perfect result immediately, though. Have a conversation, iterate, evaluate, and ask "why". Tell it to remove or change things that don't fit your actual needs. When you think you're done, ask "Is there something I'm missing?".

If privacy is a concern, use private or local LLMs. Many companies run their own inference servers with [vLLM](https://vllm.ai/) or similar runtimes. If your machine has the power, consider something like [Ollama](https://ollama.com/), [LM Studio](https://lmstudio.ai/), [LocalLLM](https://localllm.com/), etc. Even relatively small LLMs these days are being trained on enough requirements documents to provide useful suggestions.
::

## Negotiating the Tradeoffs

### Quick and Easy vs. Maintainable and Simple

Just vibe-code it – that's what the _client_ in me says. Time to market is essential, the value is in the content, not the code, and there are other important things to work on. Those are reasonable and strong arguments. In fact, they initially felt so persuasive that I initially did vibe-code it.

I used [GitHub Copilot](https://github.com/features/copilot). The free subscription was just enough to allow me to use its **plan mode** to build a spec and then implement it. The plan wasn't as detailed as those I'm used to from working with [Cursor](https://cursor.com/), but it wasn't bad. If I hadn't had to save credits for the implementation, I probably would have gone through a few more iterations to polish it, though. The _architect_ was cringing inside, but couldn't deny there was a website that was technically working and arguably meeting most of the requirements. The _developer_ felt he wasn’t involved in the project at all.

If the _client_ was to accept the result and declare the project complete, it would have been yet another amazing vibe-code success story. Sadly, the _copywriter_ reported some issues, the acceptance tests revealed performance and compliance problems, and the SEO-as-a-service provider was very skeptical about the anticipated outreach. As a result, the client requested **a few minor changes**:

```markdown
- Ensure straightforward, unified navigation across devices.
- Allow commenting on and rating of individual content (e.g., blog posts).
- Automatically optimize assets (images, videos, and so on).
- Automatically generate meta tags and Open Graph data from content.
- Ensure compliance with relevant privacy regulations.
- Make it machine-readable and LLM-friendly.
```

In all honesty, I didn't even try throwing those details into an AI prompt hoping it would magically fix the issues and implement the changes correctly. Some would argue it could have worked. I argue that even if it did, it would likely result in more "minor changes." My experience with creating such "infinite loops" in the past suggests the cost (time and tokens) would significantly exceed the project's budget.

Instead, I forced the _client_ and the _architect_ to have a serious conversation about tradeoffs. Clearly, the expectation is that the product would have to evolve and adapt to external forces. From a software architecture standpoint, that rules out a black box that only some AI "knows" how to deal with. From a business value perspective, manually typing the code in is suboptimal, to put it mildly. The compromise we reached can roughly be summarized as "**abstraction level LLM scoping with a context exchange loop**":

- The _client_ uses an LLM to summarize the business context and evaluate scope changes and new requirements against an architectural context.
- The _architect_ designs the solution with simplicity and maintainability as the primary technical goals. An LLM validates the architecture against the business context and produces an architectural one.
- The _architect_ selects a tech stack that matches the knowledge and experience of the _developer_.
- The _developer_ uses an AI coding assistant to quickly implement specific tasks, given the architectural context, but always verifies the generated code and takes full accountability for its quality.

As the famous saying goes, "Context is king." The tricky part is that every changed or added requirement, or implemented decision, changes the environment, which in turn changes the context.

### Build vs. Buy

An off-the-shelf solution that met the requirements without imposing a learning curve on the _copywriter_ would have rendered the project unnecessary. But the _client_ couldn't find an affordable one. On the other hand, developing everything in-house is an amazing opportunity for boosting the self-esteem of the _architect_ and the _developer_. Which sadly carries risks and enlarges the accidental complexity surface.

Take for example the content rating and commenting feature. Technically, it implies managing user accounts and permissions, auditing capabilities, spam protection, etc. Legally, it makes me a Data Controller in GDPR terms. Similarly, collecting information for analytics and improving SEO requires asking users for consent and respecting their choices. If you (like me some time ago) think that a simple "we use cookies" banner solves it, search for "consent mode v2".

The tradeoff here was to swallow the creator's pride (the _developer_), sacrifice some nice-to-have features (the _client_), and account for additional integration logic (the _architect_), in exchange for risk delegation and simplicity. And so, now [Disqus](https://disqus.com/) handles the commenting and rating, [CookieYes](https://www.cookieyes.com/) handles the consent management. The integration, where possible happens through [Google Tag Manager](https://www.google.com/) _(yes, there is a performance related tradeoff here too)_.

### Most Popular vs. My Favorite

While there’s no vendor lock-in risk _per se_, as a _client_ I must consider the hypothetical possibility of transitioning the product to another development team. From that perspective, selecting a widely adopted and popular technology stack is generally preferred. In practical terms (at the time of this writing), that almost invariably points to the `React` ecosystem. It's a mystery to me why so many developers have embraced that somewhat peculiar mix of HTML within JavaScript, but it appears to be the most popular choice. Consequently, this is the stack AI coding assistants are most familiar with.

Me, the _developer_, immediately saw the perfect opportunity to demonstrate Java’s continued relevance. After all, I’ve built countless enterprise systems with it over the past 20+ years. Of course, no JSP or JSF; Vaadin is the way to go. It may not have the ecosystem of popular JavaScript frameworks, but it comes surprisingly close. And if that’s still not enough, the fact that this isn’t a mission-critical project makes it ideal for experimenting with pure HTML+CSS solutions like HTMX and DaisyUI.

A tough one for the _architect_. Java is rock solid but likely overkill for this project. Furthermore, it never ceases to amaze me how few affordable options there are to host Java web applications (why oh why there is no Vercel for Java?). TypeScript seems a reasonable compromise between the expectation of wide adoption and my experience with strongly typed, well-organized languages. And then it's time to open the Pandora's box of UI frameworks. React simply doesn't fit well into the backend developer's mind, even with the help of AI. Svelte is tempting, due to its compiler and generally minimalistic approach, but it feels it’s still a niche rather than mainstream. The risk of Angular forgetting about backward compatibility and turning everything upside down again is something I'd rather avoid. So Vue.js it is.

### Web Application vs. Static Pages

The dilemma here stems from non-obvious contradictions in requirements or previous architectural decisions. Before delegating the rating and commenting features to external providers, a web application would likely have been the most logical choice. With those concerns offloaded, static pages seem feasible and tempting. But then there’s the requirement regarding optimizing assets: do it at runtime for maximum flexibility, or at build/deploy time for maximum stability? What about changing or adding content: query the state at runtime, or regenerate everything at build/deploy time?

With my _architect_ hat on, I want to defer that decision for as long as possible. A definitive call early in the process puts unnecessary constraints on many subsequent decisions. Ideally, I want to pick a tech stack that lets me, the _developer_, build in a way that’s decoupled from the deployment artifact. I've had good success with [Quasar](https://quasar.dev/) in the past, but it would be cumbersome if I chose the SSG road later on. Conversely, tools like [Astro](https://astro.build/) and [VitePress](https://vitepress.dev/) are great for SSG, but extending the out-of-the-box functionality can be challenging. So I decided to go with [Nuxt](https://nuxt.com/), which supports SPA, SSR, and SSG modes and keeps my options open. I like it as a _developer_, too, because I can run in SSR mode locally and see the changes immediately in the browser, and only generate the whole static site when I'm done.

The previous paragraph already reveals my eventual decision to go with a static site. This was largely motivated by a desire to eliminate nonessential infrastructure. It's not that there's anything inherently wrong with Vercel or Netlify—it's just that GitHub Pages works equally well for this use case. Of course, should I need to fully embrace static site generation in the future, that option remains open.

## Discovering a Multi-Hat Disorder

Before you ask, I don’t have Multiple Personality Disorder. Not officially diagnosed, at least. But after writing this piece and reading it back, I feel I do have some sort of Multi-Hats Disorder. Someone please tell me if that needs treatment, and if so, recommend a specialist.

Seriously though, I didn't really apply a full-blown enterprise app development process to produce a personal website. But I did spend a fair share of time thinking about what and how to do, and evaluating different options. At some point it struck me how similar my decision-making process was to the roles I’ve been in the past. Different domain, scale, importance, timeline—virtually everything—yet the fundamental concerns and tradeoffs are almost identical. So I started taking notes, hoping to come up with some pseudo-smart social media posts. It ended up being a pseudo-smart blog post. Oh well, I hope it was worth your time.
