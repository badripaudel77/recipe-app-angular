import {EventEmitter, Injectable} from "@angular/core";
import {IngredientModel} from "../common/Ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new EventEmitter<IngredientModel[]>();

  private ingredients: IngredientModel [] = [
    new IngredientModel('Noodles', 12),
    new IngredientModel('Flour', 2),
    new IngredientModel('Tomatoes', 10),
  ];

  public getIngredients() {
    return this.ingredients.slice(); // returning the copy of the array
  }

  addIngredient(addedIngredient: IngredientModel) {
    this.ingredients.push(addedIngredient); // pushing to original array
    this.ingredientsChanged.emit(this.ingredients.slice()); // emitted from here, ingredientsChanged can be listened to and subscribe.
  }

  // Add ingredients coming from the
  addIngredients(addedIngredients: IngredientModel[]) {
    this.ingredients.push(...addedIngredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
