const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
    const hash = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('test')).toEqual(hash)
    });

    it('produces same hash with same input argument with any order', () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('two', 'three', 'one'))
    })
})