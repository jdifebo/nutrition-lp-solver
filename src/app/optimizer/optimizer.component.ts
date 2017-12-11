import { Component, OnInit } from '@angular/core';
import { OptimizerService } from '../optimizer.service';
import { FoodService } from '../food.service';
import { RequirementsService } from '../requirements.service';

@Component({
  selector: 'app-optimizer',
  templateUrl: './optimizer.component.html'
})
export class OptimizerComponent implements OnInit {

  survey = true;
  hasCalories = true;
  addsUp = true;

  allFoods = [];
  foodsToOptimize = [];
  foodsInResults = [];
  requirements = {};
  nutrientsToInclude = [];
  results: any;
  nutrients: any;

  constructor(private foodService: FoodService, 
              private requirementsService: RequirementsService,
              private optimizerService: OptimizerService) { }

  ngOnInit() {
    this.allFoods = Object.keys(this.foodService.foods).map(key => this.foodService.foods[key]);
    this.nutrients = this.foodService.nutrients;
    this.allFoods.forEach(food => {
      food.nutrientMap = {};
      food.nutrients.forEach(nutrient => {
        food.nutrientMap[nutrient.nutrientId] = nutrient;
      })
    });
    this.requirements = this.requirementsService.getFormattedRequirements();
    this.nutrientsToInclude = Object.keys(this.requirements);

    this.chooseDataset();
  }

  chooseDataset() {
    this.foodsToOptimize = this.allFoods;
    if (this.survey) {
      this.foodsToOptimize = this.foodsToOptimize.filter(food => food.survey);
    }
    if (this.addsUp) {
      this.foodsToOptimize = this.foodsToOptimize.filter(this.doCaloriesAddUp);
    }
  }

  calculate() {
    this.results = this.optimizerService.solve(this.foodsToOptimize, this.requirements);
    this.foodsInResults = this.foodsToOptimize.filter(food => this.results[food.id]);
  }

  totalOfNutrient(nutrientId){
    return this.foodsInResults.map(food => {
      if (food.nutrientMap[nutrientId]){
        return food.nutrientMap[nutrientId].value * this.results[food.id]
      }
      else {
        console.log(this.nutrients[nutrientId].description, food.longDescription);
        return 0;
      }
    }).reduce(this.sum);
  }

  sum = (x, y) => x + y;

  doCaloriesAddUp(food){
    if (food.nutrientMap["208"] == undefined){
      return false;
    }
    let kcal = food.nutrientMap["208"].value;
    let protein = food.nutrientMap["203"].value;
    let fat = food.nutrientMap["204"].value;
    let carbs = food.nutrientMap["205"].value;
    let fiber = food.nutrientMap["291"] ? food.nutrientMap["291"].value : 0;
    let netCarbs = carbs - fiber;
    let alcohol = food.nutrientMap["221"] ? food.nutrientMap["221"].value : 0;
    let calculatedCalories = protein * 4 + netCarbs * 4 + fat * 9 + alcohol * 7;
    return calculatedCalories * .75 < kcal && calculatedCalories * 1.33 > kcal
  }
}
