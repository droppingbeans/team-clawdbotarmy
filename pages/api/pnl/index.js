import { getPnLHistory } from '../../../src/api/holdings';

export default async function handler(req, res) {
  const history = await getPnLHistory(req.query.address);
  res.status(200).json({ 
    history,
    totalReturn: history.length > 0 
      ? history[history.length - 1].value - history[0].value 
      : 0
  });
}
