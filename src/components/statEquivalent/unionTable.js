import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
// import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const UnionTable = ({ unionEffects, onFieldChange, onRowSelect }) => {
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState("asc");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedUnionEffects = [...unionEffects].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "jobType"}
                direction={orderBy === "jobType" ? order : "asc"}
                onClick={() => handleRequestSort("jobType")}
              >
                Job Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "fraction"}
                direction={orderBy === "fraction" ? order : "asc"}
                onClick={() => handleRequestSort("fraction")}
              >
                Fraction
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "job"}
                direction={orderBy === "job" ? order : "asc"}
                onClick={() => handleRequestSort("job")}
              >
                Job
              </TableSortLabel>
            </TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "effect"}
                direction={orderBy === "effect" ? order : "asc"}
                onClick={() => handleRequestSort("effect")}
              >
                Effect
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUnionEffects.map((unionData) => (
            <TableRow
              key={unionData.id}
              onClick={(e) => {
                if (
                  !e.target.closest(".MuiFormControl-root") &&
                  !e.target.closest(".MuiInputBase-root")
                ) {
                  onRowSelect(unionData.id);
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = unionData.selected
                  ? "#D2E9E9"
                  : "#F8F6F4"; // Apply hover effect on mouse enter
                // e.currentTarget.style.cursor = "pointer"; // Change cursor to a pointer
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = unionData.selected
                  ? "#D2E9E9"
                  : "transparent"; // Remove hover effect on mouse leave
                // e.currentTarget.style.cursor = "auto"; // Reset cursor to default
              }}
              style={{
                backgroundColor: unionData.selected ? "#D2E9E9" : "transparent",
              }}
            >
              <TableCell>{unionData.jobType}</TableCell>
              <TableCell>{unionData.fraction}</TableCell>
              <TableCell>{unionData.job}</TableCell>
              <TableCell>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <NativeSelect
                    id={`union-${unionData.id}`}
                    inputProps={{
                      name: "what-rank-help-pls",
                      id: "rank-native-helper",
                    }}
                    value={unionData.value}
                    onChange={(e) => {
                      onFieldChange(unionData.id, e.target.value);
                    }}
                    label="Rank"
                    disabled={!unionData.selected}
                  >
                    {unionData.list.split(", ").map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </TableCell>
              <TableCell>{unionData.effect}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UnionTable;
