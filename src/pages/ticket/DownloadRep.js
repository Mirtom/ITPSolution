import React from 'react'
import { Preview, print } from 'react-html2pdf';
import { makeStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import webservice from '../../api/webservice'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
}));


function DownloadRep({desc,int,client,anom,mate,manu,open,handleClose}) {
    const { userList,getUserList } = webservice()
    const classes = useStyles()
    const delay = ms => new Promise(res => setTimeout(res, ms));

    function normalizeDates(date){
        let tmp = date.split('-')
        return ( tmp[2] + '-' + tmp[1] + '-' + tmp[0])
      }
    
    let name = int.id !== undefined ? int.id : 'ERRN'
    return (
        <Dialog onClose={handleClose} maxWidth={'lg'}aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          REPORT MAN13
        </DialogTitle>
        <DialogContent dividers>
        <Preview id={'jsx-template'} style={{display:'flex',justifyContent:'center',flexDirection:'row'}} >
                <div style={{paddingLeft:'2%',paddingRight:'2%',textAlign:'center'}}>

                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <div>
                            <p style={{fontSize:16,fontWeight:'bold',textAlign:'right'}}>REPORT INTERVENTO</p>
                            <p style={{fontSize:20,color:'#06F',fontWeight:'bold',textAlign:'right'}}>MANUTENZIONE ORDINARIA</p>
                        </div>
                    </div>

                    <div style={{marginTop:25,border:'1px solid #898989',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <div style={{width:'49.5%',borderRight:'1px solid #898989',textAlign:'left',paddingLeft:10}}>
                            <p style={{color:'#F93',fontWeight:'bold',fontSize:'.55vw',marginBottom:25}}>CLIENTE</p>
                            <div style={{lineHeight:.5}}>
                                <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw'}} >{client.estensioneRSociale}</p>
                                <p style={{color:'#898989',fontWeight:'bold',fontSize:'.35vw',textTransform:'capitalize'}}>{client.indirizzo + ', ' + client.cap + ' - ' + client.localita}</p>
                                <p style={{color:'#898989',fontWeight:'bold',fontSize:'.35vw'}}>C.F {client.cf} </p>
                                <p style={{color:'#898989',fontWeight:'bold',fontSize:'.35vw'}}>P.IVA: {client.pIVA}</p>
                            </div>
                        </div>

                        <div style={{width:'49.5%',textAlign:'right',paddingRight:10}}>
                        <p style={{color:'#06F',fontWeight:'bold',fontSize:'.55vw',marginBottom:25}}>DITTA</p>
                            <div style={{lineHeight:.5}}>
                                <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw'}} >ITALPROIM SRL</p>
                                <p style={{color:'#898989',fontWeight:'bold',fontSize:'.35vw'}}>VIA SALVATORE BARZILAI 219 - 00173 ROMA (RM)  </p>
                                <p style={{color:'#898989',fontWeight:'bold',fontSize:'.35vw'}}>P.I 01488891001 – C.F 06078350581 </p>
                                <p style={{color:'#898989',fontWeight:'bold',fontSize:'.35vw'}}>Telefono: 06.7231367/72632099</p>
                            </div>
                        </div>
                    </div>

                    <div style={{borderLeft:'1px solid #898989',borderRight:'1px solid #898989',display:'flex',justifyContent:'space-between'}}>
                        <div style={{borderRight:'1px solid #898989',borderBottom:'1px solid #898989',textAlign:'center',width:'33%'}}>
                            <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw',marginBottom:3}}>DITTA</p>
                            <p style={{color:'#06F',fontWeight:'normal',fontSize:15}}>M.{int.id} / {int.created !== undefined  ? (int.created.split('-')[0]) : null}</p>
                        </div>
                        <div style={{borderRight:'1px solid #898989',borderBottom:'1px solid #898989',textAlign:'center',width:'33%'}}>
                            <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw',marginBottom:3}}>Cliente</p>
                            <p style={{color:'#333',fontWeight:'normal',fontSize:'.5vw'}}>{client.rSociale}</p>
                        </div>
                        <div style={{borderRight:'1px solid #898989',borderBottom:'1px solid #898989',textAlign:'center',width:'33%'}}>
                            <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw',marginBottom:3}}>User</p>
                            <p style={{color:'#333',fontWeight:'normal',fontSize:'.5vw'}}>Luca Sebastiani</p>
                        </div>
                    </div>
                    <div style={{borderLeft:'1px solid #898989',borderRight:'1px solid #898989',borderBottom:'1px solid #898989',display:'flex',justifyContent:'space-between'}}>
                        <div style={{borderRight:'1px solid #898989',textAlign:'center',width:'33%'}}>
                            <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw',marginBottom:3}}>Dove</p>
                            <p style={{color:'#333',fontWeight:'normal',fontSize:'.5vw',textTransform:'capitalize'}}>{client.indirizzo + ', ' + client.cap + ' - ' + client.localita}</p>
                        </div>
                        <div style={{borderRight:'1px solid #898989',textAlign:'center',width:'33%'}}>
                            <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw',marginBottom:3}}>Tipologia</p>
                            <p style={{color:'#333',fontWeight:'normal',fontSize:'.5vw',textTransform:'capitalize'}}>{int.tipologia}</p>
                        </div>
                        <div style={{borderRight:'1px solid #898989',textAlign:'center',width:'33%'}}>
                            <p style={{color:'#333',fontWeight:'bold',fontSize:'.35vw',marginBottom:3}}>Fine Intervento</p>
                            <p style={{color:'#333',fontWeight:'normal',fontSize:'.5vw'}}>{int.dataFine !== undefined ? ( normalizeDates(int.dataFine.split('T')[0]) ) : null}</p>
                        </div>
                    </div>


                    <div style={{borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15}}>
                        <p style={{fontSize:16,fontWeight:'bold'}}>Descrizione Generale delle Attività ed eventuali Anomalie</p>
                    </div>
                    <div style={{borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15,paddingRight:15}}>
                        <p style={{fontSize:'.55vw',fontWeight:'normal',color:'#767171'}}>{desc}</p>
                    </div>


                    <div style={{borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15}}>
                        <p style={{fontSize:16,fontWeight:'bold'}}>Asset con Anomalie</p>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15}}>
                        {anom !== undefined ? anom.map( an => {
                            return (
                                <table style={{width:'49.5%',textAlign:'center'}}>
                            <tr>
                                <th></th>
                                <th style={{fontSize:14}}>Codice</th>
                                <th style={{fontSize:14}}>Anomalia Riscontrata</th>
                            </tr>
                            <tr>
                                <tr><img style={{height:22}}src={require('../../assets/images/anagraficaContratto/asset/codiceAsset.png')} /></tr>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{an.Codice}</td>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{an.Descrizione}</td>
                            </tr>
                        </table>
                            )
                        } ) : null}
                        

                    </div>

                    <div style={{borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15}}>
                        <p style={{fontSize:16,fontWeight:'bold'}}>Materiale Utilizzato</p>
                    </div>
                    <div style={{borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15}}>
                     <table style={{width:'100%',textAlign:'center'}}>
                            <tr>
                                <th style={{fontSize:14}}>Codice</th>
                                <th style={{fontSize:14}}>Nome</th>
                                <th style={{fontSize:14}}>Descrizione</th>
                                <th style={{fontSize:14}}>Quantità</th>
                            </tr>
                            {mate !== undefined ? mate.map( ma => {
                        return <tr>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{ma.Codice}</td>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{ma.Nome}</td>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{ma.Descrizione}</td>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{ma.Quantita}</td>
                            </tr>
                        
                    }) : null }
                        </table>
                    </div>

                    <div style={{borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15}}>
                        <p style={{fontSize:16,fontWeight:'bold'}}>Totale Ore Tecnici</p>
                    </div>
                    <div style={{borderLeft:'1px solid #898989',borderBottom:'1px solid #898989',borderRight:'1px solid #898989',paddingLeft:15}}>
                        <table style={{width:'100%',textAlign:'center'}}>
                            <tr>
                                <th style={{fontSize:14}}>Nome e Cognome</th>
                                <th style={{fontSize:14}}>Data Inizio</th>
                                <th style={{fontSize:14}}>Data Fine</th>
                                <th style={{fontSize:14}}>Ore Ordinarie</th>
                            </tr>
                            {manu.map( man => {
                                return <tr>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{man.Nome + ' ' + man.Cognome}</td>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{int.dataInizio !== undefined ? normalizeDates(int.dataInizio.split('T')[0]) : null}</td>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{int.dataFine !== undefined ? normalizeDates(int.dataFine.split('T')[0]) : null}</td>
                                <td style={{fontSize:'.5vw',color:'767171'}}>{man.hOrd}</td>
                            </tr>
                            } )}
                            
                        </table>
                        
                    </div>
                    
                    <div style={{marginTop:20,textAlign:'center',width:'100%',lineHeight:'1'}}>
                        <p style={{fontSize:'.35vw',color:'#767171'}}>ITALPROIM SRL</p>
                        <p style={{fontSize:7,color:'#898989'}}>VIA SALVATORE BARZILAI 219 - 00173 ROMA (RM) P.I 01488891001 – C.F 06078350581</p>
                        <p style={{fontSize:7,color:'#898989'}}>Telefono: 06.7231367/72632099</p>

                    </div>

                </div>
            </Preview>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>print('REP_' + name, 'jsx-template')}>
            Scarica PDF
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default DownloadRep
