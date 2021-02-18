import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Box, FormControl, Grid, MenuItem, Select, TextField, Typography, Checkbox } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import userData from './data/userData';
import webservice from '../api/webservice';
import Collapse from '@material-ui/core/Collapse';
import PhoneIcon from '@material-ui/icons/Phone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  userForm:{
    marginTop:40
  },
  rootS: {
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
  boxLeftS: {
    backgroundColor:'white',
    flexDirection:'row',
    flex:1
  },
  boxRightS: {
    backgroundColor:'white',
    flexDirection:'row',
    flex:1
  },
  formS:{
    flexDirection:'column',
    display:'flex',
    flex:1
  },
  formRowS: {
    display:'flex',
    padding:10,
    paddingLeft:50,
    paddingTop:15,
    paddingBottom:15,
    alignItems:'center',
    width:'40%'
  },
  formRowNameS: {
    width:'30%',
    marginTop:15,
    fontSize:18,
    fontWeight:'bold'
  },
  formRowInputS: {
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
  //SPACER
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  topIMG:{
    width:32,
    alignItems:'flex-end'
  },
}))


const EditAccount = ({flag,handleClose,item, sendRef}) => {
    const classes = useStyles();
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [userInfo,setUserInfo] = useState({
      name: '',
      cognome: '',
      email: '',
      confermaemail: '',
      password: '',
      confermapassword: '',
      societa: '',
      posizione: '',
      tipologia: '',
      telefono: '',
      ofCliente:''
    })




    const { getUserData, getCurrentPermissionEdit } = userData()
    const { updateUser, getUserList,clientList, getClientList, updateUserPermission } = webservice()

    const [pex, setPex] = useState({
      listacontratti:null, //Permessi Contratti
      nuovocontratto:null,
      anagraficacontratto:null,
      anagraficahome:null,
      anagraficareport:null,
      anagraficasituazione:null,
      anagraficadocumenti:null,
      anagraficaimpostazioni:null,
      contrattoprogramma:null,
      contrattoattivita:null,
      listaclienti:null, //Permessi Clienti
      nuovocliente:null,
      anagraficaclienti:null,
      anagraficahomecliente:null,
      anagraficareportcliente:null,
      anagraficadocumenticliente:null,
      anagraficaimpostazionicliente:null,
      listaticket:null, //Permessi Ticket
      reportticket:null, 
      listacommesse:null, //Permessi commesse
      nuovacommessa:null,
      anagraficacommessa:null
  
    })
    console.log(getCurrentPermissionEdit())
    const [openR, setOpenR] = React.useState(true);
    const [openL, setOpenL] = React.useState(true);

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

    function useForceUpdate() {
      let [value, setState] = React.useState(true);
      return () => setState(!value);
    }
    //F update
    let forceUpdate =  useForceUpdate()

    //REINTEGRATING VALUES IF COMPILED ON BACK BUTTON
  React.useEffect(() => {
    getClientList('dd')
    console.log('USER', item)
 }, [])
  //CHANGING STATE FUNCTION
  function handleChange(e,target) {
    e.preventDefault();
    let value = e.target.value;
    setUserInfo(prevState => ({
      ...prevState,
      [target]: value 
    }));
  }
    console.log(item)
    
    const [ error, setError ] = useState(0)
  return (
    <div>
      <Dialog
        open={flag}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        maxWidth={'lg'}
        onClose={e=> {

         
          handleClose()
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{borderBottomWidth:1,borderBottomStyle:'solid',borderBottomColor:'#e8e8e8'}} id="alert-dialog-slide-title">
            <Box style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                Modifica Account
                <CloseIcon onClick={e => {
                  handleClose()
                  }}/>
            </Box>
        </DialogTitle>
        <DialogContent >
        <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>DATI UTENTE :</Typography>
          {error == 1 ? <Typography className={classes.errorBasic}>* Compila tutti i campi obbligatori</Typography> : null}
          <Grid style={{backgroundColor:'white',flex:1,height:'100%'}} container spacing={0}>

              <form className={classes.formS} noValidate autoComplete="off">
                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRowS} style={{order:1}}>
                    <Typography className={classes.formRowNameS}>* Nome</Typography>
                    <TextField error={error == 2 ? true : false} helperText={error == 2 ? 'Il nome deve essere lungo almeno 2 carattere e massimo 25' : null} value={userInfo.name == '' ? item.Nome : userInfo.name} onChange={(e) => handleChange(e,'name')} className={classes.formRowInput} id="name-input" />
                  </div>
                  <div className={classes.formRowS} style={{order:2}}>
                    <Typography className={classes.formRowNameS}>* Cognome</Typography>
                    <TextField error={error == 2 ? true : false} helperText={error == 2 ? 'Il cognome deve essere lungo almeno 2 carattere e massimo 25' : null} value={userInfo.cognome == '' ? item.Cognome : userInfo.cognome} onChange={(e) => handleChange(e,'cognome')} className={classes.formRowInput} id="standard-basic"  />
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}>* Email</Typography>
                    <TextField  error={error == 3 || error == 5 ? true : false} helperText={error == 3 ? "Controlla di avere scritto bene l'email" : ( error == 5 ? "Email esistente" : null ) } value={userInfo.email == '' ? item.Email : userInfo.email} onChange={(e) => handleChange(e,'email') } className={classes.formRowInput}   />
                  </div>
                  <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}>* Conferma Email</Typography>
                    <TextField error={error == 3 ? true : false} helperText={error == 3 ? "Controlla di avere scritto bene l'email" : null} value={userInfo.confermaemail == '' ? item.Email : userInfo.confermaemail} onChange={(e) => handleChange(e,'confermaemail')} className={classes.formRowInput} id="standard-basic" />
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}>* Password</Typography>
                    <TextField type="password" error={error == 4 ? true : false} helperText={error == 4 ? "Le password non combaciano oppure non contiene minimo 8 caratteri,un numero e una lettere maiuscola" : null} value={userInfo.password} onChange={(e) => handleChange(e,'password')} className={classes.formRowInput}   />
                  </div>
                  <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}>* Conferma Password</Typography>
                    <TextField  type="password" error={error == 4 ? true : false} helperText={error == 4 ? "Le password non combaciano oppure non contiene minimo 8 caratteri,un numero e una lettere maiuscola" : null} value={userInfo.confermapassword} onChange={(e) => handleChange(e,'confermapassword')}  className={classes.formRowInput} id="standard-basic" />
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}>* Società</Typography>
                    <TextField value={userInfo.societa == '' ? item.Societa : userInfo.societa} onChange={(e) => handleChange(e,'societa')} className={classes.formRowInput} id="standard-basic"  />
                  </div>
                  <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}>* Tipologia Account</Typography>
                    <FormControl className={classes.formControlS} style={{width:'30%'}}>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => handleChange(e,'tipologia')}
                        displayEmpty={true}
                        value={userInfo.tipologia}
                      >
                        <MenuItem value="" disabled={true}>Account {item.Tipologia}</MenuItem>
                        <MenuItem value={'Cliente'}>Account Cliente</MenuItem>
                        <MenuItem value={'Admin'}>Account Admin</MenuItem>
                        <MenuItem value={'Superadmin'}>Account SuperAdmin</MenuItem>
                        <MenuItem value={'Master'}>Account Master</MenuItem>
                      </Select>
                    </FormControl>

                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}> Posizione</Typography>
                    <TextField value={userInfo.posizione == '' ? item.Ruolo : userInfo.posizione} onChange={(e) => handleChange(e,'posizione')} className={classes.formRowInput} id="standard-basic" 
                    />
                  </div>
                  <div className={classes.formRowS}>
                    <Typography className={classes.formRowNameS}>  Telefono</Typography>
                    <Grid style={{marginLeft:'2.5vw'}}container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PhoneIcon />
                      </Grid>
                      <Grid item>
                        <TextField value={userInfo.telefono == '' ? item.Telefono : userInfo.telefono} onChange={(e) => handleChange(e,'telefono')}  id="input-with-icon-grid"
                         />
                      </Grid>
                    </Grid>
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  {item.Tipologia === 'Cliente' ? (
                    <div className={classes.formRowS} >
                    <Typography className={classes.formRowNameS}>* Cliente da associare</Typography>
                    <FormControl className={classes.formControlS} style={{width:'30%'}}>
                      <Select
                      
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => handleChange(e,'ofCliente')}
                        displayEmpty
                        value={userInfo.ofCliente}

                      >
                        <MenuItem value="" disabled={true}>{clientList !== undefined && clientList.filter(ee => ee.id === item.ofCliente)[0] !== undefined ? clientList.filter(ee => ee.id === item.ofCliente)[0].rSociale : 'Caricamento...'} </MenuItem>
                        { clientList !== undefined ? (
                          clientList.map( item => {
                            return <MenuItem value={item.id}>{item.rSociale}</MenuItem>
                          } )
                        ) : null}
                        
                      </Select>
                    </FormControl>

                  </div>
                
                  ) : null}
                  
                </Box>

                <Box style={{width:'100%'}}>

                </Box>
                <Typography style={{padding:15,marginTop:'3%',fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>PERMESSI :</Typography>
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
                      checked={ getCurrentPermissionEdit()!== null ? pex.listacontratti == null ? getCurrentPermissionEdit().listaContratto : pex.listacontratti : pex.listacontratti}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.nuovocontratto == null ? getCurrentPermissionEdit().nuovoContratto : pex.nuovocontratto : pex.nuovocontratto}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficacontratto == null ? getCurrentPermissionEdit().anagraficaContratto : pex.anagraficacontratto : pex.anagraficacontratto}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficahome == null ? getCurrentPermissionEdit().anagraficaHomeContratto : pex.anagraficahome:  pex.anagraficahome}
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
                      checked={getCurrentPermissionEdit()!== null ?pex.anagraficareport == null ? getCurrentPermissionEdit().anagraficaReportContratto : pex.anagraficareport : pex.anagraficareport}
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
                      checked={getCurrentPermissionEdit()!== null ?pex.anagraficasituazione == null ? getCurrentPermissionEdit().anagraficaSituazioneContratto : pex.anagraficasituazione : pex.anagraficasituazione}
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
                      checked={getCurrentPermissionEdit()!== null ?pex.anagraficadocumenti == null ? getCurrentPermissionEdit().anagraficaDocumentiContratto : pex.anagraficadocumenti : pex.anagraficadocumenti}
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
                      checked={getCurrentPermissionEdit()!== null ?pex.anagraficaimpostazioni == null ? getCurrentPermissionEdit().anagraficaImpostazioniContratto : pex.anagraficaimpostazioni : pex.anagraficaimpostazioni}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.contrattoprogramma == null ? getCurrentPermissionEdit().programmaContratto : pex.contrattoprogramma : pex.contrattoprogramma}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.contrattoattivita == null ? getCurrentPermissionEdit().attivitaContratto : pex.contrattoattivita : pex.contrattoattivita}
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
                      checked={getCurrentPermissionEdit()!== null ?pex.listaclienti == null ? getCurrentPermissionEdit().listaClienti : pex.listaclienti : pex.listaclienti}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.nuovocliente == null ? getCurrentPermissionEdit().nuovoCliente : pex.nuovocliente : pex.nuovocliente}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficaclienti == null ? getCurrentPermissionEdit().anagraficaCliente : pex.anagraficaclienti : pex.anagraficaclienti}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficahomecliente == null ? getCurrentPermissionEdit().anagraficaHomeCliente : pex.anagraficahomecliente : pex.anagraficahomecliente}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficareportcliente == null ? getCurrentPermissionEdit().anagraficaReportCliente : pex.anagraficareportcliente : pex.anagraficareportcliente}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficadocumenticliente == null ? getCurrentPermissionEdit().anagraficaDocumentiCliente : pex.anagraficadocumenticliente : pex.anagraficadocumenticliente}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficaimpostazionicliente == null ? getCurrentPermissionEdit().anagraficaImpostazioniCliente : pex.anagraficaimpostazionicliente : pex.anagraficaimpostazionicliente}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.listaticket == null ? getCurrentPermissionEdit().listaTicket : pex.listaticket : pex.listaticket}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.reportticket == null ? getCurrentPermissionEdit().reportTicket : pex.reportticket : pex.reportticket}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.listacommesse == null ? getCurrentPermissionEdit().listaCommesse : pex.listacommesse : pex.listacommesse}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.nuovacommessa == null ? getCurrentPermissionEdit().nuovaCommessa : pex.nuovacommessa : pex.nuovacommessa}
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
                      checked={getCurrentPermissionEdit()!== null ? pex.anagraficacommessa == null ? getCurrentPermissionEdit().anagraficaCommessa : pex.anagraficacommessa : pex.anagraficacommessa}
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

          
              

              </form>
          </Grid>
          
        </DialogContent>
        <DialogActions>
          {/*<Button className={classes.stdBtn}variant="outlined" onClick={ e => {
              let toUp={
                  Token:getUserData().Token,
                  Nome: data.Nome === null ? item.Nome : data.Nome,
                  Cognome: data.Cognome === null ? item.Cognome : data.Cognome,
                  Email: data.Email === null ? item.Email : data.Email,
                  Ruolo: data.Ruolo === null ? item.Ruolo : data.Ruolo,
                  Societa: data.Societa === null ? item.Societa : data.Societa,
                  Telefono: data.Telefono === null ? item.Telefono : data.Telefono,
                  Tipologia: data.Tipologia === null ? item.Tipologia : data.Tipologia,
                  id: item.id
              }
              async function sendData(){
                  await updateUser(toUp)
                  await getUserList('dd')
                  sendRef()
                  handleClose()
              }
              sendData()
              
          }}>
            Salva
          </Button>*/}
          <Button
            variant="contained"
            color="primary"
            fullWidth={false}
            className={classes.button}
            onClick={ () => {
              let toUp={
                Token:getUserData().Token,
                Nome: userInfo.name === '' ? item.Nome : userInfo.name,
                Cognome: userInfo.cognome === '' ? item.Cognome : userInfo.cognome,
                Email: userInfo.email === '' ? item.Email : userInfo.email,
                Ruolo: userInfo.posizione === '' ? item.Ruolo : userInfo.posizione,
                Societa: userInfo.societa === '' ? item.Societa : userInfo.societa,
                Telefono: userInfo.telefono === '' ? item.Telefono : userInfo.telefono,
                Tipologia: userInfo.tipologia === '' ? item.Tipologia : userInfo.tipologia,
                ofCliente: userInfo.ofCliente === '' ? item.ofCliente : userInfo.ofCliente,
                id: item.id
            }
            let setPex = {
              token:'dd',
              listaContratto: pex.listacontratti == null ? getCurrentPermissionEdit().listaContratto : pex.listacontratti,
              nuovoContratto: pex.nuovocontratto == null ? getCurrentPermissionEdit().nuovoContratto : pex.nuovocontratto,
              anagraficaContratto: pex.anagraficacontratto == null ? getCurrentPermissionEdit().anagraficaContratto : pex.anagraficacontratto,
              anagraficaHomeContratto: pex.anagraficahome == null ? getCurrentPermissionEdit().anagraficaHomeContratto : pex.anagraficahome,
              anagraficaReportContratto: pex.anagraficareport == null ? getCurrentPermissionEdit().anagraficaReportContratto : pex.anagraficareport,
              anagraficaSituazioneContratto: pex.anagraficasituazione == null ? getCurrentPermissionEdit().anagraficaSituazioneContratto : pex.anagraficasituazione,
              anagraficaDocumentiContratto: pex.anagraficadocumenti == null ? getCurrentPermissionEdit().anagraficaDocumentiContratto : pex.anagraficadocumenti,
              anagraficaImpostazioniContratto: pex.anagraficaimpostazioni == null ? getCurrentPermissionEdit().anagraficaImpostazioniContratto : pex.anagraficaimpostazioni,
              programmaContratto: pex.contrattoprogramma == null ? getCurrentPermissionEdit().programmaContratto : pex.contrattoprogramma,
              attivitaContratto: pex.contrattoattivita == null ? getCurrentPermissionEdit().attivitaContratto : pex.contrattoattivita,
              listaClienti: pex.listaclienti == null ? getCurrentPermissionEdit().listaClienti : pex.listaclienti,
              nuovoCliente: pex.nuovocliente == null ? getCurrentPermissionEdit().nuovoCliente : pex.nuovocliente,
              anagraficaCliente: pex.anagraficaclienti == null ? getCurrentPermissionEdit().anagraficaCliente : pex.anagraficaclienti,
              anagraficaHomeCliente: pex.anagraficahomecliente == null ? getCurrentPermissionEdit().anagraficaHomeCliente : pex.anagraficahomecliente,
              anagraficaReportCliente: pex.anagraficareportcliente == null ? getCurrentPermissionEdit().anagraficaReportCliente : pex.anagraficareportcliente,
              anagraficaDocumentiCliente: pex.anagraficadocumenticliente == null ? getCurrentPermissionEdit().anagraficaDocumentiCliente : pex.anagraficadocumenticliente,
              anagraficaImpostazioniCliente: pex.anagraficaimpostazionicliente == null ? getCurrentPermissionEdit().anagraficaImpostazioniCliente : pex.anagraficaimpostazionicliente,
              listaTicket: pex.listaticket == null ? getCurrentPermissionEdit().listaTicket : pex.listaticket,
              reportTicket: pex.reportticket == null ? getCurrentPermissionEdit().reportTicket : pex.reportticket,
              listaCommesse: pex.listacommesse == null ? getCurrentPermissionEdit().listaCommesse : pex.listacommesse,
              nuovaCommessa:pex.nuovacommessa == null ? getCurrentPermissionEdit().nuovaCommessa : pex.nuovacommessa,
              anagraficaCommessa: pex.anagraficacommessa == null ? getCurrentPermissionEdit().anagraficaCommessa : pex.anagraficacommessa,
              idUser: item.id,
            }
            console.log(setPex)
            async function sendData(){
                await updateUser(toUp)
                await updateUserPermission(setPex)
                await getUserList('dd')
                sendRef()
                handleClose()
            }
            sendData()
              }
            }
            
              endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
            >
            Salva e Continua
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditAccount