import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { FoodService } from './food.service';

import { AppComponent } from './app.component';
import { FoodSearchComponent } from './food-search/food-search.component';
import { LoadingComponent } from './loading/loading.component';
import { AppRoutingModule } from './/app-routing.module';
import { SingleFoodComponent } from './single-food/single-food.component';
import { RecipeCalculatorComponent } from './recipe-calculator/recipe-calculator.component';
import { OptimizerComponent } from './optimizer/optimizer.component';
import { OptimizerService } from './optimizer.service';
import { AboutComponent } from './about/about.component';
import { RequirementsService } from './requirements.service';

@NgModule({
  declarations: [
    AppComponent,
    FoodSearchComponent,
    LoadingComponent,
    SingleFoodComponent,
    RecipeCalculatorComponent,
    OptimizerComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    FoodService,
    RequirementsService,
    OptimizerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
