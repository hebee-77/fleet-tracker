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

            styleOverrides: {

                root: {

                    borderRadius: 16

                }

            }

        },

        MuiButton: {

            defaultProps: {

                disableElevation: true

            },

            styleOverrides: {

                root: {

                    borderRadius: 12

                }

            }

        },

        MuiTextField: {

            defaultProps: {

                size: "small"

            }

        }

    }

});

export default theme;