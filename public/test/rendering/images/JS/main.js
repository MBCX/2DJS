import Engine from "../../../../../Engine/Engine.js";
import TestImageDrawing from "./image_draw.js";

new Engine().initialise(() => {
    TestImageDrawing.getInstance("ImageTest", 100, 100);
});
