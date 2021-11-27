import Entity from "../../../../Engine/Entity/Entity.js";
import MainSquare from "./main_square.js";

export class CollisionSquare extends Entity {
    constructor(entity_name, width, height, controls) {
        super(entity_name, width, height, controls);
    }

    /**
     * @override
     */
    entityInit() {
        this.player_instance = MainSquare.getInstance();
        this.collided_colour = "#A54AEF";
        this.x = this.window_width / 2;
        this.y = this.window_height / 2;
    }

    /**
     * @override
     */
    entityStep() {
        const hasCollided = this.engine_physics.collisionBetween(
            this.x,
            this.y,
            this.player_instance.x,
            this.player_instance.y,
            this.entity_width - 5
        );

        if (hasCollided) {
            this.collided_colour = "#CC0000";
        } else {
            this.collided_colour = "#A54AEF";
        }
    }

    /**
     * @override
     */
    entityDraw() {
        this.drawSquare(
            this.x,
            this.y,
            this.collided_colour
        );
    }
}
export default CollisionSquare;
