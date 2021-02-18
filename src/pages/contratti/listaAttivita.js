import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Button, Container, Divider, InputLabel, TextField, Typography } from "@material-ui/core"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Activity from '../components/activity'
import contractData from '../data/contractData';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";

import MenuIcon from '@material-ui/icons/Menu';
import userData from '../data/userData';
import webservice from '../../api/webservice';
import anagraficaData from '../data/anagraficaData';

const useStyles = makeStyles((theme) => ({
  Header:{
    backgroundColor: "#00ADA2",
    height: 50,
    paddingTop:12
  },
  listaTable:{
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
  topTab:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      paddingBottom:30
  },
  defaultSelectBox:{
      width:'100%'
  },
  subTabName:{
    paddingLeft:15,
    color:'#535353',
    fontSize:20,
    fontWeight:'bold',
    letterSpacing:'0.05em',
    textTransform:'capitalize',
    textAlign:'left'
   },
   topButton:{
       background:'#18CCBC !important',
       color:'white',
       paddingLeft:25,
       paddingRight:25
   },
   mainTab:{
    paddingTop:50,
    display: "flex",
    justifyContent:'column',
    flexWrap: "wrap",
        "& > *": {
        margin: theme.spacing(1),
        height: theme.spacing(16)
        }
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
    errorBasic: {
        color:'red',
        paddingLeft:15
      }
    

}))

export default() => { 
    const [cType,setCType] = React.useState([])
    const { setDrawer } = userData()
    function useForceUpdate(){
        const [value, setValue] = React.useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();
  const history = useHistory();
  //Setting values in sessionStorage
  const { getTipologieIntervento, getTabTipoImpianti } = webservice()
  const { setContractActivity, getContractActivity, updateContractActivity, getContractType, getNewContractData,getTabImpianti } = contractData();
  const [toRender,setToRender] = useState([])
  const { getTipoI } = anagraficaData()
  //STATE Data Attivita
  const [data,setData] = useState({
      tipologia:null,
      descrizione:null,
      periodo:null,
      id: null
  })

  //GENERAZIONE CODICE personale Attività
  function makeid() {
    var result = '';
    var characters  = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }

  //Error manage
  const [error,setError] = useState(0)

  
  //Function to change state data
  function handleChange(e,target){
      let value = e.target.value
      setData(prevState => ({
          ...prevState,
          [target]:value
      }))
  }
  //Reintegrating values if already compiled
  useEffect(() => {
      console.log( getContractActivity() )
      getTabTipoImpianti('dd')
      getTipologieIntervento('dd')
      if(getContractActivity() !== null){
          let data = getContractActivity()
          setToRender(data)
      }
      let fin = []
      if(getNewContractData() !== null){
        let tt = getTabImpianti().filter(t => t.Descr == getNewContractData()[0].tipologia)[0]
        getTipoI().map( type => {
            if(type.bytipologia == tt.id){
                fin.push(type)
            }
            setCType(fin)
        } )
      }
  }, [])
  console.log(getContractActivity())
  //Deleting values
  function removeActivity(code){
    let dataFresh = toRender.filter( item => item.id !== code )
    updateContractActivity(dataFresh)
    setToRender( getContractActivity() )
}

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
        <Container maxWidth="False" className={classes.listaTable}>
            <Typography className={classes.tabName}>LISTA ATTIVITA'</Typography>
            {error === 1 ? <Typography className={classes.errorBasic}>* Compila tutti i campi</Typography> : null}
            <Box className={classes.topTab}>
                <Typography className={classes.subTabName}>Nuova Attività</Typography>
                <Box style={{width:'15%'}}>
                    <InputLabel htmlFor="selectTipologia">* Tipologia Impianto</InputLabel>
                    <Select
                        className={classes.defaultSelectBox}
                        labelId="selectTipologia"
                        id="selectTipologia"
                        value={data.tipologia}
                        onChange={(e) => handleChange(e,'tipologia')}
                        >
                        {cType.map(type => {
                            return (
                                <MenuItem value={type.Nome}>{type.Nome}</MenuItem>
                            )
                        })}
                    </Select>
                </Box>
                <Box style={{width:'30%'}}>
                    <TextField
                        id="outline-multiline-static"
                        label="Descrizione dell'attività"
                        multiline
                        className={classes.defaultSelectBox}
                        rowsMax={8}
                        height={64}
                        rows={1}
                        value={data.descrizione}
                        placeholder="Inserisci la descrizione compelta dell'attività da svolgere"
                        onChange={e => handleChange(e,'descrizione')}
                    />
                </Box>
                <Box style={{width:'15%'}}>
                    <InputLabel htmlFor="selectTipologia">* Periodo temporale</InputLabel>
                    <Select
                        className={classes.defaultSelectBox}
                        labelId="selectTipologia"
                        id="selectTipologia"
                        value={data.periodo}
                        onChange={(e) => handleChange(e,'periodo')}
                        >
                        <MenuItem value={'Settimanale'}>Settimanale</MenuItem>
                        <MenuItem value={'Mensile'}>Mensile</MenuItem>
                        <MenuItem value={'Bimestrale'}>Bimestrale</MenuItem>
                        <MenuItem value={'Trimestrale'}>Trimestrale</MenuItem>
                        <MenuItem value={'Quadrimestrale'}>Quadrimestrale</MenuItem>
                        <MenuItem value={'Semestrale'}>Semestrale</MenuItem>
                        <MenuItem value={'Annuale'}>Annuale</MenuItem>
                    </Select>
                </Box>
                <Button 
                    variant="contained" 
                    className={classes.topButton}
                    onClick={ () => {
                        if(data.tipologia && data.periodo && data.descrizione){
                            let toUpdate = data
                            toUpdate.id = makeid()
                            setContractActivity( toUpdate )
                            setToRender(getContractActivity())
                            setError(0);
                            setData({
                                tipologia:null,
                                descrizione:'',
                                periodo:null,
                                id: null
                            })
                        }else{
                            setError(1);
                        }
                    } }
                >
                    <span style={{textTransform:'capitalize'}}>Aggiungi</span>
                </Button>
            </Box>
            <Divider></Divider>
            <Box className={classes.mainTab}>
                {toRender !== null ?
                    toRender.map( (item, index) => {
                        return <Activity data={item} index={index} tipo={cType} toDelete={(e) => removeActivity(e)} updateAct={ e => {
                            let toUp = toRender.filter( cc => cc.id !== e.id )
                            toUp.push(e)
                            setToRender(toUp)
                            updateContractActivity(toUp)
                        } }/>
                    } ) : null
                }
                </Box>
                <Box style={{display:'flex',justifyContent:'space-between',padding:'50px 100px 0'}}>
                    <Button
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    onClick={() => {
                        
                        if (getContractType() === 'sub') {
                            history.push('/contratti/nuovoContratto')
                        }else{
                            history.push('/contratti/acquisizioneContratto')
                        }
                    }}
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
                        if (getContractType() === 'sub') {
                            history.push('/contratti/documenti')
                        }else{
                            history.push('/contratti/Fatturazione')
                        }
                        
                    }}
                    style={{justifyContent:'flex-end'}}
                    endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                    >
                    Salva e Continua
                    </Button>
                </Box>
        </Container>

      </Container>
      
       
    </div>
  )
}
