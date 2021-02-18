import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Menu, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"
import userData from '../../data/userData';
import webservice from '../../../api/webservice';

const useStyles = makeStyles((theme) => ({
    defaultSelectBox:{
        marginBottom:40,
    },
    button:{
        '&:hover': {
            background:'transparent !important'
        }
    }
}))

const EditActivity = ({toShow,item,handleClose,handleSuccess}) => {


    const { getUserData } = userData()
    const { updateActivity } = webservice()
    const classes = useStyles();

    //Activity Data
    const [data,setData] = useState({
        tipologia:null,
        descrizione:null,
        periodo:null
    })

    function handleChange(e,target) {
        let val = e.target.value
        setData(prevState => ({
            ...prevState,
            [target]:val
        }))
    }

    return (
        <>
            <Dialog open={toShow} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">MODIFICA ASSET</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Modifica dell'asset di tipologia {item.tipologia}
                </DialogContentText>
                <Select
                        className={classes.defaultSelectBox}
                        labelId="selectTipologia"
                        id="selectTipologia"
                        value={data.tipologia === null ? item.tipologia : data.tipologia}
                        fullWidth
                        onChange={(e) => handleChange(e,'tipologia')}
                        label="Tipologia"
                        >
                        <MenuItem value={'Centralina'}>Centralina</MenuItem>
                        <MenuItem value={'Estintore'}>Estintore</MenuItem>
                        <MenuItem value={'Impianto Antincendio'}>Impianto Antincendio</MenuItem>
                    </Select>
                <TextField
                        id="outline-multiline-static"
                        label="Descrizione dell'attività"
                        multiline
                        className={classes.defaultSelectBox}
                        rowsMax={8}
                        height={64}
                        fullWidth
                        rows={1}
                        value={data.descrizione === null ? item.descrizione : data.descrizione}
                        placeholder="Inserisci la descrizione compelta dell'attività da svolgere"
                        onChange={e => handleChange(e,'descrizione')}
                    />
                <Select
                        className={classes.defaultSelectBox}
                        labelId="selectTipologia"
                        id="selectTipologia"
                        value={data.periodo === null ? item.periodo : data.periodo}
                        fullWidth
                        onChange={(e) => handleChange(e,'periodo')}
                        >
                        <MenuItem value={'Settimanale'}>Settimanale</MenuItem>
                        <MenuItem value={'Mensile'}>Mensile</MenuItem>
                        <MenuItem value={'Bimestrale'}>Bimestrale</MenuItem>
                        <MenuItem value={'Trimestrale'}>Trimestrale</MenuItem>
                        <MenuItem value={'Quadrimestrale'}>Quadrimestrale</MenuItem>
                        <MenuItem value={'Semestrale'}>Semestrale</MenuItem>
                        <MenuItem value={'Annuale'}>Annuale</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                <Button className={classes.button} onClick={handleClose} color="primary">
                    Cancella
                </Button>
                <Button className={classes.button} onClick={async e => {
                    let toUp = item
                    toUp.tipologia = data.tipologia !== null ? data.tipologia : item.tipologia
                    toUp.periodo = data.periodo !== null ? data.periodo : item.periodo
                    toUp.descrizione = data.descrizione !== null ? data.descrizione : item.descrizione
                    toUp.token = getUserData().Token
                    console.log(toUp)
                    await updateActivity(toUp)
                    
                    handleSuccess()
                    handleClose()

                }} color="primary">
                    Modifica
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditActivity