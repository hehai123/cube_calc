import React, { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import PotentialTable from "./potentialTable";
import PercentageGraphs from "./percentageGraphs";
import { Link } from "react-router-dom";

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
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return <>
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: "#f25c54" }}>
        <div style={{ position: "relative" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onMouseEnter={handleMenuOpen}
            onMouseLeave={handleMenuClose}
            size="large">
            <MenuIcon />
          </IconButton>
          {isMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "white",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                padding: "4px",
              }}
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleMenuClose}
            >
              <Button
                onClick={() => {
                  // Link to monster life
                  handleMenuClose();
                }}
              >
                Monster&nbsp;Life
              </Button>
              {/* Add more options as needed */}
            </div>
          )}
        </div>
        <Typography variant="h6" className={classes.title} align="center">
          Maple Math with <del>Shitty</del> Okay UI
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
  </>;
};

export default MainPage;
