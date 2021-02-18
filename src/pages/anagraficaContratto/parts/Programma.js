import { Avatar,Button, Box, Container, IconButton, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Drawer from '@material-ui/core/Drawer';
import Sidebar from "../../components/Sidebar"
import ListItemText from '@material-ui/core/ListItemText';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AggiungiAttivita from './AggiungiAttivita';
import userData from '../../data/userData'
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InfoIntervento from './InfoIntervento';
import anagraficaData from '../../data/anagraficaData';
import webservice from '../../../api/webservice';
import { useHistory } from "react-router-dom";
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import exportFromJSON from 'export-from-json'
import PersonIcon from '@material-ui/icons/Person';
import { PhonelinkSetupSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    Header:{
        backgroundColor: "#00ADA2",
        height: 50,
        display:'flex',
        justifyContent:'space-between',
        paddingLeft:15,
        paddingRight:15,
        alignItems:'center'
      },
      toolBar:{
        height:'auto',
        backgroundColor:'white',
        padding:'10px 15px 10px 50px',
        display:'flex',
        justifyContent:'space-between'
      },
      toolBox:{
        width:'18%',
        display:'flex',
        justifyContent:'space-evenly'
      },
      pulsanteAttivita:{
        borderRadius:20,
        padding:'5px 50px',
        border:'1px solid #5692d8',
        fontWeight:'bold',
        letterSpacing:'.05em',
        color:'#5692d8'
      },
      "&:hover":{
        backgroundColor:'transparent'
      },
    avatarBox:{
        width:'15%',
        display:'flex',
        justifyContent:'flex-start',
    },
    mainRow:{
        width:'11.75%',
        borderLeftStyle:'dashed',
        display:'flex',
        padding:5,
        justifyContent:'space-evenly',
        borderLeftColor:'#898989',
        borderLeftWidth:2
    },
    circleAdd:{
        border:'1px dashed #898989',
        borderRadius:16,
        height:20,
        marginLeft:3,
        marginRight:3,
        textHeight:20,
        textAlign:'center'

    },
    circleShow:{
        textHeight:20,
        textAlign:'center',
        background:'#71A8DB !important',
        borderRadius:16,
        height:20,
        marginLeft:3,
        marginRight:3,

    },
    userName:{
        margin:'auto 0',
        color:'#898989',
        fontSize:'0.7vw',
    },
    dayNumber:{
        fontSize:'1.1vw',
        color:'#333'
    },
    daysOrganizer:{
        display:'flex',
        flexDirection:'row',
    },
    currentWeek:{
        color:'#25b4a7',
        fontWeight:'bold',
        fontSize:'0.8vw',
        margin:'auto 0',
        textTransform:'capitalize'
    },
    weekSwitcher:{
        width:'15%',
        display:'flex',
        justifyContent:'center',
    },
    stdIcon:{
        fontSize:'0.6vw',
        color:'#c7c7c7'
    },
    stdSwitcherBtn:{
        width:18,
        height:18,
        margin:'auto 0',
        '&:hover':{
            background:'whitesmoke !important'
        }
    },
    swipeableBoxToolbar:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        cursor:'pointer'
    },
    swipeableText:{
        color:'#898989',
        fontSize:'0.7vw',
        margin:'auto 0'
    },
    topToolbar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:40
    },
    rightTopText:{
        color:'#898989',
        fontWeight:'normal',
        textAlign:'center',
        fontSize:'0.8vw',
        letterSpacing:'.1em',
        marginTop:20
    },
    singleRight:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        padding:7,
        borderBottom:'1px solid #e8e8e8',
        marginBottom:7,
        width:'100%'
    },
    rightCod:{
        color:'#71A8DB',
        fontWeight:'bold',
        fontSize:'0.7vw',
        letterSpacing:'.1em',
        width:'10%',
        margin:'auto 25px'
    },
    rightDesc:{
        color:'#898989',
        width:'60%',
        fontSize:'0.6vw',
        margin:'auto 0'
    },
    rightSimpleContainer:{
        width:'15%',
        textAlign:'center',
        display:'flex',

        flexDirection:'column',
        justifyContent:'center',
        margin:'auto 25px'
    },
    topBtnBox:{
        paddingLeft:15,
        paddingRight:15,
        border:'2px solid #00ADA2',
        color:'#00ADA2',
        '&:hover':{
            background:'whitesmoke !important'
        }
    },
    topBtnStyle:{
        marginLeft:5
    },
    singleDay:{
        width:'11.75%',
        padding:5,
        textAlign:'center',
    },
    dayOf:{
        color:'#898989',
        textTransform:'capitalize',
        fontSize:'0.7vw'
    }
    
}))
function Programma() {
    const history = useHistory()
    const classes = useStyles()
     var d = new Date();
    const [weekStart,setWeekStart] = React.useState(d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear())
    const [weekEnd,setWeekEnd] = React.useState((d.getDate() + 6) + '-' + (d.getMonth()+1) + '-' + d.getFullYear())
    //API CALL
    const { getProgrammaList, getUserList, userList, getFullProgrammaReq,GetClienteFromProgramma,GetAssetFromProgramma, GetFullInterventoList } = webservice()
    const { getAnagraficaData,getFullProgramma,getInterventoListData } = anagraficaData()
    const { getUserData,setDrawer } = userData()

    const delay = ms => new Promise(res => setTimeout(res, ms));
    //State calls
    const [currentData,setCurrentData] = React.useState([])
    React.useEffect(() => {
        async function initialData(){
            await getUserList(getUserData().Token)
            await getFullProgrammaReq('dd')
            await GetFullInterventoList('dd')
            await delay(1000)
            setCurrentData(getFullProgramma())
            var date = new Date(2014, 10, 28, 0, 0, 0, 0);
        }
        initialData()

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
        var datt = getMonday(new Date())
        let thisWeek = [formatDate(datt)]
        for(let i = 0; i< 6; i++){
            thisWeek.push( formatDate(datt.addDays(1)) )
            datt = datt.addDays(1)
        }
        setDateGrouper(thisWeek)


    }, [])

    //Start week from monday
    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
      }

    //Get day name
    function getDayname(date){
        var days = ['Domenica', 'Lunedi\'', 'Martedi\'', 'Mercoledi\'', 'Giovedi\'', 'Venerdi\'', 'Sabato'];
        var dayName = days[new Date(date).getDay()];
        return(dayName)
    }
    //Get month name
    function getMonthname(date){
        const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        var monthName = monthNames[new Date(date).getMonth()]
        return(monthName)
    }
    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
      const forceUpdate = useForceUpdate();

    //Activity button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    //Render day name
    function getDayNames(year, month) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var daysInMonth = new Date(year, month, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            var d = new Date(year, month - 1, i);
            var dayName = days[d.getDay()];
        }
     }


     //SwitchDays
     function changeDays(arr,type){

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }

         let lastDay = new Date(arr[6])
         let firstDay = new Date(arr[0])
        

         if(type === 1){
            let final = []
            for( let i = 0;i<7;i++ ){
               final.push( formatDate( lastDay.addDays(1) ) )
               lastDay = lastDay.addDays(1)
            }
            setDateGrouper(final)
         }else{
            let final = []
            for( let i = 0;i<7;i++ ){
               final.push( formatDate( firstDay.addDays(-1) ) )
               firstDay = firstDay.addDays(-1)
            }
            console.log(final)
            setDateGrouper(final.reverse())
         }
     }
    //Function to sort weeks
    const [dateAdd,setDate] = React.useState(0)
    const [dateGrouper,setDateGrouper] = React.useState([])
    //Swipeable right
    const [actPrev,setActPrev] = React.useState(false)
    //flag and function for add activity
    const [flag,setFlag] = React.useState(false)
    const [infoFlag,setInfoFlag] = React.useState(false)
    const [us,setUs] = React.useState([])
    const [infoTarget,setInfoTarget] = React.useState(0)
    const [targetClient,setTargetClient] = React.useState()

    function isBetween(currentDate,minDate,maxDate){
        if (currentDate >= minDate && currentDate <= maxDate ){
            return true
       }
    }

    function testFun(user,programs,dates){
        if(user !== null && user !== undefined && programs !== undefined){
            let toShow=[]
                return dates.map( cData => {
                    let tmp 
                    if(programs !== null){
                        tmp = (programs.filter( cProgram => isBetween(cData,cProgram.dataInizio,cProgram.dataFine) && cProgram.idCliente === user.id )).slice(0,3)
                    }
                    if(tmp !== undefined){
                        return (
                            <Box className={classes.mainRow}>
                                { tmp.map ( (cc,index) => {
                                    console.log(cc)
                                        return (
                                            <Box style={{display:'flex',flexDirection:'column',justifyContent:'center',textAlign:'center'}}>
                                            {cc.stato !== 'malattia' && cc.stato !== 'ferie' && cc.stato !== 'permessi' ? (<><Typography style={{color:'#898989',cursor:'pointer',margin:'auto 5px',marginBottom:'-8px',fontSize:'0.4vw'}}>+{cc.tempi}</Typography>
                                                <Typography variant={'overline'} style={{color:'#25b4a7',cursor:'pointer',margin:'auto 5px',fontSize:'0.5vw',fontWeight:'bold'}} onClick={async e=>{
                                                    e.preventDefault()
                                                    setInfoTarget(cc)
                                                    let tmp = userList.filter(ee=>ee.id === cc.idCliente && ee.Tipologia == 'Utente')
                                                    setTargetClient(tmp[0])
                                                    console.log(cc)
                                                    await GetClienteFromProgramma('ddd',cc.byContratto)
                                                    await GetAssetFromProgramma(getUserData().Token,cc.idIntervento)
                                                    await delay(500)
                                                    setInfoFlag(true)
                                                }}>I.{cc.idIntervento}</Typography></>) : (
                                                    <Typography variant={'overline'} style={{color:'#25b4a7',margin:'auto 5px',fontSize:'0.65vw',fontWeight:'bold'}} >
                                                        {cc.stato.charAt(0)}
                                                    </Typography>
                                                )}</Box>
                                        )

                                    
                                } ) }
                                {tmp !== undefined && tmp[0] !== undefined ? ( 
                                            tmp[0].stato === 'permessi' || tmp[0].stato === 'ferie' || tmp[0].stato === 'malattia' ? (
                                                <>
                                                <Box className={classes.circleAdd} style={{margin:'auto 5px',cursor:'not-allowed',width:32,height:32}}>
                                                    <AddIcon style={{padding:4,color:'#898989'}}/>
                                                </Box>
                                                </>
                                            ) : (
                                                <Box className={classes.circleAdd} style={{margin:'auto 5px',cursor:'pointer',width:32,height:32}}onClick={e=> {
                                                    setDate(cData)
                                                    setUs(user)
                                                    setFlag(true)}
                                                    }>
                                                    <AddIcon style={{padding:4,color:'#898989'}}/>
                                                </Box>
                                            )
                                         ) : (
                                            <Box className={classes.circleAdd} style={{margin:'auto 5px',cursor:'pointer',width:32,height:32}}onClick={e=> {
                                                setDate(cData)
                                                setUs(user)
                                                setFlag(true)}
                                                }>
                                                <AddIcon style={{padding:4,color:'#898989'}}/>
                                            </Box>
                                         )}
                                
                                        
                                                
                            </Box>
                        ) //Program found with x user and x date
                    }else{
                        return (
                            <Box className={classes.mainRow}>
                                <Box className={classes.circleAdd} style={{margin:'auto 5px',cursor:'pointer',width:32,height:32}}onClick={e=> {
                                    setDate(cData)
                                    setFlag(true)
                                    }}>
                                        
                                    <AddIcon style={{padding:4,color:'#898989'}}/>
                                </Box>
                            </Box>
                        ) // No program with x user and x date SKIP
                    }
                } )
        }
        
    }
    function printColorBg(index){
        if (index % 2 === 0){
            return '#f2f2f3'
        }else{
            return 'white'
        }
    }

    //Switch priority
  function showPriority(type){
    switch(type){
      case 'urgente':
          return (require('../../../assets/images/anagraficaContratto/ticket/pUrgente.png'))
          break;
      case 'medio':
          return (require('../../../assets/images/anagraficaContratto/ticket/pMedia.png'))
          break;
      case 'emergenza':
          return (require('../../../assets/images/anagraficaContratto/ticket/pEmergenza.png'))
          break;
      case 'basso':
          return (require('../../../assets/images/anagraficaContratto/ticket/pBassa.png'))
          break;
    }
  }
  function showPriorityColor(type){
    switch(type){
      case 'urgente':
          return 'red'
          break;
      case 'medio':
          return 'red'
          break;
      case 'emergenza':
          return 'blue'
          break;
      case 'basso':
          return '#ec5388'
          break;
    }
  }

  //Export side
  const [selected,setSelected] = useState()
  function isSelected(id,type){
      if(selected !== undefined){let tmp = selected.filter( item => item.id === id )
      if(tmp.length >0){
        if(type === 'border'){
            return '1px solid #dadada'
        }else{
            return 'whitesmoke'
        }
      }else{
        if(type === 'border'){
            return 'none'
        }else{
            return 'white'
        }
      }
    }
    if(type === 'border'){
        return 'none'
    }else{
        return 'white'
    }
  }
  const [toCopy,setToCopy] = React.useState([])
    //actprev
    function printActPrev(){
        if(getInterventoListData()!==null){let final = []
        currentData.map( item => {
            getInterventoListData().map(ee=>{
                if(ee.id===item.idIntervento){
                    final.push(ee)
                }
            })
        } )
        return final.map(item=> {
            return(
                <Box className={classes.singleRight}>
                    <Typography variant={'h6'} className={classes.rightCod}>INT.{item.id}</Typography>
                    <Typography variant={'subtitle2'} className={classes.rightDesc}>{item.descrizione.split(0,150)}</Typography>
                    <Box className={classes.rightSimpleContainer}>
                        <img style={{width:24,margin:'0 auto'}}src={showPriority(item.priorita)} className={classes.rightSingleImg}/>
                        <Typography variant={'outline'} style={{color:showPriorityColor(item.priorita),fontSize:'.4vw',letterSpacing:'.1em',textTransform:'uppercase',fontWeight:'bold',marginTop:10}}>{item.priorita}</Typography>
                    </Box>
                    <Box className={classes.rightSimpleContainer}>
                        <QueryBuilderIcon style={{width:24,margin:'0 auto'}}/>
                        <Typography variant={'outline'} style={{color:'darkyellow',fontSize:'.4vw',letterSpacing:'.1em',textTransform:'uppercase',fontWeight:'bold',marginTop:10}}>{item.status !== 'chiuso' ? 'In Lavorazione' : 'Chiuso'}</Typography>
                    </Box>  
                </Box>
            )
        })}
    }
    const fileName = 'lista_programmi'
        const exportType = 'csv' 
    return (

        <div style={{display:'flex'}}>

            <Sidebar></Sidebar>
            <Container maxWidth="False" style={{padding:0,margin:0,width:'100%',marginLeft:'-13%'}}>

                <Container maxWidth="False" className={classes.Header}>
                <MenuIcon style={{cursor:'pointer',color:'white'}} onClick={e => {
                                setDrawer()
                                forceUpdate()
                            }}/> 
                            
                {/* import PersonIcon from '@material-ui/icons/Person'; */}
            <Box style={{display:'flex',justifyContent:'space-around',width:'8%'}}>
                <Typography style={{color:'white',fontSize:'.6vw',margin:'auto 0', letterSpacing:'.1em'}}>{ getUserData() !== undefined ? getUserData().Nome + ' ' + getUserData().Cognome : '' }</Typography>
                <PersonIcon style={{height:32,color:'white'}} />
                </Box>
                </Container>
                
                <Container maxWidth="False" className={classes.toolBar}>
                <Box style={{display:'flex'}}>
                    <img src={require('../../../assets/images/anagraficaContratto/programmaSett.png')} style={{width:40,marginRight:30}} />
                    <Typography variant='h6' component='h2' style={{color:'#6A6A6A',margin:'auto 0'}}>PROGRAMMA</Typography>
                </Box>
                <Box className={classes.toolBox}>
                    <Box className={classes.swipeableBoxToolbar} onClick={e=> setActPrev(true)}>
                        <SwapHorizIcon style={{color:'darkblue',margin:'auto 0'}} />
                        <Typography variant={'h6'} className={classes.swipeableText} >Attività previste</Typography>
                    </Box>
                    <Button className={classes.pulsanteAttivita} aria-controls="simple-menu" style={{backgroundColor:'transparent'}}aria-haspopup="true" onClick={handleClick}>
                    Attivita'
                    </Button>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={e => {
                        //console.log( getInterventoListData(),getFullProgramma(), selected )
                        let data = []
                        getInterventoListData().map( e => {
                            getFullProgramma().map( prog => {
                                if(e.id === prog.idIntervento && prog.idCliente === selected[0].id){
                                    data.push(e)
                                }
                            } )
                        } )
                        if(data.length > 0){
                            exportFromJSON({ data, fileName, exportType })
                        }
                    }}>
                        <ListItemText primary="Seleziona ed Esporta" />
                    </MenuItem>
                    </Menu>
                </Box>
                </Container>
                <Container maxWidth="False" className={classes.userTable}>
                    {/* Declaring dialog call */}
                    <InfoIntervento flag={infoFlag} handleClose={e=> setInfoFlag(false)} target={infoTarget} cliente={targetClient}/>
                    <AggiungiAttivita user={us} flag={flag} handleClose={e=> setFlag(false)} date={dateAdd}/>
                    {getDayNames()}
                    <Drawer anchor={'right'} open={actPrev} onClose={e=> setActPrev(false)} style={{paddingTop:10,paddingLeft:15,paddingRight:15,width:'30%'}}>
                        <Typography variant='h6' className={classes.rightTopText} style={{marginBottom:20}}>
                            Attività Previste
                        </Typography>
                        {printActPrev()}
                    </Drawer>
                    {/*<Box style={{width:'100%',display:'flex',justifyContent:'flex-end',marginTop:25,cursor:'not-allowed'}}>
                        <Button variant="outlined" className={classes.topBtnBox} style={{marginRight:25,cursor:'not-allowed'}} onClick={e => {
                            e.preventDefault()
                            if(toCopy.length > 0){
                                let data=[]
                                getInterventoListData().map( e => {
                                    getFullProgramma().map( prog => {
                                        if(e.id === prog.idIntervento && prog.idCliente === selected[0].id){
                                            data.push(e)
                                        }
                                    } )
                                } )

                                setToCopy(data)
                            }else{
                                console.log(dateGrouper,toCopy)
                                setToCopy([])
                            }
                            

                        }}>
                            <Typography variant={'subtitle2'}>Copia Prog.</Typography>
                            <CloudDoneIcon className={classes.topBtnStyle} />
                        </Button>
                        <Button  className={classes.topBtnBox} style={{background:'#00ADA2',color:'white',cursor:'not-allowed'}}>
                            <Typography variant={'subtitle2'}>Conferma</Typography>
                            <FileCopyIcon className={classes.topBtnStyle} />
                        </Button>
                    </Box>
                        */}
                    <Box className={classes.daysOrganizer} style={{marginTop:30}}>
                        <Box className={classes.weekSwitcher}>
                            <IconButton className={classes.stdSwitcherBtn}><ArrowBackIosIcon className={classes.stdIcon} onClick={ e=> {
                                e.preventDefault()
                                changeDays(dateGrouper,2)
                            } }/></IconButton>
                            <Typography variant={'h6'} className={classes.currentWeek}>{ dateGrouper[0]!==undefined ? dateGrouper[0].split('-')[2] + '-'+ dateGrouper[6].split('-')[2] + ' ' + getMonthname(dateGrouper[0]) + " " + dateGrouper[0].split('-')[0] : "Caricamento.."}</Typography>
                            <IconButton className={classes.stdSwitcherBtn}><ArrowForwardIosIcon className={classes.stdIcon} onClick={ e=> {
                                e.preventDefault()
                                changeDays(dateGrouper,1)
                            } }/></IconButton>
                        </Box>
                            {dateGrouper !== undefined && dateGrouper !== null ? (
                                dateGrouper.map( date => {
                                    return (
                                        <Box className={classes.singleDay}>
                                            <Typography variant={'h6'}>{date.split('-')[2]}</Typography>
                                            <Typography variant={'subtitle2'} className={classes.dayOf}>{ getDayname(date) }</Typography>
                                        </Box>
                                    )
                                } )
                            ) : null }
                           

                    </Box>
                        {userList !== undefined ? (
                            userList.filter(e=>e.Tipologia === 'Utente').map( (user,index) =>{
                                console.log(index % 2)
                                return (
                                    
                                    <Box style={{display:'flex',padding:'1.75px 8px',border:isSelected(user.id,'border'),backgroundColor:isSelected(user.id,'background') , background:printColorBg(index)}}>
                                        <Box className={classes.avatarBox} style={{cursor:'pointer'}} onClick={ e=> {
                                        e.preventDefault()
                                        /*let sel = selected
                                        if( sel !== undefined ){
                                            let tmp = sel.filter( item => item.id === user.id )
                                            if(tmp.length > 0){
                                                let toUp = sel.filter( item => item.id !== user.id )
                                                setSelected(toUp)
                                            }else{
                                                sel.push(user)
                                                setSelected(sel)
                                            }
                                        }else{
                                            setSelected([user])
                                        }*/
                                        setSelected([user])
                                        forceUpdate()
                                    } }>
                                            <Avatar style={{margin:'auto 0',marginRight:20,marginLeft:20,width:32,height:32}}>{user.Nome.charAt(0)}</Avatar>
                                            <Typography variant={'h6'} className={classes.userName}>{user.Nome + ' ' + user.Cognome}</Typography>
                                        </Box>
                                        {testFun(user,getFullProgramma(),dateGrouper)}
                                    </Box>
                                )
                            } )
                        ) : null}
                </Container>

            </Container>

      </div>
    )
}


export default Programma
