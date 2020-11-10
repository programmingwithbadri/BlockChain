const GENESIS_DATA = require("./config");

class Block {
  constructor({ timestamp, lastHash, data, hash }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.data = data;
    this.hash = hash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    return new this({
      timestamp: Date.now(),
      lastHash: lastBlock.hash,
      data
    })
  }
}

module.exports = Block;
