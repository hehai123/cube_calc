import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Paper,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Container,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  ExpandMore,
  Clear,
  Add,
  DoubleArrow,
  HelpOutline,
  FastForward,
} from "@material-ui/icons";
import {
  hatLines,
  topLines,
  bottomLines,
  shoeLines,
  gloveLines,
  capeShoulderBeltLines,
  accessoryLines,
  heartLines,
  weaponLines,
  secondaryLines,
  emblemLines,
} from "./lines";
import {
  hatSubLines,
  topSubLines,
  bottomShoeSubLines,
  gloveSubLines,
  capeShoulderBeltSubLines,
  accessorySubLines,
  heartSubLines,
  weaponSubLines,
  secondarySubLines,
  emblemSubLines,
} from "./subLines";
import {
  legendHatLines,
  legendTopLines,
  legendBottomLines,
  legendShoeLines,
  legendGloveLines,
  legendCapeShoulderBeltLines,
  legendAccessoryLines,
  legendHeartLines,
  legendWeaponLines,
  legendSecondaryLines,
  legendEmblemLines,
} from "./legendLines";
import {
  uniqueHatLines,
  uniqueTopLines,
  uniquebottomShoeLines,
  uniqueGloveLines,
  uniqueCapeShoulderBeltLines,
  uniqueAccessoryLines,
  // uniqueHeartLines,
  uniqueWeaponLines,
  uniqueSecondaryLines,
  uniqueEmblemLines,
} from "./uniqueLines";

import { useHistory } from "react-router-dom";

import purpleCubeIcon from "./icons/purple_clean.png";
import blackCubeIcon from "./icons/black_clean.png";
import redCubeIcon from "./icons/red_clean.png";
import equalityCubeIcon from "./icons/equality_clean.png";
import hexaCubeIcon from "./icons/hexa_clean.png";
import { display } from "@material-ui/system";

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
    zIndex: 1,
  },
  flex: {
    display: "flex",
  },
  cubesAccordion: {
    width: "100%",
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
    width: 24,
    height: 24,
    padding: 0,
  },
  parent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  boxes: {
    flex: "1 1 150px" /*  Stretching: */,
    margin: "5px",
  },
  paper: {
    padding: theme.spacing(1),
    margin: "0 5px",
    textAlign: "center",
    backgroundColor: "#D6E4FF",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
  },
}));

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const gearType = [
  { title: "Hat", type: "Armor" },
  { title: "Top", type: "Armor" },
  { title: "Bottom", type: "Armor" },
  { title: "Overall", type: "Armor" },
  { title: "Shoe", type: "Armor" },
  { title: "Cape", type: "Armor" },
  { title: "Glove", type: "Armor" },
  { title: "Shoulder", type: "Armor" },
  { title: "Ring", type: "Accessory" },
  { title: "Earring", type: "Accessory" },
  { title: "Pendant", type: "Accessory" },
  { title: "Belt", type: "Accessory" },
  { title: "Heart", type: "Accessory" },
  { title: "Face", type: "Accessory" },
  { title: "Eye", type: "Accessory" },
  { title: "Weapon", type: "WSE" },
  { title: "Emblem", type: "WSE" },
  { title: "Secondary", type: "WSE" },
];

const gearOptions = gearType.map((option) => {
  const type = option.type;
  return {
    type: /[0-9]/.test(type) ? "0-9" : type,
    ...option,
  };
});

export default function PotentialTable() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const classes = useStyles();
  const history = useHistory();

  const [inputValue, setInputValue] = React.useState("");
  const [lineOneInputValue, setLineOneInputValue] = React.useState("");
  const [lineTwoInputValue, setLineTwoInputValue] = React.useState("");
  const [lineThreeInputValue, setLineThreeInputValue] = React.useState("");

  const [xOneInputValue, setXOneInputValue] = React.useState(0);
  const [typeOneInputValue, setTypeOneInputValue] = React.useState("");
  const [xTwoInputValue, setXTwoInputValue] = React.useState(0);
  const [typeTwoInputValue, setTypeTwoInputValue] = React.useState("");
  const [both, setBoth] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);
  const [secondExpanded, setSecondExpanded] = React.useState(false);
  const [lineOptions, setLineOptions] = React.useState([]);
  const [subLineOptions, setSubLineOptions] = React.useState([]);
  const [typeOptions, setTypeOptions] = React.useState([]);
  const [typeOptionsTwo, setTypeOptionsTwo] = React.useState([]);
  const [checkSecondCriterion, setCheckSecondCombination] = useState(false);

  //line percentages
  const [lineOneRedPercentage, setLineOneRedPercentage] = React.useState(0);
  const [lineOneBlackPercentage, setLineOneBlackPercentage] = React.useState(0);
  const [lineOneEqualityPercentage, setLineOneEqualityPercentage] =
    React.useState(0);
  const [lineOneHexaPercentage, setLineOneHexaPercentage] = React.useState(0);

  const [lineTwoRedPercentage, setLineTwoRedPercentage] = React.useState(0);
  const [lineTwoBlackPercentage, setLineTwoBlackPercentage] = React.useState(0);
  const [lineTwoEqualityPercentage, setLineTwoEqualityPercentage] =
    React.useState(0);
  const [lineTwoHexaPercentage, setLineTwoHexaPercentage] = React.useState(0);

  const [lineThreeRedPercentage, setLineThreeRedPercentage] = React.useState(0);
  const [lineThreeBlackPercentage, setLineThreeBlackPercentage] =
    React.useState(0);
  const [lineThreeEqualityPercentage, setLineThreeEqualityPercentage] =
    React.useState(0);
  const [lineThreeHexaPercentage, setLineThreeHexaPercentage] =
    React.useState(0);

  const [curRedPercentage, setCurRedPercentage] = React.useState(0);
  const [curBlackPercentage, setCurBlackPercentage] = React.useState(0);
  const [curEqualityPercentage, setCurEqualityPercentage] = React.useState(0);
  const [curHexaPercentage, setCurHexaPercentage] = React.useState(0);

  const [legendLineOptions, setLegendLineOptions] = useState([]);
  // const [uniqueLineOptions, setUniqueLineOptions] = useState([]);
  const [redSecondLineOptions, setRedSecondLineOptions] = useState([]);
  const [redThirdLineOptions, setRedThirdLineOptions] = useState([]);
  const [blackSecondLineOptions, setBlackSecondLineOptions] = useState([]);
  const [blackThirdLineOptions, setBlackThirdLineOptions] = useState([]);

  // Final probability calculated
  const [hexaProbability, setHexaProbability] = useState(0);
  const [blackProbability, setBlackProbability] = useState(0);
  const [redProbability, setRedProbability] = useState(0);
  const [equalityProbability, setEqualityProbability] = useState(0);

  const [hexaCubeNumber, setHexaCubeNumber] = useState(0);
  const [blackCubeNumber, setBlackCubeNumber] = useState(0);
  const [redCubeNumber, setRedCubeNumber] = useState(0);
  const [equalityCubeNumber, setEqualityCubeNumber] = useState(0);

  //table
  const [rows, setRows] = React.useState([]);
  // const [curRowId, setCurRowId] = React.useState(0);

  //readMe
  const [helpOpen, setHelpOpen] = React.useState(false);
  const handleHelpOpen = () => {
    setHelpOpen(true);
  };

  const handleHelpClose = (value) => {
    setHelpOpen(false);
  };

  const safeParseInt = (value) => {
    const num = parseInt(value);
    return isNaN(num) ? 0 : num;
  };

  function updateLineOptions(title) {
    var curLines = [];
    var curSubLines = [];
    var legendLines = [];
    var uniqueLines = [];
    const red2 = 10; // 1 in 10 chance of being a legendary line for red cube 2nd line
    const red3 = 100; // 1 in 100 chance of being a legendary line for red cube 3rd line
    const black2 = 5;
    const black3 = 20;

    switch (title) {
      case "Hat":
        curLines = hatLines;
        curSubLines = hatSubLines;
        legendLines = legendHatLines;
        uniqueLines = uniqueHatLines;
        break;
      case "Top":
        curLines = topLines;
        curSubLines = topSubLines;
        legendLines = legendTopLines;
        uniqueLines = uniqueTopLines;
        break;
      case "Bottom":
        curLines = bottomLines;
        curSubLines = bottomShoeSubLines;
        legendLines = legendBottomLines;
        uniqueLines = uniquebottomShoeLines;
        break;
      case "Overall":
        curLines = topLines;
        curSubLines = topSubLines;
        legendLines = legendTopLines;
        uniqueLines = uniqueTopLines;
        break;
      case "Shoe":
        curLines = shoeLines;
        curSubLines = bottomShoeSubLines;
        legendLines = legendShoeLines;
        uniqueLines = uniquebottomShoeLines;
        break;
      case "Glove":
        curLines = gloveLines;
        curSubLines = gloveSubLines;
        legendLines = legendGloveLines;
        uniqueLines = uniqueGloveLines;
        break;
      case "Cape":
      case "Shoulder":
      case "Belt":
        curLines = capeShoulderBeltLines;
        curSubLines = capeShoulderBeltSubLines;
        legendLines = legendCapeShoulderBeltLines;
        uniqueLines = uniqueCapeShoulderBeltLines;
        break;
      case "Ring":
      case "Earring":
      case "Pendant":
      case "Face":
      case "Eye":
        curLines = accessoryLines;
        curSubLines = accessorySubLines;
        legendLines = legendAccessoryLines;
        uniqueLines = uniqueAccessoryLines;
        break;
      case "Heart":
        curLines = heartLines;
        // curSubLines = heartSubLines;
        curSubLines = accessorySubLines;
        legendLines = legendHeartLines;
        uniqueLines = uniqueAccessoryLines;
        break;
      case "Weapon":
        curLines = weaponLines;
        curSubLines = weaponSubLines;
        legendLines = legendWeaponLines;
        uniqueLines = uniqueWeaponLines;
        break;
      case "Secondary":
        curLines = secondaryLines;
        curSubLines = secondarySubLines;
        legendLines = legendSecondaryLines;
        uniqueLines = uniqueSecondaryLines;
        break;
      case "Emblem":
        curLines = emblemLines;
        curSubLines = emblemSubLines;
        legendLines = legendEmblemLines;
        uniqueLines = uniqueEmblemLines;
        break;
      default:
        curLines = hatLines;
        legendLines = legendHatLines;
        break;
    }

    setLineOptions(
      curLines.map((option) => {
        const stat = option.stat;
        const prime = option.prime;
        const red1 = option.red1;
        const black1 = option.black1;
        const red2 = option.red2;
        const black2 = option.black2;
        const red3 = option.red3;
        const black3 = option.black3;
        const type = option.type;
        const value = option.value;

        return {
          stat: stat,
          type: type,
          value: value,
          prime: prime,
          red1: red1,
          black1: black1,
          red2: red2,
          black2: black2,
          red3: red3,
          black3: black3,
          ...option,
        };
      })
    );

    setSubLineOptions(
      curLines.concat(curSubLines).map((option) => {
        const stat = option.stat;
        const prime = option.prime;
        const red2 = option.red2;
        const black2 = option.black2;
        const red3 = option.red3;
        const black3 = option.black3;
        const type = option.type;
        const value = option.value;

        return {
          stat: stat,
          type: type,
          value: value,
          prime: prime,
          red2: red2,
          black2: black2,
          red3: red3,
          black3: black3,
          ...option,
        };
      })
    );

    const totalLegendWeight = legendLines.reduce(
      (total, item) => total + item.weight,
      0
    );
    setLegendLineOptions(
      legendLines.map((option) => {
        const stat = option.stat;
        const weight = option.weight;
        const type = option.type;
        const value = option.value;

        return {
          stat: stat,
          type: type,
          value: value,
          weight: weight,
          totalWeight: totalLegendWeight,
          // ...option,
        };
      })
    );

    const totalUniqueWeight = uniqueLines.reduce(
      (total, item) => total + item.weight,
      0
    );

    const black2LegendLines = legendLines.map((option) => ({
      ...option,
      totalWeight: totalLegendWeight * black2,
    }));
    const black2UniqueLines = uniqueLines.map((option) => ({
      ...option,
      weight: option.weight * (black2 - 1),
      totalWeight: totalUniqueWeight * black2,
    }));

    const black3LegendLines = legendLines.map((option) => ({
      ...option,
      totalWeight: totalLegendWeight * black3,
    }));
    const black3UniqueLines = uniqueLines.map((option) => ({
      ...option,
      weight: option.weight * (black3 - 1),
      totalWeight: totalUniqueWeight * black3,
    }));

    const red2LegendLines = legendLines.map((option) => ({
      ...option,
      totalWeight: totalLegendWeight * red2,
    }));
    const red2UniqueLines = uniqueLines.map((option) => ({
      ...option,
      weight: option.weight * (red2 - 1),
      totalWeight: totalUniqueWeight * red2,
    }));

    const red3LegendLines = legendLines.map((option) => ({
      ...option,
      totalWeight: totalLegendWeight * red3,
    }));
    const red3UniqueLines = uniqueLines.map((option) => ({
      ...option,
      weight: option.weight * (red3 - 1),
      totalWeight: totalUniqueWeight * red3,
    }));

    setBlackSecondLineOptions(black2LegendLines.concat(black2UniqueLines));
    setBlackThirdLineOptions(black3LegendLines.concat(black3UniqueLines));
    setRedSecondLineOptions(red2LegendLines.concat(red2UniqueLines));
    setRedThirdLineOptions(red3LegendLines.concat(red3UniqueLines));
    // setUniqueLineOptions(
    //   legendLines.concat(uniqueLines).map((option) => {
    //     const stat = option.stat;
    //     const weight = option.weight;
    //     const type = option.type;
    //     const value = option.value;

    //     return {
    //       stat: stat,
    //       type: type,
    //       value: value,
    //       weight: weight,
    //       totalWeight: totalUniqueWeight,
    //       // ...option,
    //     };
    //   })
    // );

    let types = curLines.concat(curSubLines).map((option) => {
      const type = option.type;

      return {
        type: type,
      };
    });

    let result = types.filter(function ({ type }) {
      return !this.has(type) && this.add(type);
    }, new Set());

    setTypeOptions(result);
  }

  function updateTypeOptionsTwo() {
    let options = JSON.parse(JSON.stringify(typeOptions));
    let selectedField = typeOneInputValue;

    options = options.filter(function (item) {
      return item.type !== selectedField;
    });

    setTypeOptionsTwo(options);
  }

  function getTotalRedPercentages() {
    var totalRedPercentage = 0;
    rows.map((row) => (totalRedPercentage = totalRedPercentage + row.red));
    return totalRedPercentage;
  }

  function getTotalBlackPercentages() {
    var totalBlackPercentage = 0;
    rows.map(
      (row) => (totalBlackPercentage = totalBlackPercentage + row.black)
    );
    return totalBlackPercentage;
  }

  function getTotalEqualityPercentages() {
    var totalEqualityPercentage = 0;
    rows.map(
      (row) =>
        (totalEqualityPercentage = totalEqualityPercentage + row.equality)
    );
    return totalEqualityPercentage;
  }

  function getTotalHexaPercentages() {
    var totalHexaPercentage = 0;
    rows.map((row) => (totalHexaPercentage = totalHexaPercentage + row.hexa));
    return totalHexaPercentage;
  }

  function hexaCalc(line1, line2, line3) {
    //123 124 126 135 145 156
    const perm1 = line1 * line2 * line3;
    //125
    const perm2 = line1 * line2 * line2;
    //134 136 146
    const perm3 = line1 * line3 * line3;

    return perm1 * 6 + perm2 + perm3 * 3;
  }

  //============================================================= July 2023 ================================================================
  // Handles probability together with 4th, 5th and 6th line
  const hexaNext3LinesProbCalc = (
    x1,
    type1,
    x2,
    type2,
    acceptAllStat1,
    acceptAllStat2,
    data,
    line1,
    line2,
    line3
  ) => {
    let totalProbability = 0;
    let selectedLine = [false, false, false];
    let tempLines = [];
    const probability =
      (line1.weight * line2.weight * line3.weight) /
      (line1.totalWeight * line2.totalWeight * line3.totalWeight);

    if (line1.type === type1 || (line1.type === "AS" && acceptAllStat1)) {
      tempLines.push({ value: line1.value, type: line1.type });
      selectedLine[0] = true;
    }
    if (line2.type === type1 || (line2.type === "AS" && acceptAllStat1)) {
      tempLines.push({ value: line2.value, type: line2.type });
      selectedLine[1] = true;
    }
    if (line3.type === type1 || (line3.type === "AS" && acceptAllStat1)) {
      tempLines.push({ value: line3.value, type: line3.type });
      selectedLine[2] = true;
    }

    if (checkSecondCriterion) {
      if (line1.type === type2 || (line1.type === "AS" && acceptAllStat2)) {
        if (!selectedLine[0]) {
          tempLines.push({ value: line1.value, type: line1.type });
          selectedLine[0] = true;
        }
      }
      if (line2.type === type2 || (line2.type === "AS" && acceptAllStat2)) {
        if (!selectedLine[1]) {
          tempLines.push({ value: line2.value, type: line2.type });
          selectedLine[1] = true;
        }
      }
      if (line3.type === type2 || (line3.type === "AS" && acceptAllStat2)) {
        if (!selectedLine[2]) {
          tempLines.push({ value: line3.value, type: line3.type });
          selectedLine[2] = true;
        }
      }
    }

    for (const [key, value] of Object.entries(data)) {
      // let lineComponents = key.split(", ");
      // let lines = lineComponents.map((component) => {
      //   let [value, type] = component.split(" ");
      //   return { value: parseInt(value), type: type };
      // });
      const lineComponents = key.split(", ");
      let lines = lineComponents.map((component) => {
        let [value, ...typeParts] = component.split(" ");
        let type = typeParts.join(" ").trim();
        return { value: parseInt(value), type: type };
      });

      lines = lines.concat(tempLines);
      let bossLinesCount = 0;
      for (const line of lines) {
        if (line.type === "BOSS") bossLinesCount += 1;
      }
      if (bossLinesCount > 2) continue;

      lineSorter(lines);

      let sum = 0;
      let sum2 = 0;
      let linesSelected = 0;
      let selectableLines = [];

      for (let i = 0; i < lines.length; i++) {
        if (linesSelected >= 3 || sum >= x1) {
          selectableLines.push(i);
          continue;
        }

        const line = lines[i];
        if (line.type === type1 || (line.type === "AS" && acceptAllStat1)) {
          sum += line.value;
          linesSelected += 1;
          if (line.type === type2 || (line.type === "AS" && acceptAllStat2)) {
            sum2 += line.value;
          }
        } else {
          selectableLines.push(i);
        }
      }

      if (!checkSecondCriterion) {
        if (linesSelected <= 3 && sum >= x1) {
          totalProbability += value * probability;
        }
      } else {
        if (linesSelected === 3) {
          if (sum >= x1 && sum2 >= x2) {
            totalProbability += value * probability;
          }
        } else {
          for (const index of selectableLines) {
            const line = lines[index];

            if (line.type === type2 || (line.type === "AS" && acceptAllStat2)) {
              sum2 += line.value;
              linesSelected += 1;
              if (
                line.type === type1 ||
                (line.type === "AS" && acceptAllStat1)
              ) {
                sum += line.value;
              }
            }

            if (linesSelected >= 3) break;
          }

          if (sum >= x1 && sum2 >= x2) {
            totalProbability += value * probability;
          }
        }
      }
    }

    return totalProbability;
  };

  // Sort the array of lines by descedning value and type
  const lineSorter = (lines) => {
    lines.sort((a, b) => {
      if (b.value !== a.value) {
        return b.value - a.value; // Sort by descending value
      } else {
        return a.type.localeCompare(b.type); // Sort alphabetically by type
      }
    });
  };

  // Sort key by descending value and by type
  const keySorter = (keyFormat) => {
    keyFormat.sort(function (a, b) {
      // Extract the numeric values and the string parts from the strings
      let valueA = parseFloat(a);
      let valueB = parseFloat(b);
      let stringA = a.split(" ")[1];
      let stringB = b.split(" ")[1];

      // Compare the values in descending order
      if (valueA > valueB) {
        return -1;
      } else if (valueA < valueB) {
        return 1;
      } else {
        // If the values are equal, compare the string parts
        if (stringA > stringB) {
          return -1;
        } else if (stringA < stringB) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    return keyFormat;
  };

  // Calculates hexa probability, also calculate red cube probability
  const hexaAndRedProbCalc = (x1, type1, x2, type2) => {
    let acceptAllStat1 = false;
    let acceptAllStat2 = false;
    let totalHexaProbability = 0;
    // let checkSecondCriterion = false;
    let data = {};

    if (
      type1 === "STR" ||
      type1 === "DEX" ||
      type1 === "INT" ||
      type1 === "LUK"
    ) {
      acceptAllStat1 = true;
    }
    if (
      type2 === "STR" ||
      type2 === "DEX" ||
      type2 === "INT" ||
      type2 === "LUK"
    ) {
      acceptAllStat2 = true;
    }

    // if (x2 !== "" && type2 !== "") {
    //   checkSecondCriterion = true;
    // } else {
    //   checkSecondCriterion = false;
    // }

    for (const line1 of legendLineOptions) {
      for (const line2 of redSecondLineOptions) {
        for (const line3 of redThirdLineOptions) {
          if (
            line1.type === "BOSS" &&
            line2.type === "BOSS" &&
            line3.type === "BOSS"
          )
            continue;

          let sum = 0;
          let sum2 = 0;
          let selectedLine = [false, false, false];

          const probability =
            (line1.weight * line2.weight * line3.weight) /
            (line1.totalWeight * line2.totalWeight * line3.totalWeight);

          if (line1.type === type1 || (line1.type === "AS" && acceptAllStat1)) {
            sum += line1.value;
            selectedLine[0] = true;
          }
          if (line2.type === type1 || (line2.type === "AS" && acceptAllStat1)) {
            sum += line2.value;
            selectedLine[1] = true;
          }
          if (line3.type === type1 || (line3.type === "AS" && acceptAllStat1)) {
            sum += line3.value;
            selectedLine[2] = true;
          }

          if (checkSecondCriterion) {
            if (
              line1.type === type2 ||
              (line1.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line1.value;
              selectedLine[0] = true;
            }
            if (
              line2.type === type2 ||
              (line2.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line2.value;
              selectedLine[1] = true;
            }
            if (
              line3.type === type2 ||
              (line3.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line3.value;
              selectedLine[2] = true;
            }
          }

          if (
            (!checkSecondCriterion && sum >= x1) ||
            (checkSecondCriterion && sum >= x1 && sum2 >= x2)
          ) {
            totalHexaProbability += probability;
          } else {
            let keyArray = [];
            if (selectedLine[0]) {
              keyArray.push(line1.value.toString() + " " + line1.type);
            }
            if (selectedLine[1]) {
              keyArray.push(line2.value.toString() + " " + line2.type);
            }
            if (selectedLine[2]) {
              keyArray.push(line3.value.toString() + " " + line3.type);
            }
            keySorter(keyArray); // Sort the keys in a specific way
            let key = keyArray.join(", ");

            if (key in data) {
              data[key] += probability;
            } else {
              data[key] = probability;
            }
          }
        }
      }
    }

    for (const line1 of redSecondLineOptions) {
      for (const line2 of redThirdLineOptions) {
        for (const line3 of redThirdLineOptions) {
          totalHexaProbability += hexaNext3LinesProbCalc(
            x1,
            type1,
            x2,
            type2,
            acceptAllStat1,
            acceptAllStat2,
            data,
            line1,
            line2,
            line3
          );
        }
      }
    }

    let totalProbabilityInData = 0;
    let count = 0;
    for (const [key, value] of Object.entries(data)) {
      console.log("Key:", key, "Value:", value);
      totalProbabilityInData += value;
      count += 1;
    }

    // Red cube's probability will not be stored in data
    const redCubeProbability = 1 - totalProbabilityInData;

    setRedProbability(redCubeProbability);
    setRedCubeNumber(Math.round(1 / redCubeProbability));
    setHexaProbability(totalHexaProbability);
    setHexaCubeNumber(Math.round(1 / totalHexaProbability));

    console.log(totalProbabilityInData, count, "unique lines in dictionary.");
    // console.log("Total probability:", totalHexaProbability);
    // console.log("Hexa results: 1 in", 1 / totalHexaProbability, "cubes.");
  };

  const blackProbCalc = (x1, type1, x2, type2) => {
    let acceptAllStat1 = false;
    let acceptAllStat2 = false;
    let totalBlackProbability = 0;
    // let checkSecondCriterion = false;

    if (
      type1 === "STR" ||
      type1 === "DEX" ||
      type1 === "INT" ||
      type1 === "LUK"
    ) {
      acceptAllStat1 = true;
    }
    if (
      type2 === "STR" ||
      type2 === "DEX" ||
      type2 === "INT" ||
      type2 === "LUK"
    ) {
      acceptAllStat2 = true;
    }

    // if (x2 !== "" && type2 !== "") {
    //   checkSecondCriterion = true;
    // } else {
    //   checkSecondCriterion = false;
    // }

    for (const line1 of legendLineOptions) {
      for (const line2 of blackSecondLineOptions) {
        for (const line3 of blackThirdLineOptions) {
          if (
            line1.type === "BOSS" &&
            line2.type === "BOSS" &&
            line3.type === "BOSS"
          )
            continue;

          let sum = 0;
          let sum2 = 0;

          const probability =
            (line1.weight * line2.weight * line3.weight) /
            (line1.totalWeight * line2.totalWeight * line3.totalWeight);

          if (line1.type === type1 || (line1.type === "AS" && acceptAllStat1)) {
            sum += line1.value;
          }
          if (line2.type === type1 || (line2.type === "AS" && acceptAllStat1)) {
            sum += line2.value;
          }
          if (line3.type === type1 || (line3.type === "AS" && acceptAllStat1)) {
            sum += line3.value;
          }

          if (checkSecondCriterion) {
            if (
              line1.type === type2 ||
              (line1.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line1.value;
            }
            if (
              line2.type === type2 ||
              (line2.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line2.value;
            }
            if (
              line3.type === type2 ||
              (line3.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line3.value;
            }

            if (sum >= x1 && sum2 >= x2) {
              totalBlackProbability += probability;
            }
          } else {
            if (sum >= x1) {
              totalBlackProbability += probability;
            }
          }
        }
      }
    }

    setBlackProbability(totalBlackProbability);
    setBlackCubeNumber(Math.round(1 / totalBlackProbability));
  };

  const equalityProbCalc = (x1, type1, x2, type2) => {
    let acceptAllStat1 = false;
    let acceptAllStat2 = false;
    let totalEqualityProbability = 0;
    // let checkSecondCriterion = false;

    if (
      type1 === "STR" ||
      type1 === "DEX" ||
      type1 === "INT" ||
      type1 === "LUK"
    ) {
      acceptAllStat1 = true;
    }
    if (
      type2 === "STR" ||
      type2 === "DEX" ||
      type2 === "INT" ||
      type2 === "LUK"
    ) {
      acceptAllStat2 = true;
    }

    // if (x2 !== "" && type2 !== "") {
    //   checkSecondCriterion = true;
    // } else {
    //   checkSecondCriterion = false;
    // }

    for (const line1 of legendLineOptions) {
      for (const line2 of legendLineOptions) {
        for (const line3 of legendLineOptions) {
          if (
            line1.type === "BOSS" &&
            line2.type === "BOSS" &&
            line3.type === "BOSS"
          )
            continue;

          let sum = 0;
          let sum2 = 0;

          const probability =
            (line1.weight * line2.weight * line3.weight) /
            (line1.totalWeight * line2.totalWeight * line3.totalWeight);

          if (line1.type === type1 || (line1.type === "AS" && acceptAllStat1)) {
            sum += line1.value;
          }
          if (line2.type === type1 || (line2.type === "AS" && acceptAllStat1)) {
            sum += line2.value;
          }
          if (line3.type === type1 || (line3.type === "AS" && acceptAllStat1)) {
            sum += line3.value;
          }

          if (checkSecondCriterion) {
            if (
              line1.type === type2 ||
              (line1.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line1.value;
            }
            if (
              line2.type === type2 ||
              (line2.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line2.value;
            }
            if (
              line3.type === type2 ||
              (line3.type === "AS" && acceptAllStat2)
            ) {
              sum2 += line3.value;
            }

            if (sum >= x1 && sum2 >= x2) {
              totalEqualityProbability += probability;
            }
          } else {
            if (sum >= x1) {
              totalEqualityProbability += probability;
            }
          }
        }
      }
    }

    setEqualityProbability(totalEqualityProbability);
    setEqualityCubeNumber(Math.round(1 / totalEqualityProbability));
  };

  const calcAllCubeProbabilities = (x1, type1, x2, type2) => {
    blackProbCalc(x1, type1, x2, type2);
    hexaAndRedProbCalc(x1, type1, x2, type2);
    equalityProbCalc(x1, type1, x2, type2);
  };

  //============================================================= END ===============================================================

  function clearRows() {
    setRows([]);
  }

  function addToRows(row) {
    setRows((oldRows) => [...oldRows, row]);
  }

  function createRow(id, line1, line2, line3, red, black, equality, hexa) {
    return { id, line1, line2, line3, red, black, equality, hexa };
  }

  const handleRemoveItem = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  function updateCurPercentages(red1, red2, red3, black1, black2, black3) {
    setCurRedPercentage(red1 * red2 * red3);
    setCurBlackPercentage(black1 * black2 * black3);
  }

  function updateCurEqualityPercentages(eq1, eq2, eq3) {
    setCurEqualityPercentage(eq1 * eq2 * eq3);
  }

  function updateCurHexaPercentages(hex1, hex2, hex3) {
    setCurHexaPercentage(hex1 * hex2 * hex3);
  }

  function moreThanStat(x, type, line1, line2, line3) {
    let sum = 0;
    let acceptAllStat = false;
    if (type === "STR" || type === "DEX" || type === "INT" || type === "LUK") {
      acceptAllStat = true;
    }

    if (
      line1.type === "BOSS" &&
      line2.type === "BOSS" &&
      line3.type === "BOSS"
    ) {
      return false;
    }

    if (line1.type === type || (line1.type === "AS" && acceptAllStat)) {
      sum = sum + line1.value;
    }
    if (line2.type === type || (line2.type === "AS" && acceptAllStat)) {
      sum = sum + line2.value;
    }
    if (line3.type === type || (line3.type === "AS" && acceptAllStat)) {
      sum = sum + line3.value;
    }

    if (sum >= x) {
      return true;
    }

    return false;
  }

  function addIfMoreThanStat(x1, type1, x2, type2) {
    let rowId = 0;

    lineOptions.forEach((line1, i) => {
      subLineOptions.forEach((line2, j) => {
        subLineOptions.forEach((line3, k) => {
          //First stat check
          if (moreThanStat(x1, type1, line1, line2, line3)) {
            if (
              x2 === "" ||
              type2 === "" ||
              (x2 !== "" &&
                type2 !== "" &&
                moreThanStat(x2, type2, line1, line2, line3))
            ) {
              let redPercentage = line1.red1 * line2.red2 * line3.red3;
              let blackPercentage = line1.black1 * line2.black2 * line3.black3;
              let equalityPercentage = 0;
              let hexaPercentage = hexaCalc(line1.red1, line2.red2, line3.red3);

              if (line2.red1 && line3.red1) {
                equalityPercentage = line1.red1 * line2.red1 * line3.red1;
              }

              addToRows(
                createRow(
                  // curRowId,
                  rowId,
                  line1.stat,
                  line2.stat,
                  line3.stat,
                  redPercentage,
                  blackPercentage,
                  equalityPercentage,
                  hexaPercentage
                )
              );
              rowId += 1;
              // setCurRowId(curRowId + 1);
            }
          }
        });
      });
    });
  }

  useEffect(() => {
    const visited = localStorage["visited"];
    if (visited) {
      setHelpOpen(false);
    } else {
      localStorage["visited"] = true;
      setHelpOpen(true);
    }
  }, []);

  useEffect(() => {
    updateTypeOptionsTwo();
  }, [typeOneInputValue, xOneInputValue]);

  useEffect(() => {
    lineOneInputValue === "" ||
    lineTwoInputValue === "" ||
    lineThreeInputValue === ""
      ? setSecondExpanded(false)
      : setSecondExpanded(true);
  }, [lineOneInputValue, lineTwoInputValue, lineThreeInputValue]);

  useEffect(() => {
    updateCurPercentages(
      lineOneRedPercentage,
      lineTwoRedPercentage,
      lineThreeRedPercentage,
      lineOneBlackPercentage,
      lineTwoBlackPercentage,
      lineThreeBlackPercentage
    );
    updateCurEqualityPercentages(
      lineOneEqualityPercentage,
      lineTwoEqualityPercentage,
      lineThreeEqualityPercentage
    );
    updateCurHexaPercentages(
      lineOneHexaPercentage,
      lineTwoHexaPercentage,
      lineThreeHexaPercentage
    );
  }, [
    lineOneRedPercentage,
    lineTwoRedPercentage,
    lineThreeRedPercentage,
    lineOneBlackPercentage,
    lineTwoBlackPercentage,
    lineThreeBlackPercentage,
    lineOneEqualityPercentage,
    lineTwoEqualityPercentage,
    lineThreeEqualityPercentage,
    lineOneHexaPercentage,
    lineTwoHexaPercentage,
    lineThreeHexaPercentage,
  ]);

  useEffect(() => {
    if (xTwoInputValue > 0 && typeTwoInputValue !== "") {
      setCheckSecondCombination(true);
    } else {
      setCheckSecondCombination(false);
    }
  }, [xTwoInputValue, typeTwoInputValue]);

  return (
    <>
      <Paper
        elevation={2}
        aria-label="Acknowledge"
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "1100px",
          margin: "10px auto",
        }}
      >
        <Container
          className={classes.container}
          style={isMobile ? { flexWrap: "wrap" } : {}}
        >
          <Box
            style={{
              width: "50%",
              padding: "10px",
              flexBasis: "100%",
            }}
          >
            <Autocomplete
              id="grouped-demo"
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                newInputValue === "" ? setExpanded(false) : setExpanded(true);
                setInputValue(newInputValue);
                updateLineOptions(newInputValue);
                clearRows();
              }}
              options={gearOptions.sort(
                (a, b) => -b.type.localeCompare(a.type)
              )}
              groupBy={(option) => option.type}
              getOptionLabel={(option) => option.title}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Gear" variant="outlined" />
              )}
            />
          </Box>
          <Box
            style={{
              width: "50%",
              padding: "10px",
              flexBasis: "100%",
            }}
          >
            {inputValue === "Glove" ? (
              <Grid
                container
                justify="space-around"
                alignContent="space-around"
              >
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    16% Crit -&gt; 1 in 43 Equality
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    24% Crit -&gt; 1 in 1331 Equality
                  </Paper>
                </Grid>
              </Grid>
            ) : inputValue === "Hat" ? (
              <Grid
                container
                justify="space-around"
                alignContent="space-around"
              >
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    At least 3s CDR -&gt; 1 in 45 Equality
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    At least 4s CDR -&gt; 1 in 158 Equality
                  </Paper>
                </Grid>
              </Grid>
            ) : null}
          </Box>
        </Container>
        <Container className={classes.container}>
          {inputValue === "" ? (
            <Box
              style={{
                width: "50%",
                flexBasis: "100%",
              }}
            >
              <Button
                onClick={handleHelpOpen}
                color="primary"
                size="large"
                fullWidth
              >
                <HelpOutline />
              </Button>
              <Dialog
                onClose={handleHelpClose}
                aria-labelledby="simple-dialog-title"
                open={helpOpen}
              >
                <DialogTitle id="simple-dialog-title">Wat Do?</DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    1. <strong>Select</strong> piece of gear that you want to
                    generate lines for in <strong>dropdown</strong>
                  </Typography>
                  <Typography gutterBottom>
                    2. <strong>Enter</strong> the value of the lines
                  </Typography>
                  <Typography gutterBottom>
                    3. <strong>Select</strong> the type of lines
                  </Typography>
                  <Typography gutterBottom>
                    4. You can filter <strong>up to 2 stats</strong> at once.
                    eg. BOSS 60 + ATK 9 outputs line combinations with {">="}{" "}
                    60% BOSS % 9 ATK
                  </Typography>
                </DialogContent>
              </Dialog>
            </Box>
          ) : (
            <Container
              className={classes.container}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Container
                className={classes.container}
                style={isMobile ? { flexWrap: "wrap" } : {}}
              >
                <Box
                  style={{
                    width: "50%",
                    padding: "10px",
                    flexBasis: "100%",
                  }}
                >
                  <Typography align="center">{`I want a combination of`}</Typography>
                  <TextField
                    id="outlined-basic"
                    label="At Least (?) %"
                    variant="outlined"
                    type="number"
                    style={{ marginBottom: "10px" }}
                    onChange={(e) => {
                      setXOneInputValue(safeParseInt(e.target.value));
                      clearRows();
                    }}
                    fullWidth
                  />
                  <Autocomplete
                    id="Line"
                    inputValue={typeOneInputValue}
                    onInputChange={(event, newInputValue) => {
                      setTypeOneInputValue(newInputValue);
                      clearRows();
                    }}
                    options={typeOptions}
                    getOptionLabel={(option) => option.type}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Desired Line Type"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
                <Box
                  style={{
                    width: "50%",
                    padding: "10px",
                    flexBasis: "100%",
                  }}
                >
                  {xOneInputValue === 0 || typeOneInputValue === "" ? null : (
                    <>
                      <Typography align="center">{`as well as (leave blank if not required)`}</Typography>
                      <TextField
                        id="outlined-basic"
                        label="At Least (?) %"
                        variant="outlined"
                        type="number"
                        onChange={(e) => {
                          setXTwoInputValue(safeParseInt(e.target.value));
                          clearRows();
                        }}
                        style={{ marginBottom: "10px" }}
                        fullWidth
                      />
                      <Autocomplete
                        id="Line"
                        inputValue={typeTwoInputValue}
                        onInputChange={(event, newInputValue) => {
                          setTypeTwoInputValue(newInputValue);
                          clearRows();
                        }}
                        options={typeOptionsTwo}
                        getOptionLabel={(option) => option.type}
                        fullWidth
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Desired Line Type 2"
                            variant="outlined"
                          />
                        )}
                      />
                    </>
                  )}
                </Box>
              </Container>
              <Box
                style={{
                  width: "100%",
                  padding: "0 10px 10px 10px",
                  boxSizing: "border-box",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={() => {
                    clearRows();
                    addIfMoreThanStat(
                      xOneInputValue,
                      typeOneInputValue,
                      xTwoInputValue,
                      typeTwoInputValue
                    );
                    calcAllCubeProbabilities(
                      xOneInputValue,
                      typeOneInputValue,
                      xTwoInputValue,
                      typeTwoInputValue
                    );
                  }}
                >
                  Calculate
                </Button>
              </Box>
            </Container>
          )}
        </Container>
      </Paper>
      {/* </AccordionSummary>
      </Accordion> */}

      <Paper elevation={2} className="container">
        <TableContainer component={Paper}>
          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <Grid style={{ border: "1px solid black", overflowX: "auto" }}>
              <div style={{ minWidth: "600px" }}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Cube Type</TableCell>
                      <TableCell align="center">
                        <div>Probability&nbsp;(%)</div>
                        <div>
                          <span
                            style={{ color: "magenta", fontWeight: "bold" }}
                          >
                            (Updated)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div>Probability&nbsp;(1&nbsp;in&nbsp;x)</div>
                        <div>
                          <span
                            style={{ color: "magenta", fontWeight: "bold" }}
                          >
                            (Updated)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div>Probability&nbsp;(1&nbsp;in&nbsp;x)</div>
                        <div>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            (Old)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div>Probability&nbsp;(%){"\n"}</div>
                        <div>
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            (Old)
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span>Red Cube</span>
                          <img height="25px" src={redCubeIcon} />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {(redProbability * 100).toPrecision(5)}&nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {redCubeNumber !== 0 ? (
                          <b>{redCubeNumber.toLocaleString()}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${Math.round(
                        1 / getTotalRedPercentages()
                      ).toLocaleString()} red cubes`}</TableCell>
                      <TableCell align="center">{`${
                        getTotalRedPercentages() * 100
                      } %`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span>Black&nbsp;Cube</span>
                          <img height="25px" src={blackCubeIcon} />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {(blackProbability * 100).toPrecision(5)}&nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {blackCubeNumber !== 0 ? (
                          <b>{blackCubeNumber.toLocaleString()}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${Math.round(
                        1 / getTotalBlackPercentages()
                      ).toLocaleString()} black cubes`}</TableCell>
                      <TableCell align="center">{`${
                        getTotalBlackPercentages() * 100
                      } %`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span>Equality&nbsp;Cube</span>
                          <img height="25px" src={equalityCubeIcon} />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {(equalityProbability * 100).toPrecision(5)}&nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {equalityCubeNumber !== 0 ? (
                          <b>{equalityCubeNumber.toLocaleString()}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${Math.round(
                        1 / getTotalEqualityPercentages()
                      ).toLocaleString()} equality cubes`}</TableCell>
                      <TableCell align="center">{`${
                        getTotalEqualityPercentages() * 100
                      } %`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span>Hexa Cube</span>
                          <img height="25px" src={hexaCubeIcon} />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {(hexaProbability * 100).toPrecision(5)}&nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {hexaCubeNumber !== 0 ? (
                          <b>{hexaCubeNumber.toLocaleString()}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${Math.round(
                        1 / getTotalHexaPercentages()
                      ).toLocaleString()} hexa cubes`}</TableCell>
                      <TableCell align="center">{`${
                        getTotalHexaPercentages() * 100
                      } %`}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            style={{
              marginTop: "20px",
              marginLeft: isMobile ? "10px" : "0",
              marginRight: isMobile ? "10px" : "0",
            }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <div style={{ minWidth: "1000px" }}>
                <Table className={classes.table} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={3}>
                        Lines
                      </TableCell>
                      <TableCell align="center" colSpan={4}>
                        Percentages{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          (old)
                        </span>
                      </TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Line 1</TableCell>
                      <TableCell align="center">Line 2</TableCell>
                      <TableCell align="center">Line 3</TableCell>
                      <TableCell align="center">
                        <Grid container direction="column" alignItems="center">
                          <Grid item>
                            <img src={redCubeIcon} alt="Red Cube" />
                          </Grid>
                          <Grid item>&nbsp;Red (%)</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="center">
                        <Grid container direction="column" alignItems="center">
                          <Grid item>
                            <img src={blackCubeIcon} alt="Black Cube" />
                          </Grid>
                          <Grid item>Black (%)</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="center">
                        <Grid container direction="column" alignItems="center">
                          <Grid item>
                            <img src={equalityCubeIcon} alt="Equality Cube" />
                          </Grid>
                          <Grid item>Equality&nbsp;(%)</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="center">
                        <Grid container direction="column" alignItems="center">
                          <Grid item>
                            <img src={hexaCubeIcon} alt="Hexa Cube" />
                          </Grid>
                          <Grid item>Hexa (%)</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="center">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{row.line1}</TableCell>
                        <TableCell align="center">{row.line2}</TableCell>
                        <TableCell align="center">{row.line3}</TableCell>
                        <TableCell align="center">{`${
                          row.red * 100
                        }%`}</TableCell>
                        <TableCell align="center">{`${
                          row.black * 100
                        }%`}</TableCell>
                        <TableCell align="center">{`${
                          row.equality * 100
                        }%`}</TableCell>
                        <TableCell align="center">{`${
                          row.hexa * 100
                        }%`}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            className={classes.button}
                            onClick={() => {
                              handleRemoveItem(row.id);
                            }}
                            color="primary"
                            aria-label="Remove Item"
                          >
                            <Clear />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
        </TableContainer>
      </Paper>
      <Paper>
        <Typography align="left" className={classes.textBuffer}>
          1. All equality cube lines shown here assume that they have the same
          rate as rolling the first prime line of a red cube.
        </Typography>
        <Typography align="left" className={classes.textBuffer}>
          2. Hexacube lines assume that the first line is the first line of a
          red cube, line 2/4 is a second line, and lines 3/5/6 are third lines.
        </Typography>
        <Typography align="left" className={classes.textBuffer}>
          3. Hexacube numbers might are slightly over estimate since it does not
          account for combinations without the first line.
        </Typography>
        <WhiteTextTypography color="textPrimary">
          This coding project is a prime example of why you need UI/UX designers
          and why I do backend
        </WhiteTextTypography>
        <Typography>
          Contact pladz#1984 on discord for bugs, or Note Pladz in-game MapleSEA
        </Typography>
        <Typography>
          <a href="http://tiny.cc/finalfinaldamage" rel="noreferrer">
            IED Calculation aka "Final Final Damage" Doc
          </a>
        </Typography>
        <Typography>
          <a
            href="https://github.com/pladz/cube_calc/tree/master"
            rel="noreferrer"
          >
            Very scuffed source code
          </a>
        </Typography>
        <Typography>
          Updated to newest KMS cube rates as of 4 December 2022
        </Typography>
        <Typography>
          NaN input bug fixed by https://github.com/hehai123/cube_calc
        </Typography>
      </Paper>
    </>
  );
}
