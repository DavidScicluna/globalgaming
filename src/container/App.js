import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../actions/AppAction';
import * as apiAction from '../actions/apiActions/Api';
import * as movieActions from '../actions/apiActions/Movies';
import * as tvActions from '../actions/apiActions/TV';
import fetchApi from '../utils/fetchApi';

// Components
import SignDialog from '../components/SignDialog/SignDialog';
import AccountSettings from '../components/AccountSettings/AccountSettings';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import UserData from '../components/UserData/UserData';
import GridPreview from '../components/GridPreview/GridPreview';
import Preview from '../components/Preview/Preview';

// Material UI Components
import { CssBaseline, createMuiTheme, ThemeProvider, Container, Box } from '@material-ui/core';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // Material UI Custom Theme
      theme: createMuiTheme({
        palette: {
          common: {
            black: '#212121',
            white: '#FAFAFA',
          },
          primary: {
            main: this.props.user.color || '#455A64',
          },
          secondary: {
            main: '#455A64'
          },
          error: {
            main: '#EF5350',
          },
          success: {
            main: '#66BB6A',
          },
          contrastThreshold: 4,
          text: {
            primary: '#212121',
            secondary: '#616161',
          },
          action: {
            hover: 'rgba(0, 0, 0, 0.08)',
            focus: 'rgba(0, 0, 0, 0.14)',
          }
        },
        typography: {
          fontFamily: "'Work Sans', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
        },
      })
    }
  }

  componentDidMount = () => {
    const key = 'c287015949cec13fb17a26e50b4f054a';

    const getUser = JSON.parse(localStorage.getItem('user') || '{}');

    if((Object.keys(getUser).length === 0) !== true){
      this.props.setOpenSignDialog(false);
    }

    this.fetchTrendingApiData(key);
    this.fetchTrendingApiPopular(key);
    this.fetchTrendingApiGenres(key);
  }

  fetchTrendingApiData = (key) => {
      fetchApi(`https://api.themoviedb.org/3/trending/all/week?&api_key=${key}`, this.props.fetchApiTrending);
  }

  fetchTrendingApiPopular = (key) => {
    const types = [
      {
        action: this.props.fetchApiMoviePopular,
        type: 'movie',
      },
      {
        action: this.props.fetchApiTVPopular,
        type: 'tv',
      },
    ]

    types.forEach(item => {
      fetchApi(`https://api.themoviedb.org/3/${item.type}/popular?api_key=${key}&language=en-US`, item.action);
    });
  }

  fetchTrendingApiGenres = (key) => {
    const types = [
      {
        action: this.props.fetchApiMovieGenres,
        type: 'movie',
      },
      {
        action: this.props.fetchApiTVGenres,
        type: 'tv',
      },
    ]

    types.forEach(item => {
      fetchApi(`https://api.themoviedb.org/3/genre/${item.type}/list?api_key=${key}&language=en-US`, item.action);
    });
  }

  render(){
    return(
      <React.Fragment>
        <CssBaseline />
          <ThemeProvider theme={this.state.theme}>
            <Container className={'animated fadeInHeader'} maxWidth='md'>
              <Header />
              <Box py={2}>
                {
                  (this.props.gridPreviewApiCategory === 'likes' || this.props.gridPreviewApiCategory === 'watchlist')
                    ?
                    <UserData />
                      :
                      (this.props.gridPreviewApiType === 'preview')
                        ? <Preview />
                          :
                          (this.props.gridPreviewApiCategory === '' || this.props.gridPreviewApiType === '')
                            ?
                            <Home />
                              :
                              <GridPreview />
                }
              </Box>
              <SignDialog />
              <AccountSettings />
            </Container>
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
    gridPreviewApiTitle: state.app.gridPreviewApiTitle,
    user: state.app.user,
  };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
      setOpenSignDialog: appActions.setOpenSignDialog,
      // API Actions
      fetchApiTrending: apiAction.fetchApiTrending,
      // API Movies
      fetchApiMoviePopular: movieActions.fetchApiMoviePopular,
      fetchApiMovieGenres: movieActions.fetchApiMovieGenres,
      // API TV
      fetchApiTVPopular: tvActions.fetchApiTVPopular,
      fetchApiTVGenres: tvActions.fetchApiTVGenres,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);