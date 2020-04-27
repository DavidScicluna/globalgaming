import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Material UI Components
import { makeStyles, Dialog, Fade, DialogTitle, Grid, Button, Box, Typography, Avatar, FormControl, Input, Hidden, ButtonGroup} from '@material-ui/core';

// Icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckIcon from '@material-ui/icons/Check';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    DialogTitle: {
        padding: theme.spacing(2),
    },
    Button : {
        color: theme.palette.text.secondary,
        transition: '0.4s ease-in-out',
        background: theme.palette.action.hover,
        '&:hover': {
            background: theme.palette.action.focus,
            color: theme.palette.text.primary
        }
    },
    ButtonContent: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: 'normal'
    },
    Header: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(2),
    },
    Avatar: {
        width: '125px',
        height: '125px',
        fontSize: '120px',
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(2),
    },
    Input: {
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.text.hint}`,
        color: theme.palette.text.primary,
        padding: theme.spacing(1, 2),
        transition: '0.4s ease-in-out',
        '&:hover': {
            border: `2px solid ${theme.palette.text.primary}`,
        },
        '&::before': {
            border: [['none'], '!important'],
        },
        '&::after': {
            border: [['none'], '!important'],
        }
    },
    InputActive: {
        border: `2px solid ${theme.palette.primary.main}`,
    },
    InputError: {
        border: `2px solid ${theme.palette.error.main}`,
    },
    InputSuccess: {
        border: `2px solid ${theme.palette.success.main}`,
    },
    ColorAvatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: theme.spacing(1, 0),
    },
    ColorAvatar: {
        cursor: 'pointer',
        width: '50px',
        height: '50px',
        '& svg':{
            fontSize: theme.typography.h4.fontSize,
        }
    },
    MarginBottom: {
        margin: theme.spacing(2, 0),
    },
    ButtonGroup: {
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        }
    },
    Buttons: {
        transition: '0.4s ease-in-out',
        margin: theme.spacing(0, 2),
        border: [['none'], '!important'],
        borderRadius: [[theme.shape.borderRadius], '!important'],
        '&:hover': {
            filter: 'brightness(95%)',
        }
    },
    CancelButton: {
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        }
    },
    SaveButton: {
        color: theme.palette.common.white,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        }
    },
    '@media (max-width: 425px)': {
        DialogTitle: {
            padding: theme.spacing(1, 1, 0, 1),
        },
        Header: {
            fontSize: theme.typography.h6.fontSize
        },
        Avatar: {
            width: '100px',
            height: '100px',
            fontSize: theme.typography.h1.fontSize,
            marginBottom: theme.spacing(1),
        },
        MarginBottom: {
            margin: theme.spacing(1, 0),
        },
        Buttons: {
            margin: theme.spacing(0, 1),
        },
    },
}));

const AccountSettings = (props) => {
    const Style = useStyles();

    // Avatar Input State
    const [initialsValue, setInitialsValue] = useState(props.user.initials === undefined ? 'J' : props.user.initials);  

    // Username Input State
    const [usernameFocused, setUsernameFocused] = useState(false); 
    const [usernameValue, setUsernameValue] = useState(props.user.username === undefined ? 'JohnSmith' : props.user.username);  
    const [usernameError, setUsernameError] = useState(null);  

    // Password Input State
    const [passwordFocused, setPasswordFocused] = useState(false); 
    const [passwordValue, setPasswordValue] = useState(props.user.password === undefined ? 'JohnSmith' : props.user.password);  
    const [passwordError, setPasswordError] = useState(null);  
    
    // Color State
    const [currentColor, setCurrentColor] = useState(props.user.color);
    const colors = [
        {
            id: Math.random(),
            title: 'Pink',
            color: '#EC407A'
        },
        {
            id: Math.random(),
            title: 'Purple',
            color: '#AB47BC'
        },
        {
            id: Math.random(),
            title: 'Indigo',
            color: '#5C6BC0'
        },
        {
            id: Math.random(),
            title: 'Blue',
            color: '#42A5F5'
        },
        {
            id: Math.random(),
            title: 'Teal',
            color: '#26A69A'
        },
        {
            id: Math.random(),
            title: 'Amber',
            color: '#FFCA28'
        },
        {
            id: Math.random(),
            title: 'Orange',
            color: '#FFA726'
        },
        {
            id: Math.random(),
            title: 'Deep Orange',
            color: '#FF7043'
        },
    ]

    // This method will close the Customize component
    const handleClickCloseCustomizeDialog = () => {
        props.setOpenCustomizeDialog(false);
    };

    // Username Input Methods 
    // This method will save whatever the user types in the text field
    const handleUsernameChange = (event) => {
        event.preventDefault();
        setUsernameValue(event.target.value);
    }

    // This method will validate the username text field and if correct will set the initals
    const handleUsernameValidation = () => {
        const validation = /^[a-zA-Z0-9]+$/

        setUsernameFocused(false)
    
        if(usernameValue.match(validation)){
            setUsernameError(false);

            const newUsername = usernameValue.split('');
            const initial = newUsername[0].replace(/^\w/, letter => letter.toUpperCase());

            setInitialsValue(initial);
        }else{
            setUsernameError(true);
            return;
        }
    }

    // Password Input Methods 
    // This method will save whatever the user types in the text field
    const handlePasswordChange = (event) => {
        event.preventDefault();
        setPasswordValue(event.target.value);
    }

    // This method will validate the password text field
    const handlePasswordValidation = () => {
        setPasswordFocused(false)
        
        if(passwordValue.length >= 8){
            setPasswordError(false);
        }else{
            setPasswordError(true);
        }
    }

    // This method will update the user profile to the customization specifications
    const handleSaveCustomization = () => {
        const updatedUser = {
            ...props.user,
            username: usernameValue,
            password: passwordValue,
            initials: initialsValue,
            likes: {
                movie: [...props.user.likes.movie],
                tv: [...props.user.likes.tv],
            },
            watchlist: {
                movie: [...props.user.watchlist.movie],
                tv: [...props.user.watchlist.tv],
            },
            color: currentColor
        }

        const updatedUsers = props.users.map(item => {
            let newitem = {};

            if(item.id === updatedUser.id){
                newitem = updatedUser 
            }else{
                return item;
            }

            return newitem === {} ? item : newitem
        })

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('user', JSON.stringify(updatedUser));

        props.setUsers(updatedUsers);
        props.setUser(updatedUser);

        handleClickCloseCustomizeDialog();

        window.location.reload();
    } 

    return (
        <Dialog
            className={Style.Dialog}
            fullWidth
            maxWidth='sm'
            onClose={handleClickCloseCustomizeDialog}
            open={props.openCustomizeDialog}
            TransitionComponent={Fade}
            transitionDuration={1000}
        >
            <DialogTitle className={Style.DialogTitle}>
                <Grid item container direction='column' alignItems='flex-start'>
                    <Button className={Style.Button} disableRipple onClick={handleClickCloseCustomizeDialog}>
                        <div className={Style.ButtonContent}>
                            <CloseRoundedIcon />
                            <span>Close</span>
                        </div>
                    </Button>
                </Grid>
            </DialogTitle> 
            <Grid container direction='column'>
                <Box p={2}>
                    <Grid item>
                        <Typography className={Style.Header} variant='h4' color='textPrimary'>
                            Customize
                        </Typography>
                    </Grid>
                    <Grid item container direction='row' alignItems='center' justify='center'>
                        <Avatar
                            alt={props.user.username}
                            className={Style.Avatar}
                            style={{backgroundColor: currentColor}}
                            variant='rounded'
                        >
                            {initialsValue}
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>
                            Change Username
                        </Typography>
                        <Box my={1} />
                        <FormControl style={{width: '100%'}}>
                            <Input
                                aria-label='Change Username'
                                color='primary'
                                className={usernameFocused === true ? `${Style.Input} ${Style.InputActive}` : usernameError === true ? `${Style.Input} ${Style.InputError}` : usernameError === false ? `${Style.Input} ${Style.InputSuccess}` : Style.Input}
                                error={usernameError}
                                fullWidth
                                onChange={(event) => handleUsernameChange(event)}
                                onKeyPress={() => handleUsernameValidation()}
                                onMouseDown={() => setUsernameFocused(true)}
                                onBlur={() => handleUsernameValidation()}
                                placeholder={props.user.username}
                                type='text'
                                variant='outlined'
                                value={usernameValue}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6'>
                            Change Password
                        </Typography>
                        <Box my={1} />
                        <FormControl style={{width: '100%'}}>
                            <Input
                                aria-label='Change Password'
                                color='primary'
                                className={passwordFocused === true ? `${Style.Input} ${Style.InputActive}` : passwordError === true ? `${Style.Input} ${Style.InputError}` : passwordError === false ? `${Style.Input} ${Style.InputSuccess}` : Style.Input}
                                error={passwordError}
                                fullWidth
                                onChange={(event) => handlePasswordChange(event)}
                                onMouseDown={() => setPasswordFocused(true)}
                                onBlur={() => handlePasswordValidation()}
                                type='password'
                                variant='outlined'
                                value={passwordValue}
                            />
                        </FormControl>
                    </Grid>
                    <Box className={Style.MarginBottom} />
                    <Grid item>
                        <Typography variant='h6'>
                            Change Color
                        </Typography>
                        <Box my={1} />
                        <Grid item container direction='row' wrap='wrap'>
                            {
                                colors.map(item => {
                                    return(
                                        <Grid className={Style.ColorAvatarContainer} key={item.id} item xs={3}>
                                            <Avatar className={Style.ColorAvatar} style={{backgroundColor: item.color}} onClick={() => setCurrentColor(item.color)}>
                                                <CheckIcon style={{color: (item.color === currentColor) ? 'white' : item.color}} />
                                            </Avatar>
                                            <Hidden smUp>
                                                <Typography variant='caption'>{item.title}</Typography>
                                            </Hidden>
                                            <Hidden xsDown>
                                                <Typography variant='button'>{item.title}</Typography>
                                            </Hidden>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Grid>
                    <Box className={Style.MarginBottom} />
                    <Grid item>
                        <ButtonGroup className={Style.ButtonGroup} disableRipple fullWidth variant='contained'>
                            <Button className={`${Style.Buttons} ${Style.CancelButton}`} onClick={handleClickCloseCustomizeDialog}>Cancel</Button>
                            <Button className={`${Style.Buttons} ${Style.SaveButton}`} style={{backgroundColor: currentColor}} onClick={() => handleSaveCustomization()} disabled={usernameError === true || passwordError === true ? true : false}>Save</Button>
                        </ButtonGroup>
                    </Grid>
                </Box>
            </Grid>
        </Dialog>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        openCustomizeDialog: state.app.openCustomizeDialog,
        users: state.app.users,
        user: state.app.user,
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenCustomizeDialog: appActions.setOpenCustomizeDialog,
        setUsers: appActions.setUsers,
        setUser: appActions.setUser,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AccountSettings);