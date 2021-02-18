import React, { useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../../components/Sidebar"
import { Box, Container, IconButton, Radio, Typography, Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import webservice from '../../../api/webservice'
import { useHistory } from "react-router-dom";
import userData from '../../data/userData';
import InfoIcon from '@material-ui/icons/Info';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DescriptionIcon from '@material-ui/icons/Description';
import anagraficaData from '../../data/anagraficaData';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIntervento from './InfoIntervento';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    Header:{
        backgroundColor: "#00ADA2",
        height: 50,
        display:'flex',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        alignItems:'center'
      },
      toolBar:{
        height:'auto',
        backgroundColor:'white',
        paddingTop:1,
        paddingBottom:1,
        marginBottom:30
      },
      toolBox:{
        width:'18%',
        display:'flex',
        justifyContent:'space-evenly'
      },
      pulsanteAttivita:{
        borderRadius:20,
        padding:'5px 50px',
        border:'1px solid #5692d8',
        fontWeight:'bold',
        letterSpacing:'.05em',
        color:'#5692d8'
      },
      "&:hover":{
        backgroundColor:'transparent'
      },
      columnText:{
        fontWeight:'bold',
        color:'#333',
        fontSize:'.7vw'
    },
    oneRow:{
        display:'flex',
        justifyContent:'space-around',
        paddingTop:5,
        paddingBottom:5,
        marginBottom:10,
        backgroundColor:'white'
    },
    imgSTD:{
        width:24
    },
    ticketColumn:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    lightB:{
      '&:hover':{
        background:'#eaf8fb !important'
      }
    },
    lightR:{
      '&:hover':{
        background:'#f9e2d8 !important'
      }
    },
    iconIMG:{
        height:18
    },
    singleColumn:{
      textAlign:'center',
      display:'flex',
      flexDirection:'row',
    },
    filterText:{
      color:'#333',
      letterSpacing:'.1em'
    },
    filterArrow:{
      color:'#898989'
    }
    
}))
function Programma() {
   
   //Data profile vars
  const { getInterventoList,updateAccepted,GetClienteFromProgramma,getAssedById, GetFullInterventoList } = webservice()
  const { setDrawer,getUserData } = userData();
  const { getInterventoListData,getAnagraficaData } = anagraficaData()
  //Ticket List var
  const [ticketList,setTicketList] = React.useState([])

  const delay = ms => new Promise(res => setTimeout(res, ms));
  const history = useHistory();

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    async function initialData(){
      //AGGIUNGERE .map per prendere tutti gli ID dei contratti
      await GetFullInterventoList(getUserData().Token)
      await delay(1000)
      //let toShow =  getInterventoListData().filter( current => current.accepted !== 3 )
      setTicketList(getInterventoListData())
      forceUpdate()
    }
    initialData()
    //console.log(ticketList[0])
  }, [])

//Checked state shower
  const [checked,setChecked] = React.useState([])

  //Switch priority
  function showPriority(type){
    switch(type){
      case 'urgente':
          return (require('../../../assets/images/anagraficaContratto/ticket/pUrgente.png'))
          break;
      case 'medio':
          return (require('../../../assets/images/anagraficaContratto/ticket/pMedia.png'))
          break;
      case 'emergenza':
          return (require('../../../assets/images/anagraficaContratto/ticket/pEmergenza.png'))
          break;
      case 'basso':
          return (require('../../../assets/images/anagraficaContratto/ticket/pBassa.png'))
          break;
    }
  }
  function showPriorityColor(type){
    switch(type){
      case 'urgente':
          return 'red'
          break;
      case 'medio':
          return 'red'
          break;
      case 'emergenza':
          return 'blue'
          break;
      case 'basso':
          return '#ec5388'
          break;
    }
  }
  const classes = useStyles();

  function showChecked(itm){
    let crnt = checked.filter(e=>e.id === itm.id)
    if(crnt!== undefined && crnt!== null){
        console.log (crnt.checked === true ? true : false)
    }
  }
  const [dateArr,setDateArr] = useState(false)
  const [prioritaArr,setPrioritaArr] = useState(false)
  const [statusArr,setStatusArr] = useState(false)
  const [acceptedArr,setAcceptedArr] = useState(false)

  //Function to handle Filters
  function handleFilter(type){
    switch(type){
      case 'data':
        let def = ticketList
        console.log(def.reverse())
        setTicketList(def)
        setDateArr(!dateArr)
        forceUpdate()
        break;
      case 'priorita':
        let urg = []
        let med = []
        let eme = []
        let bas = []
        ticketList.map( item => {
          if(item.priorita === "urgente"){
            urg.push(item)
          }else if(item.priorita === "medio"){
            med.push(item)
          }else if(item.priorita === "emergenza"){
            eme.push(item)
          }else{
            bas.push(item)
          }
        } )
        setPrioritaArr(!prioritaArr)
        if(prioritaArr === false ? setTicketList( [...urg,...med,...eme,...bas] ) : setTicketList( [...urg,...med,...eme,...bas].reverse() ))
        forceUpdate()
        break;
      case 'status':
        let aperto = []
        let chiuso = []
        ticketList.map( item => {
          if(item.accepted === 1 ){
            aperto.push(item)
          }else{
            chiuso.push(item)
          }
        } )
        setStatusArr(!statusArr)
          statusArr === false ? setTicketList( [...chiuso,...aperto] ) : setTicketList( [...aperto,...chiuso] ) 
          forceUpdate()
        break;
      case 'accepted':
        let apertoA = []
        let chiusoA = []
        let sospesoA = []
        ticketList.map( item => {
          if(item.accepted === 1 ){
            apertoA.push(item)
          }else if(item.accepted == null){
            sospesoA.push(item)
          }else{
            chiusoA.push(item)
          }
        } )
        setAcceptedArr(!acceptedArr)
        acceptedArr === false ? setTicketList( [...chiusoA,...apertoA,...sospesoA] ) : setTicketList( [...sospesoA,...apertoA,...chiusoA] ) 
        forceUpdate()
        break;
    }
  }

  //Print to display status
  function showStatus(accepted){
    switch(accepted){
      case 1:
        return 'Aperto'
      case 2:
        return "Chiuso"
      default:
        return "Sospeso"
    }
  }

  //PRIORITA FILTER ZONE
  const [anchorElP, setAnchorElP] = React.useState(null);

  const handleClickP = (event) => {
    setAnchorElP(event.currentTarget);
  };

  const handleCloseP = () => {
    setAnchorElP(null);
  };
  function filterPrioritaP(type){
    let filtered = getInterventoListData().filter( current => current.accepted !== 3 ).filter( e => e.priorita == type )
    setTicketList(filtered)
    handleCloseP()
  }

  //STATUS FILTER ZONE
  const [anchorElS, setAnchorElS] = React.useState(null);

  const handleClickS = (event) => {
    setAnchorElS(event.currentTarget);
  };

  const handleCloseS = () => {
    setAnchorElS(null);
  };
  function filterPrioritaS(type){
    let filtered
    if(type === null){
      filtered = getInterventoListData().filter( current => current.accepted !== 3 ).filter( e => e.accepted == null || e.accepted === 0 )
    }else{
      filtered = getInterventoListData().filter( current => current.accepted !== 3 ).filter( e => e.accepted == type )
    }
    setTicketList(filtered)
    handleCloseS()
  }

  //ACCEPTED FILTER ZONE
  const [anchorElA, setAnchorElA] = React.useState(null);

  const handleClickA = (event) => {
    setAnchorElA(event.currentTarget);
  };

  const handleCloseA = () => {
    setAnchorElA(null);
  };

  //Activity button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //INFO TICKET ZONE
  const [infoFlag,setInfoFlag] = React.useState(false)
  const [infoTarget,setInfoTarget] = React.useState([])
  const [targetClient,setTargetClient] = React.useState()
  const [type,setType] = React.useState('')
    return (

        <div style={{display:'flex'}}>

            <Sidebar></Sidebar>
            <Container maxWidth="False" style={{padding:0,margin:0,width:'100%',marginLeft:'-13%'}}>

                <Container maxWidth="False" className={classes.Header}>
                <MenuIcon style={{cursor:'pointer',color:'white'}} onClick={e => {
                                setDrawer()
                                forceUpdate()
                            }}/> 
                  {/* import PersonIcon from '@material-ui/icons/Person'; */}
          <Box style={{display:'flex',justifyContent:'space-around',width:'8%'}}>
              <Typography style={{color:'white',fontSize:'.6vw',margin:'auto 0', letterSpacing:'.1em'}}>{ getUserData() !== undefined ? getUserData().Nome + ' ' + getUserData().Cognome : '' }</Typography>
              <PersonIcon style={{height:32,color:'white'}} />
            </Box>
                </Container>
                
                <Container maxWidth="False" className={classes.toolBar}>
                            
                <Box style={{marginTop:30,marginBottom:30,display:'flex',flexDirection:'row',justifyContent:'space-around',}}>

<Box style={{width:'4%'}}></Box>

  <Box className={classes.singleColumn} style={{width:'4%'}}></Box>

  <Box style={{width:'20%'}}></Box>

  <Box className={classes.singleColumn} style={{width:'5%',cursor:'pointer'}} onClick={ e=> {
    handleFilter('data')
  } }>
    <Typography className={classes.filterText}>Data</Typography>
    {dateArr === false ? (
      <KeyboardArrowDownIcon className={classes.filterArrow}></KeyboardArrowDownIcon>
    ) : ( 
        <KeyboardArrowUpIcon className={classes.filterArrow}></KeyboardArrowUpIcon>
    )}
  </Box>

  <Box className={classes.singleColumn} style={{width:'5%',display:'flex',justifyContent:'space-around'}}>
    <Typography className={classes.filterText} onClick={handleClickP} style={{cursor:'pointer'}}>Priorità</Typography>
    <ClearIcon onClick={ e => setTicketList( getInterventoListData().filter( current => current.accepted !== 3 ) ) } style={{color:'#898989',cursor:'pointer'}}/>
  </Box>
  <Menu
    id="simple-menu"
    anchorEl={anchorElP}
    keepMounted
    open={Boolean(anchorElP)}
    onClose={handleCloseP}
    getContentAnchorEl={null}
    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
    transformOrigin={{vertical: 'top', horizontal: 'center'}}
  >
    <MenuItem onClick={ e => filterPrioritaP('urgente')}>Urgente</MenuItem>
    <MenuItem onClick={ e => filterPrioritaP('emergenza')}>Emergenza</MenuItem>
    <MenuItem onClick={ e => filterPrioritaP('medio')}>Medio</MenuItem>
    <MenuItem onClick={ e => filterPrioritaP('basso')}>Basso</MenuItem>
  </Menu>

  <Box className={classes.singleColumn} style={{width:'10%',display:'flex',justifyContent:'center'}}>
    <Typography className={classes.filterText} onClick={handleClickS} style={{cursor:'pointer',marginRight:15}}>Status</Typography>
    <ClearIcon onClick={ e => setTicketList( getInterventoListData().filter( current => current.accepted !== 3 ) ) } style={{color:'#898989',cursor:'pointer'}}/>
  </Box>
  <Menu
    id="simple-menu"
    anchorEl={anchorElS}
    keepMounted
    open={Boolean(anchorElS)}
    onClose={handleCloseS}
    getContentAnchorEl={null}
    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
    transformOrigin={{vertical: 'top', horizontal: 'center'}}
  >
    <MenuItem onClick={ e => filterPrioritaS('1')}>Aperto</MenuItem>
    <MenuItem onClick={ e => filterPrioritaS('2')}>Chiuso</MenuItem>
    </Menu>



    <Box className={classes.singleColumn} style={{width:'15%',display:'flex',justifyContent:'flex-start'}}>
    <Typography className={classes.filterText} onClick={handleClickA} style={{cursor:'pointer',marginRight:15}}>Accettati/Rifiutati/Sospesi</Typography>
    <ClearIcon onClick={ e => setTicketList( getInterventoListData().filter( current => current.accepted !== 3 ) ) } style={{color:'#898989',cursor:'pointer'}}/>
  </Box>
  <Menu
    id="simple-menu"
    anchorEl={anchorElA}
    keepMounted
    open={Boolean(anchorElA)}
    onClose={handleCloseA}
    getContentAnchorEl={null}
    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
    transformOrigin={{vertical: 'top', horizontal: 'center'}}
  >
    <MenuItem onClick={ e => filterPrioritaS('1')}>Aperto</MenuItem>
    <MenuItem onClick={ e => filterPrioritaS('2')}>Chiuso</MenuItem>
    <MenuItem onClick={ e => filterPrioritaS(null)}>Sospeso</MenuItem>
    </Menu>


  <Box style={{width:'4%'}}></Box>
</Box>


                </Container>
                <Container maxWidth="False" className={classes.userTable}>
                    
                <InfoIntervento type={type} flag={infoFlag} handleClose={e=> setInfoFlag(false)} target={infoTarget} cliente={targetClient}/>

{/* LOAD DIALOGS */}
<Container maxWidth="False" style={{padding:0,margin:0,width:'100%'}}>
  <Container maxWidth="False" className={classes.body}>
      { ticketList!== null && ticketList!== undefined ? (
      ticketList.map( item => {
        return (
          <Box className={classes.oneRow}>
            {console.log(item)}
            <Box className={classes.ticketColumn} style={{width:'4% !important'}}>
                <Box>
                    <img src={require('../../../assets/images/ticket/INTERVENTO.png')} className={classes.imgSTD}/>
                </Box>
            </Box>
            <Box className={classes.ticketColumn}style={{width:'4%'}}>
                <Box>
                    <Typography variant={'h6'} className={classes.columnText} style={{color:'#00ADA2',fontWeight:'bold'}}>I.{item.id}</Typography>
                </Box>
            </Box>
              
              
            <Box className={classes.ticketColumn} style={{width:'20%'}}>
                <Box >
                    <Typography variant={'subtitle1'} className={classes.columnText} style={{color:'#898989',fontWeight:'normal'}}>{item.descrizione.substring(0,100) + (item.descrizione.length > 99 ? '...' : '.')}</Typography>
                </Box>
            </Box>
            <Box className={classes.ticketColumn} style={{width:'5%'}}>
                <Box>
                    <Typography variant={'h6'} className={classes.columnText}>{item.dataInizio.split('T')[0]}</Typography>
                </Box>
            </Box>
            <Box className={classes.ticketColumn} style={{width:'5%'}}>
                <Box style={{textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                    <img src={showPriority(item.priorita)} className={classes.imgSTD} style={{margin:'0 auto'}}/>
                    <Typography variant={'overline'} className={classes.columnText} style={{color:showPriorityColor(item.priorita)}}>{item.priorita}</Typography>
                </Box>
            </Box>
            <Box className={classes.ticketColumn} style={{width:'5%'}}>
                <Box style={{textAlign:'center'}}>
                    <WatchLaterIcon style={{fontSize:24,color:'#12BB9C'}}/>
                    <Typography style={{fontSize:12,color:'#12BB9C',fontWeight:'bold'}}>{showStatus(item.accepted)}</Typography>
                </Box>
            </Box>
            <Box className={classes.ticketColumn} style={{width:'15%'}}>
                <Box>
                    <Typography variant={'h6'} >Confermi l'attività?</Typography>
                    <Box style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
                          <Box style={{display:'flex',margin:'auto 0'}}>
                              <Typography variant={'subtitle2'} style={{margin:'auto 0',color:'#00ada2'}}>Si</Typography>
                              <Radio
                                  checked={item.accepted !== 0 && item.accepted !== null ? ( item.accepted == 1 ? true : false ) : showChecked(item)}
                                  value="n"
                                  label="Si"
                                  style={{color:'dagreen'}}
                                  name="radio-button-demo"
                                  inputProps={{ 'aria-label': 'Si' }}
                                  onClick={ e=> {
                                      e.preventDefault();
                                      console.log(item)
                                      async function sendData(){
                                          let toUp={
                                              token:getUserData().Token,
                                              id:item.id,
                                              accepted:1
                                          }
                                          await updateAccepted(toUp)
                                          await delay(1000)
                                          window.location.reload(false);
                                      }
                                      sendData()
                                  } }
                              />
                          </Box>
                          <Box style={{display:'flex',margin:'auto 0'}}>
                              <Typography variant={'subtitle2'} style={{margin:'auto 0',color:'darkred'}}>No</Typography>
                              <Radio
                                  checked={item.accepted !== 0 && item.accepted !== null ? ( item.accepted == 2 ? true : false ) : showChecked(item)}
                                  value={item.accepted}
                                  label="No"
                                  style={{color:'darkred'}}
                                  name="radio-button-demo"
                                  onClick={ e => {
                                      e.preventDefault();
                                      async function sendData(){
                                        let toUp
                                        if(e.target.value == 2){
                                          toUp={
                                            token:getUserData().Token,
                                            id:item.id,
                                            accepted:0
                                        }
                                        }else{
                                          toUp={
                                            token:getUserData().Token,
                                            id:item.id,
                                            accepted:2
                                        }
                                        }
                                          console.log(toUp)
                                          await updateAccepted(toUp)
                                          await delay(1000)
                                          window.location.reload(false);
                                      }
                                      sendData()
                                  } }
                                  inputProps={{ 'aria-label': 'No' }}
                              />
                          </Box>
                    </Box>
                     
                </Box>
            </Box>
            <Box className={classes.ticketColumn} style={{width:'4%'}}>
                <Box>
                    <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#DBF1F5',borderRadius:7,marginRight:15}} onClick={ async e => {
                      e.preventDefault()
                      setInfoTarget(item)
                      await GetClienteFromProgramma('ddd',item.byContratto)
                      if(item.tipologia !== 'manutenzione'){
                        await getAssedById(getUserData().Token, item.byAsset) 

                      }
                      setType('cc')
                      await delay(500)
                      setInfoFlag(true)
                    } }>
                      <InfoIcon style={{color:'#65a1fd',fontSize:18}}/>
                    </IconButton>
                </Box>
            </Box>
          </Box>
        )
      } )
    ) : null }
   </Container>

</Container>

                </Container>

            </Container>

      </div>
    )
}

export default Programma
