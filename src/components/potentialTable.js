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
  LineStyle,
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
const DECIMAL_PRECISION = 6; // for % display
const CUBE_DECIMAL = 2; // for one in x cubes display
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

  const [legendLineOp, setLegendLineOp] = useState([]);
  const [uniqueLineOp, setUniqueLineOp] = useState([]);
  const [acceptAS1, setAcceptAS1] = useState(false);
  const [acceptAS2, setAcceptAS2] = useState(false);

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

  // Final probability calculated by hehai
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

    switch (title) {
      case "Hat":
        curLines = hatLines;
        curSubLines = hatSubLines;
        break;
      case "Top":
        curLines = topLines;
        curSubLines = topSubLines;
        break;
      case "Bottom":
        curLines = bottomLines;
        curSubLines = bottomShoeSubLines;
        break;
      case "Overall":
        curLines = topLines;
        curSubLines = topSubLines;
        break;
      case "Shoe":
        curLines = shoeLines;
        curSubLines = bottomShoeSubLines;
        break;
      case "Glove":
        curLines = gloveLines;
        curSubLines = gloveSubLines;
        break;
      case "Cape":
      case "Shoulder":
      case "Belt":
        curLines = capeShoulderBeltLines;
        curSubLines = capeShoulderBeltSubLines;
        break;
      case "Ring":
      case "Earring":
      case "Pendant":
      case "Face":
      case "Eye":
        curLines = accessoryLines;
        curSubLines = accessorySubLines;
        break;
      case "Heart":
        curLines = heartLines;
        curSubLines = accessorySubLines;
        // curSubLines = heartSubLines;
        break;
      case "Weapon":
        curLines = weaponLines;
        curSubLines = weaponSubLines;
        break;
      case "Secondary":
        curLines = secondaryLines;
        curSubLines = secondarySubLines;
        break;
      case "Emblem":
        curLines = emblemLines;
        curSubLines = emblemSubLines;
        break;
      default:
        curLines = hatLines;
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
  // For one in x cubes formatting
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  const lineWeightSum = (line) => {
    return line.reduce((total, item) => total + item.weight, 0);
  };

  const usefulLineWeightSum = (line, filteredArray) => {
    return line.reduce((accumulator, line) => {
      if (!checkSecondCriterion) {
        if (
          line.type === typeOneInputValue ||
          (line.type === "AS" && acceptAS1) ||
          filteredArray.includes(line.type)
        ) {
          return accumulator + line.weight;
        }
      } else if (checkSecondCriterion) {
        if (
          line.type === typeOneInputValue ||
          line.type === typeTwoInputValue ||
          (line.type === "AS" && (acceptAS1 || acceptAS2)) ||
          filteredArray.includes(line.type)
        ) {
          return accumulator + line.weight;
        }
      }
      return accumulator;
    }, 0);
  };

  const lineCounter = (array, type) => {
    return array.reduce((accumulator, line) => {
      if (line === type) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
  };

  const potentialLineFormat = (array, cubeType, lineNumber) => {
    const tempLines = [];
    const tempLines2 = [];
    const mappedLines = [];
    const red2 = 10; // 1 in 10 chance of being a legendary line for red cube 2nd line
    const red3 = 100; // 1 in 100 chance of being a legendary line for red cube 3rd line
    const black2 = 5;
    const black3 = 20;
    const specialLines = [
      "DR",
      "IED",
      "BOSS",
      "Decent Skill",
      "Invincibility Time",
      "Chance to Ignore DMG",
      "Chance of being invincibile",
    ];
    const specialLinesFiltered = [
      "DR",
      "IED",
      "BOSS",
      "Decent Skill",
      "Invincibility Time",
      "Chance to Ignore DMG",
      "Chance of being invincibile",
    ];
    const specialLinesToRemove = [];

    const dRCount = lineCounter(array, "DR");
    const iedCount = lineCounter(array, "IED");
    const bossCount = lineCounter(array, "BOSS");
    const decentCount = lineCounter(array, "Decent Skill");
    const invincibilityCount = lineCounter(array, "Invincibility Time");
    const ignoreCount = lineCounter(array, "Chance to Ignore DMG");
    const invincibileCount = lineCounter(array, "Chance of being invincibile");

    if (decentCount === 1) {
      specialLinesFiltered.splice(
        specialLinesFiltered.indexOf("Decent Skill"),
        1
      );
      specialLinesToRemove.push("Decent Skill");
    }
    if (dRCount === 2) {
      specialLinesFiltered.splice(specialLinesFiltered.indexOf("DR"), 1);
      specialLinesToRemove.push("DR");
    }
    if (iedCount === 2) {
      specialLinesFiltered.splice(specialLinesFiltered.indexOf("IED"), 1);
      specialLinesToRemove.push("IED");
    }
    if (bossCount === 2) {
      specialLinesFiltered.splice(specialLinesFiltered.indexOf("BOSS"), 1);
      specialLinesToRemove.push("BOSS");
    }
    if (invincibilityCount === 1) {
      specialLinesFiltered.splice(
        specialLinesFiltered.indexOf("Invincibility Time"),
        1
      );
      specialLinesToRemove.push("Invincibility Time");
    }
    if (ignoreCount === 2) {
      specialLinesFiltered.splice(
        specialLinesFiltered.indexOf("Chance to Ignore DMG"),
        1
      );
      specialLinesToRemove.push("Chance to Ignore DMG");
    }
    if (invincibileCount === 2) {
      specialLinesFiltered.splice(
        specialLinesFiltered.indexOf("Chance of being invincibile"),
        1
      );
      specialLinesToRemove.push("Chance of being invincibile");
    }

    // Remove line options if option limit is reached
    legendLineOp.forEach((line) => {
      if (specialLinesToRemove.includes(line.type)) {
        return;
      }
      tempLines.push({ ...line });
    });

    if (lineNumber === 2 || lineNumber === 3) {
      uniqueLineOp.forEach((line) => {
        if (specialLinesToRemove.includes(line.type)) {
          return;
        }
        tempLines2.push({ ...line });
      });
    }

    const totalWeights = lineWeightSum(tempLines);
    const usefulWeight = usefulLineWeightSum(tempLines, specialLinesFiltered);
    const totalWeights2 = lineWeightSum(tempLines2);
    const usefulWeight2 = usefulLineWeightSum(tempLines2, specialLinesFiltered);

    // Make a list of useful lines to check for
    // Example: str, dex, int, luk, hp, mp, def becomes only str and junk if filtered for str
    // Legend line options
    tempLines.forEach((line) => {
      if (
        (!checkSecondCriterion &&
          (line.type === typeOneInputValue ||
            (line.type === "AS" && acceptAS1) ||
            specialLines.includes(line.type))) ||
        (checkSecondCriterion &&
          (line.type === typeOneInputValue ||
            line.type === typeTwoInputValue ||
            (line.type === "AS" && (acceptAS1 || acceptAS2)) ||
            specialLines.includes(line.type)))
      ) {
        if (lineNumber === 1) {
          mappedLines.push({ ...line, totalWeight: totalWeights });
        } else if (lineNumber === 2) {
          if (cubeType === "Red") {
            mappedLines.push({ ...line, totalWeight: totalWeights * red2 });
          } else if (cubeType === "Black") {
            mappedLines.push({ ...line, totalWeight: totalWeights * black2 });
          }
        } else if (lineNumber === 3) {
          if (cubeType === "Red") {
            mappedLines.push({ ...line, totalWeight: totalWeights * red3 });
          } else if (cubeType === "Black") {
            mappedLines.push({ ...line, totalWeight: totalWeights * black3 });
          }
        }
      }
    });

    // Unique line options
    if (lineNumber !== 1) {
      tempLines2.forEach((line) => {
        if (!checkSecondCriterion) {
          if (
            line.type === typeOneInputValue ||
            (line.type === "AS" && acceptAS1) ||
            specialLines.includes(line.type)
          ) {
            if (lineNumber === 2) {
              if (cubeType === "Red") {
                mappedLines.push({
                  ...line,
                  weight: line.weight * (red2 - 1),
                  totalWeight: totalWeights2 * red2,
                });
              } else if (cubeType === "Black") {
                mappedLines.push({
                  ...line,
                  weight: line.weight * (black2 - 1),
                  totalWeight: totalWeights2 * black2,
                });
              }
            } else if (lineNumber === 3) {
              if (cubeType === "Red") {
                mappedLines.push({
                  ...line,
                  weight: line.weight * (red3 - 1),
                  totalWeight: totalWeights2 * red3,
                });
              } else if (cubeType === "Black") {
                mappedLines.push({
                  ...line,
                  weight: line.weight * (black3 - 1),
                  totalWeight: totalWeights2 * black3,
                });
              }
            }
          } else if (checkSecondCriterion) {
            if (
              line.type === typeOneInputValue ||
              line.type === typeTwoInputValue ||
              (line.type === "AS" && (acceptAS1 || acceptAS2)) ||
              specialLines.includes(line.type)
            ) {
              if (lineNumber === 2) {
                if (cubeType === "Red") {
                  mappedLines.push({
                    ...line,
                    weight: line.weight * (red2 - 1),
                    totalWeight: totalWeights2 * red2,
                  });
                } else if (cubeType === "Black") {
                  mappedLines.push({
                    ...line,
                    weight: line.weight * (black2 - 1),
                    totalWeight: totalWeights2 * black2,
                  });
                }
              } else if (lineNumber === 3) {
                if (cubeType === "Red") {
                  mappedLines.push({
                    ...line,
                    weight: line.weight * (red3 - 1),
                    totalWeight: totalWeights2 * red3,
                  });
                } else if (cubeType === "Black") {
                  mappedLines.push({
                    ...line,
                    weight: line.weight * (black3 - 1),
                    totalWeight: totalWeights2 * black3,
                  });
                }
              }
            }
          }
        }
      });
    }

    let junkWeight = 0;
    let junkTotalWeight = 0;

    if (lineNumber === 1) {
      junkWeight = totalWeights - usefulWeight;
      junkTotalWeight = totalWeights;
    } else if (lineNumber === 2 || lineNumber === 3) {
      let multiplier;
      if (cubeType === "Red") {
        if (lineNumber === 2) {
          multiplier = red2;
        } else multiplier = red3;
      } else if (cubeType === "Black") {
        if (lineNumber === 2) {
          multiplier = black2;
        } else multiplier = black3;
      }

      junkWeight =
        (totalWeights - usefulWeight) * (totalWeights2 * multiplier) +
        (totalWeights2 - usefulWeight2) *
          (multiplier - 1) *
          (totalWeights * multiplier);
      junkTotalWeight = totalWeights * totalWeights2 * multiplier ** 2;
    }

    mappedLines.push({
      // stat: "0",
      // value: 0,
      type: "Junk",
      weight: junkWeight,
      totalWeight: junkTotalWeight,
    });

    return mappedLines;
  };

  const cubeProbabiltyCalc = (line1, line2, line3) => {
    let sumOne = 0;
    let sumTwo = 0;

    const probability =
      (line1.weight * line2.weight * line3.weight) /
      (line1.totalWeight * line2.totalWeight * line3.totalWeight);

    const lines = [line1, line2, line3];

    for (const line of lines) {
      if (
        line.type === typeOneInputValue ||
        (line.type === "AS" && acceptAS1)
      ) {
        sumOne += line.value;
      }
      if (
        checkSecondCriterion &&
        (line.type === typeTwoInputValue || (line.type === "AS" && acceptAS2))
      ) {
        sumTwo += line.value;
      }
    }

    if (checkSecondCriterion) {
      if (sumOne >= xOneInputValue && sumTwo >= xTwoInputValue) {
        return probability;
      }
    } else if (sumOne >= xOneInputValue) {
      return probability;
    }

    return 0;
  };

  const hexaFirst3LinesCalc = (l1, l2, l3, dictionary) => {
    let sum = 0;
    let sum2 = 0;
    let probability = 1;
    let lines = [];
    const specialLines = [
      "DR",
      "IED",
      "BOSS",
      "Decent Skill",
      "Invincibility Time",
      "Chance to Ignore DMG",
      "Chance of being invincibile",
    ];

    for (let i = 1; i <= 3; i++) {
      const currentLine = eval(`l${i}`);
      // if (!currentLine) continue;

      probability *= currentLine.weight / currentLine.totalWeight;
      if (
        currentLine.type === typeOneInputValue ||
        (currentLine.type === "AS" && acceptAS1) ||
        (checkSecondCriterion &&
          (currentLine.type === typeTwoInputValue ||
            (currentLine.type === "AS" && acceptAS2))) ||
        specialLines.includes(currentLine.type)
      ) {
        lines.push({ value: currentLine.value, type: currentLine.type });
      }
    }

    lineSorter(lines);

    let linesSelected = 0;
    let selectableLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (linesSelected >= 3 || sum >= xOneInputValue) {
        selectableLines.push(i);
        continue;
      }

      const line = lines[i];
      if (
        line.type === typeOneInputValue ||
        (line.type === "AS" && acceptAS1)
      ) {
        sum += line.value;
        linesSelected += 1;
        if (
          line.type === typeTwoInputValue ||
          (line.type === "AS" && acceptAS2)
        ) {
          sum2 += line.value;
        }
      } else {
        selectableLines.push(i);
      }
    }

    if (!checkSecondCriterion) {
      if (linesSelected <= 3 && sum >= xOneInputValue) {
        return probability;
      }
    } else {
      if (linesSelected === 3) {
        if (sum >= xOneInputValue && sum2 >= xTwoInputValue) {
          return probability;
        }
      } else {
        for (const index of selectableLines) {
          const line = lines[index];

          if (
            line.type === typeTwoInputValue ||
            (line.type === "AS" && acceptAS2)
          ) {
            sum2 += line.value;
            linesSelected += 1;
            if (
              line.type === typeOneInputValue ||
              (line.type === "AS" && acceptAS1)
            ) {
              sum += line.value;
            }
          }

          if (linesSelected >= 3) break;
        }

        if (sum >= xOneInputValue && sum2 >= xTwoInputValue) {
          return probability;
        }
      }
    }

    let keyArray = [];
    for (const line of lines) {
      keyArray.push(line.value.toString() + " " + line.type);
    }

    keySorter(keyArray);
    let key = keyArray.join(", ");
    if (key in dictionary) {
      dictionary[key] += probability;
    } else {
      dictionary[key] = probability;
    }

    return 0;
  };

  const hexaSingleLineCalc = (line, currentLines) => {
    let sum = 0;
    let sum2 = 0;
    const addedLine = [];
    let criteriaMet = false;

    if (
      line.type === typeOneInputValue ||
      (line.type === "AS" && acceptAS1) ||
      (checkSecondCriterion &&
        (line.type === typeTwoInputValue || (line.type === "AS" && acceptAS2)))
    ) {
      currentLines.push({ value: line.value, type: line.type });
      addedLine.push({ value: line.value, type: line.type });
    }

    lineSorter(currentLines);

    let linesSelected = 0;
    let selectableLines = [];
    for (let i = 0; i < currentLines.length; i++) {
      if (linesSelected >= 3 || sum >= xOneInputValue) {
        selectableLines.push(i);
        continue;
      }

      const line = currentLines[i];
      if (
        line.type === typeOneInputValue ||
        (line.type === "AS" && acceptAS1)
      ) {
        sum += line.value;
        linesSelected += 1;
        if (
          line.type === typeTwoInputValue ||
          (line.type === "AS" && acceptAS2)
        ) {
          sum2 += line.value;
        }
      } else {
        selectableLines.push(i);
      }
    }

    if (!checkSecondCriterion) {
      if (linesSelected <= 3 && sum >= xOneInputValue) {
        criteriaMet = true;
      }
    } else {
      if (linesSelected === 3) {
        if (sum >= xOneInputValue && sum2 >= xTwoInputValue) {
          criteriaMet = true;
        }
      } else {
        for (const index of selectableLines) {
          const line = currentLines[index];

          if (
            line.type === typeTwoInputValue ||
            (line.type === "AS" && acceptAS2)
          ) {
            sum2 += line.value;
            linesSelected += 1;
            if (
              line.type === typeOneInputValue ||
              (line.type === "AS" && acceptAS1)
            ) {
              sum += line.value;
            }
          }

          if (linesSelected >= 3) break;
        }

        if (sum >= xOneInputValue && sum2 >= xTwoInputValue) {
          criteriaMet = true;
        }
      }
    }

    if (criteriaMet && addedLine.length > 0) {
      const index = currentLines.findIndex(
        (line) =>
          line.value === addedLine[0].value && line.type === addedLine[0].type
      );
      currentLines.splice(index, 1);
    }

    return { criteriaMet, addedLine };
  };

  const newHexaAndRedCalc = () => {
    let totalProbability = 0;
    let redProbability = 0;
    let currentLines = [];
    const data = {};

    const line1 = potentialLineFormat(currentLines, "Red", 1);

    for (const l1 of line1) {
      const addedLine1 = l1.type;
      currentLines.push(addedLine1);
      const line2 = potentialLineFormat(currentLines, "Red", 2);

      for (const l2 of line2) {
        const addedLine2 = l2.type;
        currentLines.push(addedLine2);
        const line3 = potentialLineFormat(currentLines, "Red", 3);

        for (const l3 of line3) {
          totalProbability += hexaFirst3LinesCalc(l1, l2, l3, data);
        }
        currentLines.splice(currentLines.indexOf(addedLine2), 1);
      }
      currentLines.splice(currentLines.indexOf(addedLine1), 1);
    }

    redProbability = totalProbability;

    for (const [key, value] of Object.entries(data)) {
      const lineComponents = key.split(", ");
      let lines = lineComponents.map((component) => {
        let [value, ...typeParts] = component.split(" ");
        let type = typeParts.join(" ").trim();
        return { value: parseInt(value), type: type };
      });

      for (const line of lines) {
        currentLines.push(line.type);
      }

      const line4 = potentialLineFormat(currentLines, "Red", 2);

      for (const l4 of line4) {
        const result4 = hexaSingleLineCalc(l4, lines);
        if (result4.criteriaMet) {
          totalProbability += (value * l4.weight) / l4.totalWeight;
          continue;
        }
        const addedLine4 = l4.type;
        currentLines.push(addedLine4);
        const line5 = potentialLineFormat(currentLines, "Red", 3);

        for (const l5 of line5) {
          const result5 = hexaSingleLineCalc(l5, lines);
          if (result5.criteriaMet) {
            totalProbability +=
              (value * l5.weight * l4.weight) /
              (l4.totalWeight * l5.totalWeight);
            continue;
          }

          const addedLine5 = l5.type;
          currentLines.push(addedLine5);
          const line6 = potentialLineFormat(currentLines, "Red", 3);

          for (const l6 of line6) {
            const result6 = hexaSingleLineCalc(l6, lines);
            if (result6.criteriaMet) {
              totalProbability +=
                (value * l5.weight * l6.weight * l4.weight) /
                (l5.totalWeight * l6.totalWeight * l4.totalWeight);
            } else if (result6.addedLine.length > 0) {
              const addedLine = result6.addedLine[0];
              const index = lines.findIndex(
                (line) =>
                  line.value === addedLine.value && line.type === addedLine.type
              );
              lines.splice(index, 1);
            }
          }

          if (result5.addedLine.length > 0) {
            const addedLine = result5.addedLine[0];
            const index = lines.findIndex(
              (line) =>
                line.value === addedLine.value && line.type === addedLine.type
            );
            lines.splice(index, 1);
          }
          currentLines.splice(currentLines.indexOf(addedLine5), 1);
        }

        if (result4.addedLine.length > 0) {
          const addedLine = result4.addedLine[0];
          const index = lines.findIndex(
            (line) =>
              line.value === addedLine.value && line.type === addedLine.type
          );
          lines.splice(index, 1);
        }
        currentLines.splice(currentLines.indexOf(addedLine4), 1);
      }
      currentLines = [];
    }

    setRedProbability(redProbability);
    setRedCubeNumber((1 / redProbability).toFixed(CUBE_DECIMAL));
    setHexaProbability(totalProbability);
    setHexaCubeNumber((1 / totalProbability).toFixed(CUBE_DECIMAL));
  };

  const newEqualityCalc = () => {
    let totalProbability = 0;
    const currentLines = [];
    const line1 = potentialLineFormat(currentLines, "Black", 1);

    for (const l1 of line1) {
      const addedLine1 = l1.type;
      currentLines.push(addedLine1);

      const line2 = potentialLineFormat(currentLines, "Black", 1);
      for (const l2 of line2) {
        const addedLine2 = l2.type;
        currentLines.push(addedLine2);
        const line3 = potentialLineFormat(currentLines, "Black", 1);
        for (const l3 of line3) {
          totalProbability += cubeProbabiltyCalc(l1, l2, l3);
        }
        currentLines.splice(currentLines.indexOf(addedLine2), 1);
      }
      currentLines.splice(currentLines.indexOf(addedLine1), 1);
    }

    setEqualityProbability(totalProbability);
    setEqualityCubeNumber((1 / totalProbability).toFixed(CUBE_DECIMAL));
  };

  const newBlackCalc = () => {
    let totalProbability = 0;
    const currentLines = [];
    const line1 = potentialLineFormat(currentLines, "Black", 1);

    for (const l1 of line1) {
      const addedLine1 = l1.type;
      currentLines.push(addedLine1);

      const line2 = potentialLineFormat(currentLines, "Black", 2);
      for (const l2 of line2) {
        const addedLine2 = l2.type;
        currentLines.push(addedLine2);
        const line3 = potentialLineFormat(currentLines, "Black", 3);
        for (const l3 of line3) {
          totalProbability += cubeProbabiltyCalc(l1, l2, l3);
        }
        currentLines.splice(currentLines.indexOf(addedLine2), 1);
      }
      currentLines.splice(currentLines.indexOf(addedLine1), 1);
    }

    setBlackProbability(totalProbability);
    setBlackCubeNumber((1 / totalProbability).toFixed(CUBE_DECIMAL));
  };

  const newProbCalc = () => {
    newHexaAndRedCalc();
    newEqualityCalc();
    newBlackCalc();
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
    if (
      typeOneInputValue === "STR" ||
      typeOneInputValue === "DEX" ||
      typeOneInputValue === "INT" ||
      typeOneInputValue === "LUK"
    ) {
      setAcceptAS1(true);
    } else {
      setAcceptAS1(false);
    }
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
      if (
        typeTwoInputValue === "STR" ||
        typeTwoInputValue === "DEX" ||
        typeTwoInputValue === "INT" ||
        typeTwoInputValue === "LUK"
      ) {
        setAcceptAS2(true);
      } else {
        setAcceptAS2(false);
      }
    } else {
      setCheckSecondCombination(false);
    }
  }, [xTwoInputValue, typeTwoInputValue]);

  useEffect(() => {
    let legendLines = [];
    let uniqueLines = [];
    switch (inputValue) {
      case "Hat":
        legendLines = legendHatLines;
        uniqueLines = uniqueHatLines;
        break;
      case "Top":
      case "Overall":
        legendLines = legendTopLines;
        uniqueLines = uniqueTopLines;
        break;
      case "Bottom":
        legendLines = legendBottomLines;
        uniqueLines = uniquebottomShoeLines;
        break;
      case "Shoe":
        legendLines = legendShoeLines;
        uniqueLines = uniquebottomShoeLines;
        break;
      case "Glove":
        legendLines = legendGloveLines;
        uniqueLines = uniqueGloveLines;
        break;
      case "Cape":
      case "Shoulder":
      case "Belt":
        legendLines = legendCapeShoulderBeltLines;
        uniqueLines = uniqueCapeShoulderBeltLines;
        break;
      case "Ring":
      case "Earring":
      case "Pendant":
      case "Face":
      case "Eye":
        legendLines = legendAccessoryLines;
        uniqueLines = uniqueAccessoryLines;
        break;
      case "Heart":
        legendLines = legendHeartLines;
        uniqueLines = uniqueAccessoryLines;
        break;
      case "Weapon":
        legendLines = legendWeaponLines;
        uniqueLines = uniqueWeaponLines;
        break;
      case "Secondary":
        legendLines = legendSecondaryLines;
        uniqueLines = uniqueSecondaryLines;
        break;
      case "Emblem":
        legendLines = legendEmblemLines;
        uniqueLines = uniqueEmblemLines;
        break;
      default:
        legendLines = legendHatLines;
        uniqueLines = uniqueHatLines;
        break;
    }

    setLegendLineOp(legendLines);
    setUniqueLineOp(uniqueLines);
  }, [inputValue]);

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
                    At least 3s CDR -&gt; 1 in 44 Equality
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    At least 4s CDR -&gt; 1 in 157 Equality
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
                    newProbCalc();
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
                        {(redProbability * 100).toPrecision(DECIMAL_PRECISION)}
                        &nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {redCubeNumber !== 0 ? (
                          <b>{formatNumberWithCommas(redCubeNumber)}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${formatNumberWithCommas(
                        (1 / getTotalRedPercentages()).toFixed(CUBE_DECIMAL)
                      )} red cubes`}</TableCell>
                      <TableCell align="center">{`${(
                        getTotalRedPercentages() * 100
                      ).toPrecision(DECIMAL_PRECISION)} %`}</TableCell>
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
                        {(blackProbability * 100).toPrecision(
                          DECIMAL_PRECISION
                        )}
                        &nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {blackCubeNumber !== 0 ? (
                          <b>{formatNumberWithCommas(blackCubeNumber)}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${formatNumberWithCommas(
                        (1 / getTotalBlackPercentages()).toFixed(CUBE_DECIMAL)
                      )} black cubes`}</TableCell>
                      <TableCell align="center">{`${(
                        getTotalBlackPercentages() * 100
                      ).toPrecision(DECIMAL_PRECISION)} %`}</TableCell>
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
                        {(equalityProbability * 100).toPrecision(
                          DECIMAL_PRECISION
                        )}
                        &nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {equalityCubeNumber !== 0 ? (
                          <b>{formatNumberWithCommas(equalityCubeNumber)}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${formatNumberWithCommas(
                        (1 / getTotalEqualityPercentages()).toFixed(
                          CUBE_DECIMAL
                        )
                      )} equality cubes`}</TableCell>
                      <TableCell align="center">{`${(
                        getTotalEqualityPercentages() * 100
                      ).toPrecision(DECIMAL_PRECISION)} %`}</TableCell>
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
                        {(hexaProbability * 100).toPrecision(DECIMAL_PRECISION)}
                        &nbsp;%
                      </TableCell>
                      <TableCell align="center">
                        One in{" "}
                        {hexaCubeNumber !== 0 ? (
                          <b>{formatNumberWithCommas(hexaCubeNumber)}</b>
                        ) : (
                          "Infinite"
                        )}{" "}
                        cubes
                      </TableCell>
                      <TableCell align="center">{`One in ${formatNumberWithCommas(
                        (1 / getTotalHexaPercentages()).toFixed(CUBE_DECIMAL)
                      )} hexa cubes`}</TableCell>
                      <TableCell align="center">{`${(
                        getTotalHexaPercentages() * 100
                      ).toPrecision(DECIMAL_PRECISION)} %`}</TableCell>
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
