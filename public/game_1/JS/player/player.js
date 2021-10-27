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
        this.x = 32;
        this.draw(this.x, 20, "rgb(66, 66, 66)");
    }

    /**
     * @override
     */
    entityStep()
    {
        if ("ArrowRight" === this.key_current)
        {
            this.x += 100 / this.getGameSpeed();
        }
        else if ("ArrowLeft" === this.key_current)
        {
            this.x -= 100 / this.getGameSpeed();
        }
        else if ("ArrowUp" === this.key_current)
        {
            this.y -= 100 / this.getGameSpeed();
        }
        else if ("ArrowDown" === this.key_current)
        {
            this.y += 100 / this.getGameSpeed();
        }
    }
}
export default Player;