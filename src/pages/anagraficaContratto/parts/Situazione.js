import React from 'react'
import { makeStyles, createMuiTheme, ThemeProvider, responsiveFontSizes  } from "@material-ui/core/styles"
import { Box, Typography } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { useHistory } from "react-router-dom";
import contractData from '../../data/contractData';
import anagraficaData from '../../data/anagraficaData';

const useStyles = makeStyles((theme) => ({
    partTitle:{
        paddingLeft:15,
        paddingTop:15,
        fontWeight:'bold',
        letterSpacing:'.05em',
        color:'#535353',
        fontSize:'1vw'
    },
    mainSituazione:{
        display:'flex',
        justifyContent:'space-between',
        margin:'10% 0',
        width:'80%'
    },
    sideSituazione:{
        width:'45%',
        justifyContent:'column',
        paddingLeft:10,
        paddingTop:10
    },
    situazioneRow:{
        padding:10,
        marginBottom:10,
        display:'flex',
    },
    situazioneImage:{
        height:24,
        marginRight:5
    },
    rowCentralText:{
        fontSize:'0.7vw',
        color:'#B5B5B5',
        letterSpacing:'.05em',
    },
    rowLeftText:{
        margin:'0 0 0 auto',
        color:'black',
        width:'20%',
        fontSize:'0.7vw',
        textAlign:'right'
    }
}))

const Situazione = ({nAsset,infoTicket,nAccount}) => {
    const classes = useStyles();
    const history = useHistory()
    let theme = createMuiTheme(); 
    const {getAnagraficaData} = anagraficaData()
    theme = responsiveFontSizes(theme);

    //getting num subcontract
    const { getContractListData } = contractData()
    let toShow = getContractListData().filter( e => e.isSub == getAnagraficaData().id )

    return (
        <>
            {infoTicket !== null && infoTicket !== undefined ? (
                <Box style={{backgroundColor:'white',width:'30%'}}>
                <ThemeProvider theme={theme}>
                    <Typography variant='h5' className={classes.partTitle} >SITUAZIONE</Typography>
                    <Box className={classes.mainSituazione}>
                        <Box className={classes.sideSituazione}>

                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/ticketTotali.png')} />
                                <Typography variant='subtitle1'className={classes.rowCentralText}>Ticket Totali</Typography>
                                <Typography className={classes.rowLeftText}>{infoTicket != null ? infoTicket.length : 0}</Typography>
                            </Box>
                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/ticketOpen.png')} />
                                <Typography className={classes.rowCentralText}>Ticket Aperti</Typography>
                                <Typography className={classes.rowLeftText}>{(infoTicket.filter(e=> e.interventi === null)).length}</Typography>
                            </Box>
                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/ticketClosed.png')} />
                                <Typography className={classes.rowCentralText}>Ticket Chiusi</Typography>
                                <Typography className={classes.rowLeftText}>{(infoTicket.filter(e=> e.interventi != null)).length}</Typography>
                            </Box>

                        </Box>
                        <Box className={classes.sideSituazione}>
                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/subImpianto.png')} />
                                <Typography className={classes.rowCentralText}>Sotto Impianti</Typography>
                                <Typography className={classes.rowLeftText}>{toShow.length}</Typography>
                            </Box>
                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/utenti.png')} />
                                <Typography className={classes.rowCentralText}>Utenti</Typography>
                                <Typography className={classes.rowLeftText}>{nAccount}</Typography>
                            </Box>
                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/nAsset.png')} />
                                <Typography className={classes.rowCentralText}>Numero di Asset</Typography>
                                <Typography className={classes.rowLeftText}>{nAsset}</Typography>
                            </Box>

                        </Box>
                        
                    </Box>
                </ThemeProvider>
            </Box>
            ) : null}
        </>
    )
}

export default Situazione
