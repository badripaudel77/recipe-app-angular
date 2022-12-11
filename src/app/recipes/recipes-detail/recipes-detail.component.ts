import {Component,OnInit} from '@angular/core';
import RecipeModel from "../models/Recipe.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
 recipe: RecipeModel;
 recipeIndex: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private router: Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = Number(params['id']);
      this.recipe = this.recipeService.getSingleRecipe(this.recipeIndex);
    })
  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  editRecipe(recipe: RecipeModel) {
    //this.router.navigate(['../', this.recipeIndex, 'edit'], { relativeTo : this.route }) // eg of relative route.
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe(index: number) {
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['recipes']);
  }

}
