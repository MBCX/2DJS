import Entity from "../../../../Engine/Entity/Entity.js";

export class MathTest extends Entity
{
    constructor(name, width, height) {
        super(name, width, height);
    }

    /** @override */
    entityDraw() {
        this.drawText(this.window_width / 2, 32, "Testing math functions in 2DJS");
        this.drawText(
            this.window_width / 2,
            68,
            `Smallest number between -10, 0, 5 and 10: ${this.engine_math.min(-10, 0, 5, 10)}`
        );
        this.drawText(
            this.window_width / 2,
            96,
            `Biggest number between -10, 0, 5 and 10: ${this.engine_math.max(-10, 0, 5, 10)}`
        );
        this.drawText(
            this.window_width / 2,
            128,
            `Rounded number of 10.5: ${this.engine_math.round(10.3)}`
        );
    }
}
export default MathTest;