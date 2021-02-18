import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Box, Button, Container, Divider, Typography } from "@material-ui/core"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import EuroIcon from '@material-ui/icons/Euro';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import anagraficaData from '../../data/anagraficaData';
import webservice from '../../../api/webservice';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles((theme) => ({
  Header:{
    backgroundColor: "#00ADA2",
    height: 50,
    paddingTop:12
  },
  acquisizioneTab:{
    marginTop:40,
    height:'auto',
    width:'95%',
    paddingBottom:30,
    borderRadius:15,
    backgroundColor:'white',
  },
  tabName:{
    padding:15,
    paddingTop:30,
    fontWeight:'bold',
    fontSize:25, 
    letterSpacing:'.05em',
    color:'#6C6C6C'
  },
  subTabName:{
      paddingLeft:15,
      color:'#535353',
      fontWeight:'bold',
      fontSize:15,
      textTransform:'capitalize'
  },
  lightSmallText:{
      color:'#6c6c6c',
      marginRight:5,
  },
  euroLogo:{
      backgroundColor:'#F3F3F3',
      borderRight:'1px solid #eaeaea',
      padding:15,
      paddingTop:25,
      paddingBottom:25,
      color:'black'
  },
  euro:{
      fontSize:25,
      fontWeight:100
  },
  input:{
      border:'1px solid #eaeaea',
      borderRadius:5,
      fontSize:20
  },
  inputLabel:{
      fontSize:12,
      fontWeight:'bold',
      letterSpacing:'.05em',
      color:'#6c6c6c',
      marginBottom:5,
      marginLeft:2
  },
  topTab:{
      display:'flex',
      justifyContent:'space-between',
      paddingBottom:30
  },
  formRow:{
      marginRight:'70px'
  },
  midBox:{
      display:'flex',
      justifyContent:'space-between',
      padding:'30px 15px 0 15px'
  },
  personalRow:{
      paddingTop:25,
      paddingBottom:25
  },
  percentage:{
      fontSize:12,
      marginLeft:20
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
  buttonBack:{
      width:'15%',
      background:'transparent',
      color:'black',
      '&:hover': {
        backgroundColor: '#f1e9e9 !important',
    }
  }
}))

export default({status,handleClose}) => {
    const history = useHistory();
    const delay = ms => new Promise(res => setTimeout(res, ms));
    function useForceUpdate(){
        const [value, setValue] = React.useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();
      const { getAcquisizioneData,getAnagraficaData } = anagraficaData()
      const { GetAcquisizione, updateAcquisizione } = webservice()

      //States Inputs
    const [inputs,setInputs] = useState({
        bAsta: '0',
        pTot: '0',
        cManodopera: '0',
        vManodopera: '0',
        cMateriale: '0',
        vMateriale: '0',
        cVari: '0',
        vVari: '0',
    })

      useEffect(() => {
          async function initialSetup(){
              await GetAcquisizione('dd',getAnagraficaData().id)
              await delay(1000)
              console.log( getAcquisizioneData() )
              setInputs({
                bAsta: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].bAsta.toString()  : null,
                pTot: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].pTot.toString()  : null,
                cManodopera: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].cManodopera.toString() : null,
                vManodopera: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].vManodopera.toString() : null,
                cMateriale: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].cMateriale.toString() : null,
                vMateriale: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].vMaterial.toString() : null,
                cVari: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].cVari.toString() : null,
                vVari: getAcquisizioneData()[0] !== undefined ? getAcquisizioneData()[0].vVari.toString() : null,
              })
              console.log(inputs)
          }
          initialSetup()
      }, [])
    

    //Colors Styles
    const red ={color:'red'}
    const lightred = {color:'lightred'}
    const lightblue = {color: '#3CB4E6'}
    const orange ={color:'#F89E30'}
    const green ={color:'#27B979'}

    
    //States change handle
    function handleChange(e,target) {
        

        setInputs( prevState => ({
            ...prevState,
            [target]:e
        }))
    }
    //Color based result checker
    function checkColor(first,second){
        let res = first - second
        let secondPerc = second * 0.01
        var checker = parseInt(res / secondPerc)
        if(checker <= 10){
            return red
        }else if( checker > 10 && checker <=15){
            return orange
        }else if( checker > 15 && checker <= 20){
            return lightblue
        }else if( checker > 20){
            return green
        }
    }
    function printPerc(first,second){
        if(first != null && second != null){
            let res = first - second
            let secondPerc = second * 0.01
            var checker = parseInt(res / secondPerc)
    
            return (checker + ' %')
        }
        
    }
    function formatNumbers(curr){
        return new Intl.NumberFormat('eu-EU', { 
            style: 'currency', 
            currency: 'EUR', 
            minimumFractionDigits: 2, 
        }).format(parseInt(curr)); 
    }
    

  const classes = useStyles();
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
        <Container maxWidth="False" className={classes.acquisizioneTab}>
        <Typography className={classes.tabName}>ACQUISIZIONE</Typography>
            <Box className={classes.topTab}>
                <Box style={{width:'30%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                    </Box>
                <Box style={{display:'flex',justifyContent:'flex-start',width:'50%'}}>
                   
                    <div className={classes.formRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Base d'Asta</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.bAsta} onChange={(e) => handleChange(e,'bAsta')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                    </div>
                    <div className={classes.formRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Prezzo Totale di Vendita</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.pTot} onChange={(e) => handleChange(e,'pTot')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                    </div>
                </Box>
            </Box>
            <Divider variant="middle" />
            <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}> 
                <Box className={classes.midBox}>
                <Box className={classes.formColumn}>
                    <div className={classes.personalRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Costi Manodopera</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.cManodopera} onChange={(e) => handleChange(e,'cManodopera')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                    </div>
                    <div className={classes.personalRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Costi Materiale</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.cMateriale} onChange={(e) => handleChange(e,'cMateriale')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                     </div>
                    <div className={classes.personalRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Costi Vari</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.cVari} onChange={(e) => handleChange(e,'cVari')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                    </div>
                </Box>
                <Box className={classes.formColumn}>
                    <div className={classes.personalRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Vendita Manodopera</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.vManodopera} onChange={(e) => handleChange(e,'vManodopera')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                    </div>
                    <div className={classes.personalRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Vendita Materiale</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.vMateriale} onChange={(e) => handleChange(e,'vMateriale')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                    </div>
                    <div className={classes.personalRow}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment">Vendita Vari</InputLabel>
                        <Box style={{display:'flex'}}>
                    <InputAdornment className={classes.euroLogo} style={{marginRight:0,borderTopLeftRadius:10,borderBottomLeftRadius:10}} position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                    <CurrencyInput className={classes.input}   value={inputs.vVari} onChange={(e) => handleChange(e,'vVari')} decimalSeparator="," thousandSeparator=" " />
                    </Box>
                    </div>
                         
                </Box>
                <Box className={classes.formColumn}>
                    <div className={classes.personalRow} style={{paddingTop:37,display:'flex',alignItems:'center'}}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment"></InputLabel>
                        <Input
                        className={classes.input}
                        disableUnderline={true}
                        type="text"
                        style={checkColor(inputs.vManodopera,inputs.cManodopera)}
                        value={inputs.vManodopera !== null && inputs.cManodopera !== null ? 
                            ( formatNumbers(parseFloat(inputs.vManodopera.replace(/ /g,'')) - parseFloat(inputs.cManodopera.replace(/ /g,''))  )  ) : null}
                        disabled={true}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment className={classes.euroLogo}position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                        }
                        />
                        
                    </div>
                    <div className={classes.personalRow} style={{paddingTop:37,display:'flex',alignItems:'center'}}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment"></InputLabel>
                        <Input
                        className={classes.input}
                        disableUnderline={true}
                        type="text"
                        style={checkColor(inputs.vMateriale,inputs.cMateriale)}
                        value={inputs.vMateriale !== null && inputs.cMateriale !== null ? 
                            (formatNumbers(parseFloat(inputs.vMateriale.replace(/ /g,'')) - parseFloat(inputs.cMateriale.replace(/ /g,''))  )) : null}
                        disabled={true}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment className={classes.euroLogo}position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                        }
                        />
                        
                    </div>
                    <div className={classes.personalRow} style={{paddingTop:37,display:'flex',alignItems:'center'}}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment"></InputLabel>
                        <Input
                        className={classes.input}
                        disableUnderline={true}
                        type="text"
                        style={checkColor(inputs.vVari,inputs.cVari)}
                        value={inputs.vVari !== null && inputs.cVari !== null ? 
                            (formatNumbers(parseFloat(inputs.vVari.replace(/ /g,'')) - parseFloat(inputs.cVari.replace(/ /g,''))) ) : null}
                        disabled={true}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment className={classes.euroLogo}position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                        }
                        />
                        
                    </div>
                    
                </Box>
            </Box>
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
                      <Button onClick={async e => {
                        let toUp = inputs
                        toUp.byContract = getAnagraficaData().id
                        toUp.token= 'dd'
                        toUp.pTot = inputs.pTot.replace(/[ ,.]/g, "").substring(0, inputs.pTot.replace(/[ ,.]/g, "").length-2)
                        toUp.bAsta = inputs.bAsta.replace(/[ ,.]/g, "").substring(0, inputs.bAsta.replace(/[ ,.]/g, "").length-2)
                        toUp.cManodopera = inputs.cManodopera.replace(/[ ,.]/g, "").substring(0, inputs.cManodopera.replace(/[ ,.]/g, "").length-2)
                        toUp.vManodopera = inputs.vManodopera.replace(/[ ,.]/g, "").substring(0, inputs.vManodopera.replace(/[ ,.]/g, "").length-2)
                        toUp.cMateriale = inputs.cMateriale.replace(/[ ,.]/g, "").substring(0, inputs.cMateriale.replace(/[ ,.]/g, "").length-2)
                        toUp.vMateriale = inputs.vMateriale.replace(/[ ,.]/g, "").substring(0, inputs.vMateriale.replace(/[ ,.]/g, "").length-2)
                        toUp.cVari = inputs.cVari.replace(/[ ,.]/g, "").substring(0, inputs.cVari.replace(/[ ,.]/g, "").length-2)
                        toUp.vVari = inputs.vVari.replace(/[ ,.]/g, "").substring(0, inputs.vVari.replace(/[ ,.]/g, "").length-2)
                        console.log(toUp)
                        updateAcquisizione(toUp)
                        await delay(500)
                        handleClose()
                        window.location.reload(false)

                    }} color="primary" className={classes.button} style={{color:'white'}}>
                        Modifica
                    </Button>

                      
                  </Box>
            </DialogActions>
    </Dialog>)
}