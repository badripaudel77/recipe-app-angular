import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  constructor(private recipeService : RecipeService) {

  }

  ngOnInit() {
    this.recipeService.fetchDataFromServer();
  }

  ngOnDestroy() {
    // Clean up if any like unsubscribing etc
  }
}
