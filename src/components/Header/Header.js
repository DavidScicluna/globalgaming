import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import * as actions from '../../actions/SignDialog';

// Components
import AccountMenu from '../AccountMenu/AccountMenu'

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
        transition: '0.5s ease-in-out',
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
        transition: 'transform 0.5s ease-in-out',
    },
    IconInactive : {
        transform: 'rotate(360deg)',
        transition: 'transform 0.5s ease-in-out',
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
    }
}));

const Header = ( {openSignDialog, users, user} ) => {
    const Style = useStyles();

    // Account Menu Popover State
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPopper, setOpenPopper] = useState(false);

    const popperID = openPopper ? 'Account Menu' : undefined;


    // Account Menu Popover Methods
    const handleClickOpenPopover = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setOpenPopper(true);
    };
    
    const handleClosePopover = () => {
        setAnchorEl(null);
        setOpenPopper(false);
    };
    
    return (
        <React.Fragment>
            <Paper elevation={0} >
                <Toolbar disableGutters>
                    <Hidden smUp>
                        <IconButton aria-label="Menu" className={Style.Button} disableRipple edge="start">
                            <MenuRoundedIcon />
                        </IconButton>
                        <Box style={{flex: 1}} />
                        <IconButton aria-label="Search" className={Style.Button} disableRipple edge="start">
                            <SearchRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="Account Menu" className={(openPopper === true) ? Style.ButtonActive : Style.Button} disableRipple edge="end" onClick={(event) => handleClickOpenPopover(event)}>
                            <FaceRoundedIcon />
                            <ArrowDropDownRoundedIcon className={(openPopper === true) ? Style.IconActive : Style.IconInactive} />
                        </IconButton>
                    </Hidden>
                    <Hidden xsDown>
                        <Button className={Style.Button} disableRipple>
                            <div className={Style.ButtonContent}>
                                <MenuRoundedIcon />
                                <Box mr={0.75} />
                                <span>Menu</span>
                            </div>
                        </Button>
                        <Box style={{flex: 1}} />
                        <Button className={Style.Button} disableRipple>
                            <div className={Style.ButtonContent}>
                                <SearchRoundedIcon />
                                <Box mr={0.75} />
                                <span>Search</span>
                            </div>
                        </Button>
                        <Box mx={0.75} />
                        <Button aria-describedby={popperID} className={(openPopper === true) ? Style.ButtonActive : Style.Button} disableRipple onClick={(event) => handleClickOpenPopover(event)}>
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
            <AccountMenu anchorEl={anchorEl} openPopper={openPopper} popperID={popperID} user={user} handleClosePopover={handleClosePopover} />
        </React.Fragment>
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