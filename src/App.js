import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import newUser from './pages/newUser';
import {withRouter} from 'react-router';
import permessiUtente from './pages/permessiUtente';
import informazioniUtente from './pages/informazioniUtente';
import finalUtente from './pages/finalUtente';
import listaContratti from './pages/contratti/listaContratti';
import nuovoContratto from './pages/contratti/nuovoContratto';
import contrattiAcquisizione from './pages/contratti/contrattiAcquisizione';
import listaAttivita from './pages/contratti/listaAttivita';
import fatturazione from './pages/contratti/fatturazione';
import referenteContratto from './pages/contratti/referenteContratto';
import documenti from './pages/contratti/documenti';
import final from './pages/contratti/final';
import Home from './pages/anagraficaContratto/Home';
import First from './pages/clienti/createCliente/First';
import Second from './pages/clienti/createCliente/Second';
import Third from './pages/clienti/createCliente/Third';
import Final from './pages/clienti/createCliente/Final';
import listaClienti from './pages/clienti/createCliente/listaClienti';
import HomeClienti from './pages/anagraficaCliente/HomeClienti';
import ListaTicket from './pages/ticket/ListaTicket';
import Programma from './pages/anagraficaContratto/parts/Programma';
import Attivita from './pages/anagraficaContratto/parts/Attivita';
import DownloadRep from './pages/ticket/DownloadRep';
import Strumenti from './pages/Strumenti';
import TestDoc from './pages/TestDoc';

const App = () => {
  return(
    <Switch>
      <Route exact path="/"  component={Login} />
      <Route exact path="/dashboard"  component={Dashboard} />
      <Route exact path="/dashboard/newUser"  component={newUser} />
      <Route exact path="/newUser/informazioniUtente"  component={informazioniUtente} />
      <Route exact path="/newUser/permessiUtente" component ={permessiUtente} />
      <Route exact path="/newUser/final" component ={finalUtente} />
      {/* CONTRATTI ROUTES*/}
      <Route exact path="/contratti/listaContratti" component={listaContratti} />
      <Route exact path="/contratti/nuovoContratto" component={nuovoContratto} />
      <Route exact path="/contratti/acquisizioneContratto" component={contrattiAcquisizione} />
      <Route exact path="/contratti/listaAttivita" component={listaAttivita} />
      <Route exact path="/contratti/fatturazione" component={fatturazione} />
      <Route exact path="/contratti/referenteContratto" component={referenteContratto} />
      <Route exact path="/contratti/documenti" component={documenti} />
      <Route exact path="/contratti/final" component={final} />
      {/* ANAGRAFICA CONTRATTO ROUTES*/}
      <Route exact path="/anagrafica/home" component={Home} />
      {/* CLIENTI ROUTES*/}
      <Route exact path="/clienti/nuovoCliente" component={First} />
      <Route exact path='/clienti/contattiReferente' component={Second} />
      <Route exact path='/clienti/referentiCliente' component={Third} />
      <Route exact path='/clienti/final' component={Final} />
      <Route exact path='/clienti' component={listaClienti} />
      {/* ANAGRAFICA CLIENTE ROUTES*/}
      <Route exact path='/clienti/home' component={HomeClienti} />
      {/* TICKET*/}
      <Route exact path='/ticket' component={ListaTicket} />
      <Route exact path='/test' component={DownloadRep} />
      <Route exact path='/programma' component={Programma} />
      <Route exact path='/attivita' component={Attivita} />
      {/* STRUMENTI ROUTES*/}
      <Route exact path='/strumenti' component={Strumenti} />
      <Route exact path='/testDoc' component={TestDoc} />
    </Switch>
  )

}
  

export default App;