import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';

type State = {
    email: string,
    password: string
}
type Props = {
    updateToken: (newToken: string) => void
    updateLocalStorage: () => void
    
}

class LoginUser extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
        this.login = this.login.bind(this)
    }

    email(event: any) {
        this.setState({ email: event.target.value })
    }
    password(event: any) {
        this.setState({ password: event.target.value })
    }

    login(event: any) {
        event.preventDefault()
        fetch('http://localhost:7000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:{
                email: this.state.email,
                password: this.state.password}
            })
        }).then((Response) => Response.json())
            .then((data) => {
                console.log(data);
                console.log(this.state.email);
                this.props.updateToken(data.SessionToken)
                if (data.Status === 'Success')
                    alert('Logged in')
                else
                    alert('Welcome!')
                    console.log(Response);
                    
            }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Form onSubmit={this.login}>
                                        <div>Login</div>
                                        <InputGroup>
                                            <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ email: e.target.value }) }} value={this.state.email} placeholder="Email Address" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ password: e.target.value }) }} value={this.state.password} placeholder="Password" />
                                        </InputGroup>
                                        <button type="submit">Login</button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default LoginUser