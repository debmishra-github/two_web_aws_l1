export default function HomePage() {
    return (
        <>
            <div>
                <h1> Texas Water Observatory </h1>
                <hr className="border-[3px] mb-3 border-red-800 rounded-md" />
            </div>

            <div
                className="h-[22rem] rounded-xl bg-cover flex flex-col items-center justify-center
                "
                style={{ backgroundImage: "url('/home-view.jpg')" }}
            >
                
                <div className="flex justify-around w-full font-sans flex-wrap">
                    <div
                        className="w-60 h-60 rounded-full border-4 border-white/50 hover:border-white 
                                    flex items-center justify-center hover:cursor-pointer backdrop-contrast-50 space"
                    >
                        <div className="flex items-center justify-center text-center w-[80%]">
                            <h3 className="text-2xl text-white font-semibold">
                                Water-Energy-Carbon Coupling
                            </h3>
                        </div>
                    </div>

                    <div
                        className="w-60 h-60 rounded-full border-4 border-white/50 hover:border-white 
                                    flex items-center justify-center hover:cursor-pointer backdrop-contrast-50"
                    >
                        <div className="flex items-center justify-center text-center w-[80%]">
                            <h3 className="text-2xl text-white font-semibold">
                                Agriculture & Soil Health
                            </h3>
                        </div>
                    </div>

                    <div
                        className="w-60 h-60 rounded-full border-4 border-white/50 hover:border-white  
                                    flex items-center justify-center hover:cursor-pointer backdrop-contrast-50"
                    >
                        <div className="flex items-center justify-center text-center w-[80%]">
                            <h3 className="text-2xl text-white font-semibold">
                                Weather & Climate Forecast
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex space-x-10 my-10 ">
                <div className="home-info-container">
                    <div className = "mb-5 " id="home-intro">
                        <p className="text-justify">
                            Texas Water Observatory (TWO) is a river basin scale
                            distributed facility in operation since 2017 for
                            monitoring and investigating coupled water, energy,
                            and carbon stores and fluxes at various space and
                            time scales within the Gulf Coast Plains region. The
                            Gulf Coast region in the South-Central Plains of
                            Texas is a unique natural laboratory characterized
                            by meandering rivers oriented orthogonally to
                            aquifer recharge zones, and cascading watersheds
                            with different land covers subjected to exceptional
                            climatic variations within relatively short time and
                            space windows. TWO is developed to better understand
                            hydrologic flow across natural and manmade
                            reservoirs in this critical zone. The network
                            monitors and measures groundwater, soil water,
                            surface water, and atmospheric water at multiple
                            locations across space and through time. Using
                            advanced observational platforms and near real time
                            sensors, this observatory monitors high frequency
                            data of water stores and fluxes, critical for
                            understanding and modeling water resources and their
                            sustainability in the state of Texas and Southern
                            USA.
                        </p>
                    </div>

                    <div id="home-abstract">
                        <p className="text-justify">
                            TWO is positioned to support high-impact water
                            science that is beyond the existing capabilities at
                            Texas A&M University and is highly relevant to
                            societal needs. TWO is a regional resource for
                            better understanding and managing agriculture, water
                            resources, ecosystems, biodiversity, disasters,
                            health, energy, and weather/climate. TWO
                            infrastructure spans land uses (cultivation
                            agriculture, range/pasture, forest), landforms
                            (low-relief erosional uplands to depositional
                            lowlands), and across climatic and geological
                            gradients of Texas to investigate the sensitivity
                            and resilience of fertile soils and the ecosystems
                            they support. TWO facilitates a new generation of
                            interdisciplinary water professionals, from various
                            TAMU Colleges, that are better positioned for
                            attending to future water challenges of the region.
                        </p>
                    </div>
                </div>
                <div className="home-pic" >
                    <img className = "p-2" src="/TWOsitemap.jpg" />
                </div>
            </div>
        </>
    );
}

{
    /* <div id="home-intro">
                        <p>
                            Texas Water Observatory (TWO) is a river basin scale
                            distributed facility in operation since 2017 for
                            monitoring and investigating coupled water, energy,
                            and carbon stores and fluxes at various space and
                            time scales within the Gulf Coast Plains region. The
                            Gulf Coast region in the South-Central Plains of
                            Texas is a unique natural laboratory characterized
                            by meandering rivers oriented orthogonally to
                            aquifer recharge zones, and cascading watersheds
                            with different land covers subjected to exceptional
                            climatic variations within relatively short time and
                            space windows. TWO is developed to better understand
                            hydrologic flow across natural and manmade
                            reservoirs in this critical zone. The network
                            monitors and measures groundwater, soil water,
                            surface water, and atmospheric water at multiple
                            locations across space and through time. Using
                            advanced observational platforms and near real time
                            sensors, this observatory monitors high frequency
                            data of water stores and fluxes, critical for
                            understanding and modeling water resources and their
                            sustainability in the state of Texas and Southern
                            USA.
                        </p>
                    </div> */
}

{
    /* <div id="home-abstract">
                        <p></p>

                        <p>
                            TWO is positioned to support high-impact water
                            science that is beyond the existing capabilities at
                            Texas A&M University and is highly relevant to
                            societal needs. TWO is a regional resource for
                            better understanding and managing agriculture, water
                            resources, ecosystems, biodiversity, disasters,
                            health, energy, and weather/climate. TWO
                            infrastructure spans land uses (cultivation
                            agriculture, range/pasture, forest), landforms
                            (low-relief erosional uplands to depositional
                            lowlands), and across climatic and geological
                            gradients of Texas to investigate the sensitivity
                            and resilience of fertile soils and the ecosystems
                            they support. TWO facilitates a new generation of
                            interdisciplinary water professionals, from various
                            TAMU Colleges, that are better positioned for
                            attending to future water challenges of the region.
                        </p>
                    </div> */
}
