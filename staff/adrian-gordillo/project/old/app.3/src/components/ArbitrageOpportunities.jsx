// app/src/components/ArbritageOpportunities.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ArbitrageOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/arbitrage/detect"
        );
        setOpportunities(data);
      } catch (error) {
        console.error("Failed to fetch arbitrage opportunities:", error);
        // Añadir manejo del estado de error aquí si es necesario
      }
    };

    fetchOpportunities();
  }, []);
  return (
    <div>
      <h1>Oportunidades de Arbitraje</h1>
      {opportunities.map((op, index) => (
        <div key={index}>
          <p>
            Compra en: {op.buyExchange} por {op.buyPrice}
          </p>
          <p>
            Vende en: {op.sellExchange} por {op.sellPrice}
          </p>
          <p>Beneficio potencial: {op.profit}</p>
        </div>
      ))}
    </div>
  );
};

export default ArbitrageOpportunities;

// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// function ArbitrageOpportunities({ socket }) {
//   const [opportunities, setOpportunities] = useState([]);

//   // Escuchar oportunidades de arbitraje desde el servidor
//   useEffect(() => {
//     socket.on("arbitrageOpportunity", (data) => {
//       setOpportunities((prev) => [...prev, data]);
//       toast.info(`Nueva oportunidad de arbitraje: ${data.description}`);
//     });

//     return () => {
//       socket.off("arbitrageOpportunity");
//     };
//   }, [socket]);

//   return (
//     <div>
//       <h1>Oportunidades de Arbitraje</h1>
//       <ul>
//         {opportunities.map((opp, index) => (
//           <li key={index}>
//             <div>
//               <strong>Par: </strong>
//               {opp.pair}
//               <strong> Ganancia Esperada: </strong>
//               {opp.expectedProfit}
//             </div>
//             <div>
//               <button onClick={() => handleAccept(opp)}>Aceptar</button>
//               <button onClick={() => handleReject(opp)}>Rechazar</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ArbitrageOpportunities;
