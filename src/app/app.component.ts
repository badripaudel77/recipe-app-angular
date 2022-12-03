import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultSelectedOption: string = 'recipe';
  headerOptionSelected(selectedOption: string) {
    this.defaultSelectedOption = selectedOption;
  }
}
