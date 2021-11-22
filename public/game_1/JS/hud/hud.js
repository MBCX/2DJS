import Entities from "../../../../Engine/Entities/Entities.js";

export class HUD extends Entities {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.drawText(200, 144, "Another text rendeting test.");
        this.drawText(64, 32, "This is a text rendering test.");
        this.drawText(128, 64, "Another text rendeting test.");
        this.drawText(159, 333, "ONE MORE TEXT!!!!");
    }

    /**
     * @override
     */
    entityStep() {
        const screen_w = this.getScreenWidthHeightArray()[0];
        
        this.x++;
        this.updateImage();
        
        this.x = this.engine_math.wrap(this.x, -40, screen_w);
    }

    /** @private */
    updateImage() {
        this.drawImage("./img/cursor_test_img.png", 200, 200, this.x, 128);
    }
}
export default HUD;
