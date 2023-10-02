import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box } from "@mui/material";

const EquipTable = ({ equipStats }) => {
  return (
    <>
      {equipStats.map((equipment) => (
        <Box key={equipment.id}>
          <Box>
            <strong>Equipment:</strong> {equipment.name}
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Stat</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Base</TableCell>
                  <TableCell>Flame</TableCell>
                  <TableCell>Scrolling</TableCell>
                  <TableCell>Starforce</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(equipment.stats).map((statKey) => (
                  <TableRow key={statKey} hover>
                    <TableCell>{equipment.stats[statKey].name}</TableCell>
                    <TableCell>{equipment.stats[statKey].total}</TableCell>
                    {Object.keys(equipment.stats[statKey].sources).map(
                      (source) => (
                        <TableCell key={source}>
                          {equipment.stats[statKey].sources[source].value}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </>
  );
};

export default EquipTable;
