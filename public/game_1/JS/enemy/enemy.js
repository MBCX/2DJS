import Entities from "../../../../Engine/Entities/Entities.js";

export class Enemy extends Entities
{
    constructor(entity_name, width, height)
    {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit()
    {
        this.drawSquare(128, 128);
    }

    /**
     * @override
     */
    entityStep()
    {

    }
}

export default Enemy;