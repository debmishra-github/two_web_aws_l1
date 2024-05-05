import { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Library for parsing Excel files

export default function MetaPage() {
    const [metaDataType, setMetaDataType] = useState<string>("");
    return (
        <>
            <div>
                <h1> Metadata </h1>
                <hr className="border-[3px] mb-3 border-red-800 rounded-md"/>

                <p>
                    {" "}
                    Each primary site consists of one eddy covariance system (ET
                    node), spectral sensors and phenology camera (spectral
                    node), three collocated soil-profiling and groundwater
                    system (soil node), and one Cosmic-ray Soil Moisture
                    observing system (COSMOS node).
                </p>
                <span>
                    <p>
                        Select the sensor node to display the metadata
                        associated with it: {"   "}
                    </p>
                    <select
                        className="mt-3 mb-6 block p-1 border border-slate-500 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={metaDataType}
                        onChange={(e) => setMetaDataType(e.target.value)}
                    >
                        <option value="ET Node"> ET Node </option>
                        <option value="Soil Node"> Soil Node </option>
                        <option value="COSMOS Node"> COSMOS Node </option>
                        <option value="Spectral Node"> Spectral Node </option>
                    </select>
                </span>

                <DisplayMetadata metaDataName={metaDataType} />
            </div>
        </>
    );
}

function DisplayMetadata(props: { metaDataName: string }) {
    const [excelData, setExcelData] = useState<string[][]>([]);
    const { metaDataName } = props;

    useEffect(() => {
        async function parseExcelFile() {
            try {
                const excelFile = await fetch("/data/metadata_all.xlsx");
                const arrayBuffer = await excelFile.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

                const sheetName = metaDataName;
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
    }, [metaDataName]);
    console.log(metaDataName);

    return (
        <div>
            <h2> {metaDataName} </h2>

            <table>
                <thead>
                    <tr>
                        {excelData.length > 0 &&
                            excelData[0].map((cell, index) => (
                                <th
                                    key={index}
                                    className="px-10 py-5"
                                >
                                    {cell}
                                </th>
                            ))}
                    </tr>
                </thead>

                <tbody>
                    {excelData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
