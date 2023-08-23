/**
 * @description
 * Maximum valid number of values is 20. Values from index 20 above won't be evaluated.
 * const MAXIMUM_ALLOWED_ITERATION = 20;
 */
export default function coalesce<T = unknown>(...values: T[]): T | undefined;
