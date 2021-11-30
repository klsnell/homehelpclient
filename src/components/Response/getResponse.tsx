import React, {Component} from 'react';
import {Card} from 'reactstrap';
import DeleteResponse from './DeleteResponse';
import UpdateResponse from './UpdateResponse';
import APIURL from '../../helpers/environment';

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
}

type State ={
    responses: Array<iResponses>
}

interface iResponses {
    company: string,
    reply: string,
    estimateTime: number | string
    id: number
}

class GetResponses extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)

        this.state = {
            responses: []
        }

        this.getResponses = this.getResponses.bind(this)
    }

    getResponses(event:any){
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault()
        fetch(`${APIURL}/response/myresponses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenCarry}`
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.setState({responses: data})
            console.log(this.state.responses)
        })
        .catch(err => console.log(err))
    }

    mapper(){
        return this.state.responses.map((respond, index) => {
            return(
                <Card className="responsecard">
                    <ul key={index}>
                        <p>{respond.company}</p>
                        <p>{respond.reply}</p>
                        <p>{respond.estimateTime}</p>
                        <p><DeleteResponse id={respond.id} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/></p>
                        <p><UpdateResponse id={respond.id} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/></p>
                    </ul>
                    <button>Select This Company</button>
                </Card>
            )
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.getResponses}>View Responses</button>
                {this.mapper()}
            </div>
        )
    }
}
export default GetResponses