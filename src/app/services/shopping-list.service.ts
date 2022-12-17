import { Injectable} from "@angular/core";
import {IngredientModel} from "../common/Ingredient.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

/**
 * Replace EventEmitter with Subject for cross component interaction.
 * for @Output() we still need EventEmitter
 */

export class ShoppingListService {

  ingredientsChanged = new Subject<IngredientModel[]>();
  shoppingEditIndex = new Subject<number>();

  private ingredients: IngredientModel [] = [];

  APP_CONSTANTS = environment;

  constructor(private http: HttpClient) {

  }

  public getIngredients() {
    this.getIngredientsFromServer();
    return this.ingredients.slice(); // returning the copy of the array
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(addedIngredient: IngredientModel) {
    this.ingredients.push(addedIngredient); // pushing to original array
    this.updateIngredients();
  }

  updateIngredient(index: number, updatedIngredient: IngredientModel) {
    this.ingredients[index] = updatedIngredient;
    //this.ingredientsChanged.next(this.ingredients.slice()); // emitted from here, ingredientsChanged can be listened to and subscribe.
    this.updateIngredients();
  }

  // Add ingredients coming from the
  addIngredients(addedIngredients: IngredientModel[]) {
    if(addedIngredients.length>0) {
        this.ingredients.push(...addedIngredients);
        this.updateIngredients();
    }
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.updateIngredients();
  }

  getIngredientsFromServer() {
     this.http.get<IngredientModel[]>(`${this.APP_CONSTANTS.FIREBASE_BASE_URL}/ingredients.json`)
      .subscribe((data) => {
        this.ingredients = data ? data : [];
        this.ingredientsChanged.next(this.ingredients.slice())
      })
  }

  updateIngredients() {
    let allIngredients: IngredientModel[] = this.getIngredients();
    // returns observable.
     return this.http.put<IngredientModel[]>(`${this.APP_CONSTANTS.FIREBASE_BASE_URL}/ingredients.json`, allIngredients)
       .subscribe((data) => {
         if(data && data.length > 0) {
           this.ingredients = data;
         }
         else {
           this.ingredients = [];
         }
         this.ingredientsChanged.next(this.ingredients.slice());
       },
         error => {
           window.alert(error.error.error);
         });
    }

}
