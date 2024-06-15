export interface CldrAnnotations {
    annotations: {
        identity: {
            version: {
                _cldrVersion: string;
            }
            language: string;
        };

        annotations: Record<string, {
            default: string[];
            tts: string[];
        }>;
    };
};