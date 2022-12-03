import { Component, OnInit } from '@angular/core';
import RecipeModel from "./models/Recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipeWithDetails: RecipeModel;
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeItemsDetailsNeeded(recipeItemDetails: RecipeModel) {
    this.selectedRecipeWithDetails = recipeItemDetails;
  }

}
