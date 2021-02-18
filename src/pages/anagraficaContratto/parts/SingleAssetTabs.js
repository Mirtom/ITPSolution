import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton, Button, InputAdornment, Snackbar, TextField, InputLabel } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import anagraficaData from '../../data/anagraficaData';
import EditActivity from './EditActivity';
import { Alert } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

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
        <Box p={4}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
  },
  tabStyle:{
      '&:hover':{
          backgroundColor:'#ececec !important'
      }
  },
  stdImage:{
    width:32
  },
  stdImageAction:{
    width:16,

  },
  panelSTD:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomWidth:2,
    borderBottomColor:'#eaeaea',
    borderBottomStyle:'dashed',
    paddingBottom:10,
    paddingTop:10,
    width:'100%'
  },
  normalText:{
    //fontSize:15,
    color: '#535353'
  },
  boldText:{
    fontWeight:'bold',
    color:'#535353',
  },
  panelChild:{
    width:'45%'
  },
  panelActionTab:{
    justifyContent:'space-between',
    display:'flex',
    width:'11%'
  },
  panelIconButton:{
    alignItems:'center',
    '&:hover':{
      background:'lightgray !important'
    }
  },
  newActivityBox:{
    marginBottom:'8%',
    textAlign:'center'
},
defaultSelectBox:{
    width:'100%'
},
sbmtN:{
    '&:hover':{
        backgroundColor:'transparent !important'
    }
},
delButton:{
  backgroundColor:'#e66969',
  color:'white',
  paddingLeft:30,
  paddingRight:30,
  alignItems:'center',
  '&:hover':{
    backgroundColor:'#ff9d9d !important'
  }
},
columnSA:{
  display:'flex'
},
modalIMG:{
  height:16,
  marginRight:10
},
rowWIMG:{
  display:'flex',
  alignItems:'center',
  marginBottom:7
},
columnSA:{
  paddingLeft:50,
  paddingRight:50,
  paddingBottom:15,
  display:'flex',
  justifyContent:'space-between',
  marginBottom:'2%',
  borderBottomWidth:2,
  borderBottomColor:'#eaeaea',
  borderBottomStyle:'dashed'
},
columnGA:{
  paddingLeft:50,
  paddingRight:50,
  paddingBottom:15,
  display:'flex',
  marginBottom:10,
  justifyContent:'space-between',
},
rowSAFirst:{
  display:'flex',
  flexDirection:'column'
},
defaultSelectBox:{
  width:'100%'
},
submitButton:{
  backgroundColor:'#00ADA2',
  color:'white',
  paddingLeft:30,
  paddingRight:30,
  alignItems:'center'
},
buttonDialog:{
  '&:hover':{
    backgroundColor:'whitesmoke !important'
  }
}

}));

export default function SingleAssetTabs({idContratto,data,setAssList}) {

  const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenAlert(false);
    }; 

    const [openAlertSetting, setOpenAlertSetting] = React.useState(false);
    const handleCloseAlertSetting = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenAlert(false);
    };

  //Remove snackbar
  const [openAlertE, setOpenAlertE] = React.useState(false);
    const handleCloseAlertE = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenAlertE(false);
    };
  
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  //flag edit activity
  const [flag,setFlag] = useState(false)
  const [actToEdit,setActToEdit] = useState({})
  function EditItems(flags,itemToSend) {
    return <EditActivity toShow={flags} item={itemToSend} handleClose={e => setFlag(!flag)} handleSuccess={e => setOpenAlert(true)}></EditActivity>
  }

  const { getActivityList, deleteActivity, getInfoBox,getUserList,userList, createInfoBox, updateAsset, getAssetList, getLogBox, createLog, deleteAsset } = webservice()
  const { getUserData } = userData()
  const { getActivityListData, getInfoBoxData, getAssetListData, getLogBoxData } = anagraficaData()

  //Info Box Local State
  const [infoBoxData,setInfoBoxData] = useState([])
  //Log Box Local State
  const [logBoxData,setLogBoxData] = useState([])

  //Filter search Section
  const [fltrSrch,setFltrSrch] = useState('')

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [sData, setSData] = useState(
    {
        token:getUserData().Token,
        titolo:data.titolo,
        codice:data.codice,
        matricola:data.matricola,
        marca:data.marca,
        otherInfo:data.otherInfo,
        edificio:data.edificio,
        piano:data.piano,
        stanza:data.stanza,
        areaEsterna:data.areaEsterna,
        descrizione:data.descrizione,
        byGroup:data.byGroup,
    }
)
function handleSData(e,target){
  let val = e.target.value;
  setSData( (prevState) => ({
      ...prevState,
      [target]:val
  }) )
}

  //Activity LIST
  const [actList,setActList] = useState([])
  const [actFiltered,setActFiltered] = useState([])
  useEffect(() => {
    const retrieveData = async () => {
      setInfoBoxData([])
      await getUserList(getUserData().Token)
      await getActivityList(getUserData().Token,idContratto)
      await getInfoBox(getUserData().Token,data.id)
      console.log( getUserData().Token,data.id )
      await getLogBox( getUserData().Token,data.id)
      forceUpdate()
      await getInfoBox(getUserData().Token,data.id)
      await delay(1000)
      setActList( getActivityListData() )
      setActFiltered( getActivityListData() )
      setInfoBoxData( getInfoBoxData() )
      setLogBoxData( getLogBoxData() )
      console.log( getLogBoxData() )
    }
    retrieveData()
  }, [])
  const delay = ms => new Promise(res => setTimeout(res, ms));

  //States dialog add info box
  const [flagInfo,setFlagInfo] = useState(false)
  const [newInfoBox,setNewInfoBox] = useState({
    intestazione:null,
    descrizione:null
  })
  function handleInfoChange(e,target){
    let val = e.target.value
    setNewInfoBox(prevState => ({
      ...prevState,
      [target]:val
    }))
  }
  //Confirm removal states
  const [openConfirm,setOpenConfirm] = useState(false)
  return (
    <div className={classes.root}>

      {/* Dialog confirm asset removal*/}
      <Dialog
        open={openConfirm}
        onClose={e => setOpenConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box style={{textAlign:'center',}}>
            <Typography variant='h6' style={{borderBottomWidth:1,borderBottomColor:'#e8e8e8',borderBottomStyle:'solid',marginBottom:10}}>Rimozione Asset</Typography>
            <Typography variant='subtitle1'>L'Asset verrà eliminato</Typography>
            <Typography variant='overline' style={{color:'#ff7a7a'}}>Questa azione e irriversibile!</Typography>
          </Box>
        </DialogTitle>
        <DialogActions>
          <Button className={classes.buttonDialog} onClick={e => setOpenConfirm(false)}>
            Annulla
          </Button>
          <Button className={classes.buttonDialog} onClick={ async e => {
              e.preventDefault()
              let toRem={
                token:getUserData().Token,
                id:data.id
              }
              console.log(toRem)
              await deleteAsset(toRem)
              await delay(1000)
              window.location.reload(false)
              }}>
            Conferma 
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to add infoBox*/}
      <Dialog
                open={flagInfo}
                maxWidth={'sm'}
                fullWidth={true}
                onClose={e=> setFlagInfo(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Aggiungi Info Box</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box>
                        <Box className={classes.newActivityBox}>
                            <InputLabel htmlFor="selectTipologia">* Intestazione </InputLabel>
                                <TextField
                                    id="outline-multiline-static"
                                    className={classes.defaultSelectBox}   
                                    value = {newInfoBox.intestazione}      
                                    onChange={ e=> handleInfoChange(e,'intestazione') }                          
                                />
                            </Box>
                            <Box className={classes.newActivityBox}>
                            <InputLabel htmlFor="selectTipologia">* Descrizione </InputLabel>
                                <TextField
                                    id="outline-multiline-static"
                                    multiline
                                    className={classes.defaultSelectBox}
                                    rowsMax={8}
                                    height={64}
                                    rows={3}
                                    value={newInfoBox.descrizione}
                                    onChange={ e=> handleInfoChange(e,'descrizione') }
                                />
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' className={classes.sbmtN} autoFocus onClick={async e => {
                          e.preventDefault()
                          let toUp={
                            token:getUserData().Token,
                            idUser:getUserData().ID,
                            descrizione:newInfoBox.descrizione,
                            byAsset:data.id,
                            intestazione:newInfoBox.intestazione
                          }
                          await createInfoBox(toUp)
                          let tmp = infoBoxData
                          tmp.push(toUp)
                          setInfoBoxData(tmp)
                          setFlagInfo(false)
                        }}>
                        Aggiungi
                    </Button>
                </DialogActions>
            </Dialog>

      <div>
        {EditItems(flag,actToEdit)}
      </div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className={classes.tabStyle} label="Info Box" {...a11yProps(0)} />
          <Tab className={classes.tabStyle} onClick={async e=> {
            await getActivityList(getUserData().Token,idContratto)
            await delay(500)
            setActList(getActivityListData())
            setActFiltered( getActivityListData() )
          }} label="Attività" {...a11yProps(1)} />
          <Tab className={classes.tabStyle} label="Log" {...a11yProps(2)} />
          <Tab className={classes.tabStyle} label="Info" {...a11yProps(3)} />
       
        </Tabs>
      </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* PANNELLO SINGLE ASSET INFO BOX*/}
          <Box>
            <img style={{cursor:'pointer',width:32}} src={require('../../../assets/images/anagraficaContratto/manutenzione/addAsset.png')} className={classes.actIcon} onClick={e=> {
              e.preventDefault()
              setFlagInfo(true)
            }}/>      
          </Box>
          { infoBoxData !== undefined && infoBoxData !== null && userList !== undefined && userList !== null ? (
            infoBoxData.slice(0).reverse().map( item => {
              return item !== null ? (
                <Box className={classes.panelSTD}>
                  <Typography className={classes.normalText} style={{width:'15%'}}variant='subtitle2' >{item.created !== undefined ? item.created.split('T')[0] : 'In Progresso...'}</Typography>
                  <Typography className={classes.normalText} style={{width:'30%'}}variant='subtitle2' >{ userList.filter( user => user.id == item.idUser)[0] !== undefined ? userList.filter( user => user.id == item.idUser)[0].Nome + ' ' + userList.filter( user => user.id == item.idUser)[0].Cognome : 'Utente non Disponibile'}</Typography>
                  <Box className={classes.panelChild} style={{width:'40%'}}>
                    <Typography className={classes.boldText} variant='body1' >{item.intestazione}</Typography>
                    <Typography className={classes.normalText} variant='subtitle2' >{item.descrizione}</Typography>
                  </Box >
                  <Box style={{width:'15%'}}>
                  { item.intestazione == "Richiesta Intervento" ? (
                    <img className={classes.stdImage} src={require('../../../assets/images/anagraficaContratto/asset/rIntervento.png')} />
                  ) : null}
                  </Box>
                  </Box>
              ) : null
            } )
          ) : (
            <Box className={classes.panelSTD}>
              <Typography className={classes.normalText} variant='subtitle2' >VUOTO</Typography>
              <Typography className={classes.normalText} variant='subtitle2' >VUOTO</Typography>
              <Box className={classes.panelChild}>
                <Typography className={classes.boldText} variant='body1' >VUOTO</Typography>
               </Box >
              <Box style={{width:'15%'}}>
              VUOTO
              </Box>
              </Box>
          )}

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} >
          {/* PANNELLO SINGLE ASSET ACTIVITY BOX*/}
          <Box>
            <Box style={{display:'flex',justifyContent:'center',marginBottom:15,paddingBottom:15}}>
              <TextField
                inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}}
                type="search"
                variant="outlined"
                margin="normal"
                value={fltrSrch}
                onChange={e => {
                  setFltrSrch(e.target.value)
                  if(actList !== null){
                    let Filtered = actList.filter(item => String(item.tipologia.toLowerCase()).includes(fltrSrch.toLowerCase()))
                    if(Filtered.length === 0){
                      setActFiltered(null)
                    }else{
                      setActFiltered(Filtered)
                    }

                  }
                  
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img style={{width:16}} src={require('../../../assets/images/anagraficaContratto/CERCA.png')} />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            {console.log(actFiltered,data)}
            {actFiltered !== null ? (
             
              actFiltered.map((item,index) => {
                
                return (<Box className={classes.panelSTD}>
                  
                          <Typography className={classes.normalText} variant='subtitle' >N. {index + 1}</Typography>
                          <Typography style={{width:'10%',textAlign:'center'}} className={classes.boldText} variant='subtitle' >{item.tipologia}</Typography>
                          <Box className={classes.panelChild} style={{width:'35%'}} >
                            <Typography className={classes.normalText} variant='subtitle2' >{item.descrizione}</Typography>
                          </Box>
                          <Typography className={classes.boldText} style={{width:'10%'}}variant='subtitle' >{item.periodo}</Typography>
                          <Box className={classes.panelActionTab}>
                            <IconButton className={classes.panelIconButton} style={{background:' #E3F4F6',}} onClick={e => {
                              setFlag(!flag)
                              setActToEdit(item)
                            }}>
                              <img className={classes.stdImageAction} src={require('../../../assets/images/lista-utenti/pencil.png')} />
                            </IconButton>
                            <IconButton className={classes.panelIconButton} style={{background:' #F9D7C8',}} onClick={async e => {
                              let toRem = {
                                token: getUserData().Token,
                                id:item.id
                              }
                              await deleteActivity(toRem)
                              setOpenAlertE(true)
                              setActFiltered( actFiltered.filter( cc => cc.id !== item.id) )
                              forceUpdate()
                              await getActivityList(getUserData().Token,idContratto)

                              
                            }}>
                              <img className={classes.stdImageAction} src={require('../../../assets/images/lista-utenti/delete.png')} />
                            </IconButton>
                          </Box>
                        </Box>
                )
              })
            ) : <Box className={classes.panelSTD}>
                  <Typography className={classes.normalText} variant='subtitle' >VUOTO</Typography>
                  <Typography className={classes.boldText} variant='subtitle' >VUOTO</Typography>
                  <Box className={classes.panelChild} style={{width:'35%'}} >
                    <Typography className={classes.normalText} variant='subtitle2' >VUOTO</Typography>
                  </Box>
                  <Typography className={classes.boldText} style={{width:'10%'}}variant='subtitle' >VUOTO</Typography>
                </Box> }
          </Box>

        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {/* PANNELLO SINGLE ASSET LOG BOX*/}
          { logBoxData !== undefined && logBoxData !== null && userList !== undefined && userList !== null ? (
            logBoxData.slice(0).reverse().map( item => {
              return item !== null ? (
                <Box className={classes.panelSTD}>
                  <Typography className={classes.normalText} style={{width:'30%'}} variant='subtitle' >{item.date}</Typography>
                  <Box style={{display:'flex',alignItems:'center', width:'40%'}}>
                    <Avatar alt="G" src='G' style={{marginRight:10}}/>
                    <Typography className={classes.normalText} variant='subtitle' >{ userList.filter( user => user.id == item.byUser)[0] !== undefined ? userList.filter( user => user.id == item.byUser)[0].Nome + ' ' + userList.filter( user => user.id == item.byUser)[0].Cognome : "Utente non disponibile.."}</Typography>
                  </Box>
                  <Box style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'30%'}}>
                    {item.type == 1 ? (
                      <AddIcon style={{marginRight:10,color:'#49BEDE'}} />
                    ) : (
                      <EditIcon style={{marginRight:10,color:'#49BEDE'}} />
                    )}
                    <Typography className={classes.normalText}  style={{display:'flex',alignItems:'center'}}variant='body1' >{item.contenuto}</Typography>
                  </Box>
                </Box>
              ) : null 
              } ) ) : null }
          

        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {/* PANNELLO SINGLE ASSET IMPOSTAZIONI BOX*/}
          <Box className={classes.panelSTD} style={{display:'flex',flexDirection:'column',alignItems:'normal'}}>
            
          <Box className={classes.columnSA}>

            <Box className={classes.rowSAFirst} style={{width:'50%'}}>
                <Typography variant="subtitle" style={{marginBottom:7}}>Titolo Dell'Asset</Typography>
                <TextField value={sData.titolo} onChange={e => handleSData(e,'titolo')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            <Box className={classes.rowSAFirst}>
                <Box className={classes.rowWIMG}>
                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/codiceAsset.png')} />
                    <Typography variant="subtitle">Codice Anagrafica</Typography>
                </Box>
                <TextField value={sData.codice} onChange={e => handleSData(e,'codice')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>

            </Box>
            <Box className={classes.columnSA}>
            <Box className={classes.rowSASecond}>
                <Box className={classes.rowWIMG}>
                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/matricolaAsset.png')} />
                    <Typography variant="subtitle">Matricola</Typography>
                </Box>
                <TextField value={sData.matricola} onChange={e => handleSData(e,'matricola')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            <Box className={classes.rowSASecond}>
                <Box className={classes.rowWIMG}>
                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/brandAsset.png')} />
                    <Typography variant="subtitle">Marca</Typography>
                </Box>
                <TextField value={sData.marca} onChange={e => handleSData(e,'marca')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            <Box className={classes.rowSASecond}>
                <Box className={classes.rowWIMG}>
                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/anagraficaAsset.png')} />
                    <Typography variant="subtitle">Altre Informazioni</Typography>
                </Box>
                <TextField value={sData.otherInfo} onChange={e => handleSData(e,'otherInfo')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            </Box>
            <Box className={classes.columnSA}>
            <Box className={classes.rowSAThird}>
                <Box className={classes.rowWIMG}>
                    <Typography variant="subtitle" style={{width:'100%'}}>Edificio</Typography>
                </Box>
                <TextField value={sData.edificio} onChange={e => handleSData(e,'edificio')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            <Box className={classes.rowSAThird}>
                <Box className={classes.rowWIMG}>
                    <Typography variant="subtitle">Piano</Typography>
                </Box>
                <TextField value={sData.piano} onChange={e => handleSData(e,'piano')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            <Box className={classes.rowSAThird}>
                <Box className={classes.rowWIMG}>
                    <Typography variant="subtitle">Stanza/Locale</Typography>
                </Box>
                <TextField value={sData.stanza} onChange={e => handleSData(e,'stanza')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            <Box className={classes.rowSAThird}>
                <Box className={classes.rowWIMG}>
                    <Typography variant="subtitle">Area Esterna</Typography>
                </Box>
                <TextField value={sData.areaEsterna} onChange={e => handleSData(e,'areaEsterna')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
            </Box>
            </Box>
            <Box className={classes.columnSA} style={{borderBottomWidth:0}}>
            <Box style={{width:'100%'}}>
                <Typography variant="subtitle" style={{marginBottom:7}}>Descrizione</Typography>
                <TextField
                    value={sData.descrizione} 
                    onChange={e => handleSData(e,'descrizione')}
                    id="outline-multiline-static"
                    multiline
                    inputProps={{style:{paddingLeft:0,paddingTop:0,paddingBottom:0}}}
                    className={classes.defaultSelectBox}
                    rowsMax={8}
                    variant="outlined"
                    rows={3}
                />
            </Box>
            </Box>

            <Box style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
                <Button className={classes.delButton} onClick={ e=> {
                  setOpenConfirm(true)
                } }>
                  Elimina Asset
                </Button>
                <Button 
                autoFocus 
                onClick={async e => {
                    e.preventDefault()
                    sData.id=data.id
                    setOpenAlertSetting(true)
                    await getAssetList(getUserData().Token, data.id)
                    await updateAsset(sData)
                    setAssList(getAssetListData())
                    let toUpLog={
                      token:getUserData().Token,
                      type:2,
                      contenuto:'Modifica Asset',
                      byAsset:data.id,
                      byUser:getUserData().ID
                    }
                    await createLog(toUpLog)
                    await delay(500)
                    window.location.reload(false);
                }} 
                className={classes.submitButton}>
                <span style={{textTransform:'none'}}>Applica Modifiche </span>
            </Button>
            </Box>

          </Box>

        </TabPanel>
      

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success">
            Attivita modificata con successo
          </Alert>
       </Snackbar>
       <Snackbar open={openAlertSetting} autoHideDuration={3000} onClose={handleCloseAlertSetting}>
          <Alert onClose={handleCloseAlertSetting} severity="success">
            Asset modificato con successo
          </Alert>
       </Snackbar>
       <Snackbar open={openAlertE} autoHideDuration={3000} onClose={handleCloseAlertE}>
          <Alert onClose={handleCloseAlertE} severity="error">
            Attivita rimossa con successo
          </Alert>
       </Snackbar>
    </div>
  );
}