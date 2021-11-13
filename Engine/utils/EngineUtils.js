export class EngineUtils
{
    randomColour(alpha = 1.0)
    {
        return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${alpha})`;
    }
}
export default EngineUtils;