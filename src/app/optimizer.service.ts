import { Injectable } from '@angular/core';
import * as solver from "javascript-lp-solver"

@Injectable()
export class OptimizerService {

  constructor() { }

  solve(foodsToOptimize, requirements) {
    let variables = {}
    foodsToOptimize.forEach(food => {
      variables[food.id] = {};
      food.nutrients.forEach(nutrient => {
        variables[food.id][nutrient.nutrientId] = nutrient.value
      });
    });
    let model = {
      "optimize": "208",
      "opType": "min",
      "constraints": requirements,
      "variables": variables
    };

    let results = solver.Solve(model);
    // results.foods = foodsToOptimize.map(food => {
    //   return {
    //     results[food.id]
    //   }
    // })

    return results;
  }


}
