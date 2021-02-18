import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import { Box, Container, Typography } from "@material-ui/core"
import userData from './data/userData'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import HorizontalLinearStepper from './components/HorizontalLinearStepper'
import { Link } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
import webservice from '../api/webservice'
import contractData from './data/contractData'
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import MenuIcon from '@material-ui/icons/Menu';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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
    paddingTop:100,
    paddingBottom:20,
    alignItems:'center',
  },
  formRowName: {
    width:'25%',
    marginTop:15,
    fontSize:18,
    fontWeight:'bold'
  },
  formRowInput: {
    width:'60%',
    color:'transparent'
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
  userImages: {
      width:40,
      marginRight:10
  },
  formRowLine: {
    padding:10,
    paddingLeft:50,
    paddingTop:100,
    marginTop:16,
    paddingBottom:20,
    alignItems:'center',
    marginRight:30,
    display:'flex',
    lexDirection:'row',
  },
  singleLineTextMan:{
      color:'#3FB5E6',
      fontWeight:'bold'
  },
  singleLineTextCom:{
    color:'#FCC771',
    fontWeight:'bold'
  },
  singleLine:{
      alignItems:'center',
      display:'flex',
      marginRight:25
  },
  'MuiInputBase-input':{
    color:'transparent !important'
  },
  inputC:{
    color:'transparent !important'
  }
}))

function Dashboard() {
  function useForceUpdate(){
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();
  //Data profile vars
  const { getUserData, setNewUserStep, setUserMan, getUserMan,setDrawer } = userData();
  const { getContractList } = webservice()
  const { getContractListData } = contractData()

  //console.log( getUserData() )
  const classes = useStyles();

  const [manList,setManList] = React.useState([])
  const [selMan,setSelMan] = React.useState([])

  //Change selected Man
  function handleChangeMan(val){
    let tmp = selMan
    
    if(val!==null){
      let isThere = false
      tmp.map( e=> e.id ===  val.id ? isThere=true : null )
      if(isThere === false){
        tmp.push(val)
        setSelMan(tmp)
      }
      
    }
    forceUpdate()
  }
  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {

    async function initialSetup(){
      getContractList(getUserData().Token)
      setNewUserStep(1)
      await delay(1000)
      let tmp = getContractListData().filter(e=> e.isSub === 0)
      tmp.map(e=> e.numero= 'MAN. ' + e.numero)
      setManList( tmp )
      if( getUserMan()!== null ){
        if( getUserMan().length > 0 ){
          setSelMan(getUserMan())
        }
      }
      forceUpdate()
      
    }
    initialSetup()
    
  }, [])

  const history = useHistory();


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
          
          <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>INFORMAZIONI UTENTE :</Typography>
          <Grid style={{backgroundColor:'white',flex:1,height:'100%'}} container spacing={0}>

              <form className={classes.form} noValidate autoComplete="off">
                <Box className={classes.boxLeft}>

                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Aggiungi Manutenzione</Typography>
                    <div style={{display:'flex',width:'70%',alignItems:'center'}}>
                        <img style={{width:35,height:35,marginRight:15}} src={require("../assets/images/lista-utenti/CONTRATTO.png")} />
                        <Autocomplete
                            id="Testo da inserire"
                            options={ manList }
                            getOptionLabel={(option) => option.numero }
                            className={classes.formRowInput}
                            onChange={ (event,value)=> handleChangeMan(value) }
                            value={null}
                            renderInput={(params) => <TextField InputProps={{
                              className: classes.inputC
                            }} value={''} {...params} variant="outlined" />}
                        />
                    </div>
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Aggiungi Commessa</Typography>
                    <div style={{display:'flex',width:'70%',alignItems:'center'}}>
                        <img style={{width:35,height:35,marginRight:15}} src={require("../assets/images/lista-utenti/contrattoAsset.png")} />
                        
                    </div>
                    
                  </div>
                </Box>

                <Box className={classes.boxRight}>
                  <div className={classes.formRowLine}>
                    {selMan.map(item => {
                        return <div className={classes.singleLine}>
                              <RemoveCircleOutlineIcon style={{marginRight:10,cursor:'pointer',fontSize:20,color:'lightblue'}} onClick={e=> {
                                setSelMan(selMan.filter(e => e.id!=item.id))
                              }}/>
                              <img className={classes.userImages} src={require("../assets/images/lista-utenti/CONTRATTO.png")} />
                              <Typography className={classes.singleLineTextMan}> {item.numero} </Typography>
                          </div>
                      })}
                    
                  </div>
                  <div className={classes.formRowLine}>

                    {/*<div className={classes.singleLine}>
                      <img className={classes.userImages} src={require("../assets/images/lista-utenti/contrattoAsset.png")} />
                      <Typography className={classes.singleLineTextCom}> COM. 17 </Typography>
                    </div>*/}
                    
                  </div>
                  
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
                history.push('/dashboard/newUser')
              } }
              >
              Indietro
            </Button>
            <Button
            variant="contained"
            color="primary"
            fullWidth={false}
            className={classes.button}
            endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
            onClick={ e => {
                e.preventDefault()
                setUserMan(selMan)
                history.push('/newUser/permessiUtente')
              }}
              >
              Salva e Continua
            </Button>
          </Box>

        </Container>
      </Container>
      
       
    </div>
  )
}

export default Dashboard
