import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import PotentialTable from "./potentialTable";
import PercentageGraphs from "./percentageGraphs";

import { useHistory } from "react-router-dom";
import ShouldITodd from "./shouldITodd";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    width: "120px",
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#f25c54" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Maple Math with Shitty UI
          </Typography>
          <Button
            className={classes.button}
            color="inherit"
            onClick={handleOpen}
          >
            {open ? (
              <Typography>TODD COST CALCULATOR</Typography>
            ) : (
              <Typography>CUBE RATES CALCULATOR</Typography>
            )}
          </Button>
        </Toolbar>
      </AppBar>
      {open ? <PotentialTable /> : <ShouldITodd />}
    </div>
  );
};

export default MainPage;
