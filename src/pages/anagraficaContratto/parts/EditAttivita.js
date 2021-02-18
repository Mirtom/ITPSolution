import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Box, Button, Container, Divider, InputLabel, TextField, Typography } from "@material-ui/core"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Activity from '../../components/activity'
import contractData from '../../data/contractData';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
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
    topTab:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:30
    },
    defaultSelectBox:{
        width:'100%'
    },
    subTabName:{
      paddingLeft:15,
      color:'#535353',
      fontSize:20,
      fontWeight:'bold',
      letterSpacing:'0.05em',
      textTransform:'capitalize',
      textAlign:'left'
     },
     topButton:{
         background:'#18CCBC !important',
         color:'white',
         paddingLeft:25,
         paddingRight:25
     },
     mainTab:{
      paddingTop:50,
      display: "flex",
      justifyContent:'column',
      flexWrap: "wrap",
          "& > *": {
          margin: theme.spacing(1),
          height: theme.spacing(16)
          }
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
          paddingLeft:15
        }
      
  
  }))

  
function EditAttivita({contratto,status,handleClose}) {
  const history = useHistory();
  //Setting values in sessionStorage
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const { getActivityListData, setActivityListData, getTipoI,getAnagraficaData } = anagraficaData()
  const { getUserData } = userData()
  const { getActivityList, createActivity, deleteActivity, getTipologieIntervento, updateContractActivity,getTabTipoImpianti } = webservice()
  const [toRender,setToRender] = useState([])
  const { getTabImpianti } = contractData()

  //Modified
  const [removed,setRemoved] = useState([])
  const [added,setAdded] = useState([])

  //STATE Data Attivita
  const [data,setData] = useState({
      tipologia:null,
      descrizione:null,
      periodo:null,
      id: null
  })

  //ForceUpdate
  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer stateLISTA
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  //GENERAZIONE CODICE personale Attività
  function makeid() {
    var result = '';
    var characters  = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }
  console.log(toRender)

  //Error manage
  const [error,setError] = useState(0)

  //Function to change state data
  function handleChange(e,target){
      let value = e.target.value
      setData(prevState => ({
          ...prevState,
          [target]:value
      }))
  }
  //Reintegrating values if already compiled
  const [CType,setCType] = React.useState([])
  useEffect(() => {
    getTipologieIntervento('dd')
        getTipologieIntervento('dd')
        getTabTipoImpianti('dd')
        getActivityList(getUserData().Token,contratto.id)
        setToRender(getActivityListData())
        if(getTabImpianti() !== undefined && getTabImpianti() !== null){
          var typDe = getAnagraficaData().tipologia
            if(typDe.split(',').length > 1){
                typDe = typDe.split(',')[0]
            }

            let fin = []
            let tt = getTabImpianti().filter(t => t.Descr == typDe)[0]
            if(tt !== undefined){
                getTipoI().map( type => {
                    if(type.bytipologia == tt.id){
                        fin.push(type)
                    }
                    setCType(fin)
                } )
            }
        }
        
  }, [])
  //Deleting values
  function removeActivity(code){
    let dataFresh = toRender.filter( item => item.id !== code )
    let tmp = removed
    tmp.push(toRender.filter( item => item.id === code )[0])
    setRemoved(tmp)
    console.log(removed)

    setToRender( dataFresh )
}

  const classes = useStyles();


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
            <Typography className={classes.tabName}>LISTA ATTIVITA'</Typography>
            {error === 1 ? <Typography className={classes.errorBasic}>* Compila tutti i campi</Typography> : null}
            <Box className={classes.topTab}>
                <Typography className={classes.subTabName}>Nuova Attività</Typography>
                <Box style={{width:'15%'}}>
                    <InputLabel htmlFor="selectTipologia">* Tipologia Impianto</InputLabel>
                    <Select
                        className={classes.defaultSelectBox}
                        labelId="selectTipologia"
                        id="selectTipologia"
                        value={data.tipologia}
                        onChange={(e) => handleChange(e,'tipologia')}
                        >
                        {CType.map(type => {
                                        return (
                                            <MenuItem value={type.Nome}>{type.Nome}</MenuItem>
                                        )
                                    })}
                    </Select>
                </Box>
                <Box style={{width:'30%'}}>
                    <TextField
                        id="outline-multiline-static"
                        label="Descrizione dell'attività"
                        multiline
                        className={classes.defaultSelectBox}
                        rowsMax={8}
                        height={64}
                        rows={1}
                        value={data.descrizione}
                        placeholder="Inserisci la descrizione compelta dell'attività da svolgere"
                        onChange={e => handleChange(e,'descrizione')}
                    />
                </Box>
                <Box style={{width:'15%'}}>
                    <InputLabel htmlFor="selectTipologia">* Periodo temporale</InputLabel>
                    <Select
                        className={classes.defaultSelectBox}
                        labelId="selectTipologia"
                        id="selectTipologia"
                        value={data.periodo}
                        onChange={(e) => handleChange(e,'periodo')}
                        >
                        <MenuItem value={'Settimanale'}>Settimanale</MenuItem>
                        <MenuItem value={'Mensile'}>Mensile</MenuItem>
                        <MenuItem value={'Bimestrale'}>Bimestrale</MenuItem>
                        <MenuItem value={'Trimestrale'}>Trimestrale</MenuItem>
                        <MenuItem value={'Quadrimestrale'}>Quadrimestrale</MenuItem>
                        <MenuItem value={'Semestrale'}>Semestrale</MenuItem>
                        <MenuItem value={'Annuale'}>Annuale</MenuItem>
                    </Select>
                </Box>
                <Button 
                    variant="contained" 
                    className={classes.topButton}
                    onClick={ () => {
                        if(data.tipologia && data.periodo && data.descrizione ){
                            let toUpdate = data
                            toUpdate.id = makeid()
                            let tmp = toRender !== null ? toRender : []
                            tmp.push(data)
                            setToRender(tmp)

                            let tmpA = added
                            tmpA.push(data)
                            setAdded(tmpA)
                            console.log(added)

                            setData({
                              tipologia:null,
                              descrizione:'',
                              periodo:null,
                              id: null
                          })

                            setError(0);
                            forceUpdate()
                        }else{
                            setError(1);
                        }
                    } }
                >
                    <span style={{textTransform:'capitalize'}}>Aggiungi</span>
                </Button>
            </Box>
            <Divider></Divider>
            <Box className={classes.mainTab}>
                {toRender != {} && toRender !== null ?
                    toRender.map( (item, index) => {
                        return <Activity data={item} index={index} toDelete={(e) => removeActivity(e)} tipo={CType} updateAct={ e => {
                            let toUp = toRender.filter( cc => cc.id !== e.id )
                            toUp.push(e)
                            setToRender(toUp)
                        } }/>
                    } ) : null
                }
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

                      <Button
                       variant="contained"
                       color="primary"
                       fullWidth={false}
                       onClick={ async () => {
                          if(added.length > 0 ){
                            added.map( async item => {
                              let current = item
                              item.numContratto = contratto.numero
                              await createActivity(getUserData().Token,current.tipologia,current.periodo,current.descrizione,current.numContratto)
                            } )
                          }
                          if(removed.length > 0 && removed !== null && removed !== undefined){
                            removed.map( async item => {
                              let current = {
                                token:getUserData().Token,
                                id:item.id
                              }
                              await deleteActivity(current)
                            } )}
                            await delay(500)
                            setActivityListData( toRender )
                            await getActivityList(getUserData().Token,contratto.id)
                            await delay(500)
                          handleClose()
                          //window.location.reload(false)
                         }
                       } 
                       className={classes.button}
                       style={{justifyContent:'flex-start'}}                      
                       endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                       >
                       Modifica
                      </Button>
                  </Box>
            </DialogActions>
        </Dialog>

  )
}

export default EditAttivita
