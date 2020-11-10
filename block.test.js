const Block = require("./block");
const GENESIS_DATA = require("./config");

describe("Block", () => {
  const timestamp = 'a date';
  const lastHash = 'last-hash';
  const data = 'TDD data'
  const hash = 'current-block-hash';

  const block = new Block({
    timestamp,
    lastHash,
    data,
    hash,
  });

  it('should have timestamp, data, lastHash and hash property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.data).toEqual(data);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
  });
});

describe('Genesis Block', () => {
  const genesisBlock = Block.genesis();

  it('returns a Block instance', () => {
    expect(genesisBlock instanceof Block).toBe(true);
  });

  it('returns the Genesis data', () => {
    expect(genesisBlock).toEqual(GENESIS_DATA);
  });
})
