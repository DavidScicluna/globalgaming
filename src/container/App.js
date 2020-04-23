import React from 'react';
import PropTypes from 'prop-types';
import {HashRouter as Router, Switch, Route} from "react-router-dom";

// Components
import SignDialog from '../components/SignDialog/SignDialog';
import Header from '../components/Header/Header';

// Material UI Components
import { CssBaseline, createMuiTheme, ThemeProvider, Container, Box } from '@material-ui/core';

// Material UI Custom Theme
const theme = createMuiTheme({
  palette: {
    common: {
      black: '#212121',
      white: '#FAFAFA',
    },
    type: 'light',
    primary: {
      main: '#1289A7',
    },
    secondary: {
      main: '#C0392B'
    },
    error: {
      main: '#EA2027',
    },
    warning: {
      main: '#FFC312',
    },
    info: {
      main: '#1289A7',
    },
    success: {
      main: '#009432',
    },
    contrastThreshold: 2,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.64)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.54)',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.10)',
    }
  },
  typography: {
    fontFamily: "'Work Sans', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
  },
});

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  // static propTypes = {

  // }

  render(){
    return(
      <React.Fragment>
        <CssBaseline />
          <ThemeProvider theme={theme}>
            <Router basename="/">
              <Switch>
                <Route exact path="/">
                  <SignDialog />
                  <Container className='Container' maxWidth='md'>
                    <Header />
                  </Container>
                </Route>
              </Switch>
            </Router>
          </ThemeProvider>
      </React.Fragment>
    );
  }
};