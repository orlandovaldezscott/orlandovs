---
title: "Building Taciturn — What I've Learned Building an Algo Trading System From Scratch"
date: 2026-03-28
draft: false
tags: ["trading", "python", "reflection"]
description: "Three weeks in, thousands of trades, and a lot of hard lessons about building autonomous systems."
---

## Where It Started

It started with a Trading212 account and a simple ambition: make money faster than manually clicking buy and sell. I was trading CFDs — leveraged, volatile, unforgiving — and my results were inconsistent in the way that most manual trading is inconsistent. Good instincts, bad discipline, no system.

The obvious next step was to build one.

I wanted something that could either call out entry and exit points, or act on them automatically. The latter was more appealing. So I started teaching myself Python, scanning Yahoo Finance for daily peaks and troughs, and building scripts that would tell me when to buy or sell based on price movement thresholds. That was version one — around 700 lines of code, no broker integration, no execution.

## How It Evolved

The project grew in phases. Each one introduced a new broker, a new strategy, or a new layer of infrastructure:

**v1–3 (Alpaca, paper trading)** — ETF trading on GLD and SLV using candlestick pattern recognition on daily bars. Win rates looked promising on backtests — 60–80% on some patterns. Then I moved to intraday bars and they collapsed to 14–45%. Patterns that work on daily data often don't survive the noise of shorter timeframes. That was a costly discovery.

**v4 (OANDA, spot forex)** — Migrated entirely to OANDA for XAU/USD and XAG/USD spot forex. Rebuilt the signal stack around indicator-based approaches: volume-weighted momentum crossovers, MACD histogram signals, pure indicator models. Added a trend filter that checks the hourly EMA slope before every trade — if the trend is flat or against you, it blocks entry.

**v5 (current)** — Multiple signals running in parallel, risk management with broker-level stop losses on every order, a full web dashboard, and Pushover notifications. The system runs continuously, manages its own cooldowns, and halts itself if daily losses exceed a threshold.

## What I'd Do Differently

A lot. In rough order of importance:

- **Demo mode for three months before any real capital.** I jumped into live-adjacent testing too early. Bugs that seem minor in development become expensive in production.
- **Build the backtest engine first.** Every signal I've added has had to be validated retrospectively. A proper backtest framework would have saved weeks.
- **Pick one broker and stay there.** Migrating mid-project is expensive in time and introduces subtle bugs — currency conversion errors, API differences, state management issues.
- **Only trade gold.** Gold is liquid, well-documented, and moves in ways that technical signals can capture. Silver is noisier. Crypto is a different category entirely.
- **Forecast bugs before they're expensive.** Duplicate trades from race conditions. Stop losses set at the wrong scale. Currency conversions applied twice. All of these happened and all of them were avoidable with more careful design upfront.

## Where It Is Now

The system is standing around £4,400 all-time after three weeks of live demo trading. The goal is consistent profitability before deploying real capital — and a migration to a dedicated Mac Mini for permanent 24/7 operation.

The target was 85% profitable trades. That's not realistic for most strategies — but 60–70% with a good risk/reward ratio is, and that's what the current signal stack is being tuned toward.

More updates to follow.
