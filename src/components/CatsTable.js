import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { getCats } from '../reducers/Cat/CatsAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function createData(id, name, origin, weight) {
    return { id, name, origin, weight };
}

export default function CatsTable() {
    const dispatch = useDispatch()
    const cats = useSelector(state => state.catReducer.cats)
    const [rows, setRows] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (!cats) {
            dispatch(getCats('test'))
        } else {
            let formatedCats = cats.map((data) => {
                return (createData(data.id, data.name, data.origin, data.weight.metric))
            })
            setRows(formatedCats)
        }
    }, [cats])

    return (
        <Paper>
            <Paper
                component="form"
            >
                <InputBase
                    placeholder="Search Name"
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <TableContainer component={Paper} sx={{ maxHeight: 500, minWidth: 1600 }}>

                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky  table">
                    <TableHead sx={{ backgroundColor: 'black' }}>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Origin</TableCell>
                            <TableCell align="left">Weight&nbsp;(kg)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.origin}</TableCell>
                                <TableCell align="left">{row.weight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows && rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}