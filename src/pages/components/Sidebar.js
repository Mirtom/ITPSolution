import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom";
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Button, Typography } from "@material-ui/core"
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Logo from '../../assets/images/logo-icon.png';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import userData from '../data/userData';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import contractData from '../data/contractData';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import webservice from '../../api/webservice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as EmailValidator from 'email-validator';
import * as passwordValidator from 'password-validator';
import anagraficaData from '../data/anagraficaData';

var schema = new passwordValidator();

schema
    .is().min(8)
    .has().uppercase()
    .has().digits(1)
    .has().not().spaces();


const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width:'inherit',
    },
    link : {
        textDecoration:'none',
        color: theme.palette.text.primary
    },
    sideTitle:{
        fontFamily: "Nunito Sans",
        color: "#3a3737"
    },
    logo:{
        width: "50px",
        height: "auto",
        margin: '0 auto',
        marginTop:5,
        marginBottom:5
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    iButton:{
      '&:hover': {
        backgroundColor:'transparent !important',
      }
    },
    confirmBtn:{
      backgroundColor:'#00ADA2',
      color:'white',
      letterSpacing:'.1em',
      textDecoration:'capitalize',
  },
  canBtn:{
    letterSpacing:'.1em',
    '&:hover':{
      background:'whitesmoke !important'
    }
  }
  }))
  

function Sidebar() {
    //Nested elements
    const classes = useStyles();
    const { changePassword, getTipologieIntervento, createTipologiaIntervento } = webservice()
    const [open, setOpen] = React.useState(false);
    const [openC,setOpenC] = React.useState(false);
    const { userList } = webservice()
    const { getTipoI } = anagraficaData()
    const { getDrawer, setDrawer,getUserData, getCurrentPermission } = userData()
    const { setContractType,setNewContractData } = contractData()
    const handleClick = () => {
      setOpen(!open);
    };

    function useForceUpdate(){
      const [value, setValue] = useState(0); // integer state
      return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();
  const [openPW,setOpenPW] = React.useState(false)
  const [openT,setOpenT] = React.useState(false)
  const [err,setErr] = React.useState(0)
  const [resetV,setResetV] = React.useState({
    psw:undefined,
    cPsw:undefined
  })
  function handleReset (e,target){
    let val = e.target.value
    setResetV(prevState => ({
      ...prevState,
      [target]:val
    }))
  }

  const [TTarget,setTTarget] = React.useState(0)
  const [NNarget,setNNarget] = React.useState('')
    function handleTTValue(event,value){
        if(value !== null && value !== undefined){
          setTTarget(value)
        }
    }

  React.useEffect(() => {
    async function initialData(){
      await getTipologieIntervento('dd')
    }
    initialData()
  }, [])
    return (
      <ClickAwayListener onClickAway={e => {
        if( getDrawer() === '0' ){
          setDrawer()
          forceUpdate()
        }
        }} mouseEvent="onMouseDown"
        disableReactTree={true}>
        <Drawer
        style={{width:'13%'}}
        variant="persistent"
        anchor="left"
        open={getDrawer() === '0' ? true : false}
        classes={{paper:classes.drawerPaper}}
      >
        {/* LOGO */}
        <Box style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
          <Link to="/dashboard"  className={classes.logo}>
            <img src={Logo} className={classes.logo}/>
          </Link>
          <IconButton onClick={e => {
            setDrawer()
            forceUpdate()
            }} className={classes.iButton}>
            <ChevronLeftIcon style={{fontSize:35,color:'#535353'}} />
          </IconButton>
          
        </Box>
        {/* CHANGE PASSWORD */}
        <Dialog open={openPW} onClose={e => setOpenPW(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifica Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Per effettuare la modifica devi inserire e confermare la password
            {err === 1 ? ( <Typography style={{fontSize:'.6vw',color:'red'}}>Le password non combaciano oppure non contengono minimo 8 caratteri,un numero e una lettere maiuscola</Typography> ) : null}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="pswN"
            label="Nuova password"
            type="password"
            fullWidth
            value={resetV.psw}
            onChange={ e => handleReset(e,'psw') }
          />
          <TextField
            
            margin="dense"
            id="pswN"
            label="Conferma nuova password"
            type="password"
            fullWidth
            value={resetV.cPsw}
            onChange={ e => handleReset(e,'cPsw') }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenPW(false)} className={classes.canBtn} variant={'outlined'}>
            Annulla
          </Button>
          <Button className={classes.confirmBtn} onClick={ e => {
            e.preventDefault()
            if(resetV.psw === resetV.cPsw && schema.validate(resetV.psw) ){
              setErr(0)
              let toUp ={
                token:getUserData().Token,
                id: getUserData().ID,
                psw:resetV.psw
              }
              changePassword(toUp)
              setOpenPW(false)
            }else{
              setErr(1)
            }
          } }>
            Conferma Modifica
          </Button>
        </DialogActions>
      </Dialog>
          {/* HANDLE TYPES */}
        <Dialog open={openT} onClose={e => setOpenT(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Aggiungi Tipologie Interventi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Devi selezionare la tipologia di contratto ed inserire il nome della tipologia d'intervento
            </DialogContentText>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              options={[{'id':1,'Nome':'Antincendio'},{'id':2,'Nome':'Elettrico'},{'id':3,'Nome':'Sicurezza'},{'id':4,'Nome':'Tecnologico'}]}
              getOptionLabel={(option) => option.Nome}
                onChange={handleTTValue}
              renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            />
          <TextField
            value={NNarget}
            onChange={e=>setNNarget(e.target.value)}
            margin="dense"
            id="pswN"
            label="Inserisci il Nome"
            type="text"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenT(false)} className={classes.canBtn} variant={'outlined'}>
            Annulla
          </Button>
          <Button disabled={ TTarget!== 0 && NNarget!== '' ? false : true } className={classes.confirmBtn} onClick={ async e => {
            e.preventDefault()
            let toUp = {
              token:'dd',
              byTipologia:TTarget.id,
              nome:NNarget
            }
            await createTipologiaIntervento(toUp)
            setOpenT(false)
          } }>
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>

        <Box style={{flexDirection:'column',
        justifyContent:'space-between',height:'100%'}}>
        <List>
          {/* User Menu Handle*/}
          {getUserData()!==null ? getUserData().Tipologia !== 'Utente' && getUserData().Tipologia !== 'Cliente' ? <Link to="/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltIcon></PeopleAltIcon>
              </ListItemIcon>
              <ListItemText className={classes.sideTitle} primary="Utenti"/>
          </ListItem>
          </Link>:null :null}
          {/* Clienti Menu Handle*/}
          {getCurrentPermission() !== null && getCurrentPermission().listaClienti === true  ? (<Link to="/clienti" className={classes.link}>

            <ListItem button >
              <ListItemIcon>
                <PeopleAltIcon></PeopleAltIcon>
                </ListItemIcon>
                <ListItemText className={classes.sideTitle} primary="Clienti"/>
                {/*openC ? <ExpandLess onClick={e=> setOpenC(false)}/> : <ExpandMore onClick={e=> setOpenC(true)}/>*/}
            </ListItem>
          {userList !== undefined && getUserData()!== undefined ? console.log(userList.filter(e=> e.id === getUserData().ID) ) : null}
          </Link>) : null }
          {/* Contratti Menu Handle*/}
          
          {getCurrentPermission() !== null && getCurrentPermission().listaContratto === true ? <Link to="/contratti/listaContratti" className={classes.link}>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <ReceiptIcon></ReceiptIcon>
              </ListItemIcon>
              <ListItemText className={classes.sideTitle} primary="Contratti"/>
          </ListItem>
          </Link> : null}
          {/* Attivita Menu*/}
          {getCurrentPermission() !== null && getCurrentPermission().attivitaContratto === true ? <Link to="/attivita" className={classes.link}>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <ReceiptIcon></ReceiptIcon>
              </ListItemIcon>
              <ListItemText className={classes.sideTitle} primary="Attivita"/>
          </ListItem>
          </Link> : null }
          {/* Programma Menu*/}
          {getCurrentPermission() !== null && getCurrentPermission().programmaContratto === true ? <Link to="/programma" className={classes.link}>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <ReceiptIcon></ReceiptIcon>
              </ListItemIcon>
              <ListItemText className={classes.sideTitle} primary="Programma"/>
          </ListItem>
          </Link> : null }
          {/* Ticket Menu Handle*/}
          
            {getCurrentPermission() !== null && getCurrentPermission().listaTicket === true ? (
              <Link to="/ticket" className={classes.link}>
                <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberIcon></ConfirmationNumberIcon>
                  </ListItemIcon>
                  <ListItemText className={classes.sideTitle} primary="Ticket"/>
              </ListItem>
              </Link>
            ) : null}
          
        </List>
          <List style={{position:'absolute',bottom:15,width:'100%'}}>
            {/*<ListItem button >
                <ListItemIcon>
                  <VpnKeyIcon></VpnKeyIcon>
                  </ListItemIcon>
                  <ListItemText className={classes.sideTitle} primary="Cambia Password"/>
            </ListItem>*/}
            {getUserData() !== undefined && getUserData().Tipologia !== undefined ? getUserData().Tipologia !== 'Cliente' && getUserData().Tipologia !== 'Utente' ? (
              <Link to="/strumenti" className={classes.link}>
                <ListItem button > 
                    <ListItemIcon>
                      <VpnKeyIcon></VpnKeyIcon>
                      </ListItemIcon>
                      <ListItemText className={classes.sideTitle} primary="Strumenti"/>
                </ListItem>
                </Link>
            ) : null : null}
            <ListItem button onClick={ e => {
              e.preventDefault()
              setOpenPW(true)
            }}>
                <ListItemIcon>
                  <VpnKeyIcon></VpnKeyIcon>
                  </ListItemIcon>
                  <ListItemText className={classes.sideTitle} primary="Cambia password"/>
            </ListItem>

            <Link to={'/'} className={classes.link} >
            <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon></ExitToAppIcon>
                  </ListItemIcon>
                  <ListItemText className={classes.sideTitle} primary="Logout"/>
            </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
      </ClickAwayListener>
    )
}

export default Sidebar
