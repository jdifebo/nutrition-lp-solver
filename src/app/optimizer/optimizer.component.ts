import { Component, OnInit } from '@angular/core';
import { OptimizerService } from '../optimizer.service';
import { FoodService } from '../food.service';
import { RequirementsService } from '../requirements.service';

@Component({
  selector: 'app-optimizer',
  templateUrl: './optimizer.component.html'
})
export class OptimizerComponent implements OnInit {

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
    let temp = new Set(["05011", "11090", "16087"]);
    let allFoods = Object.keys(this.foodService.foods).map(key => this.foodService.foods[key]);
    this.nutrients = this.foodService.nutrients;
    this.foodsToOptimize = allFoods.filter(food => food.survey);//.filter(food => temp.has(food.id));
    let count = 0;
    this.foodsToOptimize.forEach(food => {
      food.nutrientMap = {};
      food.nutrients.forEach(nutrient => {
        food.nutrientMap[nutrient.nutrientId] = nutrient;
      })
    });
    this.foodsToOptimize = this.foodsToOptimize.filter(this.doCaloriesAddUp);
    this.requirements = this.requirementsService.getFormattedRequirements();
    this.nutrientsToInclude = Object.keys(this.requirements);
    this.calculate();
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
    let kcal = food.nutrientMap["208"].value;
    let protein = food.nutrientMap["203"].value;
    let fat = food.nutrientMap["204"].value;
    let netCarbs = food.nutrientMap["205"].value - food.nutrientMap["291"].value;
    let alcohol = food.nutrientMap["221"].value;
    let calculatedCalories = protein * 4 + netCarbs * 4 + fat * 9 + alcohol * 7;
    return calculatedCalories * .5 < kcal && calculatedCalories * 2 > kcal
  }
}
