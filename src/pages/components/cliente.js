import React, { useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { Box } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import clientData from '../data/clientData';


const useStyles = makeStyles({
    cardStyle: {
      width:'18%',
      paddingLeft:'.5%',
      paddingRight:'2%',
      paddingTop:'1%',
      marginBottom:'5%',
      marginRight:'2%',
      marginLeft:'2%',
      borderRadius:10,
      paddingBottom:'.5%'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      color:'#808080',
      fontSize: 14,
      letterSpacing:'.05em',
    },
    subTitle:{
        fontWeight:'bold',
        color:'black',
    },
    status: {
      marginBottom: 12,
      color:'#808080',
      fontSize:13
    },
    codiceImpianto:{
        color:'#333',
        cursor:'pointer',
        fontSize:'1.2vw',
        textTransform:'capitalize',

    },
    contrattoMainImg: {
        width:24,
        padding:5,
        marginRight:20,
        border:'1px solid #77ABE7',
        borderRadius:8,
        cursor:'pointer'
    },
    imageContainer:{
      paddingLeft:16,
      width:'100%',
      marginLeft:'.5%',
      flexDirection:'row',
      display:'flex',
      justifyContent:'flex-start',
  },
    contrattoSet:{
      height:24,
        padding:5,
        marginRight:20,
        borderRadius:8,
        cursor:'pointer',
        paddingBottom:10,
        paddingTop:2,
        paddingLeft:3,
        paddingRight:3,
        fontWeight:'bold',
      width:30
    }
  });

const Cliente = ({ selected,nome, codice, descrizione,onClick,entire,tck  }) => {

    const zeroPad = (num, places) => String(num).padStart(places, '0')
    const history = useHistory();
    //Setting single contract to view anagrafica
    const { setClientData } = clientData()
    const classes = useStyles();
    let border = selected === true ? '2px solid #00ADA2' : 'none'

    return (
        <Card className={classes.cardStyle} style={{border:border,display:'flex',flexDirection:'column',justifyContent:'space-between'}} variant="outlined">
      <CardContent>
        <Box style={{display:'flex',justifyContent:'space-between'}}>
          <Typography className={classes.title} gutterBottom>
            Codice Cliente: <span className={classes.subTitle}>{zeroPad(codice, 5)}</span>
          </Typography>
          <img style={{float:'right',width:16,height:16}}src={require('../../assets/images/listContratti/contrattoAttivo.png')} />
        </Box>
          <Typography variant="h3" component="h1" className={classes.codiceImpianto} onClick={ (e) => {
              setClientData(entire)
              history.push('/clienti/home')
              window.location.reload(true)
          } }>
            {nome}
          </Typography>
      </CardContent>
      <Box style={{display:'flex'}}>
        <Box className={classes.imageContainer}>
          {/*<Typography variant={'h6'} className={classes.contrattoSet} style={{background:'#FFECE2',color:'#c58a8a'}}>Cm</Typography>*/}
          {/*<Typography variant={'h6'} className={classes.contrattoSet} style={{background:'#E7F2FC',color:'#4295b5'}}>Ma</Typography> */}
          {tck.length >0 ? <Typography variant={'h6'} className={classes.contrattoSet} style={{background:'#FCF0FC',color:'#aa61c1'}}>Tk</Typography> : null }
          </Box>
          
        <Box className={classes.checkContainer} >
          <Checkbox onClick={onClick} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
        </Box>
      </Box>
    </Card>
    )
}

export default Cliente

