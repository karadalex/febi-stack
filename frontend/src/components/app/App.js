import React, { Component } from 'react';
import './App.css';
import FHIR from '../fhir/FHIR';
import Ethereum from '../eth/Ethereum';
import BDB from '../bdb/BDB';
import IPFS from '../ipfs/IPFS';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fhirData: {},
            bdbTx: {},
            ipfsFileHash: ""
        }
    }

    setFhirData = (data) => {
        this.setState({ fhirData: data });
    }

    setIpfsFileHash = (hash) => {
        this.setState({ ipfsFileHash: hash })
        console.log(this.state.ipfsFileHash)
    }

    render() {
        return (
            <div className="App">
                <h1>FHIR Frontend </h1>
                <FHIR setFhirData={this.setFhirData}></FHIR>
                <br></br>
                <IPFS fhirData={this.state.fhirData} setIpfsFileHash={this.setIpfsFileHash}></IPFS>
                <br></br>
                <BDB fhirData={this.state.fhirData} ipfsFileHash={this.state.ipfsFileHash}></BDB>
                <br></br>
                <Ethereum></Ethereum>
            </div>
        );
    }
}

export default App;
