import React from 'react'
import { makeStyles, createMuiTheme, ThemeProvider, responsiveFontSizes  } from "@material-ui/core/styles"
import { Box, Typography } from '@material-ui/core';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const useStyles = makeStyles((theme) => ({
    partTitle:{
        paddingLeft:15,
        paddingTop:15,
        fontWeight:'bold',
        fontSize:25,
        letterSpacing:'.05em',
        color:'#535353'
    },
    mainTicket:{
        display:'flex',
        flexDirection:'column',
        margin:'5% 0'
    },
    ticketMainImage:{
        height:38
    },
    ticketRow:{
        marginBottom:'5%',
        display:'flex',
        alignItems:'center'
    },
    ticketDesc:{
        width:'40%'
    },
    ticketID:{
        color:'#0CA589',
        fontSize:22,
        fontWeight:'bold'
    },
    ticketDescription:{
        fontSize:14,
        color:'#B5B5B5'
    },
    ticketDate:{
        color:'#535353',
        letterSpacing:'.1em'
    },
    leftIconTicket:{
        display:'flex',
        alignItems:'center',
        width:'auto',
        paddingLeft:15,
        paddingRight:15
    }
}))

const Ticket = ({data}) => {
    //console.log(data)
    const classes = useStyles();

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);

    function swipeDate(date){
        let temp = date.split('-')
        return ( temp[2] + '-' + temp[1] + '-' + temp[0] )
}
    function urgenzaIMG(type){
        switch(type){
            case 'urgente':
                return (require('../../../assets/images/anagraficaContratto/ticket/pUrgente.png'))
                break;
            case 'medio':
                return (require('../../../assets/images/anagraficaContratto/ticket/pMedia.png'))
                break;
            case 'emergenza':
                return (require('../../../assets/images/anagraficaContratto/ticket/pEmergenza.png'))
                break;
            case 'basso':
                return (require('../../../assets/images/anagraficaContratto/ticket/pBassa.png'))
                break;
        }
    }
    return (
            <Box style={{backgroundColor:'white',width:'35%',paddingLeft:15}}>
                <Typography className={classes.partTitle} >TICKET APERTI</Typography>
                <Box className={classes.mainTicket}>
                    {data !== null && data !== undefined ? 
                    (data.filter(e => e.interventi === null)).slice(0,3).map( item => {
                        return (
                            <Box className={classes.ticketRow}>
                                <Box style={{display:'flex',width:'100%'}}>
                                    <Box style={{display:'flex',width:'30%',alignItems:'center'}}>
                                        <Typography className={classes.ticketDate}>{swipeDate((item.created).split('T')[0])} </Typography>
                                        <div style={{marginLeft:5,marginRight:5,width:'30px',backgroundColor:'#535353',height:1}}></div>
                                        <img className={classes.ticketMainImage}src={require('../../../assets/images/anagraficaContratto/ticket/INTERVENTO.png')} />
                                    </Box>
                                    <Box className={classes.ticketDesc}>
                                        <Typography className={classes.ticketID}>INT.{item.id}</Typography>
                                        <Typography className={classes.ticketDescription}>{(item.descrizione).slice(0,90) + '...'}</Typography>
                                    </Box>
                                    <Box className={classes.leftIconTicket}>
                                        <Box style={{marginRight:30,textAlign:'center'}}>
                                            <img style={{height:24}}src={urgenzaIMG(item.priorita)} />
                                            <Typography style={{fontSize:12,color:'#FF4311',fontWeight:'bold',textTransform:'capitalize'}}>{item.priorita}</Typography>
                                        </Box>
                                        <Box style={{textAlign:'center'}}>
                                            <WatchLaterIcon style={{fontSize:24,color:'#12BB9C'}}/>
                                            <Typography style={{fontSize:12,color:'#12BB9C',fontWeight:'bold'}}>{item.interventi === null ? 'In Lavorazione' : 'Concluso'}</Typography>
                                        </Box>
                                        
                                    </Box>
                                </Box>
                                <Box>

                                </Box>
                            </Box>
                        )
                    } ) : null}
                </Box>
            </Box>
    )
}

export default Ticket
