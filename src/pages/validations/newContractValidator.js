import React, { useState } from 'react'
import exportFromJSON from 'export-from-json'
import contractData from '../data/contractData';
import { useHistory } from "react-router-dom";
import webservice from '../../api/webservice';

export default() => {
    //1 -> CAMPO MANCANTE
    //2 -> Descrizione troppo lunga max 150 
    //3 -> titolo troppo lungo max 20
    const {  setNewContractError, setNewContractData, getContractType } = contractData();
    const history = useHistory();
  
    var validateContract= ({titolo,numero,nazionalita,indirizzo,datainizio,datafine,descrizione,cliente,account,localita,codicepostale,tipologia}) => {
        
        if( getContractType( ) === 'sub' ){

            if(titolo  && nazionalita && indirizzo && datainizio && datafine && descrizione && account && localita && codicepostale && tipologia ) {
            
                if(descrizione.length < 149 ){
    
                    if(titolo.length < 50){
    
                        let data =[{
                            titolo,
                            numero,
                            nazionalita,
                            indirizzo,
                            datainizio,
                            datafine,
                            descrizione,
                            cliente,
                            account,
                            localita,
                            codicepostale,
                            tipologia,
                            response: true
                        }]
                        setNewContractData(data)
                        history.push('/contratti/listaAttivita')
                    }else{
                        setNewContractError(3)
                    }
    
                }else{
                    setNewContractError(2)
                }
    
            }else{
                setNewContractError(1)
            }

        }else{

            if(titolo && numero && nazionalita && indirizzo && datainizio && datafine && descrizione && cliente && account && localita && codicepostale && tipologia ) {
            
                if(descrizione.length < 149 ){
    
                    if(titolo.length < 50){
    
                        let data =[{
                            titolo,
                            numero,
                            nazionalita,
                            indirizzo,
                            datainizio,
                            datafine,
                            descrizione,
                            cliente,
                            account,
                            localita,
                            codicepostale,
                            tipologia,
                            response: true
                        }]
                        setNewContractData(data)
                        history.push('/contratti/acquisizioneContratto')
                    }else{
                        setNewContractError(3)
                    }
    
                }else{
                    setNewContractError(2)
                }
    
            }else{
                setNewContractError(1)
            }
        }

    }

        

    return {
        validateContract,
    }
        
}
