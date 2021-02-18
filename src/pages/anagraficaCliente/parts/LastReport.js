import { Box, Typography } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import userData from '../../data/userData';
import webservice from '../../../api/webservice';
import anagraficaData from '../../data/anagraficaData';

const useStyles = makeStyles((theme) => ({
    imgSTD:{
        width:32,
        margin:'0 auto'
    },
    mainBox:{
        paddingLeft:20,
        width:'20%',
        marginTop:'1%',
        marginBottom:'.5%',
    },
    mainText:{
        color:'#535353',
        fontWeight:'bold',
        marginBottom:15
    },
    subText:{
        color:'#B5B5B5',
    },
    topSideColumn:{
        marginTop:20,
        marginBottom:10
    },
    infoText:{
        marginTop:5,
        color:'#4D8AFF'
    },
    bottomInfoMAIN:{
        fontWeight:'bold',
        color:'#535353'
    },
    bottomSide:{
        paddingTop:15,
        paddingBottom:15,
        borderTopWidth:2,
        borderBottomWidth:2,
        borderTopStyle:'solid',
        borderBottomStyle:'solid',
        borderTopColor:'#e8e8e8',
        borderBottomColor:'#e8e8e8',
        display:'flex',
        justifyContent:'space-around',
        marginTop:'10%'
    }
}))

const LastReport = ({dataReport}) => {

    console.log(dataReport)

    const classes = useStyles();

    function swipeDate(date){
        let temp = date.split('-')
        return ( temp[2] + '-' + temp[1] + '-' + temp[0] )
    }

    return(
        <>
        <Box className={classes.mainBox}>
            <Box className={classes.topSide}>
                <Typography variant='h5' className={classes.mainText}>ULTIMO REPORT</Typography>
                <Box className={classes.topSideColumn}>
                    <Typography variant='h7' className={classes.subText}>Tempo di Intervento</Typography>
                    <Typography variant='h5' className={classes.infoText}>{dataReport.interventi === null ? 'In corso...' : 'Non specificato'}</Typography>
                </Box>
                <Box className={classes.topSideColumn}>
                    <Typography variant='h7' className={classes.subText}>Anomalie riscontrate negli Asset</Typography>
                    <Typography variant='h5' className={classes.infoText} style={{color:'red'}}>{dataReport.interventi === null ? 'In corso...' : dataReport.interventi}</Typography>
                </Box>
            </Box>
            <Box className={classes.bottomSide}>
                <Box style={{textAlign:'center',width:'49.5%',borderRightColor:'#e8e8e8',borderRightWidth:2,borderRightStyle:'solid'}}>
                    <Typography className={classes.bottomInfoMAIN} variant='overline' >ID</Typography>
                    <Typography variant='h5' className={classes.infoText} style={{color:'#0CA589'}}>INT. {dataReport.id}</Typography>
                </Box>

                <Box style={{textAlign:'center',width:'49.5%'}}>
                    <Typography className={classes.bottomInfoMAIN} variant='overline' >Creato il</Typography>
                    <Typography variant='h5' className={classes.infoText} style={{color:'#B5B5B5'}}>{ dataReport.created !== null && dataReport.created !== undefined ? swipeDate((dataReport.created).split('T')[0]) : null }</Typography>
                
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default LastReport
