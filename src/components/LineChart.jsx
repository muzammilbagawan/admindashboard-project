import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const LineChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/api/linechartdata');
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                const formattedData = [{
                    id: 'total_cost',
                    data: data.map(item => ({
                        x: item.year,
                        y: item.total_cost,
                    })),
                }];
                setChartData(formattedData);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching chart data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 2000 }} 
            curve="catmullRom"
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Year',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Total Cost',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            theme={{
                axis: {
                    ticks: {
                        text: {
                            fill: theme.palette.text.primary, 
                            fontSize: 14, 
                            fontWeight: 'bold', 
                        },
                    },
                    legend: {
                        text: {
                            fill: theme.palette.text.primary, 
                            fontSize: 16, 
                            fontWeight: 'bold',
                        },
                    },
                },
            }}
            colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableGridX={false}
            enableGridY={false}
            useMesh={true} 
            tooltip={({ point }) => (
                <div
                    style={{
                        background: 'white',
                        padding: '5px 10px',
                        border: '1px solid #ccc',
                        color: 'black', 
                        borderRadius: '5px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.1)', 
                    }}
                >
                    <strong>Year {point.data.xFormatted}: </strong>
                    ${point.data.yFormatted} Total Cost
                </div>
            )}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 100, 
                    itemHeight: 20,
                    itemOpacity: 1, 
                    symbolSize: 14, 
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    textStyle: {
                        fill: theme.palette.text.primary,
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: theme.palette.text.secondary, 
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default LineChart;

