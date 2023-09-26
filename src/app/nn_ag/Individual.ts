
import * as tf from '@tensorflow/tfjs';
import NeuralNetwork from './neural_network';
import * as  p5 from 'p5';
import Obstacle from './Obstacle';
export default class Individual {
  /**
   *
   */
  generation: number = 0;

  /**
   *
   */
  fitness: number = 0

  /**
   *
   */
  inputSize: number = 5

  /**
   *
   */
  outputSize: number = 3

  /**
   *
   */
  isAlive: boolean = true

  /**
   *
   */
  neuralNetwork!: NeuralNetwork;

  /**
   *
   */
  x: number = 0;

  /**
   *
   */
  y: number = 0;

  /**
   *
   */
  size: number = 0;


  /**
   *
   */
  isHit = false; // Inicialmente, o jogador não foi atingido

  /**
   *
   */
  color: string = 'black';


  /**
   *
   */
  scoreForTurn = 0;

  /**
   *
   * @param p
   */
  constructor(private p: p5) {
    tf.setBackend('cpu');

    this.x = Math.random() * p.width;
    this.y = p.height - 60;
    this.size = 50;
    this.color = this.getRandomColor();
    this.neuralNetwork = new NeuralNetwork(this.inputSize, this.outputSize);
  }


  /**
   *
   * @param mutationRate
   */
  mutate(mutationRate: number) {
    // this.neuralNetwork.mutate(mutationRate)
    const model = this.neuralNetwork.model; // Clone o modelo para evitar mutações diretas

    // Percorra todas as camadas do modelo
    model.layers.forEach((layer: any) => {
      // Obtenha os pesos da camada
      const weights = layer.getWeights();

      // Percorra cada matriz de pesos e adicione uma mutação
      const mutatedWeights = weights.map((weight: any) => {
        const shape = weight.shape;
        const values = weight.arraySync() as number[][]; // Certifique-se de que o dtype seja compatível

        for (let i = 0; i < shape[0]; i++) {
          for (let j = 0; j < shape[1]; j++) {
            if (Math.random() < mutationRate) {
              // Adicione uma pequena mutação ao peso
              const mutation = (Math.random() * 2 - 1) * 0.1; // Pequena mutação aleatória
              values[i][j] += mutation;
            }
          }
        }

        return tf.tensor(values, shape, 'float32');
      });

      // Defina os novos pesos mutados para a camada
      layer.setWeights(mutatedWeights);
    });

    // Defina o novo modelo mutado no indivíduo
    this.neuralNetwork.model = model;
  }

  /**
   * crossover
   * @param parent1
   * @param parent2
   * @returns
   */
  crossover(parent1: Individual, parent2: Individual): [Individual, Individual] {
    const child1 = new Individual(this.p);
    const child2 = new Individual(this.p);
    try {

      const parent1Model = parent1.neuralNetwork.model;
      const parent2Model = parent2.neuralNetwork.model;

      const childModel1 = tf.sequential();
      const childModel2 = tf.sequential();

      // Iterar pelas camadas dos pais
      parent1Model.layers.forEach((layer1, index) => {
        const layer2 = parent2Model.layers[index];


        if (layer1 && layer2) {

          const weights1 = layer1.getWeights();
          const weights2 = layer2.getWeights();

          const childWeights1: tf.Tensor[] = [];
          const childWeights2: tf.Tensor[] = [];


          for (let i = 0; i < weights1.length; i++) {
            const weight1 = weights1[i];
            const weight2 = weights2[i];


            const crossoverMask = tf.randomUniform(weight1.shape);

            const childWeight1 = tf.cast(tf.add(tf.mul(crossoverMask, weight1), tf.mul(tf.sub(1, crossoverMask), weight2)), 'float32');
            const childWeight2 = tf.cast(tf.add(tf.mul(crossoverMask, weight2), tf.mul(tf.sub(1, crossoverMask), weight1)), 'float32');
            childWeights1.push(childWeight1);
            childWeights2.push(childWeight2);
          }

          childModel1.add(tf.layers.dense({
            units: (layer1 as any).units,
            inputShape: layer1.batchInputShape ? layer1.batchInputShape.slice(1) : undefined,
            activation: 'relu',

            weights: childWeights1,
          }));

          childModel2.add(tf.layers.dense({
            units: (layer2 as any).units,
            inputShape: layer2.batchInputShape ? layer2.batchInputShape.slice(1) : undefined,
            activation: 'relu',
            weights: childWeights2,
          }));
        }

      });

      child1.neuralNetwork.model = childModel1;
      child1.generation = this.generation + 1;
      child2.neuralNetwork.model = childModel2;
      child2.generation = this.generation + 1;

      return [child1, child2];
    } catch (error) {


      return [child1, child2];
    }
  }

  /**
   *
   */
  show() {
    this.p.fill(this.color);
    this.p.rect(this.x, this.y, this.size, this.size);
  }

  /**
   *
   */
  update() {
    if (this.p.keyIsDown(this.p.LEFT_ARROW)) {
      this.x -= 5;

    }
    if (this.p.keyIsDown(this.p.RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = this.p.constrain(this.x, 0, this.p.width - this.size);

  }

  /**
   *
   */
  moveLeft() {
    this.x -= 5;
    this.x = this.p.constrain(this.x, 0, this.p.width - this.size);
  }

  /**
   *
   */
  moveRigth() {
    this.x += 5;
    this.x = this.p.constrain(this.x, 0, this.p.width - this.size);
  }

  /**
   *
   * @returns
   */
  getRandomColor() {
    const red = Math.floor(Math.random() * 256); // Valor entre 0 e 255
    const green = Math.floor(Math.random() * 256); // Valor entre 0 e 255
    const blue = Math.floor(Math.random() * 256); // Valor entre 0 e 255

    const color = `rgb(${red},${green},${blue})`;
    return color;
  }

  /**
   *
   * @param coordsList
   * @returns
   */
  sortByProximity(coordsList: Obstacle[]): Obstacle[] {
    const targetX = this.x;
    const targetY = this.y;

    coordsList.forEach(obstacle => {
      obstacle.distance = this.calculateDistance(obstacle.x, obstacle.y, targetX, targetY);
    });


    coordsList.sort((obstacle1, obstacle2) => obstacle1.distance - obstacle2.distance);

    return coordsList;
  }

  /**
   *
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @returns
   */
  calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
}
