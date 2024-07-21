import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Preview({Data}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button disabled={!Data} variant="outlined" className='mt-3 w-100' onClick={handleClickOpen}>
                Show data
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Submitted Data"}</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 320 }} size="small" aria-label="a dense table">
                            {/* <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight:'600'}}>Data</TableCell>
                                    <TableCell sx={{fontWeight:'600'}} align="left">First</TableCell>
                                    <TableCell sx={{fontWeight:'600'}} align="left">Second</TableCell>
                                </TableRow>
                            </TableHead> */}
                            <TableBody>
                                {/*  */}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        Name
                                    </TableCell>
                                    <TableCell align="left">{Data?.First_Name}</TableCell>
                                    <TableCell align="left">{Data?.Second_name}</TableCell>
                                </TableRow>
                                {/*  */}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        Contacts
                                    </TableCell>
                                    <TableCell align="left">{Data?.email}</TableCell>
                                    <TableCell align="left">{Data?.Phone}</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                                {/*  */}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        Address
                                    </TableCell>
                                    <TableCell align="left">{Data?.StreetAddress}</TableCell>
                                    <TableCell align="left">{Data?.StreetAddress2}</TableCell>
                                </TableRow>
                                {/*  */}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    Latitude / Longitude
                                    </TableCell>
                                    <TableCell align="left">{Data?.latitude}</TableCell>
                                    <TableCell align="left">{Data?.longitude}</TableCell>
                                </TableRow>
                                {/*  */}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    City / Country
                                    </TableCell>
                                    <TableCell align="left">{Data?.City}</TableCell>
                                    <TableCell align="left">{Data?.Country}</TableCell>
                                </TableRow>
                                {/*  */}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    Zip code / Region
                                    </TableCell>
                                    <TableCell align="left">{Data?.Postal}</TableCell>
                                    <TableCell align="left">{Data?.Region}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}