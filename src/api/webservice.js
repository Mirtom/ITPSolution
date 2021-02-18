import React, { useState,useEffect } from 'react'
import axios from 'axios';
import userData from '../pages/data/userData';
import { useHistory } from "react-router-dom";
import contractData from '../pages/data/contractData';
import anagraficaData from '../pages/data/anagraficaData';
import clientData from '../pages/data/clientData';

const parseString = require('xml2js').parseString;

export default() => {
    const { setNewContractID } = contractData()
    const { setTipoI,setClienteFromProgrammaData,setAssetFromProgrammaData,setAssetListData,setFullProgramma,setCurrentReport,setAcquisizioneData,setAssetID,setReferenteContrattoData,setInfoBoxData, setProgrammaListData,setAnagraficaAssetGroupID, setActivityListData, setAssetGroupList, setInterventoListData, setLastReportData, setSingleAsset, setLogData, setAllegatoData, setMezziListData,setNewRepID,setAvInterventi, setResultGroupDEL } = anagraficaData()
    const [errorHandle, setErrorHandle] = useState(99)
    const [userList, setUserList] = useState()
    const [assetList, setAssetList] = useState()
    const [clientList, setClientList] = useState()
    const { setUserData, setUserContractData,getUserData, setNewUserID, setCurrentPermission, setCurrentPermissionEdit } = userData();
    const { setNewContractClientList, setContractListData,setMaterialeData,
        setRR,
        setAnomalieData,setTabImpianti } = contractData()
    const { setNewClientID, setInterventoTMP } = clientData()
    const [registerError,setUserRegisterError] = useState(0)
    const history = useHistory();
    const delay = ms => new Promise(res => setTimeout(res, ms));

  const login = async (username,password) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <Login xmlns="http://itp.softwellitalia.it/">
                        <usr>${username}</usr>
                        <psw>${password}</psw>
                    </Login>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=Login', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/Login',
      }
    }).then( response => {
        parseString(response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].LoginResponse[0].LoginResult[0])[0].Resp == 1 ){
                setErrorHandle(1);
                setUserData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].LoginResponse[0].LoginResult[0])[0] )
                console.log(getUserData())
                getUserPermission( getUserData().Token,getUserData().ID )
                 if(getUserData().Tipologia == 'Utente'){
                     history.push('/ticket')
                 }else if(getUserData().Tipologia == 'Cliente'){
                     history.push('/clienti')
                 }else{
                    history.push('/dashboard')

                }
            }else{
                setErrorHandle(JSON.parse(result["soap:Envelope"]["soap:Body"][0].LoginResponse[0].LoginResult[0])[0].Resp);
            }
        });
    });
     
  }

  const getUserList = (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetUserList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetUserList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetUserList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetUserList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserListResponse[0].GetUserListResult[0])[0].Resp != -1 ){
                setErrorHandle(1);
                setUserList(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserListResponse[0].GetUserListResult[0]));
                console.log(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserListResponse[0].GetUserListResult[0]));
            }else{
                setErrorHandle(-1);
            }
        });
    });
    
  }

  const getUserPermission = (token,userId) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetUserPermission xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <idUser>${userId}</idUser>
                    </GetUserPermission>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetUserPermission', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetUserPermission',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
                
                if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserPermissionResponse[0].GetUserPermissionResult[0])[0]!== undefined ){
                    setCurrentPermission(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserPermissionResponse[0].GetUserPermissionResult[0])[0] );
                    
                }else{
                    alert('Utente senza permessi!')
                    history.push('/')
                    window.location.reload(false)
                }
        });
    });
    
  }

  const getUserPermissionEdit = (token,userId) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetUserPermission xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <idUser>${userId}</idUser>
                    </GetUserPermission>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetUserPermission', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetUserPermission',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            
                    setCurrentPermissionEdit(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserPermissionResponse[0].GetUserPermissionResult[0])[0] );
        });
    });
    
  }

  const getReportData = (token,rep) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetReportDataByProg xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byProg>${rep}</byProg>
                    </GetReportDataByProg>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetReportDataByProg', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetReportDataByProg',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setCurrentReport(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetReportDataByProgResponse[0].GetReportDataByProgResult[0]));

        });
    });
    
  }

  const getReportDataF = (token,rep) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetReportData xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <ElencoIdTicket>${rep}</ElencoIdTicket>
                    </GetReportData>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetReportData', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetReportData',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setCurrentReport(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetReportDataResponse[0].GetReportDataResult[0]));

        });
    });
    
  }

  const getUserContract = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetUserContract xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetUserContract>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetUserContract', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetUserContract',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserContractResponse[0].GetUserContractResult[0]).Resp != -1 ){
                setUserContractData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetUserContractResponse[0].GetUserContractResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const updateResponsabili = async ({token,responsabili,idContratto}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateResponsabili xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Responsabili>${responsabili}</Responsabili>
                        <id>${idContratto}</id>
                    </UpdateResponsabili>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateResponsabili', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateResponsabili',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateResponsabiliResponse[0].UpdateResponsabiliResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateResponsabiliResponse[0].UpdateResponsabiliResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }
  

  const changePassword = async ({token,id,psw}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <ChangePassword xmlns="http://itp.softwellitalia.it/">
                        <pToken>${token}</pToken>
                        <pId>${id}</pId>
                        <pPassword>${psw}</pPassword>
                    </ChangePassword>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=ChangePassword', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/ChangePassword',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].ChangePasswordResponse[0].ChangePasswordResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].ChangePasswordResponse[0].ChangePasswordResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const updateProgramma = async ({token,status,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <UpdateProgramma xmlns="http://itp.softwellitalia.it/">
        <Token>${token}</Token>
        <status>${status}</status>
        <id>${id}</id>
      </UpdateProgramma>
    </soap:Body>
  </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateProgramma', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateProgramma',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateProgrammaResponse[0].UpdateProgrammaResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateProgrammaResponse[0].UpdateProgrammaResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const updateContract = async ({token,titolo,tipologia,numero,nazionalita,localita,indirizzo,id,descrizione,datainizio,datafine,codicepostale}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateContratto xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <titolo>${titolo}</titolo>
                        <numero>${numero}</numero>
                        <nazionalita>${nazionalita}</nazionalita>
                        <indirizzo>${indirizzo}</indirizzo>
                        <dataInizio>${datainizio}</dataInizio>
                        <descrizione>${descrizione}</descrizione>
                        <localita>${localita}</localita>
                        <cap>${codicepostale}</cap>
                        <tipologia>${tipologia}</tipologia>
                        <dataFine>${datafine}</dataFine>
                        <id>${id}</id>
                    </UpdateContratto>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateContratto', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateContratto',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateContrattoResponse[0].UpdateContrattoResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateContrattoResponse[0].UpdateContrattoResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }
  const removeProgramma = async ({token,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <DeleteProgramma xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                    </DeleteProgramma>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteProgramma', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteProgramma',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteProgrammaResponse[0].DeleteProgrammaResult[0]) )
        });
    });
    
  }

  const deleteUser = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <DeleteUser xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                    </DeleteUser>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteUser', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteUser',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteUserResponse[0].DeleteUserResult[0]) )
        });
    });
    
  }

  const deleteContract = async ({token,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <DeleteContract xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                    </DeleteContract>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteContract', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteContract',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteContractResponse[0].DeleteContractResult[0]) )
        });
    });
    
  }

  const deleteClient = async ({token,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <DeleteClient xmlns="http://itp.softwellitalia.it/">
        <Token>${token}</Token>
        <id>${id}</id>
      </DeleteClient>
    </soap:Body>
  </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteClient', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteClient',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteClientResponse[0].DeleteClientResult[0]) )
        });
    });
    
  }

  const getClientList = (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetClientList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetClientList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetClientList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetClientList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetClientListResponse[0].GetClientListResult[0])[0].Resp != -1 ){
                setErrorHandle(1);
                setClientList(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetClientListResponse[0].GetClientListResult[0]));
                setNewContractClientList(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetClientListResponse[0].GetClientListResult[0]))
                }else{
                setErrorHandle(-1);
            }
        });
    });
    
  }

  const getMezziList = (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetMezziList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetMezziList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetMezziList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetMezziList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetMezziListResponse[0].GetMezziListResult[0])[0].Resp != -1 ){
                setMezziListData(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetMezziListResponse[0].GetMezziListResult[0]));
               }
        });
    });
    
  }

  const updateMezzi = async ({token,assigned,targa}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateMezzi xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <assigned>${assigned}</assigned>
                        <id>${targa}</id>
                    </UpdateMezzi>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateMezzi', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateMezzi',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateMezziResponse[0].UpdateMezziResult[0]) )
        });
    });
    
  }

  const getContractList = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetContractList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetContractList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetContractList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetContractList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetContractListResponse[0].GetContractListResult[0])[0].Resp != -1 ){
                setErrorHandle(1);
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetContractListResponse[0].GetContractListResult[0]) )
                setContractListData(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetContractListResponse[0].GetContractListResult[0]))
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const updateAccepted = async ({token,id,accepted}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateAccepted xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                        <accepted>${accepted}</accepted>
                    </UpdateAccepted>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateAccepted', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateAccepted',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log(JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateAcceptedResponse[0].UpdateAcceptedResult[0]))
        });
    });
    
  }

  const createUser = async (token,cognome,nome,email,psw,societa,ruolo,tipologia,codiceAtt,telefono,ofCliente) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateUser xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Cognome>${cognome}</Cognome>
                        <Nome>${nome}</Nome>
                        <Email>${email}</Email>
                        <Psw>${psw}</Psw>
                        <Societa>${societa}</Societa>
                        <Ruolo>${ruolo}</Ruolo>
                        <Tipologia>${tipologia}</Tipologia>
                        <CodiceAtt>${codiceAtt}</CodiceAtt>
                        <Telefono>${telefono}</Telefono>
                        <ofCliente>${ofCliente}</ofCliente>
                    </CreateUser>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateUser', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateUser',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            var resp = JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateUserResponse[0].CreateUserResult[0])[0].Resp
            setNewUserID( resp )
            switch(resp){
                case -1:
                    setUserRegisterError(-1)
                case -2:
                    setUserRegisterError(-2)
                case -3:
                    setUserRegisterError(-3)
                    default:
                        //history.push('/newUser/final')

            }

        });
    });
    
  }

  const createContratto = async ({token,titolo,numero,nazionalita,indirizzo,dataInizio,descrizione,cliente,account,localita,cap,tipologia,dataFine,isSub}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <CreateContratto xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <titolo>${titolo}</titolo>
                        <numero>${numero}</numero>
                        <nazionalita>${nazionalita}</nazionalita>
                        <indirizzo>${indirizzo}</indirizzo>
                        <dataInizio>${dataInizio}</dataInizio>
                        <descrizione>${descrizione}</descrizione>
                        <cliente>${cliente}</cliente>
                        <account>${account}</account>
                        <localita>${localita}</localita>
                        <cap>${cap}</cap>
                        <tipologia>${tipologia}</tipologia>
                        <dataFine>${dataFine}</dataFine>
                        <isSub>${isSub}</isSub>
                        </CreateContratto>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateContratto', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateContratto',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateContrattoResponse[0].CreateContrattoResult[0]) )
            setNewContractID( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateContrattoResponse[0].CreateContrattoResult[0])[0].Resp )
        });
    });
    
  }

  const createAsset = async ({token,titolo,codice,matricola,marca,otherInfo,edificio,piano,stanza,areaEsterna,descrizione,byGroup,byContract}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateAsset xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <titolo>${titolo}</titolo>
                        <codice>${codice}</codice>
                        <matricola>${matricola}</matricola>
                        <marca>${marca}</marca>
                        <otherInfo>${otherInfo}</otherInfo>
                        <edificio>${edificio}</edificio>
                        <piano>${piano}</piano>
                        <stanza>${stanza}</stanza>
                        <areaEsterna>${areaEsterna}</areaEsterna>
                        <descrizione>${descrizione}</descrizione>
                        <byContract>${byContract}</byContract>
                        <byGroup>${byGroup}</byGroup>
                    </CreateAsset>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateAsset', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateAsset',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setAssetID( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateAssetResponse[0].CreateAssetResult[0])[0].Resp )
        });
    });
    
  }

  const createUserPermission = async ({token,listaContratto,nuovoContratto,anagraficaContratto,anagraficaHomeContratto,anagraficaReportContratto,anagraficaSituazioneContratto,anagraficaDocumentiContratto,anagraficaImpostazioniContratto,programmaContratto,attivitaContratto,listaClienti,nuovoCliente,anagraficaCliente,anagraficaHomeCliente,anagraficaReportCliente,anagraficaDocumentiCliente,anagraficaImpostazioniCliente,listaTicket,reportTicket,listaCommesse,nuovaCommessa,anagraficaCommessa,idUser}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateUserPermission xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <listaContratto>${listaContratto}</listaContratto>
                        <nuovoContratto>${nuovoContratto}</nuovoContratto>
                        <anagraficaContratto>${anagraficaContratto}</anagraficaContratto>
                        <anagraficaHomeContratto>${anagraficaHomeContratto}</anagraficaHomeContratto>
                        <anagraficaReportContratto>${anagraficaReportContratto}</anagraficaReportContratto>
                        <anagraficaSituazioneContratto>${anagraficaSituazioneContratto}</anagraficaSituazioneContratto>
                        <anagraficaDocumentiContratto>${anagraficaDocumentiContratto}</anagraficaDocumentiContratto>
                        <anagraficaImpostazioniContratto>${anagraficaImpostazioniContratto}</anagraficaImpostazioniContratto>
                        <programmaContratto>${programmaContratto}</programmaContratto>
                        <attivitaContratto>${attivitaContratto}</attivitaContratto>
                        <listaClienti>${listaClienti}</listaClienti>
                        <nuovoCliente>${nuovoCliente}</nuovoCliente>
                        <anagraficaCliente>${anagraficaCliente}</anagraficaCliente>
                        <anagraficaHomeCliente>${anagraficaHomeCliente}</anagraficaHomeCliente>
                        <anagraficaReportCliente>${anagraficaReportCliente}</anagraficaReportCliente>
                        <anagraficaDocumentiCliente>${anagraficaDocumentiCliente}</anagraficaDocumentiCliente>
                        <anagraficaImpostazioniCliente>${anagraficaImpostazioniCliente}</anagraficaImpostazioniCliente>
                        <listaTicket>${listaTicket}</listaTicket>
                        <reportTicket>${reportTicket}</reportTicket>
                        <listaCommesse>${listaCommesse}</listaCommesse>
                        <nuovaCommessa>${nuovaCommessa}</nuovaCommessa>
                        <anagraficaCommessa>${anagraficaCommessa}</anagraficaCommessa>
                        <idUser>${idUser}</idUser>
                    </CreateUserPermission>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateUserPermission', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateUserPermission',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateUserPermissionResponse[0].CreateUserPermissionResult[0])[0].Resp )
        });
    });
    
  }

  const updateUserPermission = async ({token,listaContratto,nuovoContratto,anagraficaContratto,anagraficaHomeContratto,anagraficaReportContratto,anagraficaSituazioneContratto,anagraficaDocumentiContratto,anagraficaImpostazioniContratto,programmaContratto,attivitaContratto,listaClienti,nuovoCliente,anagraficaCliente,anagraficaHomeCliente,anagraficaReportCliente,anagraficaDocumentiCliente,anagraficaImpostazioniCliente,listaTicket,reportTicket,listaCommesse,nuovaCommessa,anagraficaCommessa,idUser}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <UpdateUserPermission xmlns="http://itp.softwellitalia.it/">
                            <Token>${token}</Token>
                            <listaContratto>${listaContratto}</listaContratto>
                            <nuovoContratto>${nuovoContratto}</nuovoContratto>
                            <anagraficaContratto>${anagraficaContratto}</anagraficaContratto>
                            <anagraficaHomeContratto>${anagraficaHomeContratto}</anagraficaHomeContratto>
                            <anagraficaReportContratto>${anagraficaReportContratto}</anagraficaReportContratto>
                            <anagraficaSituazioneContratto>${anagraficaSituazioneContratto}</anagraficaSituazioneContratto>
                            <anagraficaDocumentiContratto>${anagraficaDocumentiContratto}</anagraficaDocumentiContratto>
                            <anagraficaImpostazioniContratto>${anagraficaImpostazioniContratto}</anagraficaImpostazioniContratto>
                            <programmaContratto>${programmaContratto}</programmaContratto>
                            <attivitaContratto>${attivitaContratto}</attivitaContratto>
                            <listaClienti>${listaClienti}</listaClienti>
                            <nuovoCliente>${nuovoCliente}</nuovoCliente>
                            <anagraficaCliente>${anagraficaCliente}</anagraficaCliente>
                            <anagraficaHomeCliente>${anagraficaHomeCliente}</anagraficaHomeCliente>
                            <anagraficaReportCliente>${anagraficaReportCliente}</anagraficaReportCliente>
                            <anagraficaDocumentiCliente>${anagraficaDocumentiCliente}</anagraficaDocumentiCliente>
                            <anagraficaImpostazioniCliente>${anagraficaImpostazioniCliente}</anagraficaImpostazioniCliente>
                            <listaTicket>${listaTicket}</listaTicket>
                            <reportTicket>${reportTicket}</reportTicket>
                            <listaCommesse>${listaCommesse}</listaCommesse>
                            <nuovaCommessa>${nuovaCommessa}</nuovaCommessa>
                            <anagraficaCommessa>${anagraficaCommessa}</anagraficaCommessa>
                            <idUser>${idUser}</idUser>
                        </UpdateUserPermission>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateUserPermission', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateUserPermission',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateUserPermissionResponse[0].UpdateUserPermissionResult[0])[0].Resp )
        });
    });
    
  }

  const updateAsset = async ({token,titolo,codice,matricola,marca,otherInfo,edificio,piano,stanza,areaEsterna,descrizione,byGroup,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateAsset xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <titolo>${titolo}</titolo>
                        <codice>${codice}</codice>
                        <matricola>${matricola}</matricola>
                        <marca>${marca}</marca>
                        <otherInfo>${otherInfo}</otherInfo>
                        <edificio>${edificio}</edificio>
                        <piano>${piano}</piano>
                        <stanza>${stanza}</stanza>
                        <areaEsterna>${areaEsterna}</areaEsterna>
                        <descrizione>${descrizione}</descrizione>
                        <byGroup>${byGroup}</byGroup>
                        <id>${id}</id>
                    </UpdateAsset>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateAsset', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateAsset',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateAssetResponse[0].UpdateAssetResult[0]) )
        });
    });
    
  }

  const createAssetGroup = async ({token,titolo,descrizione,nAsset,codice,edificio,piano,stanza,byContratto}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateAssetGroup xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <titolo>${titolo}</titolo>
                        <descrizione>${descrizione}</descrizione>
                        <nAsset>${nAsset}</nAsset>
                        <codice>${codice}</codice>
                        <edificio>${edificio}</edificio>
                        <piano>${piano}</piano>
                        <stanza>${stanza}</stanza>
                        <byContratto>${byContratto}</byContratto>
                    </CreateAssetGroup>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateAssetGroup', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateAssetGroup',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {

            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateAssetGroupResponse[0].CreateAssetGroupResult[0]).Resp != -1 ){
                setAnagraficaAssetGroupID(JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateAssetGroupResponse[0].CreateAssetGroupResult[0])[0].Resp)
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getAssetList = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetAssetList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${id}</Id>
                    </GetAssetList>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetAssetList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetAssetList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetListResponse[0].GetAssetListResult[0]).Resp != -1 ){
                setAssetListData(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetListResponse[0].GetAssetListResult[0]))
                setAssetList(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetListResponse[0].GetAssetListResult[0]))
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getAssedById = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetAssetById xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${id}</Id>
                    </GetAssetById>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetAssetById', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetAssetById',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetByIdResponse[0].GetAssetByIdResult[0]).Resp != -2 ){
                console.log(JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetByIdResponse[0].GetAssetByIdResult[0])[0])
                setSingleAsset( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetByIdResponse[0].GetAssetByIdResult[0])[0] )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getActivityList = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetActivityList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${id}</Id>
                    </GetActivityList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetActivityList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetActivityList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetActivityListResponse[0].GetActivityListResult[0]).Resp != -1 ){
                setActivityListData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetActivityListResponse[0].GetActivityListResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getProgrammaList = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <GetProgrammaList xmlns="http://itp.softwellitalia.it/">
                    <Token>${token}</Token>
                    <Id>${id}</Id>
                    </GetProgrammaList>
                </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetProgrammaList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetProgrammaList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetProgrammaListResponse[0].GetProgrammaListResult[0]).Resp != -1 ){
                console.log(result)
                setProgrammaListData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetProgrammaListResponse[0].GetProgrammaListResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const createInfoBox = async ({token,idUser,descrizione,byAsset,intestazione}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateInfoBox xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <idUser>${idUser}</idUser>
                        <descrizione>${descrizione}</descrizione>
                        <byAsset>${byAsset}</byAsset>
                        <intestazione>${intestazione}</intestazione>
                    </CreateInfoBox>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateInfoBox', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateInfoBox',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateInfoBoxResponse[0].CreateInfoBoxResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateInfoBoxResponse[0].CreateInfoBoxResult[0]).Resp )
                }else{
                history.push('/')
            }
        });
    });
    
  }

  const uploadAllegato = async ({token,path,byContratto,owner}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UploadAllegato xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <path>${path}</path>
                        <byContratto>${byContratto}</byContratto>
                        <owner>${owner}</owner>
                    </UploadAllegato>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UploadAllegato', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UploadAllegato',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UploadAllegatoResponse[0].UploadAllegatoResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UploadAllegatoResponse[0].UploadAllegatoResult[0]).Resp )
                }else{
                history.push('/')
            }
        });
    });
    
  }

  const getInfoBox = async (token,byAsset) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <getInfoBox xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byAsset>${byAsset}</byAsset>
                    </getInfoBox>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=getInfoBox', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/getInfoBox',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].getInfoBoxResponse[0].getInfoBoxResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].getInfoBoxResponse[0].getInfoBoxResult[0]).Resp )
                setInfoBoxData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].getInfoBoxResponse[0].getInfoBoxResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getAllegato = async (token,byContratto) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetAllegato xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byContratto>${byContratto}</byContratto>
                    </GetAllegato>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetAllegato', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetAllegato',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAllegatoResponse[0].GetAllegatoResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAllegatoResponse[0].GetAllegatoResult[0]).Resp )
                setAllegatoData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAllegatoResponse[0].GetAllegatoResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getFullAllegato = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetFullAllegato xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetFullAllegato>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetFullAllegato', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetFullAllegato',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetFullAllegatoResponse[0].GetFullAllegatoResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetFullAllegatoResponse[0].GetFullAllegatoResult[0]).Resp )
                setAllegatoData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetFullAllegatoResponse[0].GetFullAllegatoResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const GetAcquisizione = async (token,byContract) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetAcquisizione xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byContract>${byContract}</byContract>
                    </GetAcquisizione>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetAcquisizione', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetAcquisizione',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAcquisizioneResponse[0].GetAcquisizioneResult[0]).Resp != -1 ){
                setAcquisizioneData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAcquisizioneResponse[0].GetAcquisizioneResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const GetClienteFromProgramma = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetClienteFromProgramma xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${id}</Id>
                    </GetClienteFromProgramma>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetClienteFromProgramma', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetClienteFromProgramma',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetClienteFromProgrammaResponse[0].GetClienteFromProgrammaResult[0]).Resp != -1 ){
                setClienteFromProgrammaData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetClienteFromProgrammaResponse[0].GetClienteFromProgrammaResult[0])[0] )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const GetFullInterventoList = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetFullInterventoList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetFullInterventoList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetFullInterventoList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetFullInterventoList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetFullInterventoListResponse[0].GetFullInterventoListResult[0]).Resp != -1 ){
                setInterventoListData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetFullInterventoListResponse[0].GetFullInterventoListResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const GetAssetFromProgramma = async (token,idd) => {
      console.log(token,idd)
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetAssetFromProgramma xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${idd}</Id>
                    </GetAssetFromProgramma>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetAssetFromProgramma', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetAssetFromProgramma',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetFromProgrammaResponse[0].GetAssetFromProgrammaResult[0]).Resp != -1 ){
                console.log(result)
                setSingleAsset( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetFromProgrammaResponse[0].GetAssetFromProgrammaResult[0])[0] )
                setAssetFromProgrammaData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAssetFromProgrammaResponse[0].GetAssetFromProgrammaResult[0])[0] )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const GetReferenteContratto = async (token,byContract) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetReferenteContratto xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byContract>${byContract}</byContract>
                    </GetReferenteContratto>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetReferenteContratto', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetReferenteContratto',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetReferenteContrattoResponse[0].GetReferenteContrattoResult[0]).Resp != -1 ){
                setReferenteContrattoData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetReferenteContrattoResponse[0].GetReferenteContrattoResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getFullProgrammaReq = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <GetFullProgramma xmlns="http://itp.softwellitalia.it/">
        <Token>${token}</Token>
      </GetFullProgramma>
    </soap:Body>
  </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetFullProgramma', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetFullProgramma',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetFullProgrammaResponse[0].GetFullProgrammaResult[0]).Resp != -1 ){
                console.log(result)
                setFullProgramma( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetFullProgrammaResponse[0].GetFullProgrammaResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getGroupAssetList = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetGroupAssetList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${id}</Id>
                    </GetGroupAssetList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetGroupAssetList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetGroupAssetList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetGroupAssetListResponse[0].GetGroupAssetListResult[0]).Resp != -1 ){
                setAssetGroupList( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetGroupAssetListResponse[0].GetGroupAssetListResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const createActivity = async (token,tipologia,periodo,descrizione,numContratto) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" encoding="UTF-8">
                    <soap:Body>
                    <CreateActivity xmlns="http://itp.softwellitalia.it/" encoding="UTF-8">
                        <Token>${token}</Token>
                        <tipologia>${tipologia}</tipologia>
                        <periodo>${periodo}</periodo>
                        <descrizione>${descrizione}</descrizione>
                        <numContratto>${numContratto}</numContratto>
                    </CreateActivity>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateActivity', xml, {
      headers:{
          'Content-Type': 'text/xml;charset=utf-8',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateActivity',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateActivityResponse[0].CreateActivityResult[0]) )

        });
    });
    
  }



  const createPrograma = async (token,idIntervento,stato,tempi,dataInizio,dataFine,idCliente,desc,byContratto,date) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateProgramma xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <stato>${stato}</stato>
                        <idIntervento>${idIntervento}</idIntervento>
                        <idCliente>${idCliente}</idCliente>
                        <desc>${desc}</desc>
                        <dataInizio>${dataInizio}</dataInizio>
                        <dataFine>${dataFine}</dataFine>
                        <tempi>${tempi}</tempi>
                        <byContratto>${byContratto}</byContratto>
                        <created>${date}</created>
                    </CreateProgramma>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateProgramma', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateProgramma',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateProgrammaResponse[0].CreateProgrammaResult[0]) )

        });
    });
    
  }

  const updateActivity = async ({token,id,tipologia,periodo,descrizione,idContratto}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateActivity xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <tipologia>${tipologia}</tipologia>
                        <periodo>${periodo}</periodo>
                        <descrizione>${descrizione}</descrizione>
                        <idContratto>${idContratto}</idContratto>
                        <id>${id}</id>
                    </UpdateActivity>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateActivity', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateActivity',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateActivityResponse[0].UpdateActivityResult[0]) )
        });
    });
    
  }

  const updateUser = async ({Token,Nome,Cognome,Email,Societa,Ruolo,Tipologia,Telefono,id,ofCliente}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateUser xmlns="http://itp.softwellitalia.it/">
                        <Token>${Token}</Token>
                        <Nome>${Nome}</Nome>
                        <Cognome>${Cognome}</Cognome>
                        <Email>${Email}</Email>
                        <Societa>${Societa}</Societa>
                        <Ruolo>${Ruolo}</Ruolo>
                        <Tipologia>${Tipologia}</Tipologia>
                        <Telefono>${Telefono}</Telefono>
                        <id>${id}</id>
                        <ofCliente>${ofCliente}</ofCliente>
                        
                    </UpdateUser>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateUser', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateUser',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateUserResponse[0].UpdateUserResult[0]) )
        });
    });
    
  }

  const deleteActivity = async ({token,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <DeleteActivity xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                    </DeleteActivity>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteActivity', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteActivity',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteActivityResponse[0].DeleteActivityResult[0]) )
        });
    });
    }

    const deleteTipologieIntervento = async ({token,id}) => {
        const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                        <soap:Body>
                        <DeleteTipologiaIntervento xmlns="http://itp.softwellitalia.it/">
                            <Token>${token}</Token>
                            <id>${id}</id>
                        </DeleteTipologiaIntervento>
                        </soap:Body>
                    </soap:Envelope>`;
      
        await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteTipologiaIntervento', xml, {
          headers:{
              'Content-Type': 'text/xml',
              'SOAPAction': 'http://itp.softwellitalia.it/DeleteTipologiaIntervento',
          }
        }).then( response => {
            parseString  (response.data, function (err, result) {
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteTipologiaInterventoResponse[0].DeleteTipologiaInterventoResult[0]) )
            });
        });
    
  }

  const deleteAllegato = async ({token,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <DeleteAllegato xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                    </DeleteAllegato>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteAllegato', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteAllegato',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteAllegatoResponse[0].DeleteAllegatoResult[0]) )
        });
    });
    
  }

  const sendPassword = async (mail) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <SendPassword xmlns="http://itp.softwellitalia.it/">
                        <pTokenStatico>A_4uYe8zI16ASXj23esayaEcs8j</pTokenStatico>
                        <pIndirizzoEmail>${mail}</pIndirizzoEmail>
                    </SendPassword>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=SendPassword', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/SendPassword',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].SendPasswordResponse[0].SendPasswordResult[0]) )
        });
    });
    
  }

  const deleteAsset = async ({token,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <DeleteAsset xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <idAsset>${id}</idAsset>
                    </DeleteAsset>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteAsset', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteAsset',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteAssetResponse[0].DeleteAssetResult[0]) )
        });
    });
    
  }

  const deleteAssetGroup = async ({token,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <DeleteAssetGroup xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <idGruppo>${id}</idGruppo>
                    </DeleteAssetGroup>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=DeleteAssetGroup', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/DeleteAssetGroup',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteAssetGroupResponse[0].DeleteAssetGroupResult[0]) )
            setResultGroupDEL( JSON.parse(result["soap:Envelope"]["soap:Body"][0].DeleteAssetGroupResponse[0].DeleteAssetGroupResult[0])[0].Resp )
        });
    });
    
  }

  const createIntervento = async ({token,tipologia,tempi,dataInizio,dataFine,priorita,ragSociale,byContratto,descrizione,byAsset,previsioneTermine,created}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateIntervento xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <tipologia>${tipologia}</tipologia>
                        <tempi>${tempi}</tempi>
                        <dataInizio>${dataInizio}</dataInizio>
                        <dataFine>${dataFine}</dataFine>
                        <priorita>${priorita}</priorita>
                        <ragSociale>${ragSociale}</ragSociale>
                        <byContratto>${byContratto}</byContratto>
                        <descrizione>${descrizione}</descrizione>
                        <byAsset>${byAsset}</byAsset>
                        <previsioneTermine>${previsioneTermine}</previsioneTermine>
                        <created>${created}</created>
                    </CreateIntervento>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateIntervento', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateIntervento',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateInterventoResponse[0].CreateInterventoResult[0]) )

        });
    });
    
  }
  const getInterventoList = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetInterventoList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${id}</Id>
                    </GetInterventoList>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetInterventoList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetInterventoList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetInterventoListResponse[0].GetInterventoListResult[0]).Resp != -1 ){
                setInterventoListData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetInterventoListResponse[0].GetInterventoListResult[0]) )
                console.log(typeof  JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetInterventoListResponse[0].GetInterventoListResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }
  const getInterventoListCLIENT = async (token,contract) => {
    setInterventoTMP(null)
    contract.map( async item => {
        const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetInterventoList xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${item.id}</Id>
                    </GetInterventoList>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetInterventoList', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetInterventoList',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetInterventoListResponse[0].GetInterventoListResult[0]).Resp != -1 ){
                let res = JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetInterventoListResponse[0].GetInterventoListResult[0])
                
                if(res.length >0){
                    if(res.length === 1){
                        setInterventoTMP(res)
                    }else{
                        setInterventoTMP(res)
                    }
                }
            }else{
                history.push('/')
            }
        });
    });
    } )
  }
  const getLastReport = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetLastReport xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Id>${id}</Id>
                    </GetLastReport>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetLastReport', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetLastReport',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetLastReportResponse[0].GetLastReportResult[0]).Resp != -1 ){
                setLastReportData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetLastReportResponse[0].GetLastReportResult[0])[0] )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const getLogBox = async (token,byAsset) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetLogBox xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byAsset>${byAsset}</byAsset>
                    </GetLogBox>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetLogBox', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetLogBox',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetLogBoxResponse[0].GetLogBoxResult[0]).Resp != -1 ){
                setLogData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetLogBoxResponse[0].GetLogBoxResult[0]) )
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetLogBoxResponse[0].GetLogBoxResult[0]) )
            }else{
                history.push('/')
            }
        });
    });
    
  }
  const createLog = async ({token,type,contenuto,byAsset,byUser}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateLog xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <type>${type}</type>
                        <contenuto>${contenuto}</contenuto>
                        <byAsset>${byAsset}</byAsset>
                        <byUser>${byUser}</byUser>
                    </CreateLog>
                    </soap:Body>
                </soap:Envelope>`;
  
    axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateLog', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateLog',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            if( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateLogResponse[0].CreateLogResult[0]).Resp != -1 ){
                console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateLogResponse[0].CreateLogResult[0])[0].Resp )
            }else{
                history.push('/')
            }
        });
    });
    
  }

  const updateClient = async ({token,ragSociale,estensioneRagSociale,codicefiscale,codicepostale,indirizzo,localita,nazionalita,pIva,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateCliente xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <rSociale>${ragSociale}</rSociale>
                        <estensioneRSociale>${estensioneRagSociale}</estensioneRSociale>
                        <nazionalita>${nazionalita}</nazionalita>
                        <localita>${localita}</localita>
                        <indirizzo>${indirizzo}</indirizzo>
                        <cap>${codicepostale}</cap>
                        <cf>${codicefiscale}</cf>
                        <pIVA>${pIva}</pIVA>
                        <id>${id}</id>
                    </UpdateCliente>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateCliente', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateCliente',
      }
    }).then( response => {
        parseString  (response.data, async function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateClienteResponse[0].UpdateClienteResult[0]) )
            //await setNewClientID( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateClientResponse[0].CreateClientResult[0])[0].Resp )
        });
    });
    
  }

  const createClient = async ({token,ragSociale,estensioneRagSociale,codicefiscale,codicepostale,indirizzo,localita,nazionalita,pIva}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateClient xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <rSociale>${ragSociale}</rSociale>
                        <estensioneRSociale>${estensioneRagSociale}</estensioneRSociale>
                        <nazionalita>${nazionalita}</nazionalita>
                        <localita>${localita}</localita>
                        <indirizzo>${indirizzo}</indirizzo>
                        <cap>${codicepostale}</cap>
                        <cf>${codicefiscale}</cf>
                        <pIVA>${pIva}</pIVA>
                    </CreateClient>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateClient', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateClient',
      }
    }).then( response => {
        parseString  (response.data, async function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateClientResponse[0].CreateClientResult[0]) )
            await setNewClientID( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateClientResponse[0].CreateClientResult[0])[0].Resp )
        });
    });
    
  }
  const createContattiClienti = async ({token,nome,pec,posizione,telefono_one,telefono_two,email,byCliente}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateContattiClienti xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <nome>${nome}</nome>
                        <telefono_one>${telefono_one}</telefono_one>
                        <telefono_two>${telefono_two}</telefono_two>
                        <email>${email}</email>
                        <posizione>${posizione}</posizione>
                        <pec>${pec}</pec>
                        <byCliente>${byCliente}</byCliente>
                    </CreateContattiClienti>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateContattiClienti', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateContattiClienti',
      }
    }).then( response => {
        parseString  (response.data, async function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateContattiClientiResponse[0].CreateContattiClientiResult[0]) )
        });
    });
  }
  const createReferentiClienti = async ({token,nome,pec,posizione,telefono_one,telefono_two,email,byCliente,id}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateReferentiClienti xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <nome>${nome}</nome>
                        <telefono_one>${telefono_one}</telefono_one>
                        <telefono_two>${telefono_two}</telefono_two>
                        <email>${email}</email>
                        <posizione>${posizione}</posizione>
                        <pec>${pec}</pec>
                        <byCliente>${byCliente}</byCliente>
                        <id>${id}</id>
                    </CreateReferentiClienti>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateReferentiClienti', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateReferentiClienti',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateReferentiClientiResponse[0].CreateReferentiClientiResult[0]) )

        });
    });
  }

  const createReferenteContratto = async ({token,nome,cognome,posizione,nTel,nTelS,email,pec,byContract}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateReferenteContratto xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <nome>${nome}</nome>
                        <cognome>${cognome}</cognome>
                        <posizione>${posizione}</posizione>
                        <nTel>${nTel}</nTel>
                        <nTelS>${nTelS}</nTelS>
                        <email>${email}</email>
                        <pec>${pec}</pec>
                        <byContract>${byContract}</byContract>
                    </CreateReferenteContratto>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateReferenteContratto', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateReferenteContratto',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateReferenteContrattoResponse[0].CreateReferenteContrattoResult[0]) )

        });
    });
  }

  const createAcquisizione = async ({token,bAsta,pTot,cManodopera,vManodopera,cMateriale,vMateriale,vVari,cVari,byContract}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateAcquisizione xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <bAsta>${bAsta}</bAsta>
                        <pTot>${pTot}</pTot>
                        <cManodopera>${cManodopera}</cManodopera>
                        <vManodopera>${vManodopera}</vManodopera>
                        <cMateriale>${cMateriale}</cMateriale>
                        <vMaterial>${vMateriale}</vMaterial>
                        <vVari>${vVari}</vVari>
                        <cVari>${cVari}</cVari>
                        <byContract>${byContract}</byContract>
                    </CreateAcquisizione>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateAcquisizione', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateAcquisizione',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateAcquisizioneResponse[0].CreateAcquisizioneResult[0]) )

        });
    });
  }

  const updateAcquisizione = async ({token,bAsta,pTot,cManodopera,vManodopera,cMateriale,vMateriale,vVari,cVari,byContract}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <UpdateAcquisizione xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <bAsta>${bAsta}</bAsta>
                        <pTot>${pTot}</pTot>
                        <cManodopera>${cManodopera}</cManodopera>
                        <vManodopera>${vManodopera}</vManodopera>
                        <cMateriale>${cMateriale}</cMateriale>
                        <vMaterial>${vMateriale}</vMaterial>
                        <vVari>${vVari}</vVari>
                        <cVari>${cVari}</cVari>
                        <byContract>${byContract}</byContract>
                    </UpdateAcquisizione>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=UpdateAcquisizione', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/UpdateAcquisizione',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].UpdateAcquisizioneResponse[0].UpdateAcquisizioneResult[0]) )

        });
    });
  }

  


  const createReport = async ({token,descrizione,byProg,byContratto}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateReport xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <descrizione>${descrizione}</descrizione>
                        <byProg>${byProg}</byProg>
                        <byContratto>${byContratto}</byContratto>
                    </CreateReport>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateReport', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateReport',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateReportResponse[0].CreateReportResult[0]) )
            setNewRepID( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateReportResponse[0].CreateReportResult[0])[0].Resp )
        });
    });
    
  }

  const createAnomalia = async ({token,codice,descrizione,byTicket}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateAnomalia xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <codice>${codice}</codice>
                        <descrizione>${descrizione}</descrizione>
                        <byTicket>${byTicket}</byTicket>
                    </CreateAnomalia>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateAnomalia', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateAnomalia',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateAnomaliaResponse[0].CreateAnomaliaResult[0]) )
        });
    });
    
  }

  const createMateriale = async ({token,codice,descrizione,nome,quantita,byTicket}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateMateriale xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <codice>${codice}</codice>
                        <descrizione>${descrizione}</descrizione>
                        <nome>${nome}</nome>
                        <quantita>${quantita}</quantita>
                        <byTicket>${byTicket}</byTicket>
                    </CreateMateriale>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateMateriale', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateMateriale',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateMaterialeResponse[0].CreateMaterialeResult[0]) )
        });
    });
    
  }

  const createManodopera = async ({token,idUser,hOrd,byTicket}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateManodopera xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <idUser>${idUser}</idUser>
                        <hOrd>${hOrd}</hOrd>
                        <byTicket>${byTicket}</byTicket>
                    </CreateManodopera>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateManodopera', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateManodopera',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateManodoperaResponse[0].CreateManodoperaResult[0]) )
        });
    });
    
  }




  const getInterventoFromProgramma = async (token,byProg) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetInterventoFromProgramma xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byProg>${byProg}</byProg>
                    </GetInterventoFromProgramma>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetInterventoFromProgramma', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetInterventoFromProgramma',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetInterventoFromProgrammaResponse[0].GetInterventoFromProgrammaResult[0]) )
        });
    });
    
  }
  const getMateriale = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetMateriale xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                    </GetMateriale>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetMateriale', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetMateriale',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setMaterialeData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetMaterialeResponse[0].GetMaterialeResult[0]) )
        });
    });
    
  }
  const getAnomalie = async (token,id) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetAnomalie xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <id>${id}</id>
                    </GetAnomalie>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetAnomalie', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetAnomalie',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setAnomalieData( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAnomalieResponse[0].GetAnomalieResult[0]) )
        });
    });
    
  }
  const getReport = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                        <soap:Body>
                        <GetReport xmlns="http://itp.softwellitalia.it/">
                            <Token>${token}</Token>
                        </GetReport>
                        </soap:Body>
                    </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetReport', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetReport',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setRR( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetReportResponse[0].GetReportResult[0]) )
        });
    });
    
  }

  const getAvailableInterventi = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetAvailableInterventi xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetAvailableInterventi>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetAvailableInterventi', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetAvailableInterventi',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setAvInterventi( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetAvailableInterventiResponse[0].GetAvailableInterventiResult[0]) )
        });
    });
    
  }

  const getTipologieIntervento = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <GetTipologieIntervento xmlns="http://itp.softwellitalia.it/">
        <Token>${token}</Token>
      </GetTipologieIntervento>
    </soap:Body>
  </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetTipologieIntervento', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetTipologieIntervento',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setTipoI( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetTipologieInterventoResponse[0].GetTipologieInterventoResult[0]) )
        });
    });
    
  }

  const getTabTipoImpianti = async (token) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <GetTabTipoImpianti xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                    </GetTabTipoImpianti>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=GetTabTipoImpianti', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/GetTabTipoImpianti',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            setTabImpianti( JSON.parse(result["soap:Envelope"]["soap:Body"][0].GetTabTipoImpiantiResponse[0].GetTabTipoImpiantiResult[0]) )
        });
    });
    
  }

  const createTipologiaIntervento = async ({token,byTipologia,nome}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateTipologiaIntervento xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <byTipologia>${byTipologia}</byTipologia>
                        <Nome>${nome}</Nome>
                    </CreateTipologiaIntervento>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateTipologiaIntervento', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateTipologiaIntervento',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateTipologiaInterventoResponse[0].CreateTipologiaInterventoResult[0]) )
        });
    });
    
  }

  const createTabImpianto = async ({token,nome}) => {
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                    <CreateTabTipoimpianti xmlns="http://itp.softwellitalia.it/">
                        <Token>${token}</Token>
                        <Descr>${nome}</Descr>
                    </CreateTabTipoimpianti>
                    </soap:Body>
                </soap:Envelope>`;
  
    await axios.post('https://itp.softwellitalia.it/ws/ws_web.asmx?op=CreateTabTipoimpianti', xml, {
      headers:{
          'Content-Type': 'text/xml',
          'SOAPAction': 'http://itp.softwellitalia.it/CreateTabTipoimpianti',
      }
    }).then( response => {
        parseString  (response.data, function (err, result) {
            console.log( JSON.parse(result["soap:Envelope"]["soap:Body"][0].CreateTabTipoimpiantiResponse[0].CreateTabTipoimpiantiResult[0]) )
        });
    });
    
  }


return {
        createTipologiaIntervento,
        getAvailableInterventi,
        createReport,
        getInterventoFromProgramma,
        getMateriale,
        getReport,
        getAnomalie,
        createAnomalia,
        createMateriale,
        createManodopera,
        errorHandle,
        login,
        getUserList,
        userList,
        createUser,
        registerError,
        clientList,
        getClientList,
        createContratto,
        getContractList,
        createActivity,
        createAsset,
        getAssetList,
        createAssetGroup,
        assetList,
        getActivityList,
        updateActivity,
        deleteActivity,
        getGroupAssetList,
        createIntervento,
        getInterventoList,
        getLastReport,
        getUserContract,
        deleteUser,
        createClient,
        createContattiClienti,
        createReferentiClienti,
        getInterventoListCLIENT,
        updateUser,
        updateResponsabili,
        updateContract,
        getAssedById,
        createPrograma,
        getProgrammaList,
        deleteContract,
        updateAccepted,
        deleteClient,
        getFullProgrammaReq,
        updateProgramma,
        createInfoBox,
        getInfoBox,
        updateAsset,
        GetAcquisizione,
        GetReferenteContratto,
        createReferenteContratto,
        createAcquisizione,
        getLogBox,
        createLog,
        deleteAsset,
        GetClienteFromProgramma,
        GetAssetFromProgramma,
        GetFullInterventoList,
        uploadAllegato,
        getAllegato,
        getFullAllegato,
        removeProgramma,
        getMezziList,
        updateMezzi,
        sendPassword,
        changePassword,
        deleteAllegato,
        updateClient,
        getReportData,
        getTipologieIntervento,
        updateAcquisizione,
        getReportDataF,
        deleteAssetGroup,
        deleteTipologieIntervento,
        createTabImpianto,
        getTabTipoImpianti,
        getUserPermission,
        createUserPermission,
        getUserPermissionEdit,
        updateUserPermission
}

}