/* Singleton to store coordinate data related to tracking the player and touch points */
export class TrackObjects {
    private static instance: TrackObjects;

    playerX:number
    playerY:number
    touchX:number
    touchY:number

    private constructor() { 
        this.playerX = 0;
        this.playerY = 0;
        this.touchX = 0;
        this.touchY = 0;
    }

    public static getInstance(): TrackObjects {
        if (!TrackObjects.instance) {
            TrackObjects.instance = new TrackObjects();
        }

        return TrackObjects.instance;
    }

    
}