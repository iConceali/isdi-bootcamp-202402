// src/pages/OrderRegister.jsx

import React from "react";
import { Box, Button, Modal } from "@mui/material";
import OrderTable from "../components/OrdersRegister/OrderTable";
import ParameterTable from "../components/OrdersRegister/ParameterTable";
import AddOrderForm from "../components/OrdersRegister/AddOrderForm";
import useOrderRegister from "../hooks/useOrderRegister";

function OrderRegister() {
  const {
    orders,
    parameters,
    openForm,
    handleOpenForm,
    handleCloseForm,
    handleAddOrder,
    handleDeleteOrder,
    handleUpdateDeposit,
  } = useOrderRegister();
  console.log(orders);
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
