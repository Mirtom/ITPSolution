import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Button, Container, Divider, FormControl, FormControlLabel, MenuItem, Select, Typography } from "@material-ui/core"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import EuroIcon from '@material-ui/icons/Euro';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';
import DescriptionIcon from '@material-ui/icons/Description';
import contractData from '../data/contractData';

import MenuIcon from '@material-ui/icons/Menu';
import userData from '../data/userData';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#00ADA2',
      },
    },
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
    paddingBottom:0,
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
      fontSize:18,
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
      fontSize:20,
      width:'100%'
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
    width:'45%',
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
  },
  topInside:{
    marginBottom:25,
  },
  topBottom:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-between'
  },
  formColumn:{
    width:'25%'
  },
  errorBasic: {
    color:'red',
    paddingLeft:15
  },
  form:{
    paddingLeft:15,
    paddingTop:15,
    display:'flex',
    width:'100%',
    justifyContent:'space-between',
  },    
  formLeft:{
    display:'flex',
    flexDirection:'column',
    color: '#535353'
  },
  formRight:{
    display:'flex',
    flexDirection:'column',
    color: '#535353'
  },
  formLeftM:{
      width:'48%'
  },
  formRightM:{
      width:'48%'
  }
}))

export default() => {
    const { setDrawer } = userData()
    function useForceUpdate(){
        const [value, setValue] = React.useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();
    const history = useHistory();
    //contract data management
    const { setContractInvoice, getContractInvoice } = contractData()

    //States Inputs
    const [comunicazione,setComunicazione] = useState({
        email: true,
        pec: false,
        posta: false,
        MEPA: false,
    })
    const [contact, setContact] = useState([
        {
            name:'email',
            value:null
        },
        {
            name:'pec',
            value:null
        },
        {
            name:'posta',
            value:null
        },
        {
            name:'MEPA',
            value:null
        },

    ])
    const [rFiscale, setRFiscale] = useState([{
        22:false,
        10:false,
        4:false,
        0:false,
        reverse:false,
        split:false,
        ritenuta:false,
        art:false
    }])
    //Error handle
    const [error,setErrors] = useState(0)
    const [scadenza,setScadenza] = useState({
        tipologia:null,
        scadenza:null
    })
    //Handle contact values
    function handleVChange(e,target){
        let value = e.target.value
        let toUp = contact
        toUp.map( (item) => {
            if(item.name == target){
                item.value= value
            }
        })
        setContact(toUp)

    }
    //Scadenza change handle
    function HandleSChange(e,target) {
        let value = e.target.value
        setScadenza(prevState => ({
            ...prevState,
            [target]:value
        }))
    }
    //States change handle
    function handleChange(e,target) {
        let value = !comunicazione[target]
        setComunicazione( prevState => ({
            ...prevState,
            [target]:value
        }))
    }
    //Regime fiscale change handle
    function handleRChange(e,target) {
        let dataNow = [{
            22:false,
            10:false,
            4:false,
            0:false,
            reverse:false,
            split:false,
            ritenuta:false,
            art:false
        }]
        dataNow.map( item => { item[target] = true } )
        setRFiscale(dataNow)

    }
    //Check form on submit
    function checkForm(){
        
        let res = contact.filter( item => item.value!=null)
        if(scadenza.tipologia !== null && scadenza.scadenza !== null){
            if(res.length > 0 ){
                let toSave = [...[comunicazione]]
                    toSave.push(contact)
                    toSave.push(rFiscale)
                    toSave.push(scadenza)
                    console.log( toSave )
                    setContractInvoice(toSave)

                history.push('/contratti/referenteContratto')
            }else{
                setErrors(1)
            }
        }else{
            setErrors(2)
        }
        
    }

    React.useEffect(() => {
        async function initialData(){
            if( getContractInvoice() !== null ){
                setComunicazione( getContractInvoice()[0]  )
                setContact( getContractInvoice()[1] )
                setRFiscale( getContractInvoice()[2] )
                setScadenza( getContractInvoice()[3] )
                console.log( rFiscale )
            }
        }
        initialData()
    }, [])

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
            <Typography className={classes.tabName}>FATTURAZIONE</Typography>
            <Box className={classes.topTab}>
                <Box style={{width:'30%',display:'flex',flexDirection:'column',paddingTop:30}}>
                    <Typography className={classes.subTabName}>* Comunicazione</Typography>
                    {error === 1 ? <Typography className={classes.errorBasic}>Inserisci almeno un metodo di comunicazione</Typography>: null}
                    <Box style={{paddingLeft:15}}>
                        <FormControlLabel style={{color:'#535353'}}control={
                        <Checkbox checked={comunicazione.email} onChange={(e) => handleChange(e,'email')} color="primary" style={{marginLeft:10}}name="checkedC" />
                        } label="Email" /> 
                        <FormControlLabel style={{color:'#535353'}}control={
                        <Checkbox checked={comunicazione.pec} onChange={(e) => handleChange(e,'pec')} color="primary" style={{marginLeft:10}}name="checkedC" />
                        } label="Pec" /> 
                        <FormControlLabel style={{color:'#535353'}}control={

                        <Checkbox checked={comunicazione.posta} onChange={(e) => handleChange(e,'posta')} color="primary" style={{marginLeft:10}}name="checkedC" />
                        } label="Posta" /> 
                        <FormControlLabel style={{color:'#535353'}}control={

                        <Checkbox checked={comunicazione.mepa} onChange={(e) => handleChange(e,'mepa')}color="primary"style={{marginLeft:10}}name="checkedC" />}
                         label="MEPA" /> 
                    </Box>
                </Box>
                <Box style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',width:'50%',paddingTop:30}}>

                    <Box className={classes.topInside}>
                        <div className={classes.formRow} style={{width:'100%'}}>
                            <Input
                            className={classes.input}
                            style={{width:'100%'}}
                            disableUnderline={true}
                            disabled={!comunicazione.posta}
                            value={contact[2].value}
                            placeholder="Inserisci città, Via e Codice postale"
                            onChange={(e) => handleVChange(e,'posta')}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment className={classes.euroLogo}position="start">
                                    <LocationOnIcon className={classes.euro}></LocationOnIcon>
                                </InputAdornment>
                            }
                            />
                        </div>
                    </Box>
                    <Box className={classes.topBottom}>
                        {comunicazione.email == true ?
                            <div className={classes.formRow}>
                                <Input
                                className={classes.input}
                                disableUnderline={true}
                                style={{marginBottom:20}}
                                placeholder="Inserisci l'email"
                                value={contact[0].value}
                                onChange={(e) => handleVChange(e,'email')}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment className={classes.euroLogo}position="start">
                                        <MailOutlineSharpIcon className={classes.euro}></MailOutlineSharpIcon>
                                    </InputAdornment>
                                }
                                />
                            </div> : null
                        }
                        {comunicazione.pec == true ?
                            <div className={classes.formRow}>
                                <Input
                                className={classes.input}
                                disableUnderline={true}
                                style={{marginBottom:20}}
                                placeholder="Inserisci la PEC"
                                value={contact[1].value}
                                onChange={(e) => handleVChange(e,'pec')}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment className={classes.euroLogo}position="start">
                                        <MailOutlineSharpIcon className={classes.euro}></MailOutlineSharpIcon>
                                    </InputAdornment>
                                }
                                />
                            </div> : null
                        }
                        {comunicazione.mepa == true ?
                            <div className={classes.formRow}>
                                <Input
                                className={classes.input}
                                disableUnderline={true}
                                style={{marginBottom:20}}
                                placeholder="Inserisci il codice univoco"
                                value={contact[3].value}
                                onChange={(e) => handleVChange(e,'MEPA')}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment className={classes.euroLogo}position="start">
                                        <MailOutlineSharpIcon className={classes.euro}></MailOutlineSharpIcon>
                                    </InputAdornment>
                                }
                                />
                            </div> : null
                        }
                            
                    </Box>

                </Box>
            </Box>
            <Divider variant="middle" />
            <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}> 
                <Box className={classes.midBox}>
                <Box className={classes.formColumn}>
                    <Typography className={classes.subTabName}>* Regime fiscale:</Typography>
                    <Box className={classes.form}>
                        <Box className={classes.formLeft}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={rFiscale[0][22]}
                                name="checkedB"
                                color="primary"
                                onChange={ (e) => handleRChange(e,'22') }
                            />
                            }
                            label="22%"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={rFiscale[0][10]}
                                name="checkedB"
                                color="primary"
                                onChange={ (e) => handleRChange(e,'10') }
                            />
                            }
                            label="10%"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={rFiscale[0][4]}
                                name="checkedB"
                                color="primary"
                                onChange={ (e) => handleRChange(e,'4') }
                            />
                            }
                            label="4%"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={rFiscale[0][0]}
                                name="checkedB"
                                color="primary"
                                onChange={ (e) => handleRChange(e,'0') }
                            />
                            }
                            label="0%"
                        />
                        
                        </Box>
                        <Box className={classes.formRight}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={rFiscale[0].reverse}
                                    onChange={ (e) => handleRChange(e,'reverse') }
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Reverse Charge"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={rFiscale[0].split}
                                    onChange={ (e) => handleRChange(e,'split') }
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Split payment"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={rFiscale[0].ritenuta}
                                    onChange={ (e) => handleRChange(e,'ritenuta') }
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Ritenuta 4%"
                            />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={rFiscale[0].art}
                                    onChange={ (e) => handleRChange(e,'art') }
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Art. 71 D.P.R n.633/72"
                            />
                        </Box>
                    </Box>
                    
                </Box>
                <Box className={classes.formColumn} style={{width:'40%'}}>
                    <Typography className={classes.subTabName}>* Scadenza della Fattura:</Typography>
                    {error === 2 ? <Typography className={classes.errorBasic}>Compila tutti i campi</Typography>: null}
                    <Box className={classes.form}>
                        <Box className={classes.formLeftM}>
                            <Typography style={{color:'#535353',fontSize:15,marginBottom:10}}>* Tipologia del pagamento</Typography>
                        <FormControl variant="outlined" className={classes.formControl} style={{width:'100%'}}>
                            <Select
                            className={classes.midForms}
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(e) => HandleSChange(e,'tipologia')}
                            displayEmpty
                            value={scadenza !== undefined ? scadenza.tipologia : ''}
                            >
                            <MenuItem value="" disabled={true}>{scadenza !== undefined ? scadenza.tipologia : ''}</MenuItem>
                            <MenuItem value={'Bonifico bancario'}>Bonifico bancario</MenuItem>
                            <MenuItem value={'Assegno'}>Assegno</MenuItem>
                            <MenuItem value={'Contanti'}>Contanti</MenuItem>
                            <MenuItem value={'RiBa'}>RiBa</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                        <Box className={classes.formRightM}>
                            <Typography  style={{color:'#535353',fontSize:15,marginBottom:10}}>* Scadenza del pagamento</Typography>
                            <FormControl variant="outlined" className={classes.formControl} style={{width:'100%'}}>
                                <Select
                                className={classes.midForms}                            
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                onChange={(e) => HandleSChange(e,'scadenza')}
                                displayEmpty
                                value={scadenza !== undefined ? scadenza.scadenza : ''}
                                >
                                <MenuItem value="" disabled={true}>{scadenza !== undefined ? scadenza.scadenza : ''}</MenuItem>
                                <MenuItem value={'immediato'}>All'ordine</MenuItem>
                                <MenuItem value={30}>30 GG</MenuItem>
                                <MenuItem value={301}>30 GGDF</MenuItem>
                                <MenuItem value={60}>60 GG</MenuItem>
                                <MenuItem value={601}>60 GGDF</MenuItem>
                                <MenuItem value={90}>90 GG</MenuItem>
                                <MenuItem value={901}>90 GGDF</MenuItem>
                                <MenuItem value={120}>120 GG</MenuItem>
                                <MenuItem value={1201}>120 GGDF</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    
                </Box>
                {/*<Box className={classes.formColumn}>
                <Typography className={classes.subTabName}>* Testo della Fattura</Typography>
                    <Box className={classes.form} style={{paddingLeft:30,paddingTop:20}}>
                        <Box variant="" style={{borderRadius:5,paddingTop:10,paddingBottom:10,cursor:'pointer',paddingLeft:45,paddingRight:45,display:'flex',justifyContent:'space-between',backgroundColor:'#FBB441',color:'white',letterSpacing:'.05em',textTransform:'capitalize !important'}}>
                            <span style={{textTransform:'capitalize'}}>Modifica</span>
                            <DescriptionIcon style={{color:'white'}}/>
                        </Box>
                    </Box>
                </Box>*/}
            </Box>
                <Box style={{display:'flex',justifyContent:'space-between',padding:'50px 100px 0'}}>
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    onClick={() => history.push('/contratti/listaAttivita')}
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
                        checkForm()
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
