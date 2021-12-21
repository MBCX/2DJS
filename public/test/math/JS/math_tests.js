import Entity from "../../../../Engine/Entity/Entity.js";

export class MathTest extends Entity {
    constructor(name, width, height) {
        super(name, width, height);
    }

    /** @override */
    entityInit() {
        this.random_ping = this.engine_math.randomNumberBetween(1000, 9999);
    }

    /** @override */
    entityDraw() {
        this.drawText(
            this.window_width / 2,
            32,
            "Testing math functions in 2DJS"
        );
        this.drawText(
            this.window_width / 2,
            68,
            `Smallest number between -10, 0, 5 and 10: ${this.engine_math.min(
                -10,
                0,
                5,
                10
            )}`
        );
        this.drawText(
            this.window_width / 2,
            96,
            `Biggest number between -10, 0, 5 and 10: ${this.engine_math.max(
                -10,
                0,
                5,
                10
            )}`
        );
        this.drawText(
            this.window_width / 2,
            128,
            `Rounded number of 10.5: ${this.engine_math.round(10.5)}`
        );
        this.drawText(
            this.window_width / 2,
            156,
            `Random 4 ping number: ${this.random_ping}`
        );
        this.drawText(
            this.window_width / 2,
            180,
            `The power of 5 by 3 is: ${this.engine_math.pow(5, 3)}`
        );
        this.drawText(
            this.window_width / 2,
            205,
            `The square root of 10 is: ${this.engine_math.sqrt(6)}`
        );
        this.drawText(
            this.window_width / 2,
            230,
            `The natural logarithim of 20 is: ${this.engine_math.log(20)}`
        );
        this.drawText(
            this.window_width / 2,
            250,
            `exp(3): ${this.engine_math.exp(3)}`
        );
    }
}
export default MathTest;
