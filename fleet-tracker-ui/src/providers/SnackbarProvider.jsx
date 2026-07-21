import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = ({ children }) => {

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const showSuccess = (message) => {
        showSnackbar(message, "success");
    };

    const showError = (message) => {
        showSnackbar(message, "error");
    };

    const showWarning = (message) => {
        showSnackbar(message, "warning");
    };

    const showInfo = (message) => {
        showSnackbar(message, "info");
    };

    const closeSnackbar = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false
        }));
    };

    return (
        <SnackbarContext.Provider
            value={{
                showSnackbar,
                showSuccess,
                showError,
                showWarning,
                showInfo
            }}
        >
            {children}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={closeSnackbar}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;