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
import { HouseRounded } from '@material-ui/icons';

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

export default function InfoIntervento() {

    const classes = useStyles();

  //ApiValues
  const { getAssedById, updateProgramma, getFullProgrammaReq, createReport, createAnomalia, createManodopera, createMateriale} = webservice()
  const { getUserData } = userData()
  const { getSingleData, getFirstReportData,getSecondReportData, getProgId, getNewRepID, getTargetPROGRAMMA } = anagraficaData()

  const statusTicket = getFirstReportData()[0]
  const delay = ms => new Promise(res => setTimeout(res, ms));
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  const [anomalie,setAnomalie] = React.useState( getFirstReportData()[2] )

  return (
    <div>
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                                    disabled={true}
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
                        disabled={true}
                        value={getFirstReportData()[1].desc}
                        variant="outlined"
                    />
                    <Typography className={classes.tabUnderText} variant={'caption'} style={{marginBottom:30}}>Inserisci una descrizione sintetica del problema</Typography>
                    
                </Box>               
                {statusTicket.chiusoanomalie === true || statusTicket.lavorazioneanomalie === true ? (
                    <>
                        <Box className={classes.columnSTD}>
                        <Typography className={classes.tabMainText} variant={'h6'}>Anomalie Asset</Typography>
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
                <Button variant="outlined" className={classes.saveBtn} style={{marginLeft:20,marginRight:20}} onClick= { async e => {
                    e.preventDefault()

                    function getRR (sss){
                        switch(sss){
                            case 'chiuso':
                                return 'finito'
                                break;
                            case 'chiusoanomalie':
                                return 'finito'
                                break;
                            case 'lavorazione':
                                return 'attivo'
                                break;
                            case 'lavorazioneanomalie':
                                return 'attivo'
                                break;
                        }
                    }

                    let toUp ={
                        token:'se',
                        status:getRR(  getKeyByValue(statusTicket,true) ),
                        id:getProgId()
                    }

                    console.log( getFirstReportData(), getSecondReportData() )

                    let toGenerateReport ={
                        token:getUserData().Token,
                        descrizione:getFirstReportData()[1].desc,
                        cliente:getTargetPROGRAMMA().idCliente,
                        byProg:getTargetPROGRAMMA().id,
                        byContratto:getTargetPROGRAMMA().byContratto
                    }

                    await createReport(toGenerateReport)
                    await delay(1000)

                    //UPLOAD ANOMALIE
                    if( getFirstReportData()[2] !== undefined ){
                        getFirstReportData()[2].map( async item => {
                            let anomalie = {
                                token:getUserData().Token,
                                codice:item.codice,
                                descrizione:item.desc,
                                byTicket:getNewRepID()
                            }
                            await createAnomalia(anomalie)
                        })
                    }

                     //UPLOAD MATERIALE
                     if( getSecondReportData()[0] !== undefined ){
                        getSecondReportData()[0].map( async item => {
                            let materiale = {
                                token:getUserData().Token,
                                codice:item.codice,
                                descrizione:item.descrizione,
                                nome:item.nome,
                                quantita:parseInt(item.quantita),
                                byTicket:getNewRepID()
                            }
                            await createMateriale(materiale)
                        })
                    }

                    //UPLOAD Manodopera
                    if( getSecondReportData()[1] !== undefined ){
                        getSecondReportData()[1].map( async item => {
                            let manodopera = {
                                token:getUserData().Token,
                                idUser:item.id,
                                hOrd:item.hour,
                                byTicket:getNewRepID()
                            }
                            await createManodopera(manodopera)
                        })
                    }


                    
                    updateProgramma(toUp)
                    await delay(500)
                    await getFullProgrammaReq('dd')
                    await delay(500)
                    window.location.reload(false)
                } }>Salva e Genera</Button>
            </Box>
            </Box>
    </div>
  );
}