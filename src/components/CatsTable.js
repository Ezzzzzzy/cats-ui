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
import CatsSearch from './CatsSearch';
import CatsPagination from './CatsPagination';

function createData(id, name, origin, weight) {
    return { id, name, origin, weight };
}

export default function CatsTable() {
    const dispatch = useDispatch()
    const cats = useSelector(state => state.catReducer.cats)
    const filteredCats = useSelector(state => state.catReducer.filteredCats)
    const [rows, setRows] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {

        if (!cats) {
            dispatch(getCats('test'))
        } else {
            let catData = cats
            if (filteredCats)
                catData = filteredCats.data
            let formatedCats = catData.map((data) => {
                return (createData(data.id, data.name, data.origin, data.weight.metric))
            })
            setRows(formatedCats)
        }
    }, [cats, filteredCats])

    return (
        <Paper>
            <CatsSearch />
            <TableContainer component={Paper} sx={{ maxHeight: 400, minWidth: 1600, minHeight: 400 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky  table">
                    <TableHead sx={{ backgroundColor: 'black' }}>
                        <TableRow>
                            <TableCell align="left">Id</TableCell>
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
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.origin}</TableCell>
                                <TableCell align="left">{row.weight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CatsPagination
                length={filteredCats ? filteredCats.totalItems : 0}
            />
        </Paper>
    )
}