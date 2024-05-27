// app/src/hooks/useArbitrageOpportunities.js

import { useState, useEffect, useCallback } from "react"; // Importa hooks de React
import fetchOpportunities from "../logic/arbitrage/fetchOpportunities"; // Importa la función para obtener oportunidades de arbitraje
import { validate, errors } from "com"; // Importa funciones de validación y manejo de errores
const { ContentError, SystemError } = errors; // Desestructura los tipos de errores específicos

// Hook personalizado para manejar la lógica de oportunidades de arbitraje
export const useArbitrageOpportunities = () => {
  // Estados para manejar las oportunidades y su visualización
  const [allOpportunities, setAllOpportunities] = useState([]); // Todas las oportunidades de arbitraje
  const [displayedOpportunities, setDisplayedOpportunities] = useState([]); // Oportunidades filtradas para mostrar

  // Estado para manejar los filtros
  const [filters, setFilters] = useState({
    type: "", // Tipo de arbitraje
    exchanges: [
      // Exchanges seleccionados
      "Binance",
      "Kraken",
      "Coinbase",
      "Bitfinex",
      "Crypto.com",
      "Gate.io",
      "KuCoin",
    ],
    profitThreshold: 0.02, // Umbral de rentabilidad
  });

  // Estados para manejar errores y estado de carga
  const [error, setError] = useState(null); // Mensaje de error
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga

  // Función para obtener datos de oportunidades de arbitraje
  const fetchOpportunitiesData = useCallback(async () => {
    setIsLoading(true); // Indica que los datos se están cargando
    try {
      const opportunities = await fetchOpportunities(); // Obtiene las oportunidades de arbitraje
      setAllOpportunities(opportunities); // Almacena todas las oportunidades en el estado
      setError(null); // Reinicia el estado de error
    } catch (error) {
      if (error instanceof ContentError || error instanceof SystemError) {
        setError(error.message); // Maneja errores específicos
      } else {
        setError("An unexpected error occurred"); // Maneja errores inesperados
      }
    }
    setIsLoading(false); // Indica que la carga de datos ha finalizado
  }, []);

  // useEffect para obtener datos de oportunidades cuando el componente se monta
  useEffect(() => {
    fetchOpportunitiesData(); // Llama a la función para obtener datos de oportunidades
    const intervalId = setInterval(fetchOpportunitiesData, 10000); // Establece un intervalo para actualizar los datos cada 10 segundos
    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [fetchOpportunitiesData]); // Se ejecuta cuando fetchOpportunitiesData cambia

  // useEffect para aplicar filtros cuando cambian los filtros o las oportunidades
  useEffect(() => {
    try {
      validate.number(filters.profitThreshold, "Profit Threshold");
      if (filters.type) {
        // Solo validar si el filtro type no está vacío
        validate.text(filters.type, "Filter Type", false);
      }

      // Filtra las oportunidades basadas en los filtros aplicados
      const filtered = allOpportunities.filter(
        (opportunity) =>
          (!filters.type || opportunity.type === filters.type) && // Filtra por tipo
          filters.exchanges.includes(opportunity.buyExchange) && // Filtra por exchange de compra
          filters.exchanges.includes(opportunity.sellExchange) && // Filtra por exchange de venta
          opportunity.profit >= filters.profitThreshold // Filtra por umbral de rentabilidad
      );
      setDisplayedOpportunities(filtered); // Actualiza las oportunidades mostradas
    } catch (error) {
      console.error("Error filtering opportunities:", error); // Maneja errores de validación
      setError("Invalid filter parameters"); // Establece el mensaje de error
    }
  }, [filters, allOpportunities]); // Se ejecuta cuando los filtros o las oportunidades cambian

  // Función para manejar cambios en los filtros
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters })); // Actualiza los filtros con los nuevos valores
  }, []);

  // Retorna las oportunidades mostradas, filtros, manejador de cambios de filtros, estado de carga y error
  return {
    displayedOpportunities,
    filters,
    handleFiltersChange,
    isLoading,
    error,
  };
};
