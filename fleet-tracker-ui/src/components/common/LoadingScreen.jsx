import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingScreen = ({ text = "Loading..." }) => {

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "65vh",
                gap: 2
            }}
        >

            <CircularProgress size={46} />

            <Typography
                sx={{
                    color: "#6B7280"
                }}
            >
                {text}
            </Typography>

        </Box>

    );

};

export default LoadingScreen;