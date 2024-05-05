import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import L, { IconOptions } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import GraphPanel from "./GraphPanel";

// Remove the underscore-prefixed property from Icon.Default.prototype
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Define icon options
const iconOptions: IconOptions = {
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
};

// Merge the defined options with Default Icon options
L.Icon.Default.mergeOptions(iconOptions);

interface SensorInfo {
    sensorType: string;
    info: string;
    siteIDs: string[];
    siteCoords: number[][];
}

function SimpleMap(props: { sensorType: string; BaseMap: string; sensorVariable: string; 
    showPanel: boolean, setShowPanel: (newValue: boolean) => void}) {

    const mapRef = useRef(null);
    const latitude = 31.9686;
    const longitude = -99.9018;

    const { sensorType, BaseMap, sensorVariable, showPanel, setShowPanel } = props;
    const [sensorDetails, setSensorDetails] = useState<SensorInfo | null>();

    // const [showPanel, setShowPanel] = useState(false);
    const [siteName, setSiteName] = useState("RFTA");
    const closePopup = () => {
        setShowPanel(false);
    };

    useEffect(() => {
        async function getData() {
            const response = await fetch("/data/sensorData.json");
            let data = await response.json();

            if (data == null) {
                return;
            }

            const field = data.find(
                (sensorData: SensorInfo) => sensorData.sensorType === sensorType
            );

            if (field == null) {
                return;
            }

            setSensorDetails(field);
        }

        getData();
    }, [sensorType]);

    if (sensorDetails == null) {
        return;
    }

    const coords = sensorDetails.siteCoords;
    const latLngCoords = coords.map((coord) => [coord[0], coord[1]]);

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <>
            <MapContainer
                center={[latitude, longitude]}
                zoom={6}
                ref={mapRef}
            >
                <TileLayer url={BaseMap} />

                {latLngCoords?.map((coord, index) => (
                    <Marker
                        key={index}
                        position={[coord[0], coord[1]]}
                        eventHandlers={{
                            click: () => {
                                setShowPanel(true);
                                setSiteName(sensorDetails?.siteIDs[index]);
                            },
                        }}
                    >
                        <Tooltip>
                            <div className="font-['Trirong'] m-2 mt-0">
                                <h2 className="text-md">{sensorDetails.siteIDs[index]}</h2>
                                <p className="text-sm">Latitude: {coord[0].toFixed(2)}</p>
                                <p className="text-sm">Longitude: {coord[1].toFixed(2)}</p>
                            </div>
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>

            {showPanel && (
                <GraphPanel
                    closeFun={closePopup}
                    siteName={siteName}
                    sensorType={sensorType}
                    attribute={sensorVariable}
                />
            )}
        </>
    );
}

export default SimpleMap;
