import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from "../../common/Ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Access the form
  @ViewChild('shoppingForm') shoppingListForm: NgForm;

  submitted: boolean = false;
  itemEditSubscription:Subscription;
  ingredientToEdit: IngredientModel;
  editMode: boolean = false;
  itemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    // listen to shoppingEditIndex Subject
    this.itemEditSubscription = this.shoppingListService.shoppingEditIndex.subscribe((shoppingListItemIndex: number) => {
      this.editMode = true;
      this.itemIndex = shoppingListItemIndex;
      this.ingredientToEdit = this.shoppingListService.getIngredient(this.itemIndex);
      this.shoppingListForm.setValue({
        name: this.ingredientToEdit.name,
        amount: this.ingredientToEdit.amount
      })
    })
  }

  onIngredientAdd(shoppingForm: NgForm) {
    let formValue = shoppingForm.value;
    let ingredient: IngredientModel = new IngredientModel(formValue.name, formValue.amount);
    if(this.editMode) {
      this.editMode = false;
      this.shoppingListService.updateIngredient(this.itemIndex, ingredient);
    }
    else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.submitted = true;
    shoppingForm.reset();
    setTimeout(() => {
      this.submitted = false;
    },2000);
  }

  ngOnDestroy() {
    // clean up , prevent memory leak
    this.itemEditSubscription.unsubscribe();
  }

}
