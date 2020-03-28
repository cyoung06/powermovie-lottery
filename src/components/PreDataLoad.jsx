import React, {Component} from 'react';
import { Grid, Button } from '@material-ui/core';
import powermovie from '../media/powermovie.jpg';
import { Transition } from 'react-transition-group';

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

class PreDataLoad extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {fetching: false, data: undefined, showing: true}
    }

    loadData() {
        this.setState({fetching: true});
        fetch(`http://powermovieevent.p-e.kr:8080/messages`, {method: "GET", headers: {
            Authorization: "Bearer "+this.props.token
        }}).then(res => res.json()).then(json => {
            this.setState({fetching: false, data: json});
            setTimeout(() => {
                this.setState({showing: false});
                setTimeout(() => {
                    this.props.setData(json);
                }, 500);
            }, 1000);
        })
    }
    
    render() {
        const user = this.props.user;
        console.log(this.state.data);
        return (
            <Transition in={this.state.showing} timeout={500}>
                {state => (
                    <div style={{'transition': "opacity 500ms ease-in-out", 'opacity': '1', ...transitionStyles[state]}}>
                        <Grid   container
                                direction="column"
                                justify="space-around"
                                alignItems="center"
                                className="content"
                                style={{padding: '10vh'}}>
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
                            <Grid item xs justify="center">
                                <Button variant="contained" disabled={this.state.fetching} onClick={this.loadData}>데이터 로딩</Button><br/>
                                {this.state.fetching && (<span >데이터 로딩중</span>)}
                            </Grid>
                            <Grid item xs justify="center">
                                <Transition in={!this.state.fetching && this.state.data !== undefined} timeout={500}>
                                    {state => 
                                        (<span style={{'transition': "opacity 500ms ease-in-out", 'opacity': '0', ...transitionStyles[state]}}>{this.state.data !== undefined && this.state.data.size}명 로딩 완료!</span>)
                                    }
                                </Transition>
                            </Grid>
                        </Grid>
                    </div>
                )} 
            </Transition>
        )
    }
}

export default PreDataLoad;