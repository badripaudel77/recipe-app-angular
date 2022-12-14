import {Pipe, PipeTransform} from "@angular/core";
import {IngredientModel} from "../common/Ingredient.model";

/**
 * Pipes are used to transform data like uppercase, lowercase, sorting etc.
 * It needs to be declared in app module.
 * Used for formatting to data display on UI.
 * Identified by @Pipe({..}) decorator, other it is just a normal class that implements PipeTransform
 * REF : https://angular.io/guide/pipes-custom-data-trans
 */
@Pipe({
  name: 'sortIngredientsByName'
})
export class SortIngredientsByName implements PipeTransform {
  transform(ingredients: IngredientModel[], property:string = 'name'): IngredientModel[] {
    if(!ingredients) {
      return;
    }
    return ingredients.sort((a, b) => {
      if(a && b) {
        return a[property].localeCompare(b[property]);
      }
    });
  }
}
