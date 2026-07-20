import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function MainLayout() {

    const { user } = useAuth();

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar user={user} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: 4,
                    py: 2,
                    minHeight: "100vh",
                    bgcolor: "#f5f7fb"
                }}
            >

                <Outlet />

            </Box>

        </Box>

    );

}

export default MainLayout;