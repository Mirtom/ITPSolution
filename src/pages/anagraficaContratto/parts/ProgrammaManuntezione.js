import React,{ useState } from 'react'
import { Box, Button, Container, IconButton, InputLabel,Select as SelectNV, MenuItem, TextField, Typography } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import webservice from '../../../api/webservice';
import userData from '../../data/userData';
import contractData from '../../data/contractData';
import EditActivity from './EditActivity';
import anagraficaData from '../../data/anagraficaData';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import PrintIcon from '@material-ui/icons/Print';
import Select from 'react-select'

/*const Quixote = ({data}) => (
    <Document>
      <Page style={{padding:25,display:'flex',justifyContent:'flex-start',flexDirection:'column'}}>
        {data !== null ? (
            data.map(item => {
                return <View style={style.box}>
                    <View style={[style.aligner,{width:'10%'}]}>
                    <Text style={style.fText}>N.{item.id}</Text>
                    </View>
                    <View style={[style.aligner,{width:'15%'}]}>
                        <Text style={style.sText}>{item.tipologia}</Text>
                    </View>
                    <View style={[style.aligner,{width:'40%'}]}>
                        <Text style={style.tText}>{item.descrizione}</Text>
                    </View>
                    <View  style={[style.aligner,{width:'18%'}]}>
                    <Text style={style.sText}>{item.periodo}</Text>
                    </View>
                </View>
            })
        ) : null} 
        
      </Page>
    </Document>
  );

  const style = StyleSheet.create({
    box:{
      borderBottom:'1 solid #e8e8e8',
      marginHorizontal:'auto',
      width:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:5,
      paddingRight:5
    },
    tText:{
      fontSize:11,
      width:'100%',
      color:'#898989',
    },
    sText:{
      fontSize:12,
      color:'#333',
      fontWeight:600,
      letterSpacing:1,
    },
    fText:{
      fontSize:13
    },
    aligner:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center'
    }
}); */

const useStyles = makeStyles((theme) => ({
    mainContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexWrap:'wrap',
        backgroundColor:'white'
    },
    aCont:{
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'white'
    },
    manRow:{
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop:'2%',
        paddingBottom:'1%',
        borderBottomWidth:'1',
        borderBottomStyle:'solid',
        borderBottomColor:'#e8e8e8'
    },
    manCol:{
        width:'30%'
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
    month:{
        fontWeight:'bold',
        color:'#535353',
        marginBottom:15,
        fontSize:'0.7vw'
    },
    lCont:{
        width:'100%',
        backgroundColor:'white'
    },
    actList:{
        color:'#535353',
        width:'80%',
        textAlign:'center'
    },
    actTop:{
        paddingTop:30,
        paddingBottom:30,
        display:'flex',
        flexDirection:'row'
    },
    actIcon:{
        height:30,
    },
    actIconTwo:{
        width:16,
    },
    actSingle:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:2,
        alignItems:'center',
        borderBottomColor:'#e8e8e8',
        borderBottomStyle:'solid'
    },
    actCode:{
        color:'#535353',
        fontWeight:'bold',
        width:'10%',
        fontSize:'0.7vw'
    },
    actType:{
        color:'#535353',
        fontWeight:'bold',
        width:'10%',
        textAlign:'center',
        fontSize:'0.65vw'
    },
    actTime:{
        color:'#535353',
        fontWeight:'bold',
        width:'10%',
        textAlign:'center',
        fontSize:'0.65vw'
    },
    actDescContainer:{
        width:'40%',
    },
    actDesc:{
        color:'#535353',
        fontSize:'0.6vw'
    },
    panelIconButton:{
        alignItems:'center',
        '&:hover':{
          background:'lightgray !important'
        },
        width:'1vw',
        height:'1vw',
        marginRight:10
    },
    newActivityBox:{
        marginBottom:'8%',
        textAlign:'center'
    },
    defaultSelectBox:{
        width:'100%'
    },
    sbmtN:{
        '&:hover':{
            backgroundColor:'transparent !important'
        }
    },
    stdBtn:{
        '&:hover':{
            background:'#efefef !important'
        }
    }
}))


const ProgrammaManuntezione = ({data}) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [asset,setAsset] = React.useState([])
    const [toShowTabs,setToShowTabs] = React.useState([])
    const { getTabImpianti } = contractData()
    const { getActivityList,getTipologieIntervento, getTabTipoImpianti,createIntervento } = webservice()
    const { getActivityListData, getTipoI,  } = anagraficaData()
        const [cType,setCType] = React.useState([])
    React.useEffect(() => {
        async function initialData(){
            await getActivityList('dd',getAnagraficaData().id)
            await getTipologieIntervento('dd')
            await getTabTipoImpianti('dd')
            await delay(500)
            setAsset( getActivityListData() )
            console.log(  getActivityListData())

            orderCalendar()

            var typDe = getAnagraficaData().tipologia
            if(typDe.split(',').length > 1){
                typDe = typDe.split(',')[0]
            }
            //console.log(typDe)
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
        initialData()
    }, [])

    function toDateTime(date,action){
       
        var now = new Date()
        if(action === 0){
            return ( date + ' ' + now.getHours() + ':' + now.getMinutes() )
        }else if(action === 1){
            if(now.getHours() + date > 24){
                return( now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() + 1) + ' ' + ((now.getHours() + date) -24 ) + ':' + now.getMinutes() )
            }else{
                return( now.getFullYear() + '-' + (now.getMonth() + 1 )+ '-' + now.getDate() + ' ' + (now.getHours() + date) + ':' + now.getMinutes() )
            }
        }else{
            return ( date + ' ' + '00:00')
        }
        
    }

    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();

    //Orderer
    function orderCalendar(){
        let final = []
        let month =  parseInt(getAnagraficaData().dataInizio.split('-')[1])
        if(getActivityListData() !== null && getActivityListData() !== undefined){
            getActivityListData().map((sAsset,index) => {
                let i = month
                while(i<=12){
                    let toDisplay = {
                        id:index+1,
                        descrizione:sAsset.descrizione,
                        periodo:sAsset.periodo,
                        tipologia:sAsset.tipologia,
                        monthForm:i
                    }
                    switch(sAsset.periodo){
                        case 'Settimanale':
                            i = i+1
                            break;
                        case 'Mensile':
                            i = i+1
                            break;
                        case 'Bimestrale':
                            i = i+2
                            break;
                        case 'Trimestrale':
                            i = i+3
                            break;
                        case 'Quadrimestrale':
                            i = i+4
                            break;
                        case 'Semestrale':
                            i = i+6
                            break;
                        case 'Annuale':
                            i = i+ 12
                            break;
                        default:
                            i = i+ 12
                            break
                    }
                    //console.log(i)
                    final.push(toDisplay)
                }
            })
        }
        
        setToShowTabs(final)
    }

    //CLASSI CSS
    const classes = useStyles()

    //SESSION DATA
    const { deleteActivity, createActivity } = webservice()
    const { getUserData } = userData()
    const { getAnagraficaData } = anagraficaData()

    function periods(tmp,isFirst){
        if(isFirst === true){
            switch(tmp){
                case 'Settimanale':
                    return 1;
                    break;
                case 'Mensile':
                    return 1;
                    break;
                case 'Bimestrale':
                    return 1;
                    break;
                case 'Trimestrale':
                    return 1;
                    break;
                case 'Quadrimestrale':
                    return 1;
                    break;
                case 'Semestrale':
                    return 1;
                    break;
                case 'Annuale':
                    return 1;
                    break;
            }
        }else{
            switch(tmp){
                case 'Settimanale':
                    return 1;
                    break;
                case 'Mensile':
                    return 1;
                    break;
                case 'Bimestrale':
                    return 2;
                    break;
                case 'Trimestrale':
                    return 3;
                    break;
                case 'Quadrimestrale':
                    return 4;
                    break;
                case 'Semestrale':
                    return 6;
                    break;
                case 'Annuale':
                    return 12;
                    break;
            }
        }
        
    }

    function splitAsset(item,month){
        let fin = []
        if(item !== null){
            if(item.length > 0){
                fin = item.filter( ass => {
                    return ass.periodo.split('-')[1] == month
                } )
                console.log(item,fin,month)
            }
        }
        

        let checker = false
        return fin.map( (e,ind) => {
            if(ind <=2){
                return(
                    <>
                    <Box className={classes.asset} style={{borderColor:'#e8e8e8'}}>
                        <img className={classes.assetIMG} src={require('../../../assets/images/anagraficaContratto/manutenzione/icon.png')} />
                        <Typography variant={'h6'} className={classes.assetCODE}>N.{item.id}</Typography>
                        <Typography variant={'caption'} className={classes.assetDESC}>{e.descrizione.slice(0,90) + '...'}</Typography>
                    </Box>
                    </>
                )
            }else{
                return (
                    checker === false ? (
                        <>
                        <ExpandMoreIcon style={{width:'100%',textAlign:'center',color:'#71A8DB',cursor:'pointer'}} onClick={e=> {
                            setCMonth(item.monthForm)
                            setCData(fin)
                            setOpenSingle(true)
                        }}/>
                        {checker = true}
                        </>
                    ) : null
                )
                
            }
        } )
    }

    //Remove snackbar
    const [open, setOpen] = useState(false);
    const [flagAdd,setFlagAdd] = useState(false)

    const handleClick = () => {
        setOpen(true);
        //console.log('d')
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    //Data new activity
    const [nActivity,setNActivity] = React.useState({
        tipologia:null,
        descrizione:null,
        periodo:null
    })
    function handleNewActivity(e,target){
        let val = e.target.value
        setNActivity(prevState => ({
            ...prevState,
            [target]:val
        }))
    }

    var f = new Date()

    function lastAct(item){
        if(item !== null){
            return item.map( (tmp,index) => {
                return (
                    <Box className={classes.actSingle}>
                        <Typography variant={'h6'} className={classes.actCode}>Nd. {index + 1}</Typography>
                        <Typography variant={'subtitle2'} className={classes.actType}>{tmp.tipologia}</Typography>
                        <Box className={classes.actDescContainer}>
                            <Typography variant={'caption'} className={classes.actDesc}>{tmp.descrizione.slice(0,90) + '...'}</Typography>
                        </Box>
                            <Typography variant={'subtitle2'} className={classes.actTime}>{tmp.periodo}</Typography>
                        <Box>
                            <IconButton className={classes.panelIconButton} style={{backgroundColor:'#e3f4f6'}} onClick={e=> {
                                e.preventDefault()
                                setFlag(!flag)
                                setActToEdit(tmp)
                            }}>
                                <img src={require('../../../assets/images/lista-utenti/pencil.png')} className={classes.actIconTwo} />
                            </IconButton>
                            <IconButton className={classes.panelIconButton} style={{backgroundColor:'#f9d7c8'}} onClick={async tmpp => {
                                let toRem = {
                                    token: getUserData().Token,
                                    id:tmp.id
                                  }
                                  await deleteActivity(toRem)
                                  await delay(800)
                                  let tmpD = getActivityListData().filter(itemm => itemm.id!== toRem.id)
                                  setAsset(tmpD)
                                  forceUpdate()
                                  //window.location.reload(false)
                            }}>
                                <img src={require('../../../assets/images/lista-utenti/delete.png')} className={classes.actIconTwo} />
                            </IconButton>
                        </Box>
                    </Box>
                )
            } ) 
        }
               
    }

    //DIALOG TO SHOW ALL ACTIVITY DATA
    const [openSingle,setOpenSingle] = useState(false)
    const [cMonth, setCMonth] = useState(0)
    const [cData,setCData] = useState([])
    const handleCloseSingle = () => {
        setOpenSingle(false)
    }
    function monthDISPLAY(month){
        switch(month){
            case 1:
                return 'Gennaio'
                break;
            case 2:
                return 'Febbraio'
                break;
            case 3:
                return 'Marzo'
                break;
            case 4:
                return 'Aprile'
                break;
            case 5:
                return 'Maggio'
                break;
            case 6:
                return 'Giugno'
                break;
            case 7:
                return 'Luglio'
                break;
            case 8:
                return 'Agosto'
                break;
            case 9:
                return 'Settembre'
                break;
            case 10:
                return 'Ottobre'
                break;
            case 11:
                return 'Novembre'
                break;
            case 12:
                return 'Dicembre'
                break;
            
        }
    }

    const [flag,setFlag] = useState(false)
    const [actToEdit,setActToEdit] = useState({})
    function EditItems(flags,itemToSend) {
        return <EditActivity toShow={flags} item={itemToSend} handleClose={e => setFlag(!flag)} handleSuccess={e => window.location.reload(false)}></EditActivity>
    }

    function monthDiff(startDate, endDate) {
        var start      = startDate.split('-');
        var end        = endDate.split('-');
        var startYear  = parseInt(start[0]);
        var endYear    = parseInt(end[0]);
        var dates      = [];

        for(var i = startYear; i <= endYear; i++) {
            var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
            var startMon = i === startYear ? parseInt(start[1])-1 : 0;
            for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
            var month = j+1;
            var displayMonth = month < 10 ? '0'+month : month;
            dates.push([i, displayMonth, '01'].join('-'));
            }
        }
        return dates;
    }
    const [monthToLoad,setMonthToLoad] = React.useState([])

    function printSelectMonths(dates){

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
        let fin = []

        dates.map( item => {
            let tmp = item.split('-')
            let tmpToUp = {
                value:item,
                label:printName(tmp[1]) + ' - ' + tmp[0]
            }
            fin.push(tmpToUp)
            //<MenuItem value={item}>{printName(tmp[1]) + ' - ' + tmp[0]}</MenuItem>
        })

        return (
            <Select
            menuPortalTarget={document.body} 
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="color"
                isMulti
                options={fin}
                onChange={ item => setMonthToLoad(item) }
                />
            
        )
    }



    return (
    <>
    <>
            <Box className={classes.mainContainer}>
                {/*<PDFDownloadLink style={{marginLeft:'auto'}}document={<></><Quixote data={asset}/>} fileName={"Report Attivita.pdf"}>
                    {({ blob, url, loading, error }) => (loading ? 'Caricamento...' : <IconButton className={classes.stdBtn} style={{color:'#71A8DB'}} variant="outlined"><PrintIcon style={{fontSize:'1.5vw'}}/></IconButton>)}
                </PDFDownloadLink>*/}
                <IconButton className={classes.stdBtn} style={{color:'#71A8DB',marginLeft:'auto'}} variant="outlined"><PrintIcon style={{fontSize:'1.5vw'}}/></IconButton>
            <div>
                {EditItems(flag,actToEdit)}
            </div>
                {/* BOX ASSET MESI*/}
                <Box className={classes.aCont}>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Gennaio</Typography>
                            { splitAsset(asset,'01') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Febbraio</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'02') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Marzo</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'03') }
                            </Box>
                        
                    </Box>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Aprile</Typography>
                            { splitAsset(asset,'04') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Maggio</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'05') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Giugno</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'06') }
                            </Box>
                        
                    </Box>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Luglio</Typography>
                            { splitAsset(asset,'07') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Agosto</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'08') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Settembre</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'09') }
                            </Box>
                        
                    </Box>
                    {/* 3 MESI*/}
                    <Box className={classes.manRow}>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                            {/* SINGOLO Asset*/}
                            <Typography variant={'h6'} className={classes.month}>Ottobre</Typography>
                            { splitAsset(asset,'10') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Novembre</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'11') }
                            </Box>
                        {/* Singolo MESE*/}
                        <Box className={classes.manCol}>
                        <Typography variant={'h6'} className={classes.month}>Dicembre</Typography>
                            {/* SINGOLO Asset*/}
                            { splitAsset(asset,'12') }
                            </Box>
                        
                    </Box>
                    
                </Box>

                {/* BOX LAST ASSET */}
                <Box className={classes.lCont}>
                    <Box className={classes.actTop}>
                        <Typography variant={'h6'} className={classes.actList}>Lista Attività</Typography>
                        <img style={{cursor:'pointer'}} src={require('../../../assets/images/anagraficaContratto/manutenzione/addAsset.png')} className={classes.actIcon} onClick={e=> setFlagAdd(true)}/>
                    </Box>
                    {lastAct(asset)}
                    {/* ALERT REMOVE ATTIVITA */}
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                        This is a success message!
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>

            {/* DIALOG TO SHOW ALL ACTIVITY SINGLE MONTH*/}
            <Dialog
                open={openSingle}
                maxWidth={'lg'}
                fullWidth={true}
                onClose={handleCloseSingle}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Lista Attività {monthDISPLAY(cMonth)}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {cData.map((e,index) => {
                            return (
                                <Box className={classes.actSingle}>
                                    <Typography variant={'h6'} className={classes.actCode}>N. {index}</Typography>
                                    <Typography variant={'subtitle2'} className={classes.actType}>{e.tipologia}</Typography>
                                    <Box className={classes.actDescContainer}>
                                        <Typography variant={'caption'} className={classes.actDesc}>{e.descrizione}</Typography>
                                    </Box>
                                        <Typography variant={'subtitle2'} className={classes.actTime}>{e.periodo}</Typography>
                                </Box>
                            )
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSingle} variant='outlined' className={classes.stdBtn}autoFocus>
                        Chiudi
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DIALOG TO ADD ACTIVITY*/}
            <Dialog
                open={flagAdd}
                maxWidth={'sm'}
                fullWidth={true}
                onClose={e=> setFlagAdd(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Aggiungi Attività</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box>
                            
                            <Box className={classes.newActivityBox}>
                                <InputLabel htmlFor="selectTipologia">* Tipologia Impianto</InputLabel>
                                <SelectNV
                                    className={classes.defaultSelectBox}
                                    labelId="selectTipologia"
                                    id="selectTipologia"
                                    value={nActivity.tipologia}
                                    onChange={ e=> handleNewActivity(e,'tipologia')}
                                    >
                                    {cType.map(type => {
                                        return (
                                            <MenuItem value={type.Nome}>{type.Nome}</MenuItem>
                                        )
                                    })}
                                    
                                </SelectNV>
                            </Box>
                            <Box className={classes.newActivityBox}>
                            <InputLabel htmlFor="selectTipologia">* Descrizione dell'attività</InputLabel>
                                <TextField
                                    id="outline-multiline-static"
                                    multiline
                                    className={classes.defaultSelectBox}
                                    rowsMax={8}
                                    height={64}
                                    rows={3}
                                    value={nActivity.descrizione}
                                    onChange={ e=> handleNewActivity(e,'descrizione')}
                                />
                            </Box>
                            <Box className={classes.newActivityBox}>
                                <InputLabel htmlFor="selectTipologia">* Periodo temporale</InputLabel>
                                { printSelectMonths(monthDiff(getAnagraficaData().dataInizio.split('T')[0],getAnagraficaData().dataFine.split('T')[0])) }
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' className={classes.sbmtN} autoFocus onClick={async e => {
                        e.preventDefault()
                        console.log(getAnagraficaData())
                        console.log( nActivity,monthToLoad )
                        async function uploader(){
                            if(monthToLoad.length > 0){
                                await monthToLoad.map( async sInsert => {
                                    let toUpInt = {
                                        token:getUserData().Token,
                                        tipologia:'manutenzione',
                                        tempi:toDateTime(sInsert.value,3),
                                        dataInizio:toDateTime(sInsert.value,3),
                                        dataFine:toDateTime(sInsert.value,3),
                                        priorita:'manutenzione',
                                        ragSociale:null,
                                        byContratto:getAnagraficaData().id,
                                        descrizione:nActivity.descrizione,
                                        previsioneTermine:null,
                                        created:toDateTime(0,1),
                                        byAsset:0,
                                        accepted:1,
                                    }
                                    let toUp = {
                                        token:getUserData().Token,
                                        tipologia:nActivity.tipologia,
                                        periodo:sInsert.value,
                                        descrizione:nActivity.descrizione,
                                        numContratto:getAnagraficaData().numero
                                    }
                                    console.log(toUp)
                                    await createIntervento(toUpInt)
                                    await createActivity(toUp.token,toUp.tipologia,toUp.periodo,toUp.descrizione,toUp.numContratto)
                                    await delay(500)
                                    let tmp = []
                                    if(getActivityListData().length > 0){
                                        tmp = getActivityListData()
                                    }
                                    
                                    tmp.push(toUp)
                                    console.log(tmp)
                                    setAsset( tmp )
                                } )
                            }
                            await getActivityList('dd',getAnagraficaData().id)
                        
                            await delay(800)
                            await delay(400)
                            forceUpdate()
                            console.log('ASSET',asset)

                            forceUpdate()
                            setFlagAdd(false) 
                        }
                    uploader()

                   }}>
                        Aggiungi
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    
    </>
    )
}

export default ProgrammaManuntezione
