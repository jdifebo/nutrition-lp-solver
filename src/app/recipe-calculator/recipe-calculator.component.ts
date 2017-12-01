import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { TopTen } from '../TopTen';

@Component({
  selector: 'app-recipe-calculator',
  templateUrl: './recipe-calculator.component.html'
})
export class RecipeCalculatorComponent implements OnInit {

  foods = [
    { name: "" }
  ]

  topTen = new TopTen();

  constructor(private foodService: FoodService) { }

  ngOnInit() {
  }

  lookupByName() {
    let input = new Set(this.tokenize(this.foods[0].name.toLowerCase()));
    this.topTen = new TopTen();
    Object.keys(this.foodService.foods).map(id => {
      if (this.foodService.foods[id].longDescription) {
        let foodName = this.foodService.foods[id].longDescription.toLowerCase();
        let foodTokens = new Set(this.tokenize(foodName));
        let score = 0;
        input.forEach(token => foodTokens.has(token) ? score += 1/input.size : null);
        foodTokens.forEach(token => input.has(token) ? score += 1/foodTokens.size : null);
        this.topTen.insert(foodName, score);
      }
    })
    this.topTen.log();
  }

  tokenize(foodName: string): string[] {
    return foodName.split(/\W+/i);
  }
}
