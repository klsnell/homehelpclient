import React from 'react';
// import RegisterUser from './components/Auth/Auth';
// import LoginUser from './components/Login/Login';
// import CreateService from './components/userprofile/serviceCreate';
// import GetServices from './components/userprofile/getServices';
import './App.css';
import Sidebar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUser from './components/Auth/Auth';
import LoginUser from './components/Login/Login';


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

  // protectedViews = () => {
  //   return localStorage.getItem('token') ? (
      
  //       <Router>
  //         <Sidebar />
  //       </Router>
      
  //   ) : (
  //     <LoginUser updateToken={this.updateToken} updateLocalStorage={this.updateLocalStorage} />
  //     // <RegisterUser updateToken={this.updateToken} />
  //   )
  // }

  render() {
    return (
      <div className="App">
        <h1><u><i>Home Owner Help App</i></u></h1>

        {/* {this.protectedViews()} */}

        <RegisterUser updateToken={this.updateToken} />

        <LoginUser updateToken={this.updateToken} updateLocalStorage={this.updateLocalStorage} />

         <Router>
           <Sidebar />
         </Router>

        {/* <CreateService updateToken={this.updateToken} sessionToken={this.state.sessionToken} />

        <GetServices updateToken={this.updateToken} sessionToken={this.state.sessionToken} /> */}


      </div>
    );
  }
};



export default App;
