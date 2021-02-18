import { Box, Typography } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import webservice from '../../../api/webservice';
import anagraficaData from '../../data/anagraficaData';
import userData from '../../data/userData';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { PDFDownloadLink, Document, Page,View,Text,Font } from '@react-pdf/renderer'
import clientData from '../../data/clientData';

const useStyles = makeStyles((theme) => ({
    imgSTD:{
        width:32,
        margin:'0 auto'
    },
    mainBox:{
        width:'25%',
        marginTop:'1%',
        marginBottom:'.5%'
    },
    mainText:{
        color:'#535353',
        fontWeight:'bold',
        marginBottom:15
    },
    subText:{
        color:'#B5B5B5',
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
        fontWeight:'bold'
    },
    rowTitle:{
        color:'#535353',
        marginBottom:5
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
}))


const ReportManutenzione = ({data,intList}) => {
    //Dialog Handle Actions
    const  [flag,setFlag]  = useState(false)
    const [type,setType] = useState(0)

    //Data Handle
    const { getUserData } = userData()
    const { getInterventoList } = webservice()
    const { getInterventoListData } = clientData()

    const classes = useStyles();



    useEffect(() => {
        const initialData = async () => {
            await getInterventoList(getUserData().Token, data.id)
        }
        //initialData()
    }, [])

    function swipeDate(date){
        let temp = date.split('-')
        return ( temp[2] + '-' + temp[1] + '-' + temp[0] )
}
    //Generate doc
    const MyDoc = ({data}) => {
            return (
                <>
                    <Document>
                        <Page className={classes.bodyDOC} style={{paddingTop: 35,
                        paddingBottom: 65,
                        paddingHorizontal: 35,}}>
                        <Text style={classes.titleDOC} style={{fontSize: 24,
                        textAlign: 'center',
                        }}>Report intervento manutenzione {data.tipologia}</Text>
                        <Text style={classes.authorDOC} style={{fontSize: 12,
                        textAlign: 'center',
                        marginBottom: 40,}}>INT. {data.id}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Data di creazione: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{swipeDate((data.created).split('T')[0])}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Data di Inizio intervento: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{swipeDate((data.dataInizio).split('T')[0])}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Data di Fine intervento: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{swipeDate((data.dataFine).split('T')[0])}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Descrizione Intervento: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.descrizione}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Priorità
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.priorita}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Intervento assegnato a:
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.ragSociale}</Text>
                        
                        </Page>
                    </Document>
                </>
            )
            
    }


        //LIST & DOWNLOAD REPORTS
    const DisplayReport = ({flag,handleClose,type,data}) => {   
            const classes = useStylesT()
            var toShow
            switch(type){
                case 1:
                    toShow = data.filter( item => item.tipologia === 'straordinaria');
                    break;
                case 2:
                    toShow = data.filter( item => item.tipologia === 'ordinaria');
                    break;
            } 
        
            console.log(toShow)
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
                                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#547f60'}}>MAN - {item.id}</Typography>
                                            <PDFDownloadLink document={<MyDoc data={item}/>} fileName={"MAN_" + item.id +".pdf"}>
                                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button className={classes.defButton} variant="outlined">Scarica Report</Button>)}
                                            </PDFDownloadLink>
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
                                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#f9bc58'}}>MAN - {item.id}</Typography>
                                            <PDFDownloadLink document={<MyDoc data={item}/>} fileName={"MAN_" + item.id +".pdf"}>
                                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button className={classes.defButton} variant="outlined">Scarica Report</Button>)}
                                            </PDFDownloadLink>
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
        let tmp = intList;
        if(tmp !== null){
            let toDisplay = tmp !== null ? tmp.filter( item => item.tipologia === 'straordinaria') : null;
            toDisplay = toDisplay.slice(0,5)
            return toDisplay.map( item => (
                        <Box className={classes.imgContainer}>
                            <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/interventoStraordinario.png')} />
                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#547f60'}}>MAN - {item.id}</Typography>
                        </Box>
             ) )

        }
    }

    //Render interventi ordinari
    const DisplayOrdinaria = () => {
        let tmp = intList;
        if(tmp !== null){
            let toDisplay = tmp.filter( item => item.tipologia === 'ordinaria');
            toDisplay = toDisplay.slice(0,5)
            return toDisplay.map( item => (
                        <Box className={classes.imgContainer}>
                            <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/interventoOrdinario.png')} />
                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#f9bc58'}}>MAN - {item.id}</Typography>
                        </Box>
             ) )

        }
    }

    function displayReports(){
        return <DisplayReport flag={flag} handleClose={ e => setFlag(false)} type={type} data={getInterventoListData()}/>
    }

    return(
        <>

        {/* Dialog view full report */}
        {displayReports()}
        <Box className={classes.mainBox}>
            <Box>
                <Typography variant='h5' className={classes.mainText}>REPORT MANUTENZIONE</Typography>
                <Typography variant='h7' className={classes.subText}>In questa sezione vengono generati i report e i rapporti d'intervento, la struttura del cliente. Un grafico sulla destra ci segnala la presenza di anomalie riscontrate </Typography>
            </Box>
            <Box className={classes.bottomColumn}>
                <Box className={classes.reportRow}>
                    <Typography className={classes.rowTitle} variant='h6'>Report Manutenzione Ordinaria[N]:</Typography>
                    <Box className={classes.internalReportRow}>
                        {/*<Box className={classes.imgContainer}>
                            <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/manutenzione.png')} />
                            <Typography variant='overline' className={classes.imgSubText} style={{color:'#375b83'}}>MAN - 125</Typography>
    </Box>*/}
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
