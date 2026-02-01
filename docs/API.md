# 📡 API Documentation

## Endpoints

### GET /api/dashboard
Returns trading signals for major cryptocurrencies.

**Response:**
```json
{
  "majorCoins": [
    {
      "id": "bitcoin",
      "price": 78000,
      "signal": "BUY",
      "rsi": 35
    }
  ],
  "trending": [...],
  "updatedAt": "2026-02-01T19:30:00Z"
}
```

### GET /api/chart/[coin]
Returns price history for a coin.

**Params:**
- `coin`: bitcoin, ethereum, solana
- `days`: 1, 7, 30, 90 (default: 7)

### GET /api/portfolio
**Params:**
- `address`: Wallet address

### POST /api/trade
**Body:**
```json
{
  "symbol": "BTC",
  "side": "BUY",
  "amount": 100
}
```

---

## Technical Indicators

| Indicator | BUY Condition | SELL Condition |
|-----------|---------------|----------------|
| RSI | < 30 | > 70 |
| MACD | Cross above | Cross below |
| Bollinger Bands | Touch lower | Touch upper |

---

## Price Sources

- **CoinGecko API** (free tier: 10-50 calls/min)
- Fallback to mock data if API limit
