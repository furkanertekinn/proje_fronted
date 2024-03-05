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
    if (confirm('Are you sure to exit record?')) {

      var token = 'abc';

      if (token == 'token') {
        localStorage.removeItem("token");
        // localStorage.clear();
        this.router.navigateByUrl("/login");
      }
      else {
        console.log("token can't remove")
      }
    }
  }
}
