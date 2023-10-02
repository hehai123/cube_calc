import React, { useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Paper,
  Typography

} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { ExpandMore, Clear, Add, DoubleArrow, HelpOutline } from "@mui/icons-material";
import daybreakPendantIcon from './icons/daybreakPendant.png';

import { useHistory } from "react-router-dom";


//CSS
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(1),
  },
  title: {
    color: "tomato",
  },
  subtitle: {
    color: "tan",
    marginBottom: "3rem",
  },
  typedContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100vw",
    textAlign: "center",
    zIndex: 1
  },
  flex: {
    display: "flex",
  },
  cubesAccordion: {
    width: '100%',
  },
  buffer: {
    marginTop: "10px",
    marginRight: "0px",
    marginBottom: "10px",
    marginLeft: "0px",
  },
  textBuffer: {
    marginTop: "0px",
    marginRight: "0px",
    marginBottom: "0px",
    marginLeft: "15px",
  },
  button: {
    width: 24, height: 24,
    padding: 0
  },
  parent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  boxes: {
    flex: '1 1 150px', /*  Stretching: */
    margin: '5px',
  },

}));


export default function ShouldITodd() {
  const classes = useStyles();
  const history = useHistory();
  const [numTrials, setNumTrials] = React.useState(0);
  const [mainCost, setMainCost] = React.useState(0);
  const [equipLevel, setEquipLevel] = React.useState(0);
  const [junkCost, setJunkCost] = React.useState(0);
  const [mesoPrice, setMesoPrice] = React.useState(0);
  const [starCatch, setStarCatch] = React.useState(true);
  const [resultTable, setResultTable] = React.useState([]);

  const boomRates = new Map([
    [16, 0.021],
    [17, 0.021],
    [18, 0.028],
    [19, 0.028],
    [20, 0.07],
    [21, 0.07]
  ]);

  function createData(
    toddAt, mesoCost, dollarCost, boom, todds
  ) {
    return { toddAt, mesoCost, dollarCost, boom, todds };
  }

  function runSimulation() {
    let sixteenCost = 0;
    let seventeenCost = 0;
    let eighteenCost = 0;

    let sixteenBoom = 0;
    let seventeenBoom = 0;
    let eighteenBoom = 0;

    let sixteenTodds = 0;
    let seventeenTodds = 0;
    let eighteenTodds = 0;

    let sixtee

    for (let i = numTrials; i >= 0; i--) {
      let sixteenCycle = simulateOneCycle(16);
      let seventeenCycle = simulateOneCycle(17);
      let eighteenCycle = simulateOneCycle(18);


      sixteenCost += sixteenCycle[0];
      sixteenBoom += sixteenCycle[1];
      sixteenTodds += sixteenCycle[2];

      seventeenCost += seventeenCycle[0];
      seventeenBoom += seventeenCycle[1];
      seventeenTodds += seventeenCycle[2];

      eighteenCost += eighteenCycle[0];
      eighteenBoom += eighteenCycle[1];
      eighteenTodds += eighteenCycle[2];

    }

    const sixteenRounded = (sixteenCost / numTrials / 1000000000).toFixed(2);
    const seventeenRounded = (seventeenCost / numTrials / 1000000000).toFixed(2);
    const eighteenRounded = (eighteenCost / numTrials / 1000000000).toFixed(2);

    const rows = [
      createData('16', sixteenRounded + "b", "$" + Math.ceil(sixteenRounded * mesoPrice), (sixteenBoom / numTrials).toFixed(2), (sixteenTodds / numTrials).toFixed(2)),
      createData('17', seventeenRounded + "b", "$" + Math.ceil(seventeenRounded * mesoPrice), (seventeenBoom / numTrials).toFixed(2), (seventeenTodds / numTrials).toFixed(2)),
      createData('18', eighteenRounded + "b", "$" + Math.ceil(eighteenRounded * mesoPrice), (eighteenBoom / numTrials).toFixed(2), (eighteenTodds / numTrials).toFixed(2)),
    ];

    setResultTable(rows);
  }

  function simulateOneCycle(stoppingPoint) {
    let totalCost = mainCost + junkCost;
    let failureChain = 0;
    let boomCount = 0;
    let toddCount = 1;
    let curLevel = 19;

    while (curLevel < 22) {
      let boomValue = doesItBoom(curLevel);

      if (failureChain !== 2) {
        //if it booms
        if (boomValue === 0) {
          totalCost += getMesoCost(curLevel) + mainCost + junkCost;
          curLevel = 19;
          boomCount++;
          toddCount++;
          failureChain = 0;
          // if it fails but dosent boom
        } else if (boomValue === -1) {
          if (curLevel === 20) {
            totalCost += getMesoCost(curLevel);
            failureChain = 0;
          } else {
            failureChain++;
            if (((curLevel - 1) <= stoppingPoint) && failureChain !== 2) {
              totalCost += getMesoCost(curLevel) + junkCost;
              toddCount++;
              curLevel = 19;
              failureChain = 0;
            } else {
              totalCost += getMesoCost(curLevel);
              curLevel -= 1;
            }
          }
          // if it passes
        } else {
          totalCost += getMesoCost(curLevel);
          curLevel += 1;
        }
        // if you fail 2 in a row, there is free +1 pity
      } else {
        totalCost += getMesoCost(curLevel);
        failureChain = 0;
        curLevel += 1;
      }
    }
    return [totalCost, boomCount, toddCount];
  }

  // -1 is boom, 0 is fail, 1 is pass
  function doesItBoom(startingStar) {
    let boom = boomRates.get(startingStar);

    let diceValue = (Math.floor(Math.random() * 1000) + 1) / 1000;

    if (diceValue <= boom) {
      return 0
    } else if (diceValue <= 0.7) {
      return -1
    } else {
      return 1
    }
  }

  function getMesoCost(startingStar) {
    return Math.ceil(1000 + (Math.pow(equipLevel, 3) * Math.pow((startingStar + 1), 2.7) / 200));
  }

  function handleCheckboxChange(e) {
    const checked = e.target.checked;
    setStarCatch(checked)
  }


  useEffect(() => {
    setNumTrials(1000);
    setMainCost(20000000000);
    setEquipLevel(140);
    setJunkCost(4000000000);
    setMesoPrice(16.5);
  }, []);

  useEffect(() => {
    runSimulation()
  }, [mesoPrice]);



  return (
    <div>
      <Paper>
        <Typography variant="h2">
          DAWN PENDANT TODD PAGE
        </Typography >
        <img height="96px" src={daybreakPendantIcon} />
      </Paper>
      <TextField
        required
        id="outlined-required"
        label="Number of Trials"
        defaultValue="1000"
        onChange={(e) => setNumTrials(Number(e.target.value))}
      />
      <TextField
        required
        id="outlined-disabled"
        label="Cost of Main Item"
        defaultValue="20000000000"
        onChange={(e) => setMainCost(Number(e.target.value))}
      />
      <TextField
        required
        id="outlined-disabled"
        label="Level of Main Item"
        defaultValue="140"
        onChange={(e) => setEquipLevel(Number(e.target.value))}
      />
      <TextField
        required
        id="outlined-disabled"
        label="Cost of Junk 20* Item"
        defaultValue="4000000000"
        onChange={(e) => setJunkCost(Number(e.target.value))}
      />
      <TextField
        required
        id="outlined-disabled"
        label="Meso Price/B"
        defaultValue="16.5"
        onChange={(e) => setMesoPrice(Number(e.target.value))}
      />

      <Button variant="contained" color="primary" onClick={() => runSimulation()}>Run Simulation</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Todd at</TableCell>
              <TableCell align="right">Cost (Mesos)</TableCell>
              <TableCell align="right">Cost ($)</TableCell>
              <TableCell align="right">Avg. Booms</TableCell>
              <TableCell align="right">Avg. Junk Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultTable.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.toddAt}</TableCell>
                <TableCell align="right">{row.mesoCost}</TableCell>
                <TableCell align="right">{row.dollarCost}</TableCell>
                <TableCell align="right">{row.boom}</TableCell>
                <TableCell align="right">{row.todds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper>
        <Typography>
          <a href="http://tiny.cc/finalfinaldamage" rel="noreferrer">
            IED Calculation aka "Final Final Damage" Doc
          </a>
        </Typography>
        <Typography>
          <a href="https://github.com/pladz/cube_calc/tree/master" rel="noreferrer">
            Very scuffed source code
          </a>
        </Typography>
      </Paper>
    </div>
  );
}
