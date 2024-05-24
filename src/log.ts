export class Log {
    static error(message: string) {
        this.log(`[ERROR] ${message}`);
    }

    static warn(message: string) {
        this.log(`[WARN] ${message}`);
    }

    static info(message: string) {
        this.log(`[INFO] ${message}`);
    }

    static debug(message: string) {
        this.log(`[DEBUG] ${message}`);
    }

    static log(message: string) {
        const now = new Date();
        // HH:MM:SS
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        console.log(`[${time}] ${message}`);
    }
}