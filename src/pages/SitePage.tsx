import { useEffect } from "react";
import { useState } from "react";
// import { Link, useParams } from "react-router-dom";

interface SiteInfo {
    id: string;
    name: string;
    ownership: string;
    img: string;
    siteDescription: string;
    physiography: {
        coordinates: [number, number];
        elevation: string;
        ecoRegionIII: string;
        ecoRegionIV: string;
    };
    vegetation: {
        type: string;
        predominantSpecies: string;
        height: string;
        seasonality: string;
        management: string;
    };
    climate: {
        koppenClassification: string;
        meanAnnualPrecipitation: string;
        annualMeanMaxTemperature: string;
        annualMeanMinTemperature: string;
        predominantWindDirection: string;
    };
    hydrology: {
        riverBasin: string;
        watershed: string;
        HUC10: string;
        majorAquiferRegion: string;
        minorAquiferRegion: string;
    };
    soils: {
        taxonomy: string;
        soilSeries: string;
        soilTexture: string;
        geology: string;
    };
}

export function SitePage() {
    const [siteData, setSiteData] = useState<SiteInfo[] | null>(null);

    useEffect(() => {
        async function getData() {
            const response = await fetch("/data/primary_sites.json");
            let data = await response.json();

            setSiteData(data);
        }

        getData();
    }, []);

    if (siteData == null) {
        return;
    }

    return (
        <>
            <div>
                <h1> Sites </h1>
                <hr className="border-[3px] mb-3 border-red-800 rounded-md"/>
            </div>

            {/* <section className="grid md:grid-cols-2 sm:grid-cols-1 gap-8 mb-4">
                {siteData.map((sites: SiteInfo, index: number) => {
                    return <SiteCard key={index} {...sites} />;
                })}
            </section> */}
        </>
    );
}

// function SiteCard(data: SiteInfo) {
//     return (
//         <>
//             <div className="flex p-4 border-2 border-gray shadow-md rounded-md">
//                 <div className="flex items-center justify-center h-56 w-48 mr-5">
//                     <img alt = {data.img} src={"/site_imgs/" + data.img} className="h-full w-full object-cover rounded-md" />
//                 </div>
//                 <div className="flex flex-col justify-between grow">
//                     <div>
//                         <h2> {data.name} </h2>
//                         <h3> {data.ownership}</h3>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <div>
//                             {data.physiography.coordinates[0].toFixed(3)} N,{" "}
//                             {data.physiography.coordinates[1].toFixed(3)} W
//                         </div>

//                         <div className="text-black hover:text-red-800 relative">
//                             <Link to={"/sites/" + data.id} className="relative hover:border-b-4 border-red-800 scale x-50"> Learn More </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export function SiteDetailsInfo() {
//     const [siteDetails, setSiteDetails] = useState<SiteInfo | null>();
//     const { site_id } = useParams<string>();

//     useEffect(() => {
//         async function getData() {
//             const response = await fetch("/data/primary_sites.json");
//             let data = await response.json();

//             if (data == null) {
//                 console.log("lkf");
//                 return;
//             }
//             // console.log(data[0]);
//             const field = data.find((field: SiteInfo) => field.id === site_id);

//             setSiteDetails(field);
//             // console.log(field);
//         }

//         getData();
//     }, []);

//     if (siteDetails == null) {
//         return;
//     }

//     let physio = siteDetails.physiography;
//     let climate = siteDetails.climate;
//     let hydrology = siteDetails.hydrology;
//     let soils = siteDetails.soils;
//     let veg = siteDetails.vegetation;

//     return (
//         <>
//             <div>
//                 <h1> {siteDetails.name} </h1>
//                 <hr className="border-[3px] mb-3 border-red-800 rounded-md"/>
//             </div>

//             <div className="flex gap-10">
//                 <div className="flex flex-col w-1/2 mb-10">
//                     <h2>Site Description</h2>

//                     <p className="mb-4">{siteDetails.siteDescription}</p>

//                     <h2>Physiography</h2>

//                     <ul>
//                         <li>
//                             Coordinates: {physio.coordinates[0]},{" "}
//                             {physio.coordinates[1]}{" "}
//                         </li>
//                         <li> Elevation: {physio.elevation}</li>
//                         <li> Ecoregion III: {physio.ecoRegionIII} </li>
//                         <li> Ecoregion IV: {physio.ecoRegionIV} </li>
//                     </ul>

//                     <h2>Vegetation</h2>

//                     <ul>
//                         <li> Type: {veg.type} </li>
//                         <li> Predominant Species: {veg.predominantSpecies} </li>
//                         <li> Height: {veg.height} </li>
//                         <li> Seasonality: {veg.seasonality} </li>
//                         <li> Management: {veg.management} </li>
//                     </ul>

//                     <h2>Climate</h2>

//                     <ul>
//                         <li>
//                             {" "}
//                             Koppen Classification:{" "}
//                             {climate.koppenClassification}{" "}
//                         </li>
//                         <li>
//                             {" "}
//                             Mean Annual Precipitation:{" "}
//                             {climate.meanAnnualPrecipitation}{" "}
//                         </li>
//                         <li>
//                             {" "}
//                             Annual Mean Max Temperature:{" "}
//                             {climate.annualMeanMaxTemperature}{" "}
//                         </li>
//                         <li>
//                             {" "}
//                             Annual Mean Min Temperature:{" "}
//                             {climate.annualMeanMinTemperature}{" "}
//                         </li>
//                         <li>
//                             {" "}
//                             Predominant Wind Direction:{" "}
//                             {climate.predominantWindDirection}{" "}
//                         </li>
//                     </ul>

//                     <h2>Hydrology</h2>

//                     <ul>
//                         <li> River Basin: {hydrology.riverBasin} </li>
//                         <li> Watershed: {hydrology.watershed} </li>
//                         <li> HUC10: {hydrology.HUC10} </li>
//                         <li>
//                             {" "}
//                             Major Aquifer Region: {
//                                 hydrology.majorAquiferRegion
//                             }{" "}
//                         </li>
//                         <li>
//                             {" "}
//                             Minor Aquifer Region: {
//                                 hydrology.minorAquiferRegion
//                             }{" "}
//                         </li>
//                     </ul>

//                     <h2> Soils and Geology </h2>
//                     <ul>
//                         <li> Taxonomy : {soils.taxonomy} </li>
//                         <li> Soil Series: {soils.soilSeries} </li>
//                         <li> Soil Texture: {soils.soilTexture} </li>
//                         <li> Geology: {soils.geology} </li>
//                     </ul>
//                 </div>

//                 <div className="mx-10 mt-20 mb-10 h-[32rem]">
//                     <img src={"/site_imgs/" + siteDetails.img} className="rounded-md h-full"/>
//                 </div>
//             </div>
//         </>
//     );
// }
