import React from 'react';

// Material UI Components
import { makeStyles, Grid, Card, CardActionArea, CardMedia, Button, CardContent, CardActions, IconButton, Typography} from '@material-ui/core';

// Animate on Scroll Library
import ScrollAnimation from 'react-animate-on-scroll';

// Icons
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Poster: {
        width: '100%',
        borderRadius: theme.shape.borderRadius,
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
        }
    },
    WatchlistButton: {
        boxShadow: 'none',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.hint,
        transition: '0.4s ease-in-out',
        '&:hover': {
            boxShadow: 'none',
            background: theme.palette.primary.main,
            color: theme.palette.common.white
        }
    },
}));

export default function RenderDataListItem( {typeData, media_type, genre} ) {
    const Style = useStyles();
    const data = typeData || [];
    
    const handleGetDate = (date) => {
        const splitDate = date.split('-');
        const newDate = splitDate[0]
        
        return newDate
    }

    // Grid Item Methods
    const handleLikeMovie = () => {
    
    }

    const handleAddToWatchlist = () => {

    }

    return(
        <React.Fragment>
            {
                data === [] || data === undefined
                    ? null
                        :
                        data.map((item, index) => {
                            return(
                                <Grid key={item.id} item sm={6} >
                                    <Card elevation={0} className={'animated fadeInSign'} style={{animationDelay: (index % 2 === 0) ? 250 : 750}}>
                                        <CardActionArea>
                                            <CardMedia
                                                alt="Contemplative Reptile"
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
                                            <Typography gutterBottom variant="h6" style={{fontWeight: '700'}}>
                                                {(media_type === 'tv') ? item.original_name : (media_type === 'movie') ? item.original_title : ''}
                                            </Typography>
                                            <Typography color="textSecondary" variant="button">
                                                {(media_type === 'tv') ? `(${handleGetDate(item.first_air_date)})` : (media_type === 'movie') ? `(${handleGetDate(item.release_date)})` : ''}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label='Like' className={Style.LikeButton} disableRipple onClick={() => handleLikeMovie(item)} >
                                                <FavoriteBorderRoundedIcon />
                                            </IconButton>
                                            <Button color="primary" className={Style.WatchlistButton} disableRipple variant="contained" onClick={() => handleAddToWatchlist(item)} startIcon={<AddRoundedIcon />} >
                                                Watchlist 
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
            }
        </React.Fragment>
    )
}