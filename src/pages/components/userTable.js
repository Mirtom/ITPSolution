import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import userData from '../data/userData';
import webservice from '../../api/webservice';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import exportFromJSON from 'export-from-json'
import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Button, Menu, MenuItem, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import InfoAccount from '../InfoAccount';
import InfoIcon from '@material-ui/icons/Info';
import EditAccount from '../EditAccount';
import ClearIcon from '@material-ui/icons/Clear';


var userToDown = [];
function createData(name, tipologia, societa, ruolo, infobar, editbar) {
  return { name, tipologia, societa, ruolo, infobar, editbar };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Nome - Cognome' },
  { id: 'tipologia', numeric: false, disablePadding: false, label: 'Tipologia' },
  { id: 'societa', numeric: false, disablePadding: false, label: 'Società' },
  { id: 'ruolo', numeric: false, disablePadding: false, label: '' },
  { id: 'infobar', numeric: false, disablePadding: false, label: '' },
  { id: 'editbar', numeric: false, disablePadding: false, label: '' },

];

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  selectedFilter:{
      flex:'1 1 100%'
  },
  title: {
    color: '#4ba66e',
    fontWeight: 'bold',
    letterSpacing: '.05em',
    marginRight:15
  },
  subTitle: {
    color: '#3a3737',
    fontWeight: 'bold',
    fontSize: '12',
    margin: 'auto 0',
    cursor:'pointer',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, maxSelected } = props;
  const { getSelectedUser } = userData();
  const [redirectPersonal, setRedirect] = useState(false)
  const fileName = 'lista_utenti'
        const exportType = 'csv' 

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.selectedFilter} color="inherit" variant="subtitle1" component="div">
          {numSelected} Selezionato/i
        </Typography>
      ) : (
          <div style={{display:'flex'}}>
            
              
            
          </div>
        
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  maxSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background:'#F8F8F8',
  },
  paper: {
    background:'#F8F8F8',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  userImages: {
      height:18,
      cursor:'pointer'
  },
  counter:{
    marginLeft:5,
    marginRight:30,
    fontSize:12
  },
  buttonDialog:{
    '&:hover':{
      background:'transparent !important',
      color:'#909090'
    }
  },
  lightB:{
    '&:hover':{
      background:'#eaf8fb !important'
    }
  },
  lightR:{
    '&:hover':{
      background:'#f9e2d8 !important'
    }
  }
}));

const EnhancedTable = ({setToExp,userF}) => {
  console.log( userF )

  const [openD, setOpenD] = React.useState(false);
  const [target, setTarget] = React.useState([])
  const [ targetID,setTargetID ] = React.useState(0)
  const [ openSnackDelete, setOpenSnackDelete ] = React.useState(false)

  //FILTERS
  const [rows,setRows] = React.useState([])
  const [started,setStarted] = React.useState(false)
//TIPOLOGIA FILTER ZONE
const [anchorElT, setAnchorElT] = React.useState(null);

const handleClickT = (event) => {
  setAnchorElT(event.currentTarget);
};

const handleCloseT = () => {
  setAnchorElT(null);
};
function filterPrioritaT(type){
  var toSet = []
  let tmp = userList.filter( current => current.Tipologia === type )
  toSet = tmp.map( (item) => (createData((item.Nome + ' ' + item.Cognome), item.Tipologia, item.Societa, item.Ruolo, 'Contratto', 'icone icone')) )
  setStarted(true)
  setRows(toSet)
  //forceUpdate()

  handleCloseT()
}

//SOCIETA FILTER ZONE
const [anchorElP, setAnchorElP] = React.useState(null);

const handleClickP = (event) => {
  setAnchorElP(event.currentTarget);
};

const handleCloseP = () => {
  setAnchorElP(null);
};

function filterPrioritaP(type){
  var toSet = []
  let tmp = userList.filter( current => current.Societa === type )
  toSet = tmp.map( (item) => (createData((item.Nome + ' ' + item.Cognome), item.Tipologia, item.Societa, item.Ruolo, 'Contratto', 'icone icone')) )
  setStarted(true)
  setRows(toSet)
  handleCloseP()
}

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseSnackDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackDelete(false);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  const history = useHistory();

  function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }
  //F update
  let forceUpdate =  useForceUpdate()
  //Data profile vars

  //Data profile vars
  const { getUserData,
          setSelectedUser,
          getUserContractData } = userData();
  //API
  const { errorHandle, getUserList, userList, deleteUser, getUserPermissionEdit } = webservice()
  const [userListCP,setUserListCP] = React.useState()
  //Get user list
  useEffect( () => {
    if(getUserData() === null ){
      history.push('/')
    }else{
      async function fetchMyAPI() {
        await getUserList(getUserData().Token);
        await delay(1000)
        setUserListCP(userList)
        forceUpdate()
      }  
    
      fetchMyAPI();
    }
  }, [])
        
    

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = [7];
  userToDown = selected;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      const newSelectedsToDown = (rows);
      setSelectedUser(newSelectedsToDown)
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  if(userList != undefined && started !== true){
    userList.map( (item) => rows.push(createData((item.Nome + ' ' + item.Cognome), item.Tipologia, item.Societa, item.Ruolo, 'Contratto', 'icone icone')) )
    setStarted(true)
  }
  const [flagInfo,setFlagInfo] = React.useState(false)
  const [infoItem, setInfoItem] = React.useState([])
  const [contractInfo, setContractInfo] = React.useState([])
  const [flagEdit,setFlagEdit] = React.useState(false)
  const [editItem,setEditItem] = React.useState([])

  function findNumContract(id){
    let tmp = getUserContractData().filter(item => item.isSub === 0)
    let fin = 0
    tmp.map( item => {
      let accounts = item.account.split(',')
      accounts.map( cc => {
        if(cc == id){
          fin = fin + 1
        }
      } )
    } )
    return fin
  }
  return (
    
    <div className={classes.root}>

      <InfoAccount flag={flagInfo} handleClose={ e=> setFlagInfo(false)} item={infoItem} contract={contractInfo}/>
      <EditAccount flag={flagEdit} handleClose={ e=> setFlagEdit(false)} item={editItem} sendRef={ e => window.location.reload(false) }/>

      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box style={{textAlign:'center',}}>
            <Typography variant='h6' style={{borderBottomWidth:1,borderBottomColor:'#e8e8e8',borderBottomStyle:'solid',marginBottom:10}}>Rimozione Utente</Typography>
            <Typography variant='subtitle1' style={{textTransform:'capitalize'}}>L'utente {target.name} verrà eliminato</Typography>
            <Typography variant='overline' style={{color:'#ff7a7a'}}>Questa azione e irriversibile!</Typography>
          </Box>
        </DialogTitle>
        <DialogActions>
          <Button className={classes.buttonDialog} onClick={handleCloseD}>
            Annulla
          </Button>
          <Button className={classes.buttonDialog} onClick={ async e => {
              await deleteUser(getUserData().Token,parseInt(targetID))
              setOpenSnackDelete(true)
              handleCloseD()
              await getUserList(getUserData().Token);
              await delay(500)
              forceUpdate()
              window.location.reload(false)
              }}>
            Conferma 
          </Button>
        </DialogActions>
      </Dialog>

      <Paper className={classes.paper}>
        {/*<EnhancedTableToolbar numSelected={selected.length}/>*/}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                  <TableCell>
                  <Typography className={classes.filterText} >Nome</Typography>
                  </TableCell>
                  <TableCell>
                    <Box className={classes.singleColumn} style={{width:'5%',display:'flex'}}>
                      <Typography className={classes.filterText} onClick={handleClickT} style={{cursor:'pointer'}}>Tipologia</Typography>
                      <ClearIcon onClick={ e => {
                        e.preventDefault()
                        let toSet = userList.map( (item) => (createData((item.Nome + ' ' + item.Cognome), item.Tipologia, item.Societa, item.Ruolo, 'Contratto', 'icone icone')) )
                        setStarted(true)
                        setRows(toSet)
                      } } style={{color:'#898989',cursor:'pointer'}}/>
                    </Box>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorElT}
                      keepMounted
                      open={Boolean(anchorElT)}
                      onClose={handleCloseT}
                      getContentAnchorEl={null}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                      transformOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                      <MenuItem onClick={ e => filterPrioritaT('Utente')}>Utente</MenuItem>
                      <MenuItem onClick={ e => filterPrioritaT('Cliente')}>Cliente</MenuItem>
                      <MenuItem onClick={ e => filterPrioritaT('Admin')}>Admin</MenuItem>
                      <MenuItem onClick={ e => filterPrioritaT('Superadmin')}>SuperAdmin</MenuItem>
                      <MenuItem onClick={ e => filterPrioritaT('Master')}>Master</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell>
                    <Box className={classes.singleColumn} style={{width:'5%',display:'flex'}}>
                      <Typography className={classes.filterText} onClick={handleClickP} style={{cursor:'pointer'}}>Società</Typography>
                      <ClearIcon onClick={ e => {
                        e.preventDefault()
                        let toSet = userList.map( (item) => (createData((item.Nome + ' ' + item.Cognome), item.Tipologia, item.Societa, item.Ruolo, 'Contratto', 'icone icone')) )
                        setStarted(true)
                        setRows(toSet)
                      } } style={{color:'#898989',cursor:'pointer'}}/>
                    </Box>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorElP}
                      keepMounted
                      open={Boolean(anchorElP)}
                      onClose={handleCloseP}
                      getContentAnchorEl={null}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                      transformOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                      {userList !== undefined && userList !== null ? (
                        userList.map( cUser => {
                          return <MenuItem onClick={ e => filterPrioritaP(cUser.Societa)}>{cUser.Societa}</MenuItem>
                        } )
                      ) : null}
                    </Menu>
                  </TableCell>
                  <TableCell>
                  <Typography className={classes.filterText} >Posizione</Typography>
                  </TableCell>
                  </TableRow>
            </TableHead>
            <TableBody>
              {getUserContractData() != null && getUserContractData() != undefined ? (
                stableSort(userF.length > 0 ? userF : rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  var rowS = row
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`
                  let tmpValue = userList.filter( item => (item.Nome + ' ' + item.Cognome) === row.name )
                  let id=(userList!== undefined && userList.filter(e => ((e.Nome + ' ' + e.Cognome) === row.name) )[0]!== undefined ? userList.filter(e => ((e.Nome + ' ' + e.Cognome) === row.name) )[0].id.toString() : null) 
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={rowS.name}
                      style={{background:'white',marginTop:15}}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => { 
                            handleClick(event, rowS.name)
                            setToExp(id)
                          }}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="">{rowS.name}</TableCell>
                      <TableCell align="">{rowS.tipologia}</TableCell>
                      <TableCell align="">{rowS.societa}</TableCell>
                      <TableCell align="">{rowS.ruolo}</TableCell>
                      <TableCell align="" > 
                          <div style={{display:'flex',justifyContent:'space-between',width:50,alignItems:'center'}}>
                            <img className={classes.userImages} src={require("../../assets/images/lista-utenti/CONTRATTO.png")} />
                            <Typography className={classes.counter} style={{color:'#65a1fd'}}variant='subtitle1'>{findNumContract(id)}</Typography>
                            <img className={classes.userImages} src={require("../../assets/images/lista-utenti/contrattoAsset.png")} />
                            <Typography className={classes.counter} style={{color:'#d2d2d2'}}variant='subtitle1'>0</Typography>
                            
                          </div> 
                      </TableCell>
                      <TableCell align="">
                          <div style={{display:'flex',justifyContent:'space-between',width:50}}>
                            <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#DBF1F5',borderRadius:7,marginRight:15}} onClick={e=> {
                              
                              async function initialize(){
                                setEditItem(tmpValue[0])
                                await getUserPermissionEdit('dd',tmpValue[0].id)
                                forceUpdate()
                              await delay(1000)
                              setFlagEdit(true)
                              forceUpdate()
                              }
                              initialize()
                              
                            }}>
                              <img className={classes.userImages} src={require("../../assets/images/lista-utenti/pencil.png")} />
                            </IconButton>
                            <IconButton className={classes.lightB} style={{width:30,height:30,backgroundColor:'#DBF1F5',borderRadius:7,marginRight:15}} onClick={ee =>{
                              setFlagInfo(true)
                              setInfoItem(tmpValue[0])
                                setContractInfo( getUserContractData().filter(item => item.isSub === 0) )
                              }}>
                              <InfoIcon style={{color:'#65a1fd',fontSize:18}}/>
                            </IconButton>
                            <IconButton className={classes.lightR} style={{width:30,height:30,backgroundColor:'#F9D3C1',borderRadius:7}}>
                              <img onClick={e => {
                                setTarget(row)
                                setTargetID(id)
                                handleClickOpenD()
                              }}className={classes.userImages}  src={require("../../assets/images/lista-utenti/delete.png")} /> 
                            </IconButton>
                          </div> 
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : null}
              {emptyRows > 0 && (
                <TableRow style={{ height: 3 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={10}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
      <Snackbar open={openSnackDelete} autoHideDuration={3000} onClose={handleCloseSnackDelete}>
        <Alert onClose={handleCloseSnackDelete} severity="error">
          Utente Rimosso con successo!
        </Alert>
    </Snackbar>
      {errorHandle == -1 ? <Redirect to='/' /> : null}
    </div>
  );
}

export default withRouter(EnhancedTable)
