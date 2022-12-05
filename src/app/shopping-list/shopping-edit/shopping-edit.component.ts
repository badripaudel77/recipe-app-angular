import {Component, ElementRef, EventEmitter, OnInit, ViewChild, Output} from '@angular/core';
import {IngredientModel} from "../../common/Ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  /**
   * Get name input as local reference
   * Get amount input as view child
   */
  @ViewChild('amountInput') amountInput: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit(): void {
  }

  onIngredientAdd(nameInput: HTMLInputElement) {
    let addedIngredient:IngredientModel = new IngredientModel(nameInput.value, this.amountInput.nativeElement.value);
    this.shoppingListService.addIngredient(addedIngredient);
    nameInput.value = '';
    this.amountInput.nativeElement.value = '';
  }

}
