import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

function StatsDashboard({ stats }) {
  const halfLength = Math.ceil(stats.length / 2);

  const formatNumberWithCommas = (number) => {
    if (number === "" || isNaN(Number(number))) {
      return "";
    }

    return Number(number).toLocaleString();
  };

  return (
    <List>
      {Array.from({ length: halfLength }).map((_, index) => (
        <Box key={stats[index * 2].id}>
          <ListItem>
            <Grid container spacing={5}>
              <Grid item xs={3}>
                <ListItemText primary={stats[index * 2]?.name} />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={formatNumberWithCommas(stats[index * 2]?.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary={stats[index * 2 + 1]?.name} />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={formatNumberWithCommas(stats[index * 2 + 1]?.value)}
                />
              </Grid>
            </Grid>
          </ListItem>
          {index < halfLength - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
}

export default StatsDashboard;
