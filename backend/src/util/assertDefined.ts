export function assertDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected value to be defined, received " + val);
    }
}