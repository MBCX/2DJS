import Engine from "../Engine.js";

/** @private */
const CANVAS_PREFIX_GAME_ID = "game-canvas";

/**
 * A big object that will handle everything related
 * to entities of any kind. Like drawing text, their
 * x and y coordinates, squares and their x and y coordinates,
 * images and their x and y coordinates and so on.
 * @private
 */
const entity_drawing_database = {
    textRender: {
        x: [],
        y: [],
        texts_properties: {
            method_calls: {
                entity_parent: [],
                id: 0,
            },
            texts: [],
        },
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
const list_of_entities = [];

/** @private */
let delta_time = null;

/** @private */
let entities_map = new Map();

/**
 * A helper variable that helps to
 * differenciate each entity.
 * @private
 */
let entity_id = 0;

export class Entity extends Engine {
    static entity_width = 0;
    static entity_height = 0;
    static entity_controls = {
        control_set: [],
        is_pressed: [],
    };
    entity_instance = null;

    constructor(entity_name, width, height, controls = []) {
        super();

        // Only allow creating entities using the getInstance
        // static method.
        if (this.engine_utils.isNull(this.entity_instance)) {
            this.entity_instance = this;
        } else {
            console.error(
                `Please do not create entities using the new keyword. Instead, use the getInstance singleton. (Entity name: ${entity_name})`
            );
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
        this.name = entity_name;
        this.entity_width = width;
        this.entity_height = height;

        /**
         * Holds the set of keys for an entity.
         * @enum entity_controls
         * @property control_set
         * @property is_pressed
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
        list_of_entities.push(this.entity_instance);
        console.log(list_of_entities);
        console.log(entity_drawing_database);
    }

    /** @public */
    getCanvasEl() {
        return this.canvas_container;
    }

    /** @public */
    getEntityProperties() {
        return entities_map.get("entity_map");
    }

    /** @public */
    getAllEntities() {
        return list_of_entities;
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
        entities_map.set("entity_map", {
            id: entity_id++,
            name: this.name,
        });

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
        if (this.engine_utils.isNull(this.last_time_render)) {
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
    entityDestroy() {
        const entity_id = this.getEntityProperties();

        // Remove every single property for square, image
        // or text. Since we don't know what the developer
        // has drawn, written, or set an image to.
        if (this.engine_utils.isUndefined(list_of_entities[entity_id.id])) {
        }
    }

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
     * @param {Number} width How wide you want the square to be (in px).
     * @param {Number} height How tall you want the square to be (in px).
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
        let current_colour_index = 0;

        if (!entity_drawing_database.squareRender.colour.includes(colour)) {
            entity_drawing_database.squareRender.colour.push(colour);
            entity_drawing_database.squareRender.width.push(width);
            entity_drawing_database.squareRender.height.push(height);
            entity_drawing_database.squareRender.x.push(x);
            entity_drawing_database.squareRender.y.push(x);
            entity_drawing_database.squareRender.square_amount++;
        }

        // Go through all saved texts in the array,
        // and find the one that the developer wants
        // to edit.
        entity_drawing_database.squareRender.colour.reduce(
            (previousValue, currentValue, currentIndex) => {
                if (
                    colour ===
                    entity_drawing_database.squareRender.colour[currentIndex]
                ) {
                    current_colour_index = currentIndex;
                    return;
                }
            }
        );

        // Set the finded requested text's properties.
        entity_drawing_database.squareRender.x[current_colour_index] = x;
        entity_drawing_database.squareRender.y[current_colour_index] = y;
        entity_drawing_database.squareRender.colour[current_colour_index] =
            colour;

        // Render each square x and y individually.
        canvas.fillStyle =
            entity_drawing_database.squareRender.colour[current_colour_index];
        canvas.fillRect(
            entity_drawing_database.squareRender.x[current_colour_index],
            entity_drawing_database.squareRender.y[current_colour_index],
            entity_drawing_database.squareRender.width[current_colour_index],
            entity_drawing_database.squareRender.height[current_colour_index]
        );
    }

    /** @public */
    changeSquareColour(changeColourTo) {
        const entity_id = this.getEntityProperties();

        // TODO: Investigate why ONLY when we call this method,
        // the drawSquare method doesn't apply correctly width
        // and height of the squares.
        if (
            this.engine_utils.isUndefined(
                entity_drawing_database.squareRender.width[entity_id.id]
            )
        ) {
            entity_drawing_database.squareRender.width[entity_id.id] =
                this.entity_width;
            entity_drawing_database.squareRender.height[entity_id.id] =
                this.entity_height;
        }

        entity_drawing_database.squareRender.colour[entity_id.id] =
            changeColourTo;
        return entity_drawing_database.squareRender.colour[entity_id.id];
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
        const method_id = entity_drawing_database.textRender.texts_properties.method_calls.id;
        const entity_id = this.getEntityProperties();

        // Save wich entity called this method.
        for (let i = 0; list_of_entities.length > i; ++i)
        {
            if (!entity_drawing_database.textRender.texts_properties.method_calls.entity_parent.includes(list_of_entities[i])) {
                entity_drawing_database.textRender.texts_properties.method_calls.entity_parent.push(list_of_entities[i]);
                ++entity_drawing_database.textRender.texts_properties.method_calls.id;
            }
        }

        // Handle adding new strings to our entity database.
        if (
            this.engine_utils.isUndefined(
                entity_drawing_database.textRender.texts_properties.texts[
                    entity_drawing_database.textRender.texts_properties.method_calls.id
                ]
            ) && !entity_drawing_database.textRender.texts_properties.texts.includes(text)
        ) {
            // Numbers will be handled differently compared to
            // strings.
            if (this.engine_utils.isNumber(text)) {
                entity_drawing_database.textRender.texts_properties.texts.push(text);
                entity_drawing_database.textRender.x.push(x);
                entity_drawing_database.textRender.y.push(y);
            } else {
                entity_drawing_database.textRender.texts_properties.texts.push(text);
                entity_drawing_database.textRender.x.push(x);
                entity_drawing_database.textRender.y.push(y);
            }
        }

        // Handle number string inputs.
        const text_id = this.getTextId(text)[0];
        if (
            this.engine_utils.isUndefined(
                entity_drawing_database.textRender.texts_properties.texts[text_id]
            )
        ) {
            // Search through all our stored text in our database,
            // if you find it is a number, verify that's the number
            // that the developer requested (in the text parameter).
            // If it is, find its index and change its value.
            for (
                let i = 0;
                entity_drawing_database.textRender.texts_properties.texts
                    .length > i;
                ++i
            ) {
                if (
                    this.engine_utils.isNumber(
                        entity_drawing_database.textRender.texts_properties
                            .texts[i]
                    )
                ) {
                    const number_text_id = this.getTextId(
                        entity_drawing_database.textRender.texts_properties
                            .texts[i]
                    );
                    entity_drawing_database.textRender.texts_properties.texts[
                        number_text_id
                    ] = text;
                } else {
                    // Get the last string and change it to the new string.
                    entity_drawing_database.textRender.texts_properties.texts[
                        entity_drawing_database.textRender.texts_properties.texts.length - 1
                    ] = text;
                }
            }
        }
        
        canvas.font = "system-ui";
        canvas.fillStyle = "black";
        canvas.textAlign = "center";

        // Set new values again if they ever change.
        entity_drawing_database.textRender.x[text_id] = x;
        entity_drawing_database.textRender.y[text_id] = y;
        entity_drawing_database.textRender.texts_properties.texts[text_id] = text;

        canvas.fillText(
            entity_drawing_database.textRender.texts_properties.texts[text_id],
            entity_drawing_database.textRender.x[text_id],
            entity_drawing_database.textRender.y[text_id],
            canvas.measureText(
                entity_drawing_database.textRender.texts_properties.texts[
                    text_id
                ]
            ).width
        );
    }
    /** @private */
    getTextId(string) {
        for (
            let i = 0;
            entity_drawing_database.textRender.texts_properties.texts.length >
            i;
            ++i
        ) {
            if (
                entity_drawing_database.textRender.texts_properties.texts[i] ===
                string
            ) {
                return [i, list_of_entities[i]];
            }
        }
        return undefined;
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
    drawStaticImage(imageSrc, width, height, x, y) {
        const canvas = this.getCanvasEl().getContext("2d");
        let current_image_index = 0;
        this.entity_image.img_object = new Image(width, height);
        this.entity_image.img_object.src = imageSrc;

        this.entity_image.img_width = width;
        this.entity_image.img_height = height;
        this.entity_image.img_source = this.entity_image.img_object.currentSrc;

        if (
            !entity_drawing_database.imageRender.images.includes(
                this.entity_image.img_object.currentSrc
            )
        ) {
            entity_drawing_database.imageRender.images.push(
                this.entity_image.img_object.currentSrc
            );
            entity_drawing_database.imageRender.x.push(x);
            entity_drawing_database.imageRender.y.push(y);
            entity_drawing_database.imageRender.width.push(width);
            entity_drawing_database.imageRender.height.push(height);
            entity_drawing_database.imageRender.images_obj.push(
                this.entity_image.img_object
            );
        } else {
            // Go through all saved images in the array,
            // and find the one that the developer wants
            // to edit.
            entity_drawing_database.imageRender.images.reduce(
                (previousValue, currentValue, currentIndex) => {
                    if (
                        this.entity_image.img_object.currentSrc ===
                        entity_drawing_database.imageRender.images[currentIndex]
                    ) {
                        current_image_index = currentIndex;
                        return;
                    }
                }
            );

            // Set the finded requested image's properties.
            entity_drawing_database.imageRender.x[current_image_index] = x;
            entity_drawing_database.imageRender.y[current_image_index] = y;
        }

        canvas.drawImage(
            entity_drawing_database.imageRender.images_obj[current_image_index],
            entity_drawing_database.imageRender.x[current_image_index],
            entity_drawing_database.imageRender.y[current_image_index],
            entity_drawing_database.imageRender.width[current_image_index],
            entity_drawing_database.imageRender.height[current_image_index]
        );
    }

    /** @private */
    renderCanvasAgain() {
        // We use our drawing functions because
        // they already draw the necessary components to each entity's canvas.
        for (
            let i = 0;
            entity_drawing_database.squareRender.colour.length > i;
            ++i
        ) {
            // Draw each square.
            this.drawSquare(
                entity_drawing_database.squareRender.x[i],
                entity_drawing_database.squareRender.y[i],
                entity_drawing_database.squareRender.colour[i],
                entity_drawing_database.squareRender.width[i],
                entity_drawing_database.squareRender.height[i]
            );
        }

        // Cycle through each text and image that the developer wants to
        // draw, and draw each one.
        for (
            let i = 0;
            entity_drawing_database.textRender.texts_properties.texts.length >
            i;
            ++i
        ) {
            this.drawText(
                entity_drawing_database.textRender.x[i],
                entity_drawing_database.textRender.y[i],
                entity_drawing_database.textRender.texts_properties.texts[i],
                {
                    fontFamily:
                        entity_drawing_database.textRender.properties
                            .text_font_family[i] ?? "system-ui",
                    fontSizeBase:
                        entity_drawing_database.textRender.properties
                            .text_font_size[i] ?? 16,
                    fill:
                        entity_drawing_database.textRender.properties
                            .text_fill_colour[i] ?? "black",
                    rotation:
                        entity_drawing_database.textRender.properties
                            .text_rotation[i] ?? 0,
                    align:
                        entity_drawing_database.textRender.properties
                            .text_align[i] ?? "center",
                }
            );
        }

        for (
            let i = 0;
            entity_drawing_database.imageRender.images.length > i;
            ++i
        ) {
            this.drawStaticImage(
                entity_drawing_database.imageRender.images[i],
                entity_drawing_database.imageRender.width[i],
                entity_drawing_database.imageRender.height[i],
                entity_drawing_database.imageRender.x[i],
                entity_drawing_database.imageRender.y[i]
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
     * @param {String} name Entity name
     * @param {Number} width How wide the entity is (usually relevant when drawing squares)
     * @param {Number} height How tall the entity is (usually relevant when drawing squares)
     * @param {Array} entity_controls Set of controls for controlling this entity.
     * @public
     */
    static getInstance(name, width, height, entity_controls) {
        return (
            this.entity_instance ??
            (this.entity_instance = new this(
                name,
                width,
                height,
                entity_controls
            ))
        );
    }
}

Object.freeze(Entity);
export default Entity;
