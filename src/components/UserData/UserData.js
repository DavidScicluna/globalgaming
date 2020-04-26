import React, {useState} from 'react';
import { connect } from 'react-redux';

// Components
import RenderDataListItem from '../RenderDataListItem/RenderDataListItem'
import {ShowSelectContent} from '../Search/Search';

// Material UI Components
import { makeStyles, Grid, Typography, Hidden} from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    '@media (max-width: 425px)': {
        Header: {
            fontSize: theme.typography.h6.fontSize
        },
    },
    Header: {
        textTransform: 'capitalize',
        fontWeight: theme.typography.fontWeightBold
    },
}));

const UserData = (props) => {
    const Style = useStyles();

    // Show Select State
    const [showValue, setShowValue] = useState('movie');

    // Show Select Methods
    // This method will save whatever the user chooses from the select
    const handleShowChange = (event) => {
        event.preventDefault();
        setShowValue(event.target.value);
    }

    return (
        <Grid container direction="column">
            <Grid item container direction="row" alignItems="center" justify="flex-start">
                <Grid item sm={6}>
                    <Typography className={Style.Header} variant="h4" color="textPrimary">
                        {
                            `Your ${props.gridPreviewApiCategory}`
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
                    typeData={(props.gridPreviewApiCategory === 'likes') ? props.user.likes[showValue] : (props.gridPreviewApiCategory === 'watchlist') ? props.user.watchlist[showValue] : null} 
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
        gridPreviewApiCategory: state.app.gridPreviewApiCategory,
    };
  };

  export default connect(mapStateToProps)(UserData);