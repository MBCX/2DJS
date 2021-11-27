import Entity from "../../../../Engine/Entity/Entity.js";
import MainSquare from "./main_square.js";

export class CollisionSquare1 extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.player_instance = MainSquare.getInstance();
        this.x = this.window_width / 2;
        this.y = this.window_height / 2;
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
        this.drawText(this.window_width / 2, 32, "Square collisions in 2DJS");
        if (this.has_collided) {
            this.square_colour = this.changeSquareColour("#CC0000");
            this.square_str = this.changeTextString("Collision detected!");
        } else {
            this.square_colour = this.changeSquareColour("#A54AEF");
            this.square_str = this.changeTextString("No collision so far...");
        }
        this.drawSquare(this.x, this.y, this.square_colour);
        this.drawText(this.x + 40, this.y - 20, this.square_str);
    }
}
export default CollisionSquare1;
