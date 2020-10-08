import Phaser from "phaser";

import { Params } from "../modules/params";
import { TrackObjects } from "../modules/TrackObjects";
 
export class Asteroid extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;

  constructor(params: Params, group: Phaser.Physics.Arcade.Group) {
    super(params.scene, params.x, params.y, params.texture);
    params.scene.add.existing(this);
    group.add(this);

    this.setDepth(12);
    this.body.setCircle(40);
    const trackObjects = TrackObjects.getInstance();

    //---position asteriod on screen aimed at player
    const rand: number = Phaser.Math.Between(0, 360);
    Phaser.Math.RotateAroundDistance(
      this,
      trackObjects.playerX,
      trackObjects.playerY,
      Phaser.Math.DegToRad(rand),
      1500
    );
    this.body.setVelocity(
      (trackObjects.playerX - this.x) * 0.1,
      (trackObjects.playerY - this.y) * 0.1
    );
    //---move asteriod closer to edge of play area
    this.x = Phaser.Math.Clamp(this.x, -50, 850);
    this.y = Phaser.Math.Clamp(this.y, -50, 650);
  }

  destroy() {
    super.destroy();
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.angle += 4;

    //---if asteroid is off screen destroy
    if (this.x > 900 || this.x < -100 || this.y > 700 || this.y < -100) {
      this.destroy();
    }
  }
}
