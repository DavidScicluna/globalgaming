import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Components
import RenderDataListItem from '../RenderDataListItem/RenderDataListItem'

// Material UI Components
import { makeStyles, Dialog, Slide, DialogTitle, Button, Container, Box, Grid, Typography, Input, FormControl, InputAdornment, Hidden, TextField, MenuItem} from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    DialogTitle: {
        padding: theme.spacing(2),
    },
    Button : {
        color: theme.palette.text.secondary,
        transition: '0.4s ease-in-out',
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.action.hover,
        '&:hover': {
            background: theme.palette.action.focus,
            color: theme.palette.text.primary
        }
    },
    Container: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(1, 0),
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
    Hidden: {
        opacity: 0,
        transition: 'opacity 0.4s ease-in-out',
    },
    Visible: {
        opacity: 1,
        transition: 'opacity 0.4s ease-in-out',
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
    },
    Margin: {
        margin: theme.spacing(2, 0)
    },
}));

export const ShowSelectContent = ({justify, handleShowChange, showValue}) => {
    return(
        <Grid item sm={6} container direction='row' justify={justify} alignItems='center' spacing={1}>
            <Grid item>
                <Typography variant='button'>
                    Show:
                </Typography>
            </Grid>
            <Grid item>
                <TextField
                    aria-label='Show Items Select'
                    color='primary'
                    fullWidth
                    onChange={(event) => handleShowChange(event)}
                    select
                    style={{paddingRight: 0}}
                    value={showValue}
                    >
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

const Search = (props) => {
    const Style = useStyles();

    // Search Bar State
    const [searchFocused, setSearchFocused] = useState(false); 
    const [searchEntered, setSearchEntered] = useState(false); 
    const [searchValue, setSearchValue] = useState(''); 
    
    // Show Select State
    const [showValue, setShowValue] = useState('movie'); 
    const [showChanged, setShowChanged] = useState(false); 
    
    // Search Data State
    const [searchMovieData, setSearchMovieData] = useState({}); 
    const [searchTVData, setSearchTVData] = useState({}); 
    const [searchResultsNumber, setSearchResultsNumber] = useState('0'); 
    const [searchPageNumber, setSearchPageNumber] = useState(0); 

    // Data Page State
    const [currentPage, setCurrentPage] = useState(1); 
    const [currentOffset, setCurrentOffset] = useState(0); 

    // This method will close the Search component
    const handleClickCloseSearchDialog = () => {
        props.setOpenSearchDialog(false);
    };
    
    // Search Bar Methods
    // This method will save whatever the user types in the text field
    const handleSearchChange = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        setCurrentOffset(0);
        setSearchValue(event.target.value);
    }

    // This method will set the state of searchEntered to true whenever the user presses the key 'Enter'
    const handleClickSearch = (event) => {
        if(event.key === 'Enter'){
            setSearchEntered(true);
        }
    }

    // Show Select Methods
    // This method will save whatever the user chooses from the select
    const handleShowChange = (event) => {
        event.preventDefault();
        setShowValue(event.target.value);
        setShowChanged(true);
    }

    // Data Page Methods
    const handleClickChangePage = (event, offset, next) => {
        const key = 'c287015949cec13fb17a26e50b4f054a';

        event.preventDefault();

        setCurrentOffset(offset);
        setCurrentPage(next);

        fetch(`https://api.themoviedb.org/3/search/${showValue}?query=${searchValue}&api_key=${key}&language=en-US&&page=${next}&include_adult=false`)
            .then(response => response.json())
            .then(json => {
                if(showValue === 'movie'){
                    setSearchMovieData(json);
                }else{
                    setSearchTVData(json);
                }
                return;
            })
            .catch(error => console.log(error));  
    }

    // This method will fetch the api
    useEffect(() => {
        const key = 'c287015949cec13fb17a26e50b4f054a';

        if(searchValue === ''){
            setSearchEntered(false);
            setSearchMovieData({});
            setSearchTVData({});
            setSearchResultsNumber('0');
            setSearchPageNumber(0);
        }
        else if(searchEntered === true || showChanged === true){
            fetch(`https://api.themoviedb.org/3/search/${showValue}?query=${searchValue}&api_key=${key}&language=en-US&&page=${currentPage}&include_adult=false`)
                .then(response => response.json())
                .then(json => {
                    if(showValue === 'movie'){
                        setSearchMovieData(json);
                    }else{
                        setSearchTVData(json);
                    }
                    setSearchResultsNumber(String(json.total_results));
                    setSearchPageNumber(String(json.total_pages));
                    setShowChanged(false);
                    return;
                })
                .catch(error => console.log(error));  
        } else {
            return
        }
    }, [searchEntered, showChanged, searchValue, showValue, currentPage])

    return (
        <Dialog
            className={Style.Dialog}
            fullWidth
            fullScreen
            maxWidth='md'
            onClose={handleClickCloseSearchDialog}
            open={props.openSearchDialog}
            TransitionComponent={Slide}
            transitionDuration={1000}

        >
            <DialogTitle className={Style.DialogTitle}>
                <Button className={Style.Button} disableRipple onClick={handleClickCloseSearchDialog}>
                    <div className={Style.ButtonContent}>
                        <CloseRoundedIcon />
                        <span>Close</span>
                    </div>
                </Button>
            </DialogTitle>
            <Container maxWidth='sm' disableGutters>
                <Box p={2}>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography variant='h6'>
                                Find a Movie or Series
                            </Typography>
                            <Box my={1} />
                            <FormControl style={{width: '100%'}}>
                                <Input
                                    aria-label='Search Bar'
                                    color='primary'
                                    className={searchFocused === true ? `${Style.Search} ${Style.SearchActive}` : Style.Search}
                                    fullWidth
                                    onChange={(event) => handleSearchChange(event)}
                                    onKeyPress={(event) => handleClickSearch(event)}
                                    onMouseDown={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    placeholder='Press enter to view data'
                                    startAdornment={
                                        <InputAdornment position='start'>
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    }
                                    type='text'
                                    variant='outlined'
                                    value={searchValue}
                                />
                            </FormControl>
                        </Grid>
                        <Box my={2} />
                        <Grid item container direction='row' justify='space-between' alignItems='center'>
                            <Grid item sm={6}>
                                <Typography className={searchEntered === false ? Style.Hidden : Style.Visible} variant='body2'>
                                    {searchResultsNumber} matching results for {`'${searchValue}'`}
                                </Typography>
                            </Grid>
                            <Hidden smUp>
                                <ShowSelectContent justify='flex-start' handleShowChange={handleShowChange} showValue={showValue} />
                            </Hidden>
                            <Hidden xsDown>
                                <ShowSelectContent justify='flex-end' handleShowChange={handleShowChange} showValue={showValue} />
                            </Hidden>
                        </Grid>
                        <Box my={2} />
                        {
                            (searchValue === '' || searchEntered === false || searchMovieData === {} || searchTVData === {})
                                ? null
                                    :
                                        <Grid item container alignItems='flex-start' justify='flex-start' wrap='wrap' spacing={2}>
                                            <RenderDataListItem 
                                                typeData={showValue === 'movie' ? searchMovieData.results : searchTVData.results } 
                                                category={showValue}
                                            />
                                        </Grid>
                        }
                        <Grid item container justify='flex-end'>
                            <Pagination
                                currentPageColor='primary'
                                otherPageColor='default'
                                className={searchEntered === false ? `${Style.Margin} ${Style.Hidden}` : `${Style.Margin} ${Style.Visible}`}
                                disableRipple
                                limit={5}
                                offset={currentOffset}
                                total={searchPageNumber || 10}
                                onClick={(event, offset, page) => handleClickChangePage(event, offset, page)}
                            />
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