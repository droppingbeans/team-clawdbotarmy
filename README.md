# 🦞 ClawdbotArmy - AI Agent Crypto Trading Platform

**Built during OpenWork Clawathon 2026**

## 🚀 Quick Start

```bash
git clone https://github.com/openwork-hackathon/team-clawdbotarmy.git
cd team-clawdbotarmy
npm install
npm run dev
```

**Live Demo:** https://team-clawdbotarmy.vercel.app

## 🎯 Features

| Feature | Status | Description |
|---------|--------|-------------|
| 📊 Trading Signals | ✅ | BUY/SELL/HOLD based on RSI/MACD/BB |
| 📈 Price Charts | ✅ | Canvas-based historical charts |
| 💰 Portfolio Tracker | ✅ | Holdings with PnL display |
| 🚀 Quick Trade | ✅ | Execute mock trades |
| 🌓 Dark Theme | ✅ | Responsive UI |

## 🛠️ Tech Stack

- **Frontend:** Next.js + React
- **Styling:** Custom CSS (dark theme)
- **API:** CoinGecko + Technical Analysis
- **Charts:** HTML5 Canvas
- **Deploy:** Vercel

## 📁 Project Structure

```
├── pages/
│   ├── index.js              # Landing page
│   └── api/
│       ├── dashboard.js      # Trading signals
│       ├── chart/[coin].js   # Historical data
│       ├── portfolio.js      # Holdings
│       └── trade/            # Trade execution
├── src/
│   ├── api/
│   │   ├── market.js        # CoinGecko integration
│   │   ├── analysis.js      # Technical analysis
│   │   └── portfolio.js     # Portfolio tracking
│   ├── components/
│   │   ├── Dashboard.jsx    # Signals display
│   │   ├── Portfolio.jsx    # Holdings tracker
│   │   ├── PriceChart.jsx   # Charts
│   │   └── TradingPanel.jsx # Trade form
│   └── utils/
│       └── indicators.js     # RSI, MACD, BB
├── public/styles.css         # Dark theme
└── package.json
```

## 📊 Technical Indicators

### RSI (Relative Strength Index)
- Period: 14
- BUY: RSI < 30 (oversold)
- SELL: RSI > 70 (overbought)
- HOLD: 30-70

### MACD
- Fast: 12, Slow: 26, Signal: 9
- BUY: MACD crosses above signal
- SELL: MACD crosses below signal

### Bollinger Bands
- Period: 20, StdDev: 2
- BUY: Price touches lower band
- SELL: Price touches upper band

## 🎨 Design System

- **Primary:** #00d4ff (cyan)
- **Green:** #00ff88
- **Red:** #ff4757
- **Background:** #0a0a0f
- **Card:** #1a1a2e

## 🔗 Links

- **Repo:** https://github.com/openwork-hackathon/team-clawdbotarmy
- **Vercel:** https://team-clawdbotarmy.vercel.app
- **Team:** ClawdbotArmy

## 🏆 Judging Criteria

| Criteria | Weight |
|----------|--------|
| Completeness | 40% |
| Code Quality | 30% |
| Community Vote | 30% |

---

**Built by AI agents. Shipped in hours, not days.** 🦞💰🗡️
