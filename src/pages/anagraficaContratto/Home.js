import React, { useEffect,useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Button, Container, Typography } from "@material-ui/core"
import userData from '../data/userData'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import contractData from '../data/contractData';
import anagraficaData from '../data/anagraficaData';
import AnalisiChart from './charts/analisiChart';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from "react-router-dom";
import Situazione from './parts/Situazione';
import Ticket from './parts/Ticket';
import MenuIcon from '@material-ui/icons/Menu';
import Asset from './parts/Asset';
import Middle from './parts/Middle'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import webservice from '../../api/webservice'
import Backdrop from '@material-ui/core/Backdrop';
import Contratto from '../components/contratto'
import CircularProgress from '@material-ui/core/CircularProgress';
import ReportManutenzione from './parts/ReportManutenzione'
import ReportChart from './charts/ReportChart'
import LastReport from './parts/LastReport'
import NewSubImpianto from './parts/NewSubImpianto'
import ProgrammaManuntezione from './parts/ProgrammaManuntezione'
import Impostazioni from './parts/Impostazioni'
import Programma from './parts/Programma'
import Attivita from './parts/Attivita'
import Tooltip from '@material-ui/core/Tooltip';
import Documenti from './parts/Documenti'
import exportFromJSON from 'export-from-json'
import RichiestaIntervento from './parts/RichiestaIntervento'
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  Header:{
    backgroundColor: "white",
    boxShadow: "1px 3px 1px #9a9a9a",
    paddingTop:10,
    paddingBottom:10,
  },
  holder:{
    backgroundColor:'white'
  },
  standardRowImage:{
    height:'1.5vw',
  },
  standardRowImageSMALL:{
    height:'1.2vw',
    marginRight:25
  },
  toolbarOrder:{
    display:'flex',
    justifyContent:'space-between',
    paddingRight:'2%'
  },
  headerPart:{
    display:'flex',
    justifyContent:'space-between',
    paddingLeft:15,
    paddingRight:15,
    alignItems:'center'
  },
  headerRow:{
    width:'auto',
    alignItems:'center',
    display:'flex',
    justifyContent:'space-between'
  },
  headerText:{
    fontSize:'0.9vw',
    color:'#898989'
  },
  boldHeaderText:{
    fontSize:'1.3vw',
    color:'#71A8DB',
    fontWeight:'bold'
  },
  pulsanteAttivita:{
    borderRadius:20,
    padding:'5px 50px',
    border:'1px solid #5692d8',
    fontWeight:'bold',
    letterSpacing:'.05em',
    color:'#5692d8',
    '&:hover':{
      background:'transparent !important'
    }
  },
  "&:hover":{
    backgroundColor:'transparent'
  },
  activityRowMenu:{
    paddingRight:10,
    marginRight:20
  },
  analisiChart:{
    display:'flex',
    width:'40%'
  },
  analisiChartRight:{
    marginLeft:20,
    height:200,
    width:200
  },
  buttonAnalisi:{
    borderColor:'#8a8a8a',
    color:'#535353',
    margin:'0 auto',
    marginTop:10,
    width:150,
    '&:hover': {
      borderColor:'#A5D7CF',
      backgroundColor: 'transparent !important',
    }
  },
  tabOption:{
    fontSize:'0.6vw',
    '&:hover':{
      backgroundColor:'#e9f4ff !important'
    }
  }
}))

export default() => {

  //Loader onEffect state
  const [loader,setLoader] = useState(false)
  //API Integration
  const { getAssetList, assetList, getGroupAssetList, getInterventoList, getLastReport, getActivityList, getUserList, userList, getFullProgrammaReq,clientList, getClientList, GetAcquisizione, getAllegato, deleteContract } = webservice()
  
  //Data profile vars
  const { getUserData, setDrawer,getDrawer } = userData();
  const { setContractReferent,setContractType, getContractListData, setContractActivity, setNewContractData, setNewContractAcquisizione, setContractInvoice, setNewContractType,setNewUploadsData,setContractDocument} = contractData()
  const { getAnagraficaData, getAssetListData, getGroupedAsset, getInterventoListData, getLastReportData, getActivityListData,getFullProgramma,getAcquisizioneData, getAllegatoData } = anagraficaData()
  const data = getAnagraficaData()
  console.log(data)
  //Activity button handleActivity
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Switch icona tipologia
  function handleTipology(type) {
    switch(type.toLowerCase()){
      case 'elettrico':
        return <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/tipologia/elettrico.png')}/>
        break;
      case 'sicurezza':
        return <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/tipologia/sicurezza.png')}/>
        break;
      case 'tecnologico':
        return <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/tipologia/tecnologico.png')}/>
        break;
      case 'antincendio':
        return <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/tipologia/antincendio.png')}/>
        break;
      
    }
  }

  function writeYear(tmp){
    let year = ''
    if (tmp !== null && tmp !== undefined) {
      year = tmp.split('-')[0]
    }else{
      year = 'N'
    }
    return year
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  
  function formatNumbers(curr){
    return new Intl.NumberFormat('eu-EU', { 
        style: 'currency', 
        currency: 'EUR', 
        minimumFractionDigits: 2, 
    }).format(parseInt(curr)); 
}

  //Formattazione data
  function dataNormal(date){
    let val = date.split('T')[0]
    val = val.split('-')
    return ( val[2] + '/' + val[1] + '/' + val[0] )
  }

  //Data Anagrafica
  const [analisiChartData, setAnalisiChartData] = useState([])
  const [intList,setIntList] = useState([])
  const [lastRep,setLastRep] = useState([])
  const [activityList,setActivityList] = useState([])
  const classes = useStyles();

  const exportType = "csv"

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  //Asset list data
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [assetListData,setAssetListData] = useState([])
  const [assetListDataFiltered,setAssetListDataFiltered] = useState([])
  const [repChart,setRepChart] = useState([])
  const history = useHistory();
  const [groupedAsset,setGroupedAsset] = useState([])
  const [clientName, setClientName] = useState('')
  useEffect(() => {

    let actualMonth = 12

    const initialData = async ()  => {
      setLoader(true)
      await delay(500)
      await getUserList(getUserData().Token)
      await getAllegato( getUserData().Token,data.id )
      await getAssetList(getUserData().Token, data.id)
      await getGroupAssetList(getUserData().Token, data.id)
      await getInterventoList(getUserData().Token, data.id)
      await getLastReport(getUserData().Token, data.id)
      await getActivityList(getUserData().Token, data.id)
      await getFullProgrammaReq(getUserData().Token)
      await getClientList( getUserData().Token )
      await GetAcquisizione( getUserData().Token, data.id )
      await delay(2500);
      setIntList( getInterventoListData )
      setLastRep( getLastReportData() )
      setActivityList( getActivityListData() )
      //Riempimento analisi manutenzione chart
      for(let i= 1;i<=actualMonth; i++){
        let toSet = analisiChartData;
        function chooseMonth(num){
          switch(num){
            case 1:
              return 'GEN'
              break;
            case 2:
              return 'FEB'
              break;
            case 3:
              return 'MAR'
              break;
            case 4:
              return 'APR'
              break;
            case 5:
              return 'MAG'
              break;
            case 6:
              return 'GIU'
              break;
            case 7:
              return 'LUG'
              break;
            case 8:
              return 'AGO'
              break;
            case 9:
              return 'SET'
              break;
            case 10:
              return 'OTT'
              break;
            case 11:
              return 'NOV'
              break;
            case 12:
              return 'DIC'
              break;
          }
        }
        toSet.push( {code:chooseMonth(i),name: i, Ordinari: 0, Straordinari: 0,Manutenzioni: 0})
        setAnalisiChartData(toSet)
      }
      let tmpRep = []
      for(let i = 1; i<=12; i++){
        function chooseMonth(num){
          switch(num){
            case 1:
              return 'Gennaio'
              break;
            case 2:
              return 'Febbraio'
              break;
            case 3:
              return 'Marzo'
              break;
            case 4:
              return 'Aprile'
              break;
            case 5:
              return 'Maggio'
              break;
            case 6:
              return 'Giugno'
              break;
            case 7:
              return 'Luglio'
              break;
            case 8:
              return 'Agosto'
              break;
            case 9:
              return 'Settembre'
              break;
            case 10:
              return 'Ottobre'
              break;
            case 11:
              return 'Novembre'
              break;
            case 12:
              return 'Dicembre'
              break;
          }
        }
        tmpRep.push( {code:chooseMonth(i),name: i, Ordinari: 0, Straordinari: 0,})
      }
      //set valori da backend
      console.log( getInterventoListData() )
      let values = getInterventoListData().filter( f => f.accepted === 1)
      values.map( (e,index) => {
        let month = e.created.split('-')[1]
        let toUpdateS = tmpRep
        let toUpdate = analisiChartData
        if(toUpdate[month-1] !== undefined ){
          if(e.tipologia === 'ordinaria'){
            toUpdate[month-1].Ordinari = analisiChartData[month-1].Ordinari + 1
            toUpdateS[month-1].Ordinari = analisiChartData[month-1].Ordinari + 1
          }else if(e.tipologia === 'straordinaria'){
            toUpdate[month-1].Straordinari = analisiChartData[month-1].Straordinari + 1
            toUpdateS[month-1].Straordinari = analisiChartData[month-1].Straordinari + 1
          }else{
            toUpdate[month-1].Manutenzioni = analisiChartData[month-1].Manutenzioni + 1
            toUpdateS[month-1].Manutenzioni = analisiChartData[month-1].Manutenzioni + 1
          }

        }
        setAnalisiChartData(toUpdate)
        setRepChart(tmpRep)
      } )
      setLoader(false)
      setGroupedAsset(getGroupedAsset())
      setAssetListData(getAssetListData())
      setAssetListDataFiltered(getAssetListData())
    }
    initialData()

  }, [] )

   //Contratti selezionati per Esportazione
   const [selected,setSelected] = useState([])
   const handleSelect = (e) => {
     let joined = []
     let res = selected.filter(function(item){ return item.numero == e.numero }).length >0 ? true : false
     if (res  === false) {
       joined = [...selected,e]
     }else{
       joined = selected.filter( function(item) {
         return item.numero !== e.numero
       })
     }
     setSelected(joined)
   }
   const isSelected = (e) => {
     let res = selected.filter( function(item)  {return item.numero === e.numero} )
     return res.length > 0 ? true : false
   }


  //TABPANEL FUNCTIONS
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);
  const [switcherAsset,setSwitcherAsset] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const theme = useTheme();
  //Sub flag
  const [flagSub,setFlagSub] = useState(false)

  function filterAssets(filters){
      let tmp = assetListData

      if( filters.nome !== null && filters.nome.length > 0 ){
        tmp = tmp.filter( e => e.titolo.includes(filters.nome) )
      }
      if( filters.cMatricola !== null && filters.cMatricola.length > 0 ){
        tmp = tmp.filter( e=> e.matricola.includes(filters.cMatricola.toUpperCase()) )
      }
      if( filters.cAnagrafica !== null && filters.cAnagrafica.length > 0 ){
        tmp = tmp.filter( e=> e.codice.includes(filters.cAnagrafica.toUpperCase()) )
      }
      if( filters.posizione !== null && filters.posizione.length > 0 ){
        tmp = tmp.filter( e=> e.edificio.toLowerCase().includes(filters.posizione.toLowerCase()) || e.piano.toLowerCase().includes(filters.posizione.toLowerCase()) || e.stanza.toLowerCase().includes(filters.posizione.toLowerCase()) )
      }
      setAssetListDataFiltered( tmp )
    
  }

 // console.log(data)
 function indexSetter(num){
   if (getContractListData().filter(e => e.isSub === getAnagraficaData().id).length > 0){
     return (num++)
   }else{
     return (num)
   }
 }

 //ID GROUP ASSETS
 const [groupTarget,setGroupTarget] = React.useState(0)

 const [flagIntervento,setFlagIntervento] = React.useState(false)
  return (
    <div style={{display:'flex'}}>
      {/* LOADER ONEFFECT DISPLAY */}
      {loader == true ? (
        <Backdrop className={classes.backdrop} open={loader} >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null }

      {/* SUB IMPIANTO INITIAL CALL*/}
       <NewSubImpianto flag={flagSub} handleCloseSub={e=> setFlagSub(false)}/>
       {/* New man CALL*/}
       <RichiestaIntervento flag={flagIntervento} handleClose={e=> setFlagIntervento(!flagIntervento)} type={'man'} data={data} handleReload={e=> window.location.reload(false)} />

      

      <Sidebar></Sidebar>
      <Container maxWidth="False" style={{padding:0,margin:0,flex:1,width:'100%',marginLeft:'-13%'}}>

        <Container maxWidth="False" className={classes.Header}>
            <Box className={classes.toolbarOrder}>
                <Box className={classes.headerPart} style={{width:'70%'}}>
                    <MenuIcon style={{cursor:'pointer',color:'black'}} onClick={e => {
                      setDrawer()
                      forceUpdate()
                    }}/>                  
                    <img className={classes.standardRowImage} src={require('../../assets/images/anagraficaContratto/CONTRATTO.png')} />
                    <Typography className={classes.boldHeaderText}> {'M.' + zeroPad(data.id,4) + '/' + writeYear(data.DataCrea)} </Typography>
                    <Box className={classes.headerRow}>
                      <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/NOMECLIENTE.png')} />
                      <Typography className={classes.headerText}>{clientList !== undefined && clientList.length>0 && clientList.filter( v => v.id == data.cliente ) !== undefined ? clientList.filter( v => v.id == data.cliente )[0].rSociale : "CLIENTE NON DISPONIBILE"}</Typography>
                    </Box>
                    <Box className={classes.headerRow}>
                      <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/POSIZIONE.png')} />
                      <Typography className={classes.headerText}>{data.indirizzo}</Typography>
                    </Box>
                    <Box className={classes.headerRow}>
                      {handleTipology(data.tipologia)}
                      <Tooltip title={data.tipologia}>
                        <Typography className={classes.headerText}>{data.tipologia.split(',').length > 1 ? 'Varie tipologie' : data.tipologia}</Typography>
                      </Tooltip>
                    </Box>
                    <Box className={classes.headerRow}>
                      <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/IMPORTO.png')} />
                      <Typography className={classes.headerText}> { getAcquisizioneData() !== undefined && getAcquisizioneData() !== null && getAcquisizioneData()[0] !== undefined ? (formatNumbers(getAcquisizioneData()[0].pTot) ) : 'N/D' } </Typography>
                    </Box>
                    <Box className={classes.headerRow}>
                      <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/SCADENZA.png')} />
                      <Typography className={classes.headerText}> {dataNormal(data.dataFine)} </Typography>
                    </Box>
                </Box>
                <Box className={classes.headerPart} style={{width:'10%'}}>
                    
                    <Box>
                      <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/CERCA.png')} />
                    </Box>
                    <Box>
                    <Button className={classes.pulsanteAttivita} aria-controls="simple-menu" style={{backgroundColor:'transparent'}}aria-haspopup="true" onClick={handleClick}>
                      Attività
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem className={classes.activityRowMenu}onClick={ e => {
                        e.preventDefault()
                        setFlagIntervento(true)
                      }}>
                        <ListItemText primary="Apri Intervento" />
                        <img style={{width:16,marginLeft:10}}src={require('../../assets/images/anagraficaContratto/asset/rIntervento.png')} />
                      </MenuItem>
                      {/*<MenuItem className={classes.activityRowMenu}onClick={handleClose}>
                        <ListItemText primary="Aggiungi Documento" />
                        <img style={{width:16}}src={require('../../assets/images/listContratti/contrattoPausa.png')} />
                  </MenuItem>*/}
                      <MenuItem className={classes.activityRowMenu} onClick={ e => {
                        setContractType('sub')
                        setNewContractData(null)
                        setNewContractAcquisizione(null)
                        setContractActivity('reset')
                        setContractReferent('reset')
                        setContractInvoice(null)
                        setNewContractType(null)
                        setNewUploadsData(null)
                        setContractDocument('reset')
                        history.push('/contratti/nuovoContratto')
                        } }>
                        <ListItemText primary="Sub Impianto" />
                        <img style={{width:16,marginLeft:10}}src={require('../../assets/images/anagraficaContratto/anagraficaSituazione/subImpianto.png')} />
                      </MenuItem>
                      <MenuItem className={classes.activityRowMenu}onClick={async e => {
                        e.preventDefault()
                        let toRem={
                          token:getUserData().Token,
                          id:getAnagraficaData().id
                        }
                       await deleteContract(toRem)
                       await delay(500)
                       history.push('/contratti/listaContratti')
                      }}>
                        <ListItemText primary="Cancella Contratto" />
                        <DeleteOutlineIcon style={{fontSize:16,color:'red',marginLeft:10}}/>
                      </MenuItem>
                      <MenuItem className={classes.activityRowMenu}onClick={handleClose}>
                        <ListItemText primary="Esporta" onClick={ e => {
                          e.preventDefault()
                          let data = [getAnagraficaData()]
                          let fileName = "Data M " + data[0].numero;
                          exportFromJSON({ data, fileName, exportType })
                        } }/>
                        <img style={{width:16,marginLeft:10}}src={require('../../assets/images/listContratti/exc.png')} />
                      </MenuItem>
                    </Menu>
                    </Box>
                </Box>
            </Box>
        </Container> 
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={indexSetter(0)} dir={theme.direction}>
              {/* ANAGRAFICA MAINPAGE SWITCH*/}
              <Box>
                  <AppBar elevation={0} style={{marginTop:1,width:'100%',backgroundColor:'#f8f8f8'}}position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab className={classes.tabOption} label="Manutenzione" {...a11yProps(0)} />
                  <Tab className={classes.tabOption} label="Report" {...a11yProps(1)} />
                  <Tab className={classes.tabOption} label="Documenti" {...a11yProps(2)} />
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="IMPOSTAZIONI" {...a11yProps(3)} /> : null : null}
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="SOTTO IMPIANTO" {...a11yProps(4)} /> : null : null}
                  
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} {...a11yProps(5)} aria-label='PROGRAMMAMANUTENZIONE' icon={<img style={{width:24}}  src={require('../../assets/images/anagraficaContratto/PROGRAMMAMANUTENZIONE.png')} />}/> : null : null}
                  
                </Tabs>
              </AppBar>
                  <Box style={{display:'flex',justifyContent:'space-between',background:'white',paddingTop:30,paddingLeft:0,paddingRight:0}}> 
                  <AnalisiChart chartData={analisiChartData}/>
                  <Situazione nAsset={assetListData.length} infoTicket={intList} nAccount={getAnagraficaData().account.split(',').length}/>
                  <Ticket data={intList}/>
                </Box>
              </Box>
              <Middle contractID={data.id} token={getUserData().Token} switcher={switcherAsset} assets={assetListData} handleSwitcher={e=> setSwitcherAsset(!switcherAsset)} filterAction={ e => filterAssets(e) }/>
              {switcherAsset === false ? (
                <Box style={{display:"flex",justifyContent:'flex-start',marginTop:20,flexWrap:'wrap'}}>
                { assetListDataFiltered !== null && assetListDataFiltered !== undefined ? (
                  assetListDataFiltered.map( item => {
                    return item.byGroup == 0 ? (
                    <Asset visual={'box'} intList={intList} type={1} data={item} idContratto={data.id} updAssList={ e => setAssetListData(getAssetListData()) } /> ) : null
                  } )
                ) : null}
                { groupedAsset !== null && groupedAsset !== undefined ? (
                  groupedAsset.map( item => {
                    return <>
                            <Asset updAssList={ e => setAssetListData(getAssetListData()) } visual={'box'} type={0} data={item} idContratto={data.id} groupPressed={e => {
                              setGroupTarget(e)
                              console.log(e)
                              setSwitcherAsset(!switcherAsset)
                              } } />
                           </>
                  } )
                ) : null}
              </Box>
                
              ) : (
                <Box style={{display:"flex",justifyContent:'space-around',marginTop:20,flexWrap:'wrap'}}>
                  {assetListDataFiltered !== null ? console.log(assetListDataFiltered.filter(e=>e.byGroup === groupTarget)) : null}
                { assetListDataFiltered !== null && assetListDataFiltered !== undefined ? (
                  assetListDataFiltered.map( item => {
                    return item.byGroup === groupTarget ? (
                    <Asset visual={'box'} updAssList={ e => setAssetListData(getAssetListData()) } type={1} data={item} idContratto={data.id}/> ) : null
                  } )
                ) : null}
              </Box>
              )}
            </TabPanel>
            <TabPanel value={value} index={indexSetter(1)} dir={theme.direction}>
              <Box>
                  <AppBar elevation={0} style={{marginTop:1,width:'100%',backgroundColor:'#f8f8f8'}}position="static">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                      >
                      <Tab className={classes.tabOption} label="Manutenzione" {...a11yProps(0)} />
                  <Tab className={classes.tabOption} label="Report" {...a11yProps(1)} />
                  <Tab className={classes.tabOption} label="Documenti" {...a11yProps(2)} />
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="IMPOSTAZIONI" {...a11yProps(3)} /> : null : null}
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="SOTTO IMPIANTO" {...a11yProps(4)} /> : null : null}
                  
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} {...a11yProps(5)} aria-label='PROGRAMMAMANUTENZIONE' icon={<img style={{width:24}}  src={require('../../assets/images/anagraficaContratto/PROGRAMMAMANUTENZIONE.png')} />}/> : null : null}
                  
                </Tabs>
                    </AppBar>
                  <Box style={{display:'flex',justifyContent:'space-around',background:'white'}}>
                  <ReportManutenzione data={data}/>
                  <ReportChart data={repChart}/>
                  <LastReport dataReport={lastRep}/>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={indexSetter(2)} dir={theme.direction}>
              <AppBar elevation={0} style={{marginTop:1,width:'100%',backgroundColor:'#f8f8f8'}}position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab className={classes.tabOption} label="Manutenzione" {...a11yProps(0)} />
                  <Tab className={classes.tabOption} label="Report" {...a11yProps(1)} />
                  <Tab className={classes.tabOption} label="Documenti" {...a11yProps(2)} />
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="IMPOSTAZIONI" {...a11yProps(3)} /> : null : null}
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="SOTTO IMPIANTO" {...a11yProps(4)} /> : null : null}
                  
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} {...a11yProps(5)} aria-label='PROGRAMMAMANUTENZIONE' icon={<img style={{width:24}}  src={require('../../assets/images/anagraficaContratto/PROGRAMMAMANUTENZIONE.png')} />}/> : null : null}
                  
                </Tabs>
              </AppBar>
             <Documenti data={getAllegatoData() !== null ? getAllegatoData() : null}/>
            </TabPanel>
            <TabPanel value={value} index={indexSetter(3)} dir={theme.direction}>
                <AppBar elevation={0} style={{marginTop:1,width:'100%',backgroundColor:'#f8f8f8'}}position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab className={classes.tabOption} label="Manutenzione" {...a11yProps(0)} />
                  <Tab className={classes.tabOption} label="Report" {...a11yProps(1)} />
                  <Tab className={classes.tabOption} label="Documenti" {...a11yProps(2)} />
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="IMPOSTAZIONI" {...a11yProps(3)} /> : null : null}
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="SOTTO IMPIANTO" {...a11yProps(4)} /> : null : null}
                  
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} {...a11yProps(5)} aria-label='PROGRAMMAMANUTENZIONE' icon={<img style={{width:24}}  src={require('../../assets/images/anagraficaContratto/PROGRAMMAMANUTENZIONE.png')} />}/> : null : null}
                  
                </Tabs>
              </AppBar>
                <Impostazioni data={data}/>
            </TabPanel>
            <TabPanel value={value} index={indexSetter(4)} dir={theme.direction}>
            <Box>
                <AppBar elevation={0} style={{marginTop:1,width:'100%',backgroundColor:'#f8f8f8'}}position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                  <Tab className={classes.tabOption} label="Manutenzione" {...a11yProps(0)} />
                  <Tab className={classes.tabOption} label="Report" {...a11yProps(1)} />
                  <Tab className={classes.tabOption} label="Documenti" {...a11yProps(2)} />
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="IMPOSTAZIONI" {...a11yProps(3)} /> : null : null}
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="SOTTO IMPIANTO" {...a11yProps(4)} /> : null : null}
                  
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} {...a11yProps(5)} aria-label='PROGRAMMAMANUTENZIONE' icon={<img style={{width:24}}  src={require('../../assets/images/anagraficaContratto/PROGRAMMAMANUTENZIONE.png')} />}/> : null : null}
                  
                </Tabs>
                  </AppBar>
                <Box style={{paddingLeft:'2%',marginTop:50,flex:1,FlexWrap:'wrap',display:'flex',justifyContent:'flex-start'}}>
                {getContractListData().filter(e => e.isSub === getAnagraficaData().id).map(  (item) => {
                  return <Contratto onClick={(e) => handleSelect(item)} selected={isSelected(item)} nome={item.titolo} codice={item.numero} descrizione={item.descrizione} entire={item} tck={getFullProgramma()!==undefined && getFullProgramma() !== null ? getFullProgramma().filter(e => e.byContratto == item.id && e.stato == 'attivo') : null}></Contratto>
                })}
                </Box>
              </Box>
            </TabPanel>
            
            <TabPanel value={value} index={indexSetter(5)} dir={theme.direction}>
              <AppBar elevation={0} style={{marginTop:1,width:'100%',backgroundColor:'#f8f8f8'}}position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab className={classes.tabOption} label="Manutenzione" {...a11yProps(0)} />
                  <Tab className={classes.tabOption} label="Report" {...a11yProps(1)} />
                  <Tab className={classes.tabOption} label="Documenti" {...a11yProps(2)} />
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="IMPOSTAZIONI" {...a11yProps(3)} /> : null : null}
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="SOTTO IMPIANTO" {...a11yProps(4)} /> : null : null}
                  
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} {...a11yProps(5)} aria-label='PROGRAMMAMANUTENZIONE' icon={<img style={{width:24}}  src={require('../../assets/images/anagraficaContratto/PROGRAMMAMANUTENZIONE.png')} />}/> : null : null}
                  
                </Tabs>
              </AppBar>
             <ProgrammaManuntezione asset={activityList}/>
            </TabPanel>
            <TabPanel value={value} index={indexSetter(6)} dir={theme.direction}>
                <AppBar elevation={0} style={{marginTop:1,width:'100%',backgroundColor:'#f8f8f8'}}position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab className={classes.tabOption} label="Manutenzione" {...a11yProps(0)} />
                  <Tab className={classes.tabOption} label="Report" {...a11yProps(1)} />
                  <Tab className={classes.tabOption} label="Documenti" {...a11yProps(2)} />
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="IMPOSTAZIONI" {...a11yProps(3)} /> : null : null}
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} label="SOTTO IMPIANTO" {...a11yProps(4)} /> : null : null}
                  
                  {getUserData()!==undefined ? getUserData().Tipologia !== 'Cliente' ? <Tab className={classes.tabOption} {...a11yProps(5)} aria-label='PROGRAMMAMANUTENZIONE' icon={<img style={{width:24}}  src={require('../../assets/images/anagraficaContratto/PROGRAMMAMANUTENZIONE.png')} />}/> : null : null}
                  
                </Tabs>
              </AppBar>
                <Attivita />
            </TabPanel>
          
              
            </SwipeableViews>
        


        
        
      </Container>
      
       
    </div>
  )
}
