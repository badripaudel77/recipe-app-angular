import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import RecipeModel from "../models/Recipe.model";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
 @Input('recipeItem') recipe: RecipeModel;

  constructor() { }

  ngOnInit(): void {
  }

}
