import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import { Box, Container, Typography } from "@material-ui/core"
import userData from './data/userData'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HorizontalLinearStepper from './components/HorizontalLinearStepper'
import { Link, Redirect } from 'react-router-dom'
import newUserValidator from './validations/newUserValidator'
import MenuIcon from '@material-ui/icons/Menu';
import webservice from '../api/webservice'

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
    paddingBottom:15,
    alignItems:'center',
    width:'40%'
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

function Dashboard() {
  //Data profile vars
  function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();
  const { getClientList, clientList } = webservice()
  const { validateUser } = newUserValidator();
  const { getNewUserError,getNewUserData,setDrawer } = userData();
  const classes = useStyles();
  const [ error, setError ] = useState(0)
  const [userInfo,setUserInfo] = useState({
      name: '',
      cognome: undefined,
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

  //REINTEGRATING VALUES IF COMPILED ON BACK BUTTON
  useEffect(() => {
    getClientList('dd')
    if (getNewUserData() !== null) {
    let data = getNewUserData()
    console.log(data)
    data.map ( item => {
      for(let i=0; i<10; i++){
        setUserInfo(prevState => ({
          ...prevState,
          [Object.keys(item)[i]]: Object.values(item)[i]
        }))
      } 
    } )
  }
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
           <HorizontalLinearStepper></HorizontalLinearStepper>
          </div>
          
          <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>DATI UTENTE :</Typography>
          {error == 1 ? <Typography className={classes.errorBasic}>* Compila tutti i campi obbligatori</Typography> : null}
          <Grid style={{backgroundColor:'white',flex:1,height:'100%'}} container spacing={0}>

              <form className={classes.form} noValidate autoComplete="off">
                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRow} style={{order:1}}>
                    <Typography className={classes.formRowName}>* Nome</Typography>
                    <TextField error={error == 2 ? true : false} helperText={error == 2 ? 'Il nome deve essere lungo almeno 2 carattere e massimo 25' : null} value={userInfo.name} onChange={(e) => handleChange(e,'name')} className={classes.formRowInput} id="name-input" />
                  </div>
                  <div className={classes.formRow} style={{order:2}}>
                    <Typography className={classes.formRowName}>* Cognome</Typography>
                    <TextField error={error == 2 ? true : false} helperText={error == 2 ? 'Il cognome deve essere lungo almeno 2 carattere e massimo 25' : null} value={userInfo.cognome} onChange={(e) => handleChange(e,'cognome')} className={classes.formRowInput} id="standard-basic"  />
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Email</Typography>
                    <TextField  error={error == 3 || error == 5 ? true : false} helperText={error == 3 ? "Controlla di avere scritto bene l'email" : ( error == 5 ? "Email esistente" : null ) } value={userInfo.email} onChange={(e) => handleChange(e,'email') } className={classes.formRowInput}   />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Conferma Email</Typography>
                    <TextField error={error == 3 ? true : false} helperText={error == 3 ? "Controlla di avere scritto bene l'email" : null} value={userInfo.confermaemail} onChange={(e) => handleChange(e,'confermaemail')} className={classes.formRowInput} id="standard-basic" />
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Password</Typography>
                    <TextField type="password" error={error == 4 ? true : false} helperText={error == 4 ? "Le password non combaciano oppure non contiene minimo 8 caratteri,un numero e una lettere maiuscola" : null} value={userInfo.password} onChange={(e) => handleChange(e,'password')} className={classes.formRowInput}   />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Conferma Password</Typography>
                    <TextField  type="password" error={error == 4 ? true : false} helperText={error == 4 ? "Le password non combaciano oppure non contiene minimo 8 caratteri,un numero e una lettere maiuscola" : null} value={userInfo.confermapassword} onChange={(e) => handleChange(e,'confermapassword')}  className={classes.formRowInput} id="standard-basic" />
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Società</Typography>
                    <TextField value={userInfo.societa} onChange={(e) => handleChange(e,'societa')} className={classes.formRowInput} id="standard-basic"  />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Tipologia Account</Typography>
                    <FormControl className={classes.formControl} style={{width:'30%'}}>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => handleChange(e,'tipologia')}
                      >
                        <MenuItem value={'Utente'}>
                          <em>Account Utente</em>
                        </MenuItem>
                        <MenuItem value={'Cliente'}>Account Cliente</MenuItem>
                        <MenuItem value={'Admin'}>Account Admin</MenuItem>
                        <MenuItem value={'Superadmin'}>Account SuperAdmin</MenuItem>
                        <MenuItem value={'Master'}>Account Master</MenuItem>
                      </Select>
                    </FormControl>

                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}> Posizione</Typography>
                    <TextField value={userInfo.posizione} onChange={(e) => handleChange(e,'posizione')} className={classes.formRowInput} id="standard-basic" 
                    />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>  Telefono</Typography>
                    <Grid style={{marginLeft:'2.5vw'}}container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PhoneIcon />
                      </Grid>
                      <Grid item>
                        <TextField value={userInfo.telefono} onChange={(e) => handleChange(e,'telefono')}  id="input-with-icon-grid"
                         />
                      </Grid>
                    </Grid>
                  </div>
                </Box>

                <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                  <div className={classes.formRow} >
                    <Typography className={classes.formRowName}>* Cliente da associare</Typography>
                    <FormControl className={classes.formControl} style={{width:'30%'}}>
                      <Select
                      
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => handleChange(e,'ofCliente')}
                      >
                        { clientList !== undefined ? (
                          clientList.map( item => {
                            return <MenuItem value={item.id}>{item.rSociale}</MenuItem>
                          } )
                        ) : null}
                        
                      </Select>
                    </FormControl>

                  </div>
                </Box>

                <Box style={{width:'100%'}}>
                  <div style={{flexDirection:'row',justifyContent:'flex-end'}}>
                      <Button
                      variant="contained"
                      color="primary"
                      fullWidth={false}
                      className={classes.button}
                      onClick={ () => {
                        console.log(userInfo)
                        validateUser(userInfo.name,userInfo.cognome,userInfo.email,userInfo.confermaemail,userInfo.password,userInfo.confermapassword,userInfo.societa,userInfo.posizione,userInfo.tipologia,userInfo.telefono,userInfo.ofCliente) 
                        setError(getNewUserError())
                        }
                      }
                      
                        endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                      >
                      Salva e Continua
                    </Button>
                  
                  </div>
                </Box>

          
              

              </form>
          </Grid>

        </Container>
      </Container>
      
       
    </div>
  )
}

export default Dashboard
