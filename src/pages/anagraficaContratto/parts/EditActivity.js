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
import anagraficaData from '../../data/anagraficaData';

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
    const { updateActivity,getTipologieIntervento } = webservice()
    const { getTipoI,getAnagraficaData } = anagraficaData()
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
    const [cType,setCType] = React.useState([])

    useEffect(() => {
        async function initialData(){
            await getTipologieIntervento('dd')
            var typDe = getAnagraficaData().tipologia
            if(typDe.split(',').length > 1){
                typDe = typDe.split(',')[0]
            }
            let fin = []
            getTipoI().map( type => {
                console.log(typDe,type.byTipologia)
                switch(typDe){
                    
                    case 'Sicurezza':
                        if(type.bytipologia == 3){
                            fin.push(type)
                        }
                        break;
                    case 'Tecnologico':
                        if(type.bytipologia == 4){
                            fin.push(type)
                        }
                        break;
                    case 'Elettrico':
                        if(type.bytipologia == 2){
                            fin.push(type)
                        }
                        break;
                    case 'Antincendio':
                        if(type.bytipologia == 1){
                            fin.push(type)
                        }
                        break;

                }
                setCType(fin)
            } )
        }
        initialData()
    }, [])

    return (
        <>
            <Dialog open={toShow} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">MODIFICA</DialogTitle>
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
                        {cType.map(type => {
                                        return (
                                            <MenuItem value={type.Nome}>{type.Nome}</MenuItem>
                                        )
                                    })}
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
                <TextField
                        id="outline-multiline-static"
                        label="Periodo dell'attivià"
                        className={classes.defaultSelectBox}
                        fullWidth
                        disabled
                        rows={1}
                        value={item.periodo}
                    />
                </DialogContent>
                <DialogActions>
                <Button className={classes.button} onClick={handleClose} color="primary">
                    Cancella
                </Button>
                <Button className={classes.button} onClick={async e => {
                    let toUp = item
                    toUp.tipologia = data.tipologia !== null ? data.tipologia : item.tipologia
                    toUp.periodo = item.periodo
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