import { Engine } from "../../../../Engine/Engine.js";
import CollisionSquare1 from "./collision_square_1.js";
import CollisionSquare2 from "./collision_square_2.js";
import MainSquare from "./main_square.js";

new Engine().initialise(() => {
    MainSquare.getInstance("TestCollisions", 42, 42, [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
    ]);
    CollisionSquare1.getInstance("CollisionSquare", 64, 64);
    CollisionSquare2.getInstance("CollisionSquare2", 96, 96);
});
