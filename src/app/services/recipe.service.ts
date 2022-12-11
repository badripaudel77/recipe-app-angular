import { Injectable} from "@angular/core";
import RecipeModel from "../recipes/models/Recipe.model";
import {IngredientModel} from "../common/Ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  // recipeSelected = new Subject<RecipeModel>();
  recipesChanged = new Subject<RecipeModel[]>();

  private recipes: RecipeModel[] = [
    new RecipeModel('Default recipe',
      'About default recipe',
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      [new IngredientModel('Default IG 1', 5), new IngredientModel('Default IG 2', 3)])
  ];

  public getRecipes() {
     return this.recipes.slice(); // return the copy of the array as arrays are reference type.
  }

  public getSingleRecipe(recipeIndex: number): RecipeModel {
     // return this.recipes.slice()[recipeId]; // index
     return this.recipes[recipeIndex]; // index
  }

  /**
   * Adds the new recipe
   * @param recipe
   */
  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Updates the existing recipe
   * @param recipe
   * @param index
   */
  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
