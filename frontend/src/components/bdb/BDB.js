import React, { Component } from 'react';
import * as driver from 'bigchaindb-driver';

class BDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bdbTx: {}
        }
    }

    // Execute BigchainDB transaction when new FHIR data are loaded
    componentDidUpdate(prevProps) {
        if (this.props.fhirData !== prevProps.fhirData) {
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
                    metadata: this.props.fhirData.config
                },

                // Metadata contains information about the transaction itself
                // (can be `null` if not needed)
                { what: 'FHIR BigchainDB transaction' },

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
