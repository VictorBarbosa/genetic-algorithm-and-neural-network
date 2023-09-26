import * as p5 from 'p5';
import Individual from './Individual';

export default class Obstacle {

  x: any;
  y: any;
  speed: any;
  width: any;
  height: any;
  distance: number = 0;
  constructor(private p: p5) {
    this.x = p.random(-p.width, p.width);
    this.y = -100;
    this.speed = 4;
    this.width = 40;
    this.height = 40;
  }

  /**
   * Show the obstacles
   */
  show() {
    if (this.y > 0) {
      this.p.fill(0, 0, 255);
      this.p.rect(this.x, this.y, this.width, this.height);
      this.p.fill(255, 255, 255)
      this.p.text(this.y, this.x, this.y + 36,)
    }
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

      const playerXPlus = player.x + player.size;
      const playerXLess = player.x - player.size;
      const playerYPlus = player.y + player.size;
      const playerYLess = player.y - player.size;

      if (playerXPlus + 2 > this.x
        && playerXLess + 8 < this.x
        && playerYPlus > this.y - 12
        && playerYLess < this.y - 12) {

        players[i].isAlive = false;
        collisions.push({ collided: true, index: i });
      }
    }

    return collisions;
  }

  /**
   *
   */
  destroy() {
    this.y += this.y;
  }

}
