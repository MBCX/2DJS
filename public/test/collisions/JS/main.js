import { Engine } from "../../../../Engine/Engine.js";
import CollisionSquare from "./collision_square.js";
import MainSquare from "./main_square.js";

new Engine().initialise(() => {
    MainSquare.getInstance("TestCollisions", 42, 42, [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
    ]);
    CollisionSquare.getInstance("CollisionSquare", 64, 64);
});
