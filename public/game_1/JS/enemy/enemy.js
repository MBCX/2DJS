import Entities from "../../../../Engine/Entities/Entities.js";

export class Enemy extends Entities
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
        this.draw(128, 128);
    }

    /**
     * @override
     */
    entityStep()
    {

    }
}

export default Enemy;