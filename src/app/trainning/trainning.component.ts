import { Component, ElementRef, ViewChild } from '@angular/core';
import * as p5 from 'p5';
import GeneticAlgorithm from '../nn_ag/genetic-algorithm';

import Obstacle from '../nn_ag/Obstacle';
import Individual from '../nn_ag/Individual';
import { BehaviorSubject, distinctUntilChanged, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trainning',
  templateUrl: './trainning.component.html',
  styleUrls: ['./trainning.component.scss']
})
export class TrainningComponent {
  /**
   *
   */
  private p5!: p5;

  /**
   *
   */
  population: Individual[] = [];

  /**
   *
   */
  obstacles: Obstacle[] = []

  /**
   *
   */
  geneticAlgorithm: GeneticAlgorithm = new GeneticAlgorithm(2, null)

  /**
   *
   */
  showStatitics: boolean = false;

  /**
   *
   */
  obstacleSize: number = 90;

  /*
   * PopulationSize
   */
  private readonly _populationSize = new BehaviorSubject<number>(50);
  populationSize$ = this._populationSize.asObservable().pipe(distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));

  /*
  * PopulationSize getter
  */
  get populationSize(): number {
    return this._populationSize.getValue();
  }

  /*
   * PopulationSize setter
   */
  set populationSize(value: number) {
    if (this._populationSize.getValue() !== value) {
      this._populationSize.next(value);
    }
  }


  /**
  *
  */
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | null = null;

  /**
   *
   */
  get generation(): number {
    return this.population[0].generation
  }

  /**
   *
   */
  get totaAlive(): number {
    return this.population.filter(f => f.isAlive).length
  }

  /**
   *
   */
  get gridCubes() {
    return this.population.sort((a, b) => {
      if (a.scoreForTurn < b.scoreForTurn) { return 1; }
      if (a.scoreForTurn > b.scoreForTurn) { return -1; }
      return 0;
    });
  }

  /**
   *
   */
  get canTest(): boolean {
    const hasModelSaved = localStorage.getItem('tensorflowjs_models/my-model-1/info') !== null;
    const bestScore = Number(localStorage.getItem('bestScore'))
    const scoreForTurn = this.gridCubes[0]?.scoreForTurn || 0

    if (scoreForTurn > 60 || hasModelSaved) {
      if (bestScore < scoreForTurn) {
        this.gridCubes[0].neuralNetwork.model.save('localstorage://my-model-1');
        localStorage.setItem('bestScore', this.bestScore.toString())
      }
      return true
    }
    return false;
  }


  /**
   *
   */
  get bestScore(): number {
    return this.gridCubes[0].scoreForTurn
  }

  constructor(private router: Router) { }

  ngOnInit() {


    this.populationSize$.pipe(tap((() => {
      if (this.p5) {
        this.population = [];


        this.p5.setup();
        this.p5.draw();
      }
    }))).subscribe()
    this.createCanvas()
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch.bind(this));
  }

  private sketch(p: p5) {

    let score = 0;

    p.setup = () => {
      if (window.innerWidth < 767) {
        p.createCanvas(window.innerWidth, window.innerHeight / 2, this.canvas?.nativeElement);

      } else {
        p.createCanvas(window.innerWidth - 290, window.innerHeight - 70, this.canvas?.nativeElement);

      }

      p.frameRate(120)
      for (let i = 0; i < this.populationSize; i++) {
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

      //Create new Population
      if (pop.length === 0) {

        pop = this.geneticAlgorithm.generateNextGeneration(0.3, this.population)

        pop.forEach(x => {
          x.scoreForTurn = 0,
            x.isAlive = true
        })
        this.population = pop;
      }


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
          const hit = this.obstacles[i].hits(pop);
          if (hit.length > 0) {
            this.obstacles[i].destroy();
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

          // const input = this.createInput(nearBy, player, this.obstacleSize)
          // player.neuralNetwork.predict(input)
          // const actions = player.neuralNetwork.predictClass(input, ["Left", "Center", "Right"])




          const values = [player.x, player.y, nearBy[0].x, nearBy[0].y, nearBy[0].distance];
          player.neuralNetwork.predict(values)
          const actions = player.neuralNetwork.predictClass(values, ["Left", "Center", "Right"])

          switch (actions) {
            case "Left": player.moveLeft(); break;
            case "Right": player.moveRigth(); break;

          }
        }

      }

      p.fill(0);
      p.textSize(24);

      p.text(`Generation: ${this.generation}`, 40, 30);
      p.text(`Total alive: ${this.totaAlive}`, 40, 50);
    };

  }

  async saveModel() {
    this.gridCubes[0].neuralNetwork.model.save('localstorage://my-model-1');

    this.router.navigate(['test-model']);

  }


  createInput(obstacles: Obstacle[], player: Individual, inputSize: number) {

    let input: any[] = [];
    obstacles.forEach(obstacle => input.push([player.x, player.y, obstacle.x, obstacle.y, obstacle.distance]))

    for (let i = input.length; i < (inputSize + 1); i++) {
      input.push([player.x, player.y, -1, -1, -1])
    }

    const flat = (input.slice(0, 5) as any).flat()

    return flat

  }
}
