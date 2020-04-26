import React, {useState} from 'react';

// Material UI Components
import { makeStyles, Grid, FormControl, TextField, Button} from '@material-ui/core';

// JSON Web Token
import jwt from 'jsonwebtoken';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    FormControl: {
        width: '100%'
    },
    Success: {
        '& fieldset': {
            borderColor: [[theme.palette.success.main], '!important'],
        }
    },
    Button: {
        margin: theme.spacing(2, 0, 1, 0),
        boxShadow: 'none',
        color: theme.palette.common.white,

        '&:hover': {
            boxShadow: 'none',

        }
    },
    Other: {
        background: 'transparent',
        textTransform: 'capitalize',
        fontSize: '12px',
        fontWeight: theme.typography.fontWeightRegular,

        '&:hover': {
            background: 'transparent',
        }
    },
    Primary: {
        marginLeft: theme.spacing(0.5),
        color: theme.palette.primary.main
    },
}));

export default function Signup( {users, handleClickDialog, handleUpdateState} ) {
    const Style = useStyles();

    // Input Fields State
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [usernameErrorText, setUsernameErrorText] = useState('Incorrect Input! Example: johnsmith');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);

    const colors = ['#E53935', '#1E88E5', '#7CB342', '#F4511E', '#D81B60', '#039BE5', '#C0CA33', '#6D4C41', '#8E24AA', '#00ACC1', '#FDD835', '#5E35B1', '#00897B', '#FFB300', '#3949AB', '#43A047', '#FB8C00'];

    /*
        This will handle the username validation
        It will check whether it only has letters & numbers
    */
    const handleUsernameValidation = () => {
        const validation = /^[a-zA-Z0-9]+$/
        
        if(username.match(validation)){
            setUsernameError(false);
        }else{
            setUsernameError(true);
        }
    }

    /*
        This will handle the password validation
        It will check whether it has at least 8 characters
    */
    const handlePasswordValidation = () => {
        if(password.length >= 8){
            setPasswordError(false);
        }else{
            setPasswordError(true);
        }
    }

    const handleSignup = (event) => {
        event.preventDefault();

        const currentUsers = [...users];
        let checkUserExists; 
        
        currentUsers.forEach(item => {
            if(item.username === username){
                setUsernameError(true)
                setUsernameErrorText("Incorrect Input! Username already exists")
                return checkUserExists = true;
            } else{
                return checkUserExists = false;
            }
        })

        if(checkUserExists === true){
            return
        }else {
            const newUsername = username.split('');
            const initial = newUsername[0].replace(/^\w/, letter => letter.toUpperCase());
            const token = jwt.sign({username: username, password: password}, 'secret');

            const newUser = {
                id: token,
                username: username,
                password: password,
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
                color: colors[Math.floor(Math.random() * colors.length)],
            }

            currentUsers.push(newUser);

            handleUpdateState(currentUsers, newUser);
            setTimeout(() => {
                handleClickDialog('correct');
            }, 500);
        }
    }

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <FormControl className={Style.FormControl}>
                    <TextField 
                        autoFocus
                        className={(usernameError === false) ? Style.Success : ""}
                        color="primary"
                        error={usernameError}
                        helperText={(usernameError === true) ? usernameErrorText : (usernameError === false) ? "Correct Input" : ""}
                        fullWidth
                        label="Username"
                        margin="dense"
                        onChange={(event) => setUsername(event.target.value)}
                        onBlur={() => handleUsernameValidation()}
                        placeholder="johnsmith"
                        type="text"
                        required
                        value={username}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl className={Style.FormControl}>
                    <TextField 
                        className={(passwordError === false) ? Style.Success : ""}
                        color="primary"
                        error={passwordError}
                        helperText={(passwordError === true) ? "Incorrect Input! Must be at least 8 characters" : (passwordError === false) ? "Correct Input" : ""}
                        fullWidth
                        label="Password"
                        margin="dense"
                        onChange={(event) => setPassword(event.target.value)}
                        onBlur={() => handlePasswordValidation()}
                        type="password"
                        required
                        value={password}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <Button 
                    className={Style.Button} 
                    color="primary" 
                    disabled={usernameError === false && passwordError === false ? false : true} 
                    disableRipple 
                    fullWidth 
                    size="large" 
                    variant="contained" 
                    onClick={(event) => handleSignup(event)}>Sign up</Button>
                <Button 
                    className={Style.Other}
                    color="default" 
                    disableRipple 
                    fullWidth 
                    size="large" 
                    variant="text" 
                    onClick={() => handleClickDialog('in')}>Already have an account? <span className={Style.Primary}>Click here</span></Button>
            </Grid>
        </Grid>
    )
}
