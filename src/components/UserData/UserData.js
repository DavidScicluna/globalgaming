import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

// Components
import RenderDataListItem from '../RenderDataListItem/RenderDataListItem'
import {ShowSelectContent} from '../Search/Search';

// Material UI Components
import { makeStyles, Grid, TextField, Button, Typography, MenuItem, Hidden, Box } from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    '@media (max-width: 425px)': {
        Header: {
            fontSize: theme.typography.h6.fontSize
        },
        Results: {
            fontSize: theme.typography.body2.fontSize
        },
    },
    Header: {
        textTransform: 'capitalize',
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
}));

const UserData = (props) => {
    const Style = useStyles();

    // Show Select State
    const [showValue, setShowValue] = useState('movie'); 
    const [showChanged, setShowChanged] = useState(false); 

    // Show Select Methods
    const handleShowChange = (event) => {
        event.preventDefault();
        setShowValue(event.target.value);
        setShowChanged(true);
    }

    return (
        <Grid container direction="column">
            <Grid item container direction="row" alignItems="center" justify="flex-start">
                <Grid item sm={6}>
                    <Typography className={Style.Header} variant="h4" color="textPrimary">
                        {
                            props.gridPreviewApiCategory
                        }
                    </Typography>
                </Grid>
                <Hidden smUp>
                    <ShowSelectContent justify='flex-start' handleShowChange={handleShowChange} showValue={showValue} />
                </Hidden>
                <Hidden xsDown>
                    <ShowSelectContent justify='flex-end' handleShowChange={handleShowChange} showValue={showValue} />
                </Hidden>
            </Grid>
            <Grid item container alignItems="flex-start" justify="flex-start" wrap="wrap" spacing={2}>
                <RenderDataListItem 
                    typeData={(props.gridPreviewApiCategory === 'liked') ? props.user.likes[showValue] : (props.gridPreviewApiCategory === 'watchlist') ? props.user.watchlist[showValue] : null} 
                    category={showValue} 
                />
            </Grid>
        </Grid>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        // Internal State (APP)
        user: state.app.user,
        gridPreviewApiTitle: state.app.gridPreviewApiTitle,
    };
  };

  export default connect(mapStateToProps)(UserData);