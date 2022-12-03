import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class HeaderComponent implements OnInit{
  @Output() headerOptionSelected = new EventEmitter<string>();

  ngOnInit(): void { }

  onHeaderOptionClicked(selectedOption: string) {
    this.headerOptionSelected.emit(selectedOption.trim());
  }
}
