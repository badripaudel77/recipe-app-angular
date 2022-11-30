import { Component, OnInit } from '@angular/core';
import RecipeModel from "../models/Recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: RecipeModel[] = [
      new RecipeModel('Recipe 1 name', 'Recipe 1 Desc', 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
      new RecipeModel('Recipe 2 name', 'Recipe 2 Desc', 'https://images.pexels.com/photos/3806983/pexels-photo-3806983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
  ];

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit recipe-list-component >>> ", this.recipes);
  }

}
