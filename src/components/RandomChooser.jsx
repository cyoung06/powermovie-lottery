import React, {Component} from 'react';
import { AppBar, Toolbar, Typography, TextField, Grid, FormControlLabel, Checkbox, RadioGroup, Radio, FormLabel, FormControl, Button } from '@material-ui/core';

import powermovie from './../media/powermovie.jpg';

class RandomChooser extends Component {

    constructor(props) {
        super(props);
        this.random = this.random.bind(this);
        this.notify_discord = this.notify_discord.bind(this);
        this.list = [...Object.values(this.props.data.data), {user_id: props.user.id, user_nickname: props.user.username, user_tag: props.user.username + "#" + props.user.discriminator, msgs: [{id: -1, content: "파워무비 2주년 축하합니다~^^"}]}];
        this.theIndex = this.list.length-1;
        this.state = {product: '', notify_discord: false, jujak: 'none', chosen: undefined, chosenIndex: 0, randomizing: false}
    }
    
    random() {
        let chosenIndex;
        let chosen;
        if (this.state.jujak === "me") {
            chosenIndex = this.list.length - 1;
            chosen = this.list[chosenIndex];
            this.setState({randomizing: true, chosen: undefined});
            setTimeout(() => this.setState({chosenIndex: Math.floor(3 * (chosenIndex+1)/4)}), 500);
            setTimeout(() => this.setState({chosenIndex: Math.floor(3 * (chosenIndex+1)/8)}), 1500);
            setTimeout(() => this.setState({chosenIndex: chosenIndex+1}), 2500);
            setTimeout(() => this.setState({randomizing: false, chosen: chosen}), 4500);
        } else if (this.state.jujak==="yiyee") {
            chosenIndex = this.list.length - 2;
            chosen = this.list[chosenIndex];
            this.setState({randomizing: true, chosen: undefined});
            setTimeout(() => this.setState({chosenIndex: Math.floor(3 * (chosenIndex+1)/4)}), 500);
            setTimeout(() => this.setState({chosenIndex: Math.floor(3 * (chosenIndex+1)/8)}), 1500);
            setTimeout(() => this.setState({chosenIndex: chosenIndex+1}), 2500);
            setTimeout(() => this.setState({randomizing: false, chosen: chosen}), 4500);
        } else if (this.state.jujak==="dev") {
            chosenIndex = this.list.map(obj => obj.user_id).indexOf("332836587576492033");
            chosen = this.list[chosenIndex];
            this.setState({randomizing: true, chosen: undefined});
            setTimeout(() => this.setState({chosenIndex: Math.floor(3 * (chosenIndex+1)/4)}), 500);
            setTimeout(() => this.setState({chosenIndex: Math.floor(3 * (chosenIndex+1)/8)}), 1500);
            setTimeout(() => this.setState({chosenIndex: chosenIndex+1}), 2500);
            setTimeout(() => this.setState({randomizing: false, chosen: chosen}), 4500);
        } else {
            chosenIndex = Math.floor(Math.random() * (this.list.length - 1));
            chosen = this.list[chosenIndex];
            this.setState({randomizing: true, chosen: undefined});
            setTimeout(() => this.setState({chosenIndex: chosenIndex+1}), 500);
            setTimeout(() => this.setState({randomizing: false, chosen: chosen}), 2500);
        }

        if (this.state.notify_discord) {
            setTimeout(() => this.notify_discord(chosen), 5500);
        }
    }

    notify_discord(chosen) {
        fetch(`http://powermovieevent.p-e.kr:8080/write?product=${encodeURIComponent(this.state.product)}&victim=${chosen.user_id}`, {method: "GET", headers: {
            Authorization: "Bearer "+this.props.token
        }})
    }


    render() {
        return <>
            <Header/>
            <div style={{paddingLeft: '2em', paddingRight: '2em'}}>
                <h1>설정</h1>
                <Grid container>
                    <Grid item xs={4}>
                        <TextField id="standard-search" label="상품 이름" type="search" value={this.state.product} onChange={(e) => this.setState({product: e.target.value})}/>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={this.state.notify_discord}
                                onChange={(event) => this.setState({notify_discord: event.target.checked})}
                                name="notify_discord"
                                color="primary"
                            />
                            }
                            label="당첨 디스코드 알림"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">주작모드를 선택하세요</FormLabel>
                            <RadioGroup row aria-label="position" name="position" defaultValue="top" value={this.state.jujak} onChange={(e) => this.setState({jujak: e.target.value})}>
                                <FormControlLabel
                                value="none"
                                control={<Radio color="primary" />}
                                label="없음"
                                />
                                <FormControlLabel
                                value="yiyee"
                                control={<Radio color="primary" />}
                                label="매수"
                                />
                                <FormControlLabel
                                value="dev"
                                control={<Radio color="primary" />}
                                label="개발자"
                                />
                                <FormControlLabel
                                value="me"
                                control={<Radio color="primary" />}
                                label="주작"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <hr style={{margin: '0px'}}/>
            <div style={{paddingLeft: '2em', paddingRight: '2em', backgroundColor: '#383c44'}}>
                <div style={{padding: '2em'}}>
                    <div style={{border: 'solid 1px white', borderRadius: "5px", padding: '2em', transition: 'all 1s'}}>
                            <div style={{transition: 'all .5s', height: this.state.randomizing ? '7.5em' : '1.5em', overflow: 'hidden', position: 'relative'}}>
                                <div style={{transition: 'top 2s, margin-top .5s',left: "0px", width: "100%", textAlign: 'center', top: ((-1.5*this.state.chosenIndex) + 3)+"em", marginTop: (this.state.randomizing ? 0 : -3)+"em", position: 'absolute'}}>
                                    <span style={{display:"inline-block", textAlign: 'center', height:'1.5em'}}>추첨을 시작해보세요!</span><br/>
                                    {this.list.map((d, index) => (
                                        <React.Fragment key={index === this.theIndex ? "reallyrandom" : d.user_id}>
                                            <span style={{display:"inline-block", height:'1.5em'}}>{d.user_nickname}&nbsp;&nbsp;[{d.user_tag}]</span><br/>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        { this.state.chosen && !this.state.randomizing && (
                            <div style={{textAlign: 'center'}}>
                                <hr/>
                                <span><b>{this.state.product}</b>에 당첨되신....</span>
                                <br/>
                                <h3>{this.state.chosen.user_nickname}&nbsp;&nbsp;[{this.state.chosen.user_tag}] 님!</h3>
                                <span>축하드립니다!</span>
                                <br/>
                                <br/>
                                <br/>
                                <div style={{border: 'solid 1px gray', borderRadius: "2px", padding: '1em'}}>
                                    <span><b>{this.state.chosen.user_nickname}</b> 님의 2주년 축하 메세지</span>
                                    {this.state.chosen.msgs.map(a => (<p>{a.content}</p>))}
                                </div>
                            </div>
                        )}
                    </div>
                    <br/>
                    <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    >  
                        <Button variant="contained" color="primary" onClick={this.random} disabled={this.state.product === ''}>
                            
                            {this.state.product === '' ? "상품명을 입력해주세요" : (
                                <>
                                    추첨하기 {this.state.jujak === "yiyee" && "(매수)"}{this.state.jujak === "me" && "(주작)"}
                                </>
                            )}
                        </Button>
                    </Grid>
                </div>
            </div>
            <hr style={{margin: '0px'}}/>
            <div style={{paddingLeft: '2em', paddingRight: '2em'}}>
                <h1>목록 [총 {this.list.length -1} 명]</h1>
                <Button variant="contained" color="primary" onClick={this.props.getNewData}>
                    리로드
                </Button>
                {Object.values(this.props.data.data).map(d => (
                    <p key={d.user_id}>{d.user_nickname} [{d.user_tag}]: {d.msgs.map(msg => msg.content)}</p>
                ))}
            </div>
        </>
    }
}

function Header() {
    return <AppBar position="static" color="asdasd">
    <Toolbar variant="dense">
      {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <img src={powermovie} alt="logo" style={{'height': '1em'}}/> &nbsp;
      <Typography variant="h6" color="inherit">
            파워무비 추첨기
      </Typography>
    </Toolbar>
  </AppBar>
}

export default RandomChooser;