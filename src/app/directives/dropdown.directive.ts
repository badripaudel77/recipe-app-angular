/**
 * This directive is responsible for activating dropdown in the recipe details section.
 * For eg : this directive can be referenced by name appDropdownMenu as <p appDropdownMenu> ... </p>
 */
@Directive({
  selector: '[appDropdownMenu]'
})
export class DropdownDirective {
  /**
   *   In the dropdown menu, open is the class that we need to attach or detach on toggling.
   *   So, class.open is the name we passed. Wherever the directive appDropdownMenu is used, angular will do the job.
   *   initially it's false so that it doesn't open.
   */
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}

import {Directive, HostBinding, HostListener} from "@angular/core";
