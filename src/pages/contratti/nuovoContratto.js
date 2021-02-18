import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
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
import Autocomplete from '@material-ui/lab/Autocomplete';
//Contract Data File
import contractData from '../data/contractData';
import newContractValidator from '../validations/newContractValidator';
import webservice from '../../api/webservice';
import userData from '../data/userData';
import { useParams } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';


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
    flexDirection:'column',
    display:'flex',
    flex:1
  },
  formRow: {
    display:'flex',
    padding:10,
    paddingLeft:50,
    paddingTop:15,
    width:'50%',
    paddingBottom:15,
    alignItems:'center'
  },
  formRowName: {
    width:'20%',
    fontSize:18,
    fontWeight:'bold',
  },
  formRowInput: {
    width:'60%'
  },
  button: {
    width:'25%',
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
  },
  mBox:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start'
  }
}))
function Dashboard() {
  function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }
  //F update
  let forceUpdate =  useForceUpdate()
  //Data profile vars
  const { getNewContractData,setNewContractType,getNewContractType, getNewContractError, setNewContractClient, getContractType, getContractListData,getTabImpianti } = contractData()
  const { validateContract } = newContractValidator()
  //Calling webservice for client list
  const { getClientList, clientList, userList, getUserList, getTabTipoImpianti } = webservice()
  const { getUserData, setDrawer } = userData()

  const classes = useStyles();

  const [ error, setError ] = useState(0)
  const [contractInfo,setcontractInfo] = useState({
      titolo: '',
      numero: undefined,
      nazionalita: '',
      indirizzo: '',
      datainizio: '',
      datafine: '',
      descrizione: '',
      cliente: '',
      account: '',
      localita: '',
      codicepostale: '',
      tipologia: '',
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
    console.log(value)
    setcontractInfo(prevState => ({
        ...prevState,
        ['cliente']: value 
      }));
      console.log(value)
      if(value !== ""){
        let tmp = clientList.filter(item => item.rSociale == value )
        if(tmp[0] !== undefined){
          console.log(tmp[0])
          let tmpSaved = contractInfo
          tmpSaved.cliente = value
          tmpSaved.indirizzo = tmp[0].indirizzo
          tmpSaved.nazionalita = tmp[0].nazionalita
          tmpSaved.localita = tmp[0].localita
          tmpSaved.codicepostale = tmp[0].cap
          setcontractInfo(tmpSaved)
          forceUpdate()
        }
      }   
  }

  function handleInputChangeAccount(event, value) {
    if(value !== ""){
      let [idAcc] = userList.filter( user => user.Nome + ' ' + user.Cognome === value )
      if(idAcc !== undefined){
        setcontractInfo(prevState => ({
            ...prevState,
            ['account']: idAcc.id 
          }));
      }
    }
  }
  //REINTEGRATING VALUES IF COMPILED ON BACK BUTTON
  useEffect(() => {
    getTabTipoImpianti(getUserData().Token)
    let firstNum =  getContractListData().filter( e => e.isSub == 0 )
    let allNum 
    firstNum.map( (item,index) => {
        let cc = parseInt(item.numero.replace(/\D/g,''))
        if(index == 0){
          allNum = cc
        }else{
          if(allNum < cc){
            allNum = cc
          }
        }
    } )
    getUserList(getUserData().Token)
    getClientList( getUserData().Token )
    if (getNewContractData() !== null) {
        let data = getNewContractData()
        data.map ( item => {
        for(let i=0; i<10; i++){
          console.log( {[Object.keys(item)[i]]: Object.values(item)[i]} )
            setcontractInfo(prevState => ({
            ...prevState,
            [Object.keys(item)[i]]: Object.values(item)[i]
            }))
        } 
        } )
    }
    if( getNewContractType() !== null ){
      setTipologia( getNewContractType() )
    }
  }, [])

  //CHIP TIPOLOGIA ZONE
  const [tipologia,setTipologia] = React.useState()
  function imageSelector (type){
    switch(type){
      case 'Elettrico':
        return require('../../assets/images/anagraficaContratto/tipologia/elettrico.png')
        break;
      case 'Antincendio':
        return require('../../assets/images/anagraficaContratto/tipologia/antincendio.png')
        break;
      case 'Sicurezza':
        return require('../../assets/images/anagraficaContratto/tipologia/sicurezza.png')
        break;
        case 'Tecnologico':
          return require('../../assets/images/anagraficaContratto/tipologia/tecnologico.png')
        break;
    }
  }
  const handleRem = (chipToDelete) => () => {
    setTipologia((chips) => chips.filter((chip) => chip !== chipToDelete));
    forceUpdate()
  };


  return (
    <div style={{display:'flex'}}>
      <Sidebar></Sidebar>
      <Container maxWidth="False" style={{padding:0,margin:0,width:'100%',marginLeft:'-13%'}}>

        <Container maxWidth="False" className={classes.Header}>
        <MenuIcon style={{cursor:'pointer',color:'white'}} onClick={e => {
                      setDrawer()
                      forceUpdate()
                    }}/>  
        </Container>

        <Container className={classes.root} maxWidth='False'>
          <div style={{width:'50%',margin:'0 auto'}}>
          </div>
        
          {getContractType() === 'sub' ? (
          <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>NUOVO SUB IMPIANTO :</Typography>
          ) : <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>DATI CONTRATTO :</Typography>}
          {error == 1 ? <Typography className={classes.errorBasic}>Compila tutti i campi obbligatori *</Typography> : null}
          <Grid style={{backgroundColor:'white',flex:1,height:'100%'}} container spacing={0}>

              <form className={classes.form} noValidate autoComplete="off">

                <Box className={classes.mBox}>

                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Titolo del Contratto *</Typography>
                    <TextField error={error == 3 ? true : false} helperText={error == 3 ? 'Titolo troppo lungo, massimo 50 caratteri' : 'Testo da inserire come suggerimento'} value={contractInfo.titolo} onChange={(e) => handleChange(e,'titolo')} className={classes.formRowInput} id="name-input"  />
                  </div>
                  {console.log( clientList !== undefined ? clientList.filter(item => item.rSociale == contractInfo.cliente ) : undefined  )}
                  {getContractType() === 'sub' ? null : (
                    <div className={classes.formRow}>
                      <Typography className={classes.formRowName}>Cliente *</Typography>
                      <Autocomplete
                          id="combo-box-demo"
                          options={clientList}
                          getOptionLabel={(option) => option.rSociale}
                          onInputChange={ handleInputChangeClient }
                          className={classes.formRowInput}
                          value={clientList !== undefined ? ( getNewContractData() !== null && clientList.filter(cc=>cc.rSociale === getNewContractData()[0].cliente) !== null ? ( clientList.filter(cc=>cc.rSociale === getNewContractData()[0].cliente)[0] ) : clientList.filter(cc=>cc.rSociale === contractInfo.cliente)[0] ) : null}
                          renderInput={(params) => <TextField {...params}  variant="outlined" />}
                      />
                    </div>
                  )}
                </Box>
                  
                <Box className={classes.mBox}>
                  { getContractType() === 'sub' ? (
                    null
                  ) : (
                    <div className={classes.formRow}>
                      <Typography className={classes.formRowName}>Numero Contratto</Typography>
                      <TextField value={contractInfo.numero} onChange={(e) => handleChange(e,'numero') } className={classes.formRowInput} id="standard-basic" />
                    </div>
                  )}
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Account *</Typography>
                    <Autocomplete
                        id="combo-box-demo"
                        options={userList !== undefined ? userList.filter(e=> e.Tipologia === 'Admin' || e.Tipologia === 'Superadmin' || e.Tipologia === 'Master') : userList}
                        getOptionLabel={(option) => option.Nome + ' ' + option.Cognome}
                        className={classes.formRowInput}
                        onInputChange={ handleInputChangeAccount }
                        value={userList !== undefined ? ( getNewContractData() !== null && userList.filter(cc=>cc.id == getNewContractData()[0].account) !== null ? ( userList.filter(cc=> cc.id == getNewContractData()[0].account)[0] ) : userList.filter(cc=> cc.id == contractInfo.account)[0] ) : null}
                        renderInput={(params) => <TextField {...params}  variant="outlined" />}
                    />
                  </div>
                </Box>
                <Box className={classes.mBox}>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Nazionalità *</Typography>
                    <TextField value={contractInfo.nazionalita} onChange={(e) => handleChange(e,'nazionalita')} className={classes.formRowInput} id="standard-basic" />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Località *</Typography>
                    <TextField error={error == 4 ? true : false} helperText={error == 4 ? "Le password non combaciano oppure non contiene minimo 8 caratteri,un numero e una lettere maiuscola" : 'Testo da inserire come suggerimento'} value={contractInfo.localita} onChange={(e) => handleChange(e,'localita')}  className={classes.formRowInput} id="standard-basic"  />
                  </div>
                </Box>
                <Box className={classes.mBox}>
                  
                </Box>
                <Box className={classes.mBox}>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Indirizzo *</Typography>
                    <TextField value={contractInfo.indirizzo} onChange={(e) => handleChange(e,'indirizzo')} helperText="Testo da inserire come suggerimento" className={classes.formRowInput} id="standard-basic" />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Codice Postale *</Typography>
                    <TextField value={contractInfo.codicepostale} onChange={(e) => handleChange(e,'codicepostale')} helperText="Testo da inserire come suggerimento" className={classes.formRowInput} id="standard-basic"  />
                  </div>
                </Box>
                <Box className={classes.mBox}>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Inizio Contratto *</Typography>
                    <TextField
                    id="date"
                    value={contractInfo.datainizio}
                    onChange={ (e) => handleChange(e,'datainizio')  }
                    type="date"
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
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.formRowInput}
                  /></div>
                </Box>
                <Box className={classes.mBox}>
                  
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Descrizione *</Typography>
                    <TextField error={error == 2 ? true : false} helperText={error == 2 ? 'Descrizione troppo lunga, massimo 150 caratteri' : 'Testo da inserire come suggerimento'} value={contractInfo.descrizione} onChange={(e) => handleChange(e,'descrizione')} className={classes.formRowInput} id="standard-basic"  />
                  </div>
                  {console.log(tipologia)}
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Tipologia *</Typography>
                    <FormControl className={classes.formControl}>
                    
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
                        value={null}
                      >
                        {getTabImpianti()!== undefined && getTabImpianti()!==null ? (
                          getTabImpianti().map( tipologia => {
                            return (
                              <MenuItem value={tipologia.Descr}>{tipologia.Descr}</MenuItem>
                            )
                          } )
                        ) : null}
                        

                      </Select>
                    </FormControl>
                  </div>
                  
                  
                </Box>
                <Box style={{flexDirection:'row',justifyContent:'flex-start',marginLeft:'auto',width:'40%'}} >
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
                  </Box>
                <div style={{flexDirection:'row',justifyContent:'flex-end'}}>
                      <Button
                      variant="contained"
                      color="primary"
                      fullWidth={false}
                      onClick={ () => {
                        setNewContractType(tipologia)
                        validateContract(contractInfo)
                        setError(getNewContractError());
                      } }
                      className={classes.button}
                      endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                      
                      >
                      Salva e Continua
                    </Button>
                  </div>
                  


              </form>
          </Grid>

        </Container>
      </Container>
      
       
    </div>
  )
}

export default Dashboard
