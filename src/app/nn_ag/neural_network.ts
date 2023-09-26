import * as tf from '@tensorflow/tfjs';

export default class NeuralNetwork {

  model!: tf.Sequential
  private hidden_nodes = 25;

  /**
   *
   * @param inputSize
   * @param outputSize
   */
  constructor(inputSize: number, outputSize: number) {
    tf.setBackend('cpu');
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: this.hidden_nodes * 4, activation: 'relu', inputShape: [25], }));
    model.add(tf.layers.dense({ units: outputSize, activation: 'softmax' }));
    model.compile({ loss: tf.losses.softmaxCrossEntropy, optimizer: 'adam', metrics: ['accuracy'] })

    this.model = model;
  }


  /**
   *
   * @param input
   * @returns
   */
  predict(input: number[]): number {

    const tensorInput = tf.tensor([input]);
    const prediction = this.model.predict(tensorInput) as tf.Tensor;
    const argMax = prediction.argMax(1).dataSync()[0]
    return argMax
  }

  /**
   *
   * @param input
   * @param classes
   * @returns
   */
  predictClass(input: number[], classes: string[]) {

    const tensorInput = tf.tensor([input]);
    const prediction = this.model.predict(tensorInput) as tf.Tensor;
    const argMax = prediction.argMax(1).dataSync()[0]
    return classes[argMax]
  }

  /**
   *
   * @returns
   */
  getWeights(): tf.Tensor[] {
    return this.model.getWeights();
  }

  /**
   *
   * @param weights
   */
  setWeights(weights: tf.Tensor[]): void {
    this.model.setWeights(weights);
  }


  /**
   *
   * @param rate
   */
  mutate(rate: number) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (Math.random() < rate) {
            let w = values[j];
            const mutation = (Math.random() * 2 - 1) * 0.1; // Pequena mutação aleatória

            values[j] = w + mutation;
          }
        }
        let newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }
      this.model.setWeights(mutatedWeights);
    });
  }
}
