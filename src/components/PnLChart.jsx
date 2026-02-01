import { useState, useEffect, useRef } from 'react';

export default function PnLChart({ address }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch(`/api/pnl?address=${address || ''}`)
      .then(r => r.json())
      .then(d => {
        setData(d.history || []);
        setLoading(false);
        if (d.history?.length > 0) drawChart(d.history);
      });
  }, [address]);

  const drawChart = (history) => {
    if (!canvasRef.current || history.length < 2) return;
    const ctx = canvasRef.current.getContext('2d');
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, w, h);
    
    const values = history.map(h => h.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    
    // Draw line
    ctx.strokeStyle = values[values.length - 1] >= values[0] ? '#00ff88' : '#ff4757';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    history.forEach((p, i) => {
      const x = (i / (history.length - 1)) * w;
      const y = h - ((p.value - min) / range) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw area
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle + '20';
    ctx.fill();
  };

  const currentPnL = data.length > 0 
    ? data[data.length - 1].value - data[0].value 
    : 0;
  const pnlPercent = data.length > 0 
    ? ((currentPnL / data[0].value) * 100).toFixed(2) 
    : 0;

  return (
    <div className="pnl-chart">
      <h3>📈 PnL History</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <canvas ref={canvasRef} width={600} height={200} />
          <div className="pnl-summary">
            <span className={currentPnL >= 0 ? 'green' : 'red'}>
              {currentPnL >= 0 ? '+' : ''}${currentPnL.toFixed(2)}
            </span>
            <span className={pnlPercent >= 0 ? 'green' : 'red'}>
              ({pnlPercent >= 0 ? '+' : ''}{pnlPercent}%)
            </span>
          </div>
        </>
      )}
    </div>
  );
}
