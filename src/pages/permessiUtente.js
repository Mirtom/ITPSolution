import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import { Box, Button, Checkbox, Container, FormControlLabel, Typography } from "@material-ui/core"
import userData from './data/userData'
import Grid from '@material-ui/core/Grid';
import HorizontalLinearStepper from './components/HorizontalLinearStepper'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LinearProgress from '@material-ui/core/LinearProgress';
import webservice from '../api/webservice'
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { AccountBalance, SettingsCellOutlined } from '@material-ui/icons'
import contractData from './data/contractData'

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
    paddingTop:20
  },
  boxLeft: {
    backgroundColor:'white',
    flexDirection:'row',
    flex:1
  },
  boxMidLeft: {
    backgroundColor:'white',
    flexDirection:'row',
    flex:1
  },
  boxMidRight: {
    backgroundColor:'white',
    flexDirection:'row',
    flex:1
  },
  boxRight: {
    backgroundColor:'white',
    flexDirection:'column',
    display:'flex',
    flex:1,
    justifyContent:'space-between'

  },
  form:{
    flexDirection:'row',
    display:'flex',
    flex:1,
    paddingLeft:15,

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
    width:'25%',
    backgroundColor:'#00ADA2',
    flexDirection:'column',
    justifyContent:'flex-end',
    fontSize:15,
    letterSpacing:'.15em',
    fontWeight:'bold',
    float:'right',
    marginTop:30,
    marginBottom:30
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  topIMG:{
    width:32,
    alignItems:'flex-end'
  },
  buttonL: {
    width:'25%',
    backgroundColor:'#00ADA2',
    flexDirection:'row',
    justifyContent:'flex-start',
    fontSize:15,
    letterSpacing:'.15em',
    fontWeight:'bold',
    float:'left',
    marginTop:30,
    marginBottom:30
  },
}))

export default() => {
  const history = useHistory()

  function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();
  const delay = ms => new Promise(res => setTimeout(res, ms));

  //Data profile vars
  const { setNewUserPex,getUserMan, getNewUserFullData, getUserData, setNewUserStep, setDrawer,setCode,getCode, getNewUserID } = userData();
  const { createUser, registerError, getContractList, updateResponsabili,createUserPermission  } = webservice()
  const { getContractListData } = contractData()

  const token = getUserData().Token
  const classes = useStyles();
  const [pex, setPex] = useState({
    listacontratti:false, //Permessi Contratti
    nuovocontratto:false,
    anagraficacontratto:false,
    anagraficahome:false,
    anagraficareport:false,
    anagraficasituazione:false,
    anagraficadocumenti:false,
    anagraficaimpostazioni:false,
    contrattoprogramma:false,
    contrattoattivita:false,
    listaclienti:false, //Permessi Clienti
    nuovocliente:false,
    anagraficaclienti:false,
    anagraficahomecliente:false,
    anagraficareportcliente:false,
    anagraficadocumenticliente:false,
    anagraficaimpostazionicliente:false,
    listaticket:false, //Permessi Ticket
    reportticket:false, 
    listacommesse:false, //Permessi commesse
    nuovacommessa:false,
    anagraficacommessa:false

  })
  const [openR, setOpenR] = React.useState(true);
  const [openL, setOpenL] = React.useState(true);
  //LOADER
  const [loader,setLoader] = React.useState(false);

  const handleClickR = () => {
    setOpenR(!openR);
  };
  const handleClickL = () => {
    setOpenL(!openL);
  };
  //FUNZIONE GESTIONE PERMESSI JSON
  const handlePex = (e,name) => {
    setPex( prevState=>({
      ...prevState,
      [name]: (!pex[name])
    }));
  }

  function displayLoader() {
    if(loader === true)
      return <LinearProgress />
  }

  //GENERAZIONE CODICE UTENTE
  function makeid() {
    var result = '';
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  const code= makeid();

  var basedPadding = registerError === 0 ? 50 : 0;
  useEffect(() => {
    async function initialData(){
      setNewUserStep(2)
      await getContractList('dd')
      await delay(500)
    }
    initialData()
  }, )
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
        {displayLoader()}
          <div style={{width:'50%',margin:'0 auto'}}>
           <HorizontalLinearStepper></HorizontalLinearStepper>
          </div>
          
          <Typography style={{padding:15,paddingTop:30,paddingBottom:basedPadding,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>PERMESSI UTENTE :</Typography>
          {registerError === -1 ? <Typography style={{color:'red',paddingLeft:15,fontSize:14,paddingBottom:30}}> * Sessione scaduta, rieffettuare l'accesso </Typography> : null}
          {registerError === -2 ? <Typography style={{color:'red',paddingLeft:15,fontSize:14,paddingBottom:30}}> * Errore durante l'elaborazione della richieste, contattare un amministratore di rete </Typography> : null}
          {registerError === -3 ? <Typography style={{color:'red',paddingLeft:15,fontSize:14,paddingBottom:30}}> * Esiste già un utente con questa email registrato! </Typography> : null}
          <Grid style={{backgroundColor:'white',flex:1,height:'100%',width:'100%'}} container spacing={0}>

              <form className={classes.form} noValidate autoComplete="off">
                <Box className={classes.boxLeft}>
                  <Box style={{display:'flex',paddingRight:'30%'}}>
                    <Typography style={{marginRight:20}}>Contratti</Typography>
                    <img className={classes.topIMG} src={require('../assets/images/creaUtente/pexContratti.png')} />
                  </Box>
                  {/* PERMESSI CONTRATTI */}
                  <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={classes.root}
                >
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="listacontratti"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Lista Contratti" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="nuovocontratto"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Nuovo Contratto" />
                  </ListItem>
                  <ListItem button onClick={handleClickL}>
                    <ListItemIcon>
                    <Checkbox
                      name="anagraficacontratto"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Anagrafica Contratto" />
                    
                  </ListItem>
                  <Collapse in={openL} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficahome"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Home" ></ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficareport"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Report" ></ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficasituazione"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Situazione" ></ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficadocumenti"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Documenti" ></ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficaimpostazioni"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Impostazioni" ></ListItemText>
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="contrattoprogramma"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Programma" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="contrattoattivita"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Attività" />
                  </ListItem>
                </List>


                </Box>

                <Box className={classes.boxMidLeft}>
                  {/* PERMESSI Clienti */}
                  <Box style={{display:'flex',paddingRight:'30%'}}>
                    <Typography style={{marginRight:20}}>Clienti</Typography>
                    <img className={classes.topIMG} src={require('../assets/images/creaUtente/pexClienti.png')} />
                  </Box>
                  <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={classes.root}
                >
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="listaclienti"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Lista Clienti" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="nuovocliente"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Nuovo Cliente" />
                  </ListItem>
                  <ListItem button onClick={handleClickR}>
                    <ListItemIcon>
                    <Checkbox
                      name="anagraficaclienti"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Anagrafica Clienti" />
                    
                  </ListItem>
                  <Collapse in={openR} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficahomecliente"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Home" ></ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficareportcliente"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Report" ></ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficadocumenticliente"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Documenti" ></ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                        <Checkbox
                      name="anagraficaimpostazionicliente"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                        </ListItemIcon>
                        <ListItemText primary="Impostazioni" ></ListItemText>
                      </ListItem>
                    </List>
                  </Collapse>
                </List>

                </Box>

                <Box className={classes.boxMidRight}>
                  {/* PERMESSI Ticket */}
                  <Box style={{display:'flex',paddingRight:'30%'}}>
                    <Typography style={{marginRight:20}}>Ticket</Typography>
                    <img className={classes.topIMG} src={require('../assets/images/creaUtente/pexTicket.png')} />
                  </Box>
                  <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={classes.root}
                >
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="listaticket"
                      onChange={(e) => handlePex(e,e.target.name)}
                      uncontrolled
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Lista Ticket" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="reportticket"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Report Ticket" />
                  </ListItem>
                </List>

                </Box>

                <Box className={classes.boxRight}>
                  <Box style={{display:'flex',paddingRight:'30%'}}>
                    <Typography style={{marginRight:20}}>Commesse</Typography>
                    {/*<img className={classes.topIMG} src={require('../assets/images/creaUtente/pexClienti.png')} />*/}
                  </Box>
                  {/* PERMESSI Commesse */}
                  <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={classes.root}
                >
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="listacommesse"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Lista Commesse" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="nuovacommessa"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Nuova Commessa" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                    <Checkbox
                      name="anagraficacommessa"
                      uncontrolled
                      onChange={(e) => handlePex(e,e.target.name)}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </ListItemIcon>
                    <ListItemText primary="Anagrafica Commessa" />
                  </ListItem>
                </List>
                  
                </Box>
              
              
              </form>
          </Grid>
          <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
              <Button
              variant="contained"
              color="primary"
              fullWidth={false}
              className={classes.buttonL}
              startIcon={<ArrowBackIcon></ArrowBackIcon>}
              onClick={ e=> {
                e.preventDefault()
                history.push('/dashboard/informazioniUtente')
              } }
              >
              Indietro
            </Button>
            <Button
                      variant="contained"
                      color="primary"
                      fullWidth={false}
                      onClick={async () => {
                        let toUpContracts = []
                        if( getUserMan() !== undefined && getUserMan() !== null && getContractListData() !== undefined && getContractListData() != null ){
                          getContractListData().map( contract => {
                            getUserMan().map( cc => {
                              if(contract.id === cc.id){
                                toUpContracts.push(contract)
                              }
                            } )
                          } )
                        }

                        setLoader(true)
                        await setNewUserPex(pex)
                        var dataToSend = getNewUserFullData()
                        console.log(dataToSend[1][0])
                        var telefono = ''
                        dataToSend[1].telefono === '' ? telefono=null : telefono=dataToSend[1].telefono
                        await createUser(token,dataToSend[1][0].cognome,dataToSend[1][0].name,dataToSend[1][0].email,dataToSend[1][0].password,dataToSend[1][0].societa,dataToSend[1][0].posizione,dataToSend[1][0].tipologia,code,dataToSend[1][0].telefono,dataToSend[1][0].ofCliente)
                        await delay(1000)

                        if( toUpContracts.length > 0 ){
                          toUpContracts.map( async cc => {
                            let tmp = cc.account + ',' + getNewUserID()
                            let toUp ={
                              token:'dd',
                              responsabili:tmp,
                              idContratto:cc.id
                            }
                            await updateResponsabili(toUp)
                            await delay(100)
                          } )
                        }
                        setLoader(false)
                        await setCode(code)

                        //Setting user PEX
                        let setPex = {
                          listaContratto: pex.listacontratti !== undefined ? true : false,
                          nuovoContratto: pex.nuovocontratto !== undefined ? true : false,
                          anagraficaContratto: pex.anagraficacontratto !== undefined ? true : false,
                          anagraficaHomeContratto: pex.anagraficahome !== undefined ? true : false,
                          anagraficaReportContratto: pex.anagraficareport !== undefined ? true : false,
                          anagraficaSituazioneContratto: pex.anagraficasituazione !== undefined ? true : false,
                          anagraficaDocumentiContratto: pex.anagraficadocumenti !== undefined ? true : false,
                          anagraficaImpostazioniContratto: pex.anagraficaimpostazioni !== undefined ? true : false,
                          programmaContratto: pex.contrattoprogramma !== undefined ? true : false,
                          attivitaContratto: pex.contrattoattivita !== undefined ? true : false,
                          listaClienti: pex.listaclienti !== undefined ? true : false,
                          nuovoCliente: pex.nuovocliente !== undefined ? true : false,
                          anagraficaCliente: pex.anagraficaclienti !== undefined ? true : false,
                          anagraficaHomeCliente: pex.anagraficahomecliente !== undefined ? true : false,
                          anagraficaReportCliente: pex.anagraficareportcliente !== undefined ? true : false,
                          anagraficaDocumentiCliente: pex.anagraficadocumenticliente !== undefined ? true : false,
                          anagraficaImpostazioniCliente: pex.anagraficaimpostazionicliente !== undefined ? true : false,
                          listaTicket: pex.listaticket !== undefined ? true : false,
                          reportTicket: pex.reportticket !== undefined ? true : false,
                          listaCommesse: pex.listacommesse !== undefined ? true : false,
                          nuovaCommessa: pex.nuovacommessa !== undefined ? true : false,
                          anagraficaCommessa: pex.anagraficacommessa !== undefined ? true : false,
                          idUser: getNewUserID(),
                        }
                        console.log(setPex)
                        await createUserPermission(setPex)
                        await delay(500)
                        //history.push('/newUser/final')
                      }}
                      className={classes.button}
                      endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                      >
                      Salva e Continua
                    </Button>
          </Box>

        </Container>
      </Container>
      
       
    </div>
  )
}
