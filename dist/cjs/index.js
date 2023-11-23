"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeatCalls = void 0;
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
function repeatCalls({ functionToExecute, totalCalls, chunkSize, delaySeconds, payloadArray }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasPayload = Array.isArray(payloadArray);
        const defaultTotalCalls = totalCalls !== null && totalCalls !== void 0 ? totalCalls : ((hasPayload ? payloadArray === null || payloadArray === void 0 ? void 0 : payloadArray.length : 0) || 0);
        const allResults = [];
        for (let i = 0; i < defaultTotalCalls; i += chunkSize) {
            const results = [];
            const chunkStart = i;
            const chunkEnd = Math.min(i + chunkSize, defaultTotalCalls);
            const chunk = hasPayload
                ? payloadArray === null || payloadArray === void 0 ? void 0 : payloadArray.slice(chunkStart, chunkEnd)
                : Array.from({ length: chunkEnd - chunkStart }, (_, j) => j + chunkStart);
            const chunkPromises = (chunk !== null && chunk !== void 0 ? chunk : []).map((args) => Promise.resolve(functionToExecute(...(Array.isArray(args) ? args : [args]))).catch((error) => Promise.reject(error)));
            const chunkResults = yield Promise.all(chunkPromises);
            results.push(...chunkResults);
            if (i + chunkSize < defaultTotalCalls && delaySeconds > 0) {
                yield new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));
            }
            allResults.push(...results);
        }
        return allResults;
    });
}
exports.repeatCalls = repeatCalls;
exports.default = { repeatCalls };
