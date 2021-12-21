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
    PI = 3.1415926535897932384626433832795;
    HALF_PI = this.PI / 2;
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
            return n[1] > n[0] ? n[0] : n[1];
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
            return n[1] < n[0] ? n[0] : n[1];
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
     * Returns the middle centre number of a given
     * (automatically) organised number list of size n.
     * Example: (43, 12, 25, 19, 6) returns 19 as its middle centre number,
     * because organised from smallest to largest (6, 12, 19, 25, 43) 19
     * is the centre number.
     * @param  {...Number} n List of numbers to find its centre number.
     */
    median(...n) {
        if (1 === n.length) {
            return n;
        }
        const organised_number_list = [];
        let lowest_number = 0;

        for (let i = n.length; 0 < i; --i)
        {
            lowest_number = (1 === n.length) ? n[0] : this.min(...n);
            organised_number_list.push(lowest_number);
            const index_of_found_lowest_number = n.indexOf(lowest_number);

            if (1 === n.length) {
                n.pop();
            } else {
                n.splice(index_of_found_lowest_number, 1);
            }
        }
        // We round the index number down because it
        // may result in decimal numbers. (i.e, 2.5).
        return organised_number_list[this.floor(organised_number_list.length / 2)];
    }

    /**
     * Rounds the number up or down if the given number
     * has a decimal value above 0.5.
     * i.e, round(1.2) -> 1, round(1.5) -> 2.
     * @param {Number} variable
     * @public
     */
    round(variable) {
        const close_to_one = variable % 1;
        return 0.5 >= close_to_one ? variable + 0.5 : variable - close_to_one;
    }

    /**
     * Removes the decimals of a variable, but
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
        return 0 > variable ? -variable : variable;
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

        if (0.5 >= x) {
            const t = 2 * x * (2 * x - 1);
            return (this.PI * t) / ((this.PI - 4) * t - 1);
        }
        const t = 2 * (1 - x) * (1 - 2 * x);
        return -(this.PI * t) / ((this.PI - 4) * t - 1);
    }

    /**
     * Returns 1, -1 or 0 if the value is positive, negative
     * or 0.
     * @param {Number} value
     */
    sign(value) {
        return (0 <= value) ? 1 : (value < 0 ? -1 : 0);
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
     * Retuns the number of power n based on
     * Euler's number.
     * @param {Number} n
     */
    exp(n) {
        return this.pow(this.E, n);
    }

    /**
     * Returns the square root of a given
     * positive number.
     * @param {Number} x
     * @public
     */
    sqrt(x) {
        if (0 > x) {
            console.error(
                "The number to find its square root cannot be negative."
            );
            return;
        }

        // TODO: There may be a better and more
        // performant way to find it.
        let result = this.sqr(x) / x;
        if (Number.isInteger(result)) {
            return result;
        }
    }

    /**
     * REFERENCE: https://stackoverflow.com/questions/9799041/efficient-implementation-of-natural-logarithm-ln-and-exponentiation
     * @param {Number} x
     * @param {Number} elipsion The minimum precision. The lower, the less precise.
     */
    ln(x, elipsion = 2) {
        let y_n = x - 1.0;
        let y_n1 = y_n;

        do {
            y_n = y_n1;
            y_n1 = y_n + 2 * (x - this.exp(y_n)) / (x + this.exp(y_n));
        }
        while (this.abs(y_n - y_n1) > elipsion);
        return y_n1;
    }

    log(x, n, elipsion) {
        return this.ln(x) / this.ln(n);
    }

    /**
     * Returns the result of multipling the given
     * number twice.
     * @param {Number} n
     * @public
     */
    sqr(n) {
        return n * n;
    }

    /**
     * Returns a number by multipling x by n times.
     * @param {Number} x
     * @param {Number} n
     * @public
     */
    pow(x, n) {
        if (0 > x) {
            console.error(
                "The number for finding its power cannot be negative."
            );
            return;
        }
        let result = x;

        for (let i = 1; n > i; ++i) {
            result *= x;
        }
        return result;
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
    radToDeg(radian, autowrap = false) {
        let result = 180 / this.PI * radian;
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
     * A custom pseudo-random single number generator with enough entropy.
     * Serves as a replacement of Math.random() using Date class
     * and performance global object.
     * @param {Number} randomNumberLimit Limit how far you want to generate numbers.
     * @public
     */
    randomNumber(randomNumberLimit = 255) {
        const date = new Date();
        const main_entropy = (this.abs(
            Date.now() +
            performance.now() / performance.timeOrigin +
            this.PI
        ) - MAGIC_NUMBER);

        const changeSeed = () => {
            const current_date_seed = date.getSeconds();
            const current_performance = this.floor(performance.now() / 1000);
            const combined_number = this.combined_number_between(
                randomNumberLimit,
                current_date_seed,
                current_performance
            );
            const noise = this.wave(
                0 === date.getMinutes()
                    ? 1 * this.PI
                    : date.getMinutes() * this.PI,
                (current_date_seed + combined_number),
                main_entropy - combined_number + current_performance
            );
            number_seed = number_seed + (combined_number * current_date_seed) / noise;
            return number_seed;
        };
        return this.floor(main_entropy * changeSeed()) % randomNumberLimit;
    }

    /**
     * Returns a number from the combination of numbers of length n.
     * @param {...Number} n Combination of numbers.
     * @public
     */
    combined_number_between(...n) {
        // p = previousValue
        // c = currentValue
        // n = newValue
        const numbers_combined = n.reduce((p, c, n) => {
            return p | c | n;
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
        // Little fix for if the generated number
        // is less than the min or greater than the
        // maximum.
        let result = 0;

        // This handles the edge case where the developer
        // might have the minimum number be larger than the
        // maximum. i.e, (-10, 0).
        if (min < max) {
            while (min > result) {
                result = this.randomNumber(max - min + min);   
            }
        } else {
            while (max > result) {
                result = this.randomNumber(min + max - max);
            }
        }
        
        return result;
    }
}

Object.freeze(EngineMath);
export default EngineMath;
