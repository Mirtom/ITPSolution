import { Box, Typography, Button } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import userData from '../../data/userData';
import webservice from '../../../api/webservice';
import anagraficaData from '../../data/anagraficaData';
import { PDFDownloadLink, Document, Page,View,Text,Font } from '@react-pdf/renderer'

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
        marginBottom:15,
        fontSize:'0.7vw'
    },
    subText:{
        color:'#B5B5B5',
        fontSize:'0.6vw'
    },
    topSideColumn:{
        marginTop:20,
        marginBottom:10
    },
    infoText:{
        marginTop:5,
        color:'#4D8AFF',
        fontSize:'0.7vw'
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

    //Generate doc
    const MyDoc = ({data}) => {
            return (
                <>
                    <Document>
                        <Page className={classes.bodyDOC} style={{paddingTop: 35,
                        paddingBottom: 65,
                        paddingHorizontal: 35,}}>
                        <Text style={classes.titleDOC} style={{fontSize: 24,
                        textAlign: 'center',
                        }}>Report intervento manutenzione {data.tipologia}</Text>
                        <Text style={classes.authorDOC} style={{fontSize: 12,
                        textAlign: 'center',
                        marginBottom: 40,}}>INT. {data.id}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Data di creazione: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.created !== undefined ? swipeDate((data.created).split('T')[0]) : null}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Data di Inizio intervento: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.dataInizio !== undefined ? swipeDate((data.dataInizio).split('T')[0]) : null}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Data di Fine intervento: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.dataFine !== undefined ? swipeDate((data.dataFine).split('T')[0]) : null}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Descrizione Intervento: 
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.descrizione}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Priorità
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.priorita}</Text>
                        <Text style={classes.subtitleDOC} style={{
                            fontSize: 18,
                        margin: 12,
                        marginBottom:5,
                        
                        }}>
                            Intervento assegnato a:
                        </Text>
                        <Text style={classes.textDOC} style={{
                            margin: 0,
                        marginLeft:14,
                        fontSize: 14,
                        textAlign: 'justify',
                        
                        }}>{data.ragSociale}</Text>
                        
                        </Page>
                    </Document>
                </>
            )
            
    }

    return(
        <>
        <Box className={classes.mainBox}>
            <Box className={classes.topSide}>
                <Typography variant='h5' className={classes.mainText}>ULTIMO REPORT</Typography>
                <Box className={classes.topSideColumn}>
                    <Typography variant='h7' className={classes.subText}>Tempo di Intervento</Typography>
                    <Typography variant='h5' className={classes.infoText}>{dataReport.interventi === null ? 'In corso...' : 'Non specificato[N]...'}</Typography>
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
                    <Typography variant='h5' className={classes.infoText} style={{color:'#B5B5B5'}}>{ dataReport.created!== undefined ? swipeDate((dataReport.created).split('T')[0]) : null }</Typography>
                
                </Box>
            </Box>
            {console.log(dataReport)}
            {dataReport.interventi !== null&& dataReport !== [] ? (<Box style={{marginTop:5,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

                <img className={classes.imgSTD} src={require('../../../assets/images/reportManutenzione/interventoStraordinario.png')} />
                <PDFDownloadLink document={<MyDoc data={dataReport}/>} fileName={"MAN_" + dataReport.id +".pdf"}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button className={classes.defButton} variant="outlined">Scarica Report</Button>)}
                </PDFDownloadLink>
            </Box>) : null}
        </Box>
        </>
    )
}

export default LastReport
