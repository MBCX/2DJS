import { CANVAS_GAME_ID } from "./shared/shared_variables.js";

/**
 * Main class that handles everything.
 * @public
 */
export class Engine
{
    /**
     * @param {Number} FPS Optional parameter to set the game's speed. Lower is faster but less performant, while bigger is slower but more performant.
     */
    constructor(FPS = 60)
    {
        this.fps = FPS;
        this.w_width = screen.width;
        this.w_height = screen.height;

        // Style document and canvas.
        document.body.style.margin = 0;
        document.body.style.padding = 0;
        document.body.style.overflow = "hidden";

        // Set-up main game loop.
        console.assert(Number.isInteger(FPS), "The game's FPS has be an integer")
        window.setInterval(this.gameLoop.bind(this), FPS);
        window.addEventListener("resize", this.updateResolution.bind(this));
    }

    /**
     * Main function to handle the game loop.
     * (Not used by entities.)
     * @public
     */
    gameLoop() {}

    /**
     * Returns the current game speed (FPS.)
     * @public
     */
    getGameSpeed()
    {
        return this.fps;
    }

    /**
     * @private
     */
    updateResolution()
    {
        this.w_width = screen.width;
        this.w_height = screen.height;

        // Style document and canvas.
        document.documentElement.style.width = this.w_width + "px";
        document.documentElement.style.height = this.w_height + "px";
        document.body.style.width = this.w_width + "px";
        document.body.style.height = this.w_height + "px";
    }
}

export default Engine;