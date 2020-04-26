import React from 'react';

// Material UI Components
import { makeStyles, Grid, Card, CardActionArea, CardMedia, Button, CardContent, CardActions, IconButton, Typography, Box} from '@material-ui/core';

// Icons
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Container: {
        margin: theme.spacing(2, 0),
    },
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
        color: theme.palette.common.white,
        transition: '0.4s ease-in-out',
        '&:hover': {
            boxShadow: 'none',
            background: theme.palette.primary.dark,
        }
    },
}));

export default function RenderDataListItem( {typeData, category, genre} ) {
    const Style = useStyles();
    const data = typeData || [];
    
    const handleGetDate = (date) => {
        if(date === undefined){
            return
        } else {
            const splitDate = date.split('-');
            const newDate = splitDate[0]
            
            return newDate
        }
    }

    // Grid Item Methods
    const handleLikeMovie = (item) => {
    
    }

    const handleAddToWatchlist = (item) => {

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
                                                {(category === 'tv') ? item.original_name : (category === 'movie') ? item.original_title : ''}
                                            </Typography>
                                            <Typography color="textSecondary" variant="button">
                                                {(category === 'tv') ? `(${handleGetDate(item.first_air_date)})` : (category === 'movie') ? `(${handleGetDate(item.release_date)})` : ''}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label='Like' className={Style.LikeButton} disableRipple onClick={() => handleLikeMovie(item)} >
                                                <FavoriteBorderRoundedIcon />
                                            </IconButton>
                                            <Box mx={0.25} />
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