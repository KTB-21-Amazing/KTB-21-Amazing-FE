import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', '/assets/logo.png'); // public/assets/ 에 파일 위치
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene],
};

export default gameConfig;
