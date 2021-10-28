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
        this.drawText(
            this.canvas_container.width / 2,
            this.canvas_container.height / 2,
            "Hello!!",
            { font: "30px Segoe UI", align: "center" }
        );
    }
}
export default HUD;