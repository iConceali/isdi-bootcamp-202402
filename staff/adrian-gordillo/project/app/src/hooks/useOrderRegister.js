// src/hooks/useOrderRegister.js

import { useState, useEffect } from "react";
import { useUser } from "../userContext";
import getLoggedInUserId from "../logic/getLoggedInUserId";
import {
  fetchDeposit,
  fetchOrders,
  addOrder,
  updateDeposit,
  deleteOrder,
} from "../logic/order/index";
import updateParameters from "../logic/order/updateParameters";

const useOrderRegister = () => {
  const { token } = useUser();
  const userId = getLoggedInUserId();
  const [orders, setOrders] = useState([]);
  const [parameters, setParameters] = useState({
    deposit: 0,
    balance: 0,
    profitPercent: 0,
    profitDollars: 0,
    winRate: 0,
    numOrders: 0,
  });
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (userId) {
      loadInitialData();
    } else {
      console.error("User ID is not available");
    }
  }, [userId]);

  const loadInitialData = async () => {
    try {
      const deposit = await fetchDeposit(userId, token);
      const ordersData = await fetchOrders(userId, token);

      if (!Array.isArray(ordersData)) {
        console.error("Orders data is not an array", ordersData);
        return;
      }

      const updatedParameters = updateParameters(ordersData, deposit);
      setOrders(ordersData);
      setParameters(updatedParameters);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const handleAddOrder = async (orderData) => {
    try {
      const newOrder = await addOrder(userId, orderData, token);

      if (
        newOrder &&
        newOrder.symbol &&
        newOrder.investment !== undefined &&
        newOrder.profitPercent !== undefined
      ) {
        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        const updatedParameters = updateParameters(
          updatedOrders,
          parameters.deposit
        );
        setParameters(updatedParameters);
        handleCloseForm();
      } else {
        console.error("Invalid order data received:", newOrder);
      }
    } catch (error) {
      console.error("Failed to add order:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(userId, orderId, token);
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      const updatedParameters = updateParameters(
        updatedOrders,
        parameters.deposit
      );
      setParameters(updatedParameters);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  const handleUpdateDeposit = async (depositValue) => {
    // console.log(depositValue);
    try {
      await updateDeposit(userId, depositValue, token);
      setParameters((prevParameters) => ({
        ...prevParameters,
        deposit: depositValue,
        balance:
          prevParameters.balance + (depositValue - prevParameters.deposit),
        profitPercent: (prevParameters.profitDollars * 100) / depositValue,
      }));
    } catch (error) {
      console.error("Failed to update deposit:", error);
    }
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return {
    orders,
    parameters,
    openForm,
    handleOpenForm,
    handleCloseForm,
    handleAddOrder,
    handleDeleteOrder,
    handleUpdateDeposit,
  };
};

export default useOrderRegister;

// const handleUpdateDeposit = async (depositObject) => {
//   try {
//     const updatedDepositInfo = await updateDeposit(
//       userId,
//       depositObject,
//       token
//     );
//     setParameters((prevParameters) => ({
//       ...prevParameters,
//       deposit: updatedDepositInfo.deposit,
//       balance:
//         prevParameters.balance +
//         (updatedDepositInfo.deposit - prevParameters.deposit),
//     }));
//   } catch (error) {
//     console.error("Failed to update deposit:", error);
//   }
// };
