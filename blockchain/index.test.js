const Block = require('./block');
const BlockChain = require('.');
const cryptoHash = require('../util/crypto-hash');

describe('BlockChain()', () => {
    let blockChain, newChain, originalChain;

    beforeEach(() => {
        blockChain = new BlockChain();
        newChain = new BlockChain();

        originalChain = blockChain.chain;
    });

    it('contains a `chain` array instance', () => {
        expect(blockChain.chain instanceof Array).toBe(true);
    })

    it('starts with the genesis block', () => {
        expect(blockChain.chain[0]).toEqual(Block.genesis());
    })

    it('adds new Block to the chain', () => {
        const newData = 'foo';
        blockChain.addBlock({ data: newData });

        expect(blockChain.chain[blockChain.chain.length - 1].data).toEqual(newData);
    })

    describe('isValidChain()', () => {
        describe('when the chain not start with genesis block', () => {
            it('returns false', () => {
                blockChain.chain[0] = { data: 'fake-genesis' };
                expect(BlockChain.isValidChain(blockChain.chain)).toEqual(false);
            })
        });

        describe('when the chain starts with genesis block and multiple blocks', () => {
            beforeEach(() => {
                blockChain.addBlock({ data: 'Bears' })
                blockChain.addBlock({ data: 'Deers' })
            });

            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockChain.chain[1].lastHash = 'broken-lashHash';
                    expect(BlockChain.isValidChain(blockChain.chain)).toEqual(false);
                })
            })

            describe('and the chain contains the block with invalid data', () => {
                it('returns false', () => {
                    blockChain.chain[1].data = 'invalid-data-lashHash';
                    expect(BlockChain.isValidChain(blockChain.chain)).toEqual(false);
                })
            })
            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockChain.chain[2].data = 'some-bad-and-evil-data';

                    expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with a jumped difficulty', () => {
                it('returns false', () => {
                    const lastBlock = blockChain.chain[blockChain.chain.length - 1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty - 3;
                    const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);
                    const badBlock = new Block({
                        timestamp, lastHash, hash, nonce, difficulty, data
                    });

                    blockChain.chain.push(badBlock);

                    expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
                });
            });

            describe('and the chain does not contains any invalid block', () => {
                it('returns true', () => {
                    expect(BlockChain.isValidChain(blockChain.chain)).toEqual(true);
                })
            })
        });
    });

    describe('replaceChain()', () => {
        let errorMock;
        beforeEach(() => {
            errorMock = jest.fn();
            global.console.error = errorMock;
        });

        describe('when the new chain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = { new: 'chain' }
                blockChain.replaceChain(newChain.chain);
            });

            it('does not replace the chain', () => {
                expect(blockChain.chain).toEqual(originalChain);
            })

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            })
        })

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'Bears' })
                newChain.addBlock({ data: 'Deers' })
            });

            describe('when the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[1].hash = 'fake-hash';
                    blockChain.replaceChain(newChain.chain);
                })

                it('does not replace the chain', () => {
                    expect(blockChain.chain).toEqual(originalChain);
                })

                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                })
            })

            describe('when the chain is valid', () => {
                it('does replace the chain', () => {
                    blockChain.replaceChain(newChain.chain);

                    expect(blockChain.chain).toEqual(newChain.chain);
                })
            })
        })
    })
});