import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Api Actions
import * as apiAction from '../../actions/apiActions/Api';
import * as movieActions from '../../actions/apiActions/Movies';
import * as tvActions from '../../actions/apiActions/TV';

// Fetch Method
import fetchApi from '../../fetchApi'

// App Actions
// import * as appActions from '../../actions/AppAction';

// Components
import RenderDataListItem from '../RenderDataListItem/RenderDataListItem'

// Material UI Components
import { makeStyles, Grid, TextField, Button, Typography, MenuItem } from '@material-ui/core';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Margin: {
        margin: theme.spacing(2, 0, 3, 0)
    },
    Button : {
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.hint,
        transition: '0.4s ease-in-out',
        '&:hover': {
            background: theme.palette.action.hover,
            color: theme.palette.text.primary
        }
    },
    SortButton: {
        boxShadow: 'none',
        borderRadius: '25px',
        
        '&:hover': {
            boxShadow: 'none',
        }
    },
}));

// const handleGetGenre = (genreList, data, StyleButton, StyleSortButton, handleSortChange) => {
//     const getGenres = genreList.filter(item => {
//         let currentGenre;
        
//         data.forEach(genre => {
//             if(genre === item.id){
//                 currentGenre = item;
//                 return;
//             } else{
//                 return;
//             }
//         });
//         return currentGenre;
//     })

//     return getGenres.map(item => {
//         return(
//             <React.Fragment key={item.id}>
//                 <Button className={`${StyleButton} ${StyleSortButton}`} disableRipple variant="text" onClick={() => handleSortChange(item)}>
//                     {item.name}
//                 </Button>
//             </React.Fragment>
//         );
//     })
// }

const RenderDataElements = ({props, setGenreChosen, posterStyle, StyleRating, StyleLikeButton, StyleWatchlistButton, handleLikeMovie, handleAddToWatchlist}) => {
    if(props.gridPreviewApiCategory === 'movie'){
        // setGenreChosen(props.movieGenres)
        switch(props.gridPreviewApiType){
            case 'now_playing':
                return(
                    <RenderDataListItem 
                        typeData={props.nowPlaying} 
                        media_type={'movie'} 
                        genre={props.movieGenres}
                    />
                );
            case 'popular':
                return(
                    <RenderDataListItem 
                        typeData={props.moviePopular} 
                        media_type={'movie'} 
                        genre={props.movieGenres}
                    />
                );
            case 'top_rated':
                return(
                    <RenderDataListItem 
                        typeData={props.movieTopRated} 
                        media_type={'movie'} 
                        genre={props.movieGenres}
                    />
                );
            case 'upcoming':
                return(
                    <RenderDataListItem 
                        typeData={props.upcoming} 
                        media_type={'movie'} 
                        genre={props.movieGenres}
                    />
                );
            default:
                return;
        }
    }else if(props.gridPreviewApiCategory === 'tv'){
        // setGenreChosen(props.tvGenres)
        switch(props.gridPreviewApiType){
            case 'airing_today':
                return(
                    <RenderDataListItem 
                        typeData={props.airingToday} 
                        media_type={'tv'} 
                    />
                );
            case 'on_the_air':
                return(
                    <RenderDataListItem 
                        typeData={props.onTv} 
                        media_type={'tv'} 
                    />
                );
            case 'popular':
                return(
                    <RenderDataListItem 
                        typeData={props.tvPopular} 
                        media_type={'tv'} 
                    />
                );
            case 'top_rated':
                return(
                    <RenderDataListItem 
                        typeData={props.tvTopRated} 
                        media_type={'tv'} 
                    />
                );
            default:
                return;
        }
    }else{
        return;
    }
}

const GridPreview = (props) => {
    const Style = useStyles();

    // Sort Select State
    const [sortValue, setSortValue] = useState('all'); 
    const [genreChosen, setGenreChosen] = useState([]); 

    // Sort Select Methods
    const handleSortChange = (event) => {
        event.preventDefault();
        setSortValue(event.target.value);
        // fetchApiData(searchValue, event.target.value);
    }

    useEffect(() => {
        const fetchMovieApiData = (type, key) => {
            const types = [
                {
                    action: props.fetchApiMovieNowPlaying,
                    type: 'now_playing',
                }, 
                {
                    action: props.fetchApiMoviePopular,
                    type: 'popular',
                },
                {
                    action: props.fetchApiMovieTopRated,
                    type: 'top_rated',
                }, 
                {
                    action: props.fetchApiMovieUpcoming,
                    type: 'upcoming',
                },
            ];
        
            types.forEach((item) => {
                if(item.type === type){
                    fetchApi(`https://api.themoviedb.org/3/movie/${item.type}?api_key=${key}&language=en-US`, item.action);
                    if(Object.keys(props.movieGenres).length === 0){
                        fetchApi(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`, props.fetchApiMovieGenres);
                    }else{
                        return
                    }
                }else{
                    return;
                }
            })
        }
        
        const fetchTvApiData = (type, key) => {
            const types = [
                {
                    action: props.fetchApiTVAiringToday,
                    type: 'airing_today',
                }, 
                {
                    action: props.fetchApiTVOnTv,
                    type: 'on_the_air',
                },
                {
                    action: props.fetchApiTVPopular,
                    type: 'popular',
                },
                {
                    action: props.fetchApiTVTopRated,
                    type: 'top_rated',
                }, 
            ];
    
            types.forEach((item) => {
                if(item.type === type){
                    fetchApi(`https://api.themoviedb.org/3/tv/${item.type}?api_key=${key}&language=en-US`, item.action);
                    if(Object.keys(props.tvGenres).length === 0){
                        fetchApi(`https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`, props.fetchApiTVGenres);
                        setGenreChosen(props.tvGenres)
                    }else{
                        return
                    }
                }else{
                    return;
                }
            })
        }

        const key = 'c287015949cec13fb17a26e50b4f054a';

        if(props.gridPreviewApiCategory === 'movie'){
            fetchMovieApiData(props.gridPreviewApiType, key);
        }else if(props.gridPreviewApiCategory === 'tv'){
            fetchTvApiData(props.gridPreviewApiType, key);
        }
    }, [
        props.gridPreviewApiCategory, props.gridPreviewApiType, props.fetchApiMovieGenres, props.fetchApiMovieNowPlaying, props.fetchApiMoviePopular, props.fetchApiMovieTopRated, props.fetchApiMovieUpcoming,
        props.fetchApiTVAiringToday, props.fetchApiTVGenres, props.fetchApiTVOnTv, props.fetchApiTVPopular, props.fetchApiTVTopRated, props.movieGenres, props.tvGenres
    ])

    return (
        <Grid container direction="column">
            <Grid className={Style.Margin} item container direction="row" justify="space-between">
                <Grid item>
                    <Button className={`${Style.Button} ${Style.SortButton}`} disableRipple endIcon={<CloseRoundedIcon />} variant="contained">
                        Primary
                    </Button>
                </Grid>
                <Grid item sm={6} container direction="row" justify='flex-end' alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography variant="button">
                            Sort by:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            aria-label="Show Items Select"
                            color="primary"
                            fullWidth
                            onChange={(event) => handleSortChange(event)}
                            select
                            style={{paddingRight: 0}}
                            value={sortValue}
                            >
                                <MenuItem value={'all'}>
                                    All
                                </MenuItem>
                                {/* {
                                    (props.gridPreviewApiCategory === '' || props.gridPreviewApiType === '')
                                        ? null
                                            :  
                                            genreChosen.map(item => {
                                                return(
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                );
                                            })
                                } */}
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            {
                (props.gridPreviewApiCategory === '' || props.gridPreviewApiType === '')
                    ? null
                        :  
                        <Grid item container alignItems="flex-start" justify="flex-start" wrap="wrap" spacing={2}>
                            <RenderDataElements 
                                props={props} 
                                setGenreChosen={setGenreChosen} 
                            />
                        </Grid>
            }
        </Grid>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        // Internal State (APP)
        openSignDialog: state.app.openSignDialog,
        openSearchDialog: state.app.openSearchDialog,
        gridPreviewApiCategory: state.app.gridPreviewApiCategory,
        gridPreviewApiType: state.app.gridPreviewApiType,
        // API Movies
        nowPlaying: state.api.movies.nowPlaying,
        moviePopular: state.api.movies.popular,
        movieTopRated: state.api.movies.topRated,
        upcoming: state.api.movies.upcoming,
        movieGenres: state.api.movies.genres,
        // API TV
        airingToday: state.api.tv.airingToday,
        onTv: state.api.tv.onTv,
        tvPopular: state.api.tv.popular,
        tvTopRated: state.api.tv.topRated,
        tvGenres: state.api.tv.genres,
    };
  };
  
  // Sending some data to an action
  const matchDispatchToProps = (dispatch) => {
      return bindActionCreators({
        // API Actions
        fetchApiError: apiAction.fetchApiError,
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
      }, dispatch);
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(GridPreview);