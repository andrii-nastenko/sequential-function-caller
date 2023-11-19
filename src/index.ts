/**
 * Executes a given function multiple times, dividing the calls into chunks with an optional delay between them.
 *
 * @template T - The type of the payload array elements.
 * @template R - The type of the result returned by the function.
 * @param {Object} options - The options object.
 * @param {number} options.chunkSize - The size of each chunk.
 * @param {number} options.totalCalls - The total number of calls to be made.
 * @param {T[]} [options.payloadArray=[]] - The array of payloads to be passed to the function.
 * @param {number} options.delaySeconds - The delay in seconds between chunks.
 * @returns {Promise<R[]>} - A promise that resolves to an array of results.
 *
 * @example
 * // Define a function (could be sync or async) to be executed in chunks.
 * const exampleFunction = (a) => { console.log(a); return a };
 *
 * // Execute the function in chunks.
 * repeatCalls({
 *     functionToExecute: exampleFunction,
 *     totalCalls: 9,
 *     chunkSize: 3,
 *     payloadArray: [1,2,3,4,5,6,7,8,9],
 *     delaySeconds: 1
 * }).then(response => {
 *     console.log(response);
 * });
 *
 * // Display the array of results or errors from the calls.
 * console.log(result);
 */
export async function repeatCalls({
  functionToExecute,
  totalCalls,
  chunkSize,
  delaySeconds,
  payloadArray
}: {
  functionToExecute: (...payload: any[]) => Promise<unknown> | unknown;
  totalCalls?: number;
  chunkSize: number;
  delaySeconds: number;
  payloadArray?: any[];
}): Promise<any> {
  const hasPayload = Array.isArray(payloadArray);
  const defaultTotalCalls = totalCalls ?? ((hasPayload ? payloadArray?.length : 0) || 0);
  const allResults: Array<Promise<unknown>> = [];

  for (let i = 0; i < defaultTotalCalls; i += chunkSize) {
    const results: Array<Promise<unknown>> = [];
    const chunkStart = i;
    const chunkEnd = Math.min(i + chunkSize, defaultTotalCalls);

    const chunk = hasPayload
      ? payloadArray?.slice(chunkStart, chunkEnd) // Use optional chaining here
      : Array.from({length: chunkEnd - chunkStart}, (_, j) => j + chunkStart);

    for (const args of chunk ?? []) {
      const result = Promise.resolve(
        functionToExecute(...(Array.isArray(args) ? args : [args]))
      ).catch((error) => error);
      results.push(result);
      await result;
    }

    allResults.push(...results);

    if (i + chunkSize < defaultTotalCalls && delaySeconds > 0) {
      await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));
    }
  }

  return await Promise.all(allResults);
}

export default {repeatCalls};
