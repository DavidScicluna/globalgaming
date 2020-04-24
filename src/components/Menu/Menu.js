import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import * as actions from '../../actions/SignDialog';

// Material UI Components
import { makeStyles, Box, Drawer, Grid, Hidden, IconButton, Button, List, ListItem, ListItemText, Collapse, Divider, ButtonGroup} from '@material-ui/core';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import TheatersOutlinedIcon from '@material-ui/icons/TheatersOutlined';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Drawer: {
        minWidth: '250px'
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
    ButtonActive : {
        background: theme.palette.action.hover,
        color: theme.palette.text.primary,
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
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
    Nested: {
        margin: theme.spacing(1, 0),
        paddingLeft: theme.spacing(4),
    },
    Header: {
        '& span': {
            fontSize: [[theme.typography.h6.fontSize], '!important'],
            fontWeight: [[theme.typography.fontWeightMedium], '!important'],
            textTransform: 'uppercase',
        }
    },
    Divider: {
        margin: theme.spacing(2, 0),
    },
    MarginRight: {
        marginRight: theme.spacing(1),
    }
}));

export default function Menu( {openDrawer, user, handleCloseDrawer} ) {
    const Style = useStyles();

    const [openMovies, setOpenMovies] = React.useState(true);
    const [openTV, setOpenTV] = React.useState(false);

    const movieTypes = [
        {
            id: Math.random(),
            title:'Now Playing',
            method: null
        }, 
        {
            id: Math.random(),
            title:'Most Popular',
            method: null
        },
        {
            id: Math.random(),
            title:'Top Rated',
            method: null
        },
        {
            id: Math.random(),
            title:'Upcoming',
            method: null
        },
    ];

    const tvTypes = [
        {
            id: Math.random(),
            title:'Airing Today',
            method: null
        }, 
        {
            id: Math.random(),
            title:'Showing Now On TV',
            method: null
        },
        {
            id: Math.random(),
            title:'Most Popular',
            method: null
        },
        {
            id: Math.random(),
            title:'Top Rated',
            method: null
        },
    ];

    const handleClickMovies = () => {
        setOpenMovies(!openMovies);
    };
    
    const handleClickTV = () => {
        setOpenTV(!openTV);
    };

    return (
        <Drawer
            anchor="left"
            elevation={2}
            open={openDrawer}
            onClose={handleCloseDrawer}
            transitionDuration={750}
            // variant="persistent"
        >
            <Box p={2} className={Style.Drawer}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Hidden smUp>
                            <IconButton aria-label="Search" className={Style.Button} disableRipple edge="start" onClick={handleCloseDrawer}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Hidden>
                        <Hidden xsDown>
                            <Button className={Style.Button} disableRipple onClick={handleCloseDrawer}>
                                <div className={Style.ButtonContent}>
                                    <CloseRoundedIcon />
                                    <span>Close</span>
                                </div>
                            </Button>
                        </Hidden>
                    </Grid>
                    <Grid item>
                        <List>
                            <ListItem className={openMovies === true ? `${Style.Header} ${Style.ButtonActive}` : `${Style.Header} ${Style.Button}`} button onClick={handleClickMovies}>
                                <TheatersOutlinedIcon className={Style.MarginRight} />
                                <ListItemText primary="Movies" />
                                <Box style={{flex: 1}} />
                                <ArrowDropDownRoundedIcon className={(openMovies === true) ? Style.IconActive : Style.IconInactive} />
                            </ListItem>
                            <Collapse in={openMovies} timeout={750} unmountOnExit>
                                <List disablePadding>
                                    {
                                        movieTypes.map(item => {
                                            return(
                                                <ListItem key={item.id} button className={`${Style.Nested} ${Style.Button}`} onClick={item.method}>
                                                    <ListItemText primary={item.title} />
                                                </ListItem>
                                            );
                                        })
                                    }
                                </List>
                            </Collapse>

                            <ListItem className={openTV === true ? `${Style.Header} ${Style.ButtonActive}` : `${Style.Header} ${Style.Button}`} button onClick={handleClickTV}>
                                <TvOutlinedIcon className={Style.MarginRight} />
                                <ListItemText primary="TV" />
                                <Box style={{flex: 1}} />
                                <ArrowDropDownRoundedIcon className={(openTV === true) ? Style.IconActive : Style.IconInactive} />
                            </ListItem>
                            <Collapse in={openTV} timeout={750} unmountOnExit>
                                <List disablePadding>
                                    {
                                        tvTypes.map(item => {
                                            return(
                                                <ListItem key={item.id} button className={`${Style.Nested} ${Style.Button}`} onClick={item.method}>
                                                    <ListItemText primary={item.title} />
                                                </ListItem>
                                            );
                                        })
                                    }
                                </List>
                            </Collapse>

                            <Divider className={Style.Divider} variant="inset" />

                            <ListItem className={`${Style.Header} ${Style.Button}`}>
                                <FavoriteBorderOutlinedIcon className={Style.MarginRight} />
                                <ListItemText primary="Liked" />
                            </ListItem>
                            <ListItem className={`${Style.Header} ${Style.Button}`}>
                                <HourglassEmptyOutlinedIcon className={Style.MarginRight} />
                                <ListItemText primary="Watchlist" />
                            </ListItem>
                            <ListItem className={`${Style.Header} ${Style.Button}`}>
                                <StarBorderOutlinedIcon className={Style.MarginRight} />
                                <ListItemText primary="Ratings" />
                            </ListItem>

                            <Divider className={Style.Divider} variant="inset" />

                            <ListItem className={`${Style.Header} ${Style.Button}`}>
                                <SettingsOutlinedIcon className={Style.MarginRight} />
                                <ListItemText primary="Settings " />
                            </ListItem>
                            <ListItem className={`${Style.Header} ${Style.Button}`}>
                                <ColorLensOutlinedIcon className={Style.MarginRight} />
                                <ListItemText primary="Customize" />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    )
}
