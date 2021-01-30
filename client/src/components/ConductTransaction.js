import React, { useState, useEffect } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

const ConductTransaction = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0);
    const [knownAddresses, setKnownAddresses] = useState([]);

    useEffect(() => {
        const fetchedKnownAddress = async () => {
            const { data } = await axios.get('http://localhost:3000/api/known-addresses');
            setKnownAddresses(data);
        }
        fetchedKnownAddress();
    }, []);

    const updateRecipient = event => {
        setRecipient(event.target.value);
    }

    const updateAmount = event => {
        setAmount(event.target.value);
    }

    const conductTransaction = async () => {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        const payload = { recipient, amount }

        const { data } = await axios.post('http://localhost:3000/api/transact', payload, config)

        alert(data.message || data.type);
        history.push('/transaction-pool');
    }

    return (
        <div className='ConductTransaction'>
            <Link to='/'>Home</Link>
            <h3>Conduct a Transaction</h3>
            <br />
            <h4>Known Addresses</h4>
            {
                knownAddresses.map(knownAddress => {
                    return (
                        <div key={knownAddress}>
                            <div>{knownAddress}</div>
                            <br />
                        </div>
                    );
                })
            }
            <br />
            <FormGroup>
                <FormControl
                    input='text'
                    placeholder='recipient'
                    value={recipient}
                    onChange={updateRecipient}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    input='number'
                    placeholder='amount'
                    value={amount}
                    onChange={updateAmount}
                />
            </FormGroup>
            <div>
                <Button
                    variant="danger"
                    onClick={conductTransaction}
                >
                    Submit
                    </Button>
            </div>
        </div>
    )
}

export default ConductTransaction;