import { Paper } from "@mui/material";

const ContentCard = ({ children }) => {

    return (

        <Paper

            elevation={0}

            sx={{

                p: 3,

                borderRadius: "18px",

                backgroundColor: "#FFFFFF",

                border: "1px solid #E5E7EB",

                boxShadow:
                    "0 8px 24px rgba(15,23,42,.08)"

            }}

        >

            {children}

        </Paper>

    );

};

export default ContentCard;