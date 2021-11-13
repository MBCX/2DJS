import EngineMath from "./Math/EngineMath.js";

export class Engine {
    /**
     * @param {Number*} FPS Lower is faster but less performant, while bigger is slower but more performant.
     */
    constructor(FPS = 60) {
        this.fps = FPS;

        /**
         * REFERENCE: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
         * @typedef browser_type
         * @property {Boolean} Chrome
         * @property {Boolean} EdgeChromium
         * @property {Boolean} Firefox
         * @property {Boolean} Safari
         * @property {Boolean} Opera
         * @property {Boolean} EdgeLegacy
         * @property {Boolean} IE
         */
        this.browser_type = {
            Chrome:
                !!window.chrome &&
                (!!window.chrome.webstore || !!window.chrome.runtime),
            EdgeChromium:
                !!window.chrome &&
                (!!window.chrome.webstore || !!window.chrome.runtime) &&
                navigator.userAgent.indexOf("Edg") != -1,
            Firefox: typeof InstallTrigger !== "undefined",
            Safari:
                /constructor/i.test(window.HTMLElement) ||
                (function (p) {
                    return p.toString() === "[object SafariRemoteNotification]";
                })(
                    !window["safari"] ||
                        (typeof safari !== "undefined" &&
                            window["safari"].pushNotification)
                ),
            Opera:
                (!!window.opr && !!opr.addons) ||
                !!window.opera ||
                navigator.userAgent.indexOf(" OPR/") >= 0,
            EdgeLegacy: /*@cc_on!@*/ false && !!window.StyleMedia,
            IE: /*@cc_on!@*/ false || !!document.documentMode,
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
    gameLoop() {
        this.updateResolution();
    }

    /** @public */
    getGameSpeed() {
        return this.fps;
    }

    /**
     * Returns an array where index 0 is width and index 1 is height.
     * @public
     */
    getScreenWidthHeightArray() {
        // Chrome handle screen values differently.
        if (this.browser_type.Chrome) {
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
