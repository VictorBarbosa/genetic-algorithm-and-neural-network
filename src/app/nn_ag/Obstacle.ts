import Individual from './Individual';

export class Obstacle {
  x: any;
  y: number;
  speed: any;
  width: any;
  height: any;
  distance: number = 0;
  constructor(private p: any) {
    this.x = p.random(-p.width, p.width - 20);
    this.y = -20;
    // this.speed = p.random(2, 3.5);
    this.speed = 2;
    // this.width = p.random(20, 50);
    // this.height = p.random(20, 50);
    this.width = 40;
    this.height = 40;
  }

  /**
   * Show the obstacles
   */
  show() {
    this.p.fill(0, 0, 255);
    this.p.rect(this.x, this.y, this.width, this.height);
  }

  /**
   * Updade the scene
   */
  update() {
    this.y += this.speed;
  }

  /**
   * Check if the the obstacle is on the screen of offscreen
   * @returns
   */
  offscreen() {
    return this.y > this.p.height;
  }

  /**
   * Check if has a collision between the block and player
   * @param players
   * @returns
   */
  hits(players: Individual[]): { collided: boolean; index: number; }[] {
    const collisions = [];

    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      if (player.x + player.size > this.x &&
        player.x - player.size < this.x &&
        player.y + player.size > this.y - 10 &&
        player.y - player.size < this.y - 10) {

        players[i].isAlive = false;
        collisions.push({ collided: true, index: i });
      }
    }


    return collisions;
  }



}
