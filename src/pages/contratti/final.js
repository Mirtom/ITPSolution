import React, { isValidElement, useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Button, Container, Typography } from "@material-ui/core"
import userData from '../data/userData'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import contractData from '../data/contractData'
import webservice from '../../api/webservice'
import Referent from '../components/referent'
import anagraficaData from '../data/anagraficaData'

import MenuIcon from '@material-ui/icons/Menu';
import Activity from '../components/activity'


const useStyles = makeStyles((theme) => ({
    Header:{
        backgroundColor: "#00ADA2",
        height: 50,
        paddingTop:12
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
    function useForceUpdate(){
        const [value, setValue] = React.useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
    }
    const forceUpdate = useForceUpdate();

    const classes = useStyles();
    const history = useHistory()
    //Data contratto
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const { getNewContractData,getNewContractType, getNewContractClientList, getContractActivity, getContractType,getContractListData, getNewContractAcquisizione,getNewUploadsData, getContractReferent, getNewContractID } = contractData()
    //Data ANAGRAFICA - SUB IMPIANTO
    const { getAnagraficaData } = anagraficaData()
    //TOKEN
    console.log(getNewContractAcquisizione())
    const { getUserData,setDrawer } = userData()
    //Prelevo info cliente da Webservice
    const { getClientList,clientList,createAcquisizione, createContratto, createActivity,getContractList, createReferenteContratto, uploadAllegato } = webservice()
    const dataContratto = (getNewContractData())[0]
    //Estrazione cliente
    const [clientDef,setClientDef] = useState({})
    const [subData, setSubData] = useState({})

    useEffect(() => {
        getClientList(getUserData().Token)
        if(getContractType() === 'sub') {
            setSubData(getAnagraficaData())
            setClientDef( getNewContractClientList().filter( item => item.id == parseInt(getAnagraficaData().cliente) )[0] )
            //Getting al sub-contract to make the name
            getContractList( getUserData().token )
        }else{
            setClientDef((getNewContractClientList().filter( (item) => item.rSociale == dataContratto.cliente ) )[0])
        }
    }, [])
    function formatNumbers(curr){
        return new Intl.NumberFormat('eu-EU', { 
            style: 'currency', 
            currency: 'EUR', 
            minimumFractionDigits: 2, 
        }).format(parseInt(curr)); 
    }

    return (
        <div style={{display:'flex'}}>
      <Sidebar></Sidebar>
      <Container maxWidth="False" style={{padding:0,margin:0,width:'100%',marginLeft:'-13%'}}>

        <Container maxWidth="False" className={classes.Header}>
        <MenuIcon style={{cursor:'pointer',color:'white'}} onClick={e => {
                      setDrawer()
                      forceUpdate()
                    }}/>  
        </Container>
        { getContractType() === 'sub' ? (
            <Container maxWidth="False" className={classes.finalShow}>
                {console.log(subData)}

            <Typography className={classes.tabName}>CONFERMA E AGGIUNGI SUB-IMPIANTO</Typography>

            <Box className={classes.summary}>
                <Accordion className={classes.mainmain} expanded={true}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../assets/images/creaContratto/final/dati.png')} />
                        <Typography className={classes.heading}>Dati del contratto</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Ragione Sociale: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.rSociale : null}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Estensione Ragione Sociale: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.estensioneRSociale : null}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Nazionalità: </Typography>
                                    <span className={classes.lightText}>{dataContratto.nazionalita}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Località: </Typography>
                                    <span className={classes.lightText}>{dataContratto.localita}</span>
                                </Box>
                            </Box>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Indirizzo: </Typography>
                                    <span className={classes.lightText}>{dataContratto.indirizzo}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Codice Postale: </Typography>
                                    <span className={classes.lightText}>{dataContratto.codicepostale}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Codice Fiscale: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.cf : null}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Partita IVA: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.pIVA : null}</span>
                                </Box>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.mainmain}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../assets/images/creaContratto/final/lista.png')} />
                        <Typography className={classes.heading}>Lista Attività</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex',flexDirection:'column'}}>
                    {getContractActivity() !== null ? ( 
                            getContractActivity().map( (tmp, index) => {
                                return <Activity data={tmp} index={index} variant={'final'} style={{marginBottom:25}}/>
                            } ) 
                         ) : "NESSUNA ATTIVITA' IMPOSTATA"}
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
                        history.push('/contratti/referenteContratto')
                    } }
                    style={{justifyContent:'flex-start'}}
                    startIcon={<ArrowBackIcon></ArrowBackIcon>}
                >
                Indietro
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={ async (e)=> {
                        e.preventDefault()
                        let typeFin = ''
                        getNewContractType().map( i => {
                            if(typeFin === ''){
                                typeFin = i
                            }else{
                                typeFin = typeFin + ',' + i
                            }
                        })
                        let newLetter = ''
                        let numero = getContractListData().filter( item => item.isSub === getAnagraficaData().id )
                        if(numero.length > 0 ){
                            numero.map((item,index) => {
                                if(index === numero.length -1){
                                    let letter = item.numero.split('-')
                                    letter = letter[letter.length - 1]
                                    newLetter = (String.fromCharCode(letter.charCodeAt(0) + 1) )
                                }
                            })
                        }else{
                            newLetter='A'
                        }
                        
                        let dataToUpload =
                            {
                                token: getUserData().Token,
                                titolo: dataContratto.titolo,
                                numero: getAnagraficaData().numero + '-' + newLetter,
                                nazionalita: dataContratto.nazionalita,
                                dataInizio: dataContratto.datainizio,
                                descrizione: dataContratto.descrizione,
                                cliente: clientDef.id,
                                account: dataContratto.account,
                                localita: dataContratto.localita,
                                cap: dataContratto.codicepostale,
                                tipologia: typeFin,
                                dataFine: dataContratto.datafine,
                                indirizzo:dataContratto.indirizzo,
                                isSub:getAnagraficaData().id
                            }
                            //Uploading to table Contratti
                            await createContratto(dataToUpload)
                            await delay(1000)
                            //UPLOAD REFERENTI
                            if( getContractReferent()!== undefined && getContractReferent() !== null ){
                                getContractReferent().map( async referente => {
                                    let toUp={
                                        nome:referente[0].nome,
                                        cognome:referente[0].nome,
                                        posizione:referente[0].posizione,
                                        nTel:referente[1].num1,
                                        nTelS:referente[1].num2,
                                        email:referente[2].mail1,
                                        pec:referente[2].mail2,
                                        byContract:getNewContractID()
                                    }
                                    await createReferenteContratto(toUp)
                                } )
                            }
                            //UPLOAD Acquisizione
                            if( getNewContractAcquisizione() !== null && getNewContractAcquisizione() !== undefined ){
                                let toUpAC = getNewContractAcquisizione()
                                toUpAC.byContract = getNewContractID()
                                await createAcquisizione(toUpAC)
                            }
                            //Uploading activty list and linking to Contratti
                            if(getContractActivity() !== null && getContractActivity() !== undefined){
                                let activity = getContractActivity()
                                activity.map( async (item) => {
                                    let activityToUpload = {
                                        token : getUserData().Token,
                                        tipologia : item.tipologia,
                                        descrizione : item.descrizione,
                                        periodo : item.periodo,
                                        contrattoNum: getAnagraficaData().numero + '-' + newLetter
                                    }
                                    console.log(activityToUpload)
                                        await createActivity(activityToUpload.token,activityToUpload.tipologia,activityToUpload.periodo,activityToUpload.descrizione,activityToUpload.contrattoNum)
                                        
                                }) 
                            }
                            history.push('/contratti/listaContratti') 
                    } }
                    fullWidth={false}
                    className={classes.button}
                    style={{justifyContent:'flex-end'}}
                    endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                    >
                    Conferma
                </Button>
             </Box>
        </Container>

        ) : ( 
            <Container maxWidth="False" className={classes.finalShow}>

            <Typography className={classes.tabName}>CONFERMA E AGGIUNGI</Typography>

            <Box className={classes.summary}>
                <Accordion className={classes.mainmain} expanded={true}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../assets/images/creaContratto/final/dati.png')} />
                        <Typography className={classes.heading}>Dati del contratto</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Ragione Sociale: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.rSociale : null}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Estensione Ragione Sociale: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.estensioneRSociale : null}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Nazionalità: </Typography>
                                    <span className={classes.lightText}>{dataContratto.nazionalita}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Località: </Typography>
                                    <span className={classes.lightText}>{dataContratto.localita}</span>
                                </Box>
                            </Box>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Indirizzo: </Typography>
                                    <span className={classes.lightText}>{dataContratto.indirizzo}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Codice Postale: </Typography>
                                    <span className={classes.lightText}>{dataContratto.codicepostale}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Codice Fiscale: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.cf : null}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Partita IVA: </Typography>
                                    <span className={classes.lightText}>{clientDef !== undefined ? clientDef.pIVA : null}</span>
                                </Box>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.mainmain}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../assets/images/creaContratto/final/acquisizione.png')} />
                        <Typography className={classes.heading}>Acquisizione</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Base d'Asta: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().bAsta : null)}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Costi Manodopera: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().cManodopera : null)}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Costi Materiali: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().cMateriale : null)}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Costi Vari: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().cVari : null)}</span>
                                </Box>
                            </Box>
                            <Box className={classes.insideColumn}>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Prezzo Totale di Vendita: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().pTot : null)}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Vendita Manodopera: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().vManodopera : null)}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Vendita Materiali: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().vMateriale : null)}</span>
                                </Box>
                                <Box className={classes.insideRow}>
                                    <Typography className={classes.boldText}>Vendita Vari: </Typography>
                                    <span className={classes.lightText}>{formatNumbers(getNewContractAcquisizione() !== null ? getNewContractAcquisizione().vVari : null)}</span>
                                </Box>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.mainmain}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../assets/images/creaContratto/final/lista.png')} />
                        <Typography className={classes.heading}>Lista Attività</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex',flexDirection:'column'}}>
                    {getContractActivity() !== null ? ( 
                            getContractActivity().map( (tmp, index) => {
                                return <Activity data={tmp} index={index} variant={'final'} style={{marginBottom:25}}/>
                            } ) 
                         ) : null}
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.mainmain}>
                    <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionMain}
                    >
                        <img className={classes.accordionPic} src={require('../../assets/images/creaContratto/final/dati.png')} />
                        <Typography className={classes.heading}>Referenti Del Contratto</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around',paddingLeft:20,paddingRight:20}}>
                        {getContractReferent() !== null && getContractReferent() !== undefined ? (
                            getContractReferent().map( item => {
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
                        history.push('/contratti/documenti')
                    } }
                    style={{justifyContent:'flex-start'}}
                    startIcon={<ArrowBackIcon></ArrowBackIcon>}
                >
                Indietro
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={ async (e)=> {
                        e.preventDefault()
                        let typeFin = ''
                        getNewContractType().map( i => {
                            if(typeFin === ''){
                                typeFin = i
                            }else{
                                typeFin = typeFin + ',' + i
                            }
                        })
                        let dataToUpload =
                            {
                                token: getUserData().Token,
                                titolo: dataContratto.titolo,
                                numero: dataContratto.numero,
                                nazionalita: dataContratto.nazionalita,
                                dataInizio: dataContratto.datainizio,
                                descrizione: dataContratto.descrizione,
                                cliente: clientDef.id,
                                account: dataContratto.account,
                                localita: dataContratto.localita,
                                cap: dataContratto.codicepostale,
                                tipologia: typeFin,
                                dataFine: dataContratto.datafine,
                                indirizzo:dataContratto.indirizzo,
                                isSub:0
                            }
                            //Uploading to table Contratti
                                await createContratto(dataToUpload)
                                await delay(1000)

                            //UPLOAD ALLEGATI
                            if( getNewUploadsData() !== undefined && getNewUploadsData() !== null ){
                                getNewUploadsData().map( async allegato => {
                                    let toUp={
                                        token: getUserData().Token,
                                        path:allegato,
                                        byContratto:getNewContractID(),
                                        owner:getUserData().Nome + ' ' + getUserData().Cognome
                                    }
                                    await uploadAllegato(toUp)
                                } )
                            }

                            //UPLOAD REFERENTI
                            if( getContractReferent()!== undefined && getContractReferent() !== null ){
                                getContractReferent().map( async referente => {
                                    let toUp={
                                        nome:referente[0].nome,
                                        cognome:referente[0].nome,
                                        posizione:referente[0].posizione,
                                        nTel:referente[1].num1,
                                        nTelS:referente[1].num2,
                                        email:referente[2].mail1,
                                        pec:referente[2].mail2,
                                        byContract:getNewContractID()
                                    }
                                    await createReferenteContratto(toUp)
                                } )
                            }
                            //UPLOAD Acquisizione
                            if( getNewContractAcquisizione() !== null && getNewContractAcquisizione() !== undefined ){
                                let toUpAC = getNewContractAcquisizione()
                                toUpAC.pTot = toUpAC.pTot.replace(/[ ,.]/g, "").substring(0, toUpAC.pTot.replace(/[ ,.]/g, "").length-2)
                                toUpAC.bAsta = toUpAC.bAsta.replace(/[ ,.]/g, "").substring(0, toUpAC.bAsta.replace(/[ ,.]/g, "").length-2)
                                toUpAC.cManodopera = toUpAC.cManodopera.replace(/[ ,.]/g, "").substring(0, toUpAC.cManodopera.replace(/[ ,.]/g, "").length-2)
                                toUpAC.vManodopera = toUpAC.vManodopera.replace(/[ ,.]/g, "").substring(0, toUpAC.vManodopera.replace(/[ ,.]/g, "").length-2)
                                toUpAC.cMateriale = toUpAC.cMateriale.replace(/[ ,.]/g, "").substring(0, toUpAC.cMateriale.replace(/[ ,.]/g, "").length-2)
                                toUpAC.vMateriale = toUpAC.vMateriale.replace(/[ ,.]/g, "").substring(0, toUpAC.vMateriale.replace(/[ ,.]/g, "").length-2)
                                toUpAC.cVari = toUpAC.cVari.replace(/[ ,.]/g, "").substring(0, toUpAC.cVari.replace(/[ ,.]/g, "").length-2)
                                toUpAC.vVari = toUpAC.vVari.replace(/[ ,.]/g, "").substring(0, toUpAC.vVari.replace(/[ ,.]/g, "").length-2)
                                
                                toUpAC.byContract = getNewContractID()
                                await createAcquisizione(toUpAC)
                            }
                            //Uploading activty list and linking to Contratti
                            if(getContractActivity() !== null && getContractActivity() !== undefined){
                                let activity = getContractActivity()
                                activity.map( async (item) => {
                                    let activityToUpload = {
                                        token : getUserData().Token,
                                        tipologia : item.tipologia,
                                        descrizione : item.descrizione,
                                        periodo : item.periodo,
                                        contrattoNum: dataContratto.numero
                                    }
                                    console.log(activityToUpload)
                                        await createActivity(activityToUpload.token,activityToUpload.tipologia,activityToUpload.periodo,activityToUpload.descrizione,activityToUpload.contrattoNum)
                                        
                                }) 
                            }
                            await delay(500)
                            history.push('/contratti/listaContratti')
                    } }
                    fullWidth={false}
                    className={classes.button}
                    style={{justifyContent:'flex-end'}}
                    endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                    >
                    Crea Contratto
                </Button>
             </Box>
        </Container>

        ) }
        

      </Container>
      
       
    </div>
    )
}
