/**
 * Utility methods for greatest common divisor and least common multiple.
 */
export class NumberTheoryUtils {
    /**
     * Returns the greatest common divisor of two integers.
     * Uses the Euclidean algorithm.
     *
     * @param a The first integer.
     * @param b The second integer.
     * @returns The greatest common divisor of a and b.
     */
    public static gcd(a: number, b: number): number {
        a = Math.abs(Math.trunc(a));
        b = Math.abs(Math.trunc(b));

        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }

        return a;
    }

    /**
     * Returns the least common multiple of two integers.
     *
     * @param a The first integer.
     * @param b The second integer.
     * @returns The least common multiple of a and b.
     */
    public static lcm(a: number, b: number): number {
        a = Math.trunc(a);
        b = Math.trunc(b);

        if (a === 0 || b === 0) {
            return 0;
        }

        return Math.abs(a * b) / this.gcd(a, b);
    }
}