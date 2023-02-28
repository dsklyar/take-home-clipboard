# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here


My refactor focuses on simplifaction of branching logic. I short circuited the null/undefined/NaN event input to prevent unnecessary computation and refactored the two cases as follows:

1. Existance of partition key in the event. If it exists, logic needs to check if it is a string, otherwise convert to a string. After conversion/set as is, logic needs to check if it is over a limit of 256 bytes. If so, hash the result. Otherwise return the partition key stringified or set as is.

2. Event without a partition key. This is a simple case, where the event is stringified and hashed. The result will 256 byte char string.


Additionaly I refactored hashing logic in its own function.