import React, { Component } from 'react';
import { Form, Label, Input, InputGroup, Button } from 'reactstrap'

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
    id: number
}

type State = {
    company: string,
    reply: string,
    estimateTime: number | string,
    id: number

}

class UpdateResponse extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

        this.state = {
            company: '',
            reply: '',
            estimateTime: 0,
            id: 0
        }
        this.updateResponse = this.updateResponse.bind(this)
    }

    updateResponse(event: any) {
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault();
        fetch(`http://localhost:7000/response/updateresponse/${this.props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenCarry}`
            },
            body: JSON.stringify({
                company: this.state.company,
                reply: this.state.reply,
                estimateTime: this.state.estimateTime
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(this.state.company)
            })
            .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.updateResponse}>
                                        <div className='responddiv'><u>Update Response</u></div>

                                        <InputGroup className='respondbox'>
                                            <Input className='respondinput' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ company: e.target.value }) }} value={this.state.company} placeholder="Company Name" />
                                        </InputGroup>

                                        <InputGroup className='respondbox'>
                                            <Input className='respondinput' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ reply: e.target.value }) }} value={this.state.reply} placeholder="Your response here" />
                                        </InputGroup>

                                        <InputGroup className='respondbox'>
                                            <Input className='respondinput' type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ estimateTime: e.target.value }) }} value={this.state.estimateTime} placeholder="Estimate time(days)" />
                                        </InputGroup>
                                        
                                        <button type="submit">Update Response</button>
                                    </Form>
            </div>
        )
    }
}
export default UpdateResponse