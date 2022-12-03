import {Component, ElementRef, EventEmitter, OnInit, ViewChild, Output} from '@angular/core';
import {IngredientModel} from "../../common/Ingredient.model";

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
  addedIngredient: IngredientModel  = null;
  @Output() ingredientAdded = new EventEmitter<IngredientModel>();
  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdd(nameInput: HTMLInputElement) {
    this.addedIngredient = new IngredientModel(nameInput.value, this.amountInput.nativeElement.value);
    this.ingredientAdded.emit(this.addedIngredient);
    nameInput.value = '';
    this.amountInput.nativeElement.value = '';
  }

}
