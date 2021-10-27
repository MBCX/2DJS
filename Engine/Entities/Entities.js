import Engine from "../Engine.js";
import { randomRGBColor } from "../shared/shared_functions.js";
import { CANVAS_GAME_ID } from "../shared/shared_variables.js";

export class Entities extends Engine
{
    constructor(entity_name, width, height, isControllable)
    {
        super();
        this.canvas_container = document.createElement("canvas");
        this.canvas_container.id = `${CANVAS_GAME_ID}-${entity_name}`;
        
        // Removes blur.
        this.canvas_container.getContext("2d").webkitImageSmoothingEnabled = false;
        this.canvas_container.getContext("2d").imageSmoothingEnabled = false;
        this.canvas_container.style.position = "absolute";

        /** @private */
        this.entities = new Map();
        this.name = entity_name;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.key_current = null;
        this.is_controllable = isControllable;
        
        /** @private */
        this.instance = null;

        this.init.bind(this)();
        this.entityInit();
    }

    /**
     * Getter that returns the game canvas element.
     * @public
     */
    canvasEl()
    {
        return this.canvas_container;
    }

    /**
     * @private
     */
    init()
    {
        this.entities.set(this.name, Math.round(Date.now() / 1000));

        if (this.is_controllable)
        {
            document.addEventListener("keydown", this.setKeyPressed.bind(this));
            document.addEventListener("keyup", this.removeKeyPressed.bind(this));
        }
        document.body.append(this.canvas_container);
    }

    /**
     * @override
     */
    gameLoop()
    {
        this.entityStep();
        this.drawShouldUpdate();
        // this.canvas_container.style.width = this.w_width + "px";
        // this.canvas_container.style.height = this.w_height + "px";
    }

    // --- Entity methods. ---

    /** @public */
    entityInit() {}

    /** @public */
    entityStep() {}

    /** @public */
    entityDestroy() {}

    // Getters.

    /** @public */
    getAllEntities()
    {
        return this.entities;
    }

    /** @public */
    getEntityId(name)
    {
        return this.entities.get(name);
    }

    /**
     * @param {Number} x X position of drawing.
     * @param {Number} y Y position for drawing.
     * @param {Number} width Drawing width.
     * @param {Number} height Drawing height.
     * @param {String} colour Colour of the drawing.
     */
    draw(x, y, colour)
    {
        let canvas = this.canvas_container.getContext("2d");
        canvas.fillStyle = ("string" == typeof colour) ? colour : randomRGBColor();

        canvas.beginPath();
        canvas.fillRect(x, y, this.width, this.height);
        canvas.fill();
        canvas.stroke();
        canvas.closePath();

        this.x = x;
        this.y = y;
    }

    /**
     * Mehtod that determines if it needs to render again
     * a specific frame of the canvas.
     * @private
     */
    drawShouldUpdate()
    {
        let canvas = this.canvas_container.getContext("2d");
        canvas.clearRect(0, 0, this.w_width, this.w_height);
        canvas.fillRect(this.x, this.y, this.width, this.width);
    }

    /**
     * Internally sets the key pressed to a variable, then returns it.
     * @param {!KeyboardEvent} e Current key pressed.
     * @public
     */
    setKeyPressed(e)
    {
        this.key_current = e.key; 
        return this.key_current;
    }

    /**
     * Internally removes the key pressed to a variable, then returns it.
     * @param {!KeyboardEvent} e Current key released.
     * @public
     */
    removeKeyPressed(e)
    {
        this.key_current = null;
    }

    static getInstance()
    {
        return this.instance ?? (this.instance = new this(this.name, this.width, this.height, this.is_controllable));
    }
}

export default Entities;