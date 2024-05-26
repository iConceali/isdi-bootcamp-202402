// src/logic/order/updateParameters.js

const updateParameters = (orders, deposit) => {
  // Ensure orders is an array
  if (!Array.isArray(orders)) {
    throw new Error("Expected orders to be an array");
  }

  let balance = deposit;
  let totalProfitPercent = 0;
  let totalProfitDollars = 0;
  let wins = 0;

  orders.forEach((order) => {
    if (order && order.investment && order.profitPercent !== undefined) {
      const profitDollars = (order.investment * order.profitPercent) / 100;
      totalProfitPercent += order.profitPercent;
      totalProfitDollars += profitDollars;
      balance += profitDollars;
      if (order.profitPercent > 0) {
        wins++;
      }
    }
  });

  const numOrders = orders.length;
  const winRate = numOrders > 0 ? (wins / numOrders) * 100 : 0;
  const avgProfitPercent = numOrders > 0 ? totalProfitPercent / numOrders : 0;

  return {
    deposit,
    balance,
    profitPercent: avgProfitPercent,
    profitDollars: totalProfitDollars,
    winRate,
    numOrders,
  };
};

export default updateParameters;
