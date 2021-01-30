import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';

const Block = ({ block }) => {
    const { timestamp, hash, data } = block;
    const [shouldDisplayTransaction, setDisplayTransaction] = useState(false);
    const hashDisplay = `${hash.substring(0, 15)}...`;

    const toggleTransaction = () => {
        setDisplayTransaction(!shouldDisplayTransaction);
    }

    const displayTransaction = () => {
        const stringifiedData = JSON.stringify(data);
        const dataDisplay = stringifiedData.length > 35 ?
            `${stringifiedData.substring(0, 35)}...` :
            stringifiedData;

        if (shouldDisplayTransaction) {
            return (
                <div>
                    {
                        data.map(transaction => (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        ))
                    }
                    <br />
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={toggleTransaction}
                    >
                        Show Less
                    </Button>
                </div>
            )
        }

        return (
            <div>
                <div>Data: {dataDisplay}</div>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={toggleTransaction}>
                    Show More
                </Button>
            </div>
        );
    };

    return (
        <div className='Block'>
            <div>Hash: {hashDisplay}</div>
            <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
            {displayTransaction()}
        </div>
    );
}

export default Block
