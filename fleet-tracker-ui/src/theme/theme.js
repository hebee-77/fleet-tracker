import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";

const theme = createTheme({
    palette,
    typography,

    shape: {
        borderRadius: 16
    },

    components: {
        MuiPaper: {
            elevation: 0,
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px -1px rgba(0, 0, 0, 0.02)"
                }
            }
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: "none",
                    fontWeight: 600
                }
            }
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    borderRadius: 12,
                    fontSize: "0.75rem"
                }
            }
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: "#FFFFFF",
                    "& fieldset": {
                        borderColor: "#E2E8F0"
                    },
                    "&:hover fieldset": {
                        borderColor: "#CBD5E1"
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#2563EB"
                    }
                }
            }
        },

        MuiTextField: {
            defaultProps: {
                size: "small"
            }
        },

        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }
            }
        }
    }
});

export default theme;