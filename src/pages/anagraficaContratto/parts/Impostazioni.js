import React, { useEffect,useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Sidebar from "../../components/Sidebar"
import { Avatar, Box, Button, Container, IconButton, Typography } from "@material-ui/core"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import contractData from '../../data/contractData';
import { useHistory } from "react-router-dom";
import webservice from '../../../api/webservice'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import userData from '../../data/userData';
import EditContract from './EditContract';
import EditAttivita from './EditAttivita';
import EditAcquisizione from './EditAcquisizione';
import EditReferente from './EditReferente';
import anagraficaData from '../../data/anagraficaData';

const useStyles = makeStyles((theme) => ({
    mainBox:{
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:'50px',
        paddingRight:'50px',
        paddingTop:'40px',
    },
    leftTab:{
        width:'30%',
    },
    tabUpperBox:{
        display:'flex',
        marginBottom:20
    },
    tabHeader:{
        color:'#333',
        fontWeight:'bold',
        marginRight:15,
        margin:'auto 0px'
    },
    tabSubHeader:{
        color:'#898989',
        margin:'auto 0px'
    },
    singleOption:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:4,
        paddingBottom:4,
        borderColor:'#e8e8e8',
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:7,
        marginBottom:17,
        cursor:'pointer'
    },
    imgSTD:{
        height:32
    },
    tabTitle:{
        margin:'auto 0px',
        color:'#898989'
    },
    bottomMiddle:{
        width:'80%',
        paddingTop:7
    },
    bottomFinal:{
        paddingTop:7
    },
    singleOptionRes:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:2,
        paddingBottom:2,
        borderRadius:7,
        marginBottom:17,
        justifyContent:'flex-start',
        paddingRight:70
    },
    bottomStartRes:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginRight:20
    },
    bottomMiddleRes:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        width:'75%'
    },
    bottomFinalRes:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    imgSTDres:{
        width:18
    },
    avatarClass:{
        backgroundColor:'lightblue'
    },
    btnIcon:{
        '&:hover':{
            background:'lightgray !important'
        }
    },
    bottomTabUp:{
        display:'flex',
        justifyContent:'space-between',
        marginBottom:20
    }
}))

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
  ];

const Impostazioni = ({data}) => {
    const classes = useStyles()
    const { getUserData } = userData()
    const { userList, getUserList } = webservice()
    //display add resp form
    const [respStatus,setRespStatus] = React.useState(false)
    const [currentResp,setCurrentResp] = useState()
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const history = useHistory()
    //Import API Modules
    const { updateResponsabili } = webservice()
    const { setAnagraficaData,getAnagraficaData } = anagraficaData()
    
    useEffect(() => {
        async function initialSetup(){
            getUserList( getUserData().Token )
        }
        initialSetup()
    }, [])
    //ForceUpdate
    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
    const forceUpdate = useForceUpdate();

    //handle Responsabile func
    function handleRespChange(e,event){
        if(event !== null) {
            let valuesUsers = data.account.split(',')
            let tmp = ''
            valuesUsers.map((item,index) => {
                if(index === 0){
                    tmp = item
                }else{
                    tmp = tmp.concat(','+item)
                }
            })
            setCurrentResp(tmp +','+event.id)
        }
    }

    //Set Options
    function findOptions(){
        if(userList !== null && userList !== undefined){
            let tmp = userList
            let valuesUsers = data.account.split(',')
            valuesUsers.map(item => {
                tmp = tmp.filter(e => e.id !== parseInt(item))
            })
            return tmp
        }
    }
    //Rem Options
    function handleRemoveResp(currentID){
        let currentActive = data.account.split(',')
        let toUp = currentActive.filter( e => parseInt(e) !== currentID )
        let defVar = ''
        if ( toUp.length > 1 ){
            toUp.map( (item,index) => {
                if(index === 0){
                    defVar = item
                }else{
                    defVar = defVar.concat(','+item)
                }
            } )
        }else{
            defVar = toUp[0]
        }
        let toUpDB ={
            token:getUserData().Token,
            responsabili:defVar,
            idContratto:data.id
        }
        data.account = toUpDB.responsabili
        updateResponsabili(toUpDB)
        
        setAnagraficaData(data)
        forceUpdate()
    }

    //EditContractPart
    const [editContractStatus,setEditContractStatus] = useState(false)
    //EditActivityPart
    const [editActivityStatus,setEditActivityStatus] = useState(false)
    //Edit Acquisizione
    const [editAcquisizioneStatus,setEditAcquisizioneStatus] = useState(false)
    //Edit Referente
    const [editReferenteStatus,setEditReferenteStatus] = useState(false)
    return (
        <>
            <EditContract data={data} status={editContractStatus} handleClose={() => setEditContractStatus(false)}/>
            <EditAttivita contratto={data} status={editActivityStatus} handleClose={() => setEditActivityStatus(false)} type={getAnagraficaData().tipologia}/>
            <EditAcquisizione data = {data} handleClose={ () => setEditAcquisizioneStatus(false) } status={editAcquisizioneStatus} />
            <EditReferente dataC ={data} handleClose={ () => setEditReferenteStatus(false)} status={editReferenteStatus} />
            <Box className={classes.mainBox}>

                <Box className={classes.leftTab}>
                    <Box className={classes.tabUpperBox}>
                        <Typography variant={'h5'} className={classes.tabHeader}>MODIFICA CONTRATTO</Typography>
                        <Typography variant={'caption'} className={classes.tabSubHeader}>Modifica le impostazioni principali del contratto</Typography>
                    </Box>

                    <Box className={classes.bottomTab}>

                        <Box className={classes.singleOption} onClick={ e => {
                            setEditContractStatus(true)
                        } }>
                            <Box style={{marginRight:20,paddingTop:7}}>
                                <img src={require('../../../assets/images/creaContratto/final/contrattoblack.png')} className={classes.imgSTD}/>
                            </Box>
                            <Box className={classes.bottomMiddle}>
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Dati del Contratto</Typography>
                            </Box>
                            <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinal}>
                                <ArrowForwardIcon style={{fontSize:35,margin:'auto 0px'}} />
                            </Box>
                        </Box>
                        <Box className={classes.singleOption} onClick={ e => {
                            e.preventDefault()
                            setEditAcquisizioneStatus(true)
                        } }>
                            <Box style={{marginRight:20,paddingTop:7}}>
                                <img src={require('../../../assets/images/creaContratto/final/acquisizione.png')} className={classes.imgSTD}/>
                            </Box>
                            <Box className={classes.bottomMiddle}>
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Acquisizione</Typography>
                            </Box>
                            <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinal}>
                                <ArrowForwardIcon style={{fontSize:35,margin:'auto 0px'}} />
                            </Box>
                        </Box>
                        <Box className={classes.singleOption} onClick={ e=> setEditActivityStatus(true) }>
                            <Box style={{marginRight:20,paddingTop:7}}>
                                <img src={require('../../../assets/images/creaContratto/final/lista.png')} className={classes.imgSTD}/>
                            </Box>
                            <Box className={classes.bottomMiddle}>
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Lista delle Attività</Typography>
                            </Box>
                            <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinal}>
                                <ArrowForwardIcon style={{fontSize:35,margin:'auto 0px'}} />
                            </Box>
                        </Box>
                        {/*<Box className={classes.singleOption} style={{cursor:'not-allowed'}}>
                            <Box style={{marginRight:20,paddingTop:7}}>
                                <img src={require('../../../assets/images/creaContratto/final/FATTURAZIONE.png')} className={classes.imgSTD}/>
                            </Box>
                            <Box className={classes.bottomMiddle}>
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Fatturazione</Typography>
                            </Box>
                            <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinal}>
                                <ArrowForwardIcon style={{fontSize:35,margin:'auto 0px'}} />
                            </Box>
                        </Box>*/}
                        <Box className={classes.singleOption} onClick = { e => {
                            setEditReferenteStatus(true)
                        } }>
                            <Box style={{marginRight:20,paddingTop:7}}>
                                <img src={require('../../../assets/images/creaContratto/final/dati.png')} className={classes.imgSTD}/>
                            </Box>
                            <Box className={classes.bottomMiddle}>
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Referenti Cliente</Typography>
                            </Box>
                            <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinal}>
                                <ArrowForwardIcon style={{fontSize:35,margin:'auto 0px'}} />
                            </Box>
                        </Box>

                    </Box>
                </Box>

                <Box className={classes.leftTab}>
                    <Box className={classes.tabUpperBox}>
                        <Typography variant={'h6'} className={classes.tabHeader}>NOTIFICHE</Typography>
                        <Typography variant={'caption'} className={classes.tabSubHeader}>Modifica le impostazioni principali del contratto</Typography>
                    </Box>

                </Box>
{console.log(data)}
                <Box className={classes.leftTab}>
                    <Box className={classes.tabUpperBox} style={{marginBottom:respStatus === true ? 0 : -60}}>
                        <Typography variant={'h6'} className={classes.tabHeader}>RESPONSABILI</Typography>
                        <Typography variant={'caption'} className={classes.tabSubHeader}>Modifica le impostazioni principali del contratto</Typography>
                        <Box style={{paddingLeft:25,paddingRight:15}}>
                            <IconButton className={classes.btnIcon} style={{width:20,height:20,borderWidth:1,borderColor:'green',borderStyle:'solid',marginRight:10}} onClick={e=> {
                                setRespStatus(!respStatus)
                            }}><AddIcon className={classes.imgSTDres} style={{color:'green'}}/></IconButton>
                            <Typography variant={'caption'} style={{color:'green'}}>Aggiungi</Typography>
                        </Box>
                    </Box>

                    <Box className={classes.bottomTab}>
                        <Box className={classes.bottomTabUp} visibility={respStatus === true ? 'visible' : 'hidden'}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={findOptions()}
                                getOptionLabel={(option) => option.Cognome +' '+ option.Nome}
                                style={{ width: '80%' }}
                                onChange={handleRespChange}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                            <Box style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                <IconButton className={classes.btnIcon} style={{width:20,height:20,borderWidth:1,borderColor:'green',borderStyle:'solid',marginRight:10}} onClick={e => {
                                    async function sendData () {
                                        let toUp ={
                                            token:getUserData().Token,
                                            responsabili:currentResp,
                                            idContratto:data.id
                                        }
                                        updateResponsabili(toUp)
                                        data.account = toUp.responsabili
                                        setRespStatus(!respStatus)
                                        await delay(1000)
                                        setAnagraficaData(data)
                                        //history.push('/contratti/listaContratti')
                                    }
                                    sendData()
                                }}><AddIcon className={classes.imgSTDres} style={{color:'green'}}/></IconButton>
                            </Box>
                        </Box>
                        {userList !== undefined && userList !== null ? (
                            userList.map( (current,index) => {
                                let valuesUsers = data.account.split(',')
                                return valuesUsers.map( item => {
                                    if(current.id === parseInt(item)){
                                        return (
                                            <Box className={classes.singleOptionRes}>
                                                <Box className={classes.bottomStartRes}>
                                                    <Avatar className={classes.avatarClass}>{current.Nome.charAt(0)}</Avatar>
                                                </Box>
                                                <Box className={classes.bottomMiddleRes}>
                                                    <Typography variant={'subtitle1'} className={classes.tabTitle}>{current.Nome + ' ' + current.Cognome}</Typography>
                                                </Box>
                                                
                                                <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinalRes}>
                                                    <IconButton className={classes.btnIcon} onClick={ e=> {
                                                        handleRemoveResp(current.id)
                                                    }}><img src={require('../../../assets/images/lista-utenti/delete.png')} className={classes.imgSTDres}/></IconButton>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                } )
                                
                            } )
                        ) : null}

                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default Impostazioni
