import { Scene, GameObjects } from 'phaser'

export class MainScene extends Scene {
  private helloWorld!: GameObjects.Text

  init () {
    this.cameras.main.setBackgroundColor('#24252A')
  }

  create () {
    this.helloWorld = this.add.text(
      this.cameras.main.centerX, 
      this.cameras.main.centerY, 
      "Hello World", { 
        font: "40px Arial", 
        fill: "#ffffff" 
      }
    );
    this.helloWorld.setOrigin(0.5);
  }
  update () {
    this.helloWorld.angle += 1;
  }
}
