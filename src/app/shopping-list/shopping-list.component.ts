import { Component, OnInit } from '@angular/core';
import {IngredientModel} from "../common/Ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: IngredientModel [] = [];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    /**
     *     As we have subscribed to the ingredientsChanged event in the shoppingListService,
     *     I get the updated data or whatever is passed from there.
     *     Explanation : https://stackoverflow.com/a/44921830/9898251
     */
    this.shoppingListService.ingredientsChanged.subscribe((updatedIngredients: IngredientModel[]) => {
      this.ingredients = updatedIngredients;
    })
  }

}
