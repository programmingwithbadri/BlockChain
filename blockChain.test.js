const Block = require('./block');
const BlockChain = require('./blockChain');

describe('BlockChain()', () => {
    const blockChain = new BlockChain();

    it('contains a `chain` array instance', () => {
        expect(blockChain.chain instanceof Array).toBe(true);
    })

    it('starts with the genesis block', () => {
        expect(blockChain.chain[0]).toEqual(Block.genesis());
    })

    it('adds new Block to the chain', () => {
        const newData = 'foo';
        blockChain.addBlock({ data: newData });

        expect(blockChain.chain[blockChain.chain.length - 1]).toEqual(newData);
    })
})