import {EventEmitter, Injectable} from "@angular/core";
import RecipeModel from "../recipes/models/Recipe.model";
import {IngredientModel} from "../common/Ingredient.model";

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  recipeSelected = new EventEmitter<RecipeModel>();

  private recipes: RecipeModel[] = [
    new RecipeModel('Recipe 1 name',
      'Recipe 1 Desc',
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      [new IngredientModel('Mushroom', 5), new IngredientModel('Pumpkin', 3)]),
    new RecipeModel('Recipe 2 name',
      'Recipe 2 Desc',
      'https://images.pexels.com/photos/3806983/pexels-photo-3806983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      [new IngredientModel('Banana', 12), new IngredientModel('Apple', 6)]),
  ];

  public getRecipes() {
     return this.recipes.slice(); // return the copy of the array as arrays are reference type.
  }

  public getSingleRecipe(recipeIndex: number): RecipeModel {
     // return this.recipes.slice()[recipeId]; // index
     return this.recipes[recipeIndex]; // index
  }
}
