import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
// import { Route, Link, Routes } from 'react-router-dom';
// import GetServices from './getServices';
// import CreateResponse from '../Response/responseCreate';


type State = {
    serviceType: string,
    serviceDescription: string,
    address: string,
    picture: string
}

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
}

class CreateService extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

        this.state = {
            serviceType: '',
            serviceDescription: '',
            address: '',
            picture: '',
        };
        this.createService = this.createService.bind(this)
    }

    // serviceType(event: any) {
    //     this.setState({ serviceType: event.target.value })
    // }
    // serviceDescription(event: any) {
    //     this.setState({ serviceDescription: event.target.value })
    // }
    // address(event: any) {
    //     this.setState({ address: event.target.value })
    // }
    // picture(event: any) {
    //     this.setState({ picture: event.target.value })
    // }

    createService(event: React.FormEvent<HTMLFormElement>) {
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault()
        fetch('http://localhost:7000/services/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenCarry}`

            },
            body: JSON.stringify({
                serviceType: this.state.serviceType,
                serviceDescription: this.state.serviceDescription,
                address: this.state.address,
                picture: this.state.picture,
            })
        }).then((Response) => Response.json())
            .then((data) => {
                console.log(data);
                console.log(this.state.serviceType)
                // this.props.updateToken(data.SessionToken)
                // if(data.Status == 'Success')
                // else
                //     alert('failed')
                //     console.log(Response);
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
                                    <Form onSubmit={this.createService}>
                                        <div>Service Request</div>
                                        <InputGroup>
                                            <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ serviceType: e.target.value }) }} value={this.state.serviceType} placeholder="Service type (i.e. Plumbing, Electrical, Foundation)" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ serviceDescription: e.target.value }) }} value={this.state.serviceDescription} placeholder="Description of problem" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ address: e.target.value }) }} value={this.state.address} placeholder="Address" />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ picture: e.target.value }) }} value={this.state.picture} placeholder="Upload Picture" />
                                        </InputGroup>
                                        <button type="submit">Create New Service Request</button>
                                        {/* <Link to='/getservices'><button className='linkbutton'>Get Services</button></Link>
                                        <div>
                                            <Routes>
                                            <Route path='getservices' element={<GetServices updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />}>
                                            </Route>
                                            </Routes>
                                        </div> */}


                                        {/* <CreateResponse updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/> */}
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

export default CreateService