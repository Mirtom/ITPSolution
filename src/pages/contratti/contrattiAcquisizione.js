import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Button, Container, Divider, Typography,TextField } from "@material-ui/core"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import EuroIcon from '@material-ui/icons/Euro';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import userData from '../data/userData';
import contractData from '../data/contractData';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
var numeral = require('numeral');

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
  button:{
    backgroundColor:'#00ADA2',
    textDecoration:'capitalize',
    width:'15%'
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

export default() => {
    const { setDrawer } = userData()
    const history = useHistory();
    const { setNewContractAcquisizione, getNewContractAcquisizione, getNewContractData } = contractData()
    function useForceUpdate(){
        const [value, setValue] = React.useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();
    

    //Colors Styles
    const red ={color:'red'}
    const lightred = {color:'lightred'}
    const lightblue = {color: '#3CB4E6'}
    const orange ={color:'#F89E30'}
    const green ={color:'#27B979'}

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

    function formatNumbers(curr){
        return new Intl.NumberFormat('eu-EU', { 
            style: 'currency', 
            currency: 'EUR', 
            minimumFractionDigits: 2, 
        }).format(parseInt(curr)); 
    }
    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

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

    useEffect(() => {
        if( getNewContractAcquisizione() !== null ){
            setInputs( getNewContractAcquisizione() )
        }
    }, [])

    function NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;
      
        return (
          <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
              onChange({
                target: {
                  name: props.name,
                  value: values.value,
                },
              });
            }}
            thousandSeparator
            isNumericString
            prefix={<InputAdornment className={classes.euroLogo}position="start">
            <EuroIcon className={classes.euro}></EuroIcon>
        </InputAdornment>}
          />
        );
      }
      
      NumberFormatCustom.propTypes = {
        inputRef: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
      };
    

  const classes = useStyles();
  return (
    <div style={{display:'flex',height:'100%'}}>
      <Sidebar></Sidebar>
      <Container maxWidth="False" style={{padding:0,margin:0,width:'100%',marginLeft:'-13%'}}>

        <Container maxWidth="False" className={classes.Header}>
        <MenuIcon style={{cursor:'pointer',color:'white'}} onClick={e => {
                      setDrawer()
                      forceUpdate()
                    }}/> 
        </Container>
        <Container maxWidth="False" className={classes.acquisizioneTab}>
            <Typography className={classes.tabName}>ACQUISIZIONE</Typography>
            <Box className={classes.topTab}>
                <Box style={{width:'30%',display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                    <Typography className={classes.subTabName}><span className={classes.lightSmallText}>Calcolazione: </span>{ getNewContractData() !== undefined && getNewContractData() !== null ? ( getNewContractData()[0].titolo ) : null }</Typography>
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
                    {console.log( parseFloat(inputs.cManodopera.replace(/ /g,'')) - parseFloat(inputs.vManodopera.replace(/ /g,'')) ) }
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
                        value={formatNumbers(parseFloat(inputs.vManodopera.replace(/ /g,'')) - parseFloat(inputs.cManodopera.replace(/ /g,'')) )}
                        disabled={true}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment className={classes.euroLogo}position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                        }
                        />
                        <Typography className={classes.percentage}style={checkColor(parseFloat(inputs.vManodopera.replace(/ /g,'')),parseFloat(inputs.cManodopera.replace(/ /g,'')))}> {printPerc(parseFloat(inputs.vManodopera.replace(/ /g,'')),parseFloat(inputs.cManodopera.replace(/ /g,'')))}</Typography>
                    </div>
                    <div className={classes.personalRow} style={{paddingTop:37,display:'flex',alignItems:'center'}}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment"></InputLabel>
                        <Input
                        className={classes.input}
                        disableUnderline={true}
                        type="text"
                        style={checkColor(inputs.vMateriale,inputs.cMateriale)}
                        value={formatNumbers(parseFloat(inputs.vMateriale.replace(/ /g,'')) - parseFloat(inputs.cMateriale.replace(/ /g,''))  )}
                        disabled={true}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment className={classes.euroLogo}position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                        }
                        />
                        <Typography className={classes.percentage}style={checkColor(parseFloat(inputs.vMateriale.replace(/ /g,'')),parseFloat(inputs.cMateriale.replace(/ /g,'')))}> {printPerc(parseFloat(inputs.vMateriale.replace(/ /g,'')),parseFloat(inputs.cMateriale.replace(/ /g,'')))}</Typography>
                    </div>
                    <div className={classes.personalRow} style={{paddingTop:37,display:'flex',alignItems:'center'}}>
                        <InputLabel className={classes.inputLabel}htmlFor="input-with-icon-adornment"></InputLabel>
                        <Input
                        className={classes.input}
                        disableUnderline={true}
                        type="text"
                        style={checkColor(inputs.vVari,inputs.cVari)}
                        value={formatNumbers(parseFloat(inputs.vVari.replace(/ /g,'')) - parseFloat(inputs.cVari.replace(/ /g,''))) }
                        disabled={true}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment className={classes.euroLogo}position="start">
                                <EuroIcon className={classes.euro}></EuroIcon>
                            </InputAdornment>
                        }
                        />
                        <Typography className={classes.percentage}style={checkColor(parseFloat(inputs.vVari.replace(/ /g,'')),parseFloat(inputs.cVari.replace(/ /g,'')))}> {printPerc(parseFloat(inputs.vVari.replace(/ /g,'')), parseFloat(inputs.cVari.replace(/ /g,'')))}</Typography>
                    </div>
                    
                </Box>
            </Box>
                <Box style={{display:'flex',justifyContent:'space-between',padding:'50px 100px 0'}}>
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    onClick={() => history.push('/contratti/nuovoContratto')}
                    className={classes.buttonBack}
                    id='buttonBack'
                    style={{justifyContent:'flex-start'}}
                    startIcon={<ArrowBackIcon></ArrowBackIcon>}
                    >
                    Indietro
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    className={classes.button}
                    onClick={() => {
                        setNewContractAcquisizione(inputs)
                        history.push('/contratti/listaAttivita')
                    }}
                    style={{justifyContent:'flex-end'}}
                    endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                    >
                    Salva e Continua
                    </Button>
                </Box>
                </Box>
        </Container>

      </Container>
      
       
    </div>
  )
}
