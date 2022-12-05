import { Component, OnInit } from '@angular/core';
import RecipeModel from "./models/Recipe.model";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipeWithDetails: RecipeModel;
  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: RecipeModel) => {
      this.selectedRecipeWithDetails = recipe;
    });
  }

}
