const Block = require("./block");

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
