import React, { Component } from 'react';
import { Form, Label, Input, InputGroup, Button } from 'reactstrap'

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
    id: number
}

type State = {
    serviceType: string,
    serviceDescription: string,
    address: string,
    picture: string,
    id: number
}

class UpdateService extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

        this.state = {
            serviceType: '',
            serviceDescription: '',
            address: '',
            picture: '',
            id: 0
        }
        this.updateService = this.updateService.bind(this)
    }


    updateService(event: any) {
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault();
        fetch(`http://localhost:7000/services/update/${this.props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenCarry}`
            },
            body: JSON.stringify({
                serviceType: this.state.serviceType,
                serviceDescription: this.state.serviceDescription,
                address: this.state.address,
                picture: this.state.picture
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(this.state.serviceType)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Form onSubmit ={this.updateService}>
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
                <button type="submit">Update this Request</button>
                </Form>
            </div>
        )
    }
}
export default UpdateService