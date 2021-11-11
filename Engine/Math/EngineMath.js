/**
 * Class that handles everything related to mathematics.
 * Has from simple to complex functions.
 * @public
 */
export class EngineMath {
    /**
     * @param {Number} value The current value to clamp from.
     * @param {Number} min Minium number.
     * @param {Number} max Maximum number.
     * @returns {Number} A number clamped between it's minimum and maximum.
     */
    clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    /**
     * Simple function that wraps a variable between 2 numbers. So if the
     * value is lower than the minimum, it goes back to the maximum. If it's
     * greater than the maximum, it goes back to the minimum.
     * REFERENCE: https://www.youtube.com/watch?v=5JZAAbyUNsQ
     * @param {Number} value The variable to wrap from.
     * @param {Number} wrap_min The lowest value this variable can wrap.
     * @param {Number} wrap_max The highest value this variable can wrap.
     * @returns The variable wrapped between a min and maximum.
     */
    wrap(value, wrap_min, wrap_max) {
        let _limiter = (value - wrap_min) % (wrap_max - wrap_min);
        if (0 > _limiter) {
            return _limiter + wrap_max;
        }
        return _limiter + wrap_min;
    }
}
export default EngineMath;