import React, { Component } from 'react';
import { Card, CardBody, CardGroup, CardHeader, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import './getServices.css';

import CreateResponse from '../Response/responseCreate'
import { servicesVersion } from 'typescript';

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
    
}

type State = {
    services: Array<iServices>
    
}

interface iServices {
    serviceType: string,
    serviceDescription: string,
    address: string,
    picture: string,
    id: any
}


class GetServices extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

        this.state = {
            services: []
        }

        this.getServices = this.getServices.bind(this)
    }

    getServices(event: any) {
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault()
        fetch('http://localhost:7000/services/mine', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenCarry}`
            },
        })
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
                this.setState({ services: data })
                console.log(this.state.services)
        })
        .catch(err => console.log(err))
    }

    mapper() {
        return this.state.services.map((service, index) => {
            return (
                <Card className="servicecard">
                <ul key={index}>
                    <p>{service.serviceType}</p>

                    <p>{service.serviceDescription}</p>
                   
                    <p>{service.address}</p>
                  
                    <p>{service.picture}</p>

                    {/* <p>{service.id}</p> */}

                    <p><CreateResponse  {...service.id} /></p>
                </ul>
                </Card>
            )
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.getServices}>Display Service Requests</button>
                {this.mapper()}
            </div>
        )
    }

}
export default GetServices



