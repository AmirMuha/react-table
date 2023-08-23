const MAXIMUM_ALLOWED_ITERATION = 20;
function getItemValue<T>(itemIndex = 0, ...values: T[]): T | undefined {
  if (itemIndex <= MAXIMUM_ALLOWED_ITERATION - 1) {
    return values[itemIndex]
      ? values[itemIndex]
      : getItemValue(itemIndex + 1, ...values);
  } else return undefined;
}
/**
 * @description
 * Maximum valid number of values is 20. Values from index 20 above won't be evaluated.
 * const MAXIMUM_ALLOWED_ITERATION = 20;
 */
export default function coalesce<T = unknown>(...values: T[]): T | undefined {
  return getItemValue(1, ...values);
}
