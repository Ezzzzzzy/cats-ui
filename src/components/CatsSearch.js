import { IconButton, InputBase } from '@mui/material';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterCats, searchCats } from '../reducers/Cat/CatsAction';

export default function CatsSearch(props) {

    const dispatch = useDispatch()
    const [search, setSearch] = useState(null);

    const onChange = useCallback((event) => {
        setSearch(event.target.value)
    })


    useEffect(() => {
        if (search != null) {
            console.log(props)
            dispatch(filterCats(search, props.orderBy, props.direction, props.page, props.rowsPerPage))
        }
    }, [search])

    return (
        <Paper
            component="form"
        >
            <InputBase
                placeholder="Search Name"
                onChange={(event) => onChange(event)}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}