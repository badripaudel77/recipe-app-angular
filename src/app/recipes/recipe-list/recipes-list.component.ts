import {Component, OnInit} from '@angular/core';
import RecipeModel from "../models/Recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: RecipeModel[] = [];

  constructor(private recipeService : RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  addRecipe() {
    // we're already on the /recipes path.
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
