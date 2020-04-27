import React, {useState} from 'react';

// Material UI Components
import { makeStyles, Grid, Typography, Box, FormControl, Input, ButtonGroup, Button} from '@material-ui/core';

// JSON Web Token
import jwt from 'jsonwebtoken';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
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
    CancelButton: {
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        }
    },
    SignupButton: {
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
        Buttons: {
            margin: theme.spacing(0, 1),
        },
        CancelButton: {
            fontSize: '13px',
        },
        OtherButton: {
            fontSize: '12px',
        },
    },
}));

export default function Signup( {users, handleClickDialog, handleUpdateState} ) {
    const Style = useStyles();

    // Username Input State
    const [usernameFocused, setUsernameFocused] = useState(false); 
    const [usernameValue, setUsernameValue] = useState('');  
    const [usernameError, setUsernameError] = useState(null);
    const [usernameExistError, setUsernameExistError] = useState(false);
    const [usernameErrorText, setUsernameErrorText] = useState('Incorrect Input! Example: johnsmith');
    
    // Password Input State
    const [passwordFocused, setPasswordFocused] = useState(false); 
    const [passwordValue, setPasswordValue] = useState('');  
    const [passwordError, setPasswordError] = useState(null);

    
    // Username Input Methods 
    // This method will save whatever the user types in the text field
    const handleUsernameChange = (event) => {
        event.preventDefault();
        setUsernameValue(event.target.value);
    }

    // This method will validate the username text field and if correct will set the initals
    const handleUsernameValidation = () => {
        const validation = /^[a-zA-Z0-9]+$/

        if(usernameExistError === true){
            setUsernameValue('');
            setUsernameExistError(false);
        }

        setUsernameFocused(false)
    
        if(usernameValue.match(validation)){
            const currentUsers = [...users];
            let checkUserExists; 

            currentUsers.forEach(item => {
                if(item.username === usernameValue){
                    setUsernameError(true)
                    setUsernameErrorText('Incorrect Input! Username already exists')
                    return checkUserExists = true;
                } else{
                    return checkUserExists = false;
                }
            })

            if(checkUserExists === true){
                setUsernameError(true);
                setUsernameExistError(true);
                return
            }else {
                setUsernameExistError(false);
                setUsernameError(false);
            }
        }else{
            setUsernameError(true);
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

    // Colors State
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

    const handleSignup = (event) => {
        event.preventDefault();

        const currentUsers = [...users];        

        const newUsername = usernameValue.split('');
        const initial = newUsername[0].replace(/^\w/, letter => letter.toUpperCase());
        const token = jwt.sign({username: usernameValue, password: passwordValue}, 'secret');

        const newUser = {
            id: token,
            username: usernameValue,
            password: passwordValue,
            access: 'user',
            initials: initial,
            likes: {
                movie: [],
                tv: [],
            },
            watchlist: {
                movie: [],
                tv: [],
            },
            color: colors[Math.floor(Math.random() * colors.length)].color,
        }

        currentUsers.push(newUser);

        handleUpdateState(currentUsers, newUser);
        setTimeout(() => {
            handleClickDialog('correct');
        }, 500);
    }

    return (
        <Grid container direction='column'>
            <Grid item>
                <Typography variant='body1'>
                    Username
                </Typography>
                <Box my={0.25} />
                <FormControl style={{width: '100%'}}>
                    <Input
                        aria-label='Change Username'
                        color='secondary'
                        className={usernameFocused === true ? `${Style.Input} ${Style.InputActive}` : usernameError === true ? `${Style.Input} ${Style.InputError}` : usernameError === false ? `${Style.Input} ${Style.InputSuccess}` : Style.Input}
                        error={usernameError}
                        
                        fullWidth
                        onChange={(event) => handleUsernameChange(event)}
                        onKeyPress={() => handleUsernameValidation()}
                        onMouseDown={() => setUsernameFocused(true)}
                        onBlur={() => handleUsernameValidation()}
                        placeholder='JohnSmith'
                        type='text'
                        variant='outlined'
                        value={usernameExistError === true ? usernameErrorText : usernameValue}
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
            <Grid item>
                <Typography align='center' className={usernameError === true || passwordError === true ? Style.TextError : usernameError === false || passwordError === false ? Style.TextSuccess : Style.TextHidden}>{usernameError === true || passwordError === true ? 'Sign in credentials are incorrect!' : usernameError === false || passwordError === false ? 'Sign in credentials are correct!' : 'Hidden'}</Typography>
            </Grid>
            <Grid item>
                <ButtonGroup className={Style.ButtonGroup} disableRipple fullWidth size='large' variant='contained'>
                    <Button className={`${Style.Buttons} ${Style.CancelButton}`} onClick={() => handleClickDialog('in')}>Cancel</Button>
                    <Button color='secondary' className={`${Style.Buttons} ${Style.SignupButton}`} onClick={(event) => handleSignup(event)} disabled={(usernameError === true || usernameError === null) && (passwordError === true || passwordError === null) ? true : false}>Sign in</Button>
                </ButtonGroup>
                <Box mt={0.5} />
                <Button 
                    className={Style.OtherButton}
                    color='default' 
                    disableRipple 
                    fullWidth 
                    size='large' 
                    variant='text' 
                    onClick={() => handleClickDialog('in')}>Don't have an account? <span className={Style.Primary}>Click here</span>
                </Button>
            </Grid>
        </Grid>
    )
}
