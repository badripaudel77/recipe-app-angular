import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import RecipeModel from "../../models/Recipe.model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input('recipeItem') recipe: RecipeModel;
  constructor(private recipeService : RecipeService) {

  }

  ngOnInit(): void {
  }

  onRecipeItemSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
