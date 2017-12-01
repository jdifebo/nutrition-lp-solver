import { Component, OnInit } from '@angular/core';

import { FoodService } from "../food.service";

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html'
})
export class FoodSearchComponent implements OnInit {
  searchByName = "";
  allFoods = [];

  foodsToDisplay = [];

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.allFoods = Object.keys(this.foodService.foods).map(id => this.foodService.foods[id]);
    this.filterFoods();
  }

  filterFoods() {
    console.log("Total foods loaded:" , this.allFoods.length)
    this.foodsToDisplay = this.allFoods
      .filter(food => food.longDescription && food.longDescription.match(new RegExp(this.searchByName, "i")))
      .slice(0, 20);
    console.log(this.foodsToDisplay);
  }

  doFilter() {
    this.filterFoods();
  }
}
