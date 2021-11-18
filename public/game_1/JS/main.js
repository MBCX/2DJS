import Engine from "../../../Engine/Engine.js";
import HUD from "./hud/hud.js";
import Player from "./player/player.js";
import Enemy from "./enemy/enemy.js";

// Initialise.
new Engine().initialise(() => {
    new Player("Player", 32, 32, [
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
    ]);
    new Enemy("Enemy", 36, 36);
    new HUD("GameHud", window.innerWidth, window.innerHeight);
});
