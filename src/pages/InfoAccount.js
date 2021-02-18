import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Box, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    rowMain:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
    },
    mainText:{
        color:'#535353',
        fontWeight:'bold'
    },
    subText:{
        width:'50%',
        textAlign:'left',
        color:'#7a7a7a'
    },
    userImages:{
        height:26
    },
    mContainer:{
        width:'50%',
        display:'flex',
        justifyContent:'flex-start',
        flexWrap:'wrap'
    },
    Name:{
        color:'#33B1E5',
        fontWeight:'bold',
        justifyContent:'center',
        display:'flex',
        flexDirection:'column'
    },
    Spacer:{
        color:'#33B1E5',
        fontSize:8,
        justifyContent:'center',
        display:'flex',
        flexDirection:'column',
        marginLeft:5,
        marginRight:5,
    },
    stdBtn:{
        '&:hover':{
            background:'#efefef !important'
        }
    }
}))

const InfoAccount = ({flag,handleClose,item,contract}) => {
    const classes = useStyles();

  return (
    <div>
      <Dialog
        open={flag}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{borderBottomWidth:1,borderBottomStyle:'solid',borderBottomColor:'#e8e8e8'}} id="alert-dialog-slide-title">
            <Box style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                Info Account
                <CloseIcon onClick={handleClose}/>
            </Box>
        </DialogTitle>
        <DialogContent >
          <Box style={{paddingTop:30}}>
              {/* ROW INFOS*/}
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Nome e Cognome:</Typography>
                    <Typography variant={'subtitle1'} className={classes.subText}>{item.Nome + ' ' + item.Cognome}</Typography>  
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Tipologia Account:</Typography>
                    <Typography variant={'subtitle1'} className={classes.subText}>{item.Tipologia}</Typography>  
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Email:</Typography>
                    <Typography variant={'subtitle1'} className={classes.subText}>{item.Email}</Typography>  
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Cellulare</Typography>
                    <Typography variant={'subtitle1'} className={classes.subText}>{item.Telefono !== null && item.Telefono !== 'undefined' ? item.Telefono : 'Non Impostato'}</Typography>  
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Posizione</Typography>
                    <Typography variant={'subtitle1'} className={classes.subText}>{item.Ruolo}</Typography>  
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Società</Typography>
                    <Typography variant={'subtitle1'} className={classes.subText}>{item.Societa}</Typography>  
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Codice APP</Typography>
                    <Typography variant={'subtitle1'} className={classes.subText}>{item.CodiceAtt}</Typography>  
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Lista Contratti</Typography>
                    <Box className={classes.mContainer}>
                        {contract.length >0 ? (
                            contract.map( cc => {
                                return (
                                    <Box style={{display:'flex',marginRight:15,marginBottom:15}}>
                                        <img className={classes.userImages} src={require("../assets/images/lista-utenti/CONTRATTO.png")} />
                                        <Typography className={classes.Spacer} variant='overline'>x</Typography>
                                        <Typography className={classes.Name} variant='subtitle2'>MAN. {cc.numero}</Typography>
                                    </Box>
                                )
                            } )
                        ) :  <Box style={{display:'flex',marginRight:15}}>
                                <img className={classes.userImages} src={require("../assets/images/lista-utenti/CONTRATTO.png")} />
                                <Typography className={classes.Spacer} variant='overline'>x</Typography>
                                <Typography className={classes.Name} variant='subtitle2'>VUOTO</Typography>
                            </Box>}
                    </Box>
                </Box>
                <Box className={classes.rowMain}>
                    <Typography variant={'subtitle1'} className={classes.mainText}>* Lista Commesse</Typography>
                    <Box className={classes.mContainer}>
                        {/*<Box style={{display:'flex',marginRight:15}}>
                            <img className={classes.userImages} src={require("../assets/images/lista-utenti/contrattoAsset.png")} />
                            <Typography className={classes.Spacer} style={{color:'#FBC265'}} variant='overline'>x</Typography>
                            <Typography className={classes.Name} style={{color:'#FBC265'}} variant='subtitle2'>COM. 000</Typography>
                        </Box> */}   
                    </Box>
                </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.stdBtn} variant='outlined'>
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InfoAccount