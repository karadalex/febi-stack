import React, { Component } from 'react';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https'
})
const stringToUse = 'hello world from webpacked IPFS'

class IPFS extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      version: null,
      protocol_version: null,
      added_file_hash: null,
      added_file_contents: null
    }
  }
  componentDidMount () {
    ipfs.id((err, res) => {
      if (err) throw err
      this.setState({
        id: res.id,
        version: res.agentVersion,
        protocol_version: res.protocolVersion
      })
    })
    ipfs.add([Buffer.from(stringToUse)], (err, res) => {
        if (err) throw err
        const hash = res[0].hash
        this.setState({added_file_hash: hash})
        ipfs.cat(hash, (err, file) => {
            if (err) throw err
            let data = file.toString('utf8')
            this.setState({added_file_contents: data})
        })
    })
  }
  render () {
    return (
        <div>
            <h2>IPFS Files</h2>
            <p>File ID: <strong>{this.state.id}</strong></p>
            <p>IPFS version: <strong>{this.state.version}</strong></p>
            <p>IPFS protocol version: <strong>{this.state.protocol_version}</strong></p>
            <div>
                <div>
                File was added<br />
                {this.state.added_file_hash}
                </div>
                <div>
                Contents of file added: <br />
                {this.state.added_file_contents}
                </div>
            </div>
        </div>
    );
  }
}

export default IPFS;
