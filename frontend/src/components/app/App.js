import React, { Component } from 'react';
import './App.css';
import FHIR from '../fhir/FHIR';
import BDB from '../bdb/BDB';
import IPFS from '../ipfs/IPFS';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <h1>FHIR Frontend </h1>
        <br></br>
        <FHIR></FHIR>
        <br></br>
        <BDB></BDB>
        <br></br>
        <IPFS></IPFS>
      </div>
    );
  }
}

export default App;
