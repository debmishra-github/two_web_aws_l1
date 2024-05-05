import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
} from 'chart.js';

import { useEffect, useState } from "react";
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors,
);

function formatDate(milliseconds: number): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(milliseconds);
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date as "MMM DD, YYYY"
    return `${monthName} ${day},\n${year}`;
}

// Checks if overlap is present b/w groups of datasets (2 or 3)
const NoOverlap = (dataset: { data: GraphDataItem[], num: string }[]): boolean => {

    if (dataset.length == 2) {
        // Arrays are actually reversed so the first element is the endpoint
        const firstSet = dataset[0].data;
        const secondSet = dataset[1].data;

        const x2 = new Date(firstSet[0].Timestamp);
        const x1 = new Date(firstSet[firstSet.length - 1].Timestamp);

        const y2 = new Date(secondSet[0].Timestamp);
        const y1 = new Date(secondSet[secondSet.length - 1].Timestamp);

        // No overlap
        return (x2 < y1 || y2 < x1);
    }
    else {
        return ((NoOverlap(dataset.slice(0, 2)) && NoOverlap([dataset[0], dataset[2]])) ||
            (NoOverlap(dataset.slice(0, 2)) && NoOverlap(dataset.slice(1, 3))) ||
            (NoOverlap(dataset.slice(1, 3)) && NoOverlap([dataset[0], dataset[2]]))
        )
    }

}

interface GraphDataItem {
    Timestamp: string; // Adjust the type according to your data
    [key: string]: any; // Allow dynamic properties 
}


export default function LineGraph(props: { dataset: { data: GraphDataItem[], num: string }[], attribute: string, sensorType: string }) {
    const { dataset, attribute, sensorType } = props;
    const [chartDatasets, setChartDatasets] = useState<any>([]);


    useEffect(() => {
        if (dataset && dataset.length > 0) {
            // console.log(dataset);
            const tempChartData = []

            // Dealing with non overlapping data
            if (dataset.length > 1 && NoOverlap(dataset)) {
                var k;

                const t0 = new Date(dataset[0].data[0].Timestamp);
                const t1 = new Date(dataset[1].data[0].Timestamp);

                if (dataset.length == 2) {
                    k = (t0 > t1) ? 0 : 1;
                }
                else {
                    const t2 = new Date(dataset[2].data[0].Timestamp);

                    const arr = [t0.getTime(), t1.getTime(), t2.getTime()];
                    const maxTime = Math.max(...arr);
                    k = arr.indexOf(maxTime);
                }

                let labelText;

                if (sensorType == "Soil Node") {
                    labelText = "Node " + dataset[k].num
                } else {
                    labelText = attribute
                }

                const set = {
                    data: dataset[k].data,
                    label: labelText,
                    borderWidth: 2,
                    pointRadius: 0,
                }

                tempChartData.push(set)
            }
            else {
                for (let i = 0; i < dataset.length; i++) {
                    let labelText;

                    if (sensorType == "Soil Node") {
                        labelText = "Node " + dataset[i].num
                    } else {
                        labelText = attribute
                    }

                    const set = {
                        data: dataset[i].data,
                        label: labelText,
                        borderWidth: 2,
                        pointRadius: 0,
                    }

                    tempChartData.push(set)
                }
            }


            setChartDatasets(tempChartData)

        }
    }, [dataset, attribute]);

    const options = {
        parsing: {
            xAxisKey: 'Timestamp',
            yAxisKey: attribute,
        },

        responsive: true,
        plugins: {
            legend: {
                display: true,
                fullSize: false,
                text: attribute,
                position: 'top' as const,
                align: 'start' as const,
                labels: {
                    boxWidth: 25,
                    boxHeight: 10,
                    padding: 12,
                    useBorderRadius: true,
                    borderRadius: 4
                }
            },
            colors: {
                forceOverride: true
            },

            title: {
                display: false,
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Timestamp",
                    font: {
                        weight: "bold" as const
                    }
                },

                type: "time" as const,
                time: {
                    unit: "day" as const,
                    displayFormats: {
                        day: 'MMM dd yyyy',
                    }
                },
                ticks: {
                    callback: function(val: any) {
                      // Hide the label of every 2nd dataset
                      return formatDate(val).split('\n');
                    },
                  }
            },
            y: {
                title: {
                    display: true,
                    text: attribute,
                    padding: 0,
                    font: {
                        weight: "bold" as const
                    }
                },
            }
        }
    };

    const data = {
        datasets: chartDatasets,
    }


    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}
