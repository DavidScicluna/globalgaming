import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Fetch Method
import fetchApi from '../../utils/fetchApi';

// Material UI Components
import { makeStyles, Grid, TextField, Button, Typography, IconButton, Fade, Box } from '@material-ui/core';

// // Icons
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Poster: {
        width: '100%',
        borderRadius: theme.shape.borderRadius,
    },
    Margin: {
        margin: theme.spacing(1, 0)
    },
    // '@media (min-width: 1024px)': {
    //     TrendingItem: {
    //         cursor: 'pointer',
    //         width: '342px'
    //     },
    // },
    Rating: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal',
        '& svg': {
            fontSize: theme.typography.h4.fontSize,
            color: theme.palette.warning.main,
        }
    },
    LikeButton: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: 'none',
        
        '& svg': {
            fontSize: theme.typography.h4.fontSize,
        },

        '&:hover': {
            boxShadow: 'none',
            color: theme.palette.error.main,
        }
    },
    LikedButton: {
        color: theme.palette.error.main,
        '&:hover': {
            color: theme.palette.error.main,
        }
    },
    WatchlistButton: {
        boxShadow: 'none',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        fontSize: theme.typography.h6.fontSize,
        transition: '0.4s ease-in-out',
        '&:hover': {
            boxShadow: 'none',
            background: theme.palette.primary.dark,
        }
    },
    WatchlistRemoveButton: {
        background: theme.palette.error.main,
        '&:hover': {
            background: theme.palette.error.dark,
        }
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
    },
    TrendingContainer: {
        overflowX: 'auto',
        overflowY: 'hidden'
    },
    TrendingItem: {
        cursor: 'pointer',
        width: '342px'
    },
    SimilarPoster: {
        borderRadius: theme.shape.borderRadius,
        transition: '0.4s ease-in-out',

        '&:hover': {
            filter: 'brightness(50%)',
        }
    },
    '@media (max-width: 425px)': {
        Rating: {
            margin: theme.spacing(1, 0)
        },
    },
    '@media (min-width: 1024px)': {
        Margin: {
            margin: theme.spacing(2, 0)
        },
    },
}));

const Preview = (props) => {
    const Style = useStyles();

    // Preview State
    const [animation, setAnimation] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const [fetchedData, setFetchedData] = useState([]);

    const item = props.preview;

    // This method will update the users & user state and local storage
    const handleUpdateState = (users, user) => {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(user));

        props.setUsers(users);
        props.setUser(user);
    }

    /* 
        This method will check whether array passed contains the item that was clicked on,
        If so it will remove the item, if not it will add the item depending if its likes or watchlist
        and if it is movie or tv
    */
    const addRemoveList = (users, user, item, array, category, type) => {
        let check = false;

        array.forEach(otherItem => {
            if(otherItem.id === item.id){
                check = true;
                return
            }else{
                return
            }
        })

        if(check === true){
            const updateLikedArray = array.filter(otherItem => otherItem.id !== item.id);

            const updatedUser = {
                ...user,
                [type]: {...user[type], [category]: updateLikedArray}
            }

            const updatedUsers = users.map(item => {
                let newitem = {};
    
                if(item.id === updatedUser.id){
                    newitem = updatedUser 
                }else{
                    return item;
                }
    
                return newitem === {} ? item : newitem

            })

            handleUpdateState(updatedUsers, updatedUser);

            return
        }else{
            array.push(item);
    
            const updatedUser = {
                ...user,
                [type]: {...user[type], [category]: array}
            }
    
            const updatedUsers = users.map(item => {
                let newitem = {};
    
                if(item.id === updatedUser.id){
                    newitem = updatedUser 
                }else{
                    return item;
                }
    
                return newitem === {} ? item : newitem

            })

            handleUpdateState(updatedUsers, updatedUser);
        }
    }

    // This method will be called whenever a user clicks on the heart of any item 
    const handleLikeMovie = (item, category) => {
        const users = [...props.users];
        const user = {...props.user};
        const newLikedArray = [...user.likes[category]];
        
        addRemoveList(users, user, item, newLikedArray, category, 'likes')
    }

    // This method will be called whenever a user clicks on the watchlist button of any item
    const handleAddToWatchlist = (item, category) => {
        const users = [...props.users];
        const user = {...props.user};
        const newWatchlistArray = [...user.watchlist[category]];
        
        addRemoveList(users, user, item, newWatchlistArray, category, 'watchlist')
    }

    // This method renders the like button either the like or unlike button
    const renderLike = (item, category) => {
        let check = false;

        props.user.likes[category].forEach(likeItem => {
            if(likeItem.id === item.id){
                check = true;
                return
            }else{
                return
            }
        })

        if(check === true){
            return(
                <FavoriteRoundedIcon className={`${Style.LikeButton} ${Style.LikedButton}`} />
            )
        }else{
            return(
                <FavoriteBorderRoundedIcon />                
            )
        }
    }

    // This method renders the watchlist button either the remove or add watchlist
    const renderWatchlist = (item, category) => {
        let check = false;

        props.user.watchlist[category].forEach(watchItem => {
            if(watchItem.id === item.id){
                check = true;
                return
            }else{
                return
            }
        })

        if(check === true){
            return(
                <Button className={`${Style.WatchlistButton} ${Style.WatchlistRemoveButton}`} disableRipple variant='contained' onClick={() => handleAddToWatchlist(item, category)} disabled={props.user.access === 'guest' ? true : false}>
                    <div className={Style.ButtonContent}>
                        <RemoveRoundedIcon />
                        <Box mr={0.75} />
                        <span>Watchlist</span>
                    </div> 
                </Button>
            )
        }else{
            return(   
                <Button color='primary' className={Style.WatchlistButton} disableRipple variant='contained' onClick={() => handleAddToWatchlist(item, category)} disabled={props.user.access === 'guest' ? true : false}>
                    <div className={Style.ButtonContent}>
                        <AddRoundedIcon />
                        <Box mr={0.75} />
                        <span>Watchlist</span>
                    </div> 
                </Button>   
            )
        }
    }

    // This method will open the preview page to display further details 
    const handleOpenPreview = (item, media) => {
        
        setAnimation(false);
        
        setTimeout(() => {
            window.scrollTo(0, 0);
            setAnimation(true);
            props.setPreview(item); 
            props.setGridPreviewApiCategory(media);
            props.setGridPreviewApiType('preview');
        }, 1000);
    }

    useEffect(() => {
        const key = 'c287015949cec13fb17a26e50b4f054a';

        if(hasFetched === false){
            fetch(`https://api.themoviedb.org/3/${props.gridPreviewApiCategory}/${item.id}/similar?&api_key=${key}&language=en-US&include_adult=false`)
                .then(response => response.json())
                .then(json => {
                    setHasFetched(true);
                    setFetchedData(json.results);
                    return;
                })
                .catch(error => console.log(error));  
        } else {
            return
        }
    }, [hasFetched, item, props.gridPreviewApiCategory])

    return (
        <Fade in={animation} timeout={1000} >
            <Grid container direction="column">
                <Grid item container direction="row" alignItems="center" justify="space-between">
                    <Typography className={Style.Title} variant='h2' style={{fontWeight: '700'}}>
                        {(props.gridPreviewApiCategory === 'tv') ? item.original_name : (props.gridPreviewApiCategory === 'movie') ? item.title : ''}
                    </Typography>
                    <Typography className={Style.Rating} variant='h4'>
                        <StarRoundedIcon />
                        <span>
                            {item.vote_average}
                        </span>
                    </Typography>
                </Grid>
                <Box className={Style.Margin} />
                <Grid item>
                    <img 
                        alt={(props.gridPreviewApiCategory === 'tv') ? item.original_name : (props.gridPreviewApiCategory === 'movie') ? item.title : ''}
                        className={Style.Poster}
                        src={`https://image.tmdb.org/t/p/w780/${item.backdrop_path}`}
                    />
                    <Box className={Style.Margin} />
                    <Typography variant='h4'>
                        Overview
                    </Typography>
                    <Box my={0.25} />
                    <Typography variant='body1' paragraph>
                        {item.overview}
                    </Typography>
                    <Grid item container direction="row" alignItems="center" justify="flex-start">
                        <IconButton aria-label='Like' className={Style.LikeButton} disableRipple onClick={() => handleLikeMovie(item, props.gridPreviewApiCategory)} disabled={props.user.access === 'guest' ? true : false}>
                            {
                                renderLike(item, props.gridPreviewApiCategory)
                            }
                        </IconButton>
                        <Box mx={0.25} />
                        {
                            renderWatchlist(item, props.gridPreviewApiCategory)
                        }
                    </Grid>
                </Grid>
                <Box className={Style.Margin} />
                <Typography variant='h5'>
                    {`Similar ${(props.gridPreviewApiCategory === 'tv') ? 'TV Shows' : (props.gridPreviewApiCategory === 'movie') ? 'Movies' : ''}`} 
                </Typography>
                <Box my={0.25} />
                <Grid className={Style.TrendingContainer} item container direction='row' wrap='nowrap' justify='flex-start'>
                    {
                        (fetchedData === {} || fetchedData === undefined)
                            ? null
                                :
                                fetchedData.map((item, index) => {
                                    return(
                                        <Box className={`${Style.TrendingItem} animated fadeInSign`} style={{animationDelay: (index % 2 === 0) ? 250 : 750}} key={item.id} my={2} mr={2}>
                                            <img 
                                                alt={(props.gridPreviewApiCategory === 'tv') ? item.original_name : (props.gridPreviewApiCategory === 'movie') ? item.title : ''}
                                                className={Style.SimilarPoster}
                                                src={`https://image.tmdb.org/t/p/w342/${item.poster_path}`}
                                                onMouseDown={() => handleOpenPreview(item, props.gridPreviewApiCategory)}
                                            />
                                        </Box>
                                    );
                                })
                    } 
                </Grid>
            </Grid>
        </Fade>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        // Internal State (APP)
        gridPreviewApiCategory: state.app.gridPreviewApiCategory,
        preview: state.app.preview,
        users: state.app.users,
        user: state.app.user,
    };
  };
  
  // Sending some data to an action
  const matchDispatchToProps = (dispatch) => {
      return bindActionCreators({
        setGridPreviewApiCategory: appActions.setGridPreviewApiCategory,
        setGridPreviewApiType: appActions.setGridPreviewApiType,
        setPreview: appActions.setPreview, 
        setUsers: appActions.setUsers, 
        setUser: appActions.setUser 
      }, dispatch);
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(Preview);