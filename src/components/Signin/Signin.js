import React, {useState} from 'react';

// Material UI Components
import { makeStyles, Grid, Typography, Toolbar, Hidden, Tooltip, Avatar, FormControl, TextField, Box, Button, Popper, Paper} from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    FormControl: {
        width: '100%'
    },
    AccountsToolbar: {
        flexWrap: 'wrap',
    },
    Avatar: {
        cursor: 'pointer',
        width: '70px',
        height: '70px',
        fontSize: '54px',
        color: theme.palette.common.white,
        margin: theme.spacing(1, 1, 0, 0),
    },
    AvatarSmall: {
        cursor: 'pointer',
        width: '45px',
        height: '45px',
        fontSize: '24px',
        color: theme.palette.common.white,
        margin: theme.spacing(1, 1, 0, 0),
    },
    Success: {
        '& fieldset': {
            borderColor: [[theme.palette.success.main], '!important'],
        }
    },
    Correct: {
        color: theme.palette.success.main,
        opacity: 1
    },
    Error: {
        color: theme.palette.error.main,
        opacity: 1
    },
    Hidden: {
        opacity: 0
    },
    Button: {
        margin: theme.spacing(1, 0),
        boxShadow: 'none',
        color: theme.palette.common.white,

        '&:hover': {
            boxShadow: 'none',

        }
    },
    Or: {
        textAlign: 'center'
    },
    Popover: {
        zIndex: [[10000], '!important']
    },
    Paper: {
        background: theme.palette.warning.main,
        margin: theme.spacing(2, 6),
        padding: theme.spacing(2),
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

export default function Signin( {users, handleClickDialog, handleUpdateState} ) {
    const Style = useStyles();

    // Input Fields State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    // Popper State
    const [anchorEl, setAnchorEl] = React.useState(null);
    const guestPopperOpen = Boolean(anchorEl);

    // const handleUpdateTextFields = (user) => {
    //     setUsername(user.username);
    // }

    const handleClickSignin = (event, type) => {
        event.preventDefault();

        console.log(type)

        if(type === 'user'){
            const currentUsers = [...users];
            let userCorrect = false;

            currentUsers.forEach(item => {
                if(username === item.username && password === item.password){
                    setError(false);
                    userCorrect = true;
                    handleUpdateState(currentUsers, item);
                    setTimeout(() => {
                        handleClickDialog('correct');
                    }, 1000);
                }else if(userCorrect === false){
                    setError(true);
                }
            });
        }else{

        }
    }

    // This method will open the popper
    const handleGuestPopperOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    // This method will close the popper
    const handleGuestPopperClose = () => {
        setAnchorEl(null);
    }

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>

            </Grid>
            <Grid item>
                <FormControl className={Style.FormControl}>
                    <TextField 
                        autoFocus
                        className={(error === false) ? Style.Success : ""}
                        color="primary"
                        error={error}
                        fullWidth
                        label="Username"
                        margin="dense"
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="johnsmith"
                        type="text"
                        value={username}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl className={Style.FormControl}>
                    <TextField 
                        className={(error === false) ? Style.Success : ""}
                        color="primary"
                        error={error}
                        fullWidth
                        label="Password"
                        margin="dense"
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        value={password}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item>
                <Box mt={2}>
                    <Typography align="center" className={error === true ? Style.Error : error === false ? Style.Correct : Style.Hidden}>{error === true ? 'Sign in credentials are incorrect!' : error === false ? 'Sign in credentials are correct!' : ''}</Typography>
                    <Button 
                        className={Style.Button} 
                        color="primary"
                        disableRipple 
                        fullWidth 
                        size="large" 
                        variant="contained" 
                        onClick={(event) => handleClickSignin(event, 'user')}>Sign in</Button>
                    <div className={Style.Or}><Typography variant="button">or</Typography></div>
                    <Button 
                        aria-owns={guestPopperOpen ? 'guestPopper' : undefined}
                        aria-haspopup="true"
                        className={Style.Button} 
                        color="secondary"
                        disableRipple 
                        fullWidth 
                        size="large" 
                        variant="contained" 
                        onClick={(event) => handleClickSignin(event, 'guest')}
                        onMouseEnter={(event) => handleGuestPopperOpen(event)}
                        onMouseLeave={handleGuestPopperClose}
                        >Sign in as guest</Button>
                    <Popper
                        id="guestPopper"
                        className={Style.Popover}
                        anchorEl={anchorEl}
                        placement="bottom"
                        disablePortal={false}
                        open={guestPopperOpen}
                        onClose={handleGuestPopperClose}
                    >
                        <Paper className={Style.Paper} elevation={2}>
                            <Typography variant="button">Guest will not be able to like movies or add movies to watchlist</Typography>
                        </Paper>
                    </Popper>
                    <Button 
                        className={Style.Other}
                        color="default" 
                        disableRipple 
                        fullWidth 
                        size="large" 
                        variant="text" 
                        onClick={() => handleClickDialog('up')}>Don't have an account? <span className={Style.Primary}>Click here</span></Button>
                </Box>
            </Grid>
        </Grid>
    )
}
