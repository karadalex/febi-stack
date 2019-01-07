import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    var smart = window.FHIR.client({
      serviceUrl: 'https://r2.smarthealthit.org',
      auth: {
        type: 'none'
      }
    });
  
    smart.api.search({type: "Observation", query: {subject: "99912345"}
      }).then(function(r){
         console.log(JSON.stringify(r,null,2));
      });

    return (
      <div className="App">
        FHIR Frontend
      </div>
    );
  }
}

export default App;
