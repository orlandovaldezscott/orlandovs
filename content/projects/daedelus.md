---
title: "Daedelus — Building a Personal OS"
date: 2026-05-22
draft: false
tags: ["react","ios","tauri","personal","dashboard"]
status: "Live"
category: "Personal OS"
summary: "A native Mac and iPhone app that replaces 20+ apps — trading dashboard, T212 portfolio, fitness tracker, CRM mind map, and more. All on a self-hosted VPS."
---

## What Is Daedelus

Daedelus is a personal life operating system. A native app on both Mac (Tauri) and iPhone (Capacitor) that replaces 20+ apps I was using across trading, finance, fitness, health, and life management — all running on my own VPS, under my own control.

The name comes from the craftsman in Greek mythology who built the labyrinth — and later, wings. The idea is the same: build the tools yourself, however complex, rather than depend on someone else's.

It started because I wanted one place to see everything. My Taciturn trading system was running on a VPS, my T212 portfolio was in a separate app, my workouts were in a notes app, my contacts were in my head. None of it talked to each other.

---

## How It Started

The first version was a React scaffold — three panels, demo data, built in an afternoon. The goal was simple: show Taciturn's P&L, T212 portfolio value, and my Obsidian notes in one window.

<img src="/images/daedelus_business.png" style="max-width:100%;border-radius:12px;margin:1.5rem 0" />

<img src="/images/daedelus_finance.png" style="max-width:100%;border-radius:12px;margin:1.5rem 0" />

By v0.3 it had a name, a wing icon, and was running as a native Mac app via Tauri. By v0.4 it was on my iPhone via Capacitor — proper native iOS build, HealthKit entitlements, safe area handling.

The biggest early challenge was the T212 API. Their newer API uses Basic Auth (`base64(key:secret)`) rather than a bearer token — nothing in the docs made this clear, and it took a full session to debug. Once that was solved, 54 live positions started flowing in.

---

## Architecture

Everything runs on a DigitalOcean VPS in London. The Mac app talks to `api.taciturn.uk` — a Cloudflare Tunnel pointing at an Express server on port 3001. The iPhone app talks to the same URL. Both devices share the same data.

```
iPhone / Mac
    │
    ▼
Cloudflare Tunnel (api.taciturn.uk)
    │
    ▼
Express Server — VPS:3001
    │
    ├── T212 API (Basic Auth)
    ├── Taciturn pattern_log.json
    ├── FMP API (dividend calendar)
    ├── Spotify OAuth
    └── userdata.json (synced state)
```

The sync system checks a `_last_modified` timestamp every 30 seconds. If the VPS has newer data, both devices pull it. Add something on Mac — it appears on iPhone within 30 seconds, automatically.

All API calls in Finance fire in parallel via `Promise.allSettled()`. Every response is cached to localStorage (PCACHE) — on reopen, last known data shows instantly while fresh data loads in the background.

---

## What's Inside

### Business — Taciturn Dashboard

The Business tab is the Taciturn command centre. All-time P&L, win rate, today's P&L, equity curve for the current month, recent trades, and a live open positions card that refreshes every 60 seconds with Close buttons that proxy directly to the Taciturn Flask app.

The What If Calculator uses real data — actual win rate (65.8%), average win/loss from the last 100 trades, estimated trades per month — to project Bear, Base, and Bull scenarios across 1 to 12 months with leverage multipliers from 1× to 10×.

### Finance — T212 Portfolio

54 live positions, scrollable, defaulting to Gainers view showing percentage and pound P&L side by side. A dual-line net worth history chart — amber for Taciturn equity, cyan for T212 portfolio — each on its own Y scale so the movements of both are visible regardless of the size difference.

The T212 What If Calculator clones all 54 positions into an editable scenario. Remove a losing position, double a winner, add a hypothetical stock — the impact panel updates in real time showing the difference in value and P&L between base and scenario.

### Life — CRM Mind Map

An interactive mind map on a 2000×2000 canvas. Pan, zoom, drag people around. Schools cluster automatically — add Sherborne or university and anyone assigned to that school gets a dashed ring in the school's colour. Connections between people are bidirectional, with notes on how they know each other. Birthday countdowns. Cut mode to remove connections without touching the keyboard.

### Fitness — Full Tracker

Workout tracker with exercise library, set/rep/weight logging, PR detection, rest timer, and history. Body stats with 7-day average and trend. Supplements by time of day. Macros with circular SVG progress rings. 1RM calculator using three formulae simultaneously.

---

## Version History

| Version | What Was Built |
|---|---|
| v0.1 | React scaffold, demo data, 3 panels |
| v0.2 | Taciturn live data, Obsidian vault, Ollama AI |
| v0.3 | Tauri Mac app, wing icon, named Daedelus |
| v0.4 | iPhone via Xcode + Capacitor, HealthKit, responsive layout |
| v0.5 | T212 Basic Auth fix, manual bank tracker, macros |
| v0.6 | iOS scroll/zoom fixes, 5 themes, notifications |
| v0.7 | T212 full (54 positions, movers), net worth, drag-to-reorder |
| v0.8 | VPS deployment, Cloudflare tunnel, systemd, server persistence |
| v0.9 | Life tab (weather, alarms, Spotify), dividend calendar |
| v1.0 | Fitness tab, CRM mind map, debt/subs/bills, bucket list |
| v1.1 | Mac↔iPhone sync, CRM schools, net worth chart, T212 What If, leverage What If |
| v1.2 | Open positions + close trades, 60s auto-refresh, persistent cache, parallel fetching, onboarding, profile card |

---

## Still Building

- Apple Health integration (requires paid developer account)
- DIY biometric bracelet — ESP32-C3 + MAX30102 + MPU6050 in a 3D printed housing, posting directly to the VPS. Bypasses Apple entirely.
- Smart morning summary — tap the alarm, see overnight Taciturn P&L, weather, calendar, market movers
- Weekly auto-summary generated every Sunday
- Multi-user auth and white-label for coaches and wealth managers

---

## Tech Stack

**Frontend:** React 18 · Vite 5 · Tailwind CSS · Framer Motion · @dnd-kit  
**Desktop:** Tauri 2 (Rust)  
**Mobile:** Capacitor 8 · Xcode  
**Backend:** Node.js 20 · Express · DigitalOcean VPS  
**Tunnel:** Cloudflare Tunnel  
**APIs:** Trading 212 · FMP · Spotify · Open-Meteo · OANDA (via Taciturn)
