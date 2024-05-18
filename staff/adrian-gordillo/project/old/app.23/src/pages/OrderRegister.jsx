// src/pages/OrderRegister.jsx

import React, { useState, useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import OrderTable from "../components/OrderTable";
import ParameterTable from "../components/ParameterTable";
import AddOrderForm from "../components/AddOrderForm";
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

function OrderRegister() {
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
      console.log("Using token:", token);
      const deposit = await fetchDeposit(userId, token);
      const ordersData = await fetchOrders(userId, token);
      const updatedParameters = updateParameters(ordersData, deposit);
      setOrders(ordersData);
      setParameters(updatedParameters);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

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
      const updatedOrders = orders.filter((order) => order._id !== orderId);
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

  const handleUpdateDeposit = async (depositObject) => {
    try {
      const updatedDepositInfo = await updateDeposit(
        userId,
        depositObject,
        token
      );
      const updatedParameters = updateParameters(
        orders,
        updatedDepositInfo.deposit
      );
      setParameters((prevParameters) => ({
        ...prevParameters,
        deposit: updatedDepositInfo.deposit,
        ...updatedParameters,
      }));
    } catch (error) {
      console.error("Failed to update deposit:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        p: 1,
      }}
    >
      <Button
        variant="contained"
        onClick={handleOpenForm}
        sx={{ mb: 2, mr: "auto" }}
      >
        + Add Order
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Box sx={{ minWidth: "60%", p: 1 }}>
          <OrderTable
            parameters={parameters}
            orders={orders}
            onOrderDelete={handleDeleteOrder}
          />
        </Box>
        <Box sx={{ minWidth: 300, p: 1, ml: 2 }}>
          <ParameterTable
            parameters={parameters}
            handleUpdateDeposit={handleUpdateDeposit}
          />
        </Box>
      </Box>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box>
          <AddOrderForm
            onOrderAdded={handleAddOrder}
            closeForm={handleCloseForm}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default OrderRegister;
