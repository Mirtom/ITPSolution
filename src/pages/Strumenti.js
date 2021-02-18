import React, { useState,useEffect } from 'react'
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import EnhancedTable  from "./components/userTable"
import userData from './data/userData'
import contractData from './data/contractData'
import MenuIcon from '@material-ui/icons/Menu';
import webservice from '../api/webservice'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuItem from '@material-ui/core/MenuItem';
import { Box, Container, Grid, IconButton, TextField, Typography } from "@material-ui/core"
import exportFromJSON from 'export-from-json'
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import anagraficaData from './data/anagraficaData'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Autocomplete } from '@material-ui/lab'

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
  userTable:{
    marginTop:40
  },
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
  defBtn:{
    backgroundColor:'#e8e8e8',
    '&:hover':{
      background:'#898989  !important'
    }
  }
}))

function Strumenti({ navigation }) {
  const [TTarget,setTTarget] = React.useState(0)
  const [NNarget,setNNarget] = React.useState('')
    function handleTTValue(event,value){
        if(value !== null && value !== undefined){
          setTTarget(value)
        }
    }
  const [openT,setOpenT] = React.useState(false)

  //Data profile vars
  const { getUserContract,getUserList,userList, deleteUser,getTabTipoImpianti, getTipologieIntervento,createTipologiaIntervento,createTabImpianto, deleteTipologieIntervento } = webservice()
  const { getUserData,setNewUserData, setDrawer } = userData();
  const { getTabImpianti } = contractData()
  const { getTipoI } = anagraficaData()

  const delay = ms => new Promise(res => setTimeout(res, ms));
  const history = useHistory();
  
    //Activity button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const [selected,setSelected] = React.useState()

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#f3f3f3',
      color: '#000',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#fdfdfd',
      },
    },
  }))(TableRow);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const [tableData,setTableData] = React.useState([])
  useEffect(() => {
    const initialSetup = async () => {
      await getTipologieIntervento('dd')
      await getTabTipoImpianti('dd')
      setTableData(getTipoI())
    }
    initialSetup()
  }, [])

  function printName(t){
    if( getTabImpianti() !== null ){
      let name =  getTabImpianti().filter(item => item.id == t)[0].Descr 
      return name

    }
  }
  
  
  const classes = useStyles();
  const [openD,setOpenD] = React.useState(false)
  const [openC,setOpenC] = React.useState(false)
  const [currentToRemove,setCurrentToRemove] = React.useState(0)
  const [NCType,setNCType] = React.useState('')
  const handleCloseD = () => {
    setOpenD(false)
  }

  return (
    <div style={{display:'flex'}}>
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box style={{textAlign:'center',}}>
            <Typography variant='h6' style={{borderBottomWidth:1,borderBottomColor:'#e8e8e8',borderBottomStyle:'solid',marginBottom:10}}>Rimozione Tipologia Intervento</Typography>
            <Typography variant='subtitle1' style={{textTransform:'capitalize'}}>La Tipologia con ID {currentToRemove} verrà eliminato</Typography>
            <Typography variant='overline' style={{color:'#ff7a7a'}}>Questa azione e irriversibile!</Typography>
          </Box>
        </DialogTitle>
        <DialogActions>
          <Button className={classes.buttonDialog} onClick={handleCloseD}>
            Annulla
          </Button>
          <Button className={classes.buttonDialog} onClick={ async e => {
              e.preventDefault()
              let toRem = {
                token: getUserData().Token,
                id:currentToRemove
              }
              await deleteTipologieIntervento(toRem)
              await delay(500)
              const initialSetup = async () => {
                await getTipologieIntervento('dd')
                setTableData(getTipoI())
              }
              initialSetup()
              handleCloseD()
              forceUpdate()
              }}>
            Conferma 
          </Button>
        </DialogActions>
      </Dialog>
      {/* HANDLE MAIN-TYPES */}
      <Dialog open={openC} onClose={e => setOpenC(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Aggiungi Tipologie Contratti</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Devi Inserire il nome della tipologia contratto
            </DialogContentText>
          <TextField
            value={NCType}
            onChange={e=>setNCType(e.target.value)}
            margin="dense"
            id="NCNome"
            label="Inserisci il Nome"
            type="text"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenC(false)} className={classes.defBtn} variant={'outlined'}>
            Annulla
          </Button>
          <Button disabled={ NCType!== '' ? false : true } className={classes.defBtn} onClick={ async e => {
            e.preventDefault()
            let toUp = {
              token:'dd',
              nome:NCType
            }
            await createTabImpianto(toUp)
            await delay(500)
            setOpenC(false)
            window.location.reload(false)
          } }>
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>

      {/* HANDLE TYPES */}
      <Dialog open={openT} onClose={e => setOpenT(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Aggiungi Tipologie Interventi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Devi selezionare la tipologia di contratto ed inserire il nome della tipologia d'intervento
            </DialogContentText>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              options={getTabImpianti()}
              getOptionLabel={(option) => option.Descr}
              onChange={handleTTValue}
              renderInput={(params) => <TextField {...params} label="Seleziona Tipologia Contratto" variant="outlined" />}
            />
          <TextField
            value={NNarget}
            onChange={e=>setNNarget(e.target.value)}
            margin="dense"
            id="pswN"
            label="Inserisci il Nome"
            type="text"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenT(false)} className={classes.defBtn} variant={'outlined'}>
            Annulla
          </Button>
          <Button disabled={ TTarget!== 0 && NNarget!== '' ? false : true } className={classes.defBtn} onClick={ async e => {
            e.preventDefault()
            let toUp = {
              token:'dd',
              byTipologia:TTarget.id,
              nome:NNarget
            }
            await createTipologiaIntervento(toUp)
            setOpenT(false)
            window.location.reload(false)
          } }>
            Aggiungi
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
              <Box style={{display:'flex',justifyContent:'space-around',width:'8%'}}>
              <Typography style={{color:'white',fontSize:'.6vw',margin:'auto 0', letterSpacing:'.1em'}}>{ getUserData() !== undefined ? getUserData().Nome + ' ' + getUserData().Cognome : '' }</Typography>
              <PersonIcon style={{height:32,color:'white'}} />
            </Box>
          </Container>
          <Container maxWidth="False" className={classes.toolBar}>
          <Box style={{display:'flex'}}>
            <PeopleOutlineIcon style={{fontSize:40,marginRight:30,color:'#77ABE7'}} />
            <Typography variant='h6' component='h2' style={{color:'#6A6A6A',margin:'auto 0'}}>STRUMENTI</Typography>
          </Box>
          <Box className={classes.toolBox} style={{width:'10%'}}>

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
              <MenuItem onClick={async e => {
                e.preventDefault()
                setOpenT(true)
              }}>
                <ListItemText primary="Aggiungi Tipologia Intervento" />
                
              </MenuItem>
              <MenuItem onClick={async e => {
                e.preventDefault()
                setOpenC(true)
              }}>
                <ListItemText primary="Aggiungi Tipologia Contratto" />
                
              </MenuItem>

            </Menu>
          </Box>
        </Container>
        <Container maxWidth="False" className={classes.userTable}>
         
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead style={{background:'#F8F8F8 !important'}}>
              <TableRow>
              <StyledTableCell align="left">Nome</StyledTableCell>
                <StyledTableCell align="center">Tipo Impianto</StyledTableCell>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getTipoI() !== null ? (
                getTipoI().map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="left">{row.Nome}</StyledTableCell>
                    <StyledTableCell align="center">{printName(row.bytipologia)}</StyledTableCell>
                    <StyledTableCell align="left">{row.id}</StyledTableCell>
                    <StyledTableCell align="right"><IconButton className={classes.defBtn} onClick={ e => {
                      e.preventDefault()
                      setCurrentToRemove(row.id)
                      setOpenD(true)
                    } }><DeleteOutlineIcon /></IconButton></StyledTableCell>
                  </StyledTableRow>
                ))
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>

        </Container>

      </Container>
      
       
    </div>
  )
}

export default Strumenti
