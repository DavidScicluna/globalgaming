import React, {useState} from 'react';

// Material UI Components
import { makeStyles, Grid, Typography, Tooltip, Avatar, Box, FormControl, Input, ButtonGroup, Button} from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Header: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(0.25),
    },
    Avatar: {
        cursor: 'pointer',
        width: '100px',
        height: '100px',
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(4),
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
    TextSuccess: {
        transition: '0.4s ease-in-out',
        color: theme.palette.success.main,
        margin: theme.spacing(1, 0),
        opacity: 1 
    },
    TextError: {
        transition: '0.4s ease-in-out',
        color: theme.palette.error.main,
        margin: theme.spacing(1, 0),
        opacity: 1 
    },
    TextHidden: {
        transition: '0.4s ease-in-out',
        opacity: 0
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
    GuestButton: {
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        }
    },
    SigninButton: {
        color: theme.palette.common.white,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        }
    },
    OtherButton: {
        background: 'transparent',
        textTransform: 'capitalize',
        fontSize: '14px',
        fontWeight: theme.typography.fontWeightRegular,
        marginTop: theme.spacing(1),

        '&:hover': {
            background: 'transparent',
        }
    },
    Primary: {
        marginLeft: theme.spacing(0.5),
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.primary.main
    },
    '@media (max-width: 425px)': {
        Header: {
            fontSize: theme.typography.body1.fontSize
        },
        Avatar: {
            width: '65px',
            height: '65px',
            fontSize: theme.typography.h2.fontSize,
            marginBottom: theme.spacing(1),
        },
        Buttons: {
            margin: theme.spacing(0, 1),
        },
        GuestButton: {
            fontSize: '13px',
        },
        OtherButton: {
            fontSize: '12px',
        },
    },
}));

export default function Signin( {users, handleClickDialog, handleUpdateState} ) {
    const Style = useStyles();

    // Username Input State
    const [usernameFocused, setUsernameFocused] = useState(false); 
    const [usernameValue, setUsernameValue] = useState('');  
    
    // Password Input State
    const [passwordFocused, setPasswordFocused] = useState(false); 
    const [passwordValue, setPasswordValue] = useState('');  

    const [error, setError] = useState(null);  
    
    // Username Input Methods 
    // This method will save whatever the user types in the text field
    const handleUsernameChange = (event) => {
        event.preventDefault();
        setUsernameValue(event.target.value);
    }

    // This method will set the username to the clicked avatar
    const handleClickSetUsername = (text) => {
        setUsernameValue(text);
    }

    // Password Input Methods 
    // This method will save whatever the user types in the text field
    const handlePasswordChange = (event) => {
        event.preventDefault();
        setPasswordValue(event.target.value);
    }

    // This method will check whether there is a user registered with the given input text
    const handleClickSignin = (event, type) => {
        event.preventDefault();

        const currentUsers = [...users];

        if(type === 'user'){
            if(currentUsers.length === 0){
                setError(true);
            }else{
                currentUsers.forEach(item => {
                    if(usernameValue === item.username && passwordValue === item.password){
                        setError(false);
                        handleUpdateState(currentUsers, item);
                        setTimeout(() => {
                            handleClickDialog('correct');
                        }, 500);
                    }else{
                        setError(true);
                    }
                });
            }
        }else{
            const newUser = {
                id: Math.random(),
                username: 'Guest',
                password: '',
                access: 'guest',
                initials: 'G',
                likes: {
                    movie: [],
                    tv: [],
                },
                watchlist: {
                    movie: [],
                    tv: [],
                },
                color: '#757575',
            }

            handleUpdateState(currentUsers, newUser);
            setTimeout(() => {
                handleClickDialog('correct');
            }, 500);
        }
    }

    // This method will open the popper
    // const handleGuestPopperOpen = (event) => {
    //     setAnchorEl(event.currentTarget);
    // }

    // This method will close the popper
    // const handleGuestPopperClose = () => {
    //     setAnchorEl(null);
    // }

    return (
        <Grid container direction='column'>
            {
                (users.length === 0)
                    ? null
                        : 
                        <React.Fragment>
                            <Grid item>
                                <Typography className={Style.Header} variant='h6' color='textPrimary'>
                                    Accounts
                                </Typography>
                            </Grid>
                            <Grid item container direction='row' alignItems='center' justify='flex-start'>
                                {
                                    users.map((item) => {
                                        return(
                                            <Grid key={item.id} item xs={'auto'}>
                                                <Tooltip placement='bottom' title={item.username}>
                                                    <Avatar
                                                        alt={item.username}
                                                        className={Style.Avatar}
                                                        style={{backgroundColor: item.color}}
                                                        variant='rounded'
                                                        onClick={() => handleClickSetUsername(item.username)}
                                                    >
                                                        {item.initials}
                                                    </Avatar>
                                                </Tooltip>
                                            </Grid>
                                        );
                                    })
                                }
                            </Grid>
                        </React.Fragment>
            }
            <Grid item>
                <Typography variant='body1'>
                    Username
                </Typography>
                <Box my={0.25} />
                <FormControl style={{width: '100%'}}>
                    <Input
                        aria-label='Change Username'
                        color='secondary'
                        className={usernameFocused === true ? `${Style.Input} ${Style.InputActive}` : error === true ? `${Style.Input} ${Style.InputError}` : error === false ? `${Style.Input} ${Style.InputSuccess}` : Style.Input}
                        error={error}
                        fullWidth
                        onChange={(event) => handleUsernameChange(event)}
                        onBlur={() => setUsernameFocused(false)}
                        placeholder='JohnSmith'
                        type='text'
                        variant='outlined'
                        value={usernameValue}
                    />
                </FormControl>
            </Grid>
            <Box my={0.5} />
            <Grid item>
                <Typography variant='body1'>
                    Password
                </Typography>
                <Box my={0.25} />
                <FormControl style={{width: '100%'}}>
                    <Input
                        aria-label='Change Password'
                        color='secondary'
                        className={passwordFocused === true ? `${Style.Input} ${Style.InputActive}` : error === true ? `${Style.Input} ${Style.InputError}` : error === false ? `${Style.Input} ${Style.InputSuccess}` : Style.Input}
                        error={error}
                        fullWidth
                        onChange={(event) => handlePasswordChange(event)}
                        onBlur={() => setPasswordFocused(false)}
                        type='password'
                        variant='outlined'
                        value={passwordValue}
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <Typography align='center' className={error === true ? Style.TextError : error === false ? Style.TextSuccess : Style.TextHidden}>{error === true ? 'Sign in credentials are incorrect!' : error === false ? 'Sign in credentials are correct!' : 'Hidden'}</Typography>
            </Grid>
            <Grid item>
                <ButtonGroup className={Style.ButtonGroup} disableRipple fullWidth size='large' variant='contained'>
                    <Button className={`${Style.Buttons} ${Style.GuestButton}`} onClick={(event) => handleClickSignin(event, 'guest')}>As Guest</Button>
                    <Button color='secondary' className={`${Style.Buttons} ${Style.SigninButton}`} onClick={(event) => handleClickSignin(event, 'user')}>Sign in</Button>
                </ButtonGroup>
                <Box mt={0.5} />
                <Button 
                    className={Style.OtherButton}
                    color='default' 
                    disableRipple 
                    fullWidth 
                    size='large' 
                    variant='text' 
                    onClick={() => handleClickDialog('up')}>Don't have an account? <span className={Style.Primary}>Click here</span>
                </Button>
            </Grid>
        </Grid>
    )
}
