import React, {Component} from 'react';
import './App.css';
import PreRPCAuthorize from './components/PreRPCAuthorize.jsx';
import PreDataLoad from './components/PreDataLoad.jsx';

import { Container, ThemeProvider, createMuiTheme } from '@material-ui/core';
import RandomChooser from './components/RandomChooser';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {state: 0, token: undefined, user: {}, data: {}};
  }

  render() {
    const setUser = (token, user) => {
      this.setState({state: 1, token: token, user: user})
      console.log(user);
    }
    const setData = (data ) => {
      this.setState({state: 2, data: data});
      console.log(data);
    }
    const setData2 = () => this.setState({state: 1});

    return (
      <div className="app">
        <ThemeProvider theme={darkTheme}>
          {this.state.state === 0 && (<PreRPCAuthorize setUser={setUser}/>)}
          {this.state.state === 1 && (<PreDataLoad token={this.state.token} setData={setData} user={this.state.user}/>)}
          {this.state.state === 2 && (<RandomChooser token={this.state.token} getNewData={setData2} data={this.state.data} user={this.state.user}/>)}
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
