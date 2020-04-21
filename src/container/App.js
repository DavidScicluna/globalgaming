import React from 'react';
import PropTypes from 'prop-types';

// Components

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
            <Container className='Container' maxWidth='md' disableGutters>
              <h1>Hello</h1>
            </Container>
          </ThemeProvider>
      </React.Fragment>
    );
  }
};