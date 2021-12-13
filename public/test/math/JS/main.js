import Engine from "../../../../Engine/Engine.js";
import MathTest from "./math_tests.js";

new Engine().whenIsReady(() => {
    MathTest.getInstance("MathTest", [], Engine.prototype.window_width, Engine.prototype.window_height);
});