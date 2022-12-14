import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from "../common/Ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IngredientModel [] = [];
  ingredientsChangedSubscription : Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
     this.shoppingListService.getIngredients();
    /**
     *     As we have subscribed to the ingredientsChanged event in the shoppingListService,
     *     I get the updated data or whatever is passed from there.
     *     Explanation : https://stackoverflow.com/a/44921830/9898251
     */
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((updatedIngredients: IngredientModel[]) => {
      this.ingredients = updatedIngredients;
    });
  }

  ngOnDestroy(): void {
    // We need to unsubscribe on component destroy to prevent memory leak.
    this.ingredientsChangedSubscription.unsubscribe();
  }

  /**
   * @param index
   * Pass on index to the Subject so that we can listen to it wherever required using shoppingListService.
   */
  editItem(index: number) {
    this.shoppingListService.shoppingEditIndex.next(index);
  }

}
