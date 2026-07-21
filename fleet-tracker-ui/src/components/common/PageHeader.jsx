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
                mb: 4,
                flexWrap: "wrap",
                gap: 2
            }}
        >

            <Box>

                {

                    breadcrumbs.length > 0 && (

                        <Breadcrumbs
                            separator={
                                <NavigateNextIcon
                                    fontSize="small"
                                />
                            }
                            sx={{
                                mb: 1
                            }}
                        >

                            {

                                breadcrumbs.map((item, index) => (

                                    index === breadcrumbs.length - 1 ?

                                        <Typography
                                            key={index}
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                color: "#2563EB"
                                            }}
                                        >
                                            {item.label}
                                        </Typography>

                                        :

                                        <Link
                                            key={index}
                                            underline="hover"
                                            color="inherit"
                                            href={item.href || "#"}
                                            sx={{
                                                fontSize: 14,
                                                color: "#6B7280"
                                            }}
                                        >
                                            {item.label}
                                        </Link>

                                ))

                            }

                        </Breadcrumbs>

                    )

                }

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "#111827",
                        lineHeight: 1.2
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        color: "#6B7280",
                        fontSize: "1rem"
                    }}
                >
                    {subtitle}
                </Typography>

            </Box>

            {

                action && (

                    <Box>

                        {action}

                    </Box>

                )

            }

        </Box>

    );

};

export default PageHeader;