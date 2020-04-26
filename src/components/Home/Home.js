import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Material UI Components
import { makeStyles, Grid, Typography, Box, Button} from '@material-ui/core';

// Icons
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    '@media (min-width: 1024px)': {
        TrendingItem: {
            cursor: 'pointer',
            width: '342px'
        },
    },
    Header: {
        fontWeight: theme.typography.fontWeightBold
    },
    TrendingContainer: {
        overflowX: 'auto',
        overflowY: 'hidden'
    },
    TrendingItem: {
        cursor: 'pointer',
        width: '342px'
    },
    Poster: {
        borderRadius: theme.shape.borderRadius,
        transition: '0.4s ease-in-out',

        '&:hover': {
            filter: 'brightness(50%)',
        }
    },
}));

const RenderHomeApiData = ({Style, header, data, dataName, category, handleOpenPage}) => {
    const newData = (dataName === 'Trending') ? data.results : data;

    return(
        <React.Fragment>
            <Grid item container direction="row" alignItems="center" justify="flex-start">
                <Typography className={Style.Header} variant="h4" color="textPrimary">
                    {header}
                </Typography>
                {
                    (dataName === 'Trending')
                        ? null
                            :
                            <React.Fragment>
                                <Box mx={1} />
                                <Button disableRipple endIcon={<ArrowRightAltIcon />} onClick={() => handleOpenPage(category, 'popular', 'Most Popular')}>
                                    View more
                                </Button>
                            </React.Fragment>
                }
            </Grid>
            <Grid className={Style.TrendingContainer} item container direction="row" wrap="nowrap" justify="flex-start">
                {
                    (newData === {} || newData === undefined)
                        ? null
                            :
                            newData.map((item, index) => {
                                const media = dataName === 'Trending' ? item.media_type : category;

                                return(
                                    <Box className={`${Style.TrendingItem} animated fadeInSign`} style={{animationDelay: (index % 2 === 0) ? 250 : 750}} key={item.id} my={2} mr={2}>
                                        <img 
                                            alt={(media === 'tv') ? item.original_name : (media === 'movie') ? item.title : ''}
                                            className={Style.Poster}
                                            src={`https://image.tmdb.org/t/p/w342/${item.poster_path}`}
                                        />
                                    </Box>
                                );
                            })
                } 
            </Grid>
            <Box mb={4} />
        </React.Fragment>
    );
}

const Home = (props) => {
    const Style = useStyles();

    // This method will open the GridPreview component with the data the user chooses
    const handleOpenPage = (category, type, title) => {
        props.setGridPreviewApiCategory(category);
        props.setGridPreviewApiType(type);
        props.setGridPreviewApiTitle(title);
    }

    return (
        <Grid container direction="column">
            <RenderHomeApiData Style={Style} header={'Trending'} data={props.trending} dataName={'Trending'} category={''} handleOpenPage={handleOpenPage} />
            <RenderHomeApiData Style={Style} header={'Popular Movies'} data={props.moviePopular} dataName={'Popular'} category={'movie'} handleOpenPage={handleOpenPage} />
            <RenderHomeApiData Style={Style} header={'Popular TV'} data={props.tvPopular} dataName={'Popular'} category={'tv'} handleOpenPage={handleOpenPage} />
        </Grid>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        trending: state.api.trending,
        moviePopular: state.api.movies.popular,
        tvPopular: state.api.tv.popular,
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setGridPreviewApiCategory: appActions.setGridPreviewApiCategory,
        setGridPreviewApiType: appActions.setGridPreviewApiType,
        setGridPreviewApiTitle: appActions.setGridPreviewApiTitle,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);