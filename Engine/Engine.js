import EngineMath from "./Math/EngineMath.js";

/**
 * Main class that handles everything related to the engine.
 * @public
 */
export class Engine {
    /**
     * @param {Number*} FPS Optional parameter to set the game's speed. Lower is faster but less performant, while bigger is slower but more performant.
     * @param {Boolean*} enableDarkMode Optional parameter to let the game automatically render a dark mode theme (if dark mode is enabled.)
     */
    constructor(enableDarkMode = false, FPS = 60) {
        this.fps = FPS;
        this.browser_type = {
            Chrome: "Chrome",
            Firefox: "Firefox",
            Safari: "Safari",
            Opera: "Opera",
            Seamonkey: "Seamonkey",
            IE: "Internet Explorer"
        };
        this.w_width = this.getScreenWidthHeight()[0];
        this.w_height = this.getScreenWidthHeight()[1];
        this.device_dpi = window.devicePixelRatio || 1;

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
     * @public
     * @returns The name of the browser the user is currently using.
     */
    getBrowserType()
    {
        // TODO: There must be a better way to detect different
        // browsers without having to use user-agent.
        // Also, this else-if chain is disgusting.
        if (navigator.userAgent.includes("Chrome") || navigator.userAgent.includes("Chromium")) {
            return this.browser_type.Chrome;
        } else if (navigator.userAgent.includes("Firefox")) {
            return this.browser_type.Firefox;
        } else if (navigator.userAgent.includes("Trident/7.0") || navigator.userAgent.includes("MSIE")) {
            return this.browser_type.IE;
        } else if (navigator.userAgent.includes("OPR") || navigator.userAgent.includes("Opera")) {
            return this.browser_type.Opera;
        } else if (navigator.userAgent.includes("Safari")) {
            return this.browser_type.Safari;
        } else if (navigator.userAgent.includes("Seamonkey")) {
            return this.browser_type.Seamonkey;
        }
    }

    /**
     * @public
     */
    getScreenWidthHeight()
    {
        if (this.getBrowserType() === this.browser_type.Chrome) {
            return [window.innerWidth, window.innerHeight];
        }
        return [screen.width, screen.height];
    }

    /**
     * @private
     */
    updateResolution() {
        this.w_width = this.getScreenWidthHeight()[0];
        this.w_height = this.getScreenWidthHeight()[1];

        // Style document and canvas.
        document.body.style.width = this.w_width + "px";
        document.body.style.height = this.w_height + "px";
    }
}

export default Engine;