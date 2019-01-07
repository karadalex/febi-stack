import React, { Component } from 'react';
import Web3 from 'web3';


class Ethereum extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    }

    render() {
        return (
            <div className="fhir">
                <h2> Ethereum </h2>
            </div>
        );
    }
}

export default Ethereum;
