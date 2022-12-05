import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import RecipeModel from "../models/Recipe.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
 @Input('recipeItem') recipe: RecipeModel;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

}
