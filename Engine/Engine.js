import EngineMath from "./Math/EngineMath.js";

/**
 * Main class that handles everything related to the engine.
 * @public
 */
export class Engine {
    /**
     * @param {Number*} FPS Optional parameter to set the game's speed. Lower is faster but less performant, while bigger is slower but more performant.
     * @param {Boolean} enableDarkMode Optional parameter to let the game automatically render a dark mode theme (if dark mode is enabled.)
     */
    constructor(enableDarkMode = false, FPS = 60) {
        this.fps = FPS;
        this.w_width = screen.width;
        this.w_height = screen.height;

        // Style document and canvas.
        document.body.style.margin = 0;
        document.body.style.padding = 0;
        document.body.style.overflow = "hidden";

        // Set-up main game loop.
        console.assert(
            Number.isInteger(FPS),
            "The game's FPS has be an integer"
        );

        // TODO: Update this to be less performance heavy.
        window.setInterval(this.gameLoop.bind(this), FPS);
        
        
        window.addEventListener("resize", this.updateResolution.bind(this));
        // Variables for easier access for the internal libraries provided
        // by the engine.
        this.engine_math = new EngineMath();
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
    getGameSpeed() {
        return this.fps;
    }

    /**
     * @private
     */
    updateResolution() {
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