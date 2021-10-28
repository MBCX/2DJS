import Entities from "../../../../Engine/Entities/Entities.js";

export class HUD extends Entities {
    constructor(entity_name, width, height, isControllable) {
        super(entity_name, width, height, isControllable);
    }

    /**
     * @override
     */
    entityInit()
    {
        this.drawText(32, 32, "Hello!!", { font: "30px Segoe UI" });
    }
}
export default HUD;