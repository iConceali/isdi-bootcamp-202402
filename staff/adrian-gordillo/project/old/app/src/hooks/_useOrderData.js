// src/hooks/useOrderData.js

import { useState, useEffect, useCallback } from "react";
import {
  fetchDeposit,
  fetchOrders,
  addOrder,
  updateDeposit,
} from "../services/orderService";
import { updateParameters } from "../logic/order/updateParameters";
import { validate, errors } from "com";
const { ContentError } = errors;

export const useOrderData = (token) => {
  const [orders, setOrders] = useState([]);
  const [parameters, setParameters] = useState({
    deposit: 0,
    balance: 0,
    profitPercent: 0,
    profitDollars: 0,
    winRate: 0,
    numOrders: 0,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      validate.token(token, "Token");
      const deposit = await fetchDeposit(token);
      const ordersData = await fetchOrders(token);
      const updatedParameters = updateParameters(ordersData, deposit);
      setOrders(ordersData);
      setParameters(updatedParameters);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleAddOrder = useCallback(
    async (orderData) => {
      try {
        const newOrder = await addOrder(orderData, token);
        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        const updatedParameters = updateParameters(
          updatedOrders,
          parameters.deposit
        );
        setParameters(updatedParameters);
      } catch (error) {
        setError(error.message);
      }
    },
    [orders, parameters.deposit, token]
  );

  const handleUpdateDeposit = useCallback(
    async (depositObject) => {
      try {
        const updatedDepositInfo = await updateDeposit(depositObject, token);
        setParameters((prevParameters) => ({
          ...prevParameters,
          deposit: updatedDepositInfo.deposit,
        }));
      } catch (error) {
        setError(error.message);
      }
    },
    [token]
  );

  return {
    orders,
    parameters,
    error,
    isLoading,
    handleAddOrder,
    handleUpdateDeposit,
  };
};
