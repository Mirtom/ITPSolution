import React,{ useState } from 'react'
import { Box, Button, Container, IconButton, Typography } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import EditActivity from './EditActivity';

const useStyles = makeStyles((theme) => ({
    mainContainer:{
        display:'flex',
        justifyContent:'space-between',
    },
    aCont:{
        width:'70%',
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'white'
    },
    manRow:{
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop:'2%',
        paddingBottom:'1%',
        borderBottomWidth:'1',
        borderBottomStyle:'solid',
        borderBottomColor:'#e8e8e8'
    },
    manCol:{
        width:'30%'
    },
    asset:{
        borderColor:'#a2d0fb',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:10,
        padding:5,
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    assetIMG:{
        height:30,
    },
    assetCODE:{
        textTransform:'uppercase',
        color:'#71A8DB',
        fontWeight:'bold',
    },
    assetDESC:{
        color:'#898989',
        width:'60%'
    },
    month:{
        fontWeight:'bold',
        color:'#535353',
        marginBottom:15
    },
    lCont:{
        width:'28%',
        backgroundColor:'white'
    },
    actList:{
        color:'#535353',
        width:'80%',
        textAlign:'center'
    },
    actTop:{
        paddingTop:30,
        paddingBottom:30,
        display:'flex',
        flexDirection:'row'
    },
    actIcon:{
        height:30,
    },
    actIconTwo:{
        width:16,
    },
    actSingle:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:2,
        alignItems:'center',
        borderBottomColor:'#e8e8e8',
        borderBottomStyle:'solid'
    },
    actCode:{
        color:'#535353',
        fontWeight:'bold',
        width:'10%'
    },
    actType:{
        color:'#535353',
        fontWeight:'bold',
        width:'10%',
        textAlign:'center'
    },
    actTime:{
        color:'#535353',
        fontWeight:'bold',
        width:'10%',
        textAlign:'center'
    },
    actDescContainer:{
        width:'40%'
    },
    actDesc:{
        color:'#535353'
    },
    panelIconButton:{
        alignItems:'center',
        '&:hover':{
          background:'lightgray !important'
        }
      },
      width:25,
      height:25,
      marginRight:10
}))

const ProgrammaManuntezione = ({asset}) => {
    //CLASSI CSS
    const classes = useStyles()

    //SESSION DATA
    const { deleteActivity } = webservice()
    const { getUserData } = userData()

    function periods(tmp){
        switch(tmp){
            case 'Settimanale':
                return 1;
                break;
            case 'Mensile':
                return 1;
                break;
            case 'Bimestrale':
                return 2;
                break;
            case 'Trimestrale':
                return 3;
                break;
            case 'Quadrimestrale':
                return 4;
                break;
            case 'Semestrale':
                return 6;
                break;
            case 'Annuale':
                return 12;
                break;
        }
    }

    function splitAsset(item,month){

        let counter = 0
        return item.map( e => {
            let type = periods(e.periodo)
            
            if( ((month-1) % type) === 0 && counter<3){
                counter++
                return(
                    <>
                    <Box className={classes.asset} style={{borderColor:'#e8e8e8'}}>
                        <img className={classes.assetIMG} src={require('../../../assets/images/anagraficaContratto/manutenzione/icon.png')} />
                        <Typography variant={'h6'} className={classes.assetCODE}>N.{e.id}</Typography>
                        <Typography variant={'caption'} className={classes.assetDESC}>{e.descrizione.slice(0,90) + '...'}</Typography>
                        
                    </Box>{counter === 3 ? <ExpandMoreIcon style={{width:'100%',textAlign:'center',color:'#71A8DB',cursor:'pointer'}} onClick={e=> {
                        setCMonth(month)
                        setCData(item.filter( e=> (month-1) % periods(e.periodo) === 0 ))
                        setOpenSingle(true)
                    }}/> : null}</>
                )
            }
        } )
    }

    //Remove snackbar
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        console.log('d')
    };
    console.log(open)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };



    function lastAct(item){
        var d = new Date()
        let actualMonth = d.getMonth()
            return item.map( tmp => {
                for( let i=actualMonth;i<12; i++ ){
                let type=periods(tmp.periodo)
                if( i % type === 0 ){
                    return (
                        <Box className={classes.actSingle}>
                            <Typography variant={'h6'} className={classes.actCode}>N. {tmp.id}</Typography>
                            <Typography variant={'subtitle2'} className={classes.actType}>{tmp.tipologia}</Typography>
                            <Box className={classes.actDescContainer}>
                                <Typography variant={'caption'} className={classes.actDesc}>{tmp.descrizione.slice(0,90) + '...'}</Typography>
                            </Box>
                                <Typography variant={'subtitle2'} className={classes.actTime}>{tmp.periodo}</Typography>
                            <Box>
                                <IconButton className={classes.panelIconButton} style={{backgroundColor:'#e3f4f6'}} onClick={e=> {
                                    e.preventDefault()
                                    setFlag(!flag)
                                    setActToEdit(tmp)
                                }}>
                                    <img src={require('../../../assets/images/lista-utenti/pencil.png')} className={classes.actIconTwo} />
                                </IconButton>
                                <IconButton className={classes.panelIconButton} style={{backgroundColor:'#f9d7c8'}} onClick={async tmpp => {
                                    let toRem = {
                                        token: getUserData().Token,
                                        id:tmp.id
                                      }
                                      await deleteActivity(toRem)
                                      window.location.reload(false)
                                }}>
                                    <img src={require('../../../assets/images/lista-utenti/delete.png')} className={classes.actIconTwo} />
                                </IconButton>
                            </Box>
                        </Box>
                    )
                }
            }
        } )
    }

    //DIALOG TO SHOW ALL ACTIVITY DATA
    const [openSingle,setOpenSingle] = useState(false)
    const [cMonth, setCMonth] = useState(0)
    const [cData,setCData] = useState([])
    const handleCloseSingle = () => {
        setOpenSingle(false)
    }
    function monthDISPLAY(month){
        switch(month){
            case 1:
                return 'Gennaio'
                break;
            case 2:
                return 'Febbraio'
                break;
            case 3:
                return 'Marzo'
                break;
            case 4:
                return 'Aprile'
                break;
            case 5:
                return 'Maggio'
                break;
            case 6:
                return 'Giugno'
                break;
            case 7:
                return 'Luglio'
                break;
            case 8:
                return 'Agosto'
                break;
            case 9:
                return 'Settembre'
                break;
            case 10:
                return 'Ottobre'
                break;
            case 11:
                return 'Novembre'
                break;
            case 12:
                return 'Dicembre'
                break;
            
        }
    }

    const [flag,setFlag] = useState(false)
    const [actToEdit,setActToEdit] = useState({})
    function EditItems(flags,itemToSend) {
        return <EditActivity toShow={flags} item={itemToSend} handleClose={e => setFlag(!flag)} handleSuccess={e => window.location.reload(false)}></EditActivity>
    }


    return (
        <>
            
            <Box className={classes.mainContainer}>
            <div>
                {EditItems(flag,actToEdit)}
            </div>
                {/* BOX ASSET MESI*/}
                <Box className={classes.aCont}>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Gennaio</Typography>
                            {splitAsset(asset,1)}
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Febbraio</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,2)}
                        </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Marzo</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,3)}
                        </Box>
                        
                    </Box>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Aprile</Typography>
                            {splitAsset(asset,4)}
                        </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Maggio</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,5)}
                        </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Giugno</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,6)}
                        </Box>
                        
                    </Box>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Luglio</Typography>
                            {splitAsset(asset,7)}
                        </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Agosto</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,8)}
                        </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Settembre</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,9)}
                        </Box>
                        
                    </Box>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Ottobre</Typography>
                            {splitAsset(asset,10)}
                        </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Novembre</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,11)}
                        </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Dicembre</Typography>
                            {/* SINGOLO Asset*/}
                            {splitAsset(asset,12)}
                        </Box>
                        
                    </Box>
                    
                </Box>

                {/* BOX LAST ASSET */}
                <Box className={classes.lCont}>
                    <Box className={classes.actTop}>
                        <Typography variant={'h6'} className={classes.actList}>Lista Attività</Typography>
                        <img src={require('../../../assets/images/anagraficaContratto/manutenzione/addAsset.png')} className={classes.actIcon} />
                    </Box>
                    {lastAct(asset)}
                    {/* ALERT REMOVE ATTIVITA */}
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                        This is a success message!
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>

            {/* DIALOG TO SHOW ALL ACTIVITY SINGLE MONTH*/}
            <Dialog
                open={openSingle}
                maxWidth={'lg'}
                onClose={handleCloseSingle}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Lista Attività {monthDISPLAY(cMonth)}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {cData.map(e => {
                            return (
                                <Box className={classes.actSingle}>
                                    <Typography variant={'h6'} className={classes.actCode}>N. {e.id}</Typography>
                                    <Typography variant={'subtitle2'} className={classes.actType}>{e.tipologia}</Typography>
                                    <Box className={classes.actDescContainer}>
                                        <Typography variant={'caption'} className={classes.actDesc}>{e.descrizione}</Typography>
                                    </Box>
                                        <Typography variant={'subtitle2'} className={classes.actTime}>{e.periodo}</Typography>
                                </Box>
                            )
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSingle} color="primary" autoFocus>
                        Chiudi
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ProgrammaManuntezione
