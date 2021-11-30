import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import CreateService from './userprofile/ServiceCreate';
import GetServices from './userprofile/GetServices';
import './Navbar.css';



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
                        {/* <li><Link to='/'>Home</Link></li> */}
                        {/* <li><Link to='/auth'><button>Register</button></Link></li>
                        <li><Link to='/login'><button>Login</button></Link></li> */}
                        <Link to='/userprofile'><button className='linkbutton'>Start a Service Request</button></Link>
                        <br/>
                        <Link to='/getservices'><button className='linkbutton'>Get Your Service Requests</button></Link>

                    </ul>
                </div>
                <div className='sidebar-route'>
                    <Routes>
                        <Route path='userprofile' element={<CreateService updateToken={this.updateToken} sessionToken={this.state.sessionToken} />}>
                        </Route>

                        <Route path='getservices' element={<GetServices updateToken={this.updateToken} sessionToken={this.state.sessionToken} />}>
                        </Route>
                        
                    </Routes>
                </div>
            </div>
        )
    }
}
export default Sidebar