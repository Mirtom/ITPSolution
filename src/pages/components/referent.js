import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {  Button, Paper, Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    referentBox:{
        width:'35%',
        padding:'15px 20px',
        marginBottom:15,
        display:'flex',
        justifyContent:'space-between'

      },
      referentText:{
          fontSize:18,
          paddingLeft:20,
          textTransform:'capitalize',
          color:'#535353',
          fontWeight:'bold'
      },
      referentPosition:{
        fontWeight:'normal'
      }
  });
const Referent = ({data, toDelete,type,typeR}) => {
    console.log(data)
    //Alert delete button
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpen(true);
    };  
    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <>
        {data !== null && data !== undefined ? (
            <>
            <Paper className={classes.referentBox} style={{width:type==='final' ? '30%' : '30%'}}>
            {type === 'dash' ? (
               <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>
                   <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                    <Typography className={classes.referentText} accordion={3}>{data.nome}</Typography>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>, {data.posizione}</Typography>
                   </Box>
                   <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>EMAIL:</Typography>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data.email}</Typography>
                   </Box>
                   <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>PEC:</Typography>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data.pec === null ? ( data.pec ) : ''}</Typography>
                   </Box>
                   <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>TELEFONO:</Typography>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data.nTel}{data.nTelS === null ? ( ', ' +data.nTelS ) : ''}</Typography>
                   </Box>
               </Box>

                
            ) : null }
            {type === 'final' ? (
                <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>
                <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                 <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data[0].nome}</Typography>
                 <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>, {data[0].posizione}</Typography>
                </Box>
                <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                 <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>EMAIL: </Typography>
                 <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data[2].mail1}</Typography>
                </Box>
                <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                 <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>PEC: </Typography>
                 <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data[2].mail2 === null ? ( data[2].mail2 ) : ''}</Typography>
                </Box>
                <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                 <Typography className={classes.referentText} accordion={3}>TELEFONO: </Typography>
                 <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data[1].num1}{ data[1].num2 === null ? ( ', ' + data[1].num2 ) : ''}</Typography>
                </Box>
            </Box>

                
            ) : null}
            {type === 'dev' ? (
                <>
                <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>
                   <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                    <Typography className={classes.referentText} accordion={3}>NOME - COGNOME</Typography>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data.nome}</Typography>
                   </Box>
                   <Box style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>
                    <Typography className={classes.referentText} accordion={3}>POSIZIONE</Typography>
                    <Typography className={classes.referentText} style={{color:'#898989',fontWeight:'normal'}}accordion={3}>{data.posizione}</Typography>
                   </Box>
               </Box>
                <RemoveCircleOutlineIcon style={{cursor:'pointer'}} onClick={e => {
                    e.preventDefault()
                    handleClickOpenDelete()
                }} />
                </>
            ) : null}

        </Paper>
            </>
        ) : null}
        

        {/* ALERT TO DELETE REFERENTS*/}
        <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Rimozione referente"}</DialogTitle>
                <DialogContent style={{width:300,height:50}}>
                <DialogContentText id="alert-dialog-slide-description">
                    Rimuovere l'attività ?
                </DialogContentText>
                </DialogContent >
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancella
                </Button>
                <Button onClick={ e => {
                        e.preventDefault()
                        toDelete(data.code)
                        handleClose()
                    } } color="primary">
                    Rimuovi
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Referent

