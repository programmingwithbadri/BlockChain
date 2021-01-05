const { STARTING_BALANCE } = require('../config');
const { ec } = require('../util');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }
};

module.exports = Wallet;