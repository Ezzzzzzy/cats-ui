import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCats, filterCats } from '../reducers/Cat/CatsAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CatsSearch from './CatsSearch';
import CatsPagination from './CatsPagination';
import TableSortLabel from '@mui/material/TableSortLabel';

function createData(index, id, name, origin, weight) {
    return { index, id, name, origin, weight };
}

export default function CatsTable() {
    const dispatch = useDispatch()
    const cats = useSelector(state => state.catReducer.cats)
    const search = useSelector(state => state.catReducer.search)
    const filteredCats = useSelector(state => state.catReducer.filteredCats)
    const page = useSelector(state => state.catReducer.page)
    const rowsPerPage = useSelector(state => state.catReducer.rowsPerPage)
    const headers = [
        { id: 'index', label: 'Id' },
        { id: 'name', label: 'Name' },
        { id: 'id', label: 'Short Name' },
        { id: 'origin', label: 'Origin' },
        { id: 'weight', label: 'Weight (kg)' }
    ]
    const [rows, setRows] = useState(false);
    const [orderBy, setOrderBy] = useState('index');
    const [direction, setDirection] = useState('asc');

    const createSortHandler = React.useCallback((property) => {
        if (direction === 'asc')
            setDirection('desc')
        else
            setDirection('asc')
        setOrderBy(property)
    })

    useEffect(() => {
        dispatch(filterCats(search ? search : '', orderBy, direction, page, rowsPerPage))
    }, [orderBy, direction])

    useEffect(() => {
        if (!cats) {
            dispatch(getCats('test'))
        } else {
            let catData = cats
            if (filteredCats)
                catData = filteredCats.data
            let formatedCats = catData.map((data, index) => {
                return (createData(data.index, data.id, data.name, data.origin, data.weight))
            })
            setRows(formatedCats)
        }
    }, [cats, filteredCats])

    return (
        <Paper>
            <CatsSearch orderBy={orderBy} direction={direction} page={page} rowsPerPage={rowsPerPage} />
            <TableContainer component={Paper} sx={{ maxHeight: 400, minWidth: 1600, minHeight: 400 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky  table">
                    <TableHead sx={{ backgroundColor: 'black' }}>
                        <TableRow>
                            {
                                headers.map((row) => (
                                    <TableCell align="left">
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={direction}
                                            onClick={() => createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </TableCell>

                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.index}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.origin}</TableCell>
                                <TableCell align="left">{row.weight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CatsPagination
                length={filteredCats ? filteredCats.totalItems : 0}
                orderBy={orderBy}
                direction={direction}
            />
        </Paper >
    )
}