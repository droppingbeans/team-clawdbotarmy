import { useState } from 'react';

export default function TradingPanel() {
  const [symbol, setSymbol] = useState('BTC');
  const [side, setSide] = useState('BUY');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const executeTrade = async () => {
    if (!amount) return;
    setResult({ status: 'loading' });
    
    try {
      const r = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, side, amount })
      });
      const data = await r.json();
      setResult(data);
    } catch (e) {
      setResult({ error: e.message });
    }
  };

  return (
    <div className="trading-panel">
      <h2>🚀 Quick Trade</h2>
      
      <div className="trade-form">
        <div className="form-row">
          <select value={symbol} onChange={e => setSymbol(e.target.value)}>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
          </select>
          
          <div className="side-buttons">
            <button 
              className={side === 'BUY' ? 'active buy' : ''}
              onClick={() => setSide('BUY')}
            >
              BUY
            </button>
            <button 
              className={side === 'SELL' ? 'active sell' : ''}
              onClick={() => setSide('SELL')}
            >
              SELL
            </button>
          </div>
        </div>
        
        <div className="form-row">
          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <button className="execute" onClick={executeTrade}>
            {side} {symbol}
          </button>
        </div>
      </div>

      {result && result.status === 'loading' && (
        <p className="loading">Processing trade...</p>
      )}
      
      {result && result.orderId && (
        <div className="success">
          ✅ Order #{result.orderId} submitted!
          <br />
          {result.side} {result.amount} {result.symbol} @ ${result.price}
        </div>
      )}
      
      {result && result.error && (
        <p className="error">❌ {result.error}</p>
      )}
    </div>
  );
}
