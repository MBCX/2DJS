import Engine from "../Engine.js";
import { CANVAS_GAME_ID } from "../shared/shared_variables.js";

export class Entities extends Engine {
    constructor(entity_name, width, height, controls = []) {
        super();
        this.canvas_container = document.createElement("canvas");
        this.canvas_container.id = `${CANVAS_GAME_ID}-${entity_name}`;

        // Removes blur.
        this.canvas_container.getContext(
            "2d"
        ).webkitImageSmoothingEnabled = true;
        this.canvas_container.getContext("2d").mozImageSmoothingEnabled = true;
        this.canvas_container.getContext("2d").imageSmoothingEnabled = true;

        /** @private */
        this.entities = new Map();
        this.name = entity_name;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.string = "";
        this.image = "";

        console.assert(
            Array.isArray(controls),
            "Controls parameter for Entities must be an array."
        );

        /**
         * Holds the controls available for an entity. And
         * another property to tell if it's pressed.
         */
        this.control_map = {
            controls: controls,
            is_pressed: new Array(controls.length),
        };

        /** @private */
        this.instance = null;

        this.init.bind(this)();
        this.entityInit();
    }

    /**
     * Getter that returns the game canvas element.
     * @public
     */
    canvasEl() {
        return this.canvas_container;
    }

    /**
     * @private
     */
    init() {
        // Sets ID using the Date.now to make sure all entities
        // have a unique ID.
        this.entities.set(this.name, Math.round(Date.now() / 1000));
        if (this.control_map.controls.length > 0) {
            document.body.addEventListener(
                "keydown",
                this.setKeyPressed.bind(this)
            );
            document.body.addEventListener(
                "keyup",
                this.removeKeyPressed.bind(this)
            );
        }
        document.body.append(this.canvas_container);
    }

    /**
     * @override
     */
    gameLoop() {
        this.entityStep();
        this.updateCanvasSize();
        this.drawShouldUpdate();
    }

    /** @public */
    entityInit() {}

    /** @public */
    entityStep() {}

    /** @public */
    entityDestroy() {}

    /** @public */
    getAllEntities() {
        return this.entities;
    }

    /** @public */
    getEntityId(name) {
        return this.entities.get(name);
    }

    /**
     * Sets correct width and height for a clear
     * canvas image.
     * REFERENCE: https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
     * @private
     */
    updateCanvasSize(customRatio = 0) {
        const canvas = this.canvasEl();

        const PIXEL_RATIO = () => {
            const canvas = this.canvasEl().getContext("2d");
            const bsr =
                canvas.webkitBackingStorePixelRatio ||
                canvas.mozBackingStorePixelRatio ||
                canvas.msBackingStorePixelRatio ||
                canvas.oBackingStorePixelRatio ||
                canvas.backingStorePixelRatio ||
                1;
            return this.device_dpi / bsr;
        };
        let ratio = 0;
        if (!customRatio)
        {
            ratio = PIXEL_RATIO();
        }

        if (this.hasCanvasText()) {
            canvas.width = this.w_width * ratio;
            canvas.height = this.w_height * ratio;
            canvas.style.position = "absolute";
            canvas.style.width = this.w_width + "px";
            canvas.style.height = this.w_height + "px";
            canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
        }
    }

    /**
     * @param {Number} x X position of drawing.
     * @param {Number} y Y position for drawing.
     * @param {Number} width Drawing width.
     * @param {Number} height Drawing height.
     * @param {String} colour Colour of the drawing.
     * @public
     */
    draw(x, y, colour) {
        const canvas = this.canvasEl().getContext("2d");
        canvas.fillStyle = colour;
        canvas.fillRect(x, y, this.width, this.height);

        this.x = x;
        this.y = y;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {String} text
     * @param {Object*} styles
     * @public
     */
    drawText(x, y, text, styles = { font: "30px Arial", fill: "black", align: "left" }) {
        const canvas = this.canvasEl().getContext("2d");
        this.string = text;
        canvas.mozTextStyle = styles.font;
        canvas.font = styles.font;
        canvas.fillStyle = styles.fill;
        canvas.textAlign = styles.align;
        canvas.fillText(this.string, x, y);
    }

    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {String} image
     * @public
     */
    drawImage(x, y, image) {}

    /**
     * Mehtod that determines if it needs to render again
     * a specific frame of an entity canvas.
     * @private
     */
    drawShouldUpdate() {
        const canvas = this.canvasEl().getContext("2d");
        if (this.hasCanvasText()) {
            canvas.clearRect(0, 0, this.w_width, this.w_height);
            canvas.fillRect(this.x, this.y, this.width, this.width);
        } else {
            // canvas.measureText(0, 0, this.w_width, this.w_height);
            canvas.fillText(this.string, this.x, this.y);
        }
    }

    /**
     * @param {String} key
     * @private
     */
    getKeyIndex(key) {
        let index = 0;
        for (; this.control_map.controls.length > index; ++index) {
            if (key === this.control_map.controls[index]) {
                return index;
            }
        }

        // The control key was not found (or it doesn't exists.)
        return false;
    }

    /**
     * Internally sets the key pressed to a variable.
     * @param {!KeyboardEvent} e Current key pressed.
     * @private
     */
    setKeyPressed(e) {
        let index = this.getKeyIndex(e.key);
        if (this.control_map.controls[index]) {
            this.control_map.is_pressed[index] = true;
        }
    }

    /**
     * Internally removes the key pressed to a variable.
     * @param {!KeyboardEvent} e Current key released.
     * @private
     */
    removeKeyPressed(e) {
        let index = this.getKeyIndex(e.key);
        if (this.control_map.controls[index]) {
            this.control_map.is_pressed[index] = false;
        }
    }

    /**
     * Tells if a particular key set for the entity has been pressed.
     * @param {String} key The key string to check for. It must exist in the array
     * @returns {Boolean} True if pressed, false otherwise.
     * @public
     */
    isKeyPressed(key) {
        console.assert(
            this.getKeyIndex(key) !== false,
            `The requested key: ${key} does not exits in the controls map for entity ${this.name}`
        );
        return this.control_map.is_pressed[this.getKeyIndex(key)];
    }

    /**
     * @private
     */
    hasCanvasText()
    {
        return this.string === '';
    }

    /**
     * A static method that always returns one instance of an
     * entity.
     * @public
     * @returns The same class instance of a specific entity.
     */
    static getInstance() {
        return (
            this.instance ??
            (this.instance = new this(
                this.name,
                this.width,
                this.height,
                this.is_controllable
            ))
        );
    }
}

export default Entities;
