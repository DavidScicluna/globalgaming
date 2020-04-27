import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as appActions from '../../actions/AppAction';

// Components
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

// Material UI Components
import { makeStyles, Dialog, Fade, DialogTitle, DialogContent} from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles(() => ({
    Dialog : {
        backdropFilter: 'blur(10px)',
    },
}));

const SignDialog = (props) => {
    const Style = useStyles();

    const [currentPage, setCurrentPage] = useState('in');

    // Animation State
    const [signInAnimation, setSignInAnimation] = useState(true);
    const [signUpAnimation, setSignUpAnimation] = useState(false);

    // This method will set the dialog content depending on the currentPage state or close the dialog
    const handleClickDialog = (type) => {
        switch(type){
            case 'in':
                setSignUpAnimation(false);

                setTimeout(() => {
                    setSignInAnimation(true);
                    setCurrentPage(type);
                }, 1000);
                return;
            case 'up':
                setSignInAnimation(false);

                setTimeout(() => {
                    setSignUpAnimation(true);
                    setCurrentPage(type);
                }, 1000);
                return;
            case 'correct':
                props.setOpenSignDialog(false);
                setSignInAnimation(true);
                setSignUpAnimation(true);

                window.location.reload();
                setTimeout(() => {
                    setCurrentPage('in');
                }, 1000);
                return;
            default:
                return;
        }
    }

    // This method will update the users & user state and local storage
    const handleUpdateState = (users, user) => {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(user));

        props.setUsers(users);
        props.setUser(user);
    }

    return (
        <Dialog
            className={Style.Dialog}
            aria-labelledby='SignTitle'
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            maxWidth='xs'
            open={props.openSignDialog}
            TransitionComponent={Fade}
            transitionDuration={1000}

        >
            <DialogTitle id='SignTitle'>
                {
                    currentPage === 'in'
                        ? <span className={signInAnimation === true ? 'animated fadeInSign' : 'animated fadeOutSign'}>Sign in</span>
                            : <span className={signUpAnimation === true ? 'animated fadeInSign' : 'animated fadeOutSign'}>Sign up</span>
                }
            </DialogTitle>
            <DialogContent>
                {
                    currentPage === 'in'
                        ? <div className={signInAnimation === true ? 'animated fadeInSign' : 'animated fadeOutSign'}><Signin users={props.users} handleClickDialog={handleClickDialog} handleUpdateState={handleUpdateState} /></div>
                            : <div className={signUpAnimation === true ? 'animated fadeInSign' : 'animated fadeOutSign'}><Signup users={props.users} handleClickDialog={handleClickDialog} handleUpdateState={handleUpdateState} /></div>
                }
            </DialogContent>
        </Dialog>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        openSignDialog: state.app.openSignDialog,
        users: state.app.users
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenSignDialog: appActions.setOpenSignDialog,
        setUsers: appActions.setUsers,
        setUser: appActions.setUser
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignDialog);