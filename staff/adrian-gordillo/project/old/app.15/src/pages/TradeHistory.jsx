// app/src/components/TradeHistory.jsx

import React, { useState, useEffect } from "react";

function TradeHistory() {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar el historial de transacciones
  const fetchTradeHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/trade-history");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTrades(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTradeHistory();
  }, []);

  if (isLoading) return <div>Cargando historial de transacciones...</div>;
  if (error) return <div>Error al cargar el historial: {error}</div>;

  return (
    <div>
      <h1>Historial de Transacciones</h1>
      {trades.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo de Operación</th>
              <th>Criptomoneda</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade._id}>
                <td>{new Date(trade.date).toLocaleDateString()}</td>
                <td>{trade.type}</td>
                <td>{trade.crypto}</td>
                <td>{trade.amount}</td>
                <td>${trade.price.toFixed(2)}</td>
                <td>${trade.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay transacciones registradas.</p>
      )}
    </div>
  );
}

export default TradeHistory;
