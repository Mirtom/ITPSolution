import { Box, Button, DialogActions, DialogContent, DialogTitle, ListItem, ListItemText, Menu, MenuItem, Snackbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles, createMuiTheme, ThemeProvider, responsiveFontSizes  } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SingleAssetTabs from './SingleAssetTabs';
import RichiestaIntervento from './RichiestaIntervento';
import { Alert } from '@material-ui/lab';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    assetMainImage:{
        height:40,
        marginRight:15,
    },
    rowIMG:{
        width:22,
        marginRight:15
    },
    mainAsset:{
        paddingLeft:'1%',
        paddingRight:'1%',
        width:'20%',
        backgroundColor:'white',
        marginBottom:30
    },
    mainAssetTABLE:{
        paddingLeft:'1%',
        paddingRight:'1%',
        width:'95%',
        backgroundColor:'white',
        margin:'0 auto 30px',
        display:'flex',
        paddingTop:15,
        paddingBottom:15
    },
    topAsset:{
        alignItems:'center',
        borderBottomStyle:'dashed',
        borderBottomWidth:2,
        borderColor:'#eaeaea',
        display:'flex',
        paddingBottom:15,
        paddingTop:5
    },
    topAssetTABLE:{
        alignItems:'center',
        display:'flex',
    },
    topText:{
        color:'#535353'
    },
    bottomAsset:{
        display:'flex',
        paddingTop:15,
        paddingBottom:15
    },
    bottomAssetTABLE:{
        display:'flex',
        paddingTop:15,
        paddingBottom:15,
        width:'80%',
        alignItems:'center',
        justifyContent:'space-between',
        margin:'0 auto'
    },
    bottomText:{
        color:'#B5B5B5'
    },
    bottomLeft:{
        width:'49.5%',
        borderRightStyle:'dashed',
        borderRightWidth:2,
        borderColor:'#eaeaea',
    },
    bottomLeftTABLE:{
        display:'flex',
        width:'50%',
        justifyContent:'space-around'
    },
    bottomRight:{
        width:'49.5%',
        paddingLeft:'5%',
        margin:'auto 0px',
        textAlign:'center'
    },
    bottomRightTABLE:{
        display:'flex',
        width:'50%',
        justifyContent:'space-around'
    },
    bottomRow:{
        height:'25%',
        marginBottom:15,
        alignItems:'center',
        display:'flex',
    },
    bottomRowTABLE:{
        height:'25%',
        alignItems:'center',
        display:'flex',
    },
    bottomRowText:{
        color:'#898989'
    },
    buttonGroupedAsset:{
        borderColor:'#8a8a8a',
        borderRadius:25,
        border:'2px solid #D24F6F',
        borderColor:'#D24F6F',
        width:'auto',
        margin:'auto 0px',
        color:'darkorange',
        fontWeight:'bold',
        fontSize:12,
        '&:hover': {
          borderColor:'#ff5982',
          backgroundColor: 'transparent !important',
        }
      },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
      topAssetText:{
          cursor:'pointer'
      }

}))

const Asset = ({visual,type,data,idContratto,groupPressed}) => {
    const classes = useStyles();
    
    //MODAL BOX Group ASSET
    const [open, setOpen] = React.useState(false);
    const handleClickOpenSAsset = () => {
        setOpen(true);
    };
    const handleCloseSAsset = () => {
        setOpen(false);
    };
    const history = useHistory();

     //MODAL BOX SINGLE ASSET
     const [openG, setGOpen] = React.useState(false);
     const handleClickOpenGAsset = () => {
         setGOpen(true);
     };
     const handleCloseGAsset = () => {
         setGOpen(false);
     };

     //Call RichiestaIntervento MODAL BOX
     const [flag,setFlag] = useState(false)
     const [openRichiesta, setOpenRichiesta] = React.useState(false);
     const [typeAction,setTypeAction] = useState('')

    return (
        <>

        {/* RICHIESTA INTERVENTO INITIAL CALL*/}
        <RichiestaIntervento flag={flag} handleClose={e=> setFlag(!flag)} type={typeAction} data={data} richiesta={e => setOpenRichiesta(true)} handleReload={e=> window.location.reload(false)} />

        {visual === 'box' ? 
            type === 1 ? (
                <Box className={classes.mainAsset}>
                    <Box className={classes.topAsset}>
                        <img className={classes.assetMainImage} src={require('../../../assets/images/anagraficaContratto/asset/nAsset.png')} />
                        <Box className={classes.topAssetText} onClick={e => handleClickOpenGAsset()}>
                            <Typography className={classes.topText}variant="h6">{data.titolo +' '+ data.codice}</Typography>
                            <Typography className={classes.bottomText}variant="subtitle2">{data.descrizione.split(0,47) + '...'}</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.bottomAsset}>
                        <Box className={classes.bottomLeft}>
                            <Box className={classes.bottomRow} style={{cursor:'pointer'}}onClick={e=> {
                                setTypeAction('single')
                                setFlag(!flag)
                                }}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/rIntervento.png')} />
                                <Typography className={classes.bottomRowText} variant='subtitle'>Richiedi un intervento</Typography>
                            </Box>
                            <Box className={classes.bottomRow}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/interventoAsset.png')} />
                                <Typography className={classes.bottomRowText} variant='subtitle'>Intervento Ordinario <span style={{fontSize:12,fontWeight:'bold'}}>24/05/2018</span></Typography>
                            </Box>
                            <Box className={classes.bottomRow}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/anagraficaAsset.png')} />
                                <Typography className={classes.bottomRowText} variant='subtitle'>{data.otherInfo !== '' ? data.otherInfo : 'Non definito'}</Typography>
                            </Box>
                        </Box>
                        <Box className={classes.bottomRight}>
                            <Box className={classes.bottomRow}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/matricolaAsset.png')} />
                                <Typography className={classes.bottomRowText} style={{fontWeight:'bold',textTransform:'uppercase'}} variant='subtitle'>{data.matricola}</Typography>
                            </Box>
                            <Box className={classes.bottomRow}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/brandAsset.png')} />
                                <Typography className={classes.bottomRowText} style={{fontWeight:'bold',textTransform:'uppercase'}} variant='subtitle'>{data.marca}</Typography>
                            </Box>
                            <Box className={classes.bottomRow}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/codiceAsset.png')} />
                                <Typography className={classes.bottomRowText} style={{fontWeight:'bold',textTransform:'uppercase'}} variant='subtitle'>{data.codice}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : <Box className={classes.mainAsset}>
                    <Box className={classes.topAsset}>
                        <img className={classes.assetMainImage} src={require('../../../assets/images/anagraficaContratto/asset/nAsset.png')} />
                        <Box className={classes.topAssetText}>
                            <Typography className={classes.topText}variant="h6">{data.titolo}[N]</Typography>
                            <Typography className={classes.bottomText}variant="subtitle2">{data.descrizione.split(0,47) + '...'}</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.bottomAsset}>
                        <Box className={classes.bottomLeft}>
                            <Box className={classes.bottomRow} style={{cursor:'pointer'}} onClick={e=> {
                                setTypeAction('group')
                                setFlag(!flag)
                                }}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/rIntervento.png')} />
                                <Typography className={classes.bottomRowText} variant='subtitle'>Richiedi un intervento</Typography>
                            </Box>
                            <Box className={classes.bottomRow}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/interventoAsset.png')} />
                                <Typography className={classes.bottomRowText} variant='subtitle'>Intervento Ordinario <span style={{fontSize:12,fontWeight:'bold'}}>24/05/2018</span></Typography>
                            </Box>
                            <Box className={classes.bottomRow}>
                                <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/anagraficaAsset.png')} />
                                <Typography className={classes.bottomRowText} variant='subtitle'>Vari</Typography>
                            </Box>
                        </Box>
                        <Box className={classes.bottomRight}>
                            <Box style={{textAlign:'center',display:'flex',justifyContent:'center',flexDirection:'column'}}>
                                <Button className={classes.buttonGroupedAsset} onClick={e => {
                                    groupPressed()
                                }}>
                                Entra nel gruppo
                                </Button>
                            </Box>
                            <Typography variant={'caption'} style={{color:'#8a8a8a',textAlign:'center'}}>Totali Asset <span style={{color:'#333',fontWeight:'bold'}}>{data.nAsset}</span></Typography>
                        </Box>
                    </Box>
                </Box>

    :  type === 1 ? (
        <Box className={classes.mainAssetTABLE}>
            <Box className={classes.topAssetTABLE}>
                <img className={classes.assetMainImage} src={require('../../../assets/images/anagraficaContratto/asset/nAsset.png')} />
                <Box className={classes.topAssetText} onClick={e => handleClickOpenGAsset()}>
                    <Typography className={classes.topText}variant="h6">{data.titolo +' '+ data.codice}</Typography>
                    <Typography className={classes.bottomText}variant="subtitle2">{data.descrizione.split(0,47) + '...'}</Typography>
                </Box>
            </Box>
            <Box className={classes.bottomAssetTABLE}>
                <Box className={classes.bottomLeftTABLE}>
                    <Box className={classes.bottomRowTABLE}>
                        <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/anagraficaAsset.png')} />
                        <Typography className={classes.bottomRowText} variant='subtitle'>{data.otherInfo !== '' ? data.otherInfo : 'Non definito'}</Typography>
                    </Box>
                    <Box className={classes.bottomRowTABLE}>
                        <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/rIntervento.png')} />
                        <Typography className={classes.bottomRowText} variant='subtitle'>Richiedi un intervento</Typography>
                    </Box>
                    <Box className={classes.bottomRowTABLE}>
                        <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/interventoAsset.png')} />
                        <Typography className={classes.bottomRowText} variant='subtitle'>Intervento Ordinario <span style={{fontSize:12,fontWeight:'bold'}}>24/05/2018</span></Typography>
                    </Box>
                    
                </Box>
                <Box className={classes.bottomRightTABLE}>
                    <Box className={classes.bottomRowTABLE}>
                        <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/matricolaAsset.png')} />
                        <Typography className={classes.bottomRowText} style={{fontWeight:'bold',textTransform:'uppercase'}} variant='subtitle'>{data.matricola}</Typography>
                    </Box>
                    <Box className={classes.bottomRowTABLE}>
                        <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/brandAsset.png')} />
                        <Typography className={classes.bottomRowText} style={{fontWeight:'bold',textTransform:'uppercase'}} variant='subtitle'>{data.marca}</Typography>
                    </Box>
                    <Box className={classes.bottomRowTABLE}>
                        <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/codiceAsset.png')} />
                        <Typography className={classes.bottomRowText} style={{fontWeight:'bold',textTransform:'uppercase'}} variant='subtitle'>{data.codice}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    ) : <Box className={classes.mainAssetTABLE}>
            <Box className={classes.topAssetTABLE}>
                <img className={classes.assetMainImage} src={require('../../../assets/images/anagraficaContratto/asset/nAsset.png')} />
                <Box className={classes.topAssetText}>
                    <Typography className={classes.topText}variant="h6">{data.titolo}</Typography>
                    <Typography className={classes.bottomText}variant="subtitle2">{data.descrizione.split(0,47) + '...'}</Typography>
                </Box>
            </Box>
            <Box className={classes.bottomAssetTABLE}>
                <Box className={classes.bottomRowTABLE}>
                    <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/anagraficaAsset.png')} />
                    <Typography className={classes.bottomRowText} variant='subtitle'>Vari</Typography>
                </Box>
                
                <Box style={{textAlign:'center',display:'flex',justifyContent:'center',flexDirection:'column'}}>
                    <Button className={classes.buttonGroupedAsset} onClick={handleClickOpenSAsset}>
                    Entra nel gruppo
                    </Button>
                </Box>
                <Typography variant={'caption'} style={{color:'#8a8a8a',textAlign:'center'}}>Totali Asset <span style={{color:'#333',fontWeight:'bold'}}>{data.nAsset}</span></Typography>
                <Box className={classes.bottomRowTABLE}>
                    <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/rIntervento.png')} />
                </Box>

                <Box className={classes.bottomRowTABLE}>
                    <img className={classes.rowIMG}src={require('../../../assets/images/anagraficaContratto/asset/interventoAsset.png')} />
                </Box>
                
            </Box>
        </Box>

    }
        {/* MODAL BOX TO ENTER GROUP ASSET*/}
        <Dialog onClose={handleClickOpenSAsset} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleCloseSAsset}>
            Aggiungi Asset
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                    auctor fringilla.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCloseSAsset} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>

        {/* MODAL BOX TO ENTER SINGLE ASSET*/}
        <Dialog  maxWidth='False' onClose={handleClickOpenGAsset} aria-labelledby="customized-dialog-title" open={openG}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseGAsset}>
                {data.titolo + ' ' + data.codice}
                </DialogTitle>
                <DialogContent dividers >
                    <SingleAssetTabs idContratto={idContratto}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseGAsset} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
        </Dialog>
        
        <Snackbar style={{position:'fixed',top:0}} open={openRichiesta} autoHideDuration={3000} onClose={e => setOpenRichiesta(false)}>
            <Alert onClose={e => setOpenRichiesta(false)} severity="success">
                La richiesta d'intervento è stata inviata
            </Alert>
        </Snackbar>
        </>



        
    )
}

export default Asset
