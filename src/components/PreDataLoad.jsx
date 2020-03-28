import React, {Component} from 'react';
import { Grid, Button } from '@material-ui/core';
import powermovie from '../media/powermovie.jpg';

class PreDataLoad extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {fetching: false}
    }

    loadData() {
        
    }
    
    render() {
        const user = this.props.user;
        console.log(user);
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
                    <Grid container direction="row" justify="center"
                                        alignItems="center"  spacing={2}>
                        <Grid xs container justify="space-evenly" direction="column" 
                                        alignItems="center">
                            <img src={powermovie} width="100px" height="100px" alt="파워무비 로고"/>
                            <h5>파워무비 추첨기</h5>
                        </Grid>
                        <Grid xs container justify="space-evenly" direction="column" 
                                        alignItems="center">
                            <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`} width="100px" height="100px" alt="유저"/>
                            <h5>{user.username}</h5>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs justify="center" direction="column">
                    <Button variant="contained" disabled={this.state.fetching} onClick={this.loadData}>데이터 로딩</Button>
                    {this.state.fetching && (<span >데이터 로딩중</span>)}
                </Grid>
                <Grid item xs justify="center" direction="column">

                </Grid>
            </Grid>
        )
    }
}

export default PreDataLoad;