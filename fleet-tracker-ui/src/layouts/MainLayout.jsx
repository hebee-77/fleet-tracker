import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
    const { user } = useAuth();

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                bgcolor: "#F8FAFC"
            }}
        >
            <Sidebar user={user} />

            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    p: { xs: 2, md: 2.5 },
                    bgcolor: "#F8FAFC"
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default MainLayout;