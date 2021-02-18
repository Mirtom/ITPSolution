import React, { useEffect,useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography } from "@material-ui/core"
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import webservice from '../../../api/webservice';
import anagraficaData from '../../data/anagraficaData';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    middleHeader:{
        display:'flex',
        justifyContent:'space-between',
        padding:'20px 15px'
    },
    middleHeaderIMG:{
        height:28,
        margin:'0px 15px'
    },
    middleHeaderCol:{
        display:'flex',
        color:'#535353',
        width:'auto',
    },
    dialogMain:{
        width:'50%',
        color:'#535353'
    },
    columnSA:{
        display:'flex'
    },
    modalIMG:{
        height:16,
        marginRight:10
    },
    rowWIMG:{
        display:'flex',
        alignItems:'center',
        marginBottom:7
    },
    columnSA:{
        paddingLeft:50,
        paddingRight:50,
        paddingBottom:15,
        display:'flex',
        justifyContent:'space-between',
        marginBottom:'2%',
        borderBottomWidth:2,
        borderBottomColor:'#eaeaea',
        borderBottomStyle:'dashed'
    },
    columnGA:{
        paddingLeft:50,
        paddingRight:50,
        paddingBottom:15,
        display:'flex',
        marginBottom:10,
        justifyContent:'space-between',
    },
    rowSAFirst:{
        display:'flex',
        flexDirection:'column'
    },
    defaultSelectBox:{
        width:'100%'
    },
    submitButton:{
        backgroundColor:'#00ADA2',
        color:'white',
        paddingLeft:30,
        paddingRight:30,
        alignItems:'center'
    },
    addAsset:{
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'#00ada2',
        padding:'5px 0px',
        color:'#00ada2',
        marginLeft:5,
        '&:hover': {
            borderColor:'#A5D7CF',
            backgroundColor: 'transparent !important',
          }
    },
    leftAssetRow:{
        width:'80%',
    },
    assetRowGrouped:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        borderTopWidth:2,
        borderTopStyle:'dashed',
        borderTopColor:'#eaeaea',
        paddingTop:20
    },
    rightAssetRow:{
        width:'15%',
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    },
    buttonActionGAsset:{
        borderRadius:5,
        '&:hover': {
            backgroundColor:'#e2dcda !important',
          }
    },
    undoGrouped:{
        backgroundColor:'#0074BF',
        color:'white',
        letterSpacing:'.1em',
        paddingLeft:25,
        paddingRight:25,
        '&:hover': {
            backgroundColor:'#569bc7 !important',
        }
    }

}))

const Middle = ({contractID,token,switcher,handleSwitcher}) => {

    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenAlert(false);
    };

    //Anagrafica data session
    const { getAnagraficaAssetGroupID } = anagraficaData()
    //variable for the New Asset Group
    const [assetGroup,setAssetGroup] = useState(0)
    //API Integration
    const { createAsset, createAssetGroup } = webservice()
    const classes = useStyles();

    const [openSA, setOpenSA] = React.useState(false);
    const [openGA, setOpenGA] = React.useState(false);

    //SINGLE FUNCTION
    const handleClickOpenSA = () => {
        setOpenSA(true);
    };
    const handleCloseSA = () => {
        setOpenSA(false);
    };

    //GROUP FUNCTION
    const handleClickOpenGA = () => {
        setOpenGA(true);
    };
    const handleCloseGA = () => {
        setOpenGA(false);
    };

    //group asset n state
    const [ nAsset, setNAsset ] = useState([{id:1}])
    const [counter, setCounter] = useState(1)

    //Checker state button submitter
    const [checkSubmit, setCheckSubmit] = useState(true)
    //Single asset data state
    const [sData, setSData] = useState(
        {
            token:token,
            titolo:null,
            codice:null,
            matricola:null,
            marca:null,
            otherInfo:null,
            edificio:null,
            piano:null,
            stanza:null,
            areaEsterna:null,
            descrizione:null,
            byGroup:0,
            byContract:contractID
        }
    )
    //Group MAIN Asset data state
    const [gData, setGData] = useState(
        {
            token,
            titolo:null,
            descrizione:null,
            nAsset:null,
            codice:null,
            edificio:null,
            piano:null,
            stanza:null,
        }
    )
    //Group single asset data state
    const [gsData, setgSData ] = useState([{
        token:token,
        titolo:null,
        codice:null,
        matricola:null,
        marca:null,
        otherInfo:null,
        edificio:null,
        piano:null,
        stanza:null,
        areaEsterna:null,
        descrizione:null,
        byGroup:1,
        byContract:contractID
    }])
    //Handle single asset data,
    function handleSData(e,target){
        let val = e.target.value;
        setSData( (prevState) => ({
            ...prevState,
            [target]:val
        }) )
    }

    //Handle group MAIN asset data,
    function handleGData(e,target){
        let val = e.target.value;
        setGData( (prevState) => ({
            ...prevState,
            [target]:val
        }) )
    }
    
    function handlegSData(e,target,index){
        let val = e.target.value
        let toUp = gsData
        toUp[index][target] = val
        setgSData( toUp )
        console.log(gsData)
    }
    return (
        <>
        <Box className={classes.middleHeader}>
          <Box className={classes.middleHeaderCol}>
            <img className={classes.middleHeaderIMG} src={require('../../../assets/images/anagraficaContratto/asset/filtroAsset.png')}/>
            <Typography variant="subtitle1">Filtro Asset</Typography>
          </Box>
          {/*<Box className={classes.middleHeaderCol}>
            <img className={classes.middleHeaderIMG} src={require('../../../assets/images/anagraficaContratto/asset/rettangoloAsset.png')}/>
            <img className={classes.middleHeaderIMG} src={require('../../../assets/images/anagraficaContratto/asset/listAsset.png')}/>
            </Box>*/}
            {switcher === true ? (
                <Box className={classes.middleHeaderCol}>
                    <Button className={classes.undoGrouped} onClick={e=> handleSwitcher()}>Indietro</Button>
                </Box>
            ) : null}
          <Box className={classes.middleHeaderCol}>
            <Box style={{display:'flex'}}>
              <Typography variant="subtitle1" style={{cursor:'pointer'}} onClick={handleClickOpenSA}>Nuovo Asset</Typography>
              <img className={classes.middleHeaderIMG} src={require('../../../assets/images/anagraficaContratto/asset/nAsset.png')}/>
            </Box>
            <Box style={{display:'flex',marginLeft:30}}>
              <Typography variant="subtitle1" style={{cursor:'pointer'}} onClick={handleClickOpenGA}>Nuovo Gruppo</Typography>
              <img className={classes.middleHeaderIMG} src={require('../../../assets/images/anagraficaContratto/asset/nAsset.png')}/>
            </Box>
          </Box>
        </Box>

        {/* SINGLE ASSET DIALOG */}
        <Dialog onClose={handleCloseSA} aria-labelledby="customized-dialog-title" open={openSA} fullWidth={true} maxWidth={'lg'}>
            <DialogTitle id="customized-dialog-title" onClose={handleCloseSA}>
            Aggiungi Asset
            </DialogTitle>
            <DialogContent dividers>
                <Box style={{marginTop:15}}>
                    <Box className={classes.columnSA}>

                        <Box className={classes.rowSAFirst} style={{width:'50%'}}>
                            <Typography variant="subtitle" style={{marginBottom:7}}>Titolo Dell'Asset</Typography>
                            <TextField value={sData.titolo} onChange={e => handleSData(e,'titolo')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                        <Box className={classes.rowSAFirst}>
                            <Box className={classes.rowWIMG}>
                                <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/codiceAsset.png')} />
                                <Typography variant="subtitle">Codice Anagrafica</Typography>
                            </Box>
                            <TextField value={sData.codice} onChange={e => handleSData(e,'codice')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>

                    </Box>
                    <Box className={classes.columnSA}>
                        <Box className={classes.rowSASecond}>
                            <Box className={classes.rowWIMG}>
                                <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/matricolaAsset.png')} />
                                <Typography variant="subtitle">Matricola</Typography>
                            </Box>
                            <TextField value={sData.matricola} onChange={e => handleSData(e,'matricola')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                        <Box className={classes.rowSASecond}>
                            <Box className={classes.rowWIMG}>
                                <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/brandAsset.png')} />
                                <Typography variant="subtitle">Marca</Typography>
                            </Box>
                            <TextField value={sData.marca} onChange={e => handleSData(e,'marca')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                        <Box className={classes.rowSASecond}>
                            <Box className={classes.rowWIMG}>
                                <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/anagraficaAsset.png')} />
                                <Typography variant="subtitle">Altre Informazioni</Typography>
                            </Box>
                            <TextField value={sData.otherInfo} onChange={e => handleSData(e,'otherInfo')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                    </Box>
                    <Box className={classes.columnSA}>
                        <Box className={classes.rowSAThird}>
                            <Box className={classes.rowWIMG}>
                                <Typography variant="subtitle" style={{width:'100%'}}>Edificio</Typography>
                            </Box>
                            <TextField value={sData.edificio} onChange={e => handleSData(e,'edificio')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                        <Box className={classes.rowSAThird}>
                            <Box className={classes.rowWIMG}>
                                <Typography variant="subtitle">Piano</Typography>
                            </Box>
                            <TextField value={sData.piano} onChange={e => handleSData(e,'piano')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                        <Box className={classes.rowSAThird}>
                            <Box className={classes.rowWIMG}>
                                <Typography variant="subtitle">Stanza/Locale</Typography>
                            </Box>
                            <TextField value={sData.stanza} onChange={e => handleSData(e,'stanza')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                        <Box className={classes.rowSAThird}>
                            <Box className={classes.rowWIMG}>
                                <Typography variant="subtitle">Area Esterna</Typography>
                            </Box>
                            <TextField value={sData.areaEsterna} onChange={e => handleSData(e,'areaEsterna')} inputProps={{style:{paddingLeft:7,paddingTop:5,paddingBottom:5}}} id="outlined-basic" variant="outlined" />
                        </Box>
                    </Box>
                    <Box className={classes.columnSA} style={{borderBottomWidth:0}}>
                        <Box style={{width:'100%'}}>
                            <Typography variant="subtitle" style={{marginBottom:7}}>Descrizione</Typography>
                            <TextField
                                value={sData.descrizione} 
                                onChange={e => handleSData(e,'descrizione')}
                                id="outline-multiline-static"
                                multiline
                                inputProps={{style:{paddingLeft:0,paddingTop:0,paddingBottom:0}}}
                                className={classes.defaultSelectBox}
                                rowsMax={8}
                                variant="outlined"
                                rows={3}
                            />
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button 
                autoFocus 
                onClick={e => {
                    createAsset(sData)
                }} 
                className={classes.submitButton}>
                <span style={{textTransform:'none'}}>Salve e Chiudi </span><DoneIcon style={{marginLeft:10,fontSize:16}}/>
            </Button>
            </DialogActions>
        </Dialog>
        {/* GROUP ASSET DIALOG */}
        <Dialog onClose={handleCloseGA} aria-labelledby="customized-dialog-title" open={openGA} fullWidth={true} maxWidth={'lg'}>
            <DialogTitle id="customized-dialog-title" onClose={handleCloseGA}>
            Aggiungi Gruppo Asset
            </DialogTitle>
            <DialogContent dividers>
                <Box style={{marginTop:15}}>
                    <Box style={{marginBottom:25}}>
                        <Box className={classes.columnGA}>

                            <Box className={classes.rowSAFirst}>
                                <Typography variant="subtitle" style={{marginBottom:7}}>Titolo del Gruppo</Typography>
                                <TextField disabled={!checkSubmit} value={gData.titolo} onChange={e => handleGData(e,'titolo')} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                            </Box>
                            <Box className={classes.rowSAFirst}>
                                <Typography variant="subtitle" style={{marginBottom:7}}>Descrizione</Typography>
                                <TextField disabled={!checkSubmit} value={gData.descrizione} onChange={e => handleGData(e,'descrizione')} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                            </Box>
                            <Box className={classes.rowSAFirst}>
                                <Typography variant="subtitle" style={{marginBottom:7}}>Nr. Asset</Typography>
                                <Box>
                                    <TextField disabled={!checkSubmit} value={counter}disabled={true}inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} style={{width:'30%'}} id="outlined-basic" variant="outlined" />
                                    <Button onClick={e => {
                                        let toUp=nAsset
                                        toUp.push({id:counter+1})
                                        setCounter(counter+1);
                                        setNAsset(toUp)
                                        toUp = gsData;
                                        toUp.push({
                                            token:token,
                                            titolo:null,
                                            codice:null,
                                            matricola:null,
                                            marca:null,
                                            otherInfo:null,
                                            edificio:null,
                                            piano:null,
                                            stanza:null,
                                            areaEsterna:null,
                                            descrizione:null,
                                            byGroup:1,
                                            byContract:contractID
                                        })
                                        setgSData(toUp)

                                    } } className={classes.addAsset}><AddIcon/></Button>
                                </Box>
                            </Box>

                        </Box>
                        <Box className={classes.columnGA}>

                            <Box className={classes.rowSAFirst}>
                                <Box className={classes.rowWIMG}>
                                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/codiceAsset.png')} />
                                    <Typography variant="subtitle">Codice Anagrafica</Typography>
                                </Box>
                                <TextField disabled={!checkSubmit} value={gData.codice} onChange={e => handleGData(e,'codice')} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                            </Box>
                            <Box className={classes.rowSAFirst}>
                                <Typography variant="subtitle" style={{marginBottom:7}}>Edificio</Typography>
                                <TextField disabled={!checkSubmit} value={gData.edificio} onChange={e => handleGData(e,'edificio')} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                            </Box>
                            <Box className={classes.rowSAFirst}>
                                <Typography variant="subtitle" style={{marginBottom:7}}>Piano</Typography>
                                <TextField disabled={!checkSubmit} value={gData.piano} onChange={e => handleGData(e,'piano')} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                            </Box>
                            <Box className={classes.rowSAFirst}>
                                <Typography variant="subtitle" style={{marginBottom:7}}>Stanza/Locale</Typography>
                                <TextField disabled={!checkSubmit} value={gData.stanza} onChange={e => handleGData(e,'stanza')} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                            </Box>

                        </Box>
                    </Box>
                    <Box>
                        { nAsset.map((item,index) => {
                            return (
                                <Box className={classes.assetRowGrouped}>
                                    <Box className={classes.leftAssetRow}>
                                        <Box className={classes.columnGA}>
                                            <Box className={classes.rowSAFirst}>
                                                <Box className={classes.rowWIMG}>
                                                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/matricolaAsset.png')} />
                                                    <Typography variant="subtitle">Matricola</Typography>
                                                </Box>
                                                <TextField value={gsData[index].matricola} onChange={e=> handlegSData(e,'matricola',index)} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                                            </Box>
                                            <Box className={classes.rowSAFirst}>
                                                <Box className={classes.rowWIMG}>
                                                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/brandAsset.png')} />
                                                    <Typography variant="subtitle">Marca</Typography>
                                                </Box>
                                                <TextField value={gsData[index].marca} onChange={e=> handlegSData(e,'marca',index)} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                                            </Box>
                                            <Box className={classes.rowSAFirst}>
                                                <Box className={classes.rowWIMG}>
                                                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/codiceAsset.png')} />
                                                    <Typography variant="subtitle">Codice Anagrafica</Typography>
                                                </Box>
                                                <TextField value={gsData[index].codice} onChange={e=> handlegSData(e,'codice',index)} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                                            </Box>
                                        </Box>
                                        <Box className={classes.columnGA}>
                                            <Box className={classes.rowSAFirst}>
                                                <Box className={classes.rowWIMG}>
                                                    <img className={classes.modalIMG} src={require('../../../assets/images/anagraficaContratto/asset/anagraficaAsset.png')} />
                                                    <Typography variant="subtitle">Altre Informazioni</Typography>
                                                </Box>
                                                <TextField value={gsData[index].otherInfo} onChange={e=> handlegSData(e,'otherInfo',index)} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                                            </Box>
                                            <Box className={classes.rowSAFirst}>
                                                <Box className={classes.rowWIMG}>
                                                    <Typography variant="subtitle">Stanza/Locale</Typography>
                                                </Box>
                                                <TextField value={gsData[index].stanza} onChange={e=> handlegSData(e,'stanza',index)} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                                            </Box>
                                            <Box className={classes.rowSAFirst}>
                                                <Box className={classes.rowWIMG}>
                                                    <Typography variant="subtitle">Area Esterna</Typography>
                                                </Box>
                                                <TextField value={gsData[index].areaEsterna} onChange={e=> handlegSData(e,'areaEsterna',index)} inputProps={{style:{paddingLeft:10,paddingTop:10,paddingBottom:10}}} id="outlined-basic" variant="outlined" />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className={classes.rightAssetRow}>
                                        <Box style={{margin:'auto',display:'flex',justifyContent:'space-around',width:'100%'}}> 
                                            <Button disabled={checkSubmit} className={classes.buttonActionGAsset} style={{backgroundColor:'#BCEBE5',color:'#317C67'}} onClick={e => {
                                                let toUp = gsData[index]
                                                toUp.descrizione = gData.descrizione
                                                toUp.edificio = gData.edificio
                                                toUp.piano = gData.piano
                                                toUp.titolo = gData.titolo
                                                toUp.byGroup = getAnagraficaAssetGroupID()
                                                console.log(toUp)
                                                createAsset(toUp)
                                                setOpenAlert(true)
                                            }}> <DoneIcon /> </Button>
                                            <Button className={classes.buttonActionGAsset} style={{backgroundColor:'#FFC9BE', color:'#E26553'}} onClick={e => {
                                                let toDelete = nAsset.filter(object => object.id != item.id)
                                                setNAsset(toDelete)
                                                setCounter(counter- 1)
                                                let toUp = gsData.splice(index,index)
                                                console.log(toUp)
                                            }}> <DeleteIcon /> </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }) }
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={async (e) => {
                let toUp= gData
                toUp.nAsset = counter
                await createAssetGroup(toUp)
                setCheckSubmit(false)
                setAssetGroup( getAnagraficaAssetGroupID() )
                console.log()
            }} className={classes.submitButton}>
                <span style={{textTransform:'none'}}>Salve e Chiudi </span><DoneIcon style={{marginLeft:10,fontSize:16}}/>
            </Button>
            </DialogActions>
        </Dialog>
        {/* FILTER ASSET DIALOG*/}
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="success">
            Asset Aggiunto con successo
            </Alert>
        </Snackbar>
        
        </>
    )

}

export default Middle