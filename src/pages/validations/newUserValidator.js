import React, { useState } from 'react'
import exportFromJSON from 'export-from-json'
import * as EmailValidator from 'email-validator';
import * as passwordValidator from 'password-validator';
import userData from '../data/userData';
import { useHistory } from "react-router-dom";
import webservice from '../../api/webservice';

var schema = new passwordValidator();

schema
    .is().min(8)
    .has().uppercase()
    .has().digits(1)
    .has().not().spaces();

export default() => {
    const { userList, getUserList } = webservice()
    const { getUserData } = userData()
    
    React.useEffect(() => {
        async function initialData(){
            await getUserList( getUserData().Token )
        }
        initialData()
    }, [])
    //1 -> CAMPO MANCANTE
    //2 -> nome o cognome troppo corti 
    //3 -> email non valida
    //4 -> password non valida
    //5 -> Password esistente
    const { setNewUserData, setNewUserError } = userData();
    const history = useHistory();

    

    var validateUser= (nome,cognome,email,confermaemail,password,confermapassword,societa,posizione,tipologia,telefono,ofCliente) => {
        
        //cMail == mail to check into db
        function checkExistingMail(cMail) {
            let res = userList.filter( cUser => cUser.Email == cMail)
            if(res.length > 0){
                return true
            }else{
                return false
            }
        }

        if(nome && cognome && email && confermaemail && password && confermapassword && societa && tipologia){
            //CHECK LUNGHEZZA nome // cognome
            if( nome.length >1 && nome.length<25 && cognome.length >1 && cognome.length<20){
                //CHECK EMAIL IF EXISTING
                if( checkExistingMail(email) == false ){
                    
                    if( email === confermaemail && EmailValidator.validate(email) == true ){
                        //CHECK PASSWORD
                        if(password === confermapassword && schema.validate(password) ){
                            let data =[{
                                name: nome,
                                cognome: cognome,
                                email: email,
                                password: password,
                                societa: societa,
                                posizione: posizione,
                                tipologia: tipologia,
                                telefono: telefono,
                                ofCliente: ofCliente,
                                response: true
                            }]
                            console.log(data)
                            setNewUserData(data)
                            history.push('/newUser/informazioniUtente')
                        }else{
                            setNewUserError(4)
                        }

                    }else{
                        setNewUserError(3)
                    }
                }else{
                    setNewUserError(5)
                }

            }else{
                setNewUserError(2)
            }

        }else{
            setNewUserError(1)
        }
        
    }

    return {
        validateUser,
    }
        
}
