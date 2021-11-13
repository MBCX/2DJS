export class EngineMath {
    /**
     * @param {Number} variable
     * @param {Number} min
     * @param {Number} max
     */
    clamp(variable, min, max) {
        return Math.min(max, Math.max(min, variable));
    }

    /**
     * Simple function that wraps a variable between 2 numbers.
     * REFERENCE: https://www.youtube.com/watch?v=5JZAAbyUNsQ
     *
     * @param {Number} variable
     * @param {Number} wrap_min The lowest wrapping number.
     * @param {Number} wrap_max The highest wrapping number.
     */
    wrap(variable, wrap_min, wrap_max) {
        const _limiter = (variable - wrap_min) % (wrap_max - wrap_min);
        if (0 > _limiter) {
            return _limiter + wrap_max;
        }
        return _limiter + wrap_min;
    }

    /** @public */
    degToRad(degree)
    {
        return Math.round(degree * Math.PI / 180);
    }

    /** @public */
    radToDeg(radian)
    {
        let result = Math.round(radian * 180 / Math.PI);
        return this.wrap(result, -360, 360);
    }
}
export default EngineMath;