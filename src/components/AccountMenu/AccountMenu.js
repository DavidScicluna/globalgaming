import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import * as actions from '../../actions/SignDialog';

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
        background: theme.palette.error.main, 
        color: theme.palette.common.white,

        '&:hover': {
            background: theme.palette.error.main, 
            color: theme.palette.common.white,
        }
    },
}));

const ListItems = ({Signout}) => {
    return(
        <React.Fragment>
            <ListItem button>
                <ListItemText
                    primary="Your Watchlist"
                />
            </ListItem>
            <ListItem button>
                <ListItemText
                    primary="Your Ratings"
                />
            </ListItem>
            <ListItem button>
                <ListItemText
                    primary="Account Settings"
                />
            </ListItem>
            <ListItem className={Signout} button>
                <ListItemText
                    primary="Sign Out"
                />
            </ListItem>
        </React.Fragment>
    );
}

export default function AccountMenu( {anchorEl, openPopper, popperID, user, handleClosePopover} ) {
    const Style = useStyles();

    return (
        <Popover
            id={popperID}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            elevation={2}
            open={openPopper}
            onClose={handleClosePopover}
            TransitionComponent={Grow}
            transitionDuration={750}
        >
            <React.Fragment>
                <Hidden smUp>
                    <List disablePadding>
                        <ListItem divider>
                            <ListItemText
                                className={Style.Header}
                                primary={user.username}
                            />
                        </ListItem>
                        {
                            <ListItems Signout={Style.Signout} />
                        } 
                    </List>
                </Hidden>
                <Hidden xsDown>
                    <List disablePadding>
                        {
                            <ListItems Signout={Style.Signout} />
                        } 
                    </List>
                </Hidden>
            </React.Fragment>
        </Popover>
    )
}
