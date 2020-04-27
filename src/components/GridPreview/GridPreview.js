import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Api Actions
import * as apiAction from '../../actions/apiActions/Api';
import * as movieActions from '../../actions/apiActions/Movies';
import * as tvActions from '../../actions/apiActions/TV';

// Fetch Method
import fetchApi from '../../utils/fetchApi';

// Components
import RenderDataListItem from '../RenderDataListItem/RenderDataListItem'

// Material UI Components
import { makeStyles, Fade, Grid, TextField, Button, Typography, MenuItem, Hidden, Box } from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Header: {
        fontWeight: theme.typography.fontWeightBold
    },
    Margin: {
        margin: theme.spacing(2, 0)
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
        margin: theme.spacing(0.25),
        boxShadow: 'none',
        borderRadius: '25px',
        color: theme.palette.common.white,
        
        '&:hover': {
            color: theme.palette.common.white,
            background: theme.palette.primary.main,
            boxShadow: 'none',
        }
    },
    '@media (max-width: 425px)': {
        Header: {
            fontSize: theme.typography.h5.fontSize
        },
        Results: {
            fontSize: theme.typography.body2.fontSize
        },
    },
}));

const RenderSortSection = ({Style, props, sortValue, sortGroup, justify, handleSortChange, setSortGroup, setSortValue, handleUpdateSort, handleRemoveSort}) => {
    return(
        <React.Fragment>
            <Grid item sm={4} container direction='row' justify='flex-start' alignItems='center' spacing={1}>
                <Grid item>
                    <Typography variant='button'>
                        Sort by:
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        aria-label='Show Items Select'
                        color='primary'
                        fullWidth
                        onChange={handleSortChange}
                        select
                        style={{paddingRight: 0}}
                        value={sortValue}
                        >
                            <MenuItem value={'all'} onMouseDown={() => {setSortGroup([]); setSortValue('all')}}>
                                All
                            </MenuItem>
                            {
                                (props.gridPreviewApiCategory === '' || props.gridPreviewApiType === '')
                                    ? null
                                        :  
                                        props.gridPreviewApiCategory === 'movie'
                                            ?  
                                            props.movieGenres.map(item => {
                                                return(
                                                    <MenuItem key={item.id} value={item.name} onMouseDown={() => handleUpdateSort(item)} disabled={sortGroup.includes(item) === true ? true : false}>
                                                        {item.name}
                                                    </MenuItem>
                                                );
                                            })
                                                :
                                                props.gridPreviewApiCategory === 'tv'
                                                    ?
                                                    props.tvGenres.map(item => {
                                                        return(
                                                            <MenuItem key={item.id} value={item.name} onMouseDown={() => handleUpdateSort(item)} disabled={sortGroup.includes(item) === true ? true : false}>
                                                                {item.name}
                                                            </MenuItem>
                                                        );
                                                    })
                                                        : null
                            }
                    </TextField>
                </Grid>
            </Grid>
            <Grid item sm={8} container direction='row' justify={justify} alignItems='center'>
                <Box my={1}>
                    {
                        sortGroup.map(item => {
                            return(
                                <Button key={item.id} className={`${Style.Button} ${Style.SortButton}`} color='primary' disableRipple endIcon={<CloseRoundedIcon />} variant='contained' onMouseDown={() => handleRemoveSort(item)}>
                                    {item.name}
                                </Button>
                            );

                        })
                    }
                </Box>
            </Grid>
        </React.Fragment>
    );
} 

const handleShowData = (sortGroup, data, type) => {
    if(sortGroup.length >= 1){
        const newApiDataSorted = []; 

        sortGroup.forEach(genre => {
            data.forEach(item => {
                item.genre_ids.forEach(itemGenre => {
                    if(newApiDataSorted.includes(item) === true){
                        return
                    } else if(genre.id === itemGenre){
                        newApiDataSorted.push(item);
                        return;
                    } else{
                        return;
                    }
                }) 
            });
        })

        return(
            <RenderDataListItem 
                typeData={newApiDataSorted} 
                category={type} 
            />
        );
    }else{
        return(
            <RenderDataListItem 
                typeData={data} 
                category={type} 
            />
        );
    }
}

const RenderDataElements = ({props, sortGroup}) => {
    if(props.gridPreviewApiCategory === 'movie'){
        switch(props.gridPreviewApiType){
            case 'now_playing':
                return handleShowData(sortGroup, props.nowPlaying, 'movie');
            case 'popular':
                return handleShowData(sortGroup, props.moviePopular, 'movie');

            case 'top_rated':
                return handleShowData(sortGroup, props.movieTopRated, 'movie');

            case 'upcoming':
                return handleShowData(sortGroup, props.upcoming, 'movie');
            default:
                return;
        }
    }else if(props.gridPreviewApiCategory === 'tv'){
        switch(props.gridPreviewApiType){
            case 'airing_today':
                return handleShowData(sortGroup, props.airingToday, 'tv');
            case 'on_the_air':
                return handleShowData(sortGroup, props.onTv, 'tv');
            case 'popular':
                return handleShowData(sortGroup, props.tvPopular, 'tv');
            case 'top_rated':
                return handleShowData(sortGroup, props.tvTopRated, 'tv');
            default:
                return;
        }
    }else{
        return;
    }
}

const GridPreview = (props) => {
    const Style = useStyles();

    const [animation, setAnimation] = useState(true);

    // Sort Select State
    const [sortValue, setSortValue] = useState('all'); 
    const [sortGroup, setSortGroup] = useState([]); 
    
    // Data Page State
    const [currentPage, setCurrentPage] = useState(1); 
    const [currentOffset, setCurrentOffset] = useState(0); 

    // Sort Select Methods
    const handleSortChange = (event) => {
        event.preventDefault();
        setSortValue(event.target.value);
    }

    const handleUpdateSort = (item) => {
        const newSortGroup = [...sortGroup];

        if(newSortGroup.includes(item) === true){
            return
        }else{
            newSortGroup.push(item);

            setSortValue(item.name);
            setSortGroup(newSortGroup);
        }
    }

    const handleRemoveSort = (removeItem) => {
        const newSortGroup = [...sortGroup];

        const updatedSortGroup = newSortGroup.filter(item => {return item.id !== removeItem.id});

        setCurrentPage(1);
        setCurrentOffset(0);
        setSortGroup(updatedSortGroup);
        setSortValue(updatedSortGroup.length === 0 ? 'all' : updatedSortGroup[updatedSortGroup.length - 1].name);
    }

    // Data Page Methods
    const handleClickChangePage = (event, offset, next) => {
        event.preventDefault();

        setAnimation(false);
        
        setTimeout(() => {
            window.scrollTo(0, 0)
            setAnimation(true);
            setCurrentOffset(offset);
            setCurrentPage(next);
        }, 1500);
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
                    fetchApi(`https://api.themoviedb.org/3/movie/${item.type}?api_key=${key}&language=en-US&page=${currentPage}`, item.action);
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
                    fetchApi(`https://api.themoviedb.org/3/tv/${item.type}?api_key=${key}&language=en-US&page=${currentPage}`, item.action);
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
        currentPage, sortGroup, props.gridPreviewApiCategory, props.gridPreviewApiType, props.fetchApiMovieGenres, props.fetchApiMovieNowPlaying, props.fetchApiMoviePopular, props.fetchApiMovieTopRated, props.fetchApiMovieUpcoming,
        props.fetchApiTVAiringToday, props.fetchApiTVGenres, props.fetchApiTVOnTv, props.fetchApiTVPopular, props.fetchApiTVTopRated, props.movieGenres, props.tvGenres
    ])

    return (
        <Fade in={animation} timeout={1500}>
            <Grid container direction='column'>
                <Grid item container direction='row' justify='space-between' alignItems='center'>
                    <Grid item>
                        <Typography className={Style.Header} variant='h4' color='textPrimary'>
                            {`${props.gridPreviewApiTitle} (${props.gridPreviewApiCategory})`}
                        </Typography>
                    </Grid>
                    <Typography className={Style.Results} variant='body1' color='textSecondary'>
                        {
                            (props.gridPreviewApiCategory === 'movie')
                                ? `${props.movieTotalResults} ${props.gridPreviewApiCategory}s found`
                                    : (props.gridPreviewApiCategory === 'tv')
                                        ? `${props.tvTotalResults} ${props.gridPreviewApiCategory} shows found`
                                            : ''
                        }
                    </Typography>
                </Grid>
                <Grid className={Style.Margin} item container direction='row' justify='space-between'>
                    <Hidden smUp>
                        <RenderSortSection Style={Style} props={props} sortValue={sortValue} sortGroup={sortGroup} justify={'flex-start'} handleSortChange={handleSortChange} setSortGroup={setSortGroup} setSortValue={setSortValue} handleUpdateSort={handleUpdateSort} handleRemoveSort={handleRemoveSort} />
                    </Hidden>
                    <Hidden xsDown>
                        <RenderSortSection Style={Style} props={props} sortValue={sortValue} sortGroup={sortGroup} justify={'flex-end'} handleSortChange={handleSortChange} setSortGroup={setSortGroup} setSortValue={setSortValue} handleUpdateSort={handleUpdateSort} handleRemoveSort={handleRemoveSort} />
                    </Hidden>
                </Grid>
                {
                    (props.gridPreviewApiCategory === '' || props.gridPreviewApiType === '')
                        ? null
                            :  
                            <Grid item container alignItems='flex-start' justify='flex-start' wrap='wrap' spacing={2}>
                                <RenderDataElements 
                                    props={props} 
                                    sortGroup={sortGroup} 
                                />
                            </Grid>
                }
                <Grid item container justify='flex-end'>
                    <Pagination
                        currentPageColor='primary'
                        otherPageColor='default'
                        className={`${Style.Margin} animated fadeInHeader`}
                        disableRipple
                        limit={5}
                        offset={currentOffset}
                        total={props.gridPreviewApiCategory === 'movie' ? props.movieTotalPages : props.gridPreviewApiCategory === 'tv' ? props.tvTotalPages : 10}
                        onClick={(event, offset, page) => handleClickChangePage(event, offset, page)}
                    />
                </Grid>
            </Grid>
        </Fade>
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
        gridPreviewApiTitle: state.app.gridPreviewApiTitle,
        // API Movies
        nowPlaying: state.api.movies.nowPlaying,
        moviePopular: state.api.movies.popular,
        movieTopRated: state.api.movies.topRated,
        upcoming: state.api.movies.upcoming,
        movieTotalPages: state.api.movies.totalPages,
        movieTotalResults: state.api.movies.totalResults,
        movieGenres: state.api.movies.genres,
        // API TV
        airingToday: state.api.tv.airingToday,
        onTv: state.api.tv.onTv,
        tvPopular: state.api.tv.popular,
        tvTopRated: state.api.tv.topRated,
        tvTotalPages: state.api.tv.totalPages,
        tvTotalResults: state.api.tv.totalResults,
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
        // TV Actions
        fetchApiTVAiringToday: tvActions.fetchApiTVAiringToday,
        fetchApiTVOnTv: tvActions.fetchApiTVOnTv,
        fetchApiTVPopular: tvActions.fetchApiTVPopular,
        fetchApiTVTopRated: tvActions.fetchApiTVTopRated,
      }, dispatch);
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(GridPreview);