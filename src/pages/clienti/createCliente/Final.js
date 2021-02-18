import React, { isValidElement, useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../../components/Sidebar"
import { Box, Button, Container, Typography } from "@material-ui/core"
import userData from '../../data/userData'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import clientData from '../../data/clientData'
import Referent from '../../components/referent'
import webservice from '../../../api/webservice'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    Header:{
        backgroundColor: "#00ADA2",
        height: 50,
        paddingTop:12
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    finalShow:{
        marginTop:40,
        height:'auto',
        width:'95%',
        paddingBottom:30,
        borderRadius:15,
        backgroundColor:'white',
    },
    tabName:{
        padding:15,
        paddingTop:30,
        fontWeight:'bold',
        fontSize:25, 
        letterSpacing:'.05em',
        color:'#6C6C6C'
    },
    button:{
        backgroundColor:'#00ADA2',
        textDecoration:'capitalize',
        width:'15%',
    },
    buttonBack:{
        width:'15%',
        background:'transparent',
        color:'black',
        '&:hover': {
        backgroundColor: '#f1e9e9 !important',
        }
    },
    summary:{
        marginTop:30,
        paddingLeft:15,
        paddingRight:15
    },
    accordionMain:{
        backgroundColor:'#F9F9F9',
        height:50
    },
    accordionPic:{
        width:24,
        marginRight:20
    },
    heading:{
        color:'#B1B1B1'
    },
    insideRow:{
        padding:'20px 50px',
        display:'flex',
        justifyContent:'space-between',
        textAlign:'left'
    },
    insideColumn:{
        width:'30%',
    },
    boldText:{
        color:'#6C6C6C',
        fontWeight:'bold'
    },
    lightText:{
        color:'#B1B1B1'
    },
    mainmain:{
        height:'auto',
        marginBottom:25,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    }
  }))

export default() => {
    const classes = useStyles();
    const history = useHistory()
    const [client,setClient] = useState([])
    const [contact,setContact ] = useState([])
    const [referent,setReferent ] = useState([])
    //Client Data
    const { getNewClientData, getContactReferent, getClientReferent, getNewClientID } = clientData()
    //API DATA
    const { createClient, createReferentiClienti, createContattiClienti } = webservice()
    //User Data
    const { getUserData,setDrawer } = userData()

    //Loader after submit
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if(getNewClientData() !== null ){
            setClient( getNewClientData() )
            setContact( getContactReferent() )
            setReferent( getClientReferent() )
        }
    }, [])
    console.log(client)
    function useForceUpdate() {
        let [value, setState] = useState(true);
        return () => setState(!value);
      }
      //F update
      let forceUpdate =  useForceUpdate()

    return (
        <div style={{display:'flex'}}>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
      <Sidebar></Sidebar>
      <Container maxWidth="False" style={{padding:0,margin:0,width:'100%',marginLeft:'-13%'}}>

      <Container maxWidth="False" className={classes.Header}>
        <MenuIcon style={{cursor:'pointer',color:'white'}} onClick={e => {
                      setDrawer()
                      forceUpdate()
                    }}/>
        </Container>

            <Container maxWidth="False" className={classes.finalShow}>

            <Typography className={classes.tabName}>CONFERMA E AGGIUNGI CLIENTE</Typography>

            <Box className={classes.summary}>
                <Accordion className={classes.mainmain} expanded={true}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../../assets/images/creaContratto/final/dati.png')} />
                        <Typography className={classes.heading}>Dati del contratto</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Ragione Sociale: </Typography>
                                    <span className={classes.lightText}>{client.ragSociale}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Estensione Ragione Sociale: </Typography>
                                    <span className={classes.lightText}>{client.estensioneRagSociale}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Nazionalità: </Typography>
                                    <span className={classes.lightText}>{client.nazionalita}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Località: </Typography>
                                    <span className={classes.lightText}>{client.localita}</span>
                                </Box>
                            </Box>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Indirizzo: </Typography>
                                    <span className={classes.lightText}>{client.indirizzo}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Codice Postale: </Typography>
                                    <span className={classes.lightText}>{client.codicepostale}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Codice Fiscale: </Typography>
                                    <span className={classes.lightText}>{client.codicefiscale}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Partita IVA: </Typography>
                                    <span className={classes.lightText}>{client.pIva}</span>
                                </Box>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.mainmain}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../../assets/images/creaContratto/final/dati.png')} />
                        <Typography className={classes.heading}>Contatti</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex',flexWrap:'wrap',justifyContent:'flex-start',paddingLeft:20,paddingRight:20}}>
                        {contact !== null ? (
                            contact.map( item => {
                                console.log(item)
                                return item!== null ?  <Referent data={item} type={'final'}></Referent> : null
                            })
                        ) : null}  
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.mainmain}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../../assets/images/creaContratto/final/dati.png')} />
                        <Typography className={classes.heading}>Referenti Del Cliente</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex',flexWrap:'wrap',justifyContent:'flex-start',paddingLeft:20,paddingRight:20}}>
                        {referent !== null ? (
                            referent.map( item => {
                                return <Referent data={item} type={'final'}></Referent>
                            })
                        ) : null}  
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box style={{display:'flex',justifyContent:'space-between',padding:'50px 100px 0',marginTop:50}}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    className={classes.buttonBack}
                    id='buttonBack'
                    onClick={ (e)=> {
                        e.preventDefault()
                        history.push('/clienti/referentiCliente')
                    } }
                    style={{justifyContent:'flex-start'}}
                    startIcon={<ArrowBackIcon></ArrowBackIcon>}
                >
                Indietro
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    
                    fullWidth={false}
                    className={classes.button}
                    style={{justifyContent:'flex-end'}}
                    endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                    onClick={e => {
                        const delay = ms => new Promise(res => setTimeout(res, ms));
                        let datiUP = client;
                        datiUP.token = getUserData().Token
                        let contactUP = []
                        let referentUP = []
                        if(contact!==null){
                            contact.map( item => {
                                let tmp = {
                                    nome:item[0].nome,
                                    posizione:item[0].posizione,
                                    telefono_one:item[1].num1,
                                    telefono_two:item[1].num2,
                                    email:item[2].mail1,
                                    pec:item[2].mail2
                                }
                                contactUP.push(tmp)
                            } )
                        }
                        if(referent!==null){
                            referent.map( item => {
                                let tmp = {
                                    nome:item[0].nome,
                                    posizione:item[0].posizione,
                                    telefono_one:item[1].num1,
                                    telefono_two:item[1].num2,
                                    email:item[2].mail1,
                                    pec:item[2].mail2
                                }
                                referentUP.push(tmp)
                            } )
                        }
                        async function uploadClient(){
                            async function uploadContact(){
                                contactUP.map( async contact => {
                                    contact.byCliente = getNewClientID()
                                    await createContattiClienti(contact)
                                } )
                            }
                            async function uploadReferent(){
                                referentUP.map( async referent => {
                                    referent.byCliente = getNewClientID()
                                    await createReferentiClienti(referent)
                                } )
                            }
                            handleToggle()
                            await createClient(datiUP);
                            if(contact!==null){
                                uploadContact()
                            }
                            if(referent!==null){
                                uploadReferent()
                            }
                            handleClose()
                            history.push('/clienti')
                        }
                        uploadClient()
                        
                    }}
                    >
                    Conferma
                </Button>
             </Box>
        </Container>
        

      </Container>
      
       
    </div>
    )
}
