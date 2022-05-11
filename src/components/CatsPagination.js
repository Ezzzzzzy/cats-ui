import TablePagination from '@mui/material/TablePagination';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catsPagination, filterCats } from '../reducers/Cat/CatsAction';
export default function CatsPagination(props) {
    const dispatch = useDispatch()
    const cats = useSelector(state => state.catReducer.cats)
    const search = useSelector(state => state.catReducer.search)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = useCallback((event, newPage) => {
        setPage(+newPage)
    })

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(event.target.value)
    })

    useEffect(() => {
        if (cats)
            dispatch(filterCats(search, props.orderBy, props.direction, page, rowsPerPage))
    }, [page, rowsPerPage, cats])

    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={props.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}