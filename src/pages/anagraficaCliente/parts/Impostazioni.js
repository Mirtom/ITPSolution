import React, { useEffect,useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Avatar, Box, Button, Container, IconButton, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import webservice from '../../../api/webservice'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import userData from '../../data/userData';
import anagraficaData from '../../data/anagraficaData';
import EditCliente from './EditCliente';

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


const Impostazioni = ({data}) => {
    const classes = useStyles()
    const { getUserData } = userData()
    const { userList, getUserList } = webservice()

    //display add resp form
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const history = useHistory()

    //Import API Modules
    const { updateResponsabili } = webservice()
    const { setAnagraficaData } = anagraficaData()

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
            <EditCliente data={data} status={editContractStatus} handleClose={() => {
                setEditContractStatus(false)
                forceUpdate()
                }}/>
            {/*<EditAttivita contratto={data} status={editActivityStatus} handleClose={() => setEditActivityStatus(false)} />
            <EditAcquisizione data = {data} handleClose={ () => setEditAcquisizioneStatus(false) } status={editAcquisizioneStatus} />
    <EditReferente dataC ={data} handleClose={ () => setEditReferenteStatus(false)} status={editReferenteStatus} /> */}
            <Box className={classes.mainBox}>

                <Box className={classes.leftTab}>
                    <Box className={classes.tabUpperBox}>
                        <Typography variant={'h5'} className={classes.tabHeader}>MODIFICA CLIENTE</Typography>
                        <Typography variant={'caption'} className={classes.tabSubHeader}>Modifica le impostazioni principali del cliente</Typography>
                    </Box>

                    <Box className={classes.bottomTab}>

                        <Box className={classes.singleOption} onClick={ e => {
                            setEditContractStatus(true)
                        } }>
                            <Box style={{marginRight:20,paddingTop:7}}>
                                <img src={require('../../../assets/images/creaContratto/final/contrattoblack.png')} className={classes.imgSTD}/>
                            </Box>
                            <Box className={classes.bottomMiddle}>
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Dati del Clienti</Typography>
                            </Box>
                            <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinal}>
                                <ArrowForwardIcon style={{fontSize:35,margin:'auto 0px'}} />
                            </Box>
                        </Box>
                        {/*<Box className={classes.singleOption} onClick={ e => {
                            e.preventDefault()
                            setEditAcquisizioneStatus(true)
                        } }>
                            <Box style={{marginRight:20,paddingTop:7}}>
                                <img src={require('../../../assets/images/creaContratto/final/acquisizione.png')} className={classes.imgSTD}/>
                            </Box>
                            <Box className={classes.bottomMiddle}>
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Contatti Referente</Typography>
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
                                <Typography variant={'subtitle1'} className={classes.tabTitle}>Referenti del cliente</Typography>
                            </Box>
                            <Box style={{justifySelf:'flex-end'}} className={classes.bottomFinal}>
                                <ArrowForwardIcon style={{fontSize:35,margin:'auto 0px'}} />
                            </Box>
                        </Box>*/}

                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Impostazioni
