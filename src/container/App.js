import React from 'react';
import PropTypes from 'prop-types';
import {HashRouter as Router, Switch, Route} from "react-router-dom";

// Components
import SignDialog from '../components/SignDialog/SignDialog';

// Material UI Components
import { CssBaseline, createMuiTheme, ThemeProvider, Container, Box } from '@material-ui/core';

// Material UI Custom Theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2980B9',
    },
    secondary: {
      main: '#C0392B'
    },
    success: {
      main: '#27AE60',
    }
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
            {/* <Router basename="/">
              <Switch>
                <Route path="/timer">

                </Route>
              </Switch>
            </Router> */}
            <Container className='Container' maxWidth='md'>
              <SignDialog />
            </Container>
          </ThemeProvider>
      </React.Fragment>
    );
  }
};