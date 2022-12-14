import { Injectable} from "@angular/core";
import RecipeModel from "../recipes/models/Recipe.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {APP_CONSTANTS} from "../constants/app.constants";

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  // recipeSelected = new Subject<RecipeModel>();
  recipesChanged = new Subject<RecipeModel[]>();

  constructor(private http: HttpClient) {
  }

  private recipes: RecipeModel[] = [];

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

  /*
    * Firebase overwrites the existing data by new data that is passed as [new data] if put request is sent.
    * recipes.json [.json is required for firebase to work, recipes will be the name of the folder]
  */
  saveRecipes() {
    let allRecipes: RecipeModel[] = this.getRecipes();
    return this.http.put<RecipeModel>(`${APP_CONSTANTS.FIREBASE_BASE_URL}/recipes.json`, allRecipes); // returns observable.
  }

  fetchDataFromServer() {
     this.http.get<RecipeModel[]>(`${APP_CONSTANTS.FIREBASE_BASE_URL}/recipes.json`)
      .subscribe((data) => {
       this.recipes = data;
       this.recipesChanged.next(this.recipes.slice());
      }, (error) => {
        alert("Error : " + error.getMessage());
        });
  }
}
