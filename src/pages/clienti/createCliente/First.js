import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../../components/Sidebar"
import { Box, Container, Typography } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import clientData from '../../data/clientData';
import { useHistory } from "react-router-dom";
import userData from '../../data/userData';

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

const First=()=> {
  const history = useHistory();
  function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }
  //F update
  let forceUpdate =  useForceUpdate()

  const classes = useStyles();

  const [ error, setError ] = useState(0)
  const [clientInfo,setClientInfo] = useState({
      ragSociale:'',
      estensioneRagSociale:'',
      nazionalita:'',
      localita:'',
      indirizzo:'',
      codicefiscale:'',
      codicepostale:'',
      pIva:''
    })
  
  //CHANGING STATE FUNCTION
  function handleChange(e,target) {
    e.preventDefault();
    let value = e.target.value;
    setClientInfo(prevState => ({
      ...prevState,
      [target]: value 
    }));
  }

  //Client Data
  const { setNewClientData, getNewClientData } = clientData()
  //REINTEGRATING VALUES IF COMPILED ON BACK BUTTON
  useEffect(() => {
        if( getNewClientData() !== null ){
            setClientInfo( getNewClientData() )
        }
  }, [])

  const { setDrawer } = userData()
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
        
            <Typography style={{padding:15,paddingTop:30,fontWeight:'bold',fontSize:25, letterSpacing:'.05em'}}>DATI SOCIALI DEL CLIENTE :</Typography>
          {error == 1 ? <Typography className={classes.errorBasic}>* Compila tutti i campi obbligatori</Typography> : null}
          <Grid style={{backgroundColor:'white',flex:1,height:'100%'}} container spacing={0}>

              <form className={classes.form} noValidate autoComplete="off">
                <Box className={classes.boxLeft}>

                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>Ragione Sociale</Typography>
                    <TextField value={clientInfo.ragSociale} onChange={(e) => handleChange(e,'ragSociale')} className={classes.formRowInput} id="name-input"  />
                  </div>
                    <div className={classes.formRow}>
                      <Typography className={classes.formRowName}>Estensione Ragione Sociale</Typography>
                      <TextField  value={clientInfo.estensioneRagSociale} onChange={(e) => handleChange(e,'estensioneRagSociale') } className={classes.formRowInput} id="standard-basic" />
                    </div>
                  
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Nazionalità</Typography>
                    <TextField value={clientInfo.nazionalita} onChange={(e) => handleChange(e,'nazionalita')} className={classes.formRowInput} id="standard-basic" />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Località</Typography>
                    <TextField value={clientInfo.localita} onChange={(e) => handleChange(e,'localita')}  className={classes.formRowInput} id="standard-basic" />
                  </div>
                  </Box>

                <Box className={classes.boxRight}>
                <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Indirizzo</Typography>
                    <TextField value={clientInfo.indirizzo} onChange={(e) => handleChange(e,'indirizzo')}  className={classes.formRowInput} id="standard-basic" />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Codice Fiscale</Typography>
                    <TextField value={clientInfo.codicefiscale} onChange={(e) => handleChange(e,'codicefiscale')} className={classes.formRowInput} id="standard-basic"  />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Codice Postale</Typography>
                    <TextField value={clientInfo.codicepostale} onChange={(e) => handleChange(e,'codicepostale')}  className={classes.formRowInput} id="standard-basic"  />
                  </div>
                  <div className={classes.formRow}>
                    <Typography className={classes.formRowName}>* Partita Iva</Typography>
                    <TextField value={clientInfo.pIva} onChange={(e) => handleChange(e,'pIva')} className={classes.formRowInput} id="standard-basic"  />
                  </div>
                
                  <div style={{flexDirection:'row',justifyContent:'flex-end'}}>
                      <Button
                      variant="contained"
                      color="primary"
                      fullWidth={false}
                      className={classes.button}
                      endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                      onClick={ async e=> {
                          e.preventDefault();
                          if(clientInfo.nazionalita && clientInfo.localita && clientInfo.indirizzo && clientInfo.codicefiscale && clientInfo.codicepostale && clientInfo.pIva){
                            await setNewClientData(clientInfo)
                            history.push('/clienti/contattiReferente')
                          }else{
                            setError(1)
                          }
                          
                      } }
                      >
                      Salva e Continua
                    </Button>
                  {console.log(error)}
                  </div>
                </Box>
              

              </form>
          </Grid>

        </Container>
      </Container>
      
       
    </div>
  )
}

export default First
