import { Paper, Typography, Box } from "@mui/material";

const StatCard = ({
    title,
    value,
    icon,
    color = "#2563EB",
    bgColor
}) => {
    const iconBgColor = bgColor || (color + "14");

    return (
        <Paper
            elevation={0}
            sx={{
                py: 1.5,
                px: 2,
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                bgcolor: "#FFFFFF",
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.02)",
                transition: "all 0.15s ease-in-out",
                cursor: "default",
                "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                    transform: "translateY(-1px)"
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "10px",
                        bgcolor: iconBgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: color,
                        "& .MuiSvgIcon-root": {
                            fontSize: 20
                        }
                    }}
                >
                    {icon}
                </Box>

                <Box sx={{ textAlign: "right" }}>
                    <Typography
                        sx={{
                            color: "#64748B",
                            fontSize: "0.775rem",
                            fontWeight: 600,
                            lineHeight: 1.2
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.35rem",
                            fontWeight: 800,
                            color: "#0F172A",
                            lineHeight: 1.2,
                            mt: 0.2
                        }}
                    >
                        {value}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default StatCard;