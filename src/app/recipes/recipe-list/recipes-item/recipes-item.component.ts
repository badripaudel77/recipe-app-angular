import {Component, Input, OnInit} from '@angular/core';
import RecipeModel from "../../models/Recipe.model";

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input('recipeItem') recipe: RecipeModel;
  @Input() index: number;

  ngOnInit(): void {
  }


}
