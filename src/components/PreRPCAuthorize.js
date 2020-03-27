import React, {Component} from 'react';
import { Grid, Button } from '@material-ui/core';

import powermovie from '../media/powermovie.jpg';

const { ipcRenderer } = require('electron')

class PreRPCAuthorize extends Component {

    requestAuth() {
        ipcRenderer.on('authenticate-promise', (event, arg) => {
            console.log(arg);
        })
        ipcRenderer.send('authenticate-request', 'test');
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                className="content"
                style={{padding: '10vh'}}
            >
                <Grid item xs>
                    <Grid container justify="space-evenly" direction="column" 
                                    alignItems="center">
                        <img src={powermovie} alt="파워무비 로고"/>
                        <h1>파워무비 추첨기</h1>
                    </Grid>
                </Grid>
                <Grid item xs justify="center">
                    <Button variant="contained" onClick={this.requestAuth}>디스코드 연동</Button>
                </Grid>
            </Grid>
        )
    }
}
export default PreRPCAuthorize;