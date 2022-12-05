// Model class for recipe

 import {IngredientModel} from "../../common/Ingredient.model";

class RecipeModel {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientModel[];

  constructor(name: string, description: string, imagePath: string, ingredients: IngredientModel[]) {
     this.name = name;
     this.description = description;
     this.imagePath = imagePath;
     this.ingredients = ingredients;
  }

}

// named export if export class Recipe
// default export
export default RecipeModel;
