import { Component } from '@angular/core';
import { FoodService } from './food.service';
import { RequirementsService } from './requirements.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private foodService: FoodService, private requirementsService: RequirementsService) {  }

  loaded = false;

  isLoaded() {
    return this.foodService.isLoaded() && this.requirementsService.isLoaded();
  }
}
