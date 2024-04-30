// app/src/pages/Watchlist.jsx

import React, { useEffect, useState } from "react";
import PriceTable from "../components/PriceTable"; // Reutiliza el componente de tabla de precios si es posible

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/watchlist`
        );
        setWatchlist(response.data);
      } catch (error) {
        console.error("Error fetching Watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
        Your Watchlist
      </Typography>
      <PriceTable prices={Watchlist} />
    </Box>
  );
};

export default Watchlist;
