import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Block from './Block';

const Blocks = () => {
    let paginatedId = 1;
    const [blocks, setBlocks] = useState([]);
    const [blocksLength, setBlocksLength] = useState(0);

    useEffect(() => {
        const fetchedBlocksLength = async () => {
            const { data } = await axios.get(`${document.location.origin}/api/blocks/length`);
            setBlocksLength(data);
        }

        fetchedBlocksLength();

        fetchPaginatedBlocks(paginatedId);
    }, []);

    const fetchPaginatedBlocks = paginatedId => async () => {
        const { data } = await axios.get(`${document.location.origin}/api/blocks/${paginatedId}`);
        setBlocks(data);
    }

    return (
        <div>
            <div><Link to='/'>Home</Link></div>
            <h3>Blocks</h3>
            <div>
                {
                    [...Array(Math.ceil(blocksLength / 5)).keys()].map(key => {
                        const paginatedId = key + 1;

                        return (
                            <span key={key} onClick={fetchPaginatedBlocks(paginatedId)}>
                                <Button size="sm" variant="danger">
                                    {paginatedId}
                                </Button>{' '}
                            </span>
                        )
                    })
                }
            </div>
            {
                blocks.map(block => {
                    return (
                        <Block key={block.hash} block={block} />
                    );
                })
            }
        </div>
    );
}

export default Blocks
