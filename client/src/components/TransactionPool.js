import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

const POLL_INTERVAL_MS = 10000;

const TransactionPool = () => {
    const [transactionPoolMap, setTransactionPoolMap] = useState({});

    useEffect(() => {
        const fetchTransactionPoolMap = async () => {
            const { data } = await axios.get(`${document.location.origin}/api/transaction-pool-map`);
            setTransactionPoolMap(data);
        }
        const fetchPoolMapInterval = setInterval(
            () => fetchTransactionPoolMap(),
            POLL_INTERVAL_MS
        );

        return function cleanup() { // Used to cleanup the code once component dismounts
            clearInterval(fetchPoolMapInterval);
        }
    }, []);

    const fetchMineTransactions = async () => {
        const { data } = await axios.get(`${document.location.origin}/api/mine-transactions`)
        if (data.length > 0) {
            alert('success');
            history.push('/blocks');
        } else {
            alert('The mine-transactions block request did not complete.');
        }
    };

    return (
        <div className='TransactionPool' >
            <div><Link to='/'>Home</Link></div>
            <h3>Transaction Pool</h3>
            {
                Object.values(transactionPoolMap).map(transaction => {
                    return (
                        <div key={transaction.id}>
                            <hr />
                            <Transaction transaction={transaction} />
                        </div>
                    )
                })
            }
            <hr />
            <Button
                variant="danger"
                onClick={fetchMineTransactions}>
                Mine the Transactions
            </Button>
        </div >
    )
}


export default TransactionPool;