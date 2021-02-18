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
import clientData from '../data/clientData'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Documenti from '../anagraficaContratto/parts/Documenti'
import Impostazioni from './parts/Impostazioni'

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
    height:'1vw',
  },
  standardRowImageSMALL:{
    height:22,
    marginRight:10
  },
  toolbarOrder:{
    display:'flex',
    justifyContent:'space-between',
    paddingRight:'2%'
  },
  headerPart:{
    display:'flex',
    justifyContent:'flex-start',
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
    fontSize:20,
    color:'#898989'
  },
  boldHeaderText:{
    fontSize:'1vw',
    color:'#333',
    fontWeight:'bold'
  },
  filterArrow:{
    color:'#898989'
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
    '&:hover':{
      backgroundColor:'#e9f4ff !important'
    }
  },
  stdIMGSMALL:{
    height:'1vw',
    margin:'auto 15px auto 0'
  },
  selectFilterButton:{
    width:'50%',
    '&:hover':{
      backgroundColor:'transparent !important'
    }
  },
  filterArrow:{
    margin:'auto 0'
  },
  boxTst:{
    '&:hover':{
      backgroundColor:'whitesmoke !important'
    },
    cursor:'pointer'
  }
}))

export default() => {

  //Loader onEffect state
  const [loader,setLoader] = useState(false)
  //API Integration
  const { GetFullInterventoList, getLastReport, getActivityList, getInterventoListCLIENT, getFullAllegato } = webservice()
  
  //Client List Data
  const { getClientData, getInterventoTMP } = clientData()
  //Data profile vars
  const { getUserData, setDrawer,getDrawer } = userData();
  //Contract vars
  const { setContractType, getContractListData } = contractData()
  const { getAnagraficaData, getInterventoListData, getLastReportData, getActivityListData, getAllegatoData } = anagraficaData()
  const data = getAnagraficaData()
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
  
  //Formattazione data
  function dataNormal(date){
    let val = date.split('T')[0]
    val = val.split('-')
    return ( val[2] + '/' + val[1] + '/' + val[0] )
  }

  //Data Anagrafica
  const [intList,setIntList] = useState([])
  const [lastRep,setLastRep] = useState([])
  const [activityList,setActivityList] = useState([])
  const [docList,setDocList] = useState([])

  //ALL INT
  const [fullIntList,setFullIntList] = React.useState([])

  const classes = useStyles();
  
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  //Asset list data
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const history = useHistory();
  useEffect(() => {

    const initialData = async ()  => {
      setLoader(true)
      let tmpIntervento = getContractListData().filter( e => e.cliente ==  getClientData().id)
        getInterventoListCLIENT(getUserData().Token,tmpIntervento)
        await GetFullInterventoList(getUserData().Token)
        await getFullAllegato(getUserData().Token)
        await delay(1000);
        if( getInterventoTMP() !== null ){
          let tmp = getInterventoTMP().sort(function(x, y){
            return x.created - y.created;
          })
          setLastRep(tmp[0])
        }
      //await getLastReport(getUserData().Token, data.id)
      //await getActivityList(getUserData().Token, data.id)
      
      //setLastRep( getLastReportData() )
      //setActivityList( getActivityListData() )
      setLoader(false)

        //Finding ALL INTERVENTI OF CLIENT
        let fin = []
        let tt = getContractListData().filter( e => e.cliente ==  getClientData().id )
        if(tt.length > 0){
          getInterventoListData().map( v => {
            tt.map( cc => {
              if(v.byContratto == cc.id){
                fin.push(v)
              }
            } )
          } )
        }
        setFullIntList(fin)
        setIntList( fin )
        let dd = []
        if(getAllegatoData() !== null){
          getAllegatoData().map( item => {

            tt.map( e => {
              if(item.byContratto == e.id){
                dd.push(item)
              }
            })
  
          } )
          setDocList(dd)
        }
        

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
     console.log(joined)
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const theme = useTheme();
  //Sub flag
  const [flagSub,setFlagSub] = useState(false)

  //Normal Contract Filter
  const [anchorElNorm, setAnchorElNorm] = React.useState(null);
  const handleClickNormal = (event) => {
    setAnchorElNorm(event.currentTarget);
  };
  function handleCloseNorm () {
    setAnchorElNorm(null);
  };

  //Sub Contract Filter
  const [anchorElSub, setAnchorElSub] = React.useState(null);
  const handleClickSub = (event) => {
    setAnchorElSub(event.currentTarget);
  };
  const handleCloseSub = () => {
    setAnchorElSub(null);
  };

  //Update to view contract
  function updateView(list,idContratto){

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
      

      <Sidebar></Sidebar>
      <Container maxWidth="False" style={{padding:0,margin:0,flex:1,width:'100%',marginLeft:'-13%'}}>
        { console.log( getInterventoListData() ) }
        <Container maxWidth="False" className={classes.Header}>
            <Box className={classes.toolbarOrder}>
                <Box className={classes.headerPart} style={{width:'62%',justifyContent:'space-between'}}>
                    <MenuIcon style={{cursor:'pointer',color:'black'}} onClick={e => {
                      setDrawer()
                      forceUpdate()
                    }}/>
                    <img className={classes.standardRowImage} src={require('../../assets/images/anagraficaCliente/CLIENTE.png')} />
                    <Typography className={classes.boldHeaderText}>LISTA CLIENTI</Typography> 
                  <Box style={{display:'flex',justifyContent:'center',width:'20%'}}>
                    <img className={classes.stdIMGSMALL} src={require('../../assets/images/anagraficaContratto/NOMECLIENTE.png')} />
                    <Typography className={classes.boldHeaderText} style={{textTransform:'capitalize',color:'#898989',fontSize:'0.8vw',fontWeight:'normal'}}>{ getClientData() !== null ? getClientData().rSociale : 'Caricamento...' }</Typography> 
                  </Box>
                  
                      <Button className={classes.selectFilterButton} onClick={handleClickNormal} style={{width:'30%',justifyContent:'space-evenly',width:'30%',display:'flex'}}>
                      <img className={classes.stdIMGSMALL} src={require('../../assets/images/anagraficaContratto/CONTRATTO.png')} /> 
                        Lista Contratti
                        <KeyboardArrowDownIcon className={classes.filterArrow}></KeyboardArrowDownIcon>
                      </Button>
                      
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorElNorm}
                        keepMounted
                        open={Boolean(anchorElNorm)}
                        onClose={handleCloseNorm}
                      >
                        {getContractListData() !==undefined && getContractListData() !== null ? (
                          getContractListData().filter( cc => cc.isSub == 0 && cc.cliente == getClientData().id ).map( item => {
                            return (
                              <MenuItem className={classes.selectContract} onClick={ e => {
                                setIntList( fullIntList.filter( v => v.byContratto == item.id ) )
                                if ( getAllegatoData() !== null ){
                                  setDocList( getAllegatoData().filter( ee => ee.byContratto == item.id ) )
                                }
                              }}>
                                <ListItemText className={classes.selectContractText}primary={ 'M.' + zeroPad(item.id,4) + '/' + writeYear(item.DataCrea) + '- ' + item.titolo }/>
                              </MenuItem>
                            )
                          } )
                        ) : null}
                        
                      </Menu>  

                      <Button className={classes.selectFilterButton} onClick={ e => handleClickSub(e)} style={{width:'30%',justifyContent:'space-evenly',width:'30%',display:'flex'}}>
                      <img className={classes.stdIMGSMALL} src={require('../../assets/images/anagraficaContratto/CONTRATTO.png')} /> 
                        Sub Contratti
                        <KeyboardArrowDownIcon className={classes.filterArrow}></KeyboardArrowDownIcon>
                      </Button>
                      
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorElSub}
                        keepMounted
                        open={Boolean(anchorElSub)}
                        onClose={handleCloseSub}
                      >
                        {getContractListData() !==undefined && getContractListData() !== null ? (
                          getContractListData().filter( cc => cc.isSub !== 0 && cc.cliente == getClientData().id ).length > 0 ? ( 
                            getContractListData().filter( cc => cc.isSub !== 0 && cc.cliente == getClientData().id ).map( item => {
                              return (
                                <MenuItem className={classes.selectContract} onClick={ e => {
                                  setIntList( fullIntList.filter( v => v.byContratto == item.id ) )
                                  if ( getAllegatoData() !== null ){
                                    setDocList( getAllegatoData().filter( ee => ee.byContratto == item.id ) )
                                  }
                                }}>
                                  <ListItemText className={classes.selectContractText}primary={ 'M.' + zeroPad(item.id,4) + '/' + writeYear(item.DataCrea) + '- ' + item.titolo }/>
                                </MenuItem>
                              )
                            } )
                           ) :  (
                               <MenuItem className={classes.selectContract}>
                                <ListItemText className={classes.selectContractText}primary={'Questo cliente non ha sub contratti'}/>
                              </MenuItem>
                           )
                        ) : null}
                      </Menu>   
                           
                </Box>
                <Box className={classes.headerPart} style={{width:'10%'}}>
                    
                    <Box>
                      <img className={classes.standardRowImageSMALL} src={require('../../assets/images/anagraficaContratto/CERCA.png')} />
                    </Box>
                    {/*<Box>
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
                      
                      <MenuItem className={classes.activityRowMenu}onClick={handleClose}>
                        <ListItemText primary="Esporta" />
                        <DeleteOutlineIcon style={{fontSize:16,color:'red'}}/>
                           </MenuItem>
                    </Menu>
                    </Box>
                  */}
                </Box>
            </Box>
        </Container> 
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/* ANAGRAFICA MAINPAGE SWITCH*/}
              <Box>
                  <AppBar elevation={0} style={{marginTop:1,width:'60%',backgroundColor:'#f8f8f8'}}position="static">
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
                  <Tab className={classes.tabOption} label="Impostazioni" {...a11yProps(3)} />
                  </Tabs>
              </AppBar>
                  <Box style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap',background:'white',paddingTop:30,paddingLeft:50,paddingRight:50}}> 
                  {intList !== null ? <><Situazione infoTicket={intList}/><Ticket data={intList}/></> : (
                      <Box style={{paddingTop:'50px',paddingBottom:'50px',textAlign:'center'}}>
                        <Typography style={{fontSize:'0.8vw',letterSpacing:'.1em',marginBottom:'20px'}} >Cliente non ha informazioni da mostrare</Typography>
                        <HourglassEmptyIcon style={{fontSize:'1.5vw',margin:'0 auto'}}/>
                      </Box>
                  )}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Box>
                  <AppBar elevation={0} style={{marginTop:1,width:'60%',backgroundColor:'#f8f8f8'}}position="static">
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
                        <Tab className={classes.tabOption} label="Impostazioni" {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                  <Box style={{display:'flex',justifyContent:'space-around',background:'white'}}>
                  <ReportManutenzione intList={intList}/>
                  <ReportChart data={intList}/>
                  <LastReport dataReport={lastRep}/>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <AppBar elevation={0} style={{marginTop:1,width:'60%',backgroundColor:'#f8f8f8'}}position="static">
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
                  <Tab className={classes.tabOption} label="Impostazioni" {...a11yProps(3)} />
                  </Tabs>
              </AppBar>
             <Documenti data={docList}/>
            </TabPanel>

            <TabPanel value={value} index={3} dir={theme.direction}>
              <AppBar elevation={0} style={{marginTop:1,width:'60%',backgroundColor:'#f8f8f8'}}position="static">
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
                  <Tab className={classes.tabOption} label="Impostazioni" {...a11yProps(3)} />
                  </Tabs>
              </AppBar>
             <Impostazioni data={getClientData()} />
            </TabPanel>
          </SwipeableViews>
        


        
        
      </Container>
      
       
    </div>
  )
}
