import Entities from "../../../../Engine/Entities/Entities.js";

export class Player extends Entities {
    constructor(entity_name, width, height, controls) {
        super(entity_name, width, height, controls);
    }

    /**
     * @override
     */
    entityInit() {
        this.CUSTOM_COORDS_INC = this.getDeltaTime();
        this.CUSTOM_COORDS_DEC = 1;
        this.MAX_SPEED = 10;
        this.x = 32;
        this.custom_coords = {
            x: 0,
            y: 0,
        };

        this.drawSquare(
            this.x,
            20,
            this.width,
            this.height,
            "rgb(48, 97, 176)"
        );
    }

    /**
     * @override
     */
    entityStep() {
        const screen_h = this.getScreenWidthHeightArray()[1];
        const screen_w = this.getScreenWidthHeightArray()[0];

        if (this.isKeyPressed("ArrowRight")) {
            this.custom_coords.x += this.CUSTOM_COORDS_INC;
        } else if (this.isKeyPressed("ArrowLeft")) {
            this.custom_coords.x -= this.CUSTOM_COORDS_INC;
        } else {
            // Create smooth easing effect.
            if (this.custom_coords.x > 0) {
                this.custom_coords.x = Math.max(
                    0,
                    this.custom_coords.x - this.CUSTOM_COORDS_DEC
                );
            } else {
                this.custom_coords.x = Math.min(
                    0,
                    this.custom_coords.x + this.CUSTOM_COORDS_DEC
                );
            }
        }

        if (this.isKeyPressed("ArrowUp")) {
            this.custom_coords.y -= this.CUSTOM_COORDS_INC;
        } else if (this.isKeyPressed("ArrowDown")) {
            this.custom_coords.y += this.CUSTOM_COORDS_INC;
        } else {
            // Create smooth easing effect.
            if (this.custom_coords.y > 0) {
                this.custom_coords.y = Math.max(
                    0,
                    this.custom_coords.y - this.CUSTOM_COORDS_DEC
                );
            } else {
                this.custom_coords.y = Math.min(
                    0,
                    this.custom_coords.y + this.CUSTOM_COORDS_DEC
                );
            }
        }

        this.custom_coords.x = this.engine_math.clamp(
            this.custom_coords.x,
            -this.MAX_SPEED,
            this.MAX_SPEED
        );
        this.custom_coords.y = this.engine_math.clamp(
            this.custom_coords.y,
            -this.MAX_SPEED,
            this.MAX_SPEED
        );

        this.x = this.engine_math.wrap(this.x, -40, screen_w);
        this.y = this.engine_math.wrap(this.y, -40, screen_h);

        this.x += this.custom_coords.x;
        this.y += this.custom_coords.y;
    }
}
export default Player;
