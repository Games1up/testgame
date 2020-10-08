import Phaser from "phaser"
import { TrackObjects } from "../modules/TrackObjects"
import { Asteroid } from "../gameObjects/asteroid"
import { Params } from "../modules/params"

export default class sceneA extends Phaser.Scene {
  private asteroidGroup!: Phaser.Physics.Arcade.Group;

  private asteroidSpawnCountDown: number
  private asteroidParams: Params = {
    scene: this,
    x: -1000,
    y: -1000,
    texture: "asteroid",
  };
  constructor() {
    super({ key: "sceneA" })
    this.asteroidSpawnCountDown = 0;
  }

  preload() {
    //this.load.setBaseURL('http://')

    this.load.image("background", "images/background.png")
    this.load.image("logo", "images/logo.png")
    this.load.image("asteroid", "images/rock.png")
    this.load.image("button", "images/button.png")
  }

  create() {
    this.add.image(400, 300, "background")
    const logo = this.add.image(400, 100, "logo")

    this.asteroidGroup = this.physics.add.group()

    const playButton = this.add.image(
      400,
      300,
      "button"
    ) as Phaser.GameObjects.Image;
    playButton.setInteractive();
    this.input.on("gameobjectdown", () => {
      this.scene.start("sceneB")
    });
  }
  update(timestep: number, dt: number) {
    const trackObjects = TrackObjects.getInstance()
    trackObjects.touchX = 400;
    trackObjects.touchY = 300;
    //-------spawn asteroids
    this.asteroidSpawnCountDown -= dt / 30;
    if (this.asteroidSpawnCountDown <= 0) {
      this.asteroidSpawnCountDown = 20;
      const Spawned_Asteroid = new Asteroid(
        this.asteroidParams,
        this.asteroidGroup
      );
    }
  }
}
