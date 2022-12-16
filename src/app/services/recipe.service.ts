import { Injectable} from "@angular/core";
import RecipeModel from "../recipes/models/Recipe.model";
import {exhaustMap, Subject, take} from "rxjs";
import {HttpClient, HttpHeaderResponse, HttpParams} from "@angular/common/http";
import {APP_CONSTANTS} from "../constants/app.constants";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  // recipeSelected = new Subject<RecipeModel>();
  recipesChanged = new Subject<RecipeModel[]>();

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
    return this.http.put<RecipeModel>(`${APP_CONSTANTS.FIREBASE_BASE_URL}/recipes.json`, allRecipes);
  }

  fetchDataFromServer() {
    /**
     *     needs to retrieve auth state of user and send it to the backend, take(1)
     *     only takes one value from the observable
     *     and unsubscribe as it is needed only time. Same as unsubscribing immediately
     *     exhaustMap() waits for the first observable to complete
     *     We can also use interceptors to send headers.
     */

    // one observable inside of another, as we have to wait few time to complete and user in needed in another observable.
    this.authenticationService.userSubject.subscribe((user) => {
      this.http.get<RecipeModel[]>(`${APP_CONSTANTS.FIREBASE_BASE_URL}/recipes.json`)
          .subscribe((data) => {
            this.recipes = data;
            this.recipesChanged.next(this.recipes.slice());
          }, (error) => {
            alert("Error : " + error.error.error);
          })
    });
  }
}
