// src/hooks/useAddOrderForm.js

import { useState } from "react";
import { validate, errors } from "com";
const { ContentError } = errors;

const useAddOrderForm = (onOrderAdded, closeForm) => {
  const [formValues, setFormValues] = useState({
    symbol: "",
    date: "",
    investment: "",
    profitPercent: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      validate.text(formValues.symbol, "Symbol");
      validate.date(formValues.date, "Date");
      validate.number(parseFloat(formValues.investment), "Investment");
      validate.number(parseFloat(formValues.profitPercent), "Profit Percent");

      const orderData = {
        ...formValues,
        investment: parseFloat(formValues.investment),
        profitPercent: parseFloat(formValues.profitPercent),
      };

      await onOrderAdded(orderData);
      closeForm();
    } catch (error) {
      if (error instanceof ContentError) {
        console.error("Validation error:", error.message);
      } else {
        console.error("Failed to add order:", error);
      }
    }
  };

  return {
    formValues,
    handleInputChange,
    handleSubmit,
  };
};

export default useAddOrderForm;
