import Entities from "../../../../Engine/Entities/Entities.js";

export class Player extends Entities
{
    constructor(entity_name, width, height, isControllable)
    {
        super(entity_name, width, height, isControllable);
    }

    /**
     * @override
     */
    entityInit()
    {
        this.SPEED_EASE_INC = 300 / this.getGameSpeed();
        this.SPEED_EASE_REDUCTION = 1;
        this.MAX_SPEED = 10;
        this.x = 32;

        /** Makes the movement of the character smoother. */
        this.speed_ease = {
            x: 0,
            y: 0
        };

        this.draw(this.x, 20, "rgb(66, 66, 66)");
    }

    /**
     * @override
     */
    entityStep()
    {
        const screen_h = this.getScreenWidthHeight()[1];
        const screen_w = this.getScreenWidthHeight()[0];

        // Left-right movement.
        if (this.isKeyPressed("ArrowRight")) {
            this.speed_ease.x += this.SPEED_EASE_INC;
        } else if (this.isKeyPressed("ArrowLeft")) {
            this.speed_ease.x -= this.SPEED_EASE_INC;
        } else {
            // Create smooth speed reduction effect.
            if (this.speed_ease.x > 0) {
                this.speed_ease.x = Math.max(0, this.speed_ease.x - this.SPEED_EASE_REDUCTION);
            } else {
                this.speed_ease.x = Math.min(
                    0,
                    this.speed_ease.x + this.SPEED_EASE_REDUCTION
                );
            }
        }

        // Up-down movement.
        if (this.isKeyPressed("ArrowUp")) {
            this.speed_ease.y -= this.SPEED_EASE_INC;
        } else if (this.isKeyPressed("ArrowDown")) {
            this.speed_ease.y += this.SPEED_EASE_INC;
        } else {
            // Create smooth speed reduction effect.
            if (this.speed_ease.y > 0) {
                this.speed_ease.y = Math.max(
                    0,
                    this.speed_ease.y - this.SPEED_EASE_REDUCTION
                );
            } else {
                this.speed_ease.y = Math.min(
                    0,
                    this.speed_ease.y + this.SPEED_EASE_REDUCTION
                );
            }
        }

        // Clamp values to their maximum.
        this.speed_ease.x = this.engine_math.clamp(this.speed_ease.x, -this.MAX_SPEED, this.MAX_SPEED);
        this.speed_ease.y = this.engine_math.clamp(
            this.speed_ease.y,
            -this.MAX_SPEED,
            this.MAX_SPEED
        );

        // Make the player wrap in the room in the y axis.
        // Apply our custom x and y variables to our x and y.
        this.x += this.speed_ease.x;
        this.y += this.speed_ease.y;

        this.x = this.engine_math.wrap(this.x, -40, screen_w);
        this.y = this.engine_math.wrap(this.y, -40, screen_h);
    }
}
export default Player;