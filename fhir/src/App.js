import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    // FHIR is globally loaded in index.js and can be accessed from the window variable
    var smart = window.FHIR.client({
      serviceUrl: 'https://r2.smarthealthit.org',
      auth: {
        type: 'none'
      }
    });
  
    smart.api.search({type: "Observation", query: {subject: "99912345"}
      }).then(function(r){
         console.log(r);
      });

    return (
      <div className="App">
        FHIR Frontend
      </div>
    );
  }
}

export default App;
