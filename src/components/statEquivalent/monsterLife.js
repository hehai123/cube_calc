import { TextField } from "@mui/material";

const MonsterLife = ({ fieldData, onFieldChange }) => {
  return (
    <TextField
      label={fieldData.name}
      variant="outlined"
      margin="normal"
      fullWidth
      type="number"
      value={fieldData.value}
      onChange={(e) => onFieldChange(fieldData.id, e.target.value)}
    />
  );
};

export default MonsterLife;
