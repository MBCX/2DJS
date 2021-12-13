import Engine from "../../../../../Engine/Engine.js";
import TestDrawSquares from "./draw_squares.js";

new Engine().whenIsReady(() => {
    TestDrawSquares.getInstance("DrawSquares", [], 64, 64);
});
