// import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import DataPage from "./pages/DataPage";
import HomePage from "./pages/HomePage";
import MetaPage from "./pages/MetaPage";
import {People} from "./pages/People";
// import { SitePage, SiteDetailsInfo } from "./pages/SitePage";
import SitePage from "./pages/SitePage";
import ResourcePage from "./pages/ResourcePage";

export default function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/data" element={<DataPage />} />

                <Route path="/metadata" element={<MetaPage />} />

                <Route path="/people" element={<People />} />

                <Route path="/sites">
                    <Route path="/sites" element={<SitePage />} />
                    {/* <Route
                        path="/sites/:site_id"
                        element={<SiteDetailsInfo />}
                    /> */}
                </Route>
                <Route path = "/resources" element = {<ResourcePage />} />

            </Routes>
        </>
    );
}
