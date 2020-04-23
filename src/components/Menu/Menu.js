import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import * as actions from '../../actions/SignDialog';

// Material UI Components
import { makeStyles, Box, Drawer, Grid, Hidden, IconButton, Button, List, ListItem, ListItemIcon, ListItemText, Collapse} from '@material-ui/core';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import TheatersRoundedIcon from '@material-ui/icons/TheatersRounded';
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
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
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
    Nested: {
        paddingLeft: theme.spacing(6),
    },
}));

export default function Menu( {openDrawer, user, handleCloseDrawer} ) {
    const Style = useStyles();

    const [openMovies, setOpenMovies] = React.useState(false);

    const handleClickMovies = () => {
        setOpenMovies(!openMovies);
    };

    return (
        <Drawer
            anchor="left"
            elevation={2}
            open={openDrawer}
            onClose={handleCloseDrawer}
            transitionDuration={750}
            variant="persistent"
        >
            <Box p={2 }>
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
                                    <Box mr={0.75} />
                                    <span>Close</span>
                                </div>
                            </Button>
                        </Hidden>
                    </Grid>
                    {/* <Grid item container direction="column" alignItems="center">
                        <Avatar
                            alt={`${user.username} Image`}
                            className={Style.Avatar}
                            style={{backgroundColor: user.color}}
                            variant="rounded"
                        >
                            {user.initials}
                        </Avatar>
                        <Typography align="center" variant="h6">
                            {user.username}
                        </Typography>
                    </Grid> */}
                    <Grid item>
                        <List>
                            <ListItem button onClick={handleClickMovies}>
                                <TheatersRoundedIcon />
                                <Box mx={1} />
                                <ListItemText primary="Movies" />
                                <Box mx={4} />
                                <ArrowDropDownRoundedIcon className={(openMovies === true) ? Style.IconActive : Style.IconInactive} />
                            </ListItem>
                            <Collapse in={openMovies} timeout={750} unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={Style.Nested}>
                                        <ListItemText primary="Starred" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    )
}
