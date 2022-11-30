import { Component, OnInit } from '@angular/core';
import {IngredientModel} from "../common/Ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: IngredientModel [] = [
    new IngredientModel('Noodles', 12),
    new IngredientModel('Flour', 2),
    new IngredientModel('Tomatoes', 10),
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
