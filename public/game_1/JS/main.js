import Engine from "../../../Engine/Engine.js";
import Enemy from "./enemy/enemy.js";
import Player from "./player/player.js";

document.addEventListener("DOMContentLoaded", function() {
    new Engine();
    new Enemy("Enemy", 64, 64, false);
    new Player("Player", 32, 32, true);
});