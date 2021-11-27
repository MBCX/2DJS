import { Engine } from "../../../../Engine/Engine.js";
import MainSquare from "./collision_test.js";

new Engine().initialise(() => {
    new MainSquare("TestCollisions", 42, 42, [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown"
    ]);
});