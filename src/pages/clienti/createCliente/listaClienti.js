import React, { useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../../components/Sidebar"
import { Box, Container, Grid, TextField, Typography } from "@material-ui/core"
import userData from '../../data/userData'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Contratto from '../../components/contratto'
import SearchIcon from '@material-ui/icons/Search';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Pagination from '@material-ui/lab/Pagination';
import webservice from '../../../api/webservice';
import contractData from '../../data/contractData';
import MenuIcon from '@material-ui/icons/Menu';
import anagraficaData from '../../data/anagraficaData'
import Cliente from '../../components/cliente'
import { useHistory } from "react-router-dom";
import clientData from '../../data/clientData'
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
    width:'15%',
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
  const history = useHistory()
  const { getClientList, getContractList,deleteClient,getFullProgrammaReq } = webservice()
  const { getNewContractClientList, getContractListData } = contractData()
  const { setNewClientData,setContactReferent,setClientReferent,setClientData } = clientData()
  const { getUserData,setDrawer, getCurrentPermission } = userData()
  const { setInterventoListData, getFullProgramma } = anagraficaData()
  //Activity button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));
  //originale Data clienti
  const [data,setData] = useState([])
  //Data clienti impaginato
  const [dataToPrint, setDataToPrint] = useState([])

  //Contratti selezionati per Esportazione
  const [selected,setSelected] = useState([])
  const handleSelect = (e) => {
    let joined = []
    let res = selected.filter(function(item){ return item.id == e.id }).length >0 ? true : false
    if (res  === false) {
      joined = [...selected,e]
    }else{
      joined = selected.filter( function(item) {
        return item.id !== e.id
      })
    }
    console.log(joined)
    setSelected(joined)
  }
  const isSelected = (e) => {
    let res = selected.filter( function(item)  {return item.id === e.id} )
    return res.length > 0 ? true : false
  }

  //Pagination 
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    console.log(value)
    setDataToPrint( data.slice( (value - 1) * 12, value * 12 ) )
  };

  
  //Retrieving contract list from database
  useEffect(() => {
    async function executedFirst(){
      await getClientList(getUserData().Token)
      await getContractList(getUserData().Token)
      await getFullProgrammaReq(getUserData().Token)
      await setInterventoListData([])
      await delay(1000)
      if( getUserData().Tipologia !== 'Cliente' ){
        setData( getNewContractClientList() );
        setDataToPrint(getNewContractClientList())
      }else{
        setData( getNewContractClientList().filter(ee=>ee.id == getUserData().ofCliente) );
        setDataToPrint( getNewContractClientList().filter(ee=>ee.id == getUserData().ofCliente) )
      }

    }
    executedFirst()
  }, [])

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();
  console.log(data)
  const classes = useStyles();
  const [remover,setRemover] = React.useState(false)
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
            <Typography variant='subtitle1' style={{textTransform:'capitalize'}}>I clienti selezionati verranno eliminati</Typography>
            <Typography variant='overline' style={{color:'#ff7a7a'}}>Questa azione e irriversibile!</Typography>
          </Box>
        </DialogTitle>
        <DialogActions>
          <Button className={classes.buttonDialog} onClick={e=>setRemover(false)}>
            Annulla
          </Button>
          <Button className={classes.buttonDialog} onClick={ async e => {
              e.preventDefault()
              selected.map(async client => {
                let tosend ={
                  token:getUserData().Token,
                  id:client.id
                }
                console.log(tosend)
                await deleteClient(tosend)
                await delay(1000)
              })
              await delay(500)
              window.location.reload(false)
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
            <img style={{width:40,marginRight:40}}src={require('../../../assets/images/lista-utenti/CONTRATTO.png')} />
            <Typography variant='h6' component='h2' style={{color:'#6A6A6A',margin:'auto 0'}}>LISTA CLIENTI</Typography>
          </Box>
          <Box className={classes.toolBox} style={{width:'25%'}}>

          <Grid container spacing={1} alignItems="flex-end">
            
            <Grid item style={{width:'70%'}}>
              <TextField variant="outlined" id="input-with-icon-grid" style={{width:'100%'}} onChange={ e => {
                let tmp = data 
                tmp = tmp.filter( item => item.rSociale.toLowerCase().includes(e.target.value.toLowerCase()) )
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
              {getCurrentPermission() !== null && getCurrentPermission().nuovoCliente === true ? (
                <MenuItem onClick={ e => {
                  setNewClientData(null)
                  setClientReferent('reset')
                  setContactReferent('reset')
                  history.push('/clienti/nuovoCliente')
                  }}>
                  <ListItemText primary="Nuovo Cliente" />
                </MenuItem>
              ) : null }
              
              <MenuItem onClick={e=> {
                e.preventDefault()
                setRemover(true)
              }}>
                <ListItemText primary="Seleziona e Cancella" />
                <DeleteOutlineIcon style={{fontSize:16,color:'red'}}/>
              </MenuItem>
            </Menu>
          </Box>
        </Container>
        <Container maxWidth="False" className={classes.containerMainBox}>
          <div className={classes.containerBox}>
            {console.log(dataToPrint,getUserData())}
          {dataToPrint.map(  (item) => {

          let tmp = getContractListData().filter( cc => cc.cliente == item.id )
          let fin = []
          if(tmp.length > 0){
            getFullProgramma().map( ff => {
              tmp.map( cc => {
                if(ff.byContratto == cc.id){
                  fin.push(ff)
                }
              } )
            } )
          }

              return <Cliente onClick={(e) => handleSelect(item)} selected={isSelected(item)} nome={item.rSociale} codice={item.id} entire={item} tck={fin}></Cliente>
            })}
          </div>
          <Pagination style={{margin: '0 auto',width:'20%'}}count={1} page={page} onChange={handleChange} />

        </Container>

      </Container>
      
       
    </div>
  )
}
