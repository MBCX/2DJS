import Entity from "../../../../../Engine/Entity/Entity.js";

export class TestImageDrawing extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityDraw() {
        this.drawText(this.window_width / 2, 32, "Image rendering in 2DJS");
        this.drawStaticImage(
            "./img/chemicalsister-character.gif",
            400,
            400,
            200,
            200
        );
        this.drawStaticImage(
            "./img/outline_javascript_black_48dp.png",
            128,
            128,
            this.window_width / 2,
            this.window_height / 2
        );
        this.drawStaticImage(
            "./img/cursor_test_img.png",
            24,
            24,
            this.mouse_x,
            this.mouse_y
        );
    }
}
export default TestImageDrawing;
