import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as actions from '../../actions/SignDialog';

// Components
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

// Material UI Components
import { makeStyles, Dialog, DialogTitle, DialogContent, Fade} from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Dialog : {
        backdropFilter: 'blur(10px)',
    },
}));

const SignDialog = ( {openSignDialog, users, setOpenSignDialog, setUsers, setUser} ) => {
    const Style = useStyles();


    const [currentPage, setCurrentPage] = useState('in');

    const [signInAnimation, setSignInAnimation] = useState(true);
    const [signUpAnimation, setSignUpAnimation] = useState(false);

    // This method will set the dialog content depending on the currentPage state or close the dialog
    const handleClickDialog = (type) => {
        switch(type){
            case "in":
                setSignUpAnimation(false);

                setTimeout(() => {
                    setSignInAnimation(true);
                    setCurrentPage(type);
                }, 1000);
                return;
            case "up":
                setSignInAnimation(false);

                setTimeout(() => {
                    setSignUpAnimation(true);
                    setCurrentPage(type);
                }, 1000);
                return;
            case 'correct':
                setOpenSignDialog(false);
                setSignInAnimation(true);
                setSignUpAnimation(true);

                setTimeout(() => {
                    setCurrentPage('in');
                }, 1000);
                return;
            default:
                return;
        }
    }

    const handleUpdateState = (users, user) => {
        // Setting users and user in local storage
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(user));

        setUsers(users);
        setUser(user);
    }

    return (
        <Dialog
            className={Style.Dialog}
            aria-labelledby="SignTitle"
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            maxWidth="xs"
            open={openSignDialog}
            TransitionComponent={Fade}
            transitionDuration={1000}

        >
            <DialogTitle id="SignTitle">
                {
                    currentPage === "in"
                        ? <span className={signInAnimation === true ? 'animated fadeIn' : 'animated fadeOut'}>Sign in</span>
                            : <span className={signUpAnimation === true ? 'animated fadeIn' : 'animated fadeOut'}>Sign up</span>
                }
            </DialogTitle>
            <DialogContent>
                {
                    currentPage === "in"
                        ? <div className={signInAnimation === true ? 'animated fadeIn' : 'animated fadeOut'}><Signin users={users} handleClickDialog={handleClickDialog} handleUpdateState={handleUpdateState} /></div>
                            : <div className={signUpAnimation === true ? 'animated fadeIn' : 'animated fadeOut'}><Signup users={users} handleClickDialog={handleClickDialog} handleUpdateState={handleUpdateState} /></div>
                }
            </DialogContent>
        </Dialog>
    )
}

// Fetching state from store
const mapStateToProps = (state) => {
    return{
        openSignDialog: state.data.openSignDialog,
        users: state.data.users
    };
};

// Sending some data to an action
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setOpenSignDialog: actions.setOpenSignDialog,
        setUsers: actions.setUsers,
        setUser: actions.setUser
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignDialog);