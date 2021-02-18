import { useHistory } from "react-router-dom";

export default() => {
    const history = useHistory();

    var setAnagraficaData= (data) => {
        sessionStorage.setItem('anagraficaData', JSON.stringify(data));
        console.log(data)
    }
    var setAssetListData= (data) => {
        console.log(data)
        sessionStorage.setItem('assetList', JSON.stringify(data));
    }
    var setAssetGroupList= (data) => {
        sessionStorage.setItem('assetGroupList', JSON.stringify(data));
    }
    var setActivityListData= (data) => {
        if(data.length === 0){
            sessionStorage.setItem('activityList', JSON.stringify(null));
        }else{
            sessionStorage.setItem('activityList', JSON.stringify(data));
        }
    }
    var setAnagraficaAssetGroupID = (data) => {
        sessionStorage.setItem('assetGroupID', data);
    } 
    var setProgId = (data) => {
        sessionStorage.setItem('progID', data);
    }
    
    var setProgrammaListData= (data) => {
        console.log( JSON.stringify(data) )
        sessionStorage.setItem('programmaListData', JSON.stringify(data));
    }
    var setInterventoListData= (data) => {
        console.log( JSON.stringify(data) )
        sessionStorage.setItem('interventoListData', JSON.stringify(data));
    }
    var setSingleAsset= (data) => {
        console.log('DDDD',data)
        sessionStorage.setItem('singleData', JSON.stringify(data));
    } 
    var setFirstReportData= (data) => {
        sessionStorage.setItem('firstReportData', JSON.stringify(data));
        console.log(data)
    } 
    var setSecondReportData= (data) => {
        sessionStorage.setItem('secondReportData', JSON.stringify(data));
        console.log(data)
    }
    var setInfoBoxData= (data) => {
        console.log(data)
        sessionStorage.setItem('infoBoxData', JSON.stringify(data));
    } 
    var setAssetID= (data) => {
        console.log(data)
        sessionStorage.setItem('assetNewID', (data));
    }
    var setLogData= (data) => {
        console.log(data)
        sessionStorage.setItem('logData', JSON.stringify(data));
    }
    var setReferenteContrattoData= (data) => {
        console.log('dd',data)
        sessionStorage.setItem('referenteContrattoData', JSON.stringify(data));
    }
    var setAcquisizioneData= (data) => {
        console.log(data)
        sessionStorage.setItem('acquisizioneData', JSON.stringify(data));
    }
    var setLastReportData= (data) => {
        if(data === undefined){
            sessionStorage.setItem('lastReportData', JSON.stringify([]));
        }else{
            sessionStorage.setItem('lastReportData', JSON.stringify(data));
        }
    }
    var setToDelete= (data) => {
        console.log(data)
        sessionStorage.setItem('groupDelete', JSON.stringify(data));
    }  
    var setAllegatoData= (data) => {
        console.log(data)
        sessionStorage.setItem('allegatoData', JSON.stringify(data));
    } 
    var setMezziListData= (data) => {
        console.log(data)
        sessionStorage.setItem('mezziList', JSON.stringify(data));
    }
    var setResultGroupDEL= (data) => {
        sessionStorage.setItem('groupDeleteRES', (data));
    }
    var setNewRepID= (data) => {
        sessionStorage.setItem('reportNewId', (data));
    }
    var setTargetPROGRAMMA= (data) => {
        console.log('ttttt' + JSON.stringify(data))
        sessionStorage.setItem('targetPROGRAMMA', JSON.stringify(data) );
    }
    var setCurrentReport = (data) => {
        sessionStorage.setItem('currentReport',  JSON.stringify(data));
    }
    var setAvInterventi = (data) => {
        sessionStorage.setItem('avInterventi',  JSON.stringify(data));
    }
    var setTipoI = (data) => {
        console.log('TIPOO',data)
        sessionStorage.setItem('tipoI',  JSON.stringify(data));
    }
    var getTipoI= () => {
        return JSON.parse(sessionStorage.getItem('tipoI'))
    }
    var getAvInterventi= () => {
        return JSON.parse(sessionStorage.getItem('avInterventi'))
    }
    var getCurrentReport= () => {
        return JSON.parse(sessionStorage.getItem('currentReport'))
    }
    var getTargetPROGRAMMA= () => {
        return JSON.parse(sessionStorage.getItem('targetPROGRAMMA'))
    }
    var getNewRepID= () => {
        return (sessionStorage.getItem('reportNewId'))
    }
    var getMezziListData= () => {
        return JSON.parse(sessionStorage.getItem('mezziList'))
    }
    var getAllegatoData= () => {
        return JSON.parse(sessionStorage.getItem('allegatoData'))
    }
    var getLastReportData= () => {
        return JSON.parse(sessionStorage.getItem('lastReportData'))
    }
    var getReferenteContrattoData= () => {
        return JSON.parse(sessionStorage.getItem('referenteContrattoData'))
    }
    var getFirstReportData= () => {
        return JSON.parse(sessionStorage.getItem('firstReportData'))
    }
    var getAcquisizioneData= () => {
        return JSON.parse(sessionStorage.getItem('acquisizioneData'))
    }
    var getSecondReportData= () => {
        return JSON.parse(sessionStorage.getItem('secondReportData'))
    }
    var getInterventoListData= () => {
        return JSON.parse(sessionStorage.getItem('interventoListData'))
    }
    var getAnagraficaAssetGroupID= () => {
        return (sessionStorage.getItem('assetGroupID'))
    }
    var getProgId= () => {
        return (sessionStorage.getItem('progID'))
    }
    var getGroupedAsset= () => {
        return JSON.parse(sessionStorage.getItem('assetGroupList'))
    }
    var getActivityListData= () => {
        return JSON.parse(sessionStorage.getItem('activityList'))
    }
    var getAssetListData= () => {
        return JSON.parse(sessionStorage.getItem('assetList'))
    }
    var getAnagraficaData= () => {
        return JSON.parse(sessionStorage.getItem('anagraficaData'))
    }
    var getSingleData= () => {
       return JSON.parse(sessionStorage.getItem('singleData'))
    }
    var getProgrammaListData= () => {
        return JSON.parse(sessionStorage.getItem('programmaListData'))
    } 
    var setFullProgramma = (data ) => {
        sessionStorage.setItem('fullProgramma', JSON.stringify(data));
    }
    var getFullProgramma= () => {
        return JSON.parse(sessionStorage.getItem('fullProgramma'))
    } 
    var getInfoBoxData= () => {
        return JSON.parse(sessionStorage.getItem('infoBoxData'))
    } 
    var getLogBoxData= () => {
        return JSON.parse(sessionStorage.getItem('logData'))
    } 
    var getClienteFromProgrammaData= () => {
        return JSON.parse(sessionStorage.getItem('clientfromprogram'))
    } 
    var getAssetFromProgrammaData= () => {
        return JSON.parse(sessionStorage.getItem('assetfromprogram'))
    } 
    var setClienteFromProgrammaData= (data) => {
        console.log(data)
        sessionStorage.setItem('clientfromprogram', JSON.stringify(data));
        }
    var getClienteFromProgrammaDataALL= () => {
        return JSON.parse(sessionStorage.getItem('ALLclientfromprogram'))
    } 
    var setAssetFromProgrammaData= (data) => {
        console.log(data)
        sessionStorage.setItem('assetfromprogram', JSON.stringify(data));
    }
    var getAssetID= () => {
        return (sessionStorage.getItem('assetNewID'))
    } 
    var getToDelete= () => {
        return JSON.parse(sessionStorage.getItem('groupDelete'))
    }
    var getToDeleteRES= () => {
        return (sessionStorage.getItem('groupDeleteRES'))
    }

    return {
        getToDeleteRES,
        setResultGroupDEL,
        setNewRepID,
        getNewRepID,
        getClienteFromProgrammaDataALL,
        setClienteFromProgrammaData,
        setAssetFromProgrammaData,
        getClienteFromProgrammaData,
        getAssetFromProgrammaData,
        setFullProgramma,
        setReferenteContrattoData,
        getReferenteContrattoData,
        getFullProgramma,
        setAnagraficaData,
        getAnagraficaData,
        setAssetListData,
        getAssetListData,
        setAnagraficaAssetGroupID,
        getAnagraficaAssetGroupID,
        setActivityListData,
        getActivityListData,
        setAssetGroupList,
        getAcquisizioneData,
        getGroupedAsset,
        setInterventoListData,
        getInterventoListData,
        setLastReportData,
        getLastReportData,
        setAssetID,
        getAssetID,
        setSingleAsset,
        getSingleData,
        setFirstReportData,
        setAcquisizioneData,
        getFirstReportData,
        setSecondReportData,
        getSecondReportData,
        setProgrammaListData,
        getProgrammaListData,
        setProgId,
        getProgId,
        setInfoBoxData,
        getInfoBoxData,
        setLogData,
        getLogBoxData,
        setAllegatoData,
        getAllegatoData,
        setMezziListData,
        getMezziListData,
        setTargetPROGRAMMA,
        getTargetPROGRAMMA,
        setCurrentReport,
        getCurrentReport,
        setAvInterventi,
        getAvInterventi,
        setTipoI,
        getTipoI,
        setToDelete,
        getToDelete
    }
        
}
