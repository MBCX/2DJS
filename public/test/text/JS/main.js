import Engine from "../../../../Engine/Engine.js";
import TestTextDrawing from "./test_draw_text.js";

// Initialise.
new Engine().initialise(() => {
    TestTextDrawing.getInstance(
        "TextDrawing",
        window.innerWidth,
        window.innerHeight
    );
});
