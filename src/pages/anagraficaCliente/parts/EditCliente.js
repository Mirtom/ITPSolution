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
import clientData from '../../data/clientData';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditCliente({data,status,handleClose}) {

    const { updateClient } = webservice()
    const { setClientData,getClientData } = clientData()

    const classes = useStyles();

    const [clientInfo,setClientInfo] = useState({
        ragSociale:data.rSociale,
        estensioneRagSociale:data.estensioneRSociale,
        nazionalita:data.nazionalita,
        localita:data.localita,
        indirizzo:data.indirizzo,
        codicefiscale:data.cf,
        codicepostale:data.cap,
        pIva:data.pIVA
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

    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();
    
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

                    <Box>
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
                    </Box>

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
                         let toUp = clientInfo
                         toUp.id = data.id
                         console.log(toUp)
                         //updateClient(toUp)
                         console.log(getClientData())
                         let toRefresh = {
                             cap:toUp.codicepostale,
                             cf:toUp.codicefiscale,
                             estensioneRSociale:toUp.estensioneRagSociale,
                             id:toUp.id,
                             indirizzo:toUp.indirizzo,
                             localita:toUp.localita,
                             nazionalita:toUp.nazionalita,
                             pIVA:toUp.pIva,
                             rSociale:toUp.ragSociale
                         }
                         setClientData(toRefresh)
                         forceUpdate()
                         forceUpdate()
                         forceUpdate()
                         handleClose()
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

export default EditCliente
