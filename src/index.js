import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'fontsource-roboto';
import * as serviceWorker from './serviceWorker';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  'MuiListItemText-root': {
    fontFamily:"Nunito Sans",
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#00ADA2',
      dark: '#002884',
      contrastText: '#fff',
    },
  }
});

ReactDOM.render(
  <BrowserRouter>
  <App style={{theme}}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
