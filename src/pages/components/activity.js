import { Box, Paper, Typography,Button, TextField, MenuItem, Select } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CheckIcon from '@material-ui/icons/Check';
import webservice from '../../api/webservice'
import anagraficaData from '../data/anagraficaData'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
   childItem:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:'0 50px',
    paddingLeft:15,
    justifyContent:'space-between'
   },
   activityNumber:{
    fontSize:20,
    fontWeight:'bold',
    color:'#C0C0C0',
    width:'5%'
   },
   activityType:{
       fontSize:20,
       color:'#535353',
       width:'5%'
   },
   activityDescBox:{
       width:'20%',
       flexWrap:'wrap'
   },
   activityDesc:{
       fontSize:16,
       color:'#535353',
       height:'60%'
   },
   dotMonth:{
       width:16,
       height:16,
       backgroundColor:'white',
       borderRadius:8,
       border: '1px solid lightblue'
   },
   iconTool:{
       height:18,
       width:18,
       padding:10,
       borderRadius:5,
       cursor:'pointer'
   },
   defaultSelectBox:{
    width:'100%'
},

}))


    var isFirst = false;
const Activity =({data, toDelete, index, variant,updateAct,tipo}) => {
    //Setting months dot
    function setMonthsValues(data){
        var months =[
            {
            id:1,
            value:false
            },
            {
            id:2,
            value:false
            },
            {
            id:3,
            value:false
            },
            {
            id:4,
            value:false
            },
            {
            id:5,
            value:false
            },
            {
            id:6,
            value:false
            },
            {
            id:7,
            value:false
            },
            {
            id:8,
            value:false
            },
            {
            id:9,
            value:false
            },
            {
            id:10,
            value:false
            },
            {
            id:11,
            value:false
            },
            {
            id:12,
            value:false
            },
        ]
        var temp = months
        if(data!== null){

            switch(data.periodo.split('-'[1])){
                case '01' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '02' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '03' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '04' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '05' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '06' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '07' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '08' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '09' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '10' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '11' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
                case '12' :
                    temp.map( item => {
                        if(item.id == 1){
                            item.value = true
                        }
                    } )
                    break;
            }
            return temp

        }
    }
    const { getTipologieIntervento } = webservice()
    const { getTipoI } = anagraficaData()

    //Alert delete button
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpenDelete = () => {
        setOpen(true);
    };  
    const handleClose = () => {
        setOpen(false);
    };

    const [editor,setEditor] = React.useState(false)

    const classes = useStyles();

    const [edited,setEdited] = React.useState({
        id:data.id,
        tipologia:data.tipologia,
        descrizione:data.descrizione,
        periodo:data.periodo,
    })
    function handleEdited(e,target){
        let val = e.target.value
        setEdited( prevState => ({
            ...prevState,
            [target]:val
        }) )
    }
    return (
        <>
        {console.log(data)}
        {data !== null ? (
            editor === false ? (
                <Paper className={classes.childItem} elevation={isFirst === false ? 2 : 0} >
                    <Typography className={classes.activityNumber}>N.{index + 1}</Typography>
                    <Typography className={classes.activityType}>{data !== null ? data.tipologia : null}</Typography>
                    <Box className={classes.activityDescBox}>
                        <Typography className={classes.activityDesc}>{data !== null ? (data.descrizione).slice(0,200) + '...' : null}</Typography>
                    </Box>
                    <Typography className={classes.activityType}>{data!==null ? data.periodo : null}</Typography>
                    <div style={{width:'25%',display:'flex',alignItems:'center'}}>
                    {setMonthsValues(data).map(  (item) => {
                        var normal = {backgroundColor:'white'}
                        var active = {backgroundColor:'#00ADA2'}
                        function checker(item){
                            return item.value === true ? active : normal
                        }
                        return (
                            <>
                            <div className={classes.dotMonth} style={checker(item)}></div>
                            { item.id != 12 ? <div style={{backgroundColor:'lightblue',width:'16px',height:'1px'}}/> : null}
                            </>
                        )
                    })}
                    </div>
                    {variant !== 'final' ? (  
                        <Box style={{display:'flex',justifyContent:'space-evenly',width:'5%'}}>
                            <img className={classes.iconTool} style={{backgroundColor:'#E1F3F5'}} onClick={ e => setEditor(true) } src={require("../../assets/images/lista-utenti/pencil.png")} />
                            <img onClick={handleClickOpenDelete}className={classes.iconTool} style={{backgroundColor:'#F9D7C8'}} src={require('../../assets/images/listContratti/contrattiTrash.png')} />
                        </Box>
                    ) : null}
                    
                </Paper>
            ) : (
                <Paper className={classes.childItem} elevation={isFirst === false ? 2 : 0} >
                    <Typography className={classes.activityNumber}>N.{index + 1}</Typography>
                    <Select
                        style={{width:'5%'}}
                        labelId="selectTipologia"
                        id="selectTipologia"
                        value={edited.tipologia}
                        onChange={(e) => handleEdited(e,'tipologia')}
                        >
                        {tipo.map(type => {
                                        return (
                                            <MenuItem value={type.Nome}>{type.Nome}</MenuItem>
                                        )
                                    })}
                    </Select>
                    <Box style={{width:'20%'}}>
                        <TextField
                            multiline
                            rowsMax={8}
                            height={64}
                            rows={1}
                            value={edited.descrizione}
                            placeholder="Inserisci la descrizione compelta dell'attività da svolgere"
                            onChange={e => handleEdited(e,'descrizione')}
                            style={{width:'100%'}}
                        />
                    </Box>
                    <Box style={{width:'20%'}}>
                    <TextField
                            disabled
                            value={edited.periodo}
                            style={{width:'100%'}}
                        />
                    </Box>
                    

                    <div style={{width:'25%',display:'flex',alignItems:'center'}}>
                    {setMonthsValues(data).map(  (item) => {
                        var normal = {backgroundColor:'white'}
                        var active = {backgroundColor:'#00ADA2'}
                        function checker(item){
                            return item.value === true ? active : normal
                        }
                        return (
                            <>
                            <div className={classes.dotMonth} style={checker(item)}></div>
                            { item.id != 12 ? <div style={{backgroundColor:'lightblue',width:'16px',height:'1px'}}/> : null}
                            </>
                        )
                    })}
                    </div>
                    {variant !== 'final' ? (  
                        <Box style={{display:'flex',justifyContent:'space-evenly',width:'5%'}}>
                            <CheckIcon className={classes.iconTool} style={{backgroundColor:'#E1F3F5',color:'#559afe'}}  onClick={ e => {
                                e.preventDefault()
                                setEditor(false)
                                updateAct(edited)
                            }} />
                        </Box>
                    ) : null}
                    
                </Paper>
            )

        ) : null}

            {/* ALERT TO DELETE ACTIVITIES*/}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Rimozione Attività"}</DialogTitle>
                <DialogContent style={{width:300,height:50}}>
                    <DialogContentText id="alert-dialog-slide-description">
                        Rimuovere l'attività ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annulla
                </Button>
                <Button onClick={ e => {
                        e.preventDefault()
                        toDelete(data.id)
                        handleClose()
                    } } color="primary">
                    Rimuovi
                </Button>
                </DialogActions>
            </Dialog>
            {isFirst = true}
            </>
    )
}

export default Activity
