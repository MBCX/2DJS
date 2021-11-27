export class EnginePhysics {
    collisionBetween(x1, y1, x2, y2, offset = 1) {
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
        console.log(distance);
        return (0 >= distance - offset);
    }
}
export default EnginePhysics;
