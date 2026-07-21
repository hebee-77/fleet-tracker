import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({
    value,
    onChange,
    placeholder = "Search...",
    width = 300
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
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.85rem",
                    height: 38,
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
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon
                            sx={{
                                color: "#94A3B8",
                                fontSize: 18
                            }}
                        />
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchInput;