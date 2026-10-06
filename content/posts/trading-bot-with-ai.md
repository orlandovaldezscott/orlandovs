---
title: "I Built a Trading Bot With AI. It Won 62% of Its Trades and Still Lost Money."
date: 2026-09-23
draft: false
tags: ["trading","ai","python","research"]
description: "Eight months, 2,438 trades and no coding background. What AI could do for a trading system, and what it couldn't."
---

*To what extent can artificial intelligence be used to build a technical analysis trading system that predicts short-term price movements in commodity markets?*

## 1. Introduction

My project is Taciturn, a system I built that trades gold and silver on its own, day and night. I had never coded before, so I used AI (large language models: ChatGPT, then Claude) to write the code while I designed, directed and tested it. AI later became part of the system itself, and led to my final model, Alladin.

**Aims**

- Build a working system that watches prices, spots patterns and places trades by itself.
- Record honestly how AI was used to build it, where it helped and where it went wrong.
- Test it properly with past data (backtests) and months of live practice trading.
- Back my decisions with academic research, not just websites.
- Reach a clear judgement on how far AI can really help predict prices.

I chose this because I have been practice trading by hand for about two years and kept missing moves because of other commitments. I also see AI as the biggest long-term theme in finance, which is where I want my career to be.

## 2. How my idea changed

Taciturn was not my first idea. The project went through several stages, and each change happened for a reason.

| Idea | Why I moved on |
|---|---|
| Designing a car | Too big to build or research properly, but it led me to materials. |
| Essay on carbon nanotubes | Interesting, but it did not link to finance and was only reading other people's work. |
| Essay on AI systems talking to each other | It was really two questions, and it meant trying to predict the future. |
| Essay on AI in finance | Much closer, but still only reading about the question. |
| Building a trading system (27 March 2026) | Let me test the question myself with real results. |

## 3. What Taciturn does

Taciturn watches gold and silver prices (XAU/USD and XAG/USD) every few seconds, looking for candlestick patterns that often appear before a move. Before any trade, three things must happen:

- A pattern must appear on the 5-minute chart.
- The pattern must agree with the bigger direction of the market over the last hour (a trend filter).
- The trade is sized so that if it loses, it only loses a small, fixed amount, with an automatic stop loss and take profit placed with the broker.

If any check fails, it does nothing and waits. It ran on a server in London with a live website, trading pretend money on an OANDA demo account. Around it I built a news screen, an analytics page and an AI memory of my project notes.

## 4. How I used AI

### ChatGPT (January to February)

I described what I wanted to ChatGPT in plain English, pasted its code into my laptop, and pasted any errors back. This produced a 700-line screen showing the silver price, what each trading session had done, and simple buy or sell hints. The problem was that ChatGPT forgot the project between chats, so I had to paste a long description every time, and it sometimes rewrote working code and broke it.

### Claude (March onwards)

From March I used Claude connected directly to my files and later my server, so it could read the code, find problems and fix them itself. I kept handoff notes so each new chat knew exactly where the last one ended. I was the architect and AI was the builder:

- I decided what to build, which broker to use, what the risk rules were, and when to give up on an idea.
- I wrote clear instructions (prompts) explaining the goal and the files involved.
- AI wrote the code and ran the tests.
- I checked every result against the real broker account and pushed back when numbers did not add up.

### What AI did well and where it went wrong

AI made me far faster: my changelog shows over 150 changes between January and April. It explained everything I asked, which is how I learnt what the code actually does. When I asked which chart pattern "always guarantees" a move, it told me honestly that none does.

But AI also made serious mistakes. It once counted every profit twice, so the system looked twice as good as it was. Another time its trade filter quietly gave no answer on any trade for days. It also agreed with my ideas too easily, such as removing safety pauses between trades, which led to overtrading. I only caught these by checking. My lesson is that AI makes building faster, but makes checking more important.

### AI inside the product

- **Abbadon:** a machine learning model trained on my own past trades to predict whether a new signal is likely to win. I ran it in shadow mode from June and only let it block trades from 18 September.
- **Neural Link:** a RAG system that searches my Obsidian notes and answers questions about the project.
- **Alladin:** a model that predicts crop and fuel prices from weather (Section 10).

## 5. Timeline

| 2026 | Event |
|---|---|
| 28 January | First code, written with ChatGPT |
| 16 February | Silver Console: a text screen giving buy or sell hints |
| 2 March | First automatic trades using Alpaca, with practice money |
| 3 March | Rebuilt as a website and renamed Taciturn |
| March | Restricted by Alpaca under the Pattern Day Trader rule after about 96 trades opened and closed in the same day |
| 20 March | Moved to OANDA to trade gold and silver 23 hours a day |
| Early April | Tested cryptocurrency trading and gave up: no reliable edge found |
| 11 April | Found and fixed the biggest risk problem (Section 7) |
| 23 April | Moved to a cloud server, running 24/7 |
| 10 June | Abbadon AI filter added in shadow mode |
| 18 September | Abbadon allowed to block trades |
| 21 September | Built Alladin and shelved Taciturn |

## 6. The research behind my decisions

| Source | What it says and how it shaped my project |
|---|---|
| Fama (1970) | Prices already reflect known information (the Efficient Market Hypothesis), so beating the market consistently is very hard. This was the idea I was testing. |
| Moskowitz, Ooi and Pedersen (2012) | Prices that have been rising tend to keep rising. This is why Taciturn only trades in the direction of the trend. |
| Marshall, Young and Rose (2006) | Candlestick patterns did not make money when tested properly. This matched what happened to my early patterns. |
| Park and Irwin (2007) | Profits from chart-based trading often disappear once trading costs are included. |
| Bailey et al. (2014) | Strategies tuned too closely to past data (overfitting) fail in real life. This is why I tested Abbadon quietly before trusting it. |
| Wilder (1978) | Created the measure of how much prices move (ATR) that I used to size every trade. |
| Peng et al. (2023) | Programmers using an AI assistant finished a task about 56% faster, matching my experience. |
| Roll (1984) | Weather predicts orange juice prices. This is the idea behind Alladin. |

Reading these changed how I saw my results. I used to think a high win rate meant a good strategy. The research showed that what matters is whether the edge survives costs, whether it works on new data, and whether losses are small compared to wins.

## 7. Developing a new skill

### Early version and its weaknesses

My first automatic version (March) had several problems I can now spot:

- Every trade was the same size, no matter how wild the market was, so losses in busy periods were far bigger than wins.
- Trades were closed by my own laptop. If it went to sleep, trades had no protection.
- Errors were hidden instead of reported, so the system could fail without telling me.
- It took the first pattern it found, with no check on the bigger trend.

### Later version

The final version sizes each trade by how much the market is moving, so every loss costs about the same (£20). The broker holds the safety exits, so they work even if my server crashes. Errors are recorded, and every trade must agree with the hourly trend and, later, be approved by Abbadon.

### Something I could not do at the start

In April I checked every trade and found the system had won 85% of the time but still lost £612. The average win was £18 and the average loss £84. At that ratio you need to win 82.5% of trades just to break even. At the start I did not understand how that was possible; now I can explain it, work it out by hand, and fix it. I also learnt to run software on a remote server, read error logs and save every version of my code.

### Testing and fixing problems

| Problem | How I found it | Fix |
|---|---|---|
| Profit was counted twice | Dashboard total did not match the broker | Removed the duplicate |
| Winning 85% but losing money | Checked every trade | Sized trades by market movement |
| Patterns that worked on daily charts failed on 5-minute charts | Retested on the chart I actually traded | Only test on the timeframe I trade |
| AI filter never checked silver | Its log only contained gold | Moved the check earlier |
| Dashboard showed profit, broker showed loss | Compared both directly | Treat the broker as the true figure |

## 8. Advice from people in the industry

In April I showed the system to two people who have worked in markets for nearly 30 years, including running a hedge fund. At the time my dashboard showed a win rate of around 70% and about £6,500 profit. They told me to show the risk I was taking next to the profit, especially because borrowed money (leverage) makes each trade much bigger than it looks. They told me to study my losing trades rather than my win rate, and to use existing AI models well rather than try to build new ones. They were right on every point.

## 9. Challenges

| Negative | Positive outcome |
|---|---|
| No coding skills at the start | I can now read, fix and run code myself |
| Restricted by a broker for trading too often | Learnt real market rules and found a better broker |
| Changed platform several times | Learnt why you should choose carefully and stay |
| Trades stopped when my laptop slept | Moved to a £4 a month server that never stops |
| Tests that looked excellent failed live | Only trust fair tests on the right data |
| Winning most trades but losing money | Found and fixed the real cause |
| Side projects took time | They built wider skills and each solved a real problem |

## 10. Alladin

On 21 September I built Alladin with Claude. Instead of chart patterns, it looks at rainfall, temperature, droughts and frost where nine crops and fuels are grown, plus the El Niño (ONI) pattern, and predicts where their prices will go over the next month.

| Tested on 2010 to 2026 data | Result |
|---|---|
| Using price only (Sharpe ratio) | 0.68 |
| Using price and weather | 0.81 |
| Years that made money | 14 of 17 |

Weather clearly improved the results, but returns since 2023 are weak and only five of the nine markets can be traded on OANDA. It is on practice money until it proves itself.

## 11. Conclusion

AI can be used to a very large extent to **build** a trading system. With no coding background I built a live, always-on system with risk controls, testing tools, a website and two AI models in eight months, for a few pounds a month.

It can only be used to a limited extent to **predict** short-term prices from charts. Taciturn won most of its trades, but its losses were nearly twice the size of its wins, so it lost money overall. Abbadon helped on silver but not gold. This agrees with Fama (1970), Marshall et al. (2006) and Park and Irwin (2007): AI can make pattern-spotting faster and more disciplined, but it cannot find an edge that is not there.

AI looks more promising when given information that charts do not contain, such as weather, but Alladin is not yet proven. Overall, the edge has to come from better information and risk control, not AI alone.

## 12. Reflection

### What I learnt

I learnt to code, to manage risk, and to work with AI without trusting it blindly. I learnt that win rate on its own means very little, that the broker's figures matter more than my own dashboard, and when to stop, as I did with crypto and eventually Taciturn.

### What I would do differently

- Build the testing tools first, before trading anything.
- Choose one broker and one asset and stay there.
- Judge success by profit and loss from day one, not win rate.
- Record every trade, so nothing goes missing.

### Next steps

I will run Alladin on practice money for two to three months, add real trading costs to every test, and show risk clearly next to profit. My advice to anyone doing a similar project is to use AI, but check everything it produces.

## Bibliography

- Bailey, D.H., Borwein, J.M., López de Prado, M. and Zhu, Q.J. (2014) 'Pseudo-mathematics and financial charlatanism: the effects of backtest overfitting on out-of-sample performance', *Notices of the American Mathematical Society*, 61(5), pp. 458-471.
- Fama, E.F. (1970) 'Efficient capital markets: a review of theory and empirical work', *Journal of Finance*, 25(2), pp. 383-417.
- Marshall, B.R., Young, M.R. and Rose, L.C. (2006) 'Candlestick technical trading strategies: can they create value for investors?', *Journal of Banking and Finance*, 30(8), pp. 2303-2323.
- Moskowitz, T.J., Ooi, Y.H. and Pedersen, L.H. (2012) 'Time series momentum', *Journal of Financial Economics*, 104(2), pp. 228-250.
- Park, C.-H. and Irwin, S.H. (2007) 'What do we know about the profitability of technical analysis?', *Journal of Economic Surveys*, 21(4), pp. 786-826.
- Peng, S., Kalliamvakou, E., Cihon, P. and Demirer, M. (2023) 'The impact of AI on developer productivity: evidence from GitHub Copilot', arXiv:2302.06590.
- Roll, R. (1984) 'Orange juice and weather', *American Economic Review*, 74(5), pp. 861-880.
- Wilder, J.W. (1978) *New Concepts in Technical Trading Systems*. Greensboro, NC: Trend Research.

Primary sources: Taciturn changelog (v0.01 to v5.0), Git history (17 March to September 2026), trade log and OANDA account summary (retrieved 23 September 2026), project notes.

## Glossary

- **ATR (Average True Range):** How far the price typically moves in one candle. Used to size trades and set stops relative to volatility.
- **Backtest:** Testing a strategy on past price data to see how it would have performed.
- **Candlestick:** A chart bar showing the open, high, low and close price for a set period.
- **Demo (practice) account:** A broker account that uses pretend money but real market prices.
- **Efficient Market Hypothesis (EMH):** The theory that prices already reflect all available information, so consistently beating the market is extremely hard.
- **El Niño and the ONI:** El Niño is a warming of the Pacific Ocean that disrupts world weather. The Oceanic Niño Index measures it.
- **Large language model (LLM):** An AI model trained on huge amounts of text that can write and explain code, such as ChatGPT and Claude.
- **Leverage:** Borrowing from the broker to control a bigger trade than the money you put in, which makes both gains and losses bigger.
- **Machine learning (ML):** Computers learning patterns from data rather than following hand-written rules.
- **Overfitting:** When a model or strategy fits past data so closely that it fails on new data.
- **Pattern Day Trader (PDT) rule:** A US rule (FINRA Rule 4210) restricting accounts under $25,000 that make four or more day trades in five business days.
- **Profit factor:** Total money won divided by total money lost. Above 1 means profitable overall.
- **Prompt:** The instruction you type into an AI model.
- **RAG (Retrieval-Augmented Generation):** An AI that searches your own documents for relevant information before answering.
- **Shadow mode:** Running a model so it records what it would have done, without affecting real decisions.
- **Sharpe ratio:** Return divided by volatility: a measure of how much return you get for the risk taken.
- **Stop loss and take profit:** Automatic exits that close a trade at a set loss or a set profit.
- **Trend filter:** A rule that only allows trades in the direction of the bigger trend.
- **VPS (Virtual Private Server):** A rented computer in a data centre that runs all day, every day.
- **Win rate:** The percentage of trades that make money.
- **XAU/USD and XAG/USD:** Gold and silver priced in US dollars.
