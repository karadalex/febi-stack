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
            fhirData: "{}",
            bdbTx: {},
            ipfsData: {}
        }
    }

    setFhirData = (data) => {
        this.setState({ fhirData: data });
    }

    render() {
        return (
            <div className="App">
                <h1>FHIR Frontend </h1>
                <FHIR setFhirData={this.setFhirData}></FHIR>
                <br></br>
                <BDB></BDB>
                <br></br>
                <IPFS fhirData={this.state.fhirData}></IPFS>
                <br></br>
                <Ethereum></Ethereum>
            </div>
        );
    }
}

export default App;
