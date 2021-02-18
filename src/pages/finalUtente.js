import React, { useEffect } from 'react'
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
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

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
    minHeight:1000,
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
    paddingTop:20,
    paddingBottom:20,
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
    flexDirection:'row',
    justifyContent:'flex-end',
    fontSize:15,
    letterSpacing:'.15em',
    fontWeight:'bold',
    float:'right',
    marginTop:30,
    marginBottom:30
  },
  bigText: {
      fontSize:32
  },
  smallText: {
      fontSize:12,
      textAlign:'center',
      width:400,
      color:'#b1b1b1'
  },
  qrCodeImage: {
      width:25
  },
  qrCodeBox: {
    display:'flex',
    flexDirection:'row',
    width:'70%',
    justifyContent:'space-evenly',
    marginTop:50,
    alignItems:'center'
  },
  qrCodeTitle:{
    fontSize:15,
    fontWeight:'bold',
    letterSpacing:'.1em'
  },
  qrCodeSubTitle:{
    fontSize:25,
    letterSpacing:'.05em',
    color:'black',
    fontWeight:'bold'
  },
  button: {
    width:'300px',
    backgroundColor:'#00ADA2',
    flexDirection:'column',
    fontSize:15,
    letterSpacing:'.15em',
    fontWeight:'bold',
    marginTop:30,
    marginBottom:30,
    textAlign:'center'
  },
}))
export default() => {
  const history = useHistory()
  //Data profile vars
  
  const { getUserData, setNewUserStep, setDrawer,getDrawer,setUserMan,getCode,setCode  } = userData();
  function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    setUserMan(null)
    setNewUserStep(3)
    setCode('EF193S')
  }, )
  const classes = useStyles();
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
          
          <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>CONFERMA E AGGIUNGI :</Typography>
          <Grid style={{backgroundColor:'white',flex:1,height:'100%',width:'50%',margin:'100px auto',alignItems:'center',display:'flex',flexDirection:'column'}} container spacing={0}>

          <img style={{width:200}} src={require("../assets/images/creaUtente/finalUtente.png")} />
          <Typography className={classes.bigText}>Account Creato</Typography>
          <Typography className={classes.smallText}>Ora sei pronto a configurare i tuoi clienti, i tuoi impianti e a gestire al meglio il tuo futuro</Typography>
            <Box className={classes.qrCodeBox} >
                <img className={classes.qrCodeImage} src={require("../assets/images/creaUtente/scanUtente.png")} />
                <Typography className={classes.qrCodeTitle}>CODICE: </Typography>
                <Typography className={classes.qrCodeSubTitle}>{getCode()} </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth={false}
              onClick={e => {
                history.push('/dashboard')
              }}>
                Vai alla Dashboard
            </Button>
          </Grid>

        </Container>
      </Container>
      
       
    </div>
  )
}
