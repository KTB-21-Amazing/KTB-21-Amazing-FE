import Phaser from 'phaser';
import * as S from './Userform.Style';

class Userform extends Phaser.Scene {
  private playerName: string = ''; // 닉네임 저장 변수
  private nameText!: Phaser.GameObjects.Text; // 일반 폰트 텍스트
  private gameWidth!: number;
  private gameHeight!: number;

  constructor() {
    super({ key: 'Userform' });
  }

  preload() {
    this.load.image('background', '/assets/images/background.jpg');
    this.load.image('startButton', '/assets/images/button_brown.png');
  }

  create() {
    this.gameWidth = this.scale.width;
    this.gameHeight = this.scale.height;

    // ✅ 배경을 화면 전체에 맞게 조정
    const background = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'background');
    background.setDisplaySize(this.gameWidth, this.gameHeight); // ✅ 크기 조정

    this.nameText = this.add.text(
      this.gameWidth / 2 - 100,
      this.gameHeight / 2,
      '닉네임: ',
      S.textStyle,
    );

    // ✅ 커서 추가 (_ 깜빡이게 만들기)
    const cursor = this.add.text(390, 350, '_', S.cursorStyle);

    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        cursor.visible = !cursor.visible;
      },
    });

    // ✅ 키보드 입력 감지 → 닉네임 입력 기능
    this.input.keyboard!.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        this.playerName = this.playerName.slice(0, -1);
      } else if (event.key.length === 1) {
        this.playerName += event.key;
      }
      this.nameText.setText(`닉네임: ${this.playerName}`);
    });

    // ✅ 버튼 생성 (컨테이너 활용)
    const buttonX = this.gameWidth / 2;
    const buttonY = this.gameHeight / 2 + 100;

    const startButton = this.add.image(0, 0, 'startButton').setScale(2).setInteractive(); // ✅ 버튼 이미지
    const buttonText = this.add.text(0, 0, '게임 시작', S.buttonTextStyle);

    // ✅ 버튼 안의 텍스트 위치 조정 (중앙 정렬)
    buttonText.setOrigin(0.5, 0.5);

    // ✅ 컨테이너로 버튼과 텍스트를 함께 묶기
    const buttonContainer = this.add.container(buttonX, buttonY, [startButton, buttonText]);

    // ✅ 컨테이너 자체를 인터랙티브하게 설정해야 클릭 가능
    buttonContainer.setSize(startButton.width, startButton.height);
    buttonContainer.setInteractive();

    // ✅ 버튼 클릭 이벤트 추가
    startButton.on('pointerdown', () => {
      if (!this.playerName.trim()) {
        console.log('오류');
        return;
      }
      console.log(`게임 시작! 닉네임: ${this.playerName}`);
      this.scene.start('WholeMazeScene', { username: this.playerName });
    });
  }
}

export default Userform;
