import React, { useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveFunnel } from '@nivo/funnel'
import {
    Box,
    Container,
    Grid,
    Button,
    Typography,
} from "@mui/material";

export default function PercentageGraphs() {

    const [innerRadius, setInnerRadius] = React.useState("");
    const [toggle, setToggle] = React.useState(false);

    const useStyles = makeStyles((theme) => ({
        alignItemsAndJustifyContent: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        container1: {
            padding: theme.spacing(2),
            alignItems: "center",
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

    const classes = useStyles();
    const margin = { top: 30, right: 200, bottom: 30, left: 30 };

    const styles = {
        root: {
            fontFamily: "consolas, sans-serif",
            textAlign: "center",
            position: "relative",
            width: 600,
            height: 600
        },
        overlay: {
            position: "absolute",
            top: 0,
            right: margin.right,
            bottom: 0,
            left: margin.left,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 96,
            color: "#FFFFFF",
            // background: "#FFFFFF33",
            textAlign: "center",
            // This is important to preserve the chart interactivity
            pointerEvents: "none"
        },
        totalLabel: {
            fontSize: 24
        }
    };

    const data = [
        {
            id: "Work",
            label: "Work",
            value: 120
        },
        {
            id: "Eat",
            label: "Eat",
            value: 35
        },
        {
            id: "Commute",
            label: "Commute",
            value: 33
        },
        {
            id: "Watch TV",
            label: "Watch TV",
            value: 27
        },
        {
            id: "Sleep",
            label: "Sleep",
            value: 199
        }
    ];

    const theme = {
        background: "#ffffff",
        axis: {
            fontSize: "14px",
            tickColor: "#eee",
            ticks: {
                line: {
                    stroke: "#555555"
                },
                text: {
                    fill: "#ffffff"
                }
            },
            legend: {
                text: {
                    fill: "#aaaaaa"
                }
            }
        },
        grid: {
            line: {
                stroke: "#555555"
            }
        }
    };

    const legends = [
        {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            itemTextColor: "#ffffff",
            symbolSize: 20,
            effects: [
                {
                    on: "hover",
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ];

    return (
        <div>
            <Box><Typography>{`The graphs dont actually do anything just turn back now`}</Typography></Box>
            <Box className={classes.alignItemsAndJustifyContent}>
                <Container maxWidth='lg'>
                    <Grid container spacing={3} className={classes.container1}>
                        <Grid item xs={9}>
                            <Box sx={{ height: 500 }}>
                                {toggle ?
                                    <ResponsivePie
                                        margin={margin}
                                        data={data}
                                        innerRadius={innerRadius}
                                        padAngle={0.7}
                                        cornerRadius={3}
                                        activeOuterRadiusOffset={10}
                                        borderWidth={1}
                                        enableRadialLabels={false}
                                        enableSlicesLabels={false}
                                        theme={theme}
                                        legends={legends}
                                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                        arcLinkLabelsSkipAngle={10}
                                        arcLinkLabelsTextColor="#333333"
                                        arcLinkLabelsThickness={2}
                                        arcLinkLabelsColor={{ from: 'color' }}
                                        arcLabelsSkipAngle={10}
                                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                                    />
                                    :
                                    <ResponsiveFunnel
                                        data={data}
                                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                        shapeBlending={1}
                                        valueFormat=">-.4s"
                                        colors={{ scheme: 'spectral' }}
                                        borderWidth={20}
                                        labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
                                        beforeSeparatorLength={100}
                                        beforeSeparatorOffset={20}
                                        afterSeparatorLength={100}
                                        afterSeparatorOffset={20}
                                        currentPartSizeExtension={10}
                                        currentBorderWidth={40}
                                        motionConfig="wobbly"
                                    />
                                }


                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ height: 500 }}>
                                <Button onClick={(e) => { setToggle(!toggle) }}>BUTTOn</Button>

                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}