import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import RegisterUser from './Auth/auth';
import LoginUser from './Login/login';
import CreateService from './userprofile/serviceCreate';
import CreateResponse from './Response/responseCreate';
import GetServices from './userprofile/getServices';
import GetUsers from './userprofile/getUsers';


type State = {
    sessionToken: string | null
}

class Sidebar extends React.Component<{}, State>{
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
            <div className='sidebar'>
                <div className='sidebarstyling'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/auth'><button>Register</button></Link></li>
                        <li><Link to='/login'><button>Login</button></Link></li>
                        <li><Link to='/userprofile'><button>Account</button></Link></li>
                    </ul>
                </div>
                <div className='sidebar-route'>
                    <Routes>
                        <Route path='/home'></Route>

                        {/* <Route path='/auth'><RegisterUser updateToken={this.updateToken} /></Route> */}

                        {/* <Route path='/login'><LoginUser updateToken={this.updateToken} updateLocalStorage={this.updateLocalStorage} /></Route> */}

                        <Route path='./userprofile'><CreateService updateToken={this.updateToken} sessionToken={this.state.sessionToken} /><GetServices updateToken={this.updateToken} sessionToken={this.state.sessionToken} />
                            <GetUsers updateToken={this.updateToken} sessionToken={this.state.sessionToken} /></Route>
                    </Routes>
                </div>
            </div>
        )
    }
}
export default Sidebar