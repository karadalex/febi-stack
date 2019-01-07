import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      observation: {}
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
           observation: r
         })
      });
  }

  render() {
    return (
      <div className="App">
        FHIR Frontend <br></br>
        <pre>
          {JSON.stringify(this.state.observation, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;
