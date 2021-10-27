/**
 * Class that handles everything related to mathematics.
 * Has from simple to complex functions.
 * @public
 */
export class EngineMath
{
    /**
     * @param {Number} value The current value to clamp from.
     * @param {Number} min Minium number.
     * @param {Number} max Maximum number.
     * @returns {Number} A number clamped between it's minimum and maximum.
     */
    clamp(value, min, max)
    {
        return Math.min(max, Math.max(min, value));
    }
}
export default EngineMath;