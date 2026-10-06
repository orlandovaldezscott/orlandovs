---
group: markets
order: 1
short: "Alladin"
sub: "Weather-driven Commodities"
started: "Sep 2026"
blurb: "A LightGBM model that predicts 20-day direction for nine commodity futures from growing-region weather and El Niño."
badge: "Paper Trading"
title: "Alladin — Trading Commodities on the Weather"
date: 2026-09-21
draft: false
tags: ["trading","machine-learning","python","commodities"]
description: "A LightGBM model that predicts 20-day direction for nine commodity futures from weather in their growing regions and El Niño."
---

## The Idea

Crops care about the weather. A dry month in Iowa, frost in Minas Gerais or a strong El Niño changes how much corn, coffee or cocoa gets harvested — and prices follow. Alladin turns that into a trading signal.

## How It Works

For nine commodities — cocoa, coffee, corn, soy, wheat, sugar, natural gas, orange juice and cotton — Alladin pulls daily weather for the regions that actually grow or consume them, from Open-Meteo's ERA5 reanalysis:

- Rainfall, maximum temperature and water balance (rain minus evapotranspiration) over 14, 30, 60 and 90 days
- Heat days, frost days, heating and cooling degree days
- Each measured as an anomaly against the same calendar day over the previous ten years
- The NOAA El Niño index (ONI), lagged two months for publication delay
- Price momentum, volatility and seasonality

A LightGBM model predicts whether each market will be higher or lower in 20 days. Everything is lagged so the model never sees information it wouldn't have had at the time.

## Testing It Properly

The backtest runs walk-forward from 2010 to 2026: the model is retrained each year using only earlier data, with a gap before each test year, then traded with realistic costs.

| Model | Sharpe | Max drawdown |
|---|---|---|
| Price only | 0.68 | −9.1% |
| **Price + weather** | **0.81** | −9.7% |
| Weather only | 0.78 | −8.9% |
| Simple trend baseline | −0.31 | −42.6% |

Adding weather improved the result, and the weather-only model on its own beat a price-only model — evidence the signal is real rather than a restatement of momentum. The portfolio was positive in 14 of 17 years.

## Live

Since 21 September 2026 Alladin has been paper trading five of the markets on live OANDA prices, rebalancing every weekday afternoon. Real spreads are wider than the backtest assumed, so the live results are the honest test. Signals are published daily at alladin.taciturn.uk.
