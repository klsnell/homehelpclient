import React from 'react';
import RegisterUser from './components/Auth/auth';
import LoginUser from './components/Login/login';
import CreateService from './components/userprofile/serviceCreate';
import CreateResponse from './components/Response/responseCreate';
import GetServices from './components/userprofile/getServices';
import GetUsers from './components/userprofile/getUsers';
import './App.css';
// import Sidebar from './components/Navbar';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



type State = {
  sessionToken: string | null
}

class App extends React.Component<{}, State>{
  constructor(props: {}) {
    super(props)

    this.state = {
      sessionToken: '',
    }

    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
  };

  updateLocalStorage = (() => {
    if (localStorage.getItem('token')) {
      this.setState({ sessionToken: localStorage.getItem('token') })
    }
  });

  updateToken(newToken: string) {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken })
  };

  clearToken() {
    localStorage.clear();
    this.setState({ sessionToken: '' })
  };



  render() {
    return (
      <div className="App">
        <h1><u><i>Home Owner Help App</i></u></h1>

        <RegisterUser updateToken={this.updateToken} />

        <LoginUser updateToken={this.updateToken} updateLocalStorage={this.updateLocalStorage} />

        <CreateService updateToken={this.updateToken} sessionToken={this.state.sessionToken} />
        {/* <CreateResponse updateToken={this.updateToken} sessionToken={this.state.sessionToken} /> */}
        <GetServices updateToken={this.updateToken} sessionToken={this.state.sessionToken} />
        <GetUsers updateToken={this.updateToken} sessionToken={this.state.sessionToken} />
      </div>
    );
  }
};



export default App;
