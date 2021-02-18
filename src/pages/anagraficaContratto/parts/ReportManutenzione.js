import { Box, Typography } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import webservice from '../../../api/webservice';
import anagraficaData from '../../data/anagraficaData';
import userData from '../../data/userData';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import { PDFDownloadLink, Image, Document, Page,View,Text,Font } from '@react-pdf/renderer'
import contractData from '../../data/contractData';
import DescriptionIcon from '@material-ui/icons/Description';
import DownloadRep from '../../ticket/DownloadRep';

const useStyles = makeStyles((theme) => ({
    imgSTD:{
        width:'1.2vw',
        margin:'0 auto'
    },
    mainBox:{
        width:'25%',
        marginTop:'1%',
        marginBottom:'.5%',
    },
    mainText:{
        color:'#535353',
        fontWeight:'bold',
        marginBottom:15
    },
    subText:{
        color:'#B5B5B5',
        fontSize:'0.7vw'
    },
    bottomColumn:{
        marginTop:25
    },
    internalReportRow:{
        display:'flex',
    },
    reportRow:{
        marginBottom:10,
        flexWrap:'wrap'
    },
    imgContainer:{
        display:'flex',
        flexDirection:'column',
        marginRight:20,
    },
    imgSubText:{
        alignItems:'center',
        fontWeight:'bold',
        fontSize:'0.5vw'
    },
    rowTitle:{
        color:'#535353',
        marginBottom:5,
        fontSize:'0.7vw'
    }
}))

const useStylesT = makeStyles((theme) => ({
    imgSTD:{
        width:32
    },
    imgContainer:{
        marginBottom:20,
        borderBottomWidth:2,
        borderBottomColor:'#e8e8e8',
        borderBottomStyle:'dashed',
        display:'flex',
        justifyContent:'space-between',
        paddingBottom:10,
    },
    defButton:{
        '&:hover':{
            background:'transparent !important'
        }
    },
    lightB:{
        '&:hover':{
          background:'#eaf8fb !important'
        }
      },
}))


const ReportManutenzione = ({data}) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    //Dialog Handle Actions
    const  [flag,setFlag]  = useState(false)
    const [type,setType] = useState(0)

    //Data Handle
    const { getUserData } = userData()
    const { getRR,getContractListData,getNewContractClientList } = contractData()
    const { getInterventoList, getFullProgrammaReq,getReport,getReportData,userList,getUserList } = webservice()
    const { getInterventoListData, getFullProgramma, getCurrentReport } = anagraficaData()
    const classes = useStyles();



    useEffect(() => {
        const initialData = async () => {
            await getInterventoList(getUserData().Token, data.id)
            await getReport(getUserData().Token)
            await getUserList('dd')
            await getReportData('dd')
            await getFullProgrammaReq(getUserData().Token)
            await delay(1000)
            
        }
        initialData()
    }, [])

    function swipeDate(date){
        let temp = date.split('-')
        return ( temp[2] + '-' + temp[1] + '-' + temp[0] )
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
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const [Anom,setAnom] = React.useState([])
  const [Mate,setMate] = React.useState([])
  const [Manu,setManu] = React.useState([])
  const [cClient,setClient] = React.useState([])
  const [INT,setInt] = React.useState([])
  const [desc,setDesc] = React.useState([])
  const [downloader,setDownloader] = React.useState(false)
        //LIST & DOWNLOAD REPORTS
    const DisplayReport = ({flag,handleClose,type,data}) => {   
            const classes = useStylesT()
            var toShow = []
            switch(type){
                case 1:
                    toShow = data.filter( item => item.tipologia === 'straordinaria');
                    break;
                case 2:
                    getFullProgramma().map( prog => {
                        getInterventoListData().map( int => {
                            if(prog.idIntervento == int.id && prog.stato =='finito' && int.tipologia=== 'ordinaria'){
                                let toDD = int
                                toDD.idProg = prog.id
                                toShow.push(toDD)
                            }
                        } )
                    } )
                    break;
                case 3:
                    toShow = data.filter( item => item.tipologia === 'manutenzione');
                    break;
            } 

            
    

            return (
                <>
                    {type === 1 ? (
                        <Dialog  fullWidth={true} maxWidth={'sm'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={flag}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Lista Report Straordinari
                            </DialogTitle>
                            <DialogContent dividers>
                                { toShow.map( item => {
                                    return (
                                        <Box className={classes.imgContainer}>
                                            <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/interventoStraordinario.png')} />
                                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#547f60'}}>INT - {item.id}</Typography>
                                            <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#dbf1f5',borderRadius:7,marginRight:15}} onClick={ e =>  {
                                                e.preventDefault()
                                                console.log(item)
                                            }}>
                                                <DescriptionIcon style={{color:'#65a1fd',fontSize:18}}/> 
                                            </IconButton>
                                        </Box>
                                    )
                                } )}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Chiudi
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ) : null}
                    {type === 2 ? (
                        <Dialog  fullWidth={true} maxWidth={'sm'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={flag}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Lista Report Ordinari
                            </DialogTitle>
                            <DialogContent dividers>
                                
                                { toShow.map( item => {
                                    return (
                                        <Box className={classes.imgContainer}>
                                            <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/interventoOrdinario.png')} />
                                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#f9bc58'}}>INT - {item.id}</Typography>
                                            <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#dbf1f5',borderRadius:7,marginRight:15}}  onClick={ async e =>  {
                                                e.preventDefault()
                                                await getReportData('dd',item.idProg)
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
                                                getRR().filter( rr => {
                                                    if (rr.byProg == item.id){
                                                      setDesc(rr.descrizione)
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
                                                  handleClose()
                                            }}>
                                                <DescriptionIcon style={{color:'#65a1fd',fontSize:18}}/> 
                                            </IconButton>
                                        </Box>
                                    )
                                } )}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Chiudi
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ) : null}
                    {type === 3 ? (
                        <Dialog  fullWidth={true} maxWidth={'sm'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={flag}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Lista Report Manutenzioni
                            </DialogTitle>
                            <DialogContent dividers>
                                
                                { toShow.map( item => {
                                    return (
                                        <Box className={classes.imgContainer}>
                                            <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/manutenzione.png')} />
                                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#375b83'}}>MAN - {item.id}</Typography>
                                            <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#dbf1f5',borderRadius:7,marginRight:15}} >
                                                <DescriptionIcon style={{color:'#65a1fd',fontSize:18}}/> 
                                            </IconButton>
                                        </Box>
                                    )
                                } )}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Chiudi
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ) : null}
                </>
            )
    }

    //Render interventi straordinari
    const DisplayStraordinaria = () => {
        let tmp = getInterventoListData();
        let toDisplay = []
        getFullProgramma().map( prog => {
            tmp.map( int => {
                if(prog.idIntervento == int.id && prog.stato =='finito' && int.tipologia=== 'straordinaria'){
                    let toShow = int
                    toShow.idProg = prog.id
                    toDisplay.push(toShow)
                }
            } )
        } )
        toDisplay = toDisplay.slice(0,5)
        return toDisplay.map( item => (
                    <Box className={classes.imgContainer}>
                        <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/interventoStraordinario.png')} />
                        <Typography variant='overline' className={classes.imgSubText} style={{color:'#547f60'}}>INT - {item.id}</Typography>
                    </Box>
         ) )
    }

    //Render interventi ordinari
    const DisplayOrdinaria = () => {
        let tmp = getInterventoListData();
        console.log( getFullProgramma() )
        let toDisplay = []
        getFullProgramma().map( prog => {
            tmp.map( int => {
                if(prog.idIntervento == int.id && prog.stato =='finito' && int.tipologia=== 'ordinaria'){
                    let toShow = int
                    toShow.idProg = prog.id
                    toDisplay.push(toShow)
                }
            } )
        } )
        toDisplay = toDisplay.slice(0,5)
        return toDisplay.map( item => (
                    <Box className={classes.imgContainer}>
                        <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/interventoOrdinario.png')} />
                        <Typography variant='overline' className={classes.imgSubText} style={{color:'#f9bc58'}}>INT - {item.id}</Typography>
                    </Box>
         ) )
    }

    //Render interventi ordinari
    const DisplayManutenzione = () => {
        let tmp = getInterventoListData();
        let toDisplay = tmp.filter( item => item.tipologia === 'manutenzione');
        toDisplay = toDisplay.slice(0,5)
        return toDisplay.map( item => (
            <Box className={classes.imgContainer}>
            <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/manutenzione.png')} />
            <Typography variant='overline' className={classes.imgSubText} style={{color:'#375b83'}}>MAN - {item.id}</Typography>
        </Box>
         ) )
    }

    function displayReports(){
        return <DisplayReport flag={flag} handleClose={ e => setFlag(false)} type={type} data={getInterventoListData()}/>
    }

    return(
        <>

        {/* Dialog view full report */}
        {displayReports()}
        <Box className={classes.mainBox}>
        <DownloadRep desc={desc} int={INT} client={cClient} anom={Anom} mate={Mate} manu={Manu} open={downloader} handleClose={e=> setDownloader(false)} />
        

            <Box>
                <Typography variant='h5' className={classes.mainText}>REPORT MANUTENZIONE</Typography>
                <Typography variant='h7' className={classes.subText}>In questa sezione vengono generati i report e i rapporti d'intervento, la struttura del cliente. Un grafico sulla destra ci segnala la presenza di anomalie riscontrate </Typography>
            </Box>
            <Box className={classes.bottomColumn}>
                <Box className={classes.reportRow}>
                    <Typography className={classes.rowTitle} variant='h6'>Report Manutenzione Ordinaria:</Typography>
                    <Box className={classes.internalReportRow}>
                        {DisplayManutenzione()}
                        <Box style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',cursor:'pointer'}} onClick={e=> {
                                setType(3)
                                setFlag(true)
                            }}>
                            <Typography style={{color:'#375b83',cursor:'pointer'}} variant='subtitle2'>Vedi Tutti </Typography>
                            <ArrowForwardIosIcon style={{fontSize:11,marginLeft:10}}/>
                        </Box>
                    </Box>
                </Box>
                 <Box className={classes.reportRow}>
                    <Typography className={classes.rowTitle} variant='h6'>Report Interventi Straordinari:</Typography>
                    <Box className={classes.internalReportRow}>
                        {DisplayStraordinaria()}
                        <Box style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',cursor:'pointer'}} onClick={e=> {
                                setType(1)
                                setFlag(true)
                            }}>
                            <Typography style={{color:'#547f60',cursor:'pointer'}} variant='subtitle2'>Vedi Tutti </Typography>
                            <ArrowForwardIosIcon style={{fontSize:11,marginLeft:10}}/>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.reportRow}>
                    <Typography className={classes.rowTitle} variant='h6'>Report Interventi Ordinari:</Typography>
                    <Box className={classes.internalReportRow}>
                        {DisplayOrdinaria()}
                        <Box style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',cursor:'pointer'}} onClick={e=> {
                                setType(2)
                                setFlag(true)
                            }}>
                            <Typography style={{color:'#f9bc58'}} variant='subtitle2'>Vedi Tutti </Typography>
                            <ArrowForwardIosIcon style={{fontSize:11,marginLeft:10}}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default ReportManutenzione
