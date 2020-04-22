import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Actions
// import * as actions from '../../actions/SignDialog';

// Components

// Material UI Components
import { makeStyles, Paper, Toolbar, Box, Fade, } from '@material-ui/core';

// Material UI Custom Component Style
const useStyles = makeStyles((theme) => ({
    Dialog : {
        backdropFilter: 'blur(10px)',
    },
}));
export default function Header() {
    return (
        <Paper variant="outlined">
            <Toolbar>
                <Box style={{flex: 1}} />
            </Toolbar>            
        </Paper>
    )
}
