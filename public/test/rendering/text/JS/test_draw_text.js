import Entity from "../../../../../Engine/Entity/Entity.js";

export class TestTextDrawing extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.wrap_text_x = 0;
        this.wave_text_y = 0;
        this.rotate_text = 0;
    }

    /**
     * @override
     */
    entityStep() {
        this.wrap_text_x += 2;
        this.rotate_text += 1 / this.getDeltaTime();

        this.wave_text_y = this.engine_math.wave(64, this.window_height / 2, 2);
        this.wrap_text_x = this.engine_math.wrap(
            this.wrap_text_x,
            -60,
            this.window_width + 60
        );
    }

    /**
     * @override
     */
    entityDraw() {
        this.drawText(
            this.window_width / 2,
            32,
            "Text rendering in 2DJS"
        )
        this.drawText(
            this.wrap_text_x,
            this.window_height / 2,
            "This text is independent"
        );
        this.drawText(
            128,
            this.wave_text_y + 64,
            "This one is also independent!!!"
        );

        this.drawText(
            this.mouse_x,
            this.mouse_y - 10,
            "I follow your mouse up!"
        );

        this.drawText(
            this.mouse_x,
            this.mouse_y + 30,
            "I follow your mouse down!"
        );
    }
}

export default TestTextDrawing;
