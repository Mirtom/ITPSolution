import React, { useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import EnhancedTable  from "./components/userTable"
import userData from './data/userData'
import MenuIcon from '@material-ui/icons/Menu';
import webservice from '../api/webservice'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuItem from '@material-ui/core/MenuItem';
import { Box, Container, Grid, TextField, Typography } from "@material-ui/core"
import exportFromJSON from 'export-from-json'
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
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
}))

function Dashboard({ navigation }) {

  //Data profile vars
  const { getUserContract,getUserList,userList, deleteUser } = webservice()
  const { getUserData,setNewUserData, setDrawer, getCurrentPermission } = userData();

  const delay = ms => new Promise(res => setTimeout(res, ms));
  const history = useHistory();

  useEffect(() => {
    if(getUserData() === null){
      history.push('/')
    }else{
      setNewUserData(null)
      const initialData = async () => {
      await getUserContract(getUserData().Token)
      await getUserList(getUserData().Token)
      await delay(1000)
    }
    console.log( 'FFFFF',getCurrentPermission() )
    initialData()
    }
    
    
  }, [])
  
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

  const classes = useStyles();
  const [selected,setSelected] = React.useState()

  //ToDownload
  function insertArr( id ){
    
    let tmp
    if(selected == undefined){
      tmp = [id]
    }else{
      tmp = selected
      let tt = tmp.filter( item => item === id )
      if(tt.length > 0){
        tmp = tmp.filter( item => item !== id )
      }else{
        tmp.push(id)
      }
      
    }
    setSelected(tmp)
  }
  const fileName = "lista_utenti"
  const exportType = "csv"

  const [userFound,setUserFound] = React.useState([])

  function createData(name, tipologia, societa, ruolo, infobar, editbar) {
    return { name, tipologia, societa, ruolo, infobar, editbar };
  }

  return (
    <div style={{display:'flex'}}>

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
            <Typography variant='h6' component='h2' style={{color:'#6A6A6A',margin:'auto 0'}}>LISTA UTENTI</Typography>
          </Box>
          <Box className={classes.toolBox} style={{width:'25%'}}>
            
          <Grid container spacing={1} alignItems="flex-end">
            
            <Grid item style={{width:'70%'}}>
              <TextField variant="outlined" id="input-with-icon-grid" style={{width:'100%'}} onChange={ e => {
                e.preventDefault()
                let tmp = userList.filter( cc => cc.Nome.toLowerCase().includes(e.target.value.toLowerCase()) || cc.Cognome.toLowerCase().includes(e.target.value.toLowerCase()) )
                let toSearch = []
                tmp.map( item => toSearch.push(createData((item.Nome + ' ' + item.Cognome), item.Tipologia, item.Societa, item.Ruolo, 'Contratto', 'icone icone')) )
                console.log(toSearch,tmp)
                setUserFound(toSearch)
                forceUpdate()
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
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              onClose={handleClose}
            >
              <MenuItem onClick={e => history.push('/dashboard/newuser')}>
                <ListItemText primary="Aggiungi Utente" />
                    
              </MenuItem>
              <MenuItem onClick={async e => {
                e.preventDefault()
                if(selected.length > 0){
                  selected.map( async user => {
                    await deleteUser(getUserData().Token,parseInt(user))
                    await delay(100)
                  })
                  await getUserList(getUserData().Token);
                  await delay(500)
                  forceUpdate()
                  window.location.reload(false)
                }else{
                  alert("Seleziona degli utenti da eliminare")
                }
              }}>
                <ListItemText primary="Seleziona ed Elimina" />
                
              </MenuItem>
              <MenuItem onClick={e => {
                e.preventDefault()
                let data = []
                userList.map( user => {
                  selected.map( cc => {
                    if(user.id == cc){
                      let tmp = user
                      delete tmp.Psw
                      delete tmp.Token
                      delete tmp.TokenScad
                      data.push(tmp)
                    }
                  } )
                } )
                if (data.length > 0){
                  exportFromJSON({ data, fileName, exportType })
                }else{
                  alert("Seleziona degli utenti da esportare")
                }
                
              }}>
                <ListItemText primary="Esporta" />
                
              </MenuItem>

            </Menu>
          </Box>
        </Container>
        <Container maxWidth="False" className={classes.userTable}>
          <EnhancedTable setToExp={ e => insertArr(e) } userF={userFound}></EnhancedTable>
        </Container>

      </Container>
      
       
    </div>
  )
}

export default Dashboard
