import Entity from "../../../../../Engine/Entity/Entity.js";

export class MultiTextRender extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.text_array = [
            "Random text",
            "aihfahifoishaf",
            "Yes",
            "Hope this works",
            "Yoooojooooo"
        ];
        this.random_number = this.engine_math.randomNumber();
        this.random_text_index = this.engine_math.randomNumber(this.text_array.length);
        setInterval(this.generatorTimeout.bind(this), 1000);
    }

    /** @private */
    generatorTimeout() {
        this.random_number = this.engine_math.randomNumber();
        this.random_text_index = this.engine_math.randomNumber(
            this.text_array.length
        );
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
        this.drawText(128 * 2, 128, "Multiple texts");
        this.drawText(128 * 2, 150, this.text_array[this.random_text_index]);
    }
}
export default MultiTextRender;
