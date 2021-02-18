import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import webservice from "../api/webservice";
import CircularProgress from '@material-ui/core/CircularProgress';
import "../App.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" style={{cursor:'pointer'}}onClick={()=> window.open("https://www.blendingweb.it", "_blank")}>
        Blending Software
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor:'#00ADA2',
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {

  const [email,setEmail] = useState("");
  const [psw,setPsw] = useState("");
  const classes = useStyles();
  const [loader,setLoader] = useState(false);
  //API CALLS
  const {errorHandle,login, sendPassword }= webservice()

  function renderSwitch(param) {
    switch(param) {
      case 9:
        return 'Utente bloccato';
      case 8:
        return 'Password scaduta';
      case 7:
        return 'Sistema in manutenzione!';
      case -1:
        return 'Errore durante la verifica delle credenziali';
      default:
        return null;
    }
  }

  //if (window.location.protocol !== 'https:') {
  //  window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
  //}

  const[status,toggleStatus] = React.useState(false)
  const[res,setRes] = React.useState(false)
  const [mailReset,setEmailReset] = React.useState('')

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {status !== true ? (<><Typography component="h1" variant="h5">
          Accedi
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={email}
            onChange={ (val) => setEmail(val.target.value) }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Indirizzo Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={psw}
            onChange={ (val) => setPsw(val.target.value) }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errorHandle == 0 ? true : false}
            helperText={errorHandle == 0 ? "Credenziali Errate" : null}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ricordami"
          />
          <p className="errorText" style={{ color:'red',textAlign:'center',margin:0,padding:0,fontSize:12 }}>{renderSwitch(errorHandle)}</p>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            {loader === true ? <CircularProgress color="secondary" /> : null}
          </div>
          {res === true ? ( <Typography style={{color:'#00ADA2',fontSize:'.6vw'}}>
            Email di recupero inviata
          </Typography> ) : null}
          <Button
            type="submit"
            onClick={ async (e) => {
              e.preventDefault();
              setLoader(true);
              await login(email,psw)
              setLoader(false);
            }}
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Accedi
          </Button>
          <Typography onClick={e=>toggleStatus(true)} style={{cursor:'pointer',textAlign:'center',color:'#898989'}}>Recupera Password</Typography>
            
        </form></>) : (<><Typography component="h1" variant="h5">
          Recupera Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={mailReset}
            onChange={ (val) => setEmailReset(val.target.value) }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Indirizzo Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <p className="errorText" style={{ color:'red',textAlign:'center',margin:0,padding:0,fontSize:12 }}>{renderSwitch(errorHandle)}</p>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            {loader === true ? <CircularProgress color="secondary" /> : null}
          </div>
          <Button
            type="submit"
            onClick={ async (e) => {
              e.preventDefault();
              setLoader(true);
              await sendPassword(mailReset)
              setRes(true)
              toggleStatus(false)
              setLoader(false);
            }}
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Invia Richiesta
          </Button>
          <Typography onClick={e=>toggleStatus(true)} style={{cursor:'pointer',textAlign:'center',color:'#898989'}}>Recupera Password</Typography>

        </form></>)}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
          );
}