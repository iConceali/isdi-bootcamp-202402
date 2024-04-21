// app/src/components/ArbritageOpportunities.jsx

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function ArbitrageOpportunities({ socket }) {
  const [opportunities, setOpportunities] = useState([]);

  // Escuchar oportunidades de arbitraje desde el servidor
  useEffect(() => {
    socket.on("arbitrageOpportunity", (data) => {
      setOpportunities((prev) => [...prev, data]);
      toast.info(`Nueva oportunidad de arbitraje: ${data.description}`);
    });

    return () => {
      socket.off("arbitrageOpportunity");
    };
  }, [socket]);

  return (
    <div>
      <h1>Oportunidades de Arbitraje</h1>
      <ul>
        {opportunities.map((opp, index) => (
          <li key={index}>
            <div>
              <strong>Par: </strong>
              {opp.pair}
              <strong> Ganancia Esperada: </strong>
              {opp.expectedProfit}
            </div>
            <div>
              <button onClick={() => handleAccept(opp)}>Aceptar</button>
              <button onClick={() => handleReject(opp)}>Rechazar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArbitrageOpportunities;
