// app/src/hooks/useFormValidation.js

import { useState } from "react";

// Validación de formularios
const useFormValidation = (initialState, validate, submitForm) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await submitForm(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;
