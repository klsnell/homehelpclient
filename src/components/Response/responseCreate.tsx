import React, {Component} from 'react';
import { Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import './response.css';
import APIURL from '../../helpers/environment';


type State = {
    company: string,
    reply: string,
    estimateTime: number | string
}

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
    id: number
}

class CreateResponse extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)

        this.state ={
            company: '',
            reply: '',
            estimateTime: 0
        };
        this.createResponse = this.createResponse.bind(this)
    }

    // company(event: any){
    //     this.setState({company: event.target.value})
    // }

    // reply(event: any){
    //     this.setState({reply: event.target.value})
    // }

    // estimateTime(event: any){
    //     this.setState({estimateTime: event.target.value})
    // }

    createResponse(event: React.FormEvent<HTMLFormElement>){
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault();
        console.log(this.props.id)
        console.log(`http://localhost:7000/response/respond/${this.props.id}`)
        fetch(`${APIURL}/response/respond/${this.props.id}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `${tokenCarry}`
                
            },
            body: JSON.stringify({
                company: this.state.company,
                reply: this.state.reply,
                estimateTime: this.state.estimateTime

            })
        }).then((Response) => Response.json())
        .then((data) => {
            console.log(data);
            console.log(this.state.reply)
        }).catch(err=> console.log(err))
    }

    render(){
        console.log()
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Form onSubmit={this.createResponse}>
                                        <div className='responddiv'><u>Respond to this request</u></div>

                                        <InputGroup className='respondbox'>
                                            <Input className='respondinput' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ company: e.target.value }) }} value={this.state.company} placeholder="Company Name" />
                                        </InputGroup>

                                        <InputGroup className='respondbox'>
                                            <Input className='respondinput' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ reply: e.target.value }) }} value={this.state.reply} placeholder="Your response here" />
                                        </InputGroup>

                                        <InputGroup className='respondbox'>
                                            <Input className='respondinput' type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { this.setState({ estimateTime: e.target.value }) }} value={this.state.estimateTime} placeholder="Estimate time(days)" />
                                        </InputGroup>
                                        
                                        <button type="submit">Submit Response</button>
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
export default CreateResponse