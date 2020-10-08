import { Params } from "../modules/params";
import { TrackObjects } from "../modules/TrackObjects";

export class Player extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body;

    constructor(params: Params) {
        super(params.scene, params.x, params.y,params.texture);
        params.scene.add.existing(this);
        this.setDepth(12);
        
    }

    destroy() {
        super.destroy()
        //console.log('destroy me!')
    }
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        const trackObjects = TrackObjects.getInstance();
        //follow touch input with easing
        this.x -= (this.x-trackObjects.touchX)*0.4;
        this.y -= (this.y-trackObjects.touchY)*0.4;
        trackObjects.playerX = this.x;
        trackObjects.playerY = this.y;


    }

}