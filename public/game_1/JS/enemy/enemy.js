import Entities from "../../../../Engine/Entities/Entities.js";
import Player from "../player/player.js";

export class Enemy extends Entities {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.drawSquare(155, 20, this.width, this.height, "rgb(200, 0, 0)");
        this.player_instance = Player.getInstance();
        console.log(this.player_instance);
    }

    /**
     * @override
     */
    entityStep() {}
}

export default Enemy;
