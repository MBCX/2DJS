import Engine from "../../../../../Engine/Engine.js";
import TestImageDrawing from "./image_draw.js";

new Engine().whenIsReady(() => {
    TestImageDrawing.getInstance("ImageTest", [], 100, 100);
});
