import { Engine } from "../../../../Engine/Engine.js";
import CollisionSquare1 from "./collision_square_1.js";
import CollisionSquare2 from "./collision_square_2.js";
import MainSquare from "./main_square.js";

new Engine().whenIsReady(() => {
    MainSquare.getInstance("TestCollisions", [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
    ], 42, 42);
    CollisionSquare1.getInstance("CollisionSquare", [], 64, 64);
    CollisionSquare2.getInstance("CollisionSquare2", [], 96, 96);
});
