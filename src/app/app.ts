import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true
})
export class App {
  protected title = 'lucky-joes-site';
  cheese = "lucky-joes-logo.png"
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
      document.body.classList.toggle('sidebar-open', this.dropdownOpen);
  }
  closeDropdown() {
  this.dropdownOpen = false;
}
}
