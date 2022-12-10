import { Injectable} from "@angular/core";
import {IngredientModel} from "../common/Ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * Replace EventEmitter with Subject for cross component interaction.
 * for @Output() we still need EventEmitter
 *
 */

export class ShoppingListService {

  ingredientsChanged = new Subject<IngredientModel[]>();
  shoppingEditIndex = new Subject<number>();

  private ingredients: IngredientModel [] = [
    new IngredientModel('Noodles', 12),
    new IngredientModel('Flour', 2),
    new IngredientModel('Tomatoes', 10),
  ];

  public getIngredients() {
    return this.ingredients.slice(); // returning the copy of the array
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(addedIngredient: IngredientModel) {
    this.ingredients.push(addedIngredient); // pushing to original array
    this.ingredientsChanged.next(this.ingredients.slice()); // emitted from here, ingredientsChanged can be listened to and subscribe.
  }

  updateIngredient(index: number, updatedIngredient: IngredientModel) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice()); // emitted from here, ingredientsChanged can be listened to and subscribe.
  }

  // Add ingredients coming from the
  addIngredients(addedIngredients: IngredientModel[]) {
    this.ingredients.push(...addedIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
