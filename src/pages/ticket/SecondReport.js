import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Avatar, Box, Checkbox, IconButton, Input, TextField, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SecurityIcon from '@material-ui/icons/Security';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import webservice from '../../api/webservice';
import userData from '../data/userData';
import ThirdReport from './ThirdReport.js';
import anagraficaData from '../data/anagraficaData';
import { Autocomplete } from '@material-ui/lab';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    singleMat:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15,
        marginBottom:5
    },
    stdContainer:{
        paddingLeft:30,
        paddingRight:30,
        marginBottom:20,
        paddingTop:15
    },
    singleMatRow:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    roundBTN:{
        '&:hover':{
            background:'whitesmoke !important'
        }
    },
    bottomContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    bottomUnderField:{
        marginTop:20,
    },
    avatBottom:{
        marginRight:'10%',
        width:32,
        height:32,
        backgroundColor:'purple',
        color:'white'
    },
    stdHoursInput:{
        width:'30%',
        border:'1px solid #e8e8e8'
    },
    iconHours:{
        cursor:'pointer',
        border:'1px solid #e8e8e8',
        color:'#288882',
        fontSize:18,
        textAlign:'center',
        marginLeft:10,
        marginRight:10,
        height:32,
        width:32
    },
    hoursManager:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row'
    },
    gestioneHours:{
        display:'flex',
        justifyContent:'center'
    },
    mainUserBox:{
        display:'flex',
        justifyContent:'space-around'
    }
}))

export default function InfoIntervento() {

  const classes = useStyles();

  //ApiValues
  const { getAssedById,getUserList,userList } = webservice()
  const { getUserData } = userData()
  const { getSingleData, setSecondReportData } = anagraficaData()

  //States Materiali
  const [currentMateriale,setCurrentMateriale] = React.useState(
      {
      codice:null,
      nome:null,
      descrizione:null,
      quantita:null
      }
    )
    function handleCurrentMateriale(e,target,index){
        let val = e.target.value
        setCurrentMateriale(prevState => ({
            ...prevState,
            [target]:val
        }))
    }
    const [materials,setMaterials] = React.useState([])

    //third rep switch
    const [thirdReport,setThirdReport] = React.useState(false)

    //managing current user to add
    const [currentGuy,setCurrentGuy] = React.useState([])

    //Inital data manage
    React.useEffect(() => {
        async function initialData(){
            getUserList(getUserData().Token)
        }
        initialData()
    }, [])
  
    //Forceupdate
    function useForceUpdate(){
        const [value, setValue] = React.useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();

      //Set to show bottom part vars
      const [toShow,setToShow] = React.useState(false)
      const [toShowFull,setToShowFull] = React.useState(false)
      //Render bottom part

      //Hour counter vals
      const [hourCounter,setHourCounter] = React.useState(0)
      function handleUserManList(data){
          let tmp = userManList
          let tmpVal = data
          tmpVal.hour = hourCounter
          tmp.push(tmpVal)
          setUserManList(tmp)
          setToShow(false)
          setCurrentGuy([])
          setToShowFull(true)
          setHourCounter(0)
      }
      const [cUser,setCUser] = React.useState(null)

      function renderBottom(data){
          return (
              <Box className={classes.gestioneHours} style={{marginBottom:40}}>
                <Avatar className={classes.avatBottom}>{data!==undefined ? data.Nome.charAt(0) : null}</Avatar>
                <Box className={classes.hoursManager}>
                    <RemoveIcon className={classes.iconHours} onClick={e=> hourCounter > 0 ? setHourCounter(hourCounter - 1) : null}/>
                    <TextField className={classes.stdHoursInput} type='number' disabled={true} value={hourCounter} InputProps={{ inputProps: { min: 0, max: 24 } }}></TextField>
                    <AddIcon className={classes.iconHours} onClick={e=> hourCounter < 24 ? setHourCounter(hourCounter + 1) : null}/>
                </Box>
                <AddIcon className={classes.iconHours} style={{borderColor:'#288882'}} onClick={ e => {
                    e.preventDefault()
                    handleUserManList(data)
                    setCUser(null)
                } }/>
              </Box>
          )
        }
        console.log(cUser)
        //Final user added vars
        const [userManList,setUserManList] = React.useState([])
        function renderFull(data){
            console.log(data)
            return data.map( e=>
                    <>
                    <Box className={classes.mainUserBox} style={{marginBottom:25}}>
                        <Avatar className={classes.avatBottom}>{e.Nome.charAt(0) + e.Cognome.charAt(0)}</Avatar>
                        <Typography variant={'subtitle2'} className={classes.userName} style={{width:'60%'}}>{e.Nome + ' ' + e.Cognome}</Typography>
                        <Typography variant={'subtitle2'} style={{}}>{e.hour + 'h'}</Typography>
                        <CancelIcon className={classes.cancelIcon} style={{cursor:'pointer'}} onClick={ eee=> setUserManList(userManList.filter( ee => ee.id !== e.id)) }/>
                    </Box>
                    </>
            )
        }
      
  return (
    <div>
            {thirdReport === true ? (
                <ThirdReport />
            ) : (
                <>
                <Box className={classes.stdContainer}>
                <Box style={{borderBottomStyle:'dashed',borderBottomWidth:1,borderBottomColor:'#e8e8e8',marginBottom:20}}>
                    <Box>
                        <Typography className={classes.tabMainText} variant={'h6'}>Materiale Installato durante l'intervento</Typography>
                        <Typography className={classes.tabUnderText} variant={'caption'} style={{marginBottom:30}}>Definisci il materiale che hai dovuto installare in più</Typography>
                    </Box>
                    <Box className={classes.singleMat}>
                        <Box className={classes.singleMatRow}>
                            <Typography className={classes.tabSubText} variant={'h6'}>Codice</Typography>
                            <TextField value={currentMateriale.codice === null ? '' : currentMateriale.codice} onChange={ e=> handleCurrentMateriale(e,'codice',0)} className={classes.inputMat} variant='outlined' placeholder={'Codice'}/>
                            </Box>
                        <Box className={classes.singleMatRow}>
                            <Typography className={classes.tabSubText} variant={'h6'}>Nome</Typography>
                            <TextField value={currentMateriale.nome === null ? '' : currentMateriale.nome} onChange={ e=> handleCurrentMateriale(e,'nome',0)} className={classes.inputMat} variant='outlined' placeholder={'Inserisci il nome del prodotto'}/>
                            
                        </Box>
                        <Box className={classes.singleMatRow}>
                            <Typography className={classes.tabSubText} variant={'h6'}>Descrizione</Typography>
                            <TextField value={currentMateriale.descrizione === null ? '' : currentMateriale.descrizione} onChange={ e=> handleCurrentMateriale(e,'descrizione',0)} className={classes.inputMat} variant='outlined' placeholder={'Inserisci una breve descrizione'}/>
                            <Typography className={classes.tabUnderText} variant={'caption'}>Max 120 caratteri</Typography>
                    
                        </Box>
                        <Box className={classes.singleMatRow}>
                            <Typography className={classes.tabSubText} variant={'h6'}>Quantità</Typography>
                            <TextField value={currentMateriale.quantita === null ? '' : currentMateriale.quantita} onChange={ e=> handleCurrentMateriale(e,'quantita',0)} className={classes.inputMat} variant='outlined' placeholder={'124.'}/>
                            <Typography className={classes.tabUnderText} variant={'caption'}>Numero</Typography>
                        </Box>
                        <Box className={classes.singleMatRow}>
                            <IconButton style={{width:48,height:48,margin:'auto'}} className={classes.roundBTN} onClick={ e => {
                                let tt = materials
                                tt.push(currentMateriale)
                                setMaterials(tt)
                                let tmp = {
                                    codice:null,
                                    nome:null,
                                    descrizione:null,
                                    quantita:null
                                    }
                                setCurrentMateriale(tmp)
                            } }> <AddCircleIcon style={{width:24}} /> </IconButton> 
                        </Box>{/*<img src={require('../../assets/images/lista-utenti/delete.png')} style={{width:24}} />*/}

                    </Box>

                        {materials.map( item => {
                            return (
                                <Box className={classes.singleMat}>
                                    <Box className={classes.singleMatRow}>
                                        <Typography className={classes.tabSubText} variant={'h6'}>Codice</Typography>
                                        <TextField value={item.codice} disabled={true} className={classes.inputMat} variant='outlined' placeholder={'Codice'}/>
                                        </Box>
                                    <Box className={classes.singleMatRow}>
                                        <Typography className={classes.tabSubText} variant={'h6'}>Nome</Typography>
                                        <TextField value={item.nome} disabled={true} className={classes.inputMat} variant='outlined' placeholder={'Inserisci il nome del prodotto'}/>
                                        
                                    </Box>
                                    <Box className={classes.singleMatRow}>
                                        <Typography className={classes.tabSubText} variant={'h6'}>Descrizione</Typography>
                                        <TextField value={item.descrizione} disabled={true} className={classes.inputMat} variant='outlined' placeholder={'Inserisci una breve descrizione'}/>
                                        
                                    </Box>
                                    <Box className={classes.singleMatRow}>
                                        <Typography className={classes.tabSubText}   variant={'h6'}>Quantità</Typography>
                                        <TextField value={item.quantita} className={classes.inputMat} disabled={true} variant='outlined' placeholder={'124.'}/>
                                        <Typography className={classes.tabUnderText} variant={'caption'}>Numero</Typography>
                                    </Box>
                                    <Box className={classes.singleMatRow}>
                                        <IconButton style={{width:48,height:48,margin:'auto'}} className={classes.roundBTN} onClick={ e => {
                                            let tmp = materials.filter( cc => cc.codice !== item.codice )
                                            setMaterials(tmp)
                                        } }> <img src={require('../../assets/images/lista-utenti/delete.png')} style={{width:24}} /> </IconButton> 
                                    </Box>
                                </Box>
                            )
                        } )}

                </Box>
                <Box>
                    <Box>
                        <Typography className={classes.tabMainText} variant={'h6'}>Manodopera aggiuntiva o conferma le ore previste</Typography>
                        <Typography className={classes.tabUnderText} variant={'caption'} style={{marginBottom:30}}>Definisci il materiale che hai dovuto installare in più</Typography>
                    </Box>
                    <Box style={{width:'40%'}}>
                        <Autocomplete
                                id="combo-box-demo"
                                options={userList !== null && userList!== undefined ? userList.filter( e => e.Tipologia !== 'Cliente' ) : userList}
                                getOptionLabel={(option) => option.Nome + ' ' + option.Cognome}
                                style={{ width: '100%' }}
                                onInputChange={(event, newValue) => {
                                    let currentVal = userList.filter( e => e.Nome + ' ' + e.Cognome === newValue )
                                    setCurrentGuy(currentVal[0])
                                    setToShow(true)
                                    forceUpdate()
                                    setCUser(currentVal[0])
                                  }}
                                value={cUser === null ? null : cUser}
                                  
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                            <Box className={classes.bottomUnderField}>
                                {toShow === true ? renderBottom(currentGuy) : null}
                            </Box>
                            <Box className={classes.userListFull}>
                                  {toShowFull === true ? renderFull(userManList) : null}
                            </Box>
                    </Box>
                </Box>
            </Box>
          
          <Box style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginTop:30,marginBottom:15}}>
                <Button variant="outlined" className={classes.saveBtn} style={{marginLeft:20,marginRight:20}} onClick={ e => {
                    let toUp = []
                    toUp.push(materials)
                    toUp.push(userManList)
                    setSecondReportData(toUp)
                    setThirdReport(true)
                    
                } }>Salva e Continua</Button>
          </Box>
                </>
            )}
            
    </div>
  );
}