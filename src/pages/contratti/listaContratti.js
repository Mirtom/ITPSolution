import React, { useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Container, Grid, TextField, Typography } from "@material-ui/core"
import userData from '../data/userData'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Contratto from '../components/contratto'
import SearchIcon from '@material-ui/icons/Search';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Pagination from '@material-ui/lab/Pagination';
import webservice from '../../api/webservice';
import contractData from '../data/contractData';
import MenuIcon from '@material-ui/icons/Menu';
import anagraficaData from '../data/anagraficaData'
import { useHistory } from "react-router-dom";
import exportFromJSON from 'export-from-json'
import PersonIcon from '@material-ui/icons/Person';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    width:'20%',
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
  containerBox:{
    paddingLeft:'2%',
    marginTop:50,
    flex:1,
    flexWrap:'wrap',
    display:'flex',
    justifyContent:'flex-start'
  },

}))

export default() => {
  const fileName = "lista_contratti"
  const exportType = "csv"

  const history = useHistory()
  const { getContractList,deleteContract, getFullProgrammaReq,getClientList,clientList } = webservice()
  const { getContractListData, setNewContractData, setContractType,setContractActivity, setNewContractAcquisizione, removeActivity, setContractReferent, setNewContractType, setContractInvoice, setContractDocument, setNewUploadsData, getNewContractClientList } = contractData()
  const { setInterventoListData, getFullProgramma } = anagraficaData()
  const { getUserData,setDrawer, getCurrentPermission } = userData()

  //Activity button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));
  //originale Data contratti
  const [data,setData] = useState([])
  //Data contratti impaginato
  const [dataToPrint, setDataToPrint] = useState([])

  //Contratti selezionati per Esportazione
  const [selected,setSelected] = useState([])
  const handleSelect = (e) => {
    let joined = []
    let res = selected.filter(function(item){ return item.numero == e.numero }).length >0 ? true : false
    if (res  === false) {
      joined = [...selected,e]
    }else{
      joined = selected.filter( function(item) {
        return item.numero !== e.numero
      })
    }
    setSelected(joined)
  }
  const isSelected = (e) => {
    let res = selected.filter( function(item)  {return item.numero === e.numero} )
    return res.length > 0 ? true : false
  }

  //Pagination 
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    setDataToPrint( data.filter(e=>e.isSub == 0).slice( (value - 1) * 12, value * 12 ) )
  };
  const [ccList,setCcList] = React.useState([])

  
  //Retrieving contract list from database
  useEffect(() => {
    async function executedFirst(){
      setInterventoListData([])
      await getContractList(getUserData().Token)
      await getClientList(getUserData().Token)
      await getFullProgrammaReq(getUserData().Token)
      await delay(1000)
      setCcList( getNewContractClientList() )
      let final = []
      getContractListData().map( item => {
        if(item.account == getUserData().ID){
          final.push(item)
        }
      } )
      if( getUserData().Tipologia !== 'Cliente' ){
        setData( getContractListData().filter(ee=> ee.isSub === 0) );
        setDataToPrint(getContractListData().filter(ee=> ee.isSub === 0).slice(0,12) )
      }else{
        console.log( getContractListData().filter(ee=>parseInt(ee.cliente) == getUserData().ofCliente) )
        setData( getContractListData().filter(ee=>parseInt(ee.cliente) == getUserData().ofCliente && ee.isSub === 0) );
        setDataToPrint( getContractListData().filter(ee=>parseInt(ee.cliente) == getUserData().ofCliente && ee.isSub === 0).slice(0,12) )
      }
    }

    executedFirst()
    
  }, [])

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();
  const [remover,setRemover] = React.useState(false)

  const classes = useStyles();
  return (
    <div style={{display:'flex'}}>

      <Dialog
        open={remover}
        onClose={e=> setRemover(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box style={{textAlign:'center',}}>
            <Typography variant='h6' style={{borderBottomWidth:1,borderBottomColor:'#e8e8e8',borderBottomStyle:'solid',marginBottom:10}}>Rimozione Utente</Typography>
            <Typography variant='subtitle1' style={{textTransform:'capitalize'}}>I contratti selezionati verranno eliminati</Typography>
            <Typography variant='overline' style={{color:'#ff7a7a'}}>Questa azione e irriversibile!</Typography>
          </Box>
        </DialogTitle>
        <DialogActions>
          <Button className={classes.buttonDialog} onClick={e=>setRemover(false)}>
            Annulla
          </Button>
          <Button className={classes.buttonDialog} onClick={ async e => {
            e.preventDefault()
              await selected.map( async item => {
                let toRem={
                  token:getUserData().Token,
                  id:item.id
                }
               await deleteContract(toRem)
              } )
              await getContractList(getUserData().Token)
              await delay(1000)
              setRemover(false)
              window.location.reload(false);
              
              }}>
            Conferma 
          </Button>
        </DialogActions>
      </Dialog>

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
            <img style={{width:40,marginRight:30}}src={require('../../assets/images/lista-utenti/CONTRATTO.png')} />
            <Typography variant='h6' component='h2' style={{color:'#6A6A6A',margin:'auto 0'}}>LISTA CONTRATTI</Typography>
          </Box>
          <Box className={classes.toolBox} style={{width:'25%'}}>
                        
          <Grid container spacing={1} alignItems="flex-end">
            
            <Grid item style={{width:'70%'}}>
              <TextField variant="outlined" id="input-with-icon-grid" style={{width:'100%'}} onChange={ e => {
                let tmp = data.filter(e => e.isSub == 0 ) 
                tmp = tmp.filter( item => item.titolo.toLowerCase().includes(e.target.value.toLowerCase()) )
                setDataToPrint(tmp)
              } } inputProps={{
                style: {
                  height:0
                },
            }}/>
            </Grid>
            <Grid item>
              <SearchIcon style={{color:'#77ABE7'}}/>
            </Grid>
          </Grid>

            <Button className={classes.pulsanteAttivita} aria-controls="simple-menu" style={{backgroundColor:'transparent'}}aria-haspopup="true" onClick={handleClick}>
              Attivita'
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {getCurrentPermission() !== null && getCurrentPermission().nuovoContratto === true ? (
                <MenuItem onClick={e => {
                  e.preventDefault()
                  setNewContractData(null)
                  setNewContractAcquisizione(null)
                  setContractActivity('reset')
                  setContractReferent('reset')
                  setContractInvoice(null)
                  setNewContractType(null)
                  setNewUploadsData(null)
                  setContractDocument('reset')
                  history.push('/contratti/nuovoContratto')
                  }}>
                  <ListItemText primary="Nuovo Contratto" />
                </MenuItem> 
              ) : null}
                 
              <MenuItem onClick={  e=> {
                e.preventDefault()
                setRemover(true)
                
              }}>
                <ListItemText primary="Seleziona e Cancella" />
                <DeleteOutlineIcon style={{fontSize:16,color:'red'}}/>
              </MenuItem>
              <MenuItem onClick={ async e=> {
                e.preventDefault()
                let data = selected
                if (data.length > 0){
                  exportFromJSON({ data, fileName, exportType })
                }else{
                  alert("Seleziona dei contratti da esportare")
                }
              }}>
                <ListItemText primary="Esporta" />
                <DeleteOutlineIcon style={{fontSize:16,color:'red'}}/>
              </MenuItem>
            </Menu>
          </Box>
        </Container>
        <Container maxWidth="False" className={classes.containerMainBox}>
          <div className={classes.containerBox}>
            {dataToPrint.map(  (item) => {
              return <Contratto onClick={(e) => handleSelect(item)} selected={isSelected(item)} nome={ccList !== undefined && ccList.filter( cc => cc.id == item.cliente ).length > 0 ? ccList.filter( cc => cc.id == item.cliente )[0].rSociale : 'Caricamento...'} date={item.DataCrea} codice={item.numero} descrizione={item.descrizione} entire={item} tck={getFullProgramma()!==undefined && getFullProgramma() !== null ? getFullProgramma().filter(e => e.byContratto == item.id && e.stato == 'attivo') : null}></Contratto>
            })}
          </div>
          <Pagination style={{margin: '0 auto',width:'20%'}}count={1} page={page} onChange={handleChange} />

        </Container>

      </Container>
      
       
    </div>
  )
}
