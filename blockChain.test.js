const Block = require('./block');
const BlockChain = require('./blockChain');

describe('BlockChain()', () => {
    let blockChain;

    beforeEach(() => {
        blockChain = new BlockChain();
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

            describe('and the chain does not contains any invalid block', () => {
                it('returns true', () => {
                    expect(BlockChain.isValidChain(blockChain.chain)).toEqual(true);
                })
            })
        });
    });
});