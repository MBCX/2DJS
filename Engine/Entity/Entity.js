import Engine from "../Engine.js";

/** @private */
const CANVAS_PREFIX_GAME_ID = "game-canvas";

/** @private */
const entity_draw_text = {
    textRender: {
        x: [],
        y: [],
        texts: [],
        properties: {
            text_rotation: [],
            text_font_family: [],
            text_fill_colour: [],
            text_align: [],
            text_font_size: [],
        },
    },
    imageRender: {
        x: [],
        y: [],
        width: [],
        height: [],
        images: [],
        images_obj: [],
    },
    squareRender: {
        x: [],
        y: [],
        width: [],
        height: [],
        colour: [],
        square_amount: 0,
    },
};

/** @private */
let delta_time = null;

/** @private */
let entities_map = new Map();

/** @private */
let entity_id = 0;

export class Entity extends Engine {
    static entity_width = 0;
    static entity_height = 0;
    static entity_controls = {
        control_set: [],
        is_pressed: []
    };
    entity_instance = null;

    constructor(entity_name, width, height, controls = []) {
        super();

        // Only allow creating entities using the getInstance
        // static method.
        if (this.entity_instance == null) {
            this.entity_instance = this;
        } else {
            console.error(`Please do not create instances using the new keyword. Instead, use the getInstance singleton. (Entity name: ${entity_name})`);
            return;
        }
        
        this.canvas_container = document.createElement("canvas");
        this.canvas_container.id = `${CANVAS_PREFIX_GAME_ID}-${entity_name}`;

        // Removes canvas blur.
        this.canvas_container.getContext(
            "2d"
        ).webkitImageSmoothingEnabled = true;
        this.canvas_container.getContext("2d").imageSmoothingEnabled = true;

        console.assert(
            Array.isArray(controls),
            "Controls parameter for Entities must be an array."
        );

        this.entity_width = width;
        this.entity_height = height;

        /**
         * Holds the set of keys for an entity.
         * @enum entity_controls
         */
        this.entity_controls = {
            control_set: controls,
            is_pressed: new Array(controls.length),
        };
        this.x = 0;
        this.y = 0;
        this.last_time_render;

        /** @private */
        this.entity_image = {
            img_source: "",
            img_width: 0,
            img_height: 0,
            img_object: {},
        };

        this.init();
        this.entityInit();

        // console.log(entity_draw_text);
    }

    /** @public */
    getCanvasEl() {
        return this.canvas_container;
    }

    /** @public */
    getEntityId() {
        return entities_map.get(this.name);
    }

    /** @public */
    getAllEntities() {
        return entities_map;
    }

    /** @public */
    getEntityName() {
        return this.name;
    }

    /**
     * @param {String} key
     * @private
     */
    findRequestedKeyIndex(key) {
        let index = 0;
        for (; this.entity_controls.control_set.length > index; ++index) {
            if (key === this.entity_controls.control_set[index]) {
                return index;
            }
        }

        // The requested key was not found (or it doesn't exists.)
        return false;
    }

    /**
     * @private
     */
    init() {
        // Makes sure all entities have unique IDs.
        entities_map.set(this.name, entity_id++);

        // Managing controlable entities.
        if (this.entity_controls.control_set.length > 0) {
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
    gameLoop(current_time_render) {
        // Skip first frame render and
        // calculate delta time before entity render.
        if (null == this.last_time_render) {
            this.last_time_render = current_time_render;
            this.useCorrectWindowAnimationFrame(this.gameLoop.bind(this));
        }
        delta_time = current_time_render - this.last_time_render;
        this.last_time_render = current_time_render;

        this.entityStep();
        this.entityDraw();
        this.setCanvasProperties();
        this.renderCanvasAgain();

        this.useCorrectWindowAnimationFrame(this.gameLoop.bind(this));
    }

    /** @public */
    getDeltaTime() {
        return delta_time;
    }

    /** @override */
    runInit() {
        this.useCorrectWindowAnimationFrame(this.gameLoop.bind(this));
        this.entityInit();
    }

    /** @public */
    entityInit() {}

    /** @public */
    entityStep() {}

    /** @public */
    entityDraw() {}

    /** @public */
    entityDestroy() {}

    /**
     * REFERENCE: https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
     * @private
     */
    setCanvasProperties() {
        const canvas = this.getCanvasEl();
        const ratio = this.getPixelRatio();

        canvas.width = this.window_width * ratio;
        canvas.height = this.window_height * ratio;
        canvas.style.position = "absolute";
        canvas.style.width = this.window_width + "px";
        canvas.style.height = this.window_height + "px";
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {String} colour
     * @param {Number} width How wide you want it to be (in px).
     * @param {Number} height How tall you want it to be (in px).
     * @public
     */
    drawSquare(
        x,
        y,
        colour = "black",
        width = this.entity_width,
        height = this.entity_height
    ) {
        const canvas = this.getCanvasEl().getContext("2d");

        // We only need the colour of the squares to know
        // wich we need to edit.
        let currentColourIndex = 0;

        if (!entity_draw_text.squareRender.colour.includes(colour)) {
            entity_draw_text.squareRender.colour.push(colour);
            entity_draw_text.squareRender.width.push(width);
            entity_draw_text.squareRender.height.push(height);
            entity_draw_text.squareRender.x.push(x);
            entity_draw_text.squareRender.y.push(x);
            entity_draw_text.squareRender.square_amount++;
        } else {
            // Go through all saved texts in the array,
            // and find the one that the developer wants
            // to edit.
            entity_draw_text.squareRender.colour.reduce(
                (previousValue, currentValue, currentIndex) => {
                    if (
                        colour ===
                        entity_draw_text.squareRender.colour[currentIndex]
                    ) {
                        currentColourIndex = currentIndex;
                        return;
                    }
                }
            );

            // Set the finded requested text's properties.
            entity_draw_text.squareRender.x[currentColourIndex] = x;
            entity_draw_text.squareRender.y[currentColourIndex] = y;
            entity_draw_text.squareRender.colour[currentColourIndex] = colour;
        }

        // Render each square x and y individually.
        for (let i = 0; entity_draw_text.squareRender.colour.length > i; ++i) {
            canvas.fillStyle = entity_draw_text.squareRender.colour[i];
            canvas.fillRect(
                entity_draw_text.squareRender.x[i],
                entity_draw_text.squareRender.y[i],
                entity_draw_text.squareRender.width[i],
                entity_draw_text.squareRender.height[i]
            );
        }
    }

    /**
     * @param {Number} x Text position in screen pixels.
     * @param {Number} y Text position in screen pixels.
     * @param {String} text
     * @param {Object} styles
     * @public
     */
    drawText(
        x,
        y,
        text,
        styles = {
            fontFamily: "system-ui",
            fontSizeBase: 16,
            align: "center",
            fill: "black",
            rotation: 0,
        }
    ) {
        const canvas = this.getCanvasEl().getContext("2d");
        let currentTextIndex = 0;

        // For now, all drawn text must be unique.
        if (!entity_draw_text.textRender.texts.includes(text)) {
            entity_draw_text.textRender.texts.push(text);
            entity_draw_text.textRender.x.push(x);
            entity_draw_text.textRender.y.push(y);
            entity_draw_text.textRender.properties.text_rotation.push(
                styles.rotation
            );
            entity_draw_text.textRender.properties.text_fill_colour.push(
                styles.fill
            );
            entity_draw_text.textRender.properties.text_font_family.push(
                styles.fontFamily
            );
            entity_draw_text.textRender.properties.text_align.push(
                styles.align
            );
            entity_draw_text.textRender.properties.text_font_size.push(
                styles.fontSizeBase
            );
        } else {
            // Go through all saved texts in the array,
            // and find the one that the developer wants
            // to edit.
            entity_draw_text.textRender.texts.reduce(
                (previousValue, currentValue, currentIndex) => {
                    if (
                        text === entity_draw_text.textRender.texts[currentIndex]
                    ) {
                        currentTextIndex = currentIndex;
                        return;
                    }
                }
            );

            // Set the finded requested text's properties.
            entity_draw_text.textRender.x[currentTextIndex] = x;
            entity_draw_text.textRender.y[currentTextIndex] = y;
            entity_draw_text.textRender.properties.text_rotation[
                currentTextIndex
            ] = styles.rotation;
            canvas.rotate(
                entity_draw_text.textRender.properties.text_rotation[
                    currentTextIndex
                ]
            );
        }
        canvas.font =
            entity_draw_text.textRender.properties.text_font_size[
                currentTextIndex
            ] +
            "px " +
            entity_draw_text.textRender.properties.text_font_family[
                currentTextIndex
            ];
        canvas.fillStyle =
            entity_draw_text.textRender.properties.text_fill_colour[
                currentTextIndex
            ];
        canvas.textAlign =
            entity_draw_text.textRender.properties.text_align[currentTextIndex];
        canvas.fillText(
            entity_draw_text.textRender.texts[currentTextIndex],
            entity_draw_text.textRender.x[currentTextIndex],
            entity_draw_text.textRender.y[currentTextIndex],
            canvas.measureText(
                entity_draw_text.textRender.texts[currentTextIndex]
            ).width
        );
    }

    /**
     * Draws an image to the entity canvas.
     * @param {String} imageSrc
     * @param {Number} width
     * @param {Number} height
     * @param {Number} x
     * @param {Number} y
     * @public
     */
    drawImage(imageSrc, width, height, x, y) {
        const canvas = this.getCanvasEl().getContext("2d");
        let currentImageIndex = 0;
        this.entity_image.img_object = new Image(width, height);
        this.entity_image.img_object.src = imageSrc;

        this.entity_image.img_width = width;
        this.entity_image.img_height = height;
        this.entity_image.img_source = this.entity_image.img_object.currentSrc;

        if (
            !entity_draw_text.imageRender.images.includes(
                this.entity_image.img_object.currentSrc
            )
        ) {
            entity_draw_text.imageRender.images.push(
                this.entity_image.img_object.currentSrc
            );
            entity_draw_text.imageRender.x.push(x);
            entity_draw_text.imageRender.y.push(y);
            entity_draw_text.imageRender.width.push(width);
            entity_draw_text.imageRender.height.push(height);
            entity_draw_text.imageRender.images_obj.push(
                this.entity_image.img_object
            );
        } else {
            // Go through all saved images in the array,
            // and find the one that the developer wants
            // to edit.
            entity_draw_text.imageRender.images.reduce(
                (previousValue, currentValue, currentIndex) => {
                    if (
                        this.entity_image.img_object.currentSrc ===
                        entity_draw_text.imageRender.images[currentIndex]
                    ) {
                        currentImageIndex = currentIndex;
                        return;
                    }
                }
            );

            // Set the finded requested image's properties.
            entity_draw_text.imageRender.x[currentImageIndex] = x;
            entity_draw_text.imageRender.y[currentImageIndex] = y;
        }

        canvas.drawImage(
            entity_draw_text.imageRender.images_obj[currentImageIndex],
            entity_draw_text.imageRender.x[currentImageIndex],
            entity_draw_text.imageRender.y[currentImageIndex]
        );
    }

    /** @private */
    renderCanvasAgain() {
        // We use our drawing functions because
        // they already draw the necessary components to each entity's canvas.
        for (let i = 0; entity_draw_text.squareRender.square_amount > i; ++i) {
            // Draw each square.
            this.drawSquare(
                entity_draw_text.squareRender.x[i],
                entity_draw_text.squareRender.y[i],
                entity_draw_text.squareRender.colour[i],
                entity_draw_text.squareRender.width[i],
                entity_draw_text.squareRender.height[i]
            );
        }

        // Cycle through each text and image that the developer wants to
        // draw, and draw each one.
        for (let i = 0; entity_draw_text.textRender.texts.length > i; ++i) {
            this.drawText(
                entity_draw_text.textRender.x[i],
                entity_draw_text.textRender.y[i],
                entity_draw_text.textRender.texts[i],
                {
                    fontFamily:
                        entity_draw_text.textRender.properties.text_font_family[
                            i
                        ] ?? "system-ui",
                    fontSizeBase:
                        entity_draw_text.textRender.properties.text_font_size[
                            i
                        ] ?? 16,
                    fill:
                        entity_draw_text.textRender.properties.text_fill_colour[
                            i
                        ] ?? "black",
                    rotation:
                        entity_draw_text.textRender.properties.text_rotation[
                            i
                        ] ?? 0,
                    align:
                        entity_draw_text.textRender.properties.text_align[i] ??
                        "center",
                }
            );
        }

        for (let i = 0; entity_draw_text.imageRender.images.length > i; ++i) {
            this.drawImage(
                entity_draw_text.imageRender.images[i],
                entity_draw_text.imageRender.width[i],
                entity_draw_text.imageRender.height[i],
                entity_draw_text.imageRender.x[i],
                entity_draw_text.imageRender.y[i]
            );
        }
    }

    /**
     * @param {!KeyboardEvent} e Current key pressed.
     * @private
     */
    setKeyPressed(e) {
        let index = this.findRequestedKeyIndex(e.key);
        if (this.entity_controls.control_set[index]) {
            this.entity_controls.is_pressed[index] = true;
            return;
        }

        // Something has gone wrong, hasn't it?
        return null;
    }

    /**
     * @param {!KeyboardEvent} e Current key released.
     * @private
     */
    removeKeyPressed(e) {
        let index = this.findRequestedKeyIndex(e.key);
        if (this.entity_controls.control_set[index]) {
            this.entity_controls.is_pressed[index] = false;
            return;
        }

        // Something has gone wrong, hasn't it?
        return null;
    }

    /**
     * Returns true if a particular key from a set of controls from an entity has been pressed.
     * False otherwise.
     * @param {String} key The key string to check for.
     * @public
     */
    isKeyPressed(key) {
        console.assert(
            this.findRequestedKeyIndex(key) !== false,
            `The requested key: ${key} does not exits in the controls map for entity ${this.name}`
        );
        return this.entity_controls.is_pressed[this.findRequestedKeyIndex(key)];
    }

    /** @private */
    getPixelRatio() {
        const canvas = this.getCanvasEl().getContext("2d");
        const bsr =
            canvas.webkitBackingStorePixelRatio ||
            canvas.mozBackingStorePixelRatio ||
            canvas.msBackingStorePixelRatio ||
            canvas.oBackingStorePixelRatio ||
            canvas.backingStorePixelRatio ||
            1;
        return this.device_dpi / bsr;
    }

    /**
     * An automatic singleton for every entity class object.
     * This is best use if you want to get the instance
     * of a player class (for example) without having to create
     * a new class instance altogether.
     * @public
     */
    static getInstance(n, w, h, control) {
        return this.entity_instance ??
            (this.entity_instance = new this(n, w, h, control));
    }
}

Object.freeze(Entity);
export default Entity;
