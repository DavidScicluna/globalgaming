import React from 'react';
import PropTypes from 'prop-types';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as errorAction from '../actions/apiActions/Error';
import * as movieActions from '../actions/apiActions/Movies';
import * as tvActions from '../actions/apiActions/TV';
import fetchApi from '../fetchApi'

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

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount = () => {
    const key = 'c287015949cec13fb17a26e50b4f054a';

    this.fetchMovieApiData(key);
    this.fetchTvApiData(key);
  }

  fetchMovieApiData = (key) => {
    const types = [
      {
        action: this.props.fetchApiMovieNowPlaying,
        type:'now_playing'
      }, 
      {
        action: this.props.fetchApiMoviePopular,
        type:'popular'
      },
      {
        action: this.props.fetchApiMovieTopRated,
        type:'top_rated'
      }, 
      {
        action: this.props.fetchApiMovieUpcoming,
        type:'upcoming'
      },
      {
        action: this.props.fetchApiMovieGenres,
        type:'genre'
      }
    ];

    types.forEach((item) => {
      if(item.type === 'genre'){
        fetchApi(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`, item.action);
      }else{
        fetchApi(`https://api.themoviedb.org/3/movie/${item.type}?api_key=${key}&language=en-US`, item.action);
      }
    })
  }
  
  fetchTvApiData = (key) => {
    const types = [
      {
        action: this.props.fetchApiTVAiringToday,
        type:'airing_today'
      }, 
      {
        action: this.props.fetchApiTVOnTv,
        type:'on_the_air'
      },
      {
        action: this.props.fetchApiTVPopular,
        type:'popular'
      },
      {
        action: this.props.fetchApiTVTopRated,
        type:'top_rated'
      }, 
      {
        action: this.props.fetchApiTVGenres,
        type:'genre'
      }
    ];

    types.forEach((item) => {
      if(item.type === 'genre'){
        fetchApi(`https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`, item.action);
      }else{
        fetchApi(`https://api.themoviedb.org/3/tv/${item.type}?api_key=${key}&language=en-US`, item.action);
      }
    })
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
                  <Container maxWidth='md'>
                    <Box className={this.props.openSignDialog === true || this.props.openSearchDialog === true ? 'animated fadeOutHeader' : 'animated fadeInHeader'}>
                      <Header />
                    </Box>
                  </Container>
                </Route>
              </Switch>
            </Router>
          </ThemeProvider>
      </React.Fragment>
    );
  }
};

// Fetching state from store
const mapStateToProps = (state) => {
  return{
      openSignDialog: state.app.openSignDialog,
      openSearchDialog: state.app.openSearchDialog,
  };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
      // Movie Actions
      fetchApiMovieNowPlaying: movieActions.fetchApiMovieNowPlaying,
      fetchApiMoviePopular: movieActions.fetchApiMoviePopular,
      fetchApiMovieTopRated: movieActions.fetchApiMovieTopRated,
      fetchApiMovieUpcoming: movieActions.fetchApiMovieUpcoming,
      fetchApiMovieGenres: movieActions.fetchApiMovieGenres,
      // TV Actions
      fetchApiTVAiringToday: tvActions.fetchApiTVAiringToday,
      fetchApiTVOnTv: tvActions.fetchApiTVOnTv,
      fetchApiTVPopular: tvActions.fetchApiTVPopular,
      fetchApiTVTopRated: tvActions.fetchApiTVTopRated,
      fetchApiTVGenres: tvActions.fetchApiTVGenres,
      // API Error Actions
      fetchApiError: errorAction.fetchApiError,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);