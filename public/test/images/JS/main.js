import Engine from "../../../../Engine/Engine.js";
import TestImageDrawing from "./image_draw.js";

new Engine().initialise(() => {
    new TestImageDrawing("ImageTest", 100, 100);
});