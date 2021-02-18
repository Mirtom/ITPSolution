import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Checkbox, DialogActions, DialogContent, DialogContentText,Chip, DialogTitle, FormControlLabel, Input, InputAdornment, ListItem, ListItemText, Menu, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import { Autocomplete } from '@material-ui/lab';
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import anagraficaData from '../../data/anagraficaData';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import { Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';

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

const AggiungiAttivita = ({user,flag,handleClose,date}) => {
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


    function getDates(startDate, stopDate) {
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        Date.prototype.remDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() - days);
            return date;
        }
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
        console.log(startDate)
        let lastDay = new Date(stopDate)
        let firstDay = new Date(startDate).remDays(1)
        const diffTime = Math.abs(firstDay - lastDay);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        let final = []
        for( let i = 0;i<diffDays;i++ ){
           final.push( formatDate( firstDay.addDays(1) ) )
           firstDay = firstDay.addDays(1)
        }
        return (final)
    }


    //Sort INT AVAILABLE
    function sortInterventi(arr1, arr2){
        var arrayIDIntervento = []
        var interventiSorted = []
      
        arr1.map(ticket => {
          if(ticket.stato == "finito" || ticket.stato == "ferie" || ticket.stato == "permessi" || ticket.stato == "malattia"){
            arrayIDIntervento.push(ticket.idIntervento)
          }
        })
        arr2.map(item => {
          if(!arrayIDIntervento.includes(item.id)){
            interventiSorted.push(item)
          }
        })
        return interventiSorted
      }

    //Call API webservice
    const { getUserList, userList, createIntervento,getInterventoList, createPrograma, getMezziList, updateMezzi,getAvailableInterventi, GetFullInterventoList } = webservice()
    const { getUserData } = userData()//Token,idcontratto
    const { getInterventoListData,getAnagraficaData,getMezziListData,getFullProgramma,getAvInterventi } = anagraficaData()
    const [intData,setIntData] = React.useState([])
    const [mezziList,setMezzi] = React.useState([])
    React.useEffect(() => {
        async function initialData(){
            //await getAvailableInterventi(getUserData().Token)
            await getMezziList( getUserData().Token)
            await getUserList(getUserData().Token)
            await GetFullInterventoList( getUserData().Token )
            setIntData(getInterventoListData())
            await delay(1000)
            setMezzi( getMezziListData() )
            setToShow( sortInterventi(getFullProgramma(),getInterventoListData()) )
        }
        initialData()
    }, [])

    //BLOCCO FUNZIONI E STATI MODIFICA DATA
    const [richiestaData,setRichiestaData] = useState({
        tipologia:null,
        tempo:null,
        dataInizio:'',
        dataFine:null,
        priorita:{
            attivo:false,
            ferie:false,
            permessi:false,
            malattia:false
        },
        ragSociale:null,
        descrizione:null
    })
    function handleChangeRichiesta(e,target){
        console.log(typeof e.target.value)
        let val = e.target.value;
        setRichiestaData( prevState => ({
            ...prevState,
            [target]:val
        }) )
    }
    const [currentStato,setCurrentStato] = React.useState('')
    function handlePriorita(e,target){
        let val = e.target.value;
        setCurrentStato(target)
        let priorita = richiestaData.priorita
        priorita.attivo = false
        priorita.ferie = false
        priorita.permessi = false
        priorita.malattia = false
        priorita[target] = true
        setRichiestaData( prevState => ({
            ...prevState,
            'priorita':priorita
        }) ) 
    }
    const [users,setUsers] = React.useState([])
    function handleInputChange(event,value){
        if (value !== undefined) {
            let cValue = userList.filter( data => (data.Nome + ' ' + data.Cognome) === value )
            if(cValue.length > 0){
                cValue = cValue[0]
                setRichiestaData( prevState => ({
                    ...prevState,
                    'ragSociale':cValue.id
                }) )
                let tmp = users
                tmp.push(cValue)
                setUsers(tmp)
                console.log(users)
            }
        }
    }
    function handleTipologiaChange(event,value){
        if(value !== null && value !== undefined){
            let tmp = value.split('|')[0].split('.')
        setRichiestaData( prevState => ({
            ...prevState,
            'tipologia':tmp[1]
        }) ) 
        }
    }
    const [usedMezzi,setUsedMezzi] = React.useState()
    function handleMezziChange(event,value){
        if(value !== null && value !== undefined){
            setUsedMezzi(value)
            console.log(usedMezzi)
        }
    }

    //Display only available interventi
    const [toShow,setToShow] = React.useState([])
    const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  console.log(user)
    const prova = <img src={require('../../../assets/images/vehicleOne.png') }/>
    const delay = ms => new Promise(res => setTimeout(res, ms));
    return (
        <>
                <Dialog open={flag} fullWidth={true} maxWidth={'lg'} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"><Typography variant='h5'>Richiesta di Attività</Typography></DialogTitle>
                    <DialogContent>
                        {flag === true ? (
                            <Box className={classes.mainTab}>
                            <Box className={classes.mainRow} >
                                <Box className={classes.mainColumn} style={{width:'45%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Cerca Intervento</Typography>
                                    <Autocomplete
                                    id="combo-box-demo"
                                    options={toShow}
                                    getOptionLabel={(option) => (option.tipologia !== 'manutenzione' ? 'INT.' : 'MAN.') + option.id + '| ' + option.descrizione}
                                    onInputChange={handleTipologiaChange}
                                    style={{ width: '100%' }}
                                    renderInput={(params) => <TextField style={{color:'#00ADA2'}}{...params} label="Interventi" variant="outlined" />}
                                    />
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'45%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Seleziona Mezzo</Typography>
                                    <Autocomplete
                                    multiple
                                    id="combo-box-demo"
                                    options={mezziList !== undefined ? mezziList : null}
                                    //getOptionDisabled={(option) => option.assigned !== null}   + ( option.assigned > 0 ? ' - Assegnato: M' + option.assigned : '')
                                    getOptionLabel={(option) => option.targa}
                                    renderOption={ (option) => (
                                        <Fragment>
                                            {option.type == 2 ? (
                                                <img src={require('../../../assets/images/vehicleOne.png')} style={{height:24,marginRight:20}} />
                                            ) : (
                                                <img src={require('../../../assets/images/vehicleTwo.png')} style={{height:24,marginRight:20}} />
                                            )}
                                            {option.targa}
                                        </Fragment>
                                     ) }
                                    onInputChange={handleMezziChange}
                                    style={{ width: '100%' }}
                                    renderInput={(params) => <TextField style={{color:'#00ADA2'}}{...params} label="Mezzi" variant="outlined" />}
                                    />
                                </Box>
    
                            </Box>

                            <Box className={classes.mainRow}>
                                <Box className={classes.mainColumn} style={{width:'25%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} > Attivo/ Non Attivo</Typography>
                                    <Box style={{display:'flex',flexDirection:'column'}}>
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.attivo}
                                                onChange={e=> handlePriorita(e,'attivo')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Attivo"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.ferie}
                                                onChange={e=> handlePriorita(e,'ferie')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Ferie"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.permessi}
                                                onChange={e=> handlePriorita(e,'permessi')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Permessi"
                                        />
                                        <FormControlLabel
                                            className={classes.controlLabel}
                                            control={
                                            <Checkbox
                                                checked={richiestaData.priorita.malattia}
                                                onChange={e=> handlePriorita(e,'malattia')}
                                                name="checkedB"
                                                color="primary"
                                            />
                                            }
                                            label="Malattia"
                                        />
                                    </Box>
                                </Box>
                                <Box className={classes.mainColumn} style={{width:'20%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} >* Ore di Lavoro</Typography>
                                    <TextField
                                        className={classes.defInput}
                                        disabled={richiestaData.priorita.attivo === false ? true : false}
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
                                        value={richiestaData.dataInizio !== '' ? richiestaData.dataInizio : date}
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
                            <Box className={classes.mainColumn} style={{width:'70%'}}>
                                    <Typography variant='subtitle1' className={classes.columnLabel} style={{marginBottom:0}} >* Assegna Intervento</Typography>  
                                    <FormControl variant="outlined" style={{width:'100%'}}>
                                    <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip"
                                        multiple
                                        style={{width:'50%'}}
                                        value={personName.length > 0 ? personName : [user.id]}
                                        onChange={handleChange}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={userList.filter(user => user.id == value)[0].Nome + ' ' + userList.filter(user => user.id == value)[0].Cognome} className={classes.chip} />
                                            ))}
                                            </div>
                                        )}
                                        >
                                        {userList.map((name) => (
                                            <MenuItem key={name.Nome + ' ' + name.Cognome} value={name.id}>
                                            {name.Nome + ' ' + name.Cognome}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                        </FormControl>
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
                                onClick={ async e=>{
                                    e.preventDefault()
                                    
                                    if(personName.length > 0){
                                        personName.map(async utente => {
                                            if(currentStato == 'Attivo' || currentStato == 'attivo'){
                                                async function sendData(){
                                                    let contrID = ( getInterventoListData().filter(ee => ee.id == richiestaData.tipologia)[0].byContratto )
                                                    await createPrograma(getUserData().Token,
                                                    richiestaData.tipologia,
                                                    currentStato,
                                                    richiestaData.tempo,
                                                    (richiestaData.dataInizio == '' ? date : richiestaData.dataInizio),
                                                    richiestaData.dataFine,
                                                    utente,
                                                    richiestaData.descrizione,
                                                    contrID,
                                                    date)
            
                                                    await delay(500)
                                                    let toUp={
                                                        token:getUserData().Token,
                                                        assigned:richiestaData.tipologia,
                                                        targa:usedMezzi
                                                    }
                                                    console.log(richiestaData,toUp)
                                                    await updateMezzi( toUp )
                                                    await delay(500)
                                                    window.location.reload(false)
                                                }
                                                sendData()
                                            }else{
                                                async function sendPer(){
                                                    await createPrograma(getUserData().Token,
                                                    0,
                                                    currentStato,
                                                    0,
                                                    richiestaData.dataInizio,
                                                    richiestaData.dataFine,
                                                    utente,
                                                    richiestaData.descrizione,
                                                    0,
                                                    date)
                                                    await delay(500)
                                                }
                                                sendPer()
                                                await delay(500)
                                                window.location.reload(false)
                                                
                                            }
                                           setUsers([])
                                        })
                                    }else{
                                        if(currentStato == 'Attivo' || currentStato == 'attivo'){
                                            async function sendData(){
                                                let contrID = ( getInterventoListData().filter(ee => ee.id == richiestaData.tipologia)[0].byContratto )
                                                await createPrograma(getUserData().Token,
                                                richiestaData.tipologia,
                                                currentStato,
                                                richiestaData.tempo,
                                                (richiestaData.dataInizio == '' ? date : richiestaData.dataInizio),
                                                richiestaData.dataFine,
                                                user.id,
                                                richiestaData.descrizione,
                                                contrID,
                                                date)
        
                                                await delay(500)
                                                let toUp={
                                                    token:getUserData().Token,
                                                    assigned:richiestaData.tipologia,
                                                    targa:usedMezzi
                                                }
                                                console.log(richiestaData,toUp)
                                                await updateMezzi( toUp )
                                                await delay(500)
                                                window.location.reload(false)
                                            }
                                            sendData()
                                        }else{
                                            async function sendPer(){
                                                console.log(getUserData().Token,
                                                0,
                                                currentStato,
                                                0,
                                                richiestaData.dataInizio,
                                                richiestaData.dataFine,
                                                user.id,
                                                richiestaData.descrizione,
                                                0,
                                                date)
                                                await delay(500)
                                            }
                                            sendPer()
                                            await delay(500)
                                            window.location.reload(false)
                                            
                                        }
                                       setUsers([])
                                    }
                                
                                }}
                                endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                                >
                                Salva e Chiudi
                                </Button>
                            </Box>
                        </Box>
                   
                        ) : null}
                         </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>

        </>
    )
}

export default AggiungiAttivita
