import * as tf from '@tensorflow/tfjs';

export default class NeuralNetwork {

  model!: tf.Sequential
  private hidden_nodes = 25;

  constructor(inputSize: number, outputSize: number) {
    tf.setBackend('cpu');
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: this.hidden_nodes * 4, activation: 'relu', inputShape: [inputSize], }));
    // model.add(tf.layers.dense({ units: this.hidden_nodes * 4, activation: 'relu', inputShape: [25], }));


    // model.add(tf.layers.dense({ units: 6, activation: 'relu', inputShape: [30, 5], }));
    // model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [150], }));
    // model.add(tf.layers.dense({ units: 4, activation: 'relu', }));
    // model.add(tf.layers.dense({ units: 4, activation: 'relu', }));
    // // model.add(tf.layers.dense({ units: 3, activation: 'relu', }));

    model.add(tf.layers.dense({ units: outputSize, activation: 'softmax' }));
    model.compile({ loss: tf.losses.softmaxCrossEntropy, optimizer: 'adam',metrics:['accuracy']})
    // model.compile({ loss: tf.losses.sigmoidCrossEntropy, optimizer: 'sgd',metrics:['accuracy']})
    this.model = model;
  }



  predict(input: number[]): number {


    const tensorInput = tf.tensor([input]);
    const prediction = this.model.predict(tensorInput) as tf.Tensor;

    const argMax = prediction.argMax(1).dataSync()[0]


    return argMax
  }

  predictClass(input: number[], classes: string[]) {

    const tensorInput = tf.tensor([input]);
    const prediction = this.model.predict(tensorInput) as tf.Tensor;

    const argMax = prediction.argMax(1).dataSync()[0]

    return classes[argMax]
  }


  getWeights(): tf.Tensor[] {
    return this.model.getWeights();
  }

  setWeights(weights: tf.Tensor[]): void {
    this.model.setWeights(weights);
  }


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
            // values[j] = w + this.randomGaussian();
          }
        }
        let newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }
      this.model.setWeights(mutatedWeights);
    });
  }

  randomGaussian(mean = 0, stdDev = 1): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converte [0,1) para (0,1)
    while (v === 0) v = Math.random(); // Converte [0,1) para (0,1)
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + stdDev * z;
  }

}
