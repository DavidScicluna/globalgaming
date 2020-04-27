import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Material UI Components
import { makeStyles, Popover, Grow, Hidden, List, ListItem, ListItemText} from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Header: {
        '& span': {
            fontSize: theme.typography.h6.fontSize,
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.text.primary,
        }
    },
    Signout : {
        color: theme.palette.error.main, 
        '&:hover': {
            color: theme.palette.error.main, 
        }
    },
}));

const ListItems = ({props, Signout}) => {
    // Opens Customize Dialog Component
    const handleClickOpenCustomizeDialog = (event) => {
        event.preventDefault();
        props.setOpenCustomizeDialog(true);
        props.handleClosePopover()
    };

    // Signs out the user
    const handleClickSignOut = (event) => {
        event.preventDefault();

        localStorage.removeItem('user');
        
        props.setUser({});
        props.setOpenSignDialog(true);
        props.handleClosePopover()
    };

    return(
        <React.Fragment>
            <ListItem button onClick={() => {props.setGridPreviewApiCategory('likes'); props.handleClosePopover()}} disabled={props.user.access === 'guest' ? true : false}>
                <ListItemText
                    primary='Your Likes'
                />
            </ListItem>
            <ListItem button onClick={() => {props.setGridPreviewApiCategory('watchlist'); props.handleClosePopover()}} disabled={props.user.access === 'guest' ? true : false}>
                <ListItemText
                    primary='Your Watchlist'
                />
            </ListItem>
            <ListItem button onClick={(event) => handleClickOpenCustomizeDialog(event)} disabled={props.user.access === 'guest' ? true : false}>
                <ListItemText
                    primary='Customize'
                />
            </ListItem>
            <ListItem className={Signout} button onClick={(event) => handleClickSignOut(event)}>
                <ListItemText
                    primary='Sign Out'
                />
            </ListItem>
        </React.Fragment>
    );
}

const AccountMenu = (props) =>  {
    const Style = useStyles();

    return (
        <Popover
            id={props.popperID}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            elevation={2}
            open={props.openPopper}
            onClose={props.handleClosePopover}
            TransitionComponent={Grow}
            transitionDuration={750}
        >
            <React.Fragment>
                <Hidden smUp>
                    <List disablePadding>
                        <ListItem divider>
                            <ListItemText
                                className={Style.Header}
                                primary={props.user.username}
                            />
                        </ListItem>
                        {
                            <ListItems props={props} Signout={Style.Signout} />
                        } 
                    </List>
                </Hidden>
                <Hidden xsDown>
                    <List disablePadding>
                        {
                            <ListItems props={props} Signout={Style.Signout} />
                        } 
                    </List>
                </Hidden>
            </React.Fragment>
        </Popover>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        users: state.app.users
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenSignDialog: appActions.setOpenSignDialog,
        setOpenCustomizeDialog: appActions.setOpenCustomizeDialog,
        setGridPreviewApiCategory: appActions.setGridPreviewApiCategory,
        setUser: appActions.setUser,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountMenu);