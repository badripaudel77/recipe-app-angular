import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {NoRecipeSelectedComponent} from "./recipes/no-recipe-selected/no-recipe-selected.component";
import {RecipesDetailComponent} from "./recipes/recipes-detail/recipes-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: "full" },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    // Children components need => <router-outlet></router-outlet> where they (children components) will be displayed in UI
    children: [
      { path: '', component: NoRecipeSelectedComponent }, // /recipes/, /recipes
      { path: 'add', component: RecipeEditComponent }, // /recipes/add
      { path: ':id', component: RecipesDetailComponent }, // /recipes/{{someId}
      { path: ':id/edit', component: RecipeEditComponent }, // /recipes/{{someId}}/edit
    ]
  },// parent route : /recipes
  { path: 'shopping-list', component: ShoppingListComponent }, // /shopping-list
  { path: 'auth', component: AuthenticationComponent }, // /auth-route
  { path: '**', redirectTo: '/recipes' }, // to /recipes if no path matches
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
