import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from "@material-ui/core/styles"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Avatar, Box, Checkbox, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SecurityIcon from '@material-ui/icons/Security';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import webservice from '../../api/webservice';
import userData from '../data/userData';
import anagraficaData from '../data/anagraficaData';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    tabMainText:{
        color:'#535353',
        textAlign:'center',
        fontWeight:'bold'
    },
    tabSubText:{
        color:'#898989',
        textAlign:'center'
    },
    tabUnderText:{
        color:'#f8f8f8f',
        textAlign:'center'
    },
    stdRow:{
        borderBottomStyle:'solid',
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1,
        marginBottom:25,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        flexWrap:'wrap',
        paddingBottom:25
        
    },
    stdCol:{
        display:'flex',
        width:'30%',
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingTop:7,
        paddingBottom:7
    },
    avatar:{
        width:24,
        height:24,
        marginRight:10
    },
    rowAvatar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:7,
        paddingBottom:7
    },
    middleRow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:15
    },
    stdIcon:{
        fontSize:20,
        marginRight:10,
    },
    stdIconAsset:{
        height:24,
        marginRight:15
    },
    assetTab:{
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'row',
    },
    infoAssetContainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginLeft:40
    },
    singleAssetInfo:{
        marginRight:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    checkContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        width:'20%'
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
    reportBtn:{
        background:'#F8B13B !important',
        color:'white',
        fontWeight:'bold',
        letterSpacing:'.1em',
        width:'15vh',
        paddingTop:'.9vh',
        paddingBOttom:'.9vh',
        '&:hover':{
            background:'#F8B13B !important'
        }
    }
}))

export default function InfoIntervento({rep,flag,handleClose,target,cliente}) {

  const classes = useStyles();

  //ApiValues
  const { getAssetList,getFullProgrammaReq,getClientList,clientList,getInterventoList,GetClienteFromProgramma,GetAssetFromProgramma,updateProgramma, GetFullInterventoList } = webservice()
  const { getUserData, getCurrentPermission } = userData()
  const { getAssetListData,getInterventoListData,getAnagraficaData,getAssetFromProgrammaData,getClienteFromProgrammaData, setTargetPROGRAMMA } = anagraficaData()
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [cClient,setcClient] = React.useState()
  const [statusTicket,setStatusTicket] = React.useState({
      attivo:false,
      finito:false,
      lavorazione:false,
      cancellato:false,
      sospeso:false
  })

  async function handleStatusChange(event){
      let fin = {
        attivo:false,
        finito:false,
        lavorazione:false,
        cancellato:false,
        sospeso:false
        }
        fin[event.target.name] = event.target.checked
        setStatusTicket(fin)
        let toUp = {
            token:'dd',
            status:event.target.name,
            id:target.id
        }
        updateProgramma(toUp)
        await delay(500)
        await getFullProgrammaReq('dd')
        await delay(500)
        window.location.reload(false)
  }

  React.useEffect(() => {
    async function initialData(){
        await getClientList(getUserData().Token)
        await GetFullInterventoList('dd')
        //await getInterventoList( getUserData().Token,getAnagraficaData().id )
        //await getAssetList(getUserData().Token,getAnagraficaData().id)
        await delay(1000)
        console.log( "ASSET DA MOSTRARE", getAssetFromProgrammaData() )
        console.log( "CLIENTE DA MOSTRARE", getClienteFromProgrammaData() )
        
    }
    initialData()
    

}, [])
  return (
    <div>
      <Dialog
        open={flag}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Info Intervento</DialogTitle>
        <DialogContent>
            {/* INTERNAL FIRST BOX*/}
          <Box className={classes.stdRow}>

                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >ID</Typography>
                    <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold'}}>I.{target !==undefined && target!== null ? target.idIntervento : null}</Typography>
                </Box>
                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >Cliente</Typography>
                    <Typography variant={'subtitle2'} className={classes.tabUnderText} style={{display:'flex',margin:'0 auto'}}>Codice Cliente<Typography variant={'subtitle2'} className={classes.tabMainText} style={{fontWeight:'bold',color:'#8a8a8a', marginLeft:5}}>{ getClienteFromProgrammaData() !== undefined && getClienteFromProgrammaData() !== null && getClienteFromProgrammaData() !== null ? getClienteFromProgrammaData().id : null }</Typography></Typography>
                    <Typography variant={'subtitle1'} className={classes.tabUnderText} style={{color:'#535353',fontSize:'0.7vw',letterSpacing:'.1em'}}>{ getClienteFromProgrammaData() !== undefined && getClienteFromProgrammaData() !== null ? getClienteFromProgrammaData().rSociale : null }</Typography>
                </Box>
                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >User</Typography>
                    <Box className={classes.rowAvatar}>
                        <Avatar className={classes.avatar}>{cliente !== undefined ? cliente.Nome.charAt(0) : null}</Avatar>
                        <Typography variant={'overline'} className={classes.tabMainText}>{cliente !== undefined ? cliente.Nome + ' ' + cliente.Cognome : 'Non Specificato..'}</Typography>
                    </Box>
                </Box>

          </Box>
            {/* INTERNAL SECOND BOX*/}
          <Box className={classes.stdRow}>
                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >Dove</Typography>
                    <Box className={classes.middleRow}>
                        <LocationOnIcon className={classes.stdIcon} style={{color:'#00ADA2'}}/>
                        <Typography variant={'subtitle2'} className={classes.tabUnderText} style={{color:'#8a8a8a'}}>{ getClienteFromProgrammaData() !== undefined && getClienteFromProgrammaData() !== null ? getClienteFromProgrammaData().indirizzo + ', ' + getClienteFromProgrammaData().cap + ' ' + getClienteFromProgrammaData().localita : null }</Typography>
                    </Box>
                </Box>
                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >Tipologia</Typography>
                    <Box className={classes.middleRow}>
                        <SecurityIcon className={classes.stdIcon} style={{color:'darkblue'}}/>
                        <Typography className={classes.tabUnderText} variant={'subtitle2'} style={{color:'#8a8a8a',textTransform:'capitalize'}}>Ordinaria</Typography>
                    </Box>
                </Box>
                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >Fine Intervento</Typography>
                    <Box className={classes.middleRow}>
                        <AccessTimeIcon className={classes.stdIcon} style={{color:'darkyellow'}}/>
                        <Typography className={classes.tabUnderText} variant={'subtitle2'} style={{color:'#8a8a8a'}}>{target !== undefined ? target.dataFine : null}</Typography>
                    </Box>
                </Box>
          </Box>
            {/* INTERNAL THIRD BOX*/}
            <Box className={classes.stdRow} style={{justifyContent:'flex-start',paddingLeft:40}}>

<Box className={classes.stdCol} style={{width:'40%'}}>
  <Typography variant={'h6'} className={classes.tabMainText} style={{textAlign:'left'}}>Richiesta intervento per Asset</Typography>
  <Box className={classes.middleRow}>

      <Box>
          <Box className={classes.assetTab}>
              <img src={require('../../assets/images/anagraficaContratto/asset/nAsset.png')} className={classes.stdIconAsset} />
              <Typography variant={'h6'} className={classes.tabMainText} style={{color:'#898989'}}>{ getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().titolo : null }</Typography>
          </Box>
          <Typography variant={'subtitle1'} className={classes.tabUnderText} style={{color:'#898989'}} style={{textAlign:'left',marginLeft:40}}>{ getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().descrizione : null }</Typography>
          <Box className={classes.infoAssetContainer}>
              <Box className={classes.singleAssetInfo}>
                  <img src={require('../../assets/images/anagraficaContratto/asset/matricolaAsset.png')} className={classes.stdIconAsset} />
                  <Typography variant={'subtitle2'} className={classes.tabMainText}> { getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().matricola : null }</Typography>
              </Box>
              <Box className={classes.singleAssetInfo}>
                  <img src={require('../../assets/images/anagraficaContratto/asset/brandAsset.png')} className={classes.stdIconAsset} />
                  <Typography variant={'subtitle2'} className={classes.tabMainText}>{ getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().marca : null }</Typography>
              </Box>
              <Box className={classes.singleAssetInfo}>
                  <img src={require('../../assets/images/anagraficaContratto/asset/codiceAsset.png')} className={classes.stdIconAsset} />
                  <Typography variant={'subtitle2'} className={classes.tabMainText}>{ getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().codice : null }</Typography>
              </Box>
          </Box>
      </Box>

      <Box>
          
      </Box>

  </Box>
</Box>
<Box className={classes.stdCol}>
      <Typography variant={'overline'} className={classes.tabMainText} style={{color:'#8a8a8a'}}>EDIFICIO</Typography>
      <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold',marginBottom:10}}>{ getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().edificio : null }</Typography>
      <Typography variant={'overline'} className={classes.tabMainText} style={{color:'#8a8a8a'}}>PIANO</Typography>
      <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold',marginBottom:10}}>{ getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().piano : null }</Typography>
      <Typography variant={'overline'} className={classes.tabMainText} style={{color:'#8a8a8a'}}>STANZA/LOCALE</Typography>
      <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold',marginBottom:10}}>{ getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().stanza : null }</Typography>
      
      </Box>
      {getUserData().Tipologia !== 'Cliente' ? (<>
      <Box className={classes.stdCol} style={{width:'60%',flexDirection:'row',justifyContent:'center',margin:'0 auto'}}>
                    <Box className={classes.checkContainer}>
                        <Typography variant={'subtitle1'} style={{fontWeight:'bold',color:'#4083ff',textAlign:'center',marginLeft:'-27px'}}>Aperto</Typography>
                        <FormControlLabel
                            control={
                            <Checkbox
                            style={{margin:'0 auto'}}
                                checked={target.stato == 'attivo' ? true : statusTicket.attivo}
                                onChange={ handleStatusChange }
                                name="attivo"
                                color="primary"
                            />
                            }
                        />
                    </Box>
                    <Box className={classes.checkContainer}>
                        <Typography variant={'subtitle1'} style={{fontWeight:'bold',color:'darkorange',textAlign:'center',marginLeft:'-27px'}}>In Lavorazione</Typography>
                        <FormControlLabel
                            control={
                            <Checkbox
                            style={{margin:'0 auto'}}
                                checked={target.stato == 'lavorazione' ? true : statusTicket.lavorazione}
                                onChange={ handleStatusChange }
                                name="lavorazione"
                                color="primary"
                            />
                            }
                        />
                    </Box>
                    <Box className={classes.checkContainer}>
                        <Typography variant={'subtitle1'} style={{fontWeight:'bold',color:'lightblue',textAlign:'center',marginLeft:'-27px'}}>Finito</Typography>
                            <FormControlLabel
                                control={
                                <Checkbox
                                style={{margin:'0 auto'}}
                                    checked={target.stato == 'finito' ? true : statusTicket.finito}
                                    onChange={ handleStatusChange }
                                    name="finito"
                                    disabled={true}
                                    color="primary"
                                />
                                }
                            />
                    </Box>
                    <Box className={classes.checkContainer}>
                        <Typography variant={'subtitle1'} style={{fontWeight:'bold',color:'darkyellow',textAlign:'center',marginLeft:'-27px'}}>Sospeso</Typography>
                        <FormControlLabel
                            control={
                            <Checkbox
                            style={{margin:'0 auto'}}
                                checked={target.stato == 'sospeso' ? true : statusTicket.sospeso}
                                onChange={ handleStatusChange }
                                name="sospeso"
                                color="primary"
                            />
                            }
                        />
                    </Box>
                    <Box className={classes.checkContainer}>
                        <Typography variant={'subtitle1'} style={{fontWeight:'bold',color:'red',textAlign:'center',marginLeft:'-27px'}}>Cancellato</Typography>
                        <FormControlLabel
                            control={
                            <Checkbox
                            style={{margin:'0 auto'}}
                                checked={target.stato == 'cancellato' ? true : statusTicket.cancellato}
                                onChange={ handleStatusChange }
                                name="cancellato"
                                color="primary"
                            />
                            }
                        />
                    </Box>
          </Box>
</>) : null}
</Box>
{/* INTERNAL FOURTH BOX*/}        
          <Box style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:30,marginBottom:15}}>
          
                {getCurrentPermission() !== null && getCurrentPermission().reportTicket === true ?<Button variant="outlined" className={classes.reportBtn} style={{marginLeft:20,marginRight:20,color:'white',background:'#F8B13B',backgroundColor:'#F8B13B'}} onClick={ e => {
                    e.preventDefault()
                    handleClose()
                    setTargetPROGRAMMA(target)
                    rep(target)
                } }>Report</Button> : null}
                <Button variant="outlined" className={classes.saveBtn} style={{marginLeft:20,marginRight:20}} onClick={ e => {
                    e.preventDefault()
                    handleClose()
                } }>Chiudi</Button>
                
          </Box>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}


      