import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodSearchComponent } from './food-search/food-search.component'
import { SingleFoodComponent } from './single-food/single-food.component';
import { RecipeCalculatorComponent } from './recipe-calculator/recipe-calculator.component';
import { OptimizerComponent } from './optimizer/optimizer.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'foods', component: FoodSearchComponent },
  { path: 'foods/:id', component: SingleFoodComponent },
  { path: 'recipe-calculator', component: RecipeCalculatorComponent },
  { path: 'optimizer', component: OptimizerComponent },
  { path: 'about', component: AboutComponent },
  { path: "**", redirectTo: "foods"}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}