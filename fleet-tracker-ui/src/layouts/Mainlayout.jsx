import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: 4,
                    py: 2
                }}
            >

                <Outlet />

            </Box>

        </Box>

    );

}

export default MainLayout;