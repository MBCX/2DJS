/**
 * Magic number used as seed for the custom pseudo-random
 * number generator. It comes from the following formula:
 *
 * f(x) = 1 / 3^n. Where n is 4.
 * (Original value is 0.012345679012345678)
 * @private
 */
const MAGIC_NUMBER = 123456790;
let number_seed = MAGIC_NUMBER;

export class EngineMath {
    PI = 3.14159265358979323846264338327950;
    E = 2.718281828459045235360287471352662;
    INVPI = 0.31830988618379067153776752674502872;

    /**
     * A custom implementation of Math.min() that returns the 
     * lowest number of length n.
     * @param  {...Number} n Array of numbers to determine the smallest of.
     */
     min(...n) {
        if (1 === n.length) {
            return n;
        } else if (2 === n.length) {
            return (
                (n[1] > n[0]) ? n[0] : n[1]
            );
        } else {
            let smallest_number = n[0];

            for (let i = 0; n.length > i; ++i) {
                if (n[i] < smallest_number) {
                    smallest_number = n[i];
                }
            }
            return smallest_number;
        }
    }

    /**
     * A custom implementation of Math.max() that returns the 
     * biggest number of length n.
     * @param  {...Number} n Array of numbers to determine the biggest of.
     */
    max(...n) {
        if (1 === n.length) {
            return n;
        } else if (2 === n.length) {
            return (
                (n[1] < n[0]) ? n[0] : n[1]
            );
        } else {
            let biggest_number = n[0];

            for (let i = 0; n.length > i; ++i) {
                if (n[i] > biggest_number) {
                    biggest_number = n[i];
                }
            }
            return biggest_number;
        }
    }

    /**
     * Rounds the number up or down if the given number
     * (variable) has a decimal value above 0.5.
     * i.e, round(1.2) -> 1, round(1.5) -> 2. 
     * @param {Number} variable
     * @public
     */
    round(variable) {
        const close_to_one = variable % 1;
        return (close_to_one >= 0.5) ? variable + 0.5 : variable - close_to_one;
    }

    /**
     * Removes the decimasl of a variable, but
     * always returns it's lowest integer.
     * i.e, floor(1.5) -> 1, floor(1.9) -> 1.
     * @param {Number} variable
     * @public
     */
    floor(variable) {
        const close_to_one = variable % 1;
        return variable - close_to_one;
    }

    /**
     * Removes the decimals of a variable, but 
     * always returns it's next integer.
     * i.e, ceil(1.1) -> 2, ceil(2.001) -> 3.
     * @param {Number} variable
     * @public
     */
    ceil(variable) {
        const close_to_one = variable % 1;
        return variable + close_to_one;
    }

    /**
     * Always returns the positive of a given number.
     * @param {Number} variable
     * @public
     */
    abs(variable) {
        return (0 > variable) ? -variable : variable;
    }

    /**
     * A somewhat fast aproximation of sine with enough precision.
     * REFERENCE: https://i.stack.imgur.com/RGRAv.png
     * @param {Number} x
     * @public
     */
    sin(x) {
        x /= 2 * this.PI;
        x -= this.floor(x);

        if (x <= 0.5) {
            const t = 2 * x * (2 * x - 1);
            return (this.PI * t) / ((this.PI - 4) * t - 1);
        }
        const t = 2 * (1 - x) * (1 - 2 * x);
        return -(this.PI * t) / ((this.PI - 4) * t - 1);
    }

    /**
     * A somewhat fast aproximation of cos with enough precision.
     * @param {Number} x
     * @public
     */
    cos(x) {
        return this.sin(x + 0.5 * this.PI);
    }

    /**
     * By giving it a minimum and a maximum value,
     * the given variable won't go lower than the
     * minimum, but it also can't go bigger than the
     * maximum.
     * @param {Number} variable
     * @param {Number} min
     * @param {Number} max
     * @public
     */
    clamp(variable, min, max) {
        return this.min(max, this.max(min, variable));
    }

    /**
     * Simple method that wraps a variable between 2 values.
     * REFERENCE: https://www.youtube.com/watch?v=5JZAAbyUNsQ
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

    /**
     * Simple method that converts from
     * degrees to radians.
     * @param {Number} degree
     * @public
     */
    degToRad(degree) {
        return (degree * this.PI) / 180;
    }

    /**
     * Simple method that converts from
     * radians to degrees.
     * @param {Number} radian
     * @param {Boolean} autowrap Do you want automatically wrap between -360 and 360 degrees?
     * @public
     */
    radToDeg(radian, autowrap) {
        let result = (radian * 180) / this.PI;
        if (autowrap) {
            return this.wrap(result, -360, 360);
        }
        return result;
    }

    /**
     * Sine waves a value between 2 values over a given time.
     * REFERENCE: https://www.youtube.com/watch?v=5JZAAbyUNsQ
     * @param {Number} from
     * @param {Number} to
     * @param {Number} duration How long will it take to wave from these 2 values?
     * @param {Number} offset
     * @public
     */
    wave(from, to, duration, offset = 1) {
        const _difference = (to - from) * 0.5;
        return (
            from +
            _difference +
            this.sin(
                ((Date.now() * 0.001 + duration * offset) / duration) *
                    (this.PI * 2)
            ) * _difference
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
     * Serves as a replacement of Math.random() using Date class
     * and performance global object.
     * @param {Number} randomNumberLimit Limit how far you want to generate numbers.
     * @public
     */
    randomNumber(randomNumberLimit = 255) {
        const main_entropy = Math.abs((
            Date.now() +
            performance.now() / performance.timeOrigin +
            this.PI
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
                (date.getMinutes() === 0) ?
                    1 * this.PI :
                    date.getMinutes() * this.PI,
              (_current_date_seed + main_entropy + _combined_number) %
                randomNumberLimit,
              main_entropy % randomNumberLimit
            );
            number_seed = number_seed + ((_combined_number * _current_date_seed) / _noise);
            return number_seed;
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
        // This handles the edge case where the developer
        // might have the min number be larger than the
        // max number. i.e, (-10, 0)
        if (min < max) {
            return this.randomNumber(max - min) + min;
        }
        return this.randomNumber(min + max) + max;
    }
}

Object.freeze(EngineMath);
export default EngineMath;
