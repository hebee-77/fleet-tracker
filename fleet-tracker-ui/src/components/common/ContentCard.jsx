import { Paper } from "@mui/material";

const ContentCard = ({
    children,
    sx = {}
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
                width: "100%",
                ...sx
            }}
        >
            {children}
        </Paper>
    );
};

export default ContentCard;