import React, { Component } from 'react';
import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import './auth.css'


type State = {
    email: string,
    password: string,
    fName: string,
    phoneNumber: number | string,
    isUser: boolean,
    isContractor: boolean,
    isAdmin: boolean
}
type Props = {
    updateToken: (newToken: string) => void
}

class RegisterUser extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            fName: '',
            phoneNumber: '',
            isUser: true,
            isContractor: false,
            isAdmin: false
        };

        this.register = this.register.bind(this)
    }


    email(event: any) {
        this.setState({ email: event.target.value })
    }

    password(event: any) {
        this.setState({ password: event.target.value })
    }

    fName(event: any) {
        this.setState({ fName: event.target.value })
    }

    phoneNumber(event: any) {
        this.setState({ phoneNumber: event.target.value })
    }

    isUser(event: any) {
        this.setState({ isUser: event.target.value })
    }

    isContractor(event: any) {
        this.setState({ isContractor: event.target.value })
    }

    isAdmin(event: any) {
        this.setState({ isAdmin: event.target.value })
    }

    register(event: any) {
        event.preventDefault()
        fetch('http://localhost:7000/user/register', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:{
                email: this.state.email,
                password: this.state.password,
                fName: this.state.fName,
                phoneNumber: this.state.phoneNumber,
                isUser: this.state.isUser,
                isContractor: this.state.isContractor,
                isAdmin: this.state.isAdmin}
            })
        }).then((Response) => Response.json())
            .then((data) => {
                if (data.Status == 'Success')
                    this.props.updateToken(data.SessionToken)
                else
                    alert('User Registered')
            }).catch(err => console.log(err))
    }




    render() {
        return (
            <div>
                {/* <button>Login/register</button> */}
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <form onSubmit={this.register}>
                                        <div>Register Account</div>
                                        <InputGroup>
                                            <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ email: e.target.value }) }} value={this.state.email} placeholder="Email Address" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ password: e.target.value }) }} value={this.state.password} placeholder="Password" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ fName: e.target.value }) }} value={this.state.fName} placeholder="First Name" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ phoneNumber: e.target.value }) }} value={this.state.phoneNumber} placeholder="Phone Number" />
                                        </InputGroup>
                                        <button type="submit">Register</button>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


}

export default RegisterUser