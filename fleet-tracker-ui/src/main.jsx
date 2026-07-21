import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";

import theme from "./theme/theme";

import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import VehicleManagement from "./pages/VehicleManagement";
import DriverManagement from "./pages/DriverManagement";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";

import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";

import SnackbarProvider from "./providers/SnackbarProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <ThemeProvider theme={theme}>

            <CssBaseline />

             <SnackbarProvider>

            <AuthProvider>

                <BrowserRouter>

                    <Routes>

                        {/* ================= Public Routes ================= */}

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />

                        {/* ================= Protected Routes ================= */}

                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <MainLayout />
                                </PrivateRoute>
                            }
                        >

                            <Route
                                index
                                element={<Dashboard />}
                            />

                            <Route
                                path="vehicles"
                                element={<VehicleManagement />}
                            />

                            <Route
                                path="drivers"
                                element={<DriverManagement />}
                            />

                            <Route
                                path="users"
                                element={
                                    <RoleRoute allowedRoles={["ADMIN"]}>
                                        <UserManagement />
                                    </RoleRoute>
                                }
                            />

                            <Route
                                path="analytics"
                                element={
                                    <RoleRoute allowedRoles={["ADMIN"]}>
                                        <Analytics />
                                    </RoleRoute>
                                }
                            />

                            <Route
                                path="settings"
                                element={
                                    <RoleRoute allowedRoles={["ADMIN"]}>
                                        <Settings />
                                    </RoleRoute>
                                }
                            />

                        </Route>

                    </Routes>

                </BrowserRouter>

            </AuthProvider>

            </SnackbarProvider>

        </ThemeProvider>

    </React.StrictMode>
    
);