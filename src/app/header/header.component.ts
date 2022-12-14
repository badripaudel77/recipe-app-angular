import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {RecipeService} from "../services/recipe.service";

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {

  }

  saveData() {
    this.subscription = this.recipeService.saveRecipes().subscribe((data) => {
      // don't need to do anything as we're saving existing data.
    }, error => {
      alert('Error occurred ' + error.getMessage());
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchDataFromServer() {
    this.recipeService.fetchDataFromServer();
  }
}
