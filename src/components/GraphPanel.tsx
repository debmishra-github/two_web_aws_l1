import { useEffect, useState } from "react";
import LineGraph from "./Graph";

interface GraphDataItem {
    Timestamp: string;
    [key: string]: any;
}

export default function GraphPanel(props: { closeFun: () => void; siteName: string; sensorType: string; attribute: string; }) {

    const { closeFun, siteName, sensorType, attribute } = props;
    // const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState<{data: GraphDataItem[], num: string}[] | null >();
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [queryDone, setQueryDone] = useState<boolean>(false);

    // const [period, setPeriod] = useState<number>(7)
    // const [options, setOptions] = useState([7, 30])
    // const [optionSelected, setOptionSelected] = useState<boolean[]>([true, false])


    // const downloadData = async () => {
    //     // event.preventDefault()

    //     console.log("downloadData sent request with " + sensorType);
    //     console.log(attribute)

    //     try {

    //         const response = await fetch('http://localhost:8080/data', {
    //             // mode: 'no-cors',
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ sensorType: sensorType, siteCode: siteName, attribute: attribute }),
    //         })

    //         if (!response.ok) {
    //             const errorMessage = await response.text()
    //             throw new Error(errorMessage)
    //         }

    //         const tempdata = await response.json()

    //         // .catch(e => console.log(e))

    //         console.log("downloadData got response");
    //         // console.log(tempdata)
    //         // console.log(response.body);

    //     }
    //     catch (error) {
    //         // console.log(error)
    //     }
    // };

    // const downloadCSV = async() => {
    //     downloadData()

    //     const csv = convertToCSV([[1, 2], [3, 4]]);
    //     const blob = new Blob([csv], { type: 'text/csv' });
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'data.csv';
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     document.body.removeChild(a);
    // };
    
    // const convertToCSV = (data: any[]) => {
    //     // Convert data array to CSV format
    //     const csv = data.map(row => Object.values(row).join(',')).join('\n');
    //     return csv;
    // };
    

    useEffect(() => {
        setGraphData([])
        async function getL0() {
            setQueryDone(false)
            setLoading(true)

            try {
                // If soil node, endpoint is called 3 times for num = 1, 2, 3
                let bound;
                switch (sensorType) {
                    case "Soil Node":
                        bound = 4;
                        break;
                    default:
                        bound = 2;
                        break;
                }

                const tempData: { data: GraphDataItem[]; num: string }[] = [];

                for (let i = 1; i < bound; i++){

                    const response = await fetch('http://localhost:8080/get_L0', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ sensorType: sensorType, siteCode: siteName, attribute: attribute, num: i})
                    })

                    if (!response.ok){
                        const errorMessage = await response.text()
                        throw new Error(errorMessage)
                    }

                    const [result] = await response.json();
                    if (result.length == 0){
                        continue;
                    }

                    tempData.push({ data: result, num: i.toString() });
                }

                setGraphData(tempData);
            }
            catch (error) {
                console.log("Error parsing file: ", error);
            }

            setLoading(false)
            setQueryDone(true)

        }

        if (siteName != null && sensorType != null && attribute != null
            && siteName.length > 0 && sensorType.length > 0 && attribute.length > 0) {
            getL0()
            setMessage("")
        }
        else {
            setMessage("An attribute wasn't selected")
        }

    }, [siteName, sensorType, attribute])

    // const handleClick = (index: number) => {
    //     setOptionSelected(prevState => {
    //         return prevState.map(value => !value);
    //     });
    // }


    return (
        <div className="p-5 absolute top-4 right-4 w-1/2 h-4/5 bg-white opacity-95 rounded-lg z-10 overflow-auto">
            <div className="flex">
                <div className="mr-[57%]">
                    <h2 className="text-2xl"> {"  "}{siteName} </h2>
                </div>
                {/* <div> {options && options.map((item, index) => (
                    <button
                    key = {index}
                    className={`text-sm rounded-md px-3 py-1 m-1 transition duration-100 ease-in-out ${
                        optionSelected[index] ? 'bg-gray-400 hover:bg-gray-500 text-black' : 'bg-gray-200 hover:bg-gray-400'
                      }`}
                    onClick = {() => handleClick(index)}
                    >
                        {item} days
                    </button>
                ))

                }</div> */}
            </div>

            {loading ?
                (<div className="my-3"> <h5> Loading...</h5> </div>) :
                (graphData && graphData.length > 0 && <LineGraph dataset={graphData} attribute={attribute} sensorType = {sensorType}/>
                )}

            {graphData && graphData.length == 0 && queryDone && <div className="my-3 text-semibold"> No data found for selected parameters </div>}

            {message.length > 0 && <div className="my-3 text-red-600 font-semibold"> {message} </div>}


            <div className="absolute top-1 right-0.5 cursor-pointer">
                <img src="/cross.svg" onClick={closeFun} />
            </div>

            {/* <div className="absolute bottom-1 right-0.5 cursor-pointer">
                <img src="/download.svg" onClick={() => downloadCSV()} />
            </div> */}
        </div>
    );
}
