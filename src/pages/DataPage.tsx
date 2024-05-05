import { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Library for parsing Excel files
import SimpleMap from "../components/Map";

export default function DataPage() {
    const [sensorType, setSensorType] = useState<string>("");
    const [sensorVariable, setSensorVariable] = useState<string>("");
    // const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

    const [showPanel, setShowPanel] = useState(false);

    const [baseMap, setBaseMap] = useState<string>(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
    );

    const BaseMap1 = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const BaseMap2 = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";

    const changeMapView = (value: string) => {
        setBaseMap(value);
    };




    return (
        <div>
            <h1> Data </h1>
            <hr className="border-[3px] mb-2 border-red-800 rounded-md w-full" />

            <div className="flex gap-4">
                {// sideBarOpen &&
                    <div className="flex flex-col justify-between p-8 pt-2 shadow-lg relative">

                        {/* <div className="absolute top-0 right-0.5 cursor-pointer">
                            <img src="/cross.svg" onClick={() => setSideBarOpen(false)} />
                        </div> */}
                        <div className="flex flex-col gap-4">
                            <select
                                className="mt-6 block w-full p-1 border border-slate-500 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={sensorType}
                                onChange={(e) => {
                                    setSensorType(e.target.value);
                                    setSensorVariable("");
                                    setShowPanel(false)
                                }}
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="ET Node"> ET Node </option>
                                <option value="Soil Node"> Soil Node </option>
                                <option value="COSMOS Node"> COSMOS Node </option>
                                <option value="Spectral Node">
                                    {" "}
                                    Spectral Node{" "}
                                </option>
                            </select>

                            <ChooseSensorVariables
                                sensorType={sensorType}
                                sensorVariable={sensorVariable}
                                setSensorVariable={setSensorVariable}
                            />
                        </div>

                        <div className="flex flex-row gap-2.5">
                            <button
                                className="p-3 border-2 border-gray bg-white rounded-md"
                                onClick={() => changeMapView(BaseMap1)}>
                                View 1
                            </button>
                            <button
                                className="p-3 border-2 border-gray bg-white rounded-md"
                                onClick={() => changeMapView(BaseMap2)}>
                                View 2
                            </button>

                        </div>

                    </div>
                }

                <div className="relative h-[600px] grow">
                    <SimpleMap
                        sensorType={sensorType}
                        BaseMap={baseMap}
                        sensorVariable={sensorVariable}
                        showPanel={showPanel}
                        setShowPanel={setShowPanel}
                    />
                </div>
            </div>
        </div>
    );
}

function ChooseSensorVariables(props: { sensorType: string; sensorVariable: string; setSensorVariable: (val: string) => void; }) {
    const { sensorType, sensorVariable, setSensorVariable } = props;
    const [excelData, setExcelData] = useState<string[][]>([]);

    useEffect(() => {
        async function parseExcelFile() {
            try {
                const excelFile = await fetch("/data/metadata-copy.xlsx");
                const arrayBuffer = await excelFile.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

                const sheetName = sensorType;
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json<string[]>(worksheet, {
                    header: 1,
                });
                setExcelData(data);
            } catch (error) {
                console.error("Error parsing Excel file: ", error);
            }
        }
        parseExcelFile();
    }, [sensorType]);

    return (
        <>
            <select
                className="block w-full p-1 border border-slate-500 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={sensorVariable}
                onChange={(e) => setSensorVariable(e.target.value)}
            >
                <option value="" disabled>Select an option</option>
                {excelData.length > 0 &&
                    excelData.slice(1).map((row, rowNum) => (
                        <option key={rowNum} value={row[0]}>
                            {" "}
                            {row[0]}{" "}
                        </option>
                    ))}
            </select>
        </>
    );
}
