import { TextField } from "@mui/material";
import { useState } from "react";

const SimpleInputField = ({ fieldData, onFieldChange }) => {
  const [error, setError] = useState(false);

  return (
    <TextField
      key={fieldData.id}
      label={fieldData.name}
      variant="outlined"
      margin="normal"
      fullWidth
      type="number"
      value={fieldData.value}
      inputProps={{
        min: "0",
      }}
      onChange={(e) => {
        const inputText = e.target.value;

        if (inputText === "") {
          setError(false);
          onFieldChange(fieldData.id, "");
        } else {
          const numericValue = parseInt(inputText);
          if (!isNaN(numericValue)) {
            setError(false);
            onFieldChange(fieldData.id, numericValue);
          } else {
            setError(true);
          }
        }
      }}
      onPaste={(e) => {
        const pastedText = e.clipboardData.getData("text/plain");
        // Use a regular expression to check if the pasted text starts with a digit
        const containsOnlyNumbers = /^\d+$/.test(pastedText);

        if (!containsOnlyNumbers) {
          e.preventDefault(); // Prevent the paste action
          setError(true); // Set error state to true
        } else {
          setError(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "-" || e.key === "+" || e.key === "." || e.key === "e") {
          e.preventDefault();
        }
      }}
      error={error}
      helperText={error ? "Please enter a valid value" : ""}
    />
  );
};

export default SimpleInputField;
