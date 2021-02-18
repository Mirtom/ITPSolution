import { useHistory } from "react-router-dom";

export default() => {
    const history = useHistory();

    var setNewContractData= (data) => {
        sessionStorage.setItem('newContractData', JSON.stringify(data));
        console.log(data)
    }
    var setNewContractError= (data) => {
        sessionStorage.setItem('newContractError', data)
    }
    var updateContractActivity= (data) => {
        sessionStorage.setItem('newContractActivity', JSON.stringify(data))
    }
    var updateContractReferent= (data) => {
        sessionStorage.setItem('newContractReferent', JSON.stringify(data))
    }
    var updateContractFiles= (data) => {
        sessionStorage.setItem('newContractDocuments', JSON.stringify(data))
    }
    var setContractActivity= (data) => {
        console.log(data,sessionStorage.getItem('newContractActivity'))
        if( data === 'reset' ){
            sessionStorage.setItem('newContractActivity',null)
        }else if( sessionStorage.getItem('newContractActivity') != null && sessionStorage.getItem('newContractActivity') != 'null') {
            let toLoad = JSON.parse(sessionStorage.getItem('newContractActivity'))
            toLoad.push(data)
            sessionStorage.setItem('newContractActivity',JSON.stringify(toLoad))
        }else{
            sessionStorage.setItem('newContractActivity',JSON.stringify([data]))
        }
        console.log(data,sessionStorage.getItem('newContractActivity'))
    }
    var setContractInvoice= (data) => {
        sessionStorage.setItem('newContractInvoice', JSON.stringify(data))
    }
    var setNewContractID= (data) => {
        console.log(data)
        sessionStorage.setItem('newContractID', (data))
    }

    var removeActivity= (data) => {
        sessionStorage.setItem('newContractInvoice', null)
    }

    var setContractReferent= (data) => {
        if(data == 'reset'){
            sessionStorage.setItem('newContractReferent', null)
        }else if(JSON.parse(sessionStorage.getItem('newContractReferent')) !== null && sessionStorage.getItem('newContractActivity') != 'null'){
            let toSet = JSON.parse(sessionStorage.getItem('newContractReferent'))
            toSet.push(data)
            sessionStorage.setItem('newContractReferent', JSON.stringify(toSet))
        }else{
            sessionStorage.setItem('newContractReferent', JSON.stringify([data]))
        }
        console.log( JSON.parse(sessionStorage.getItem('newContractReferent')) )
        
    }
    var setContractDocument = (data) => {
        if(data == 'reset'){
            sessionStorage.setItem('newContractDocuments', JSON.stringify([]))
        }else if(sessionStorage.getItem('newContractDocuments') !== null){
            let toUp = JSON.parse(sessionStorage.getItem('newContractDocuments'))
            toUp.push(data)
            sessionStorage.setItem('newContractDocuments',JSON.stringify(toUp))
        }else{
            sessionStorage.setItem('newContractDocuments',JSON.stringify([data]))
        }
        
    }
    var setNewContractClient= (data) => {
        sessionStorage.setItem('newContractClient', data)
    }
    var setNewContractAcquisizione= (data) => {
        sessionStorage.setItem('newContractAcquisizione', JSON.stringify(data))
    }
    var setNewContractClientList= (data) => {
        sessionStorage.setItem('newContractClientList', JSON.stringify(data))
    }
    var setContractListData= (data) => {
        sessionStorage.setItem('contractList', JSON.stringify(data));
    }
    var setNewContractType= (data) => {
        sessionStorage.setItem('newContractType', JSON.stringify(data));
    }
    var setContractType = (data) => {
        sessionStorage.setItem('contractTypeSubmit', data)
    }
    var setNewUploadsData= (data) => {
        sessionStorage.setItem('NewUploadsData', JSON.stringify(data));
    }
    var setMaterialeData= (data) => {
        sessionStorage.setItem('MData', JSON.stringify(data));
    }
    var setRR= (data) => {
        sessionStorage.setItem('RData', JSON.stringify(data));
    }
    var setAnomalieData= (data) => {
        sessionStorage.setItem('AData', JSON.stringify(data));
    }
    var setTabImpianti= (data) => {
        sessionStorage.setItem('tabImpianti', JSON.stringify(data));
    }


    var getTabImpianti= () => {
        return JSON.parse(sessionStorage.getItem('tabImpianti'))
    }
    var getAnomalieData= () => {
        return JSON.parse(sessionStorage.getItem('AData'))
    }
    var getRR= () => {
        return JSON.parse(sessionStorage.getItem('RData'))
    }
    var getMaterialeData= () => {
        return JSON.parse(sessionStorage.getItem('MData'))
    }
    var getNewUploadsData= () => {
        return JSON.parse(sessionStorage.getItem('NewUploadsData'))
    }
    var getContractType= () => {
        return sessionStorage.getItem('contractTypeSubmit')
    }
    var getNewContractID= () => {
        return sessionStorage.getItem('newContractID')
    }
    var getContractListData= () => {
        return JSON.parse(sessionStorage.getItem('contractList'))
    }
    var getNewContractClientList= () => {
        return JSON.parse(sessionStorage.getItem('newContractClientList'))
    }
    var getNewContractClient= () => {
        return sessionStorage.getItem('newContractClient')
    }
    var getContractDocument= () => {
        return JSON.parse(sessionStorage.getItem('newContractDocuments'))
    }
    var getContractReferent= () => {
        return JSON.parse(sessionStorage.getItem('newContractReferent'))
    }
    var getContractInvoice= () => {
        return JSON.parse(sessionStorage.getItem('newContractInvoice'))
    }
    var getContractActivity= () => {
        return JSON.parse(sessionStorage.getItem('newContractActivity'))
    }
    var getNewContractData= () => {
        return JSON.parse(sessionStorage.getItem('newContractData'))
    }
    var getNewContractAcquisizione= () => {
        return JSON.parse(sessionStorage.getItem('newContractAcquisizione'))
    }
    var getNewContractType= () => {
        return JSON.parse(sessionStorage.getItem('newContractType'))
    }
    var getNewContractError= () => {
        return sessionStorage.getItem('newContractError')
    }

    return {
        setMaterialeData,
        setAnomalieData,
        setRR,
        getAnomalieData,
        getMaterialeData,
        getRR,
        setNewUploadsData,
        getNewUploadsData,
        setNewContractData,
        getNewContractData,
        setNewContractError,
        getNewContractError,
        setContractActivity,
        getContractActivity,
        setContractInvoice,
        getContractInvoice,
        setContractReferent,
        getContractReferent,
        updateContractActivity,
        setContractDocument,
        getContractDocument,
        updateContractFiles,
        getNewContractClient,
        setNewContractClient,
        updateContractReferent,
        setNewContractClientList,
        getNewContractClientList,
        setContractListData,
        getContractListData,
        setContractType,
        getContractType,
        setNewContractAcquisizione,
        getNewContractAcquisizione,
        removeActivity,
        setNewContractID,
        getNewContractID,
        getNewContractType,
        setNewContractType,
        setTabImpianti,
        getTabImpianti
    }
        
}
