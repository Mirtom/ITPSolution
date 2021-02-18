//Generate doc
import { PDFDownloadLink, Image, Document, Page,View,Text,Font } from '@react-pdf/renderer'
import React, { useState,useEffect } from 'react'

export default ({data}) => {
    return (
        <>
            <Document>
  <Page style={{padding:30}}>
  <View style={{display:'flex',textAlign:'right',width:'100%'}}>
        <Text style={{fontSize:15,fontWeight:'bold',marginBottom:5,color:'#021963'}}>REPORT INTERVENTO</Text>
            <Text style={{fontSize:15,fontWeight:'bold',color:'#0066ff',letterSpacing:'3'}}>MANUTENZIONE ORDINARIA</Text>
        </View>
  
  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
  <View style={{width:'50%',border:'1 solid black',padding:5}}>
  <Text style={{color:'orange',fontSize:8,fontWeight:'bold'}}>CLIENTE</Text>
  <Text style={{fontSize:8,color:'#898989',marginTop:10}}>{ data !== undefined ? data[3][0].estensioneRSociale : null }</Text>
  <Text style={{fontSize:8,color:'#898989',marginTop:2,textTransform:'capitalize'}}>{ data !== undefined ? data[3][0].indirizzo + ' , ' + data[3][0].cap + ' - ' + data[3][0].localita : null }</Text>
  <Text style={{fontSize:8,color:'#898989',marginTop:2}}>C.F { data !== undefined ? data[3][0].cf : null }</Text>
  <Text style={{fontSize:8,color:'#898989',marginTop:2}}>P.IVA: { data !== undefined ? data[3][0].pIVA : null }</Text>
  </View>
  
  
  <View style={{width:'50%',borderTop:'1 solid #000',borderRight:'1 solid #000',borderBottom:'1 solid #000',padding:5,}}>
  <Text style={{color:'darkcyan',fontSize:10,fontWeight:'bold',textAlign:'right'}}>DITTA</Text>
  
  <Text style={{fontSize:8,color:'#898989',marginTop:10,textAlign:'right'}}>MINISTERO DELLO SVILUPPO ECONOMICO</Text>
  <Text style={{fontSize:8,color:'#898989',marginTop:2,textAlign:'right'}}>Via Molise n2 01198 Roma</Text>
  <Text style={{fontSize:8,color:'#898989',marginTop:2,textAlign:'right'}}>C.F 0392392032</Text>
  
  </View>
  
  
  </View>
  
  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
  <View style={{width:'33.33%',borderLeft:'1 solid black',textAlign:'center',paddingTop:20,paddingBottom:20}}>
    <Text style={{color:'black',fontSize:10}}>ID</Text>
      <Text style={{color:'#0066ff',fontSize:14,marginTop:2}}>M.04/2020</Text>
  </View>
  <View style={{width:'33.33%',borderLeft:'1 solid black',borderRight:'1 solid black',paddingTop:20,paddingBottom:20}}>
    <Text style={{fontSize:10,textAlign:'center'}}>Cliente</Text>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <Text style={{fontSize:10,color:'#898989'}}>Codice Cliente:</Text>
        <Text style={{fontSize:10,color:'#333'}}>00002</Text>
      </View>
      <Text style={{fontSize:13,color:'#898989',textAlign:'center'}}>{ data !== undefined ? data[3][0].rSociale : null }</Text>
  </View>
  <View style={{width:'33.33%',borderRight:'1 solid black',textAlign:'center',paddingTop:20,paddingBottom:20}}>
    <Text style={{fontSize:10}}>User</Text>
      <Text style={{fontSize:8,color:'#898989'}}>Mario Marchioni</Text>
  </View>
  </View>
  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
  <View style={{width:'33.33%',borderTop:'1 solid black',borderLeft:'1 solid black',textAlign:'center',paddingTop:20,paddingBottom:20}}>
      <Text style={{color:'black',fontSize:10}}>Dove</Text>
      <Text style={{fontSize:8,textAlign:'center',color:'#898989'}}>{ data !== undefined ? data[3][0].indirizzo + ' , ' + data[3][0].cap + ' - ' + data[3][0].localita : null }</Text>
  </View>
  
  <View style={{width:'33.33%',borderTop:'1 solid black',borderLeft:'1 solid black',paddingTop:20,paddingBottom:20}}>
    <Text style={{fontSize:10,textAlign:'center'}}>Tipologia</Text>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
      <Text style={{fontSize:8,color:'#898989'}}>Sicurezza</Text>
    </View>
  </View>
  
  <View style={{width:'33.33%',borderTop:'1 solid black',borderLeft:'1 solid black',borderRight:'1 solid black',textAlign:'center',paddingTop:20,paddingBottom:20}}>
  <Text style={{fontSize:10}}>Fine Intervento</Text>
  <Text style={{fontSize:8,color:'#898989'}}>07/08/2021</Text>
  </View>
  </View>
  
  <Text style={{paddingTop:5,paddingBottom:5,width:'100%',border:'1 solid black',paddingLeft:10,fontSize:14}}>Descrizione Generale delle Attività ed eventuali Anomalie</Text>
  <View style={{borderLeft:'1 solid black',borderRight:'1 solid black',padding:5,fontSize:8,color:'#898989'}}>
  <Text>
  {data !== undefined ? data[0].descrizione : 'ERRORE INTERNO ! CONTATTARE UN AMMINISTRATORE'}         
  </Text>
  </View>
  <Text style={{paddingTop:5,paddingBottom:5,width:'100%',border:'1 solid black',paddingLeft:10,fontSize:14}}>Asset con Anomalie</Text>
  <View style={{border:'1 solid black',fontSize:12,color:'#333',display:'flex',flexDirection:'column'}}>
    <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={{paddingTop:5,paddingBottom:5,width:'10%',textAlign:'center',borderRight:'1 solid black',fontSize:10}}>Codice</Text>
      <Text style={{paddingTop:5,paddingBottom:5,width:'40%',textAlign:'center',borderRight:'1 solid black',fontSize:10}}>Anomalia Riscontrata</Text>
      <Text style={{paddingTop:5,paddingBottom:5,width:'10%',textAlign:'center',borderRight:'1 solid black',fontSize:10}}>Codice</Text>
      <Text style={{paddingTop:5,paddingBottom:5,width:'40%',textAlign:'center',fontSize:10}}>Anomalia Riscontrata</Text>
    </View>
    <View style={{borderTop:'1 solid black',display:'flex',justifyContent:'space-between',flexWrap:'wrap',flexDirection:'row',color:'#898989'}}>
    {data !== undefined ? ( data[1].map( anom => (
        <>
                <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'10%',textAlign:'center',borderRight:'1 solid black',fontSize:8}}>{anom.codice}</Text>
                <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'40%',textAlign:'center',borderRight:'1 solid black',fontSize:8}}>{anom.descrizione}</Text>
        </>
    ) ) ) : null}
    </View>
  </View>
  
  <Text style={{paddingTop:5,paddingBottom:5,width:'100%',border:'1 solid black',paddingLeft:10,fontSize:14}}>Materiale Utilizzato</Text>
  <View style={{border:'1 solid black',fontSize:12,color:'#333',display:'flex',flexDirection:'column'}}>
    <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={{paddingTop:5,paddingBottom:5,width:'15%',textAlign:'center',borderRight:'1 solid black',fontSize:10}}>Codice</Text>
      <Text style={{paddingTop:5,paddingBottom:5,width:'15%',textAlign:'center',borderRight:'1 solid black',fontSize:10}}>Nome</Text>
      <Text style={{paddingTop:5,paddingBottom:5,width:'50%',textAlign:'center',borderRight:'1 solid black',fontSize:10}}>Descrizione</Text>
      <Text style={{paddingTop:5,paddingBottom:5,width:'15%',textAlign:'center',fontSize:10}}>Quantità</Text>
    </View>
    {data !== undefined ? ( data[2].map( mat => (<>
      <View style={{borderTop:'1 solid black',display:'flex',justifyContent:'space-between',flexDirection:'row',color:'#898989'}}>
        <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'15%',textAlign:'center',borderRight:'1 solid black',fontSize:8}}>{mat.codice}</Text>
        <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'15%',textAlign:'center',borderRight:'1 solid black',fontSize:8}}>{mat.nome}</Text>
        <Text style={{paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,margin:'auto 0',width:'50%',textAlign:'center',fontSize:8,borderRight:'1 solid black'}}>{mat.descrizione}</Text>
        <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'15%',textAlign:'center',fontSize:8}}>{mat.quantita}</Text>
      </View>
    </>) ) ) : null}
  </View>
  
  <Text style={{paddingTop:5,paddingBottom:5,width:'100%',borderLeft:1,borderRight:1,paddingLeft:10,fontSize:14}}>Totale Ore Tecnici</Text>
  <View style={{border:'1 solid black',fontSize:12,color:'#333',display:'flex',flexDirection:'column'}}>
  <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
  <Text style={{margin:'auto 0',width:'20%',textAlign:'center',fontSize:10,paddingTop:5,paddingBottom:5}}>Nome e Cognome</Text>
    <Text style={{margin:'auto 0',width:'15%',textAlign:'center',fontSize:10,paddingTop:5,paddingBottom:5}}>Data Inizio</Text>
    <Text style={{margin:'auto 0',width:'20%',textAlign:'center',fontSize:10,paddingTop:5,paddingBottom:5}}>Data Fine</Text>
    <Text style={{margin:'auto 0',width:'15%',textAlign:'center',fontSize:10,paddingTop:5,paddingBottom:5}}>Ore Ordinarie</Text>
  <Text style={{margin:'auto 0',width:'15%',textAlign:'center',fontSize:10,paddingTop:5,paddingBottom:5}}>Ore Straordinarie</Text>
  </View>
  <View style={{borderTop:'1 solid black',display:'flex',justifyContent:'space-between',flexDirection:'row',color:'#898989'}}>
  <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'20%',textAlign:'center',borderRight:'1 solid black',fontSize:8}}>Ezio Genovese</Text>
     <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'15%',textAlign:'center',borderRight:'1 solid black',fontSize:8}}>23/04/2020</Text>
    <Text style={{paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,margin:'auto 0',width:'20%',textAlign:'center',fontSize:8,borderRight:'1 solid black'}}>23/04/2020</Text>
    <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'15%',textAlign:'center',borderRight:'1 solid black',fontSize:8}}>8</Text>
    <Text style={{paddingTop:5,paddingBottom:5,margin:'auto 0',width:'15%',textAlign:'center',fontSize:8}}>1</Text>
  </View>
  </View>
  
  
  </Page>
  </Document>
        </>
    )
    
  }