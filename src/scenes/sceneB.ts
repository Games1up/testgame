import Phaser from "phaser"
import { TrackObjects } from "../modules/TrackObjects"
import { Player } from "../gameObjects/player"
import { Asteroid } from "../gameObjects/asteroid"
import { Explosion } from "../gameObjects/explosion"
import { Params } from "../modules/params"
import { ParamsExp } from "../modules/params"

export default class sceneB extends Phaser.Scene {
  private player?: Player;
  private asteroidGroup!: Phaser.Physics.Arcade.Group;

  private asteroidSpawnCountDown: number;
  private asteroidParams: Params = {
    scene: this,
    x: -1000,
    y: -1000,
    texture: "asteroid",
  };
  private playerParams: Params = {
    scene: this,
    x: 400,
    y: 100,
    texture: "player",
  };
  

  constructor() {
    super({ key: "sceneB" })
    this.asteroidSpawnCountDown = 0
  }

  preload() {
    //this.load.setBaseURL('http://')

    this.load.image("exp", "images/exp.png")
    this.load.image("player", "images/player.png")
    this.load.image("asteroid", "images/rock.png")
  }

  create() {
    this.player = new Player(this.playerParams);
    this.physics.world.enable([this.player]);
    this.player.body.setCircle(40);

    this.asteroidGroup = this.physics.add.group();

    this.physics.add.overlap(
      this.player,
      this.asteroidGroup,
      (v1,v2) => {this.playerVsAsteroid(v2,v2)}
    );

    this.input.on("pointerdown", (pointer) => {
      const trackObjects = TrackObjects.getInstance();
      trackObjects.touchX = pointer.x;
      trackObjects.touchY = pointer.y;
    })
  }
  playerVsAsteroid(player, asteroid) {
    let i:integer
    let explosionParams: ParamsExp = {
        scene: this,
        x: asteroid.x,
        y: asteroid.y,
        texture: "exp",
        travelAngle: 0
       };

      for (i = 0; i < 8; i++) {
        explosionParams.travelAngle = i * 45;
        const Spawned_Explosion = new Explosion(
            explosionParams
          )
      }


    asteroid.destroy()
  }

  update(timestep: number, dt: number) {
    const trackObjects = TrackObjects.getInstance()
    trackObjects.touchX = this.input.x
    trackObjects.touchY = this.input.y
    //-------spawn asteroids
    this.asteroidSpawnCountDown -= dt / 30
    if (this.asteroidSpawnCountDown <= 0) {
      this.asteroidSpawnCountDown = 20
      const Spawned_Asteroid = new Asteroid(
        this.asteroidParams,
        this.asteroidGroup
      );
    }
  }
}
