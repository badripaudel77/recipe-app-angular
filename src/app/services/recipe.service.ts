import { Injectable} from "@angular/core";
import RecipeModel from "../recipes/models/Recipe.model";
import {Subject, take} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { environment } from "../../environments/environment";

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  // recipeSelected = new Subject<RecipeModel>();
  recipesChanged = new Subject<RecipeModel[]>();
  APP_CONSTANTS = environment;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
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
    return this.http.put<RecipeModel>(`${this.APP_CONSTANTS.FIREBASE_BASE_URL}/recipes.json`, allRecipes);
  }

  fetchDataFromServer() {
    /**
     *     needs to retrieve auth state of user and send it to the backend, take(1)
     *     take(1) means only subscribe to the observable once and unsubscribe it. Next time this fetchDataFromServer is called,
     *     do the same.
     *     only takes one value from the observable
     *     and unsubscribe as it is needed only time. Same as unsubscribing immediately
     *     exhaustMap() waits for the first observable to complete
     *     We can also use interceptors to send headers.
     *     Higher order mapping : https://blog.angular-university.io/rxjs-higher-order-mapping/
     */

    this.authenticationService.userSubject.pipe(take(1)).subscribe((user) => {
      this.http.get<RecipeModel[]>(`${this.APP_CONSTANTS.FIREBASE_BASE_URL}/recipes.json`)
        .pipe(map( recipes  => {
           return recipes.map(recipe => {
            return { ... recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }))
          .subscribe((data) => {
            this.recipes = data;
            this.recipesChanged.next(this.recipes.slice());
          }, (error) => {
            alert("Error : " + error.error.error);
          });
    });
  }
}
