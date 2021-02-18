import React, { useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Container, IconButton, Typography, Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import webservice from '../../api/webservice'
import { useHistory } from "react-router-dom";
import userData from '../data/userData';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIntervento from './InfoIntervento';
import FirstReport from './FirstReport';
import anagraficaData from '../data/anagraficaData';
import contractData from '../data/contractData';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonIcon from '@material-ui/icons/Person';
import DownloadRep from './DownloadRep';




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
  body:{
    marginTop:40
  },
  columnText:{
      fontWeight:'bold',
      color:'#333',
      margin:'auto 0'
  },
  oneRow:{
      display:'flex',
      justifyContent:'space-around',
      paddingTop:5,
      paddingBottom:5,
      marginBottom:30,
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
    cursor:'pointer'
  },
}))

function ListaTicket() {


  //Data profile vars
  const { GetFullInterventoList,getProgrammaList,getAssedById,getReport,getMateriale,getAnomalie,getContractList,userList, getFullProgrammaReq,GetAssetFromProgramma, GetClienteFromProgramma, removeProgramma, getClientList, getAssetList, getReportData,getUserList, getReportDataF } = webservice()
  const { setDrawer,getUserData } = userData();
  const { getInterventoListData,getProgrammaListData, getFullProgramma, setProgId, getCurrentReport} = anagraficaData()
  const { getContractListData, getNewContractClientList,getAnomalieData,
    getMaterialeData,getRR} = contractData()
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
      await getContractList('ddd')
      await GetFullInterventoList('dd')
      await getUserList('dd')
      await getClientList('dd')
      await getReport('dd')
      await getFullProgrammaReq('dd')
      await delay(500)
      if( getFullProgramma() !== null ){
        
        await setTicketList(getUserData()!== undefined ? getUserData().Tipologia !== 'Superadmin' ? getFullProgramma().filter(e=> e.idCliente == getUserData().ID && e.stato !== 'finito') : getFullProgramma() : getFullProgramma())
        
        if(getUserData().Tipologia == 'Cliente') {
          let fin = []
          console.log(getUserData())
          if(getFullProgramma() !== undefined){
            getFullProgramma().map(ee => {
              let tmp = ( getContractListData().filter(cc=>cc.cliente == getNewContractClientList().filter( ee => ee.id == getUserData().ofCliente )[0].id  )  )
              tmp.map(cc => {
                if(ee.byContratto == cc.id ){
                  fin.push(ee)
                }
              })
            })
          }
          setTicketList(fin)
          console.log(fin)
        }
        
      }
      await delay(1000)
      console.log(ticketList)

    }
    initialData()
    
  }, [])

  function printClient(id){
    let out = ''
    getContractListData().map( cc => {
      if(cc.id == id){
        getNewContractClientList().map( user => {
          if(user.id == cc.cliente){
            out = (user.rSociale)
          }
        } )
      }
    } )
    return out
  }

  function sendClient(id){
    let exp = []
    getContractListData().map( cc => {
      
      if(cc.id == id){
        getNewContractClientList().map( user => {
          if(user.id == cc.cliente){
            exp = user
          }
        } )
      }
    } )
    return exp
    console.log('dasdasdas',exp)
  }

  const [toDownload,setToDownload] = React.useState([])
  


  const [Anom,setAnom] = React.useState([])
  const [Mate,setMate] = React.useState([])
  const [Manu,setManu] = React.useState([])
  const [cClient,setClient] = React.useState([])
  const [INT,setInt] = React.useState([])
  const [desc,setDesc] = React.useState([])
  const [downloader,setDownloader] = React.useState(false)
  //Switch priority
  function showPriority(type){
    switch(type){
      case 'urgente':
          return (require('../../assets/images/anagraficaContratto/ticket/pUrgente.png'))
          break;
      case 'medio':
          return (require('../../assets/images/anagraficaContratto/ticket/pMedia.png'))
          break;
      case 'emergenza':
          return (require('../../assets/images/anagraficaContratto/ticket/pEmergenza.png'))
          break;
      case 'basso':
          return (require('../../assets/images/anagraficaContratto/ticket/pBassa.png'))
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
  
  const [clientListITEM,setClientListITEM] = useState([])
  const [dateArr,setDateArr] = useState(false)
  const [prioritaArr,setPrioritaArr] = useState(false)
  const [statusArr,setStatusArr] = useState(false)
  const [acceptedArr,setAcceptedArr] = useState(false)
  //Function to handle Filters
  function handleFilter(type){
    switch(type){
      case 'data':
        let def = ticketList
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


  //Status Info Dialog
  const [statusInfo,setStatusInfo] = React.useState(false)
  const [target,setTarget] = React.useState({})
  //Report Creation Dialog
  const [statusReport,setStatusReport] = React.useState(false)
  const [dd,setDD] = React.useState(0)

  const classes = useStyles();

  function normalizeDates(date){
    let tmp = date.split('-')
    return ( tmp[2] + '-' + tmp[1] + '-' + tmp[0])
  }

  function displayStatus(type){
    switch(type){
      case 'attivo':
        return <>
            <Typography style={{fontSize:16,color:'white',background:'#397BD3',borderRadius:10,margin:'0 auto',padding:'2px 8px'}}>A</Typography>
            <Typography style={{fontSize:12,color:'#12BB9C',fontWeight:'bold',color:'#397BD3'}}>Aperto</Typography>
            </>
      case 'lavorazione':
        return <>
            <Typography style={{fontSize:16,color:'white',background:'#EB9427',borderRadius:10,margin:'0 auto',padding:'2px 8px'}}>L</Typography>
            <Typography style={{fontSize:12,color:'#12BB9C',fontWeight:'bold',color:'#EB9427'}}>Lavorazione</Typography>
            </>
      case 'finito':
        return <>
            <Typography style={{fontSize:16,color:'white',background:'#0A9EA3',borderRadius:10,margin:'0 auto',padding:'2px 8px'}}>F</Typography>
            <Typography style={{fontSize:12,color:'#12BB9C',fontWeight:'bold',color:'#0A9EA3'}}>Finito</Typography>
            </>
      case 'sospeso':
        return <>
            <Typography style={{fontSize:16,color:'white',background:'#C09B6E',borderRadius:10,margin:'0 auto',padding:'2px 8px'}}>S</Typography>
            <Typography style={{fontSize:12,color:'#12BB9C',fontWeight:'bold',color:'#C09B6E'}}>Sospeso</Typography>
            </>
      case 'cancellato':
        return <>
            <Typography style={{fontSize:16,color:'white',background:'#E71C28',borderRadius:10,margin:'0 auto',padding:'2px 8px'}}>C</Typography>
            <Typography style={{fontSize:12,color:'#12BB9C',fontWeight:'bold',color:'#E71C28'}}>Cancellato</Typography>
            </>
    }
  }

  return (
    <div style={{display:'flex'}}>

      {/* LOAD DIALOGS */}
      { statusInfo === true ? ( <InfoIntervento rep={ e => {
        setStatusReport(true)
        console.log(e)
        setProgId(e.id)
        getAssetList('dd',e.byContratto)
        setDD(e.byContratto)
      } }target = {target} flag={statusInfo} handleClose={ e => setStatusInfo(false)} /> ) : null}
      { statusReport === true ? <FirstReport status={statusReport} handleClose={ e => setStatusReport(false) } data={dd}/>  : null}
      <DownloadRep desc={desc} int={INT} client={cClient} anom={Anom} mate={Mate} manu={Manu} open={downloader} handleClose={e=> setDownloader(false)} />
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
        <Container maxWidth="False" className={classes.body}>
        <Box style={{marginTop:30,marginBottom:30,display:'flex',flexDirection:'row',justifyContent:'space-around',}}>

            <Box style={{width:'5%'}}></Box>
            <Box className={classes.singleColumn} style={{width:'5%'}}></Box>
            <Box style={{width:'10%'}}></Box>
            <Box style={{width:'15%'}}></Box>
            <Box className={classes.singleColumn} style={{width:'10%'}} onClick={ e=> {
              handleFilter('data')
            } }>
              <Typography className={classes.filterText}>Data</Typography>
              {dateArr === false ? (
                <KeyboardArrowDownIcon className={classes.filterArrow}></KeyboardArrowDownIcon>
              ) : ( 
                  <KeyboardArrowUpIcon className={classes.filterArrow}></KeyboardArrowUpIcon>
              )}
            </Box>

            <Box className={classes.singleColumn} style={{width:'10%',display:'flex',justifyContent:'center'}} onClick={ e=> {
              handleFilter('priorita')
            } }>
              <Typography className={classes.filterText}>Priorità</Typography>
              {prioritaArr === false ? (
                <KeyboardArrowDownIcon className={classes.filterArrow}></KeyboardArrowDownIcon>
              ) : ( 
                  <KeyboardArrowUpIcon className={classes.filterArrow}></KeyboardArrowUpIcon>
              )}</Box>
            <Box className={classes.singleColumn} style={{width:'10%',display:'flex',justifyContent:'center'}} onClick={ e=> {
              handleFilter('status')
            } }>
              <Typography className={classes.filterText}>Status</Typography>
              {statusArr === false ? (
                <KeyboardArrowDownIcon className={classes.filterArrow}></KeyboardArrowDownIcon>
              ) : ( 
                  <KeyboardArrowUpIcon className={classes.filterArrow}></KeyboardArrowUpIcon>
              )}</Box>
            <Box className={classes.singleColumn} style={{width:'10%'}} onClick={ e=> {
              handleFilter('accepted')
            } }>
              <Typography className={classes.filterText}>Ultimazione</Typography>
              {acceptedArr === false ? (
                <KeyboardArrowDownIcon className={classes.filterArrow}></KeyboardArrowDownIcon>
              ) : ( 
                  <KeyboardArrowUpIcon className={classes.filterArrow}></KeyboardArrowUpIcon>
              )}</Box>
            <Box style={{width:'10%'}}></Box>
          </Box>
          { ticketList!== null && ticketList!== undefined ? (
            ticketList.filter( ed => ed.stato !== 'malattia' && ed.stato !== 'ferie' && ed.stato !== 'permessi' ).map( (item,index) => {
              let dd 
              toDownload.map( cc => {
                if(cc[0] !== undefined){

                  if(cc[0].byProg == item.id){
                    dd = cc
                  }
                }
              } )
              return (
                <Box className={classes.oneRow}>
                  <Box className={classes.ticketColumn} style={{width:'5%'}}>
                      <Box>
                          <img src={require('../../assets/images/ticket/INTERVENTO.png')} className={classes.imgSTD}/>
                      </Box>
                  </Box>
                  <Box className={classes.ticketColumn} style={{width:'5%'}}>
                      <Box>
                          <Typography variant={'h6'} className={classes.columnText} style={{color:'#00ADA2',fontWeight:'bold'}}>I.{item.idIntervento}</Typography>
                      </Box>
                  </Box>
                    <Box className={classes.ticketColumn} style={{width:'10%'}}>
                      <Box>
                          <Typography variant={'h6'} className={classes.columnText}>{printClient(item.byContratto)}</Typography>
                      </Box>
                  </Box>
                    
                  <Box className={classes.ticketColumn} style={{width:'15%'}}>
                      <Box >
                          <Typography variant={'subtitle1'} className={classes.columnText} style={{color:'#898989',fontWeight:'normal'}}>{item.description !== undefined ? item.description.substring(0,100) + (item.description.length > 99 ? '...' : '.') : null}</Typography>
                      </Box>
                  </Box>
                  <Box className={classes.ticketColumn} style={{width:'10%'}}>
                      <Box>
                          <Typography variant={'h6'} className={classes.columnText}>{item.dataInizio !== undefined ? normalizeDates(item.dataInizio) : 'Caricamento...'}</Typography>
                      </Box>
                  </Box>
                  <Box className={classes.ticketColumn} style={{width:'10%'}}>
                      <Box style={{textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center'}} >
                          <img src={showPriority('urgente')} className={classes.imgSTD} style={{margin:'0 auto'}}/>
                          <Typography variant={'overline'} className={classes.columnText} style={{color:showPriorityColor('urgente')}}>{'urgente'}</Typography>
                      </Box>
                  </Box>
                  <Box className={classes.ticketColumn} style={{width:'10%'}}>

                      <Box style={{textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center',flexDirection:'column'}}>
                          {displayStatus(item.stato)}
                      </Box>
                  </Box>
                  
                  <Box className={classes.ticketColumn} style={{width:'10%'}}>
                      <Box>
                          <Typography variant={'h6'} className={classes.columnText}>{item.dataFine !== undefined ? normalizeDates(item.dataFine) : 'Caricamento...'}</Typography>
                      </Box>
                      
                  </Box>
                  
                  <Box className={classes.ticketColumn} style={{width:'10%'}}>
                      <Box>
                      {item.stato === 'finito' ? (
                        <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#dbf1f5',borderRadius:7,marginRight:15}} onClick={ async e => {
                          e.preventDefault()
                            let reps = ''
                            if(getRR()!==null){let rR = getRR().filter( (rr,index) => rr.byProg == item.id )
                            rR.map( (ii,index) => {
                              if(index === 0){
                                reps = ii.id
                              }else{
                                reps= (reps + ','+ii.id)
                              }
                              if(index == rR.length -1){
                                let tmp = desc + '.' + ii.descrizione
                                setDesc(tmp)
                              }
                            } )}


                            await getReportDataF('dd',reps)

                            await delay(500)
                            var anom = []
                            var mate = []
                            var manu = []
                            getCurrentReport().map( cp => {
                              switch(cp.Tipo){
                                case 'Anom':
                                  anom.push(cp)
                                  break;
                                case 'Manu':
                                    userList.map(user => {
                                        if(cp.idUser == user.id){
                                          let tmp = user
                                          tmp.hOrd = cp.hOrd
                                          manu.push(user)
                                        }
                                } )
                                  break;
                                case 'Mate':
                                  mate.push(cp)
                                  break;
                              }
                            } )
                            
                            userList.map( user => {
                              if(user.id == item.idCliente){
                                let tmp = user
                                tmp.hOrd = item.tempi
                                manu.push(tmp)
                              }
                            } )
                            setClient(sendClient(item.byContratto))
                            setAnom(anom)
                            setMate(mate)
                            setManu(manu)
                            console.log(getInterventoListData().filter(int => {
                              if(int.id == item.idIntervento){
                                setInt(int)
                              }
                            }))
                            
                            setDownloader(true)
                            forceUpdate()
                        }}>
                            <DescriptionIcon style={{color:'#65a1fd',fontSize:18}}/>
                        </IconButton>
                             
                      ) : null}
                         
                          <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#DBF1F5',borderRadius:7,marginRight:15}} onClick={ async e=> {
                            await GetClienteFromProgramma('ddd',item.byContratto)
                            await GetAssetFromProgramma(getUserData().Token,item.idIntervento)
                            console.log(item)
                            await delay(500)
                            setStatusInfo(true)
                            setTarget(item)
                          }}>
                            <InfoIcon style={{color:'#65a1fd',fontSize:18}}/>
                          </IconButton>
                          { getUserData() !== undefined ? ( getUserData().Tipologia !== 'Cliente' && getUserData().Tipologia !== 'Utente' ? (
                              <IconButton className={classes.lightR} style={{width:30,height:30,backgroundColor:'#F9D3C1',borderRadius:7}} onClick={ async e=>{
                                e.preventDefault()
                                let toRem = {
                                  token:getUserData().Token,
                                  id:item.id
                                }
                                await removeProgramma(toRem)
                                await delay(500)
                                await getFullProgrammaReq('dd')
                                window.location.reload(false)
                              } }>
                                <img className={classes.iconIMG}  src={require("../../assets/images/lista-utenti/delete.png")} /> 
                              </IconButton>
                            ) : null
                          ) : null }
                      </Box>
                      
                  </Box>
                </Box>
              )
            } )
          ) : null }
         </Container>

      </Container>
       
    </div>
  )
}

export default ListaTicket
