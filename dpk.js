const crypto = require("crypto");

const hashInput = (input) =>
  crypto.createHash("sha3-512").update(input).digest("hex");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (event === null || event === undefined || event === NaN) {
    return TRIVIAL_PARTITION_KEY;
  }

  // Consume partition key if exists
  // Otherwise hash the event as is
  if (event?.partitionKey) {
    const { partitionKey } = event;
    // Stringify partition key if needed
    const candidate =
      typeof partitionKey !== "string"
        ? JSON.stringify(partitionKey)
        : partitionKey;
    // Check if partition key string is over > 256
    // If so hash it, otherwise return as is
    return candidate.length > MAX_PARTITION_KEY_LENGTH
      ? hashInput(candidate)
      : candidate;
  } else {
    return hashInput(JSON.stringify(event));
  }
};
