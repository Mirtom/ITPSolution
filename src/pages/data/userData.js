import React from 'react'
import exportFromJSON from 'export-from-json'
import { useHistory } from "react-router-dom";

export default() => {
    const history = useHistory();

    var setUserData= (data) => {
        sessionStorage.setItem('userData', JSON.stringify(data));
    }
    var setCode= (data) => {
        sessionStorage.setItem('codeUser', data);
    }
    var setUserContractData= (data) => {
        sessionStorage.setItem('userContractData', JSON.stringify(data));
    }
    var setSelectedUser= (data) => {
        sessionStorage.setItem('selectedUser', JSON.stringify(data));
    }
    var setNewUserData= (data) => {
        sessionStorage.setItem('newUserData', JSON.stringify(data));
    }
    var setNewUserPex= (data) => {
        Object.keys(data).forEach(key => {
            if (!data[key]) delete data[key];
        });
        sessionStorage.setItem('newUserPex', JSON.stringify(data));
    }
    var setNewUserError= (data) => {
        sessionStorage.setItem('newUserError', data);
    }
    var setNewUserErrorFinal= (data) => {
        sessionStorage.setItem('NewUserErrorFinal', data);
    }
    var setNewUserStep= (data) => {
        console.log(data)
        sessionStorage.setItem('NewUserStep', data);
    }
    var setNewUserID= (data) => {
        console.log(data)
        sessionStorage.setItem('newUserID', data);
    }
    var setUserMan= (data) => {
        console.log(data)
        sessionStorage.setItem('newUserMan', JSON.stringify(data));
    }
    var setCurrentPermission= (data) => {
        console.log(data)
        sessionStorage.setItem('userPex', JSON.stringify(data));
    }
    var setCurrentPermissionEdit= (data) => {
        console.log('DD',data)
        sessionStorage.setItem('userPexEdit', JSON.stringify(data));
    }
    var setDrawer= () => {
        var data = sessionStorage.getItem('drawer')
        if( data === '0' ){
            sessionStorage.setItem('drawer','1')
        }else{
            sessionStorage.setItem('drawer','0')
        }
        console.log( sessionStorage.getItem('drawer') )
        
    }


    var getNewUserID= () => {
        return (sessionStorage.getItem('newUserID'))
    }
    var getUserContractData= () => {
        return JSON.parse(sessionStorage.getItem('userContractData'))
    }
    var getDrawer= () => {
        return sessionStorage.getItem('drawer')
    }
    var getNewUserStep= () => {
        return sessionStorage.getItem('NewUserStep')
    }
    var getNewUserErrorFinal= () => {
        console.log(sessionStorage.getItem('NewUserErrorFinal'))
        return sessionStorage.getItem('NewUserErrorFinal')
    }
    var getNewUserPex= () => {
        return JSON.parse(sessionStorage.getItem('newUserPex'))
    }
    var getNewUserFullData= () => {
        const dataNew = [{...JSON.parse(sessionStorage.getItem('newUserPex'))},{ ...JSON.parse(sessionStorage.getItem('newUserData'))}]
        return dataNew
    }
    var getNewUserError= () => {
        return sessionStorage.getItem('newUserError')
    }
    var getNewUserData= () => {
        return JSON.parse(sessionStorage.getItem('newUserData'))
    }
    var getUserMan= () => {
        return JSON.parse(sessionStorage.getItem('newUserMan'));
    }
    var getUserData= () => {
        return JSON.parse(sessionStorage.getItem('userData'));
    }
    var getCurrentPermission= () => {
        return JSON.parse(sessionStorage.getItem('userPex'));
    }
    var getCurrentPermissionEdit= () => {
        return JSON.parse(sessionStorage.getItem('userPexEdit'));
    }
    var getCode= () => {
        return (sessionStorage.getItem('codeUser'));
    }
    var getSelectedUser= () => {
        var dataToExport = []
        const fileName = 'lista_utenti'
        const exportType = 'csv' 
        var data = JSON.parse(sessionStorage.getItem('selectedUser'));
        console.log(data)
        data.map( (item) => dataToExport.push( JSON.parse( JSON.stringify({Nome: item.name,Tipologia: item.tipologia, Societa: item.societa}) ) ) )
        return(dataToExport)
    }

    return {
        setCurrentPermissionEdit,
        getCurrentPermissionEdit,
        setUserData,
        getUserData,
        setSelectedUser,
        getSelectedUser,
        setNewUserData,
        getNewUserData,
        setNewUserError,
        getNewUserError,
        setNewUserPex,
        getNewUserPex,
        getNewUserFullData,
        setNewUserErrorFinal,
        getNewUserErrorFinal,
        setNewUserStep,
        getNewUserStep,
        setDrawer,
        getDrawer,
        setUserContractData,
        getUserContractData,
        setUserMan,
        getUserMan,
        setCode,
        getCode,
        setNewUserID,
        getNewUserID,
        setCurrentPermission,
        getCurrentPermission
    }
        
}
