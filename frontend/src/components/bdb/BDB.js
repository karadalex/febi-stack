import React, { Component } from 'react';
import * as driver from 'bigchaindb-driver';

class BDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bdbTx: {},
            // propsChangeStatus - Finite State Machine explanation
            // If there is no change in either fhirData prop or ipfsFileHash prop
            // then propsChangeStatus=0
            // if first change is in fhirData prop then propsChangeStatus=1
            // if first change is in ipfsFileHash prop then propsChangeStatus=2
            // if second change is in fhirData prop and propsChangeStatus=1 then propsChangeStatus=1
            // if second change is in ipfsFileHash prop and propsChangeStatus=1 then propsChangeStatus=3
            // if second change is in fhirData prop and propsChangeStatus=2 then propsChangeStatus=3
            // if second change is in ipfsFileHash prop and propsChangeStatus=2 then propsChangeStatus=2
            propsChangeStatus: 0
        }
    }

    // Execute BigchainDB transaction when new FHIR data are loaded
    componentDidUpdate(prevProps) {
        // Use propsChangeStatus variable to make sure that both fhirData
        // and ipfsFileHash props are changed/updated
        switch (this.state.propsChangeStatus) {
            case 0:
                if (this.props.fhirData !== prevProps.fhirData) {
                    this.setState({ propsChangeStatus: 1 })
                }
                if (this.props.ipfsFileHash !== prevProps.ipfsFileHash) {
                    this.setState({ propsChangeStatus: 2 })
                }
                break;
            case 1:
                if (this.props.fhirData !== prevProps.fhirData) {
                    this.setState({ propsChangeStatus: 1 })
                }
                if (this.props.ipfsFileHash !== prevProps.ipfsFileHash) {
                    this.setState({ propsChangeStatus: 3 })
                }
                break;
            case 2:
                if (this.props.fhirData !== prevProps.fhirData) {
                    this.setState({ propsChangeStatus: 3 })
                }
                if (this.props.ipfsFileHash !== prevProps.ipfsFileHash) {
                    this.setState({ propsChangeStatus: 2 })
                }
                break;
            case 3:
                // BigchainDB server instance (e.g. https://example.com/api/v1/)
                const API_PATH = 'https://test.bigchaindb.com/api/v1/'

                // Create a new keypair.
                const alice = new driver.Ed25519Keypair()

                // Construct a transaction payload
                const tx = driver.Transaction.makeCreateTransaction(
                    // Define the asset to store
                    {
                        resourceType: this.props.fhirData.data.resourceType,
                        id: this.props.fhirData.data.id,
                        metadata: this.props.fhirData.config,
                        ipfsFileHash: this.props.ipfsFileHash
                    },

                    // Metadata contains information about the transaction itself
                    {
                        what: 'FHIR BigchainDB transaction',
                        created_at: Date.now(),
                        updated_at: Date.now()
                    },

                    // A transaction needs an output
                    [ 
                        driver.Transaction.makeOutput(
                            driver.Transaction.makeEd25519Condition(alice.publicKey)
                        )
                    ],
                    alice.publicKey
                )

                // Sign the transaction with private keys
                const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

                // Send the transaction off to BigchainDB
                let conn = new driver.Connection(API_PATH)

                conn.postTransactionCommit(txSigned)
                    .then(res => {
                        console.log('Transaction', txSigned.id, 'accepted')
                        this.setState({
                        bdbTx: txSigned
                        })
                    })

                // Reset propsChangeStatus
                this.setState({ propsChangeStatus: 0 })
                break;
        }
    }

    render() {
        return (
            <div className="App">
                <h2>BigchainDB Transaction</h2>
                <pre>
                    {JSON.stringify(this.state.bdbTx, null, 2)}
                </pre>
            </div>
        );
    }
}

export default BDB;
