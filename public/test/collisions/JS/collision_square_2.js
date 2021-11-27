import Entity from "../../../../Engine/Entity/Entity.js";
import MainSquare from "./main_square.js";

export class CollisionSquare2 extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.player_instance = MainSquare.getInstance();
        this.x = 128;
        this.y = 256;
        this.has_collided = false;
    }

    /**
     * @override
     */
    entityStep() {
        this.has_collided = this.engine_physics.collisionBetween(
            this.x,
            this.y,
            this.player_instance.x,
            this.player_instance.y,
            this.entity_width - 15
        );

        if (this.has_collided) {
            this.entityDestroy();
        }
    }

    /**
     * @override
     */
    entityDraw() {
        this.drawSquare(this.x, this.y, "#083A9D");
    }
}
export default CollisionSquare2;