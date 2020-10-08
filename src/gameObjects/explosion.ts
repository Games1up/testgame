import Phaser from "phaser";

import { ParamsExp } from "../modules/params";

 
export class Explosion extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;
private vx:number;
private vy:number;

  constructor(params: ParamsExp) {
    super(params.scene, params.x, params.y, params.texture);
    params.scene.add.existing(this);
    
    this.setDepth(12);
    
    Phaser.Math.RotateAroundDistance(
      this,
      params.x,
      params.y,
      params.travelAngle,
      10
    );
    this.vx = params.x - this.x;
    this.vy = params.y - this.y;
    
  }

  destroy() {
    super.destroy();
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.angle += 4;
this.x += this.vx;
this.y += this.vy;

    //---if explosion is off screen destroy
    if (this.x > 900 || this.x < -100 || this.y > 700 || this.y < -100) {
      this.destroy();
    }
  }
}
