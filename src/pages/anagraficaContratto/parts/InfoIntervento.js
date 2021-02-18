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
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import anagraficaData from '../../data/anagraficaData';
import contractData from '../../data/contractData';

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
    deleteBtn:{
        background:'#ff727a !important',
        border:'2px solid #ef636b',
        color:'white',
        fontWeight:'bold',
        letterSpacing:'.1em',
        width:'15vh',
        paddingTop:'.9vh',
        paddingBOttom:'.9vh',
        '&:hover':{
            background:'#ff9197 !important'
        }
    },
    asset:{
        borderColor:'#a2d0fb',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:10,
        padding:5,
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    assetIMG:{
        height:'1.2vw',
    },
    assetCODE:{
        textTransform:'uppercase',
        color:'#71A8DB',
        fontWeight:'bold',
        fontSize:'0.7vw'
    },
    assetDESC:{
        color:'#898989',
        width:'60%',
        fontSize:'0.6vw'
    },
}))

export default function InfoIntervento({type,flag,handleClose,target,cliente}) {

  const classes = useStyles();

  //ApiValues
  const { getContractList,getClientList,clientList,getActivityList, removeProgramma } = webservice()
  const { getUserData } = userData()
  const { getContractListData } = contractData()
  const { getAssetListData,getInterventoListData,getAnagraficaData,getAssetFromProgrammaData,getClienteFromProgrammaData, getSingleData, getActivityListData } = anagraficaData()
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [cClient,setcClient] = React.useState()

  React.useEffect(() => {
    async function initialData(){
        await getClientList(getUserData().Token)
        //await getInterventoList( getUserData().Token,getAnagraficaData().id )
        //await getAssetList(getUserData().Token,getAnagraficaData().id)
        await delay(1000)
        console.log( "ASSET DA MOSTRARE", getAssetFromProgrammaData() )
        console.log( "CLIENTE DA MOSTRARE", getClienteFromProgrammaData() )
    }
    initialData()
    

}, [])
const [currentAct,setCurrentAct] = React.useState([])
const [currentContr,setCurrentContr] = React.useState([])

function printName(num){
    switch(num){
        case '01':
            return 'Gennaio';
        case '02':
            return 'Febbraio';
        case '03':
            return 'Marzo';
        case '04':
            return 'Aprile';
        case '05':
            return 'Maggio';
        case '06':
            return 'Giugno';
        case '07':
            return 'Luglio';
        case '08':
            return 'Agosto';
        case '09':
            return 'Settembre';
        case '10':
            return 'Ottobre';
        case '11':
            return 'Novembre';
        case '12':
            return 'Dicembre';
    }
}

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
                    <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold'}}>I.{target !==undefined && target!== null ? target.id : null}</Typography>
                </Box>
                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >Cliente</Typography>
                    <Typography variant={'subtitle2'} className={classes.tabUnderText} style={{display:'flex',margin:'0 auto'}}>Codice Cliente<Typography variant={'subtitle2'} className={classes.tabMainText} style={{fontWeight:'bold',color:'#8a8a8a', marginLeft:5}}>{ getClienteFromProgrammaData() !== undefined && getClienteFromProgrammaData() !== null && getClienteFromProgrammaData() !== null ? getClienteFromProgrammaData().id : null }</Typography></Typography>
                    <Typography variant={'subtitle1'} className={classes.tabUnderText} style={{color:'#535353',fontSize:'0.7vw',letterSpacing:'.1em'}}>{ getClienteFromProgrammaData() !== undefined && getClienteFromProgrammaData() !== null ? getClienteFromProgrammaData().rSociale : null }</Typography>
                </Box>
                {console.log( target )}
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
                        <Typography variant={'subtitle2'} className={classes.tabUnderText} style={{color:'#8a8a8a'}}>{ target !== undefined && getContractListData() !== undefined && getContractListData() !== null && getContractListData().filter( cc => cc.id == target.byContratto )[0] !== undefined ? (
            getContractListData().filter( cc => cc.id == target.byContratto )[0].indirizzo + ', ' + getContractListData().filter( cc => cc.id == target.byContratto )[0].cap + ' ' + getContractListData().filter( cc => cc.id == target.byContratto )[0].localita
        ): null}</Typography>
                    </Box>
                </Box>
                <Box className={classes.stdCol}>
                    <Typography variant={'h6'} className={classes.tabMainText} >Tipologia</Typography>
                    <Box className={classes.middleRow}>
                        <SecurityIcon className={classes.stdIcon} style={{color:'darkblue'}}/>
                        <Typography className={classes.tabUnderText} variant={'subtitle2'} style={{color:'#8a8a8a',textTransform:'capitalize'}}>{target.tipologia}</Typography>
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
          {console.log(target)}
          {target !== undefined ? target.tipologia !== 'manutenzione' ? (<>
            <Box className={classes.stdRow} style={{justifyContent:'flex-start',paddingLeft:40}}>

            <Box className={classes.stdCol} style={{width:'40%'}}>
            <Typography variant={'h6'} className={classes.tabMainText} style={{textAlign:'left'}}>Richiesta intervento per Asset</Typography>
            <Box className={classes.middleRow}>

                <Box>
                    <Box className={classes.assetTab}>
                        <img src={require('../../../assets/images/anagraficaContratto/asset/nAsset.png')} className={classes.stdIconAsset} />
                        <Typography variant={'h6'} className={classes.tabMainText} style={{color:'#898989'}}>{ type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().titolo : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().titolo : null }</Typography>
                    </Box>
                    <Typography variant={'subtitle1'} className={classes.tabUnderText} style={{color:'#898989'}} style={{textAlign:'left',marginLeft:40}}>{ type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().descrizione : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().descrizione : null }</Typography>
                    <Box className={classes.infoAssetContainer}>
                        <Box className={classes.singleAssetInfo}>
                            <img src={require('../../../assets/images/anagraficaContratto/asset/matricolaAsset.png')} className={classes.stdIconAsset} />
                            <Typography variant={'subtitle2'} className={classes.tabMainText}> { type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().matricola : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().matricola : null }</Typography>
                        </Box>
                        <Box className={classes.singleAssetInfo}>
                            <img src={require('../../../assets/images/anagraficaContratto/asset/brandAsset.png')} className={classes.stdIconAsset} />
                            <Typography variant={'subtitle2'} className={classes.tabMainText}>{ type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().marca : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().marca : null }</Typography>
                        </Box>
                        <Box className={classes.singleAssetInfo}>
                            <img src={require('../../../assets/images/anagraficaContratto/asset/codiceAsset.png')} className={classes.stdIconAsset} />
                            <Typography variant={'subtitle2'} className={classes.tabMainText}>{ type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().codice : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().codice : null }</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box>
                    
                </Box>

            </Box>
            </Box>
            <Box className={classes.stdCol}>
                <Typography variant={'overline'} className={classes.tabMainText} style={{color:'#8a8a8a'}}>EDIFICIO</Typography>
                <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold',marginBottom:10}}>{ type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().edificio : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().edificio : null }</Typography>
                <Typography variant={'overline'} className={classes.tabMainText} style={{color:'#8a8a8a'}}>PIANO</Typography>
                <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold',marginBottom:10}}>{ type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().piano : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().piano : null }</Typography>
                <Typography variant={'overline'} className={classes.tabMainText} style={{color:'#8a8a8a'}}>STANZA/LOCALE</Typography>
                <Typography variant={'subtitle2'} className={classes.tabSubText} style={{color:'#00ADA2',fontWeight:'bold',marginBottom:10}}>{ type= 'cc' ? getSingleData() !== undefined && getSingleData() !== null ? getSingleData().stanza : null : getAssetFromProgrammaData() !== undefined && getAssetFromProgrammaData() !== null ? getAssetFromProgrammaData().stanza : null }</Typography>
                
                </Box>
                </Box></>): (
                    <>
                    <Box className={classes.stdRow} >

                        <Box className={classes.stdCol} style={{width:'60%'}}>

                            <Typography variant={'h6'} className={classes.tabMainText} >Attività</Typography>
                            <Box className={classes.middleRow} style={{flexDirection:'column'}}>
                                    <Box className={classes.asset} style={{borderColor:'#e8e8e8'}}>
                                        <img className={classes.assetIMG} src={require('../../../assets/images/anagraficaContratto/manutenzione/icon.png')} />
                                        <Typography variant={'h6'} className={classes.assetCODE}>{target !== null ? printName(target.dataInizio.split('-')[1]) + ' ' + target.dataInizio.split('-')[0] : null}</Typography>
                                        <Typography variant={'caption'} className={classes.assetDESC}>{target !== null ? target.descrizione.slice(0,90) + '...' : null}</Typography>
                                        
                                    </Box>
                            </Box>

                        </Box>

                    </Box>
                    </>
                ) : null}

{/* INTERNAL FOURTH BOX*/}        
          <Box style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginTop:30,marginBottom:15}}>
          <Button variant="outlined" className={classes.deleteBtn} style={{marginLeft:20,marginRight:20}} onClick={ e => {
                    e.preventDefault()
                    async function remover(){
                        let toRem = {
                            token:getUserData().Token,
                            id:target.id
                        }
                        await removeProgramma(toRem)
                        window.location.reload(false)
                    }
                    remover()
                } }>Elimina</Button>
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