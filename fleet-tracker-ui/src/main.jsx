import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import MainLayout from "./layouts/Mainlayout";

import Dashboard from "./pages/Dashboard";
import VehicleManagement from "./pages/VehicleManagement";
import DriverManagement from "./pages/DriverManagement";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<MainLayout />}>

                    <Route index element={<Dashboard />} />

                    <Route
                        path="vehicles"
                        element={<VehicleManagement />}
                    />

                    <Route
                        path="drivers"
                        element={<DriverManagement />}
                    />

                    <Route
                        path="analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="settings"
                        element={<Settings />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    </React.StrictMode>

);