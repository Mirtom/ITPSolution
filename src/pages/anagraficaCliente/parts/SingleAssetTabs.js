import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton, InputAdornment, Snackbar, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import anagraficaData from '../../data/anagraficaData';
import EditActivity from './EditActivity';
import { Alert } from '@material-ui/lab';

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
    width:1280
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
  }

}));

export default function SingleAssetTabs({idContratto}) {

  const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event, reason) => {
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

  const { getActivityList, deleteActivity } = webservice()
  const { getUserData } = userData()
  const { getActivityListData } = anagraficaData()

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

  //Activity LIST
  const [actList,setActList] = useState([])
  const [actFiltered,setActFiltered] = useState([])
  useEffect(() => {
    const retrieveData = async () => {
      await getActivityList(getUserData().Token,idContratto)
      setActList( getActivityListData() )
      setActFiltered( getActivityListData() )
    }
    retrieveData()
  }, [])
  const delay = ms => new Promise(res => setTimeout(res, ms));
  return (
    <div className={classes.root}>
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
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {/* PANNELLO SINGLE ASSET INFO BOX*/}
          <Box className={classes.panelSTD}>
            <Typography className={classes.normalText} variant='subtitle2' >12/05/2018</Typography>
            <Typography className={classes.normalText} variant='subtitle2' >Guido Giallo</Typography>
            <Box className={classes.panelChild}>
              <Typography className={classes.boldText} variant='body1' >Richiesta Intervento</Typography>
              <Typography className={classes.normalText} variant='subtitle2' >Impianto antincendio e rivelazione fumi questo messaggio...</Typography>
            </Box>
            <img className={classes.stdImage} src={require('../../../assets/images/anagraficaContratto/asset/rIntervento.png')} />
          </Box>

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} >
          {/* PANNELLO SINGLE ASSET ACTIVITY BOX*/}
          <Box>
            <Box style={{display:'flex',justifyContent:'center',marginBottom:15,paddingBottom:15,borderBottomWidth:2,borderBottomStyle:'dashed',borderBottomColor:'#eaeaea'}}>
              <TextField
                inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}}
                type="search"
                variant="outlined"
                margin="normal"
                value={fltrSrch}
                onChange={e => {
                  setFltrSrch(e.target.value)
                  let Filtered = actList.filter(item => String(item.tipologia.toLowerCase()).includes(fltrSrch.toLowerCase()))
                  if(Filtered.length === 0){
                    setActFiltered(null)
                  }else{
                    setActFiltered(Filtered)
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
          <Box className={classes.panelSTD}>
            <Typography className={classes.normalText} variant='subtitle' >12/05/2018</Typography>
            <Box style={{display:'flex',alignItems:'center', width:'auto'}}>
              <Avatar alt="G" src='G' style={{marginRight:10}}/>
              <Typography className={classes.normalText} variant='subtitle' >Guido Giallo</Typography>
            </Box>
            <Box style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <EditIcon style={{marginRight:10,color:'#49BEDE'}} />
              <Typography className={classes.normalText}  style={{display:'flex',alignItems:'center'}}variant='body1' >Modificato Asset: <Typography className={classes.boldText} variant="body1">Lista delle Attività</Typography></Typography>
            </Box>
          </Box>

        </TabPanel>
      </SwipeableViews>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success">
            Attivita modificata con successo
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