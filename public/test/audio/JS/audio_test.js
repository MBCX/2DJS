import Entity from "../../../../Engine/Entity/Entity.js";

export class AudioTest extends Entity
{
    constructor(name, width, height, controls) {
        super(name, width, height, controls);
    }

    /** @override */
    entityInit()
    {
        this.pressed = false;
    }

    /** @override */
    entityStep()
    {
        if (this.isKeyPressed(" ")) {
            if (!this.pressed) {
                const random_index = this.engine_math.randomNumberBetween(1, 4);
                this.engine_audio.playAudio(`assets/FX${random_index}.wav`, false, { volume: 0.1 });
                this.pressed = true;
            }
        } else {
            this.pressed = false;
        }
    }

    /** @override */
    entityDraw()
    {
        this.drawText(this.window_width / 2, 32, "Audio in 2DJS");
        this.drawText(this.window_width / 2, 64, "Press the space bar to randomly play sounds.");
    }
}
export default AudioTest;