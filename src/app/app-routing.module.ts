import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {NoRecipeSelectedComponent} from "./recipes/no-recipe-selected/no-recipe-selected.component";
import {RecipesDetailComponent} from "./recipes/recipes-detail/recipes-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: "full" },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: NoRecipeSelectedComponent }, // /recipes/, /recipes
      { path: 'add', component: RecipeEditComponent }, // /recipes/add
      { path: ':id', component: RecipesDetailComponent }, // /recipes/{{someId}
      { path: ':id/edit', component: RecipeEditComponent }, // /recipes/{{someId}}/edit
    ]
  },// parent route : /recipes
  { path: 'shopping-list', component: ShoppingListComponent }, // /shopping-list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
