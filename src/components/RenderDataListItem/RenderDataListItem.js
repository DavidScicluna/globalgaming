import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Material UI Components
import { makeStyles, Grid, Card, CardActionArea, CardMedia, Button, CardContent, CardActions, IconButton, Typography, Box} from '@material-ui/core';

// Icons
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    '@media (min-width: 1024px)': {
        Rating: {
            fontSize: theme.typography.h5.fontSize
        },
        Title: {
            fontSize: theme.typography.h5.fontSize
        },
        Year: {
            fontSize: theme.typography.h6.fontSize
        },
    },
    Container: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(1, 0),
    },
    Poster: {
        width: '100%',
        borderRadius: `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0`,
    },
    Rating: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal',
        '& svg': {
            color: theme.palette.warning.main,
        }
    },
    LikeButton: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: 'none',
        
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
    }
}));

const RenderDataListItem = (props) => {
    const Style = useStyles();
    const data = props.typeData || [];
    
    const handleGetDate = (date) => {
        if(date === undefined){
            return
        } else {
            const splitDate = date.split('-');
            const newDate = splitDate[0]
            
            return newDate
        }
    }

    const handleUpdateState = (users, user) => {
        // Setting user in local storage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(user));

        props.setUsers(users);
        props.setUser(user);
    }

    // Grid Item Methods
    const addRemoveList = (users, user, item, array, type) => {
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
                [type]: updateLikedArray
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
                [type]: array
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

    const handleLikeMovie = (item) => {
        const users = [...props.users];
        const user = {...props.user};
        const newLikedArray = [...user.likes];
        
        addRemoveList(users, user, item, newLikedArray, 'likes')
    }

    const handleAddToWatchlist = (item) => {
        const users = [...props.users];
        const user = {...props.user};
        const newWatchlistArray = [...user.watchlist];
        
        addRemoveList(users, user, item, newWatchlistArray, 'watchlist')
    }

    // This method renders the like button either the like or unlike button
    const renderLike = (item) => {
        let check = false;

        props.user.likes.forEach(likeItem => {
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
    const renderWatchlist = (item) => {
        let check = false;

        props.user.watchlist.forEach(watchItem => {
            if(watchItem.id === item.id){
                check = true;
                return
            }else{
                return
            }
        })

        if(check === true){
            return(
                <Button className={`${Style.WatchlistButton} ${Style.WatchlistRemoveButton}`} disableRipple variant="contained" onClick={() => handleAddToWatchlist(item)} >
                    <div className={Style.ButtonContent}>
                        <RemoveRoundedIcon />
                        <Box mr={0.75} />
                        <span>Watchlist</span>
                    </div> 
                </Button>
            )
        }else{
            return(   
                <Button color="primary" className={Style.WatchlistButton} disableRipple variant="contained" onClick={() => handleAddToWatchlist(item)} >
                    <div className={Style.ButtonContent}>
                        <AddRoundedIcon />
                        <Box mr={0.75} />
                        <span>Watchlist</span>
                    </div> 
                </Button>   
            )
        }
    }

    return(
        <React.Fragment>
            {
                data === [] || data === undefined
                    ? null
                        :
                        data.map((item, index) => {
                            return(
                                <Grid className={Style.Container} key={item.id} item sm={6}>
                                    <Card elevation={0} className={'animated fadeInSign'} style={{animationDelay: (index % 2 === 0) ? 250 : 750}}>
                                        <CardActionArea>
                                            <CardMedia
                                                alt={(props.category === 'tv') ? item.original_name : (props.category === 'movie') ? item.title : ''}
                                                component="img"
                                                className={Style.Poster}
                                                image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            />
                                        </CardActionArea>
                                        <CardContent>
                                            <Typography className={Style.Rating} variant="h6">
                                                <StarRoundedIcon />
                                                <span>
                                                    {item.vote_average}
                                                </span>
                                            </Typography>
                                            <Typography className={Style.Title} gutterBottom variant="h6" style={{fontWeight: '700'}}>
                                                {(props.category === 'tv') ? item.original_name : (props.category === 'movie') ? item.title : ''}
                                            </Typography>
                                            <Typography className={Style.Year} color="textSecondary" variant="button">
                                                {(props.category === 'tv') ? `(${handleGetDate(item.first_air_date)})` : (props.category === 'movie') ? `(${handleGetDate(item.release_date)})` : ''}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label='Like' className={Style.LikeButton} disableRipple onClick={() => handleLikeMovie(item)} >
                                                {
                                                    renderLike(item)
                                                }
                                            </IconButton>
                                            <Box mx={0.25} />
                                            {
                                                renderWatchlist(item)
                                            }
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
            }
        </React.Fragment>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        // Internal State (APP)
        users: state.app.users,
        user: state.app.user,
    };
  };
  
  // Sending some data to an action
  const matchDispatchToProps = (dispatch) => {
      return bindActionCreators({
        setUsers: appActions.setUsers, 
        setUser: appActions.setUser 
      }, dispatch);
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(RenderDataListItem);