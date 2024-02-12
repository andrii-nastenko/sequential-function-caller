/**
 * Executes a given function multiple times, dividing the calls into chunks with an optional delay between them.
 *
 * @template T - The type of the payload array elements.
 * @template R - The type of the result returned by the function.
 * @param {Object} options - The options object.
 * @param {number} options.chunkSize - The size of each chunk.
 * @param {number} options.delayMs - The delay in milliseconds between chunks.
 * @param {T[]} [options.payloadArray=[]] - The array of payloads to be passed to the function. Either `payloadArray` or `totalCalls` is required.
 * @param {number} [options.totalCalls] - The total number of calls to be made. Either `payloadArray` or `totalCalls` is required.
 * @param {(...payload: T[]) => Promise<R> | R} options.functionToExecute - The function to be executed.
 * @returns {Promise<R[]>} - A promise that resolves to an array of results.
 *
 * @example
 * // Define a function (could be sync or async) to be executed in chunks.
 * const exampleFunction = (a) => {
 *     console.log(a);
 *     return a
 * };
 *
 * // Execute the function in chunks.
 * repeatCalls({
 *     functionToExecute: exampleFunction,
 *     totalCalls: 9,
 *     chunkSize: 3,
 *     payloadArray: [1,2,3,4,5,6,7,8,9],
 *     delayMs: 1000
 * }).then(response => {
 *     console.log(response);
 * });
 *
 * // Display the array of results or errors from the calls.
 * console.log(result);
 */
export declare function repeatCalls<T, R>({ functionToExecute, totalCalls, chunkSize, delayMs, payloadArray }: {
    functionToExecute: (...payload: T[]) => Promise<R> | R;
    chunkSize: number;
    delayMs: number;
    payloadArray: T[];
    totalCalls: number;
}): Promise<R[]>;
declare const _default: {
    repeatCalls: typeof repeatCalls;
};
export default _default;
//# sourceMappingURL=index.d.ts.map