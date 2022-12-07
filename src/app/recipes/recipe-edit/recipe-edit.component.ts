import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
/**
 * This component will do job for either editing or adding recipe
 */
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode: boolean = false;

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = Number(params['id']);
      this.editMode = params['id'] != null;
    })
  }

}
