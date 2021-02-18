import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "../components/Sidebar"
import { Box, Container, Divider, Input, InputAdornment, Paper, Typography } from "@material-ui/core"
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button';
//Contract Data File
import contractData from '../data/contractData';
import { useHistory } from 'react-router';
import userData from '../data/userData';
import doc from '../components/doc';

import MenuIcon from '@material-ui/icons/Menu';


var todayDate = new Date();
todayDate =  todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear();
const useStyles = makeStyles((theme) => ({
    Header:{
        backgroundColor: "#00ADA2",
        height: 50,
        paddingTop:12
      },
    listaTable:{
        marginTop:40,
        height:'auto',
        width:'95%',
        paddingBottom:30,
        borderRadius:15,
        backgroundColor:'white',
      },
      tabName:{
        padding:15,
        paddingTop:30,
        fontWeight:'bold',
        fontSize:25, 
        letterSpacing:'.05em',
        color:'#6C6C6C'
      },
      subTabName:{
        paddingLeft:15,
        color:'#535353',
        fontSize:18,
        fontWeight:'bold',
        letterSpacing:'0.05em',
        textTransform:'capitalize',
        textAlign:'left'
       },
       mainBox:{
           paddingTop:30,
           display:'flex',
           justifyContent:'space-between',
           flexWrap:'wrap'
       },
       midBox:{
        width:'45%',
        marginBottom:15
       },
       mainRow:{
        padding:'30px 20px',
        paddingLeft:0,
        height:'20%'
       },
       normalInput:{
        border:'1px solid #F3F3F3',
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        fontSize:20,
        paddingLeft:15,
        borderRadius:7
       },
       styledInput:{
        fontSize:20,
        width:'100%',
        borderRadius:7,
        border:'1px solid #F3F3F3',
       },
       euroLogo:{
        backgroundColor:'#F3F3F3',
        borderRight:'1px solid #eaeaea',
        padding:15,
        paddingTop:25,
        paddingBottom:25,
        color:'black'
    },
    subSpecialName:{
        color:'#30BCB1',
        fontSize:16,
        paddingLeft:15,
        fontWeight:'bold',
        letterSpacing:'.05em',
        cursor:'pointer'
    },
    button:{
        backgroundColor:'#00ADA2',
        textDecoration:'capitalize',
        width:'15%',
      },
      docImages:{
        width:'16px',
      },
      buttonBack:{
          width:'15%',
          background:'transparent',
          color:'black',
          '&:hover': {
            backgroundColor: '#f1e9e9 !important',
        }
      },
      uploadButton:{
        width:'15%',
        background:'#FBB441',
        color:'white',
        display:'flex',
        justifyContent:'space-evenly',
        '&:hover': {
          backgroundColor: '#f1bf6e !important',
      }
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
    }
      
}))

export default() => {
    //File upload
    function useForceUpdate(){
        const [value, setValue] = React.useState(0); // integer state
        return () => setValue(value => ++value); // update the state to force render
    }
    const forceUpdate = useForceUpdate();
    const { register, handleSubmit } = useForm()
    const { getUserData, setDrawer } = userData()
    const hiddenFileInput = React.useRef(null);

    const [dataUploaded,setDataUploaded] = useState([])
    const [uploads,setUploads] = React.useState([])
    const [dirFix,setDirFix] = React.useState('')

    const onSubmit = async event => {
        var data = event.target.files[0];
        let id = getUserData().ID.toString()
        //Creating name file
        var str = "00000000";
        let len = 8 - id.length
        var resName = data.name +'[**]'+ (str.substring(0, len)) + id;

        const formData = new FormData()
        formData.append("document", data, resName)
        //
         const res = await fetch("https://itp.softwellitalia.it:8443/filesUpload/contratti", {
            method: "POST",
            body: formData
        }).then(res => res.json())
        setDirFix(res.path)
        let tt = uploads
        tt.push(res.filePath)
        setUploads(tt)
        setNewUploadsData(tt)
        setContractDocument(data.name)
        setDataUploaded( getContractDocument() )
    }
    const onRemove = async (name) => {
        updateContractFiles(dataUploaded.filter(item => item !== name))
        setDataUploaded(getContractDocument())
        console.log(name)
        let tt = uploads.filter( item => item !== dirFix + name )
        setUploads(tt)
        setNewUploadsData(tt)

    }
    console.log(uploads)
    const handleClick = event => {
        hiddenFileInput.current.click();
      };

    //Local document manager
    const { setContractDocument, getContractDocument, updateContractFiles, getContractType,setNewUploadsData,getNewUploadsData } = contractData()

    const history = useHistory()
    const classes = useStyles();
    //Reintegrating data if compiled
    useEffect(() => {
        if(getContractDocument() !== null ){
            setDataUploaded( getContractDocument() )
        }
        if( getNewUploadsData() !== null ){
            setUploads(getNewUploadsData())
        }
    }, [])

    //Choosing icon
    function showIcon(data){
        if(data.length > 0 ){
            console.log(data)
            let extension = data.split('.')
            extension = extension[(extension.length) - 1]
            switch(extension){
                case 'pdf':
                    return require('../../assets/images/creaContratto/formats/pdf.png')
                case 'doc':
                    return require('../../assets/images/creaContratto/formats/doc.png')
                case 'dwg':
                    return require('../../assets/images/creaContratto/formats/dwg.png')
                case 'exc':
                    return require('../../assets/images/creaContratto/formats/exc.png')
                default :
                    return require('../../assets/images/creaContratto/formats/other.png')
            }
        }
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
        </Container>
                <Container maxWidth="False" className={classes.listaTable}>
                    <Box style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <Typography className={classes.tabName}>LISTA DOCUMENTI</Typography>
                        <Button className={classes.uploadButton}onClick={handleClick}>
                            <span style={{textDecoration:'capitalize'}}>Carica documento</span>
                            <img className={classes.docImages} src={require('../../assets/images/listContratti/addDocument.png')} />
                        </Button>
                            <input ref={register} ref={hiddenFileInput}  onChange={onSubmit} style={{display:'none'}}type="file" name="files" />
                    </Box>
                    
                    <Divider style={{marginTop:30,marginBottom:30}}></Divider>
                    <Box className={classes.mainBox}>
                          {dataUploaded !== null ?
                                dataUploaded.map((item, index) => {
                                    return(
                                        <>
                                        <Box className={classes.midBox}>
                                             
                                            <Box>
                                                {
                                                index < 2 ?
                                                    <>
                                                    <Box className={classes.headDoc}>
                                                        <Typography className={classes.docRow} style={{fontSize:18,fontWeight:'bold',color:'#535353'}}>Documento</Typography>
                                                        <Typography className={classes.docRow} style={{fontSize:18,fontWeight:'bold',color:'#535353'}}>Modifica</Typography>
                                                        <Typography className={classes.docRow} style={{fontSize:18,fontWeight:'bold',color:'#535353'}}>Data</Typography>
                                                    </Box>
                                                    <Divider></Divider>
                                                    </>
                                                 : null
                                                }
                                                <Box className={classes.bodyDoc}>
                                                    <Box className={classes.docRow}>
                                                        <img style={{width:32,height:32,marginRight:15}} src={showIcon(item)} />
                                                        <Typography className={classes.docRowText}>{item}</Typography>
                                                    </Box>
                                                    <Box className={classes.docRow}>
                                                        <Typography className={classes.docRowText}>{getUserData().Nome + ' ' + getUserData().Cognome}</Typography>
                                                    </Box>
                                                    <Box className={classes.docRow} style={{display:'flex',justifyContent:'space-between'}}>
                                                        <Typography className={classes.docRowText}>{todayDate}</Typography>
                                                        <img onClick={(e) => onRemove(item)} style={{width:32,cursor:'pointer'}} src={require('../../assets/images/lista-utenti/delete.png')} />
                                                
                                                    </Box>
                                                </Box>
                                            
                                                </Box>
                                                
                                            </Box>
                                            </>
                                        )
                                        
                                    })
                         
                         : null}

                    </Box>
                    <Box style={{display:'flex',justifyContent:'space-between',padding:'50px 100px 0',marginTop:50}}>
                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth={false}
                        className={classes.buttonBack}
                        id='buttonBack'
                        onClick={ (e)=> {
                            e.preventDefault()
                            if (getContractType() === 'sub') {
                                history.push('/contratti/listaAttivita')
                            }else{
                                history.push('/contratti/referenteContratto')
                            }
                            
                        } }
                        style={{justifyContent:'flex-start'}}
                        startIcon={<ArrowBackIcon></ArrowBackIcon>}
                        >
                        Indietro
                        </Button>
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={ (e)=> {
                            e.preventDefault()
                            history.push('/contratti/final')
                        } }
                        fullWidth={false}
                        className={classes.button}
                        style={{justifyContent:'flex-end'}}
                        endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                        >
                        Salva e Continua
                        </Button>
                    </Box>
                </Container>
                
  
        </Container>
        
         
      </div>
  )
}