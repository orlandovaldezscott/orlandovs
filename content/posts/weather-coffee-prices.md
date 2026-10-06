---
title: "Can the Weather Predict Coffee Prices?"
date: 2026-10-06
draft: false
tags: ["trading","commodities","machine-learning","alladin"]
description: "Alladin explained without the code: what it looks at, how I tested it, and why I still don't trust it yet."
---

Most of the world's arabica coffee grows in one part of Brazil. If frost hits Minas Gerais, there is less coffee that year, and the price goes up. Nobody argues with that. The question I wanted to answer is whether you can see it coming early enough to trade it.

That is what Alladin does. It is the model I built after Taciturn, and it works on a completely different idea.

## Why not charts

Taciturn traded gold and silver by reading chart patterns. It won most of its trades, but chart patterns alone were not enough of an edge, which is what the research says should happen: everyone can see the same chart, so there is not much left to find in it.

Weather is different. It is not in the price chart. A dry month in Iowa or a hot spell in Ghana is real information about how much of something will exist in a few months. The idea is not mine. In 1984 an economist called Richard Roll showed that Florida weather moves orange juice prices. I just wanted to test it myself, on more markets.

## What it looks at

Alladin follows nine markets: cocoa, coffee, corn, soy, wheat, sugar, natural gas, orange juice and cotton. For each one it pulls the weather where that thing is actually grown or burned. For coffee that is Minas Gerais and the Vietnam highlands. For cocoa it is Côte d'Ivoire and Ghana.

Every day it checks:

- How much rain has fallen over the last 14, 30, 60 and 90 days
- How hot it has been, and how many frost days and heat days there were
- Whether the ground is drying out or not
- What El Niño is doing in the Pacific

The important part is that it does not care about the raw number. It compares today with the same day over the previous ten years. 30mm of rain means nothing on its own. 30mm when that region normally gets 120mm means something.

From all of that it makes one prediction per market: higher or lower in 20 days.

## Testing it without cheating

The easiest way to fool yourself is to test a model on data it has already seen. So the test runs year by year from 2010 to 2026. For each year, the model is only allowed to learn from the years before it, then it has to trade the next one blind. Trading costs are included.

| Model | Sharpe ratio | Worst drop |
|---|---|---|
| Price only | 0.68 | -9.1% |
| Price and weather | 0.81 | -9.7% |
| Weather only | 0.78 | -8.9% |
| Just following the trend | -0.31 | -42.6% |

Sharpe ratio is return for the risk taken, so higher is better. Adding weather took it from 0.68 to 0.81, and it made money in 14 of the 17 years. Weather on its own beat price on its own, which is the result I care about most, because it means the weather is doing real work and not just copying momentum.

## Why I don't trust it yet

Three reasons.

- The last few years are weak. From 2023 to 2026 it made somewhere between 0.4% and 6% a year. The edge might be fading.
- The price data has gaps where one futures contract rolls into the next, and I have only partly dealt with them.
- I can only trade five of the nine markets on my broker, and real spreads are wider than the test assumed.

Taciturn taught me that a good backtest is where the work starts. So Alladin is on practice money, on live prices, and it stays there until it has a few months of results I did not get to pick.

On the day I built it, it wanted to buy coffee.
