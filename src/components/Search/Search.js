import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Components

// Material UI Components
import { makeStyles, Dialog, Slide, Container, Box, Grid, TextField, Button, FormControl, Input, InputAdornment, Typography, DialogTitle, MenuItem, Hidden} from '@material-ui/core';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({

    Button : {
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.hint,
        transition: '0.4s ease-in-out',
        '&:hover': {
            background: theme.palette.action.hover,
            color: theme.palette.text.primary
        }
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
    },
    Search: {
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.text.hint}`,
        color: theme.palette.text.hint,
        padding: theme.spacing(1),
        transition: '0.4s ease-in-out',
        '&:hover': {
            border: `2px solid ${theme.palette.text.primary}`,
            color: theme.palette.text.primary
        },
        '&::before': {
            border: [['none'], '!important'],
        },
        '&::after': {
            border: [['none'], '!important'],
        }
    },
    SearchActive: {
        border: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary
    },
    Header: {
        '& span': {
            fontSize: [[theme.typography.h6.fontSize], '!important'],
            fontWeight: [[theme.typography.fontWeightMedium], '!important'],
            textTransform: 'uppercase',
        }
    },
    Hidden: {
        opacity: 0,
        transition: 'opacity 0.4s ease-in-out',
    },
    Visible: {
        opacity: 1,
        transition: 'opacity 0.4s ease-in-out',
    }
}));

const ShowSelectContent = ({justify, handleShowChange, showValue}) => {
    return(
        <Grid item sm={6} container direction="row" justify={justify} alignItems="center" spacing={1}>
            <Grid item>
                <Typography variant="button">
                    Show:
                </Typography>
            </Grid>
            <Grid item>
                <TextField
                    aria-label="Show Items Select"
                    color="primary"
                    fullWidth
                    onChange={(event) => handleShowChange(event)}
                    select
                    style={{paddingRight: 0}}
                    value={showValue}
                    >
                        <MenuItem value={'all'}>
                            All
                        </MenuItem>
                        <MenuItem value={'movie'}>
                            Only Movies
                        </MenuItem>
                        <MenuItem value={'tv'}>
                            Only TV
                        </MenuItem>
                </TextField>
            </Grid>
        </Grid>
    );
}

const Search = ( {openSearchDialog, setOpenSearchDialog} ) => {
    const Style = useStyles();

    // Search Bar State
    const [searchFocused, setSearchFocused] = useState(false); 
    const [searchValue, setSearchValue] = useState(''); 
    
    // Show Select State
    const [showValue, setShowValue] = useState('all'); 
    
    // Search Data
    const [searchMovieData, setSearchMovieData] = useState({}); 
    const [searchTVData, setSearchTVData] = useState({}); 
    const [searchResultsNumber, setSearchResultsNumber] = useState('0'); 
    const [searchPageNumber, setSearchPageNumber] = useState(0); 

    // Search Bar Methods
    const handleClickCloseSearchDialog = () => {
        setOpenSearchDialog(false);
    };
    
    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
        fetchApiData(event.target.value, showValue);
    }

    const handleShowChange = (event) => {
        event.preventDefault();
        setShowValue(event.target.value);
        fetchApiData(searchValue, event.target.value);
    }

    const fetchApiData = (value, showType) => {
        const key = 'c287015949cec13fb17a26e50b4f054a';

        if(value === ''){
            setSearchMovieData({});
            setSearchTVData({});
            setSearchResultsNumber('0');
            setSearchPageNumber(0);
            return
        } else {
            if(showType === 'all'){
                const types = ['movie', 'tv'];

                types.forEach(type => {
                    fetch(`https://api.themoviedb.org/3/search/${type}?query=${value}&api_key=${key}&language=en-US&page=1&include_adult=false`)
                        .then(response => response.json())
                        .then(json => {
                            if(type === 'movie'){
                                setSearchMovieData(json);
                                setSearchResultsNumber(String(json.total_results + searchTVData.total_results));
                                setSearchPageNumber(String(json.total_pages + searchTVData.total_pages));
                                return;
                            }else{
                                setSearchTVData(json);
                                setSearchResultsNumber(String(searchMovieData.total_results + json.total_results));
                                setSearchPageNumber(String(searchMovieData.total_pages + json.total_pages));
                                return;
                            }  
                        })
                        .catch(error => console.log(error));          
                })
            }else{
                fetch(`https://api.themoviedb.org/3/search/${showType}?query=${value}&api_key=${key}&language=en-US&page=1&include_adult=false`)
                    .then(response => response.json())
                    .then(json => {
                        if(showType === 'movie'){
                            setSearchMovieData(json);
                        }else{
                            setSearchTVData(json);
                        }
                        setSearchResultsNumber(String(json.total_results));
                        setSearchPageNumber(String(json.total_pages));
                        return;
                    })
                    .catch(error => console.log(error));                
            }
        }
    }

    return (
        <Dialog
            className={Style.Dialog}
            aria-labelledby="SignTitle"
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            fullScreen
            maxWidth="md"
            open={openSearchDialog}
            TransitionComponent={Slide}
            transitionDuration={1000}

        >
            <DialogTitle>
                <Button className={Style.Button} disableRipple onClick={handleClickCloseSearchDialog}>
                    <div className={Style.ButtonContent}>
                        <CloseRoundedIcon />
                        <span>Close</span>
                    </div>
                </Button>
            </DialogTitle>
            <Container maxWidth="sm" disableGutters>
                <Box p={2}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Typography variant="h6">
                                Find a Movie or Series
                            </Typography>
                            <Box my={1} />
                            <FormControl style={{width: '100%'}}>
                                <Input
                                    aria-label="Search Bar"
                                    color="primary"
                                    className={searchFocused === true ? `${Style.Search} ${Style.SearchActive}` : Style.Search}
                                    fullWidth
                                    onChange={(event) => handleSearchChange(event)}
                                    onMouseDown={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    placeholder='Try "The Godfather"'
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    }
                                    type="text"
                                    variant="outlined"
                                    value={searchValue}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container direction="row" justify="space-between" alignItems="center">
                            <Grid item sm={6}>
                                <Typography className={searchValue === '' ? Style.Hidden : Style.Visible} variant="body2">
                                    {searchResultsNumber} matching results for {`"${searchValue}"`}
                                </Typography>
                            </Grid>
                            <Hidden smUp>
                                <ShowSelectContent justify='flex-start' handleShowChange={handleShowChange} showValue={showValue} />
                            </Hidden>
                            <Hidden xsDown>
                                <ShowSelectContent justify='flex-end' handleShowChange={handleShowChange} showValue={showValue} />
                            </Hidden>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Dialog>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        openSearchDialog: state.app.openSearchDialog,
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenSearchDialog: appActions.setOpenSearchDialog,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);