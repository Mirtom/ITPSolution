import React, { useState, useEffect } from 'react'
import { Box, Button, Checkbox, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, InputAdornment, ListItem, ListItemText, Menu, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import { Autocomplete } from '@material-ui/lab';
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import anagraficaData from '../../data/anagraficaData';

const useStyles = makeStyles((theme) => ({
    mainTab:{
        padding:'20px 10px',
        marginTop: 30
    },
    helperTopText:{
        fontWeight:'bold'
    },
    defInput:{
        width:'100%'
    },
    stdImage:{
        height:20
    },
    mainRow:{
        justifyContent:'space-between',
        marginBottom:50,
        display:'flex',
    },
    columnLabel:{
        color:'#535353',
        marginBottom:10
    },
    controlLabel:{
        fontSize:'14px !important'
    },
    button:{
        backgroundColor:'#00ADA2',
        textDecoration:'capitalize',
        width:'25%'
    },
    buttonBack:{
          width:'25%',
          background:'transparent',
          color:'black',
          '&:hover': {
            backgroundColor: '#f1e9e9 !important',
        }
    },
}))

const RichiestaIntervento = ({flag,handleClose,type,data,richiesta,handleReload}) => {
    const classes = useStyles();

    function toDateTime(date,action){
       
        var now = new Date()
        if(action === 0){
            return ( date + ' ' + now.getHours() + ':' + now.getMinutes() )
        }else if(action === 1){
            if(now.getHours() + date > 24){
                return( now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() + 1) + ' ' + ((now.getHours() + date) -24 ) + ':' + now.getMinutes() )
            }else{
                return( now.getFullYear() + '-' + (now.getMonth() + 1 )+ '-' + now.getDate() + ' ' + (now.getHours() + date) + ':' + now.getMinutes() )
            }
        }else{
            return ( date + ' ' + '00:00')
        }
        
    }

    //Call API webservice
    const { getClientList, clientList, createIntervento } = webservice()
    const { getUserData } = userData()
    const { getAnagraficaData } = anagraficaData()


    //BLOCCO FUNZIONI E STATI MODIFICA DATA
    const [richiestaData,setRichiestaData] = useState({
        tipologia:null,
        tempo:null,
        dataInizio:null,
        dataFine:null,
        priorita:{
            urgente:false,
            emergenza:false,
            medio:false,
            basso:false
        },
        notifiche:{
            cliente:false,
            admin:false,
            user:false
        },
        ragSociale:null,
        descrizione:null
    })
    function handleChangeRichiesta(e,target){
        let val = e.target.value;
        setRichiestaData( prevState => ({
            ...prevState,
            [target]:val
        }) )
    }
    function handlePriorita(e,target){
        let val = e.target.value;
        let priorita = richiestaData.priorita
        priorita.urgente = false
        priorita.emergenza = false
        priorita.medio = false
        priorita.basso = false
        priorita[target] = true
        setRichiestaData( prevState => ({
            ...prevState,
            'priorita':priorita
        }) ) 
    }
    function handleChangeNotifica(e,target){
        let notifiche = richiestaData.notifiche
        notifiche[target] = !richiestaData.notifiche[target]
        setRichiestaData( prevState => ({
            ...prevState,
            'notifiche':notifiche
        }) ) 
    }
    function handleInputChange(event,value){
        setRichiestaData( prevState => ({
            ...prevState,
            'ragSociale':value
        }) ) 
    }

    useEffect(() => {
        getClientList(getUserData().Token)
    }, [])
    return (
        <>
            {type === 'single' ? (
                <Dialog open={flag} fullWidth={true} maxWidth={'lg'} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><Typography variant='h5'>Richiesta di Intervento</Typography></DialogTitle>
                    <DialogContent>
                        <Box style={{display:'flex',alignItems:'center'}}>
                            <Typography variant="subtitle1" className={classes.helperTopText}>NB: Intervento SINGOLO su:</Typography>
                            <Typography variant='subtitle1' style={{fontWeight:'normal',marginLeft:5}}>{ data.titolo + ' ' + data.codice}</Typography>
                        </Box>
                        <Box className={classes.mainTab}>
                            <Box className={classes.mainRow} >
                                <Box className={classes.mainColumn} style={{width:'30%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Tipologia</Typography>
                                    <Select
                                        className={classes.defInput}
                                        
                                        value={richiestaData.tipologia}
                                        onChange={e => handleChangeRichiesta(e,'tipologia')}
                                    >
                                        <MenuItem value={'straordinaria'}>Straordinaria</MenuItem>
                                        <MenuItem value={'ordinaria'}>Ordinaria</MenuItem>
                                    </Select>
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'20%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Tempi di intervento</Typography>
                                    <TextField
                                        className={classes.defInput}
                                        helperText='Definisci il tempo massimo di intervento'
                                        value={richiestaData.tempo}
                                        onChange={e => handleChangeRichiesta(e,'tempo')}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                             <img className={classes.stdImage} src={require('../../../assets/images/manutenzioneContratto/tempoIntervento.png')} />
                                            </InputAdornment>
                                        ),
                                        }}
                                    />
                                </Box>
                                <Box className={classes.mainColumn}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Inizio Intervento</Typography>
                                    <TextField
                                        value={richiestaData.dataInizio}
                                        onChange={e => handleChangeRichiesta(e,'dataInizio')}
                                        type="date"
                                        helperText="Definisci la data di inizio intervento "
                                        className={classes.defInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <Box className={classes.mainColumn}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >Fine Intervento</Typography>
                                    <TextField
                                        value={richiestaData.dataFine}
                                        onChange={e => handleChangeRichiesta(e,'dataFine')}
                                        type="date"
                                        helperText="Definisci la data di fine intervento "
                                        className={classes.defInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box className={classes.mainRow}>
                                <Box className={classes.mainColumn} style={{width:'35%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >* Priorità</Typography>
                                    <Typography variant='caption' style={{color:'#0000008a'}}>Inserisci il livello di priorità del problema, a seconda del livello viene inviata una squadra differente</Typography>
                                    <Box>
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.urgente}
                                                onChange={e=> handlePriorita(e,'urgente')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Urgente"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.emergenza}
                                                onChange={e=> handlePriorita(e,'emergenza')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Emergenza"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.medio}
                                                onChange={e=> handlePriorita(e,'medio')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Medio"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.basso}
                                                onChange={e=> handlePriorita(e,'basso')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Basso"
                                        />
                                    </Box>
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'25%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >* Notifiche</Typography>
                                    <Typography variant='caption' style={{color:'#0000008a'}}>Inserisci il livello di priorità del problema, a seconda del livello viene inviata una squadra differente</Typography>
                                    <Box>
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.notifiche.cliente}
                                                onChange={e=> handleChangeNotifica(e,'cliente')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Cliente"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.notifiche.admin}
                                                onChange={e=> handleChangeNotifica(e,'admin')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.notifiche.user}
                                                onChange={e=> handleChangeNotifica(e,'user')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="User"
                                        />
                                    </Box>
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'20%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >* Assegna Intervento</Typography>  
                                    <Autocomplete
                                        inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}}
                                        id="combo-box-demo"
                                        options={clientList}
                                        helperText="Inserisci la ragione sociale alla quale assegnare l'intervento"
                                        getOptionLabel={(option) => option.rSociale}
                                        onInputChange={handleInputChange }
                                        className={classes.defInput}
                                        renderInput={(params) => <TextField {...params}  variant="standard" />}
                                    />
                                </Box>
                            </Box>
                        
                            <Box className={classes.mainRow}>
                                <Box className={classes.mainColumn} style={{width:'100%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >Descrizione</Typography>
                                    <TextField
                                    style={{width:'100%'}}
                                        id="outlined-multiline-static"
                                        value={richiestaData.descrizione}
                                        onChange={e=> handleChangeRichiesta(e,'descrizione')}
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>

                            <Box style={{display:'flex',justifyContent:'center',padding:'10px 100px 0'}}>
                                
                                <Button
                                variant="contained"
                                color="primary"
                                fullWidth={false}
                                className={classes.button}
                                style={{justifyContent:'center'}}
                                onClick={async e=> {
                                    var toUp = {
                                        token: getUserData().Token,
                                        tipologia: richiestaData.tipologia,
                                        tempi: richiestaData.tempo,
                                        dataInizio:toDateTime(richiestaData.dataInizio,3),
                                        dataFine:toDateTime(richiestaData.dataFine,3),
                                        priorita: (Object.keys(richiestaData.priorita).filter(function(key) {
                                            return richiestaData.priorita[key]
                                        }))[0],
                                        ragSociale: richiestaData.ragSociale,
                                        byContratto: getAnagraficaData().id,
                                        descrizione: richiestaData.descrizione,
                                        byAsset:data.id,
                                        previsioneTermine:null,
                                        created:toDateTime(0,1)
                                    }
                                    console.log(toUp)
                                    await createIntervento(toUp)
                                    richiesta()
                                    handleReload()
                                    handleClose()
                                }}
                                endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                                >
                                Invia Richiesta
                                </Button>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            ) : (
                <Dialog open={flag} fullWidth={true} maxWidth={'lg'} onClose={handleClose} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title"><Typography variant='h5'>Richiesta di Intervento</Typography></DialogTitle>
                    <DialogContent>
                        <Box style={{display:'flex',alignItems:'center'}}>
                            <Typography variant="subtitle1" className={classes.helperTopText}>NB: Intervento di GRUPPO su:</Typography>
                            <Typography variant='subtitle1' style={{fontWeight:'normal',marginLeft:5}}>{ data.titolo + ' ' + data.codice}</Typography>
                        </Box>
                        <Box className={classes.mainTab}>
                            <Box className={classes.mainRow} >
                                <Box className={classes.mainColumn} style={{width:'30%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Tipologia</Typography>
                                    <Select
                                        className={classes.defInput}
                                        
                                        value={richiestaData.tipologia}
                                        onChange={e => handleChangeRichiesta(e,'tipologia')}
                                    >
                                        <MenuItem value={'straordinaria'}>Straordinaria</MenuItem>
                                        <MenuItem value={'ordinaria'}>Ordinaria</MenuItem>
                                    </Select>
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'20%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Tempi di intervento</Typography>
                                    <TextField
                                        className={classes.defInput}
                                        helperText='Definisci il tempo massimo di intervento'
                                        value={richiestaData.tempo}
                                        onChange={e => handleChangeRichiesta(e,'tempo')}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                             <img className={classes.stdImage} src={require('../../../assets/images/manutenzioneContratto/tempoIntervento.png')} />
                                            </InputAdornment>
                                        ),
                                        }}
                                    />
                                </Box>
                                <Box className={classes.mainColumn}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Inizio Intervento</Typography>
                                    <TextField
                                        value={richiestaData.dataInizio}
                                        onChange={e => handleChangeRichiesta(e,'dataInizio')}
                                        type="date"
                                        helperText="Definisci la data di inizio intervento "
                                        className={classes.defInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <Box className={classes.mainColumn}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >Fine Intervento</Typography>
                                    <TextField
                                        value={richiestaData.dataFine}
                                        onChange={e => handleChangeRichiesta(e,'dataFine')}
                                        type="date"
                                        helperText="Definisci la data di fine intervento "
                                        className={classes.defInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box className={classes.mainRow}>
                                <Box className={classes.mainColumn} style={{width:'35%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >* Priorità</Typography>
                                    <Typography variant='caption' style={{color:'#0000008a'}}>Inserisci il livello di priorità del problema, a seconda del livello viene inviata una squadra differente</Typography>
                                    <Box>
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.urgente}
                                                onChange={e=> handlePriorita(e,'urgente')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Urgente"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.emergenza}
                                                onChange={e=> handlePriorita(e,'emergenza')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Emergenza"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.medio}
                                                onChange={e=> handlePriorita(e,'medio')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Medio"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.basso}
                                                onChange={e=> handlePriorita(e,'basso')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Basso"
                                        />
                                    </Box>
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'25%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >* Notifiche</Typography>
                                    <Typography variant='caption' style={{color:'#0000008a'}}>Inserisci il livello di priorità del problema, a seconda del livello viene inviata una squadra differente</Typography>
                                    <Box>
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.notifiche.cliente}
                                                onChange={e=> handleChangeNotifica(e,'cliente')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Cliente"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.notifiche.admin}
                                                onChange={e=> handleChangeNotifica(e,'admin')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.notifiche.user}
                                                onChange={e=> handleChangeNotifica(e,'user')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="User"
                                        />
                                    </Box>
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'20%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >* Assegna Intervento</Typography>  
                                    <Autocomplete
                                        inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}}
                                        id="combo-box-demo"
                                        options={clientList}
                                        helperText="Inserisci la ragione sociale alla quale assegnare l'intervento"
                                        getOptionLabel={(option) => option.rSociale}
                                        onInputChange={handleInputChange }
                                        className={classes.defInput}
                                        renderInput={(params) => <TextField {...params}  variant="standard" />}
                                    />
                                </Box>
                            </Box>
                        
                            <Box className={classes.mainRow}>
                                <Box className={classes.mainColumn} style={{width:'100%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >Descrizione</Typography>
                                    <TextField
                                    style={{width:'100%'}}
                                        id="outlined-multiline-static"
                                        value={richiestaData.descrizione}
                                        onChange={e=> handleChangeRichiesta(e,'descrizione')}
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>

                            <Box style={{display:'flex',justifyContent:'center',padding:'10px 100px 0'}}>
                                
                                <Button
                                variant="contained"
                                color="primary"
                                fullWidth={false}
                                className={classes.button}
                                style={{justifyContent:'center'}}
                                onClick={async e=> {
                                    var toUp = {
                                        token: getUserData().Token,
                                        tipologia: richiestaData.tipologia,
                                        tempi: richiestaData.tempo,
                                        dataInizio:toDateTime(richiestaData.dataInizio,3),
                                        dataFine:toDateTime(richiestaData.dataFine,3),
                                        priorita: (Object.keys(richiestaData.priorita).filter(function(key) {
                                            return richiestaData.priorita[key]
                                        }))[0],
                                        ragSociale: richiestaData.ragSociale,
                                        byContratto: getAnagraficaData().id,
                                        descrizione: richiestaData.descrizione,
                                        byAsset:data.id,
                                        previsioneTermine:null,
                                        created:toDateTime(0,1)
                                    }
                                    console.log(toUp)
                                    await createIntervento(toUp)
                                    richiesta()
                                    handleReload()
                                    handleClose()
                                }}
                                endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                                >
                                Invia Richiesta
                                </Button>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            )
            }

        </>
    )
}

export default RichiestaIntervento
