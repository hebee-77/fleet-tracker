import { Box, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const EmptyState = ({
    title = "No Data Found",
    subtitle = "There is nothing to display."
}) => {

    return (

        <Box
            sx={{
                py: 8,
                textAlign: "center"
            }}
        >

            <InboxOutlinedIcon
                sx={{
                    fontSize: 70,
                    color: "#CBD5E1"
                }}
            />

            <Typography
                sx={{
                    mt: 2,
                    fontWeight: 700,
                    fontSize: 22
                }}
            >
                {title}
            </Typography>

            <Typography
                sx={{
                    mt: 1,
                    color: "#6B7280"
                }}
            >
                {subtitle}
            </Typography>

        </Box>

    );

};

export default EmptyState;