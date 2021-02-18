import React from 'react'
import { makeStyles, createMuiTheme, ThemeProvider, responsiveFontSizes  } from "@material-ui/core/styles"
import { Box, Typography } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
    partTitle:{
        paddingLeft:15,
        paddingTop:15,
        fontWeight:'bold',
        letterSpacing:'.05em',
        color:'#535353'
    },
    mainSituazione:{
        display:'flex',
        justifyContent:'space-between',
        margin:'10% 0'
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
        
        color:'#B5B5B5',
        letterSpacing:'.05em',
    },
    rowLeftText:{
        margin:'0 0 0 auto',
        color:'black'
    }
}))

const Situazione = ({nAsset,infoTicket}) => {
    const classes = useStyles();
    let theme = createMuiTheme();
    console.log( infoTicket )
    theme = responsiveFontSizes(theme);

    return (
        <>
            {infoTicket !== null && infoTicket !== undefined ? (
                <Box style={{backgroundColor:'white',width:'25%'}}>
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

                        </Box>
                        <Box className={classes.sideSituazione}>
                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/subImpianto.png')} />
                                <Typography className={classes.rowCentralText}>Sub Impianti</Typography>
                                <Typography className={classes.rowLeftText}>No</Typography>
                            </Box>
                            <Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/ticketClosed.png')} />
                                <Typography className={classes.rowCentralText}>Ticket Chiusi</Typography>
                                <Typography className={classes.rowLeftText}>{(infoTicket.filter(e=> e.interventi != null)).length}</Typography>
                            </Box>
                            {/*<Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/utenti.png')} />
                                <Typography className={classes.rowCentralText}>Utenti[N]</Typography>
                                <Typography className={classes.rowLeftText}>5</Typography>
                            </Box>*/}
                            {/*<Box className={classes.situazioneRow}>
                                <img className={classes.situazioneImage} src={require('../../../assets/images/anagraficaContratto/anagraficaSituazione/nAsset.png')} />
                                <Typography className={classes.rowCentralText}>Numero di Asset</Typography>
                                <Typography className={classes.rowLeftText}>{nAsset}</Typography>
                        </Box>*/}

                        </Box>
                        
                    </Box>
                </ThemeProvider>
            </Box>
            ) : null}
        </>
    )
}

export default Situazione
