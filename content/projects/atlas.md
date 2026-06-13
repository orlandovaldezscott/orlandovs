---
title: "Atlas"
date: 2026-06-13
draft: false
tags: ["ios", "swift", "app", "productivity", "fintech"]
description: "A fully customisable iOS life dashboard — finance, health, habits and focus in one native app. Built to be the only app you open."
weight: 1
---

![Atlas icon](/images/atlas-icon.png)

## What Atlas Is

Atlas is a native iOS app (SwiftUI) that replaces the dozen apps you check every day with one calm, minimalist dashboard. Weather, calendar, health, medication, meals, gym, tasks, parcels, notes and a full live investment portfolio — all on pages **you** design.

The thesis: most screen time is fragmentation. Ten apps, ten feeds, ten sets of notifications. Atlas collapses them into a single glanceable surface with **zero feeds and zero distractions** — so you check it, get what you need, and put the phone down.

![Atlas Life page](/images/atlas-life.png)

## The Widget System

Everything in Atlas is a widget. Users build their own app:

- **Add, rename, delete and reorder pages** on the nav bar — choose any name and icon
- **28 widgets** to place anywhere: Weather (7-day swipe), Calendar, Health, Medication, Macro tracker, Sport & Gym, Tasks, Parcels, Notes, Net Worth, Trading 212 portfolio, Portfolio Analysis, In & Out money tracker, What-If calculator, Economic & Dividend calendars, Daily Briefing, Countdown, Water, Currency converter, Focus timer, World clock, Habits and more
- **Premade templates** — Trader, Fitness, Minimalist or Default — so a first-time user is set up in one tap
- Layouts persist and sync across your devices via iCloud — the app becomes genuinely yours. A trader's Atlas looks nothing like a student's

## What It Solves

- **Phone addiction** — one app, no feeds. Atlas learns your usage patterns and tells you when you reach for it most
- **Financial blindness** — live Trading 212 portfolio with movers, sort filters, tap-through company research, and an on-device analysis engine that flags concentration risk and drawdowns (observations, never advice). Net worth aggregates investments, cash and bank automatically. Upload a bank statement and it breaks down your spending by category
- **Scattered health data** — Apple Health, medication ticking, meal macros (scan a photo to log them) and gym streaks in one place, with a BMI profile that will drive training recommendations
- **Notes friction** — write a note in Atlas, it lands in your Obsidian vault automatically
- **No morning context** — an AI daily briefing summarises your weather, overnight markets and day ahead, and pushes it to your phone at 07:45

Plus a hidden games drawer — a 6-level chess engine with capture animations, 2048, and a memory game — because one game is healthier than one feed.

## How It's Built

- **SwiftUI**, no external dependencies — fast, native, ~lightweight
- **Open-Meteo** for weather, **Trading 212** API for live portfolio, **FMP** for company research and calendars
- A **DigitalOcean VPS** backs the Obsidian sync, AI briefing (local Ollama), and the 07:45 morning push via Pushover
- **iCloud key-value sync** keeps data across devices and through reinstalls
- **Face ID + Keychain** encrypted password vault built in

## Status & Roadmap

Running daily as my main driver. Next: TestFlight beta, home-screen widgets, Spotify and email integration, and white-label page templates aimed at coaches and personal trainers as the first commercial route.

Built solo, in Swift, in days.
