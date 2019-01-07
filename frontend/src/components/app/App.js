import React, { Component } from 'react';
import './App.css';
import BDB from '../bdb/BDB';
import IPFS from '../ipfs/IPFS';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fhirData: {}
    }
  }

  componentDidMount() {
    // FHIR is globally loaded in index.js and can be accessed from the window variable
    var smart = window.FHIR.client({
      serviceUrl: 'https://r2.smarthealthit.org',
      auth: {
        type: 'none'
      }
    });
  
    smart.api.search({type: "Observation", query: {subject: "99912345"}
      }).then((r) => {
         console.log(r);
         this.setState({
           fhirData: r
         })
      });
  }

  render() {
    return (
      <div className="App">
        <h1>FHIR Frontend </h1>
        <br></br>
        <IPFS></IPFS>
        <br></br>
        <BDB></BDB>
      </div>
    );
  }
}

export default App;
