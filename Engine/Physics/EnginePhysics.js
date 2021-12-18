import EngineMath from "../Math/EngineMath.js";

const engine_math = new EngineMath();
export class EnginePhysics {
    collisionBetween(x1, y1, x2, y2, offset = 1) {
        const distance = Math.sqrt(engine_math.pow(x2 - x1, 2) + engine_math.pow(y2 - y1, 2));
        return engine_math.floor(0 >= distance - offset);
    }
}
export default EnginePhysics;
