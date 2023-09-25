import * as p5 from "p5";
import Individual from "./Individual";



export default class GeneticAlgorithm {

  population: Individual[] = [];

  constructor(populationSize: number, p: p5 | null) {
    if (p) {

      for (let i = 0; i < populationSize; i++) {
        const individual = new Individual(p);
        this.population.push(individual);
      }
    }
  }



  select(): Individual[] {
    const selectedIndividuals: Individual[] = [];
    const totalFitness = this.population.reduce((total, individual) => total + individual.fitness, 0);

    for (let i = 0; i < this.population.length; i++) {
      let randomNumber = Math.random() * totalFitness;
      let sumFitness = 0;

      for (const individual of this.population) {
        sumFitness += individual.fitness;
        if (sumFitness >= randomNumber) {
          selectedIndividuals.push(individual);
          break;
        }
      }
    }

    return selectedIndividuals;
  }


  sortParent() {
    const children = this.population.sort((a, b) => b.fitness - a.fitness);
    return children[0];
  }

  generateNextGeneration(mutateRate: number, oldGeneration: Individual[]) {
    // this.evaluate(targetX, targetY, currentX, currentY);

    this.population = oldGeneration
    const bestParent = this.sortParent();
    const selectedIndividuals = this.select();

    const newGeneration: Individual[] = [];

    while (newGeneration.length < this.population.length) {
      const parent1 = selectedIndividuals[Math.floor(Math.random() * selectedIndividuals.length)];
      const parent2 = selectedIndividuals[Math.floor(Math.random() * selectedIndividuals.length)];
      // const parent1 = this.population[0];
      // const parent2 = this.population[1];
      const [child1, child2] = parent1.crossover(parent1, parent2);


      child1.mutate(mutateRate);

      child2.mutate(mutateRate);

      newGeneration.push(child1, child2);

    }


    const last = newGeneration.length - 1;
    bestParent.isAlive = true;
    bestParent.scoreForTurn = 0;
    newGeneration[last] = bestParent
    // newGeneration[last - 1] = bestParent

    this.population = newGeneration;


    return this.population
  }


}

