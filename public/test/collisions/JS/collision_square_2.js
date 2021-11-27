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
        this.square_colour = "";
        this.square_str = "";
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
    }

    /**
     * @override
     */
    entityDraw() {
        if (this.has_collided) {
            this.square_colour = this.changeSquareColour("#900000");
            this.square_str = this.changeTextString("Collision detected!");
        } else {
            this.square_colour = this.changeSquareColour("#C6729D");
            this.square_str = this.changeTextString("No collision so far...");
        }
        this.drawSquare(this.x, this.y, this.square_colour);
        this.drawText(this.x + 40, this.y - 30, this.square_str);
    }
}
export default CollisionSquare2;