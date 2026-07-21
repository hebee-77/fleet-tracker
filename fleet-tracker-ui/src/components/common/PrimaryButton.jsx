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
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                px: 3,
                py: 1.2,
                minHeight: 46,

                "&:hover": {
                    backgroundColor: "#1D4ED8",
                    transform: "translateY(-1px)"
                },

                "&:active": {
                    transform: "translateY(0)"
                },

                transition: "all .2s ease",

                ...sx
            }}
        >
            {children}
        </Button>
    );

};

export default PrimaryButton;