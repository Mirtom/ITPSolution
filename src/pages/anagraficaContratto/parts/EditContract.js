import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Box, Chip, Container, Typography } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Autocomplete from '@material-ui/lab/Autocomplete';
//Contract Data File
import contractData from '../../data/contractData';
import newContractValidator from '../../validations/newContractValidator';
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import anagraficaData from '../../data/anagraficaData';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  Header:{
    backgroundColor: "#00ADA2",
    height: 50,
    paddingTop:12
  },
  userForm:{
    marginTop:40
  },
  root: {
    backgroundColor:'white',
    color: "#6b6868",
    flexGrow: 1,
    flex:1,
    marginTop:'1%',
    width:'98%',
    paddingBottom:20,

    borderRadius:20,
    fontFamily:"Nunito Sans",
  },
  boxLeft: {
    backgroundColor:'white',
    flexDirection:'row',
    flex:1
  },
  boxRight: {
    backgroundColor:'white',
    flexDirection:'row',
    flex:1
  },
  form:{
    flexDirection:'row',
    display:'flex',
    flex:1
  },
  formRow: {
    display:'flex',
    padding:10,
    paddingLeft:50,
    paddingTop:15,
    paddingBottom:15,
    alignItems:'center'
  },
  formRowName: {
    width:'30%',
    marginTop:15,
    fontSize:18,
    fontWeight:'bold'
  },
  formRowInput: {
    width:'60%'
  },
  button: {
    width:'15%',
    backgroundColor:'#00ADA2',
    flexDirection:'row',
    justifyContent:'flex-end',
    fontSize:15,
    letterSpacing:'.15em',
    fontWeight:'bold',
    float:'right',
    marginTop:30,
    marginBottom:30
  },
  errorBasic: {
    color:'red',
    paddingLeft:15
  }
}))
function EditContract({data,status,handleClose}) {
  const history = useHistory();
  function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }
  //F update
  let forceUpdate =  useForceUpdate()
  //Data profile vars
  const { getNewContractData, getNewContractError, setNewContractClient, getContractType,getTabImpianti } = contractData()
  const { validateContract } = newContractValidator()
  const { setAnagraficaData } = anagraficaData()
  //Calling webservice for client list
  const { getClientList, clientList, userList, getUserList, updateContract,getTabTipoImpianti,getTipologieIntervento } = webservice()
  const { getUserData, setDrawer } = userData()

  const classes = useStyles();

  const [ error, setError ] = useState(0)
  const [contractInfo,setcontractInfo] = useState({
      token: getUserData().Token,
      titolo: data.titolo,
      numero: data.numero,
      cliente: data.cliente,
      nazionalita: data.nazionalita,
      indirizzo: data.indirizzo,
      datainizio: data.dataInizio.split('T')[0],
      datafine: data.dataFine.split('T')[0],
      descrizione: data.descrizione,
      localita: data.localita,
      codicepostale: data.cap,
      tipologia: data.tipologia,
      id: data.id
    })
  
  //CHANGING STATE FUNCTION
  function handleChange(e,target) {
    e.preventDefault();
    let value = e.target.value;
    setcontractInfo(prevState => ({
      ...prevState,
      [target]: value 
    }));
  }

  //OPZIONI ACCOUNT FORM
  const accountJSON = [
    {name:'Giancarlo Giacomino'},
    {name:'Alessio Bianchini'},
    {name:'Mauro Rossi'},
    {name:'Beatrice Stefani'},
  ]
  //CHANGING STATE FUNCTION AUTOCOMPLETE .. CLIENTI .. ACCOUNT
  function handleInputChangeClient(event, value) {
    setcontractInfo(prevState => ({
        ...prevState,
        ['cliente']: value 
      }));
      console.log(value)
      if(value !== ""){
        setNewContractClient(value)
        let tmp = clientList.filter(item => item.id == contractInfo.cliente )[0].rSociale
        let tmpSaved = contractInfo
        tmpSaved.cliente = tmp
        tmpSaved.indirizzo = tmp[0].indirizzo
        tmpSaved.nazionalita = tmp[0].nazionalita
        tmpSaved.localita = tmp[0].localita
        tmpSaved.codicepostale = tmp[0].cap
        setcontractInfo(tmpSaved)
        forceUpdate()
      }   
  }

  function handleInputChangeAccount(event, value) {
    let [idAcc] = userList.filter( user => user.Nome + ' ' + user.Cognome === value )
    setcontractInfo(prevState => ({
        ...prevState,
        ['account']: idAcc.id 
      }));
  }
  const [CType,setCType] = React.useState([])

   //REINTEGRATING VALUES IF COMPILED ON BACK BUTTON
   useEffect(() => {
    getUserList(getUserData().Token)
    getTabTipoImpianti(getUserData().Token)
    getClientList( getUserData().Token )
    if(data !== undefined && data !== null){
      if( data.tipologia.split(',').length > 1 ){
        data.tipologia.split(',').map( e => {
  
          setTipologia(data.tipologia.split(','))
        } )
      }else{
        setTipologia(data.tipologia.split(',')[1])
      }
      setCType(getTabImpianti())
    }
  }, [])

  //CHIP TIPOLOGIA ZONE
  const [tipologia,setTipologia] = React.useState()
  function imageSelector (type){
    switch(type){
      case 'Elettrico':
        return require('../../../assets/images/anagraficaContratto/tipologia/elettrico.png')
        break;
      case 'Antincendio':
        return require('../../../assets/images/anagraficaContratto/tipologia/antincendio.png')
        break;
      case 'Sicurezza':
        return require('../../../assets/images/anagraficaContratto/tipologia/sicurezza.png')
        break;
        case 'Tecnologico':
          return require('../../../assets/images/anagraficaContratto/tipologia/tecnologico.png')
        break;
    }
  }
  const handleRem = (chipToDelete) => () => {
    setTipologia((chips) => chips.filter((chip) => chip !== chipToDelete));
    forceUpdate()
  };


  return (

        <Dialog
            open={status}
            TransitionComponent={Transition}
            keepMounted
            fullScreen={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>

                <Container className={classes.root} maxWidth='False'>
        
                  <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>Dati Contratto :</Typography>
                  {error == 1 ? <Typography className={classes.errorBasic}>Compila tutti i campi obbligatori *</Typography> : null}
                  <Grid style={{backgroundColor:'white',flex:1,height:'100%'}} container spacing={0}>

                      <form className={classes.form} noValidate autoComplete="off">
                        <Box className={classes.boxLeft}>

                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Titolo del Contratto *</Typography>
                            <TextField error={error == 3 ? true : false} helperText={error == 3 ? 'Titolo troppo lungo, massimo 20 caratteri' : 'Testo da inserire come suggerimento'} value={contractInfo.titolo} onChange={(e) => handleChange(e,'titolo')} className={classes.formRowInput} id="name-input"  />
                          </div>
                          
                            <div className={classes.formRow}>
                              <Typography className={classes.formRowName}>Numero Contratto</Typography>
                              <TextField  value={contractInfo.numero} onChange={(e) => handleChange(e,'numero') } className={classes.formRowInput} id="standard-basic" />
                            </div>
                          
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Nazionalità *</Typography>
                            <TextField value={contractInfo.nazionalita} onChange={(e) => handleChange(e,'nazionalita')} className={classes.formRowInput} id="standard-basic" />
                          </div>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Indirizzo *</Typography>
                            <TextField value={contractInfo.indirizzo} onChange={(e) => handleChange(e,'indirizzo')} helperText="Testo da inserire come suggerimento" className={classes.formRowInput} id="standard-basic" />
                          </div>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Inizio Contratto *</Typography>
                            <TextField
                            id="date"
                            value={contractInfo.datainizio}
                            onChange={ (e) => handleChange(e,'datainizio')  }
                            type="date"
                            defaultValue={data.dataInizio.split('T')[0]}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            className={classes.formRowInput}
                          />
                            </div>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Fine Contratto *</Typography>
                            <TextField
                            id="date"
                            value={contractInfo.datafine}
                            onChange={ (e) => handleChange(e,'datafine')  }
                            type="date"
                            defaultValue={data.dataFine.split('T')[0]}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.formRowInput}
                          /></div>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Descrizione *</Typography>
                            <TextField error={error == 2 ? true : false} helperText={error == 2 ? 'Descrizione troppo lunga, massimo 150 caratteri' : 'Testo da inserire come suggerimento'} value={contractInfo.descrizione} onChange={(e) => handleChange(e,'descrizione')} className={classes.formRowInput} id="standard-basic"  />
                          </div>
                          </Box>

                        <Box className={classes.boxRight}>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Località *</Typography>
                            <TextField error={error == 4 ? true : false} helperText={error == 4 ? "Le password non combaciano oppure non contiene minimo 8 caratteri,un numero e una lettere maiuscola" : 'Testo da inserire come suggerimento'} value={contractInfo.localita} onChange={(e) => handleChange(e,'localita')}  className={classes.formRowInput} id="standard-basic"  />
                          </div>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Codice Postale *</Typography>
                            <TextField value={contractInfo.codicepostale} onChange={(e) => handleChange(e,'codicepostale')} helperText="Testo da inserire come suggerimento" className={classes.formRowInput} id="standard-basic"  />
                          </div>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Tipologia *</Typography>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-helper-label">Tipologia</InputLabel>
                              <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                onChange={(e) => {
                                  e.preventDefault()
                                  let tmp
                                  if(tipologia == undefined){
                                    tmp = [e.target.value]
                                  }else{
                                    tmp = tipologia
                                    let tt = tmp.filter( item => item === e.target.value )
                                    if(tt.length > 0){
                                      tmp = tmp.filter( item => item !== e.target.value )
                                    }else{
                                      tmp.push(e.target.value)
                                    }
                                    
                                  }
                                  setTipologia(tmp)
                                  console.log(tipologia)
                                  handleChange(e,'tipologia')
                                  forceUpdate()
                                }}
                                displayEmpty
                                value={contractInfo.tipologia}
                              >
                                <MenuItem value="" disabled={true}>{data.tipologia}</MenuItem>
                                
                                {CType !== undefined && CType !== null ? (
                                  CType.map( tipologia => {
                                    return <MenuItem value={tipologia.Descr}>{tipologia.Descr}</MenuItem>
                                  } )
                                ) : null}
                              </Select>
                              <FormHelperText>Testo da inserire come suggerimento</FormHelperText>
                            </FormControl>

                          </div>
                          <div className={classes.formRow}>
                          {tipologia!== undefined ? (
                            tipologia.map( item => {
                              console.log(item)
                              return (
                                  <Chip
                                    icon={<img src={imageSelector(item)} style={{height:24,}}/>}
                                    label={item}
                                    key={item}
                                    onDelete={handleRem(item)}
                                    variant='outlined'
                                    style={{letterSpacing:'.1em', fontWeight:'bold',marginRight:15,marginBottom:15}}
                                  />
                                )
                            } )
                          ) : null}
                          </div>
                          <div className={classes.formRow}>
                            <Typography className={classes.formRowName}>Cliente Associato</Typography>
                            <TextField  value={clientList !== undefined ? clientList.filter(item => item.id == contractInfo.cliente )[0].rSociale : null} disabled={true}  className={classes.formRowInput} id="standard-basic"  />
                          </div>
                        
                        </Box>
                      

                      </form>
                  </Grid>

                </Container>

            </DialogContent>
            <DialogActions>
                  <Box style={{display:'flex',width:'100%',justifyContent:'space-between',paddingLeft:50,paddingRight:50}}>
                    <Button
                       variant="contained"
                       color="primary"
                       fullWidth={false}
                       onClick={ () => {
                         handleClose()
                       } }
                       className={classes.button}
                       startIcon={<ArrowBackIcon></ArrowBackIcon>}                       
                       >
                       Chiudi
                      </Button>

                      <Button
                       variant="contained"
                       color="primary"
                       fullWidth={false}
                       onClick={ () => {
                         console.log(contractInfo)
                         if(tipologia !== undefined){
                          let typeFin = ''
                          tipologia.map( i => {
                              if(typeFin === ''){
                                  typeFin = i
                              }else{
                                  typeFin = typeFin + ',' + i
                              }
                          })
                          contractInfo.tipologia = typeFin
                         }
                         
                          console.log(contractInfo,data)
                          let toUpdate = data
                          toUpdate.cap = contractInfo.codicepostale
                          toUpdate.dataFine = contractInfo.datafine
                          toUpdate.dataInizio = contractInfo.datainizio
                          toUpdate.descrizione = contractInfo.descrizione
                          toUpdate.indirizzo = contractInfo.indirizzo
                          toUpdate.localita = contractInfo.localita
                          toUpdate.nazionalita = contractInfo.nazionalita
                          toUpdate.numero = contractInfo.numero
                          toUpdate.tipologia = contractInfo.tipologia
                          toUpdate.titolo = contractInfo.titolo

                         updateContract(contractInfo)
                         setAnagraficaData( data )
                         forceUpdate()
                         handleClose()
                         
                         //history.push('/contratti/listaContratti')
                         //window.location.reload(false);
                       } }
                       className={classes.button}
                       style={{justifyContent:'flex-start'}}                      
                       endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                       >
                       Salva
                      </Button>
                  </Box>
            </DialogActions>
        </Dialog>

  )
}

export default EditContract
