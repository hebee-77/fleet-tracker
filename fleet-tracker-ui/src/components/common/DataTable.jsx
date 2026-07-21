import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import { useMemo, useState } from "react";

const DataTable = ({
    columns = [],
    rows = [],
    loading = false,
    emptyMessage = "No records found."
}) => {

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const paginatedRows = useMemo(() => {

        const start = page * rowsPerPage;

        return rows.slice(start, start + rowsPerPage);

    }, [rows, page, rowsPerPage]);

    const handlePageChange = (_, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

    };

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                py={5}
            >
                <CircularProgress />
            </Box>

        );

    }

    if (rows.length === 0) {

        return (

            <Box py={5} textAlign="center">

                <Typography color="text.secondary">

                    {emptyMessage}

                </Typography>

            </Box>

        );

    }

    return (

        <Paper elevation={0}>

            <TableContainer>

                <Table>

                    <TableHead>

                        <TableRow>

                            {

                                columns.map((column) => (

                                    <TableCell
                                        key={column.field}
                                        sx={{ fontWeight: 700 }}
                                    >

                                        {column.headerName}

                                    </TableCell>

                                ))

                            }

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            paginatedRows.map((row) => (

                                <TableRow
                                    hover
                                    key={row.id}
                                >

                                    {

                                        columns.map((column) => (

                                            <TableCell
                                                key={column.field}
                                            >

                                                {

                                                    column.render

                                                        ? column.render(row)

                                                        : row[column.field]

                                                }

                                            </TableCell>

                                        ))

                                    }

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

            <TablePagination

                component="div"

                page={page}

                rowsPerPage={rowsPerPage}

                count={rows.length}

                onPageChange={handlePageChange}

                onRowsPerPageChange={handleRowsPerPageChange}

                rowsPerPageOptions={[5, 10, 20, 50]}

            />

        </Paper>

    );

};

export default DataTable;