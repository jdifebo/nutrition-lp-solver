import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-single-food',
  templateUrl: './single-food.component.html'
})
export class SingleFoodComponent implements OnInit {

  path = "";

  food = null;
  nutrients = null;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService) {  }

  ngOnInit() {
    this.nutrients = this.foodService.nutrients;
    this.activatedRoute.url.subscribe(url => this.food = this.foodService.foods[url[1].toString()]);
  }

}
