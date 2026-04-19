---
title: "Neural Link — A Local RAG System That Remembers My Projects"
date: 2026-04-19
draft: false
tags: ["AI","python","miniproject","taciturn"]
---

## What is it?

Neural Link is a project memory system I built that lets me query all my project notes, documentation, and context using natural language — and get accurate, specific answers back. It runs entirely on my MacBook Air M2, no cloud, no subscriptions. Think of it like a search engine that actually understands what you're asking, but trained only on my own notes.




<img src="/images/Screenshot_2026-04-19_at_03.09.32.png" style="width:79%" />

It lives at brain.taciturn.uk.

## Why I built it

The main reason as to why I built it was so that i could have a library of infomation about the projects ive developed, this means i can quickly scour for previous bugs and solutions aswell as finding data and lines of code which come in handy, from small things to restarting every project at once, the rag system saves me a huge amount of time and acts like an ai personal assistant 

I wanted a system where that context just existed — permanently — and could be queried at the start of any session. Something that's read all my Obsidian notes, all my project files, all my handoff documents, and can tell me what I need to know immediately.

That's Neural Link.

## How it works

The system has two main parts: an ingestion pipeline and a query interface.

**Ingestion** — A Python script reads every `.md` and `.canvas` file in my Obsidian vault, splits them into overlapping chunks of around 600 characters, and stores them in ChromaDB — a lightweight local vector database. ChromaDB converts each chunk into a numerical embedding (a vector that captures the semantic meaning of the text), so similar content ends up close together in vector space. The whole vault — every project note, every to-do list, every handoff doc — gets indexed in under a minute.

**Query** — When I type a question into the interface, ChromaDB finds the 14 most semantically similar chunks from across my notes. Those chunks are assembled into a context block and passed to llama3.2 running locally via Ollama, along with the question. The model reads the context and writes a direct, specific answer. No internet, no API costs, entirely offline.

The key thing that makes this different from just doing a text search is the semantic matching. If I ask "what signals does Taciturn use?", it doesn't look for those exact words — it finds notes that talk about vol_momentum_bull, EMA slopes, cooldown periods, and backtesting results, even if none of those chunks contain the phrase "signals does Taciturn use". It understands the meaning, not just the keywords.

## The visual

I didn't want it to just be a chat box. The frontend is a canvas-based neural network visualisation — each node represents a document in the vault, clustered by category (Taciturn, News, Carbon, Portfolio, Core). Glowing hex nodes drift slowly across a dark grid, with particle streams flowing along the edges between related documents. You can click any node to instantly query it, or type freely in the terminal at the bottom.

There are sliders to control drift speed, pulse rate, glow radius, particle density, and edge opacity — and an optimise mode that cuts the animation down to ~20fps and kills the particles if I need to save battery.

## Tech stack

- **ChromaDB** — local vector database, stores and queries embeddings
- **llama3.2 via Ollama** — runs the language model entirely on-device (Apple Silicon)
- **Flask** — serves the web interface on port 8090
- **Cloudflare Tunnel** — exposes it publicly at brain.taciturn.uk
- **macOS LaunchAgent** — starts automatically on login, no terminal needed

## What surprised me

The retrieval quality is genuinely good. I can ask things like "what was the major loss event that changed how Taciturn handles cooldowns?" and it finds the relevant notes and answers correctly. It's not perfect — if a file hasn't synced from iCloud, or a concept is spread too thinly across chunks, it can miss things — but for project-specific recall it's significantly better than I expected from a local setup.

The other thing that surprised me was how fast it is. Ingestion takes about 45 seconds for the full vault. A query including retrieval and model inference takes 10–20 seconds on M2. That's fast enough to be actually useful at the start of a session.

## What's next

The main limitation right now is that it only knows what's been written down. If I did something significant in a session but didn't document it, Neural Link doesn't know it happened. The next step is building an automatic session summariser — something that watches what I build in each chat and updates the Obsidian vault automatically, so the memory actually grows over time.

---

link to the project  
https://brain.taciturn.uk/