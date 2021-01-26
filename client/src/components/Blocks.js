import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Block from './Block';

const Blocks = () => {
    const [blocks, setBlocks] = useState([]);
    useEffect(() => {
        const fetchedBlocks = async () => {
            const { data } = await axios.get('http://localhost:3000/api/blocks');
            setBlocks(data);
        }
        fetchedBlocks();
    }, []);
    return (
        <div>
            <h3>Blocks</h3>
            {
                blocks.map(block => {
                    return (
                        <Block key={block.hash} block={block} />
                    );
                })
            }
        </div>
    )
}

export default Blocks
