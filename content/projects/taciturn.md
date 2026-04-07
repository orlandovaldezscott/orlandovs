---
title: "Taciturn — Autonomous Algorithmic Trading"
date: 2026-03-28
draft: false
tags: ["trading","python","finance","algorithms"]
---

## What It Is

Taciturn is a autonomous algorithmic trading engine I built from scratch in Python. It trades XAU/USD (gold) and XAG/USD (silver) spot forex via the OANDA v20 REST API on a GBP-denominated account, running continuously and managing every aspect of the trade lifecycle without manual intervention.

It started as a simple price-scanning script and has evolved into a production-grade system with a web dashboard, risk management engine, multi-signal detection, and real-time notifications.

## What It Does

- **Signal detection** — multiple technical signals running in parallel: volume-weighted momentum crossovers, MACD histogram flips, candlestick patterns (engulfing, shooting star, pure indicator), and more
- **Trend filter** — an hourly EMA slope filter prevents trading against the prevailing trend, switching the system between bull-only and bear-only mode automatically
- **Risk management** — native broker-level stop losses on every order, trailing stops, hard stop thresholds, and a daily loss limit that halts trading if breached
- **Dashboard** — a dark-themed Flask web UI showing live P&L, open positions, trade history, equity curve, and system status
- **Notifications** — Pushover push notifications on every trade open and close

## Technical Stack

- **Language** — Python 3 with Flask, pandas, numpy
- **Broker API** — OANDA v20 REST API
- **Deployment** — macOS, running continuously via nohup, tunnelled via ngrok
- **Frontend** — Vanilla JS, CSS with a glass/visionOS aesthetic
- **Notifications** — Pushover

## How It Evolved

The project started with Alpaca paper trading ETFs (GLD, SLV), using candlestick pattern recognition on daily bars. After discovering that intraday patterns on 1-minute bars had much lower win rates than daily bars, the strategy pivoted entirely to indicator-based signals. The broker was migrated to OANDA for spot forex access, and each component — signals, risk management, the dashboard — was rebuilt iteratively.

Key lessons along the way:

- Candlestick patterns that show 60–80% win rates on daily bars can drop to 14–45% on 1-minute bars
- A single session without a trend filter caused 237 trades in one day during a sharp directional move
- Race conditions between signal detection and trade execution can cause duplicate entries
- Backtest results only transfer to live trading if the data conditions match

## Current State

The system is running on a MacBook Air M2 with plans to migrate to a dedicated Mac Mini for permanent 24/7 deployment. It's currently in demo mode with a view to deploying real capital once signal performance is consistently validated.

---

*Last updated: March 2026*