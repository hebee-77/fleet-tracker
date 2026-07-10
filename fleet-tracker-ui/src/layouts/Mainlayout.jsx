import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const drawerWidth = 250;

function MainLayout() {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3
                }}
            >

                <Toolbar />

                <Outlet />

            </Box>

        </Box>

    );

}

export default MainLayout;