import EngineMath from "./Math/EngineMath.js";

export class Engine {
    /**
     * @param {Number*} FPS Lower is faster but less performant, while bigger is slower but more performant.
     */
    constructor(FPS = 60) {
        this.fps = FPS;
        this.browser_type = {
            Chrome: "Chrome",
            Firefox: "Firefox",
            Safari: "Safari",
            Opera: "Opera",
            Seamonkey: "Seamonkey",
            IE: "Internet Explorer",
        };

        this.screen_width = this.getScreenWidthHeightArray()[0];
        this.screen_height = this.getScreenWidthHeightArray()[1];
        this.device_dpi = window.devicePixelRatio ?? 1;
        console.assert(
            Number.isInteger(FPS),
            "The game's FPS has be an integer"
        );

        // Set-up main game loop.
        // TODO: Update this to be less performance heavy.
        window.setInterval(this.gameLoop.bind(this), FPS);
        window.addEventListener("resize", this.updateResolution.bind(this));

        /** @readonly */
        this.engine_math = new EngineMath();

        document.body.style.margin = 0;
        document.body.style.padding = 0;
        document.body.style.overflow = "hidden";
    }

    /** @public */
    gameLoop() {}

    /** @public */
    getGameSpeed() {
        return this.fps;
    }

    /** @public */
    getBrowserType() {
        // TODO: There must be a better way to detect different
        // browsers without having to use user-agent.
        // Also, this else-if chain is disgusting.
        if (
            navigator.userAgent.includes("Chrome") ||
            navigator.userAgent.includes("Chromium")
        ) {
            return this.browser_type.Chrome;
        } else if (navigator.userAgent.includes("Firefox")) {
            return this.browser_type.Firefox;
        } else if (
            navigator.userAgent.includes("Trident/7.0") ||
            navigator.userAgent.includes("MSIE")
        ) {
            return this.browser_type.IE;
        } else if (
            navigator.userAgent.includes("OPR") ||
            navigator.userAgent.includes("Opera")
        ) {
            return this.browser_type.Opera;
        } else if (navigator.userAgent.includes("Safari")) {
            return this.browser_type.Safari;
        } else if (navigator.userAgent.includes("Seamonkey")) {
            return this.browser_type.Seamonkey;
        }
    }

    /**
     * Index 0 is width and index 1 is height.
     * @public
     */
    getScreenWidthHeightArray() {
        // Chrome handle screen values differently.
        if (this.getBrowserType() === this.browser_type.Chrome) {
            return [window.innerWidth, window.innerHeight];
        }
        return [screen.width, screen.height];
    }

    /** @private */
    updateResolution() {
        this.screen_width = this.getScreenWidthHeightArray()[0];
        this.screen_height = this.getScreenWidthHeightArray()[1];

        document.body.style.width = this.screen_width + "px";
        document.body.style.height = this.screen_height + "px";
    }
}

export default Engine;
