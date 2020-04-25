import React from 'react';
import PropTypes from 'prop-types';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as apiAction from '../actions/apiActions/Api';
import * as movieActions from '../actions/apiActions/Movies';
import * as tvActions from '../actions/apiActions/TV';
import fetchApi from '../fetchApi'

// Components
import SignDialog from '../components/SignDialog/SignDialog';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import GridPreview from '../components/GridPreview/GridPreview';

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

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount = () => {
    const key = 'c287015949cec13fb17a26e50b4f054a';

    // this.fetchTrendingApiData(key);
  }

  fetchTrendingApiData = (key) => {
      fetchApi(`https://api.themoviedb.org/3/trending/all/week?&api_key=${key}`, this.props.fetchApiTrending);
  }

  // static propTypes = {

  // }

  render(){
    return(
      <React.Fragment>
        <CssBaseline />
          <ThemeProvider theme={theme}>
            <Router>
              {/* <Switch> */}
                <SignDialog />
                <Container className={this.props.openSignDialog === true || this.props.openSearchDialog === true ? 'animated fadeOutHeader' : 'animated fadeInHeader'} maxWidth='md'>
                  <Header />
                  <Route exact path="/">
                    <Home />
                    <GridPreview />
                  </Route>
                </Container>
              {/* </Switch> */}
            </Router>
          </ThemeProvider>
      </React.Fragment>
    );
  }
};

// Fetching state from store
const mapStateToProps = (state) => {
  return{
    // Internal State (APP)
    openSignDialog: state.app.openSignDialog,
    openSearchDialog: state.app.openSearchDialog,
    gridPreviewApiCategory: state.app.gridPreviewApiCategory,
    gridPreviewApiType: state.app.gridPreviewApiType,
  };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
      // API Actions
      fetchApiTrending: apiAction.fetchApiTrending,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);