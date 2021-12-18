import Entity from "../../../../../Engine/Entity/Entity.js";

export class TestTextDrawing extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.move_text_x = 0;
    }

    /**
     * @override
     */
    entityStep() {
        this.move_text_x += 0.25 * this.getDeltaTime();
        this.move_text_x = this.engine_math.wrap(
            this.move_text_x,
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
        );
        
        this.drawText(
            this.window_width / 2,
            64,
            "All text can be independently manipulated."
        );
        
        this.drawText(
            this.move_text_x,
            this.window_height / 2,
            "This text is independent"
        );
        
        this.drawText(
            128,
            this.engine_math.wave(64, this.window_height / 2, 2) + 64,
            "The wave function is so much fun!!!"
        );

        this.drawText(
            this.engine_math.cos(performance.now() / 100) * 12 + 256,
            this.window_height / 2 + 30,
            "Not as much as the cosine!!!"
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
