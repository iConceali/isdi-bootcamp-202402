// tradeLogic.js

export const updateParameters = (trades, deposit) => {
  const balance = trades.reduce(
    (acc, trade) => acc + Number(trade.profitDollars),
    deposit
  );
  const profitDollars = balance - deposit;

  return {
    deposit: Number(deposit),
    balance: Number(balance.toFixed(2)),
    profitPercent: Number(((profitDollars / deposit) * 100).toFixed(2)),
    profitDollars: Number(profitDollars.toFixed(2)),
    winRate: Number(
      (
        (trades.filter((trade) => trade.profitDollars > 0).length /
          trades.length) *
        100
      ).toFixed(2)
    ),
    numTrades: trades.length,
  };
};
