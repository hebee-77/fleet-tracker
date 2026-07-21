import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PageHeader = ({
    title,
    subtitle,
    breadcrumbs = [],
    action = null
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
                flexWrap: "wrap",
                gap: 2
            }}
        >
            <Box>
                {breadcrumbs.length > 0 && (
                    <Breadcrumbs
                        separator={
                            <NavigateNextIcon
                                sx={{ fontSize: 16, color: "#94A3B8" }}
                            />
                        }
                        sx={{ mb: 1 }}
                    >
                        {breadcrumbs.map((item, index) =>
                            index === breadcrumbs.length - 1 ? (
                                <Typography
                                    key={index}
                                    sx={{
                                        fontSize: "0.875rem",
                                        fontWeight: 700,
                                        color: "#2563EB"
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            ) : (
                                <Link
                                    key={index}
                                    underline="hover"
                                    href={item.href || "#"}
                                    sx={{
                                        fontSize: "0.875rem",
                                        color: "#64748B",
                                        fontWeight: 500,
                                        "&:hover": { color: "#2563EB" }
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </Breadcrumbs>
                )}

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        color: "#0F172A",
                        lineHeight: 1.2,
                        fontSize: { xs: "1.5rem", md: "1.875rem" },
                        letterSpacing: "-0.02em"
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        sx={{
                            mt: 0.75,
                            color: "#64748B",
                            fontSize: "0.95rem",
                            fontWeight: 500
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {action && <Box sx={{ alignSelf: "center" }}>{action}</Box>}
        </Box>
    );
};

export default PageHeader;