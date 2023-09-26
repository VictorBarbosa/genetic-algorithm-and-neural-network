import { Component, ElementRef, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs'
import * as p5 from 'p5';

import Obstacle from '../nn_ag/Obstacle';
import Individual from '../nn_ag/Individual';

@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
  styleUrls: ['./test-model.component.scss']
})
export class TestModelComponent {

  /**
   * model
   */
  model!: tf.LayersModel

  /**
   *  p5
   */
  private p5!: p5

  /**
   * Population
   */
  population: Individual[] = [];


  /**
   *
   */
  obstacles: Obstacle[] = []

  /**
  *
  */
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | null = null;

  /**
   * Generation
   */
  get generation(): number {
    return this.population[0].generation
  }


  /**
   * Total Alive
   */
  get totaAlive(): number {
    return this.population.filter(f => f.isAlive).length
  }

  /**
   * Grid Cubes
   */
  get gridCubes() {
    return this.population.sort((a, b) => {
      if (a.scoreForTurn < b.scoreForTurn) { return 1; }
      if (a.scoreForTurn > b.scoreForTurn) { return -1; }
      return 0;
    });
  }


  obstacleSize: number = 30;

  /**
   * Constructor
   */
  constructor() { }

  /**
   *  On Init
   */
  async ngOnInit() {
    this.model = await tf.loadLayersModel('localstorage://my-model-1');
    this.createCanvas();
  }

  /**
   * Create Canvas
   */
  private createCanvas() {
    this.p5 = new p5(this.sketch.bind(this));
  }

  /**
   * Sketch
   * @param p
   */
  private sketch(p: any) {
    let score = 0;
    let populationSize = 1;


    p.setup = () => {
      if (window.innerWidth < 767) {
        p.createCanvas(window.innerWidth, window.innerHeight / 2, this.canvas?.nativeElement);

      } else {
        p.createCanvas(window.innerWidth - 290, window.innerHeight - 70, this.canvas?.nativeElement);

      }

      for (let i = 0; i < populationSize; i++) {
        this.population.push(new Individual(p));
      }


      // Adicione alguns obstáculos iniciais
      let current = 0
      for (let i = 0; i < this.obstacleSize; i++) {
        const obstacle = new Obstacle(p);
        obstacle.y = current
        this.obstacles.push(obstacle);
        current -= 100
      }
    };

    p.draw = () => {
      p.background(220);

      let pop = this.population.filter(f => f.isAlive)

      this.obstacles = this.obstacles.sort((a, b) => {
        if (a.y < b.y) { return 1; }
        if (a.y > b.y) { return -1; }
        return 0;
      })

      const last = this.obstacles[this.obstacles.length - 1];
      // if (p.frameCount % 10 === 0 && last.y > 0) {
      if (last.y > 0 && this.obstacles.length < this.obstacleSize) {
        this.obstacles.push(new Obstacle(p));
      }


      if (pop.length > 0) {

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          this.obstacles[i].show();
          this.obstacles[i].update();
          const collisionResults = this.obstacles[i].hits(pop);
          for (const collisionResult of collisionResults) {
            if (collisionResult.collided) {
              console.log('Game Over! Collision at index:', collisionResult.index);
            }
          }
          if (this.obstacles[i] && this.obstacles[i].offscreen()) { // Verifique se o obstáculo ainda existe
            this.obstacles.splice(i, 1);
            score++;
          }
        }

        pop.filter(x => x.isAlive).forEach(f => f.scoreForTurn += 0.01)
      }

      for (let player of pop) {
        player.update();
        player.show();


        const nearBy = player.sortByProximity(this.obstacles);
        if (nearBy) {


          const values = [player.x, player.y, nearBy[0].x, nearBy[0].y, nearBy[0].distance];

          const actions =this.predictClass(values, ["Left", "Center", "Right"])

          switch (actions) {
            case "Left": player.moveLeft(); break;
            case "Right": player.moveRigth(); break;

          }
        }

      }

      p.fill(0);
      p.textSize(24);

      p.text(`Score: ${score}`, 40, 30);
    };

  }

  /**
   * Predict Class
   * @param input
   * @param classes
   * @returns
   */
  predictClass(input: number[], classes: string[]) {

    const tensorInput = tf.tensor2d([input]);
    const prediction = this.model.predict(tensorInput) as tf.Tensor;

    const argMax = prediction.argMax(1).dataSync()[0]
    return classes[argMax]
  }

}
