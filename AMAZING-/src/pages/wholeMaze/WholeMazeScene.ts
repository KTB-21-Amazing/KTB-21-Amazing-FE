import Phaser from 'phaser';
import { getMaze } from './../../api/GameApi';

interface MazeDataProps {
  width: number;
  height: number;
  maze: number[][];
  userPos: [number, number];
  npcCnt: number;
  npcPos: [number, number];
  exitPos: [number, number];
} // 반환값

class WholeMazeScene extends Phaser.Scene {
  private mazeData: MazeDataProps | null = null;
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private darkness!: Phaser.GameObjects.Graphics;
  private walls!: Phaser.Physics.Arcade.StaticGroup;
  private exitTile!: Phaser.GameObjects.Rectangle;
  private isExiting: boolean = false;
  private bg!: Phaser.GameObjects.Image;
  private npcs!: Phaser.Physics.Arcade.Group;
  private isInteractingWithNPC: boolean = false;

  // ✅ 타이머 관련 변수
  private timerText!: Phaser.GameObjects.Text;
  private timeLeft: number = 30; // 시작 시간 (30초)
  private timerEvent!: Phaser.Time.TimerEvent; // 타이머 이벤트 저장

  constructor() {
    super({ key: 'WholeMazeScene', physics: { default: 'arcade', arcade: { debug: false } } });
  }

  async preload() {
    this.load.image('background', '/assets/images/background.jpg');
    this.load.image('wall', '/assets/images/tile_0005.png'); // ✅ 미로 벽 타일
    this.load.image('floor', '/assets/images/tile_0001.png'); // ✅ 바닥 타일
    this.load.image('player', '/assets/images/player_walk1.webp');
    this.load.image('npc', '/assets/images/npc.webp');
  }

  async fetchMazeData(loc: [number, number] | null = null) {
    try {
      const requestData=loc?{loc:Array.from(loc)}:{};
      const res = await getMaze(requestData);
      this.mazeData = res?.data;
      console.log('미로 데이터 불러오기 성공:', this.mazeData);
    } catch (error) {
      console.error('미로 데이터를 가져오는 중 오류 발생:', error);
    }
  }

  async create() {
    await this.fetchMazeData(null); // 🔄 create에서 미로 데이터 불러오기

    if (!this.mazeData) {
      console.error('❌ 미로 데이터를 불러오지 못했습니다.');
      return;
    }

    console.log('🎉 미로 데이터:', this.mazeData);

    this.timerText = this.add.text(
      1020,
      430, // 🔥 고정된 위치
      `남은 시간: ${this.timeLeft}`,
      {
        fontSize: '5px',
        color: '#ffffff',
        fontStyle: 'bold',
        padding: { x: 10, y: 5 },
        resolution: window.devicePixelRatio,
      },
    );

    this.timerText.setDepth(1100); // ✅ 최상위 UI로 변경
    this.timerText.setScrollFactor(0); // ✅ UI 고정

    // ✅ 타이머 이벤트 실행
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.timerText) {
          this.timeLeft -= 1;
          this.timerText.setText(`남은 시간: ${this.timeLeft}`);
        } else {
          console.warn('❌ this.timerText가 존재하지 않음!');
        }
      },
      loop: true,
    });

    // ✅ 배경을 먼저 로드하지만 초기에는 보이지 않도록 설정
    this.bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
    this.bg.setOrigin(0.5).setDisplaySize(this.scale.width, this.scale.height);
    this.bg.setScrollFactor(0);
    this.bg.setDepth(-10);
    this.bg.setAlpha(0); // 📌 시작할 때는 배경을 숨김

    const tileSize = 16; // 타일 크기
    const maze = this.mazeData.maze;

    const mazeWidth = maze[0].length * tileSize;
    const mazeHeight = maze.length * tileSize;

    // ✅ 물리 충돌을 위한 벽 그룹 생성
    this.walls = this.physics.add.staticGroup();
    this.npcs = this.physics.add.group({
      immovable: true, // ✅ NPC가 움직이지 않도록 설정
      allowGravity: false, // ✅ 중력 영향 제거
    });

    let exitX = 0,
      exitY = 0;

    // ✅ 미로 타일 배치
    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        const tileType = maze[row][col];
        const x = col * tileSize;
        const y = row * tileSize;

        if (tileType === 1) {
          // 벽 추가 및 물리 충돌 설정
          const wall = this.add.image(x, y, 'wall').setOrigin(0);
          wall.setDepth(1);
          this.walls.add(wall);
        } else if (tileType === 4) {
          exitX = x;
          exitY = y;
          this.add.image(x, y, 'floor').setOrigin(0);
        } else if (tileType === 2) {
          // 먼저 바닥 타일 추가
          this.add.image(x, y, 'floor').setOrigin(0);

          // ✅ NPC 물리 객체 생성
          const npc = this.physics.add
            .sprite(x + tileSize / 2, y + tileSize / 2, 'npc')
            .setOrigin(0.5)
            .setDisplaySize(tileSize * 0.8, tileSize * 0.8) // NPC 크기 조정
            .setDepth(1);

          npc.body.setSize(tileSize, tileSize); // 타일 크기만큼 충돌 박스를 크게
          npc.body.setOffset(0, 0); // 충돌 박스가 중앙에 오도록 조정
          npc.body.immovable = true; // NPC가 움직이지 않도록 설정
          npc.refreshBody(); // 물리 엔진 업데이트

          // ✅ NPC 물리 그룹에 추가
          this.npcs.add(npc);
          npc.setData('isNPC', true);
        } else {
          this.add.image(x, y, 'floor').setOrigin(0);
        }
      }
    }

    // ✅ 출구 표시 (디버깅용)
    this.exitTile = this.add.rectangle(
      exitX + tileSize / 2,
      exitY + tileSize / 2,
      tileSize,
      tileSize,
      0x00ff00,
      0,
    );
    this.physics.add.existing(this.exitTile, true);

    // ✅ 화면 크기 가져오기
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // ✅ `setZoom()`을 자동 조정하여 미로가 화면에 꽉 차도록 설정
    const zoomX = screenWidth / mazeWidth;
    const zoomY = screenHeight / mazeHeight;
    const zoom = Math.min(zoomX, zoomY); // 최소값을 선택하여 화면에 맞춤

    this.cameras.main.setZoom(zoom); // ✅ 자동 줌 적용

    // ✅ 카메라 위치 조정 (미로 중앙으로 이동)
    this.cameras.main.centerOn(mazeWidth / 2, mazeHeight / 2);

    // ✅ 플레이어 설정 (서버 데이터 사용)
    const playerX = this.mazeData.userPos[0] * tileSize + tileSize / 2;
    const playerY = this.mazeData.userPos[1] * tileSize + tileSize / 2;

    this.player = this.physics.add.sprite(playerX, playerY, 'player').setOrigin(0.5);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.walls);

    // ✅ 플레이어 크기를 타일 하나 크기로 조정
    const playerWidth = tileSize * 0.7; // 약간 여유를 두어 타일보다 약간 작게 설정
    const playerHeight = tileSize * 0.7;

    // ✅ 플레이어 이미지 크기 조정
    const playerImage = this.textures.get('player').getSourceImage();
    const widthScale = playerWidth / playerImage.width;
    const heightScale = playerHeight / playerImage.height;
    this.player.setScale(widthScale, heightScale);

    // ✅ 플레이어와 벽 사이의 충돌 설정
    this.physics.add.collider(this.player, this.walls);

    // ✅ 키보드 입력 설정
    if (!this.input || !this.input.keyboard) {
      console.warn('Keyboard input is not available!');
      return;
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);

    // ✅ 🔥 어둠 레이어 생성
    this.darkness = this.add.graphics();
    this.darkness.setDepth(1000); // 모든 요소 위에 배치

    // ✅ 초기 어둠 적용
    this.updateDarkness();
    // ✅ 출구 충돌 감지
    this.physics.add.overlap(this.player, this.exitTile, this.onExitReached, undefined, this);

    // ✅ NPC와 충돌 감지 → `MeetNPC`로 이동
    this.physics.add.overlap(this.player, this.npcs, (player, npc) => {
      this.handleNPCInteraction(
        player as Phaser.Types.Physics.Arcade.GameObjectWithBody,
        npc as Phaser.Types.Physics.Arcade.GameObjectWithBody,
      );
      console.log('충돌감지!');
    });
  }

  // ✅ 1초마다 실행되는 타이머 함수
  updateTimer() {
    if (this.timeLeft > 0) {
      this.timeLeft -= 1;
      this.timerText.setText(`남은 시간: ${this.timeLeft}`);
    } else {
      this.timerEvent.remove(); // 타이머 종료
      this.failGame(); // "실패!" 애니메이션 실행
    }
  }

  // ✅ 실패 애니메이션 및 게임 오버 처리
  failGame() {
    this.timeLeft = 0;
    this.timerText.setText(`남은 시간: 0`);

    // ✅ 플레이어 이동 중지
    this.player.setVelocity(0, 0);
    // ✅ 키보드 입력 비활성화 (안전하게 적용)
    if (this.input.keyboard) {
      this.input.keyboard.enabled = false;
    }

    // ✅ `this.cursors`를 `null`로 만들지 않고, 입력을 막음
    this.cursors.left.isDown = false;
    this.cursors.right.isDown = false;
    this.cursors.up.isDown = false;
    this.cursors.down.isDown = false;

    // ✅ "실패!" 텍스트 생성 (화면 중앙에 크게 표시)
    const failText = this.add.text(
      this.scale.width / 2,
      -100, // 처음에는 화면 위쪽에 배치
      '실패!',
      {
        fontSize: '80px',
        fontStyle: 'bold',
        color: '#ff0000',
        stroke: '#000000',
        strokeThickness: 6,
      },
    );
    failText.setOrigin(0.5, 0.5);

    // ✅ 애니메이션: "실패!"가 쿵! 떨어지는 효과
    this.tweens.add({
      targets: failText,
      y: this.scale.height / 2, // 화면 중앙으로 떨어짐
      duration: 800, // 0.8초 동안 애니메이션 실행
      ease: 'Bounce.easeOut',
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.scene.restart(); // 2초 후 씬 재시작 (or 다른 로직 추가 가능)
        });
      },
    });
  }
  update() {
    if (this.isExiting) return;
    if (!this.cursors) return;

    // ✅ 플레이어 속도 설정
    const speed = 80;

    // ✅ 플레이어 이동 처리
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    } else {
      this.player.setVelocityY(0);
    }

    // ✅ 플레이어 이동에 따라 어둠 갱신
    this.updateDarkness();
  }

  handleNPCInteraction(
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    npc: Phaser.GameObjects.GameObject
  ) {
    if (this.isInteractingWithNPC) return;
    console.log(player);
  
    if (npc instanceof Phaser.Physics.Arcade.Sprite && npc.body) {
      console.log('엔피씨 충돌 감지:', npc.x, npc.y);
      this.isInteractingWithNPC = true;
  
      this.player.setVelocity(0, 0);
  
      const npcLoc: [number, number] = [Math.floor(npc.x / 16), Math.floor(npc.y / 16)];
      this.fetchMazeData(npcLoc);
  
      if (window.navigateToMeetNPC) {
        window.navigateToMeetNPC();
      }
    } else {
      console.error('❌ NPC가 올바른 Sprite가 아니거나 body가 없음!', npc);
    }
  }
  

  updateDarkness() {
    if (!this.player || !this.darkness) return;
    this.darkness.clear();
    this.darkness.fillStyle(0x000000, 1.0);

    const playerX = this.player.x;
    const playerY = this.player.y;
    const lightRadius = 30;

    // ✅ 원 바깥 네 영역을 덮어서 어둡게 만듦
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    // (1) 원 위쪽 영역 덮기
    this.darkness.fillRect(0, 0, screenWidth, playerY - lightRadius);

    // (2) 원 아래쪽 영역 덮기
    this.darkness.fillRect(
      0,
      playerY + lightRadius,
      screenWidth,
      screenHeight - (playerY + lightRadius),
    );

    // (3) 원 왼쪽 영역 덮기
    this.darkness.fillRect(0, playerY - lightRadius, playerX - lightRadius, lightRadius * 2);

    // (4) 원 오른쪽 영역 덮기
    this.darkness.fillRect(
      playerX + lightRadius,
      playerY - lightRadius,
      screenWidth - (playerX + lightRadius),
      lightRadius * 2,
    );
  }

  // ✅ 출구에 도달하면 어둠을 점점 사라지게 함
  onExitReached() {
    this.isExiting = true;

    this.tweens.add({
      targets: this.darkness,
      alpha: 0, // 어둠이 사라짐
      duration: 100,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.darkness.destroy(); // 어둠 레이어 제거
      },
    });

    this.tweens.add({
      targets: this.bg,
      alpha: 1, // 배경이 서서히 나타남
      duration: 100,
      ease: 'Sine.easeInOut',
    });
    // ✅ React 모달 열기
    if (window.openModal) {
      window.openModal();
    }
  }
}

export default WholeMazeScene;
