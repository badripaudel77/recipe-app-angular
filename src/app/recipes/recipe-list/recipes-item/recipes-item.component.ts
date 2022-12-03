import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import RecipeModel from "../../models/Recipe.model";

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input('recipeItem') recipe: RecipeModel;
  @Output() recipeSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeItemSelected() {
    this.recipeSelected.emit();
  }

}
