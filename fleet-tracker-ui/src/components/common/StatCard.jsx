import { Paper, Typography, Box } from "@mui/material";

const StatCard = ({
    title,
    value,
    icon,
    color = "#2563EB"
}) => {

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: "18px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 8px 24px rgba(15,23,42,.08)",
                transition: ".25s",
                cursor: "default",

                "&:hover": {
                    transform: "translateY(-4px)"
                }
            }}
        >

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >

                <Box>

                    <Typography
                        sx={{
                            color: "#6B7280",
                            fontSize: 14,
                            fontWeight: 600,
                            mb: 1
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 34,
                            fontWeight: 700,
                            color: "#111827"
                        }}
                    >
                        {value}
                    </Typography>

                </Box>

                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "18px",
                        background: color + "15",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color
                    }}
                >
                    {icon}
                </Box>

            </Box>

        </Paper>

    );

};

export default StatCard;