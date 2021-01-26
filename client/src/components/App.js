import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blocks from './Blocks';
import logo from '../assets/logo.png';

const App = () => {
    const [walletInfo, setWalletInfo] = useState({});

    useEffect(() => {
        const fetchedWalletInfo = async () => {
            const { data } = await axios.get('http://localhost:3000/api/wallet-info');
            setWalletInfo(data);
        }
        fetchedWalletInfo();
    }, []);

    const { address, balance } = walletInfo;
    return (
        <div className='App'>
            <img className='logo' src={logo}></img>
            <br />
            <div>
                Welcome to the blockchain...
                </div>
            <br />
            <br />
            <div className='WalletInfo'>
                <div>Address: {address}</div>
                <div>Balance: {balance}</div>
            </div>
            <Blocks />
        </div>
    );
}


export default App;