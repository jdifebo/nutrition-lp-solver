import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FoodService {

  foods = {};
  nutrients = {}

  private loaded = 0;

  constructor(private httpClient: HttpClient) {
    this.loadFoods();


    this.httpClient.get("assets/nutrientDefinitions.json").subscribe(data => {
      this.nutrients = data;
      this.loaded++;
    });
  }

  isLoaded() {
    return this.loaded == 2;
  }

  getFoods() {
    return this.foods;
  }

  private loadFoods() {
    if (localStorage.foods) {
      this.foods = JSON.parse(localStorage.foods);
      this.loaded++;
    }
    else {
      this.httpClient.get("assets/foodDescriptions.json").subscribe(data => {
        this.foods = data;
        this.loaded++;
        // localStorage.foods = JSON.stringify(data);
      });
    }
  }

}
