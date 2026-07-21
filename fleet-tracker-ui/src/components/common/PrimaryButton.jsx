import { Button } from "@mui/material";

const PrimaryButton = ({
    children,
    startIcon,
    endIcon,
    onClick,
    type = "button",
    disabled = false,
    fullWidth = false,
    color = "#2563EB",
    sx = {}
}) => {
    return (
        <Button
            variant="contained"
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            type={type}
            disabled={disabled}
            fullWidth={fullWidth}
            disableElevation
            sx={{
                backgroundColor: color,
                color: "#FFFFFF",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 2,
                py: 0.75,
                minHeight: 38,
                boxShadow: "0 2px 6px rgba(37, 99, 235, 0.2)",

                "&:hover": {
                    backgroundColor: "#1D4ED8",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
                },

                "&:active": {
                    transform: "scale(0.98)"
                },

                transition: "all 0.15s ease-in-out",
                ...sx
            }}
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;