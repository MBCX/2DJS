import Entities from "../../../../Engine/Entities/Entities.js";

export class HUD extends Entities {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /** @public */
    entityInit()
    {
        this.test = 0;
    }

    /**
     * @override
     */
    entityStep() {
        const screen_w = this.getScreenWidthHeightArray()[0];

        this.updateImageAndText();

        this.test += 1;
        this.y = this.engine_math.radToDeg(this.test);
        console.log(this.y);
    }

    /** @private */
    updateImageAndText() {
        // this.drawImage("./img/cursor_test_img.png", 200, 200, this.mouse_x, this.mouse_y);
        this.drawText(this.mouse_x, this.y, "ONE MORE TEXT!!!!");
        this.drawText(this.mouse_x, this.y, "YES");
    }
}
export default HUD;
