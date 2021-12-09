/**
 * Magic number used as seed for the custom pseudo-random
 * number generator. It comes from the following formula:
 *
 * f(x) = 1 / 3^n. Where n is 4.
 * (Original value is 0.012345679012345678)
 * @private
 */
const MAGIC_NUMBER = 123456790;
let generator_seed = MAGIC_NUMBER;

export class EngineMath {
    
    /**
     * @param {Number} variable
     * @param {Number} min
     * @param {Number} max
     * @public
     */
    clamp(variable, min, max) {
        return Math.min(max, Math.max(min, variable));
    }

    /**
     * Simple function that wraps a variable between 2 values.
     * REFERENCE: https://www.youtube.com/watch?v=5JZAAbyUNsQ
     *
     * @param {Number} variable
     * @param {Number} wrap_min The lowest wrapping number.
     * @param {Number} wrap_max The highest wrapping number.
     * @public
     */
    wrap(variable, wrap_min, wrap_max) {
        const _limiter = (variable - wrap_min) % (wrap_max - wrap_min);
        if (0 > _limiter) {
            return _limiter + wrap_max;
        }
        return _limiter + wrap_min;
    }

    /** @public */
    degToRad(degree) {
        return (degree * Math.PI) / 180;
    }

    /** @public */
    radToDeg(radian) {
        let result = (radian * 180) / Math.PI;
        return this.wrap(result, -360, 360);
    }

    /**
     * Sine waves a value between 2 values over a given time.
     * REFERENCE: https://www.youtube.com/watch?v=5JZAAbyUNsQ
     * @param {Number} from
     * @param {Number} to
     * @param {Number} duration How long will this take to wave from these 2 values?
     * @param {Number} offset
     * @public
     */
    wave(from, to, duration, offset = 1) {
        const _difference = (to - from) * 0.5;
        return (
            from +
            _difference +
            Math.sin(
                ((Date.now() * 0.001 + duration * offset) / duration) *
                    (Math.PI * 2)
            ) *
                _difference
        );
    }

    /**
     * Move a given value towards another value by a given amount.
     * REFERENCE: https://www.youtube.com/watch?v=5JZAAbyUNsQ
     * @param {Number} first_value
     * @param {Number} second_value
     * @param {Number} at_amount
     * @public
     */
    approach(first_value, second_value, at_amount) {
        if (first_value < second_value) {
            first_value += at_amount;
            if (first_value > second_value) return second_value;
        } else {
            first_value -= at_amount;
            if (first_value < second_value) return second_value;
        }
        return first_value;
    }

    /**
     * A custom pseudo-random number generator with better entropy.
     * Serves as a replacement of Math.random() using Date and performance.
     * @param {Number} randomNumberLimit Limit how far you want to generate numbers.
     * @returns A pseudo-random number with enough entropy.
     * @public
     */
    randomNumber(randomNumberLimit = 255) {
        const main_entropy = Math.abs((
            Date.now() +
            performance.now() / performance.timeOrigin +
            Math.PI
        ) - MAGIC_NUMBER);

        const changeSeed = () =>
        {
            const date = new Date();
            const _current_date_seed = date.getSeconds();
            const _current_performance = Math.floor(performance.now() / 1000);
            const _combined_number = this.combined_numbers_between(
                randomNumberLimit,
                _current_date_seed,
                _current_performance
            );
            const _noise = this.wave(
              date.getMinutes() * Math.PI,
              (_current_date_seed + main_entropy + _combined_number) %
                randomNumberLimit,
              main_entropy % randomNumberLimit
            );
            generator_seed = generator_seed + (_noise - (_combined_number * _current_date_seed) + _noise)

            console.log(generator_seed)
            return generator_seed;
        }
        return Math.floor(main_entropy * changeSeed()) % randomNumberLimit;
    }

    /**
     * Returns a number from the combination of numbers of length n.
     * @param {...Number} n Combination of numbers.
     * @public
     */
    combined_numbers_between(...n)
    {
        // p = previousValue
        // c = currentValue
        // n = newValue
        const numbers_combined = n.reduce((p, c, n) => {
            return (p | c | n);
        });
        return numbers_combined;
    }

    /**
     * Allows you to generate a set of random numbers between
     * a certain minimum and maximum range.
     * @param {Number} min
     * @param {Number} max
     * @public
     */
    randomNumberBetween(min, max) {
        return this.randomNumber(max - min + 1);
    }
}
export default EngineMath;
