import React, { Component } from 'react';

type Props = {
    updateToken: (newToken: string) => void
    sessionToken: string | null
    id: any
}

class DeleteService extends React.Component<Props>{
    constructor(props: Props) {
        super(props)

        this.state = {

        }
        this.deleteService = this.deleteService.bind(this)
    }



    deleteService(event: any) {
        let tokenCarry = localStorage.getItem('token')
        event.preventDefault();
        fetch(`http://localhost:7000/services/delete/${this.props.id}`, {
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
                <button onClick={this.deleteService}>Delete this Request</button>
            </div>
        )
    }
}

export default DeleteService