import React from 'react'
import exportFromJSON from 'export-from-json'
import { useHistory } from "react-router-dom";

export default() => {
    const history = useHistory();

    var setNewClientData= (data) => {
        sessionStorage.setItem('newClienteData', JSON.stringify(data));
    }
    var setInterventoTMP= (data) => {
        if(data!== null && JSON.parse(sessionStorage.getItem('tmpIntervento'))!== null && JSON.parse(sessionStorage.getItem('tmpIntervento')).length >0){
            let tmp = JSON.parse(sessionStorage.getItem('tmpIntervento'));
            tmp.push(data)
            sessionStorage.setItem('tmpIntervento', JSON.stringify(tmp));
        }else{
            sessionStorage.setItem('tmpIntervento', JSON.stringify(data))
        }
    }

    var updateContactReferent= (data) => {
        sessionStorage.setItem('newContactReferent', JSON.stringify(data))
    }
    var updateClientReferent= (data) => {
        sessionStorage.setItem('newClientReferent', JSON.stringify(data))
    }
    var setContactReferent= (data) => {
        if(data == 'reset'){
            sessionStorage.setItem('newContactReferent', null)
        }else if(JSON.parse(sessionStorage.getItem('newContactReferent')) !== null){
            let toSet = JSON.parse(sessionStorage.getItem('newContactReferent'))
            toSet.push(data)
            sessionStorage.setItem('newContactReferent', JSON.stringify(toSet))
        }else{
            sessionStorage.setItem('newContactReferent', JSON.stringify([data]))
        }
        
    } 
    var setClientReferent= (data) => {
        if(data == 'reset'){
            sessionStorage.setItem('newClientReferent', null)
        }else if(JSON.parse(sessionStorage.getItem('newClientReferent')) !== null){
            let toSet = JSON.parse(sessionStorage.getItem('newClientReferent'))
            toSet.push(data)
            sessionStorage.setItem('newClientReferent', JSON.stringify(toSet))
        }else{
            sessionStorage.setItem('newClientReferent', JSON.stringify([data]))
        }
        
    }
    var setNewClientID= (data) => {
        sessionStorage.setItem('neClientID', JSON.stringify(data))
    }
    var setClientData= (data) => {
        sessionStorage.setItem('clientData', JSON.stringify(data));
        console.log(data)
    }
    

    var getClientData= () => {
        return JSON.parse(sessionStorage.getItem('clientData'))
    }
    var getNewClientID= () => {
        return sessionStorage.getItem('neClientID')
    }
    var getContactReferent= () => {
        return JSON.parse(sessionStorage.getItem('newContactReferent'))
    }
    var getClientReferent= () => {
        return JSON.parse(sessionStorage.getItem('newClientReferent'))
    }
    var getNewClientData= () => {
        return JSON.parse(sessionStorage.getItem('newClienteData'))
    }
    var getInterventoTMP= () => {
        return JSON.parse(sessionStorage.getItem('tmpIntervento'))
    }
    var getInterventoListData= () => {
        return JSON.parse(sessionStorage.getItem('tmpIntervento'))
    }

    return {
        setNewClientData,
        getNewClientData,
        updateContactReferent,
        setContactReferent,
        getContactReferent,
        updateClientReferent,
        setClientReferent,
        getClientReferent,
        setNewClientID,
        getNewClientID,
        setClientData,
        getClientData,
        setInterventoTMP,
        getInterventoTMP,
        getInterventoListData
    }
        
}
