import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../services/recipe.service";
import RecipeModel from "../models/Recipe.model";

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
  recipeForm: FormGroup;

  constructor(private route : ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = Number(params['id']);
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let ingredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getSingleRecipe(this.recipeId);
      if(recipe) {
        recipeName = recipe.name;
        recipeImgPath = recipe.imagePath;
        recipeDesc  = recipe.description;
        if(recipe.ingredients) {
          for (let ingredient of recipe.ingredients) {
            ingredients.push( new FormGroup({
              name : new FormControl(ingredient.name,Validators.required),
              amount : new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      }
    }
    this.recipeForm = new FormGroup({
      name : new FormControl(recipeName, Validators.required),
      imagePath : new FormControl(recipeImgPath, Validators.required),
      description : new FormControl(recipeDesc, Validators.required),
      ingredients : ingredients
    });
  }

  // a getter, .controls calls this
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onFormSave() {
    const newRecipe = new RecipeModel(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);

    /*
     * this.recipeForm.value has the same value as RecipeModel but make sure the names are matching in model class
     *  and when passing [basically defined in the template]
     */
    if(this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, newRecipe);
      this.editMode = false;
      this.router.navigate(['recipes', this.recipeId]);
    }
    else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.recipeForm.reset();
  }

  addIngredientToRecipe() {
    let ingredientsArray = this.recipeForm.get('ingredients') as FormArray
    ingredientsArray.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    )
  }

  onRemoveIngredientInput(index: number) {
    let ingredientsArray = this.recipeForm.get('ingredients') as FormArray
    ingredientsArray.removeAt(index);
  }

  cancelAddRecipe() {
    this.recipeForm.reset();
    this.router.navigate(['recipes', this.recipeId]);
  }

}
