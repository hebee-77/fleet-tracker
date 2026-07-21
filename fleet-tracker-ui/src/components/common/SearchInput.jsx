import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({
    value,
    onChange,
    placeholder = "Search...",
    width = 320
}) => {

    return (

        <TextField
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            size="small"
            sx={{
                width,

                "& .MuiOutlinedInput-root": {

                    borderRadius: "12px",

                    backgroundColor: "#FFFFFF",

                    "& fieldset": {
                        borderColor: "#E5E7EB"
                    },

                    "&:hover fieldset": {
                        borderColor: "#2563EB"
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: "#2563EB",
                        borderWidth: 2
                    }

                }
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon
                            sx={{
                                color: "#9CA3AF"
                            }}
                        />
                    </InputAdornment>
                )
            }}
        />

    );

};

export default SearchInput;