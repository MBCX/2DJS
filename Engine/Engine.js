import EngineMath from "./Math/EngineMath.js";
import EngineUtils from "./utils/EngineUtils.js";

/** @private */
let delta_time = null;

export class Engine {
    constructor() {
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
            Chrome: !!window.chrome,
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
        this.mouse_x = 0;
        this.mouse_y = 0;

        /** @private */
        this.last_time_render = -1;

        /** @readonly */
        this.engine_math = new EngineMath();

        /** @readonly */
        this.engine_utils = new EngineUtils();

        /** @public */
        this.current_delta_time = 0;

        document.body.style.margin = 0;
        document.body.style.padding = 0;
        document.body.style.overflow = "hidden";

        // Set-up main game loop and other useful information.
        window.addEventListener("resize", this.updateResolution.bind(this));
        window.addEventListener("mousemove", this.updateMousePosition.bind(this));
        this.useCorrectWindowAnimationFrame(this.gameLoop.bind(this));
    }

    /** @public */
    initialise(functionAfterInitialisation) {
        document.addEventListener(
            "DOMContentLoaded",
            () => {
                functionAfterInitialisation();
                this.runInit();
            },
            { once: true }
        );
        document.addEventListener("beforeunload", this.cleanUp.bind(this), {
            once: true,
        });
    }

    /** @public */
    runInit() {}

    /** @private */
    cleanUp() {
        this.useCorrectCancelAnimationFrame(this.gameLoop.bind(this));
        window.removeEventListener("mousemove", this.updateMousePosition.bind(this));
    }

    /** @public */
    gameLoop(time_render) {
        // Skip first frame render.
        if (-1 == this.last_time_render) {
            this.last_time_render = time_render;
            this.useCorrectWindowAnimationFrame(
                this.gameLoop.bind(this, time_render)
            );
            return;
        }
        delta_time = time_render - this.last_time_render;
        this.last_time_render = time_render;
        this.updateResolution();
        this.useCorrectWindowAnimationFrame(() => {
            this.gameLoop.bind(this, time_render)
        });
    }

    /** @public */
    getDeltaTime() {
        return delta_time;
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

    /** @private */
    updateMousePosition(e) {
        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;
    }

    /** @public */
    useCorrectWindowAnimationFrame(callback) {
        if ("requestAnimationFrame" in window) {
            window.requestAnimationFrame(callback);
        } else if ("mozRequestAnimationFrame" in window) {
            window.mozRequestAnimationFrame(callback);
        } else if ("msRequestAnimationFrame" in window) {
            window.msRequestAnimationFrame(callback);
        } else {
            return setTimeout(callback, 1000 / 60);
        }
    }

    /** @public */
    useCorrectCancelAnimationFrame(callback) {
        if ("cancelAnimationFrame" in window) {
            window.cancelAnimationFrame(callback);
        } else if ("mozCancelAnimationFrame" in window) {
            window.mozCancelAnimationFrame(callback);
        } else if ("msCancelAnimationFrame" in window) {
            window.msCancelAnimationFrame(callback);
        } else {
            return clearTimeout(callback);
        }
    }
}

export default Engine;
