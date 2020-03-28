import React, {Component} from 'react';
import { Grid, Button } from '@material-ui/core';

import powermovie from '../media/powermovie.jpg';

class PreRPCAuthorize extends Component {

    constructor(props) {
        super(props);
        this.requestAuth = this.requestAuth.bind(this);
        this.state = {auth: false, error: undefined};
    }

    componentDidMount() {
        window.ipcRenderer.on('authenticate-promise', (event, arg) => {
            fetch('https://discordapp.com/api/users/@me', {method: "GET", headers: {
                Authorization: "Bearer "+arg
            }}).then(res => res.json()).then(json => {
                this.props.setUser(json);
            }).catch(err => {
                this.setState({error: err.toString(), auth: false});
            })
        })
    }
    requestAuth() {
        this.setState({auth: true});
        window.ipcRenderer.send('authenticate-request', 'test');
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
                    <Button variant="contained" disabled={this.state.auth} onClick={this.requestAuth}>디스코드 연동</Button>
                </Grid>
            </Grid>
        )
    }
}
export default PreRPCAuthorize;