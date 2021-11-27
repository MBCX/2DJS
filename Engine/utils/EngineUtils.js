export class EngineUtils {
    randomColour(alpha = 1.0) {
        return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, ${alpha})`;
    }
    
    isTextEmpty(string) {
        return string === "";
    }

    isUndefined(variable) {
        return variable == undefined;
    }

    isNull(variable) {
        return variable == null;
    }

    isSupported(feature, at = window)
    {
        return (feature in at);
    }
}
export default EngineUtils;