import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Box, Container, Divider, Input, InputAdornment, Paper, Typography } from "@material-ui/core"
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
//Contract Data File
import contractData from '../../data/contractData';
import Referent from '../../components/referent';
import { useHistory } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import MenuIcon from '@material-ui/icons/Menu';
import userData from '../../data/userData';
import webservice from '../../../api/webservice';
import anagraficaData from '../../data/anagraficaData';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles((theme) => ({
    Header:{
        backgroundColor: "#00ADA2",
        height: 50,
        paddingTop:12
      },
    listaTable:{
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
      subTabName:{
        paddingLeft:15,
        color:'#535353',
        fontSize:18,
        fontWeight:'bold',
        letterSpacing:'0.05em',
        textTransform:'capitalize',
        textAlign:'left'
       },
       mainBox:{
           paddingTop:30,
           display:'flex',
           justifyContent:'space-between'
       },
       midBox:{
        width:'25%'
       },
       rightBox:{
        width:'25%'
       },
       mainRow:{
        padding:'30px 20px',
        paddingLeft:0,
        height:'20%'
       },
       normalInput:{
        border:'1px solid #F3F3F3',
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        fontSize:20,
        paddingLeft:15,
        borderRadius:7
       },
       styledInput:{
        fontSize:20,
        width:'100%',
        borderRadius:7,
        border:'1px solid #F3F3F3',
       },
       euroLogo:{
        backgroundColor:'#F3F3F3',
        borderRight:'1px solid #eaeaea',
        padding:15,
        paddingTop:25,
        paddingBottom:25,
        color:'black'
    },
    subSpecialName:{
        color:'#30BCB1',
        fontSize:16,
        paddingLeft:15,
        fontWeight:'bold',
        letterSpacing:'.05em',
        cursor:'pointer'
    },
    button:{
        backgroundColor:'#00ADA2',
        textDecoration:'capitalize',
        width:'15%'
      },
      buttonBack:{
          width:'15%',
          background:'transparent',
          color:'black',
          '&:hover': {
            backgroundColor: '#f1e9e9 !important',
        }
      },
      errorBasic: {
        color:'red',
        paddingLeft:30
      },
}))

export default({dataC,handleClose,status}) => {
    function useForceUpdate() {
        let [value, setState] = useState(true);
        return () => setState(!value);
      }
      //F update
      let forceUpdate =  useForceUpdate()
      const { setDrawer } = userData()
    const history = useHistory()
    const { GetReferenteContratto, createReferenteContratto } = webservice()
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const { getReferenteContrattoData, getAnagraficaData } = anagraficaData()
    //contractData
    const { setContractReferent, getContractReferent, updateContractReferent } = contractData()
    //main referent data
    const [data,setData] = useState()
    //torender
    const [toRenderData,setToRenderData] = useState([])
    //Generate random code
    function makeid() {
        var result = '';
        var characters  = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 5; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
        }
    //topData 
    const [topData,setTopData] = useState({
        nome:null,
        posizione:null,
    })
    
    //numData 
    const [numData,setNumData] = useState({
        num1:null,
        num2:null
    })
    //maildata 
    const [mailData,setMailData] = useState({
        mail1:null,
        mail2:null
    })
    //error data
    const [error,setError] = useState(0)
    //resetting values
    function resetValues(target){
        switch(target){
            case 'top':
                return {
                    nome:null,
                    posizione:null,
                }
            case 'num':
                return {
                    num1:null,
                    num2:null
                }
            case 'mail':
                return {
                    mail1:null,
                    mail2:null
                }
        }
    }
    //Funzione aggiornamento dati
    function eventHandler(e,target,direction){
        let value = e.target.value
        if(value == ''){
            value = null
        }
        switch(direction){
            case 'top':
                setTopData(prevState => ({
                    ...prevState,
                    [target]:value
                }))
                break;
            case 'num':
                setNumData(prevState => ({
                    ...prevState,
                    [target]:value
                }))
                break;
            case 'mail':
                setMailData(prevState => ({
                    ...prevState,
                    [target]:value
                }))
                break;
        }
    }
    //Funzione aggiunta referente
    async function clickHandler(){
        if(topData.nome != null && topData.posizione != null){
            if(numData.num1 != null || numData.num2 != null){
                if(mailData.mail1 != null || mailData.mail2 != null){
                    let code = makeid()
                    let topDataUp = {nome:topData.nome,posizione:topData.posizione,code}
                    setError(0)
                    let total = []
                    total.push(topDataUp)
                    let tmpp = toRenderData
                    tmpp.push(topDataUp)
                    setToRenderData(tmpp)

                    let toUp = {
                        token:'dd',
                        nome:topData.nome,
                        cognome:topData.nome,
                        posizione:topData.posizione,
                        nTel:numData.num1,
                        nTelS:numData.num2,
                        email:mailData.mail1,
                        pec:mailData.mail2,
                        byContract:getAnagraficaData().id
                    }
                    await createReferenteContratto(toUp)

                    setTopData({nome:null,posizione:null})
                    setNumData({num1:null,num2:null})
                    setMailData({mail1:null,mail2:null})


                    forceUpdate()
                }else{
                    setError(3)
                }
            }else{
                setError(2)
            }
        }else{
            setError(1)
        }
    }
    //Deleting values
    function removeActivity(code){
        let dataFresh = toRenderData.filter( item => item[0].code !== code)
        updateContractReferent(dataFresh)
        console.log(getContractReferent())
        setToRenderData(getContractReferent())
    }
    const classes = useStyles();

    useEffect(() => {
        async function initialData(){
            await GetReferenteContratto('dd',getAnagraficaData().id)
            await delay(1000)
            setToRenderData( getReferenteContrattoData() )
            await delay(500)
        }
        initialData()
    }, [])
    return (
        <Dialog
        open={status}
        TransitionComponent={Transition}
        keepMounted
        fullScreen={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
    <DialogContent>
    <Container maxWidth="False" className={classes.listaTable}>
                    <Typography className={classes.tabName}>LISTA REFERENTI</Typography>

                    <Box className={classes.mainBox}>
                        <Box className={classes.leftBox}>
                            <Box className={classes.mainRow}>
                                <Typography className={classes.subTabName}>* Nome e Cognome - Posizione</Typography>
                                {error === 1 ? <Typography className={classes.errorBasic} >Compila tutti i campi richiesti</Typography> : null}
                            </Box>
                            <Box className={classes.mainRow}>
                                <Typography className={classes.subTabName}>* Comunicazione</Typography>
                                {error === 2 || error === 3 ? <Typography className={classes.errorBasic} >Compila tutti i campi richiesti</Typography> : null}
                            </Box>
                            <Box className={classes.mainRow}>
                                <Typography onClick={e => clickHandler()}className={classes.subSpecialName}>+ Aggiungi nuovo Referente</Typography>
                            </Box>
                        </Box>
                        <Box className={classes.midBox}>
                            <Box className={classes.mainRow}>
                            <Input
                                className={classes.normalInput}
                                disableUnderline={true}
                                value={topData.nome === null ? '' : topData.nome}
                                onChange={(e) => eventHandler(e,'nome','top')}
                                placeholder="Inserisci il nome e il cognome"
                                id="input-with-icon-adornment"
                            />
                            </Box>
                            <Box className={classes.mainRow}>
                            <Input
                                className={classes.styledInput}
                                disableUnderline={true}
                                type='number'
                                placeholder="Inserisci il numero di telefono"
                                id="input-with-icon-adornment"
                                value={numData.num1 === null ? '' : numData.num1}
                                onChange={(e) => eventHandler(e,'num1','num')}
                                startAdornment={
                                    <InputAdornment className={classes.euroLogo}position="start">
                                        <PhoneIcon className={classes.euro}></PhoneIcon>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="email">* Inserisci il telefono #1</FormHelperText>
                            </Box>
                            <Box className={classes.mainRow}>
                            <Input
                                className={classes.styledInput}
                                disableUnderline={true}
                                placeholder="Inserisci l'email"
                                id="input-with-icon-adornment"
                                value={mailData.mail1 === null ? '' : mailData.mail1}
                                onChange={(e) => eventHandler(e,'mail1','mail')}
                                startAdornment={
                                    <InputAdornment className={classes.euroLogo}position="start">
                                        <MailOutlineIcon className={classes.euro}></MailOutlineIcon>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="email">* Inserisci l'email #1</FormHelperText>
                            </Box>
                        </Box>
                        <Box className={classes.rightBox}>
                            <Box className={classes.mainRow}>
                                <Input
                                    className={classes.normalInput}
                                    disableUnderline={true}
                                    value={topData.posizione === null ? '' : topData.posizione}
                                    onChange={(e) => eventHandler(e,'posizione','top')}
                                    placeholder="Inserisci la posizione"
                                    id="input-with-icon-adornment"
                                />
                            </Box>
                            <Box className={classes.mainRow}>
                            <Input
                                className={classes.styledInput}
                                disableUnderline={true}
                                placeholder="Inserisci il numero di telefono"
                                id="input-with-icon-adornment"
                                type='number'
                                value={numData.num2  === null ? '' : numData.num2}
                                onChange={(e) => eventHandler(e,'num2','num')}
                                startAdornment={
                                    <InputAdornment className={classes.euroLogo}position="start">
                                        <PhoneIcon className={classes.euro}></PhoneIcon>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="email">Inserisci il telefono #2</FormHelperText>
                            </Box>
                            <Box className={classes.mainRow}>
                            <Input
                                className={classes.styledInput}
                                disableUnderline={true}
                                placeholder="Inserisci la PEC"
                                id="email"
                                value={mailData.mail2 === null ? '' : mailData.mail2}
                                onChange={(e) => eventHandler(e,'mail2','mail')}
                                startAdornment={
                                    <InputAdornment className={classes.euroLogo}position="start">
                                        <MailOutlineIcon className={classes.euro}></MailOutlineIcon>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="email">Inserisci la PEC </FormHelperText>
                            </Box>
                        </Box>
                    </Box>
                    <Divider style={{marginTop:30,marginBottom:30}}></Divider>
                    <Box className={classes.referentContainer} style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
                        {toRenderData !== null && toRenderData !== undefined ? (
                            toRenderData.map( item => {
                                console.log(item)
                                return <Referent data={item} toDelete={e => removeActivity(e)} type={'dash'}></Referent>
                            })
                        ) : null}          
                    </Box>
                </Container>
              
    </DialogContent>
    <DialogActions>
                  <Box style={{display:'flex',width:'100%',justifyContent:'space-between',paddingLeft:50,paddingRight:50}}>
                    <Button
                       variant="contained"
                       color="primary"
                       fullWidth={false}
                       onClick={ () => {
                         handleClose()
                       } }
                       className={classes.button}
                       startIcon={<ArrowBackIcon></ArrowBackIcon>}                       
                       >
                       Chiudi
                      </Button>

                      
                  </Box>
            </DialogActions>
    </Dialog>          
  )
}