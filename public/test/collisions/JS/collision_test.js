import { Entity } from "../../../../Engine/Entity/Entity.js";

export class MainSquare extends Entity
{
    constructor(entity_name, width, height, controls) {
        super(entity_name, width, height, controls);
    }

    /**
     * @override
     */
    entityInit()
    {
        this.PLAYER_SPEED = 0.75;
        this.x = 32;
        this.y = 32;
    }

    /**
     * @override
     */
    entityStep()
    {
        // Simple movement.
        if (this.isKeyPressed("ArrowLeft"))
        {
            this.x -= this.PLAYER_SPEED * this.getDeltaTime();
        }
        else if (this.isKeyPressed("ArrowRight"))
        {
            this.x += this.PLAYER_SPEED * this.getDeltaTime();
        }
        else if (this.isKeyPressed("ArrowUp"))
        {
            this.y -= this.PLAYER_SPEED * this.getDeltaTime();
        }
        else if (this.isKeyPressed("ArrowDown"))
        {
            this.y += this.PLAYER_SPEED * this.getDeltaTime();
        }
    }

    /**
     * @override
     */
    entityDraw()
    {
        this.drawSquare(this.x, this.y, "#4285F4");
    }
}
export default MainSquare;