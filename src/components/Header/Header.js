import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import * as actions from '../../actions/SignDialog';

// Components

// Material UI Components
import { makeStyles, Paper, Toolbar, Hidden, IconButton, Box, Fade, Button, Icon} from '@material-ui/core';

// Icons
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Icon : {
        color: theme.palette.common.black,
        '& svg': {
            transition: '0.5s ease',
            color: theme.palette.text.disabled
        },
        '&:hover': {
            '& svg': {
                color: theme.palette.common.black
            }
        }
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
    }
}));

const Header = ( {openSignDialog, users, user} ) => {
    const Style = useStyles();
    
    return (
        <Paper elevation={0} >
            <Toolbar>
                <Hidden smUp>
                    <IconButton aria-label="Menu" disableRipple edge="start">
                        <MenuRoundedIcon />
                    </IconButton>
                    <Box style={{flex: 1}} />
                    <IconButton aria-label="Search" disableRipple edge="start">
                        <SearchRoundedIcon />
                    </IconButton>
                    <IconButton aria-label="Account Menu" disableRipple edge="end">
                        <FaceRoundedIcon />
                        <ArrowDropDownRoundedIcon />
                    </IconButton>
                </Hidden>
                <Hidden xsDown>
                    <Button className={Style.Icon} disableRipple>
                        <div className={Style.ButtonContent}>
                            <MenuRoundedIcon />
                            <Box mr={0.75} />
                            <span>Menu</span>
                        </div>
                    </Button>
                    <Box style={{flex: 1}} />
                    <Button className={Style.Icon} disableRipple>
                        <div className={Style.ButtonContent}>
                            <SearchRoundedIcon />
                            <Box mr={0.75} />
                            <span>Search</span>
                        </div>
                    </Button>
                    <Box mx={0.75} />
                    <Button className={Style.Icon} disableRipple >
                        <div className={Style.ButtonContent}>
                            <FaceRoundedIcon />
                            <Box ml={0.75} mr={0.25}>
                                {user.username}
                            </Box>
                            <ArrowDropDownRoundedIcon />
                        </div>
                    </Button>
                </Hidden>
            </Toolbar>            
        </Paper>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        openSignDialog: state.openSignDialog,
        users: state.users,
        user: state.user,
    };
};

// Sending some data to an action
// const matchDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         setOpenSignDialog: actions.setOpenSignDialog,
//         setUsers: actions.setUsers,
//         setUser: actions.setUser
//     }, dispatch);
// }

export default connect(mapStateToProps)(Header);