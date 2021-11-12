import Entities from "../../../../Engine/Entities/Entities.js";

export class HUD extends Entities {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit()
    {
        this.drawText(
            this.screen_width / 2,
            this.screen_height / 2,
            "Let's change this text and see if it scales.",
            { fontName: "Segoe UI", fontSizeBase: 90 }
        );
    }

    /**
     * @override
     */
    entityStep()
    {
        // console.log(this.x);
    }
}
export default HUD;