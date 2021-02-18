import React, { useEffect,useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Avatar, Box, Button, Container, Divider, IconButton, Typography } from "@material-ui/core"

import { useHistory } from "react-router-dom";

import userData from '../../data/userData';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import webservice from '../../../api/webservice';

const useStyles = makeStyles((theme) => ({
    mainBox:{
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:'50px',
        paddingRight:'50px',
        paddingBottom:50,
        paddingTop:'40px',
    },
    leftTab:{
        width:'50%',
    },
    tabUpperBox:{
        display:'flex',
        marginBottom:20
    },
    tabHeader:{
        color:'#333',
        fontWeight:'bold',
        marginRight:15,
        margin:'auto 0px'
    },
    tabSubHeader:{
        color:'#898989',
        margin:'auto 0px'
    },
    singleOption:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:4,
        paddingBottom:4,
        borderColor:'#e8e8e8',
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:7,
        marginBottom:17,
        cursor:'pointer'
    },
    imgSTD:{
        height:32
    },
    tabTitle:{
        margin:'auto 0px',
        color:'#898989'
    },
    bottomMiddle:{
        width:'80%',
        paddingTop:7
    },
    bottomFinal:{
        paddingTop:7
    },
    singleOptionRes:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:2,
        paddingBottom:2,
        borderRadius:7,
        marginBottom:17,
        justifyContent:'flex-start',
        paddingRight:70
    },
    bottomStartRes:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginRight:20
    },
    bottomMiddleRes:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        width:'75%'
    },
    bottomFinalRes:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    imgSTDres:{
        width:18
    },
    avatarClass:{
        backgroundColor:'lightblue'
    },
    headDoc:{
        display:'flex',
        justifyContent:'space-between',

    },
    bodyDoc:{
        display:'flex',
        justifyContent:'space-between',
    },
    docRow:{
        width:'30%',
        display:'flex',
        alignItems:'center',
        padding:'10px 0px',
    },
    docRowText:{
        fontSize:16,
        color:'#8e8e8e',
        fontWeight:'bold'
    },
}))

const Documenti = ({data}) => {
    const classes = useStyles()
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const history = useHistory()
    const { deleteAllegato } = webservice()
    const { getUserData } = userData()
    //ForceUpdate
    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
      }
    const forceUpdate = useForceUpdate();

    //Choosing icon
    function showIcon(data){
        let extension = data.split('.')
        extension = extension[(extension.length) - 1]
        switch(extension){
            case 'pdf':
                return require('../../../assets/images/creaContratto/formats/pdf.png')
            case 'doc':
                return require('../../../assets/images/creaContratto/formats/doc.png')
            case 'dwg':
                return require('../../../assets/images/creaContratto/formats/dwg.png')
            case 'exc':
                return require('../../../assets/images/creaContratto/formats/exc.png')
            default :
                return require('../../../assets/images/creaContratto/formats/other.png')
        }
    }
    return (
        <>
            <Box className={classes.mainBox}>
                
                <Box className={classes.leftTab}>
                    <Box className={classes.tabUpperBox}>
                        <Typography variant={'h5'} className={classes.tabHeader}>DOCUMENTI</Typography>
                        <Typography variant={'caption'} className={classes.tabSubHeader}>Lista dei documenti allegati al contratto</Typography>
                    </Box>

                    <Box className={classes.bottomTab}>
                    <Box className={classes.headDoc}>
                        <Typography className={classes.docRow} style={{fontSize:18,fontWeight:'bold',color:'#535353'}}>Documento</Typography>
                        <Typography className={classes.docRow} style={{fontSize:18,fontWeight:'bold',color:'#535353'}}>Modifica</Typography>
                        <Typography className={classes.docRow} style={{fontSize:18,fontWeight:'bold',color:'#535353'}}>Data</Typography>
                    </Box>
                    <Divider></Divider>

                    {data !== null ?
                                data.map((item, index) => {
                                    return(
                                        <>
                                        <Box className={classes.midBox}>
                                            <Box>
                                                <Box className={classes.bodyDoc}>
                                                    <Box className={classes.docRow}>
                                                        <img style={{width:32,height:32,marginRight:15}} src={showIcon(item.path.split('/')[2])} />
                                                        <Typography className={classes.docRowText}>{item.path.split('/')[2]}</Typography>
                                                    </Box>
                                                    <Box className={classes.docRow}>
                                                        <Typography className={classes.docRowText} style={{textTransform:'capitalize'}}>{item.owner}</Typography>
                                                    </Box>
                                                    <Box className={classes.docRow} style={{display:'flex',justifyContent:'space-between'}}>
                                                        <Typography className={classes.docRowText}>{item.created.split('T')[0]}</Typography>
                                                        <CloudDownloadIcon style={{cursor:'pointer'}} onClick={ async e =>{
                                                            window.open( "https://itp.softwellitalia.it/insideServer/" + item.path, "_blank")
                                                        }}/>
                                                        <DeleteIcon style={{cursor:'pointer'}} onClick={ async e =>{
                                                            async function dell(){
                                                                let toDel={
                                                                    token:getUserData().Token,
                                                                    id:item.id
                                                                }
                                                                await deleteAllegato(toDel)
                                                                window.location.reload(false)
                                                            }
                                                            dell()
                                                        }}/>
                                                
                                                    </Box>
                                                </Box>
                                            
                                                </Box>
                                                
                                            </Box>
                                            </>
                                        )
                                        
                                    })
                         
                         : <>
                         <Box className={classes.midBox}>
                             <Box>
                                 <Box className={classes.bodyDoc}>
                                     <Box className={classes.docRow}>
                                         <img style={{width:32,height:32,marginRight:15}} src={showIcon('vuoto')} />
                                         <Typography className={classes.docRowText}>VUOTO</Typography>
                                     </Box>
                                     <Box className={classes.docRow}>
                                         <Typography className={classes.docRowText}>VUOTO</Typography>
                                     </Box>
                                     <Box className={classes.docRow} style={{display:'flex',justifyContent:'space-between'}}>
                                         <Typography className={classes.docRowText}>VUOTO</Typography>
                                 
                                     </Box>
                                 </Box>
                             
                                 </Box>
                                 
                             </Box>
                             </>}

                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default Documenti
