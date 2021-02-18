import React from 'react'

const act = [{"id":153,"tipologia":"Centralina","periodo":"Bimestrale","descrizione":"Verifica centralina allarme, batteria, guasti, display","idContratto":"92","created":"2021-01-15T18:12:56.833","byAsset":null},{"id":162,"tipologia":"Centralina","periodo":"Trimestrale","descrizione":"batteria con lettera accentata ?????? ?????? ????????????","idContratto":"92","created":"2021-01-19T14:10:35.313","byAsset":null},{"id":163,"tipologia":"Estintore","periodo":"Bimestrale","descrizione":"Citt?? roma","idContratto":"92","created":"2021-01-19T14:10:44.583","byAsset":null},{"id":165,"tipologia":"Centrale antifurto","periodo":"Mensile","descrizione":"??????????????????????????????????????????????","idContratto":"92","created":"2021-01-26T18:28:58.28","byAsset":null},{"id":170,"tipologia":"Espansione zone","periodo":"Bimestrale","descrizione":"prova","idContratto":"92","created":"2021-01-29T14:47:18.383","byAsset":null},{"id":171,"tipologia":"Lettore RFid","periodo":"Trimestrale","descrizione":"Prova 2","idContratto":"92","created":"2021-01-29T14:48:07.86","byAsset":null},{"id":154,"tipologia":"Estintore","periodo":"Mensile","descrizione":"controllo pressione e punzonatura","idContratto":"92","created":"2021-01-15T18:13:28.607","byAsset":null},{"id":166,"tipologia":"Centralina","periodo":"Annuale","descrizione":"????","idContratto":"92","created":"2021-01-26T18:32:12.643","byAsset":null},{"id":164,"tipologia":"Centrale antifurto","periodo":"Annuale","descrizione":"lettera accentata ????????????","idContratto":"92","created":"2021-01-24T16:00:37.007","byAsset":null},{"id":160,"tipologia":"Centralina","periodo":"Bimestrale","descrizione":"zd","idContratto":"92","created":"2021-01-17T21:00:40.977","byAsset":null},{"id":167,"tipologia":"Videocamera fissa","periodo":"Annuale","descrizione":"òàèù","idContratto":"92","created":"2021-01-26T18:39:40.19","byAsset":null}]

function displayDoc(startMonth){
    
    let gen = []
    let feb = []
    let mar = []
    let apr = []
    let mag = []
    let giu = []
    let lug = []
    let ago = []
    let set = []
    let ott = []
    let nov = []
    let dec = []
    function sortD(obj,num){
        console.log(obj,num)
        switch(num){
            case 1:
                gen.push(obj)
            case 2:
                feb.push(obj)
            case 3:
                mar.push(obj)
            case 4:
                apr.push(obj)
            case 5:
                mag.push(obj)
            case 6:
                giu.push(obj)
            case 7:
                lug.push(obj)
            case 8:
                ago.push(obj)
            case 9:
                set.push(obj)
            case 10:
                ott.push(obj)
            case 11:
                nov.push(obj)
            case 12:
                dec.push(obj)
        }
    }
    act.map( item => {
        
        switch(item.periodo){
            case 'Settimanale':
                sortD( item,startMonth + 1 )
                break;
            case 'Mensile':
                sortD( item,startMonth + 1 )
                break;
            case 'Bimestrale':
                console.log(item)
                sortD( item,startMonth + 2 )
                break;
            case 'Trimestrale':
                sortD( item,startMonth + 3 )
                break;
            case 'Quadrimestrale':
                sortD( item,startMonth + 4 )
                break;
            case 'Semestrale':
                sortD( item,startMonth + 6 )
                break;
            case 'Annuale':
                sortD( item,startMonth + 0 )
                break;
        }
    } )
    console.log('GENNAIO',gen,'FEBN',feb,'MAR',mar,'apr',apr,'mag',mag,'giu',giu,'lug',lug,'ago',ago,'set',set,'ott',ott,'nov',nov,'dec',dec)
}

function isBetween(currentDate,minDate,maxDate){
    if (currentDate > minDate && currentDate < maxDate ){
        alert('Correct Date')
   }
}

function TestDoc() {
    return (
        <div>
            {isBetween(new Date(),new Date('01/01/2020'),new Date('01/01/2020'))}
        </div>
    )
}

export default TestDoc
