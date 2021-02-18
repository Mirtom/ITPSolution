import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles"
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Avatar, Box, Checkbox, IconButton, Input, TextField, Typography } from '@material-ui/core';
import webservice from '../../api/webservice';
import userData from '../data/userData';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import anagraficaData from '../data/anagraficaData';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import SecondReport from './SecondReport';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    tabMainText:{
        color:'#535353',
        fontWeight:'bold'
    },
    tabSubText:{
        color:'#898989',
    },
    tabUnderText:{
        color:'#f8f8f8f',
    },
    stdIconAsset:{
        height:24,
        marginRight:15
    },
    closeBtn:{
        color:'#535353',
        fontWeight:'bold',
        letterSpacing:'.1em',
        width:'10vh',
        paddingTop:'.9vh',
        paddingBOttom:'.9vh',
        border:'2px solid #e8e8e8',
        '&:hover':{
            background:'whitesmoke !important'
        }
    },
    saveBtn:{
        background:'#00ADA2 !important',
        border:'2px solid #00ada2',
        color:'white',
        fontWeight:'bold',
        letterSpacing:'.1em',
        width:'15vh',
        paddingTop:'.9vh',
        paddingBOttom:'.9vh',
        '&:hover':{
            background:'#3bc7bf !important'
        }
    },
    columnSTD:{
        paddingLeft:30,
        paddingRight:30,
        marginBottom:20,
        paddingTop:15
    },
    topCheck:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    singleCheckContainer:{
        display:'flex',
        flexDirection:'row',
    },
    anomalieBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    roundBTN:{
        '&:hover':{
            background:'whitesmoke !important'
        }
    },
    singleAnomalia:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        border:'1px solid #e4e4e4',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:0
    }
}))

export default function InfoIntervento({data,status,handleClose}) {
  const classes = useStyles();

  //ApiValues
  const { getAssedById, } = webservice()
  const { getUserData } = userData()
  const { getSingleData,setFirstReportData, getAssetListData } = anagraficaData()
  //Second Step
  const [statusSecond,setStatusSecond] = React.useState(false)

  //Status Report state
  const [statusTicket,setStatusTicket] = React.useState({
      chiuso:false,
      chiusoanomalie:false,
      lavorazione:false,
      lavorazioneanomalie:false,
  })
  function handleStatusChange(event){
      let tmp = {
        chiuso:false,
        chiusoanomalie:false,
        lavorazione:false,
        lavorazioneanomalie:false,
      }
      tmp[event.target.name] = true
      setStatusTicket(tmp)
  }

  //Report vals
  const [reportInfo,setReportInfo] = React.useState({
      desc:null
  })
  function handleReportInfo(e,target){
      let val = e.target.value
      setReportInfo(prevState => ({
          ...prevState,
          [target]:val
      }))
  }

  //Asset Part
  const assetList = [
      {
          nome:'dsadd',
          codice:'1234A'
      },
      {
        nome:'dsaddasdasdd',
        codice:'3213A'
    },
    {
        nome:'vvadasd',
        codice:'3381A'
    },
  ]

  //Random id
  function makeid() {
    var result = '';
    var characters  = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }

  //Anomalie Part
  const [anomalie,setAnomalie] = React.useState([])
  const [currentAnomalia,setCurrentAnomalia] = React.useState({
      codice:null,
      desc:null,
      id:null
  })
  function handleCurrentAnomalia(e,target){
      let val = e.target.value
      let tmp = currentAnomalia
      tmp.desc = val
      setCurrentAnomalia(tmp)
  }
  function handleAnomalie(){
      let current = anomalie
      let tmp = currentAnomalia
      tmp.id = makeid()
      current.push(tmp)
      setAnomalie(current)
      setCurrentAnomalia({
        codice:null,
        desc:null,
        id:null
      })
  }

  return (
    <div>
      <Dialog
        open={status}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Creazione del Report</DialogTitle>
        <DialogContent>

            {statusSecond === true ? (
                <>
                <SecondReport />
                </>
            ) : (
                <Box>
                <Box className={classes.columnSTD}>
                    <Typography className={classes.tabMainText} variant={'h6'}>Status Intervento</Typography>
                    <Typography className={classes.tabUnderText} variant={'caption'} style={{marginBottom:30}}>Definisci la chiusura dell'intervento</Typography>
                    <Box className={classes.topCheck}>
                        <Box className={classes.singleCheckContainer}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={statusTicket.chiuso}
                                    onChange={ handleStatusChange }
                                    name="chiuso"
                                    color="primary"
                                />
                                }
                            />
                            <Typography className={classes.tabSubText} variant={'subtitle1'} style={{margin:'auto 0'}}>Intervento Chiuso</Typography>
                        </Box>
                        <Box className={classes.singleCheckContainer}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={statusTicket.lavorazione}
                                    onChange={ handleStatusChange }
                                    name="lavorazione"
                                    color="primary"
                                />
                                }
                            />
                            <Typography className={classes.tabSubText} variant={'subtitle1'} style={{margin:'auto 0'}}>Intervento in Lavorazione</Typography>
                        </Box>
                        <Box className={classes.singleCheckContainer}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={statusTicket.lavorazioneanomalie}
                                    onChange={ handleStatusChange }
                                    name="lavorazioneanomalie"
                                    color="primary"
                                />
                                }
                            />
                            <Typography className={classes.tabSubText} variant={'subtitle1'} style={{margin:'auto 0'}}>Intervento in Lavorazione con Anomalie</Typography>
                        </Box>
                        <Box className={classes.singleCheckContainer}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={statusTicket.chiusoanomalie}
                                    onChange={ handleStatusChange }
                                    name="chiusoanomalie"
                                    color="primary"
                                />
                                }
                            />
                            <Typography className={classes.tabSubText} variant={'subtitle1'} style={{margin:'auto 0'}}>Intervento Chiuso con Anomalie</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.columnSTD}>
                    <Typography className={classes.tabMainText} variant={'h6'}>Descrizione Generale delle Attività</Typography>
                    <TextField
                        id="desc-report"
                        multiline
                        style={{width:'100%'}}
                        rows={10}
                        variant="outlined"
                        value={reportInfo.desc}
                        onChange={ e => handleReportInfo(e,'desc')}
                    />
                    <Typography className={classes.tabUnderText} variant={'caption'} style={{marginBottom:30}}>Inserisci una descrizione sintetica del problema</Typography>
                    
                </Box>               
                {statusTicket.chiusoanomalie === true || statusTicket.lavorazioneanomalie === true ? (
                    <>
                        <Box className={classes.columnSTD}>
                        <Typography className={classes.tabMainText} variant={'h6'}>Anomalie Asset</Typography>
                        <Box className={classes.anomalieBox}>
                            <Box style={{width:'45%'}}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={getAssetListData()}
                                    getOptionLabel={(option) => option.codice}
                                    style={{ width: '100%' }}
                                    onChange={(event, newValue) => {
                                        if(newValue !== null){
                                            let tmp = currentAnomalia
                                            tmp.codice = newValue.codice
                                            setCurrentAnomalia(tmp)
                                            console.log(currentAnomalia)
                                        }
                                      }}
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                                <Typography className={classes.tabUnderText} variant={'caption'} style={{marginBottom:30}}>Trova il codice anagrafica dell'asset con l'anomalia</Typography>
                            </Box>
                            <Box style={{width:'45%'}}>
                                <Box style={{display:'flex',flexDirection:'row',width:'100%'}}>
                                    <Input style={{width:'80%'}} variant="outlined" placeholder={'Anomalia riscontrata'} value={currentAnomalia.desc} onChange={ e => handleCurrentAnomalia(e,'desc')} ></Input>
                                    <IconButton style={{width:48,height:48,margin:'auto'}} className={classes.roundBTN} onClick={ e => {
                                        if(currentAnomalia.codice !== null && currentAnomalia.desc !== null){
                                            handleAnomalie()
                                        }
                                    } }><AddIcon style={{fontSize:28}}/></IconButton>
                                </Box>
                                <Typography className={classes.tabUnderText} variant={'caption'} style={{marginBottom:30}}>Inserisci una brevissima descrizione dell'anomalia</Typography>
                            </Box>
                        </Box>
                    </Box>
                        <Box className={classes.columnSTD}>
                        <Typography variant={'h6'} className={classes.tabMainText}>Lista Asset Anomali</Typography>
                        {anomalie!== null && anomalie!== undefined ? (
                            anomalie.map( (item,index) => {
                                return (
                                    <Box className={classes.singleAnomalia}>
                                        {console.log(item.id)}
                                        <Box style={{display:'flex',flexDirection:'row'}}>
                                            <img src={require('../../assets/images/anagraficaContratto/asset/codiceAsset.png')} className={classes.stdIconAsset} />
                                            <Typography classname={classes.tabSubText} variant={'subtitle1'}>{item.codice}</Typography>
                                        </Box>
                                        <Box style={{display:'flex',flexDirection:'row'}}>
                                            <Typography classname={classes.tabMainText} variant={'subtitle1'}>{item.desc}</Typography>
                                        </Box>
                                        <CloseIcon style={{fontSize:24,cursor:'pointer'}} onClick={ e=> {                                        
                                            setAnomalie(anomalie.filter( e => e.id !== item.id ))
                                        } } />
                                    </Box>
                                )
                            } )
                        ) : null}
                        </Box>
                    </>
                ) : null}
                <Box style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginTop:30,marginBottom:15}}>
                <Button variant="outlined" className={classes.closeBtn} style={{marginLeft:20,marginRight:20}} onClick={ handleClose}>Chiudi</Button>
                <Button variant="outlined" className={classes.saveBtn} style={{marginLeft:20,marginRight:20}} onClick= { e => {
                    
                    let toUp = [statusTicket]
                    toUp.push(reportInfo)
                    toUp.push(anomalie)
                    setFirstReportData(toUp)
                    //Load second Step
                    setStatusSecond(true)
                } }>Salva e Continua</Button>
            </Box>
            </Box>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}