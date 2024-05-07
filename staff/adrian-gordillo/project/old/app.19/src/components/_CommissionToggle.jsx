// app/src/components/CommissionToggle.jsx.jsx

import React, { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const CommissionToggle = ({ onToggle }) => {
  const [includeCommissions, setIncludeCommissions] = useState(true);

  const handleChange = (event) => {
    setIncludeCommissions(event.target.checked);
    onToggle(event.target.checked); // This will call the parent component's method to update the state
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={includeCommissions}
          onChange={handleChange}
          color="primary"
        />
      }
      label="Include Commissions"
    />
  );
};

export default CommissionToggle;
