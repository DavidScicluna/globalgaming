import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Components
import Menu from '../Menu/Menu';
import Search from '../Search/Search';
import AccountMenu from '../AccountMenu/AccountMenu';

// Material UI Components
import { makeStyles, Paper, Toolbar, Hidden, IconButton, Box, Fade, Button, Icon} from '@material-ui/core';

// Icons
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Button : {
        color: theme.palette.text.hint,
        transition: '0.4s ease-in-out',
        '&:hover': {
            background: theme.palette.action.hover,
            color: theme.palette.text.primary
        }
    },
    ButtonActive : {
        background: theme.palette.action.hover,
        color: theme.palette.text.primary,
    },
    IconActive : {
        color: theme.palette.text.primary,
        transform: 'rotate(180deg)',
        transition: 'transform 0.4s ease-in-out',
    },
    IconInactive : {
        transform: 'rotate(360deg)',
        transition: 'transform 0.4s ease-in-out',
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
    }
}));

const Header = ( {user, setOpenSignDialog, setOpenSearchDialog} ) => {
    const Style = useStyles();

    // Menu Drawer State
    const [openDrawer, setOpenDrawer] = React.useState(false);

    // Account Menu Popover State
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopper, setOpenPopper] = useState(false);

    const popperID = openPopper ? 'Account Menu' : undefined;

    // Menu Drawer Methods
    const handleClickOpenMenuDrawer = (event) => {
        event.preventDefault();
        setOpenDrawer(true);
    };

    const handleCloseMenuDrawer = () => {
        setOpenDrawer(false);
    };

    // Search Dialog Methods
    const handleClickOpenSearchDialog = (event) => {
        event.preventDefault();
        setOpenSearchDialog(true);
    };

    // Account Menu Popover Methods
    const handleClickOpenAccountMenuPopover = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setOpenPopper(true);
    };
    
    const handleCloseAccountMenuPopover = () => {
        setAnchorEl(null);
        setOpenPopper(false);
    };
    
    return (
        <React.Fragment>
            <Paper elevation={0} >
                <Toolbar disableGutters>
                    <Hidden smUp>
                        <IconButton aria-label="Menu" className={(openDrawer === true) ? Style.ButtonActive : Style.Button} disableRipple edge="start" onClick={(event) => handleClickOpenMenuDrawer(event)}>
                            <MenuRoundedIcon />
                        </IconButton>
                        <Box style={{flex: 1}} />
                        <IconButton aria-label="Search" className={Style.Button} disableRipple edge="start" onClick={(event) => handleClickOpenSearchDialog(event)}>
                            <SearchRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="Account Menu" className={(openPopper === true) ? Style.ButtonActive : Style.Button} disableRipple edge="end" onClick={(event) => handleClickOpenAccountMenuPopover(event)}>
                            <FaceRoundedIcon />
                            <ArrowDropDownRoundedIcon className={(openPopper === true) ? Style.IconActive : Style.IconInactive} />
                        </IconButton>
                    </Hidden>
                    <Hidden xsDown>
                        <Button className={(openDrawer === true) ? Style.ButtonActive : Style.Button} disableRipple onClick={(event) => handleClickOpenMenuDrawer(event)}>
                            <div className={Style.ButtonContent}>
                                <MenuRoundedIcon />
                                <Box mr={0.75} />
                                <span>Menu</span>
                            </div>
                        </Button>
                        <Box style={{flex: 1}} />
                        <Button className={Style.Button} disableRipple onClick={(event) => handleClickOpenSearchDialog(event)}>
                            <div className={Style.ButtonContent}>
                                <SearchRoundedIcon />
                                <Box mr={0.75} />
                                <span>Search</span>
                            </div>
                        </Button>
                        <Box mx={0.75} />
                        <Button aria-describedby={popperID} className={(openPopper === true) ? Style.ButtonActive : Style.Button} disableRipple onClick={(event) => handleClickOpenAccountMenuPopover(event)}>
                            <div className={Style.ButtonContent}>
                                <FaceRoundedIcon />
                                <Box ml={0.75} mr={0.25}>
                                    {user.username}
                                </Box>
                                <ArrowDropDownRoundedIcon className={(openPopper === true) ? Style.IconActive : Style.IconInactive} />
                            </div>
                        </Button>
                    </Hidden>
                </Toolbar>            
            </Paper>
            <Menu openDrawer={openDrawer} user={user} handleCloseDrawer={handleCloseMenuDrawer} />
            <Search />
            <AccountMenu anchorEl={anchorEl} openPopper={openPopper} popperID={popperID} user={user} handleClosePopover={handleCloseAccountMenuPopover} />
        </React.Fragment>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        user: state.app.user,
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenSignDialog: appActions.setOpenSignDialog,
        setOpenSearchDialog: appActions.setOpenSearchDialog,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);