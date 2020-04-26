import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Components
import RenderDataListItem from '../RenderDataListItem/RenderDataListItem'

// Material UI Components
import { makeStyles, Dialog, Fade, Container, Box, Grid, Avatar, Button, FormControl, Input, InputAdornment, Typography, DialogTitle, IconButton, Hidden} from '@material-ui/core';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckIcon from '@material-ui/icons/Check';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Dialog: {
        backgroundColor: theme.palette.background.paper,
    },
    DialogTitle: {
        
    },
    ColorContainer : {
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.action.hover,
    },
    Color: {
        cursor: 'pointer',
        padding: theme.spacing(2),
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

const Customize = (props) => {
    const Style = useStyles();

    const colors = [
        {
            id: Math.random(),
            title: 'Pink',
            color: '#F06292'
        },
        {
            id: Math.random(),
            title: 'Purple',
            color: '#9575CD'
        },
        {
            id: Math.random(),
            title: 'Indigo',
            color: '#7986CB'
        },
        {
            id: Math.random(),
            title: 'Blue',
            color: '#64B5F6'
        },
        {
            id: Math.random(),
            title: 'Teal',
            color: '#4DB6AC'
        },
        {
            id: Math.random(),
            title: 'Amber',
            color: '#FFD54F'
        },
        {
            id: Math.random(),
            title: 'Orange',
            color: '#FFB74D'
        },
        {
            id: Math.random(),
            title: 'Deep Orange',
            color: '#FF8A65'
        },
    ]

    // Color State
    const [currentColor, setCurrentColor] = useState({});

    const handleClickCloseCustomizeDialog = () => {
        props.setOpenCustomizeDialog(false);
    };

    // Color Methods
    const handleUpdateColor = (color) => {
        console.log(color);
        setCurrentColor(color);
    } 

    return (
        <Dialog
            className={Style.Dialog}
            fullWidth
            maxWidth="xs"
            onClose={handleClickCloseCustomizeDialog}
            open={props.openCustomizeDialog}
            TransitionComponent={Fade}
            transitionDuration={1000}
        >
            <DialogTitle className={Style.DialogTitle}>
                <Grid item container direction="column" alignItems="flex-start">
                    <Button className={Style.Button} disableRipple onClick={handleClickCloseCustomizeDialog}>
                        <div className={Style.ButtonContent}>
                            <CloseRoundedIcon />
                            <span>Close</span>
                        </div>
                    </Button>
                    <span>Customize your view</span>
                </Grid>
                
            </DialogTitle> 
            <Container maxWidth="sm" disableGutters>
                <Box p={2}>
                    <Grid container direction="column">
                        <Box p={2}>
                            <Grid xs={12} item>
                                <Typography variant="button">
                                    Color
                                </Typography>
                            </Grid>
                            <Grid className={Style.ColorContainer} item container direction="row" wrap="wrap">
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </Container>
        </Dialog>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        openCustomizeDialog: state.app.openCustomizeDialog,
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenCustomizeDialog: appActions.setOpenCustomizeDialog,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Customize);