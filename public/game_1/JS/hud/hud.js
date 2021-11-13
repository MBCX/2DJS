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
            64,
            32,
            "This text is huuuuuuge",
            { fontSizeBase: 60, align: "right" }
        );
    }

    /**
     * @override
     */
    entityStep()
    {

    }
}
export default HUD;