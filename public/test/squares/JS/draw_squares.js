import Entity from "../../../../Engine/Entity/Entity.js";

export class TestDrawSquares extends Entity {
    constructor(entity_name, width, height) {
        super(entity_name, width, height);
    }

    /**
     * @override
     */
    entityInit() {
        this.random_square_colour = [
            this.engine_utils.randomColour(),
            this.engine_utils.randomColour(),
            this.engine_utils.randomColour(),
            this.engine_utils.randomColour(),
        ];
        this.random_square_position = [
            [
                this.engine_math.generateRandomNumber(this.window_width),
                this.engine_math.generateRandomNumber(this.window_width),
                this.engine_math.generateRandomNumber(this.window_width),
            ],
            [
                this.engine_math.generateRandomNumber(this.window_height),
                this.engine_math.generateRandomNumber(this.window_height),
                this.engine_math.generateRandomNumber(this.window_height),
            ],
        ];
    }

    /**
     * @override
     */
    entityDraw() {
        this.drawText(this.window_width / 2, 32, "Drawing squares in 2DJS");
        this.drawSquare(
            this.window_width / 2,
            this.window_height / 2,
            this.random_square_colour[0]
        );
        this.drawSquare(
            this.random_square_position[0][0],
            this.random_square_position[1][0],
            this.random_square_colour[1]
        );
        this.drawSquare(
            this.random_square_position[0][1],
            this.random_square_position[1][1],
            this.random_square_colour[2]
        );
        this.drawSquare(
            this.random_square_position[0][2],
            this.random_square_position[1][2],
            this.random_square_colour[3]
        );
    }
}
export default TestDrawSquares;
