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
});

describe('Mine Block', () => {
  const lastBlock = Block.genesis();
  const data = 'mined data';

  const minedBlock = Block.mineBlock({ lastBlock, data });

  it('returns a Block instance', () => {
    expect(minedBlock instanceof Block).toBe(true);
  });

  it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
    expect(minedBlock.lastHash).toEqual(lastBlock.hash);
  });

  it('sets the `data`', () => {
    expect(minedBlock.data).toEqual(data);
  });

  it('sets the `timestamp`', () => {
    expect(minedBlock.timestamp).not.toEqual(undefined);
  });
})
