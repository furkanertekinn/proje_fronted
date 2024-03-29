import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  type: string = "password";
  isText: boolean = false;
  userForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onLogin() {
    if (this.userForm.valid) {
      this.httpService.login(this.userForm.value)
        .subscribe({
          next: (res) => {
            this.userForm.reset();
            this.router.navigate(['product-list']);
            if (res == true) {
              localStorage.setItem('token', res);
            }
          },
          error: (err) => {
            alert(err?.error + 'error');
          }
        })
    }
  }
}
