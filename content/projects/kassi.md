---
group: apps
order: 1
short: "Kassi"
sub: "iOS · Personal Dashboard"
started: "Jun 2026"
blurb: "A private personal dashboard for iPhone and iPad. Money, health, training, spending and time on one screen."
badge: "Pre-launch"
title: "Kassi"
date: 2026-07-31
draft: false
tags: ["ios", "swift", "app", "productivity", "fintech", "privacy"]
description: "A private personal dashboard for iPhone — money, health, training, spending and time on one screen. Local-first, no accounts, no tracking."
aliases: ["/projects/kestra/"]
---

![Kassi icon](/images/kassi-icon.png)

## What Kassi Is

Kassi is a native SwiftUI app that replaces the dozen apps you check each morning with one screen you build yourself. Money, health, training, food, spending, parcels, trains, calendar and weather — arranged into pages from a library of over forty widgets.

The thesis is that most screen time is fragmentation. Ten apps, ten feeds, ten sets of notifications. Kassi collapses them into a single glanceable surface with no feed and nothing to scroll — you check it, get what you need, and put the phone down.

<div style="display:flex;gap:1rem;overflow-x:auto;padding-bottom:1rem;margin:2rem 0">
<img src="/kassi-shots/08-personal.png" alt="Kassi home screen" loading="lazy" style="flex:none;width:260px;border-radius:28px" />
<img src="/kassi-shots/03-finance.png" alt="Kassi Finance screen" loading="lazy" style="flex:none;width:260px;border-radius:28px" />
<img src="/kassi-shots/04-money.png" alt="Kassi Money screen" loading="lazy" style="flex:none;width:260px;border-radius:28px" />
<img src="/kassi-shots/02-health.png" alt="Kassi Health screen" loading="lazy" style="flex:none;width:260px;border-radius:28px" />
<img src="/kassi-shots/11-wellbeing.png" alt="Kassi Wellbeing screen" loading="lazy" style="flex:none;width:260px;border-radius:28px" />
</div>

## Built Local-First

The architectural decision that shapes everything else: **there is no server.**

No accounts, no analytics, no tracking, and no backend the developer operates. Data lives in `UserDefaults` on the device; API keys live in the iOS Keychain. When a widget reads from Trading 212 or WHOOP, the request goes **straight from the phone to that service** using a key the user supplies. Nothing passes through a middleman, because there is no middleman.

That makes the App Store privacy label an honest "Data Not Collected" rather than a carefully-worded one. It also means zero hosting cost and no scaling problem — the app works identically for one user or a million. The trade-off is real and deliberate: no analytics means no visibility into how it's used, and bring-your-own-key narrows the audience to people willing to paste an API key.

An optional personal server — one the *user* owns — adds Obsidian sync, the AI briefing and WHOOP OAuth. The app is fully functional without it.

## The Widget System

Everything is a widget, and users assemble their own app:

- **Add, rename, reorder and delete pages**, with drag-to-reorder widgets inside each
- **40+ widgets**: weather by the hour, calendar, Apple Health rings, WHOOP recovery, medication, macro tracking, training diary, tasks, notes, parcels, net worth, Trading 212 portfolio, statement analysis, spending map, what-if calculator, dividend and economic calendars, trains, aircraft overhead, service uptime, infrastructure cost, plus three games
- **Templates** — Trader, Fitness, Minimalist or Default — so a new user is set up in one tap

## Features Worth Calling Out

**The Logger.** Press the iPhone Action Button, speak, and Kassi works out what you meant. *"Spent £20 at Tesco"* files to spending and deducts from the right pot. *"I ate porridge for breakfast"* becomes macros. *"Did legs, RPE 8"* becomes a training session. *"I have an idea…"* goes to notes, and on to Obsidian. Routing is rules-based rather than a model call — deterministic, instant, works offline, and testable.

**Try before you connect anything.** First launch offers sample data instead of an empty grid: every widget fills with realistic numbers so the app is legible before a single API key is entered. One toggle in Settings wipes it back to a clean install. It also solves the App Store reviewer problem — nothing to look at with no accounts to sign into.

**Earnings Radar.** A nightly job pulls official filings from the SEC's EDGAR system, scores fundamentals in Python, and writes a briefing on the three strongest companies reporting soon — with an analyst you can question. Every figure is computed deterministically; the language model only writes prose over numbers already verified, so it cannot invent a statistic.

**Spending by voice, mapped.** Purchases logged by speech are geotagged and plotted, so spending patterns show up geographically. The parser handles UK money slang — *"a fiver"*, *"couple of tenners"*, *"two bands"*.

**Chess.** A rewritten engine with full legal move generation, castling, en passant, promotion, piece-square tables and quiescence search, running off the main thread. Pieces are drawn as geometry rather than Unicode glyphs, so they match the rest of the app.

## Design

A deliberately anti-default visual language: **Instrument Serif** for display type, **Geist Mono** for every number and label, warm off-white on near-black, and an acid-lime accent. Zero corner radius throughout — hard edges, hairline rules, data rendered as texture rather than chrome.

Personalisation is extensive: 18 themes, 24 accent colours or any custom colour, four typography styles, three layout densities and a bounded text-size scale.

### The original screens

These are the design references from the July 2026 redesign, when the app was still called Atlas. The rule was "built, not decorated". Scroll sideways.

<div style="display:flex;gap:1rem;overflow-x:auto;padding-bottom:1rem;margin:2rem 0">
<iframe src="/atlas-archive/04-welcome-logger.html" title="Welcome and logger screens" loading="lazy" style="flex:none;width:430px;height:900px;border:0;border-radius:6px;background:#1a1a1a"></iframe>
<iframe src="/atlas-archive/01-life.html" title="Life page" loading="lazy" style="flex:none;width:430px;height:900px;border:0;border-radius:6px;background:#1a1a1a"></iframe>
<iframe src="/atlas-archive/02-finance.html" title="Finance page" loading="lazy" style="flex:none;width:430px;height:900px;border:0;border-radius:6px;background:#1a1a1a"></iframe>
<iframe src="/atlas-archive/03-business.html" title="Business page" loading="lazy" style="flex:none;width:430px;height:900px;border:0;border-radius:6px;background:#1a1a1a"></iframe>
</div>

### More from the archive

- [The design system](/atlas-archive/00-design-system.html): palette, type and rules.
- [The original landing page](/atlas-archive/landing.html) from July 2026.

## How It's Built

- **SwiftUI**, no third-party dependencies
- **StoreKit 2** for a one-off Pro unlock — not a subscription
- **Open-Meteo** (weather), **Trading 212** (portfolio), **Yahoo Finance** (charts), **SEC EDGAR** (filings), **17TRACK** (parcels), **OpenSky** (aircraft), **National Rail** (departures)
- **Speech** and **MapKit** for the Logger; **HealthKit** for activity
- An optional **DigitalOcean VPS** for Obsidian sync and the AI briefing
- **Keychain** for credentials, with a Face ID password vault built in

## Status

Feature-complete and in daily use, preparing for App Store submission. Free to use, with an optional £4.99 one-off unlock for the features that cost real money to run.

Built solo, in Swift.
