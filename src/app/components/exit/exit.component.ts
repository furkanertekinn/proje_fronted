import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit',
  standalone: true,
  imports: [],
  templateUrl: './exit.component.html',
  styleUrl: './exit.component.css'
})
export class ExitComponent {
  router = inject(Router);

  exit() {
    localStorage.removeItem("token");
    // localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
