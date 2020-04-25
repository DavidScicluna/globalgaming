import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Components

// Material UI Components
import { makeStyles, Grid, Paper, Toolbar, Box, IconButton, Button, Typography, Hidden, } from '@material-ui/core';

// Icons
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Container: {
        position: 'relative'
    },
}));

const Home = ( {trending, movieGenres, tvGenres} ) => {
    const Style = useStyles();
    const key = 'c287015949cec13fb17a26e50b4f054a';

    const [currentTrending, setCurrentTrending] = useState({});
    const [currentTrendingGenre, setCurrentTrendingGenre] = useState([]);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const handleGetGenre = (typeGenres) => {
            const getGenres = typeGenres.filter(item => {
                let currentGenre;
                
                currentTrending.genre_ids.forEach(genre => {
                    if(genre === item.id){
                        currentGenre = item;
                        return;
                    } else{
                        return;
                    }
                });
                return currentGenre;
            })
    
            return getGenres
        }

        if(trending.results === undefined || trending === null || trending === {}){
            return
        }else{
            setCurrentTrending(trending.results[0])
            if(currentTrending.media_type === 'tv'){
                setCurrentTrendingGenre(handleGetGenre(tvGenres));
            }else if(currentTrending.media_type === 'movie'){
                setCurrentTrendingGenre(handleGetGenre(movieGenres));
            }
        }
    }, [trending, currentTrending, tvGenres, movieGenres])

    const onClick = () => {
        fetch(`https://api.themoviedb.org/3/configuration?&api_key=${key}`)
            .then(response => response.json())
            .then(json => {
                setConfig(json)
            })
            .catch(error => console.log(error));   

        console.log(config);
    }


    return (
        <Grid container direction="column">
            <Grid item>
                <Button onClick={onClick}>Click</Button>
            </Grid>
            <Grid item>
                {
                    currentTrending.backdrop_path === undefined
                        ? null
                            :
                            <Box className={Style.Container}>
                                <img 
                                    alt={(currentTrending.media_type === 'tv') ? currentTrending.original_name : (currentTrending.media_type === 'movie') ? currentTrending.original_title : ''} 
                                    src={`https://image.tmdb.org/t/p/w1280/${currentTrending.backdrop_path}`}
                                    className={Style.Backdrop}
                                />          
                                <Paper className={Style.Content} elevation={0}>
                                    <Toolbar>
                                        <Grid container direction="column" spacing={1}>
                                            <Hidden smUp>
                                                <Typography className={Style.Title} variant="h6">
                                                    {(currentTrending.media_type === 'tv') ? currentTrending.original_name : (currentTrending.media_type === 'movie') ? currentTrending.original_title : ''}
                                                </Typography>
                                            </Hidden>
                                            <Hidden xsDown>
                                                <Typography className={Style.Title} variant="h4">
                                                    {(currentTrending.media_type === 'tv') ? currentTrending.original_name : (currentTrending.media_type === 'movie') ? currentTrending.original_title : ''}
                                                </Typography>
                                            </Hidden>
                                            <Grid item container direction="column" justify="space-between" spacing={1}>
                                                {/* <Grid item>
                                                    <Hidden smUp>
                                                        {
                                                            currentTrendingGenre.map((genre, index) => {
                                                                return(
                                                                    <Typography key={genre.id} className={Style.Genre} variant="caption" >
                                                                        {index === currentTrendingGenre.length - 1 ? genre.name : `${genre.name},`}
                                                                    </Typography>
                                                                );
                                                            })
                                                        }
                                                    </Hidden>
                                                    <Hidden xsDown>
                                                        {
                                                            currentTrendingGenre.map((genre, index) => {
                                                                return(
                                                                    <Typography key={genre.id} className={Style.Genre} variant="button" >
                                                                        {index === currentTrendingGenre.length - 1 ? genre.name : `${genre.name},`}
                                                                    </Typography>
                                                                );
                                                            })
                                                        }
                                                    </Hidden>
                                                </Grid> */}
                                                <Grid item>
                                                    <IconButton aria-label="Like" className={`${Style.Button} ${Style.LikeButton}`} disableRipple edge="start">
                                                        <FavoriteBorderOutlinedIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Box style={{flex: 1}} />
                                        <Box>

                                        </Box>
                                    </Toolbar>
                                </Paper>
                            </Box>
                }
            </Grid>
        </Grid>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        trending: state.api.trending,
        movieGenres: state.api.movies.genres,
        tvGenres: state.api.tv.genres,
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenSearchDialog: appActions.setOpenSearchDialog,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);