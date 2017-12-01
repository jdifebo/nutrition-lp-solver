import { Injectable } from '@angular/core';
import { FoodService } from './food.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequirementsService {

  requirements;

  private loaded = 0;

  constructor(private httpClient: HttpClient, private foodService: FoodService) {
    this.httpClient.get("assets/rda.json").subscribe(data => {
      this.requirements = data;
      this.loaded++;
    });
  }

  isLoaded() {
    return Boolean(this.requirements);
  }

  getRequirements() {
    return this.requirements;
  }

  getFormattedRequirements() {
    let nutrients = this.foodService.nutrients;
    let formatted = {};
    Object.keys(this.requirements.males["19-to-30"]).forEach(nutrientDescription => {
      let nutrientId = Object.keys(nutrients).filter(id => nutrients[id].description == nutrientDescription)[0];
      formatted[nutrientId] = {min: this.requirements.males["19-to-30"][nutrientDescription]}
    })
    return formatted;
  }
}
