import React, {Component} from 'react';
import APIURL from '../../helpers/environment';

type Props ={
    updateToken: (newToken: string) => void
    sessionToken: string | null
    id: number
}

class DeleteResponse extends React.Component<Props>{
    constructor(props: Props){
        super(props)
        this.state={}

        this.deleteResponse = this.deleteResponse.bind(this)
    }

    deleteResponse(event: any){
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault();
        fetch(`${APIURL}/response/deleteresponse/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenCarry}`
            },
            body: JSON.stringify({

            })
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.deleteResponse}>Delete Response</button>
            </div>
        )
    }

}
export default DeleteResponse