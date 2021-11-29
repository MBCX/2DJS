import Entity from "../../../../../Engine/Entity/Entity.js";

export class MultiTextRender extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.random_number = this.engine_math.randomNumber();
        setInterval(this.generatorTimeout.bind(this), 1000);
    }

    generatorTimeout() {
        this.random_number = this.engine_math.randomNumber();
    }

    /**
     * @override
     */
    entityDraw() {
        this.drawText(
            this.window_width / 2,
            32,
            "Multi-text rendering in 2DJS"
        );
        this.drawText(128, 128, "Multiple numbers.");
        this.drawText(128, 150, this.random_number);
    }
}
export default MultiTextRender;
