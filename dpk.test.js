const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

/**
 * Hash function always returns 256 (bytes) length string
 */
const hashEvent = (input, stringify = false) =>
  crypto
    .createHash("sha3-512")
    .update(stringify ? JSON.stringify(input) : input)
    .digest("hex");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns hash of event without partition key", () => {
    const stringEvent = "string event";
    const stringEventHashedKey = hashEvent(stringEvent, true);
    const stringEventCandidate = deterministicPartitionKey(stringEvent);

    expect(stringEventCandidate).toBe(stringEventHashedKey);

    const objectEvent = { object: "event" };
    const objectEventHashedKey = hashEvent(objectEvent, true);
    const objectEventCandidate = deterministicPartitionKey(objectEvent);

    expect(objectEventCandidate).toBe(objectEventHashedKey);
  });

  it("Returns provided partition key when constraints are met", () => {
    const objectEvent = { partitionKey: new Array(256 + 1).join("c") };
    const objectEventCandidate = deterministicPartitionKey(objectEvent);
    expect(objectEventCandidate).toBe(objectEvent.partitionKey);
  });

  it("Returns hash of oversized string partition key (length > 256)", () => {
    const objectEvent = { partitionKey: new Array(257 + 1).join("c") };
    const objectEventHashedKey = hashEvent(objectEvent.partitionKey);
    const objectEventCandidate = deterministicPartitionKey(objectEvent);
    expect(objectEventCandidate).toBe(objectEventHashedKey);
  });

  it("Returns non-string partition key", () => {
    const objectEvent = { partitionKey: { random: "object" } };
    const objectEventCandidate = deterministicPartitionKey(objectEvent);
    expect(objectEventCandidate).toBe(JSON.stringify(objectEvent.partitionKey));
  });

  it("Returns hash of oversized non-string partition key", () => {
    const objectEvent = {
      partitionKey: [...Array(256).keys()],
    };
    const objectEventHashedKey = hashEvent(objectEvent.partitionKey, true);
    const objectEventCandidate = deterministicPartitionKey(objectEvent);
    expect(objectEventCandidate).toBe(objectEventHashedKey);
  });
});
