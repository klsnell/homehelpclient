import React, {Component} from 'react';
import APIURL from '../../helpers/environment';

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
}

type State = {
    users: Array<iUsers>
}

interface iUsers {
    email: string,
    password: string,
    fName: string,
    phoneNumber: string | number,
    isUser: boolean,
    isContractor: boolean,
    isAdmin: boolean
    
}

class GetUsers extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)

        this.state ={
            users: []
        }

        this.getUsers = this.getUsers.bind(this)
    }

    getUsers(event: any){
        event.preventDefault()
        fetch(`${APIURL}/user/userinfo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.setState({users: data})
            console.log(this.state.users)
        })
        .catch(err => console.log(err))
    }

    mapper(){
        return this.state.users.map((users, index) => {
            return(
                <ul key={index}>
                    <li>{users.email}</li>

                    <li>{users.fName}</li>

                    <li>{users.phoneNumber}</li>

                </ul>
            )
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.getUsers}>View Users</button>
                {this.mapper()}
            </div>
        )
    }
}

export default GetUsers