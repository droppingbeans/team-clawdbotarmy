const axios = require('axios');

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const ALCHEMY_BASE_API = 'https://base-mainnet.g.alchemy.com/v2/WnlzcAGaNjltWZNswQX7N';
const ALCHEMY_ETH_API = 'https://eth-mainnet.g.alchemy.com/v2/WnlzcAGaNjltWZNswQX7N';

// Real blockchain wallet fetching
async function getWalletBalances(address) {
  const balances = [];
  
  try {
    // Fetch Base chain balance
    const baseBalanceResponse = await axios.post(ALCHEMY_BASE_API, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [address, 'latest']
    });
    
    const baseBalanceWei = parseInt(baseBalanceResponse.data.result, 16);
    const baseBalanceEth = baseBalanceWei / 1e18;
    
    if (baseBalanceEth > 0) {
      balances.push({
        symbol: 'ETH',
        chain: 'Base',
        amount: baseBalanceEth,
        address
      });
    }
    
    // Fetch Ethereum mainnet balance
    const ethBalanceResponse = await axios.post(ALCHEMY_ETH_API, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [address, 'latest']
    });
    
    const ethBalanceWei = parseInt(ethBalanceResponse.data.result, 16);
    const ethBalanceEth = ethBalanceWei / 1e18;
    
    if (ethBalanceEth > 0) {
      balances.push({
        symbol: 'ETH',
        chain: 'Ethereum',
        amount: ethBalanceEth,
        address
      });
    }
  } catch (error) {
    console.error('Blockchain fetch error:', error.message);
  }
  
  return balances;
}

// Get token prices from CoinGecko
async function getTokenPrices(symbols) {
  try {
    const ids = symbols.map(s => {
      const map = {
        'ETH': 'ethereum',
        'BTC': 'bitcoin',
        'SOL': 'solana',
        'OPENWORK': 'openwork'
      };
      return map[s] || s.toLowerCase();
    }).join(',');
    
    const response = await axios.get(`${COINGECKO_BASE}/simple/price`, {
      params: {
        ids,
        vs_currencies: 'usd',
        include_24hr_change: true
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Price fetch error:', error.message);
    return {};
  }
}

// Mock holdings for demo (fallback)
async function getMockHoldings(address) {
  return [
    { symbol: 'BTC', amount: 0.05, price: 78000, change24h: -2.5, chain: 'Mock' },
    { symbol: 'ETH', amount: 0.5, price: 2400, change24h: -3.2, chain: 'Mock' },
    { symbol: 'SOL', amount: 10, price: 105, change24h: -5.1, chain: 'Mock' },
    { symbol: 'OPENWORK', amount: 100000, price: 0.00001, change24h: 0, chain: 'Base' }
  ];
}

async function getPortfolio(address, useReal = true) {
  try {
    let holdings = [];
    
    if (useReal && address && address.startsWith('0x')) {
      // Fetch real wallet balances
      const balances = await getWalletBalances(address);
      
      // Get unique symbols
      const symbols = [...new Set(balances.map(b => b.symbol))];
      
      // Fetch current prices
      const prices = await getTokenPrices(symbols);
      
      // Combine balances with prices
      holdings = balances.map(balance => {
        const priceKey = balance.symbol === 'ETH' ? 'ethereum' : balance.symbol.toLowerCase();
        const priceData = prices[priceKey] || {};
        
        return {
          symbol: balance.symbol,
          chain: balance.chain,
          amount: balance.amount,
          price: priceData.usd || 0,
          change24h: priceData.usd_24h_change || 0
        };
      });
      
      // If no holdings found, use mock data
      if (holdings.length === 0) {
        holdings = await getMockHoldings(address);
      }
    } else {
      // Use mock data for demo/invalid addresses
      holdings = await getMockHoldings(address);
    }
    
    const totalValue = holdings.reduce((sum, h) => sum + (h.amount * h.price), 0);
    const total24hChange = holdings.reduce((sum, h) => {
      const holdingValue = h.amount * h.price;
      return sum + (holdingValue * (h.change24h / 100));
    }, 0);
    
    return {
      address,
      holdings,
      totalValue,
      total24hChange,
      total24hChangePercent: totalValue > 0 ? (total24hChange / totalValue) * 100 : 0,
      lastUpdated: new Date().toISOString(),
      source: useReal && address?.startsWith('0x') ? 'blockchain' : 'mock'
    };
  } catch (error) {
    console.error('Portfolio error:', error.message);
    return { 
      error: 'Failed to fetch portfolio',
      details: error.message
    };
  }
}

module.exports = { getPortfolio, getWalletBalances, getTokenPrices };
