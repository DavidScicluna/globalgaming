import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Components
import RenderDataListItem from '../RenderDataListItem/RenderDataListItem'

// Material UI Components
import { makeStyles, Dialog, Slide, Container, Box, Grid, TextField, Button, FormControl, Input, InputAdornment, Typography, DialogTitle, MenuItem, Hidden} from '@material-ui/core';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Dialog: {
        backgroundColor: theme.palette.background.paper,
    },
    DialogTitle: {
        padding: theme.spacing(2),
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
    SortButton: {
        boxShadow: 'none',
        borderRadius: '25px',
        
        '&:hover': {
            boxShadow: 'none',
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

export const ShowSelectContent = ({justify, handleShowChange, showValue}) => {
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
    
    // Search Data
    const [searchMovieData, setSearchMovieData] = useState({}); 
    const [searchTVData, setSearchTVData] = useState({}); 
    const [searchResultsNumber, setSearchResultsNumber] = useState('0'); 
    const [searchPageNumber, setSearchPageNumber] = useState(0); 

    const handleClickCloseSearchDialog = () => {
        props.setOpenSearchDialog(false);
    };
    
    // Search Bar Methods
    const handleSearchChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    }

    const handleClickSearch = (event) => {
        if(event.key === "Enter"){
            setSearchEntered(true);
        }
    }

    // Show Select Methods
    const handleShowChange = (event) => {
        event.preventDefault();
        setShowValue(event.target.value);
        setShowChanged(true);
    }

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
            fetch(`https://api.themoviedb.org/3/search/${showValue}?query=${searchValue}&api_key=${key}&language=en-US&include_adult=false`)
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
    }, [searchEntered, showChanged, searchValue, showValue])

    return (
        <Dialog
            className={Style.Dialog}
            fullWidth
            fullScreen
            maxWidth="md"
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
            <Container maxWidth="sm" disableGutters>
                <Box p={2}>
                    <Grid container direction="column">
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
                                    onKeyPress={(event) => handleClickSearch(event)}
                                    onMouseDown={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    placeholder='Press enter to view data'
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
                        <Box my={1.5} />
                        <Grid item container direction="row" justify="space-between" alignItems="center">
                            <Grid item sm={6}>
                                <Typography className={searchEntered === false ? Style.Hidden : Style.Visible} variant="body2">
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
                        <Box my={2} />
                        {
                            (searchValue === '' || searchEntered === false || searchMovieData === {} || searchTVData === {})
                                ? null
                                    :
                                        <Grid item container alignItems="flex-start" justify="flex-start" wrap="wrap" spacing={2}>
                                            <RenderDataListItem 
                                                typeData={showValue === 'movie' ? searchMovieData.results : searchTVData.results } 
                                                category={showValue}
                                            />
                                        </Grid>
                        }
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