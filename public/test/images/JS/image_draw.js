import Entity from "../../../../Engine/Entity/Entity.js";

export class TestImageDrawing extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityDraw() {
        this.drawText(this.window_width / 2, 32, "Image rendering in 2DJS");
        this.drawImage(
            "./img/cursor_test_img.png",
            200,
            200,
            this.mouse_x,
            this.mouse_y
        );
        this.drawImage(
            "./img/outline_javascript_black_48dp.png",
            200,
            200,
            this.window_width / 2,
            this.window_height / 2
        );
    }
}
export default TestImageDrawing;
