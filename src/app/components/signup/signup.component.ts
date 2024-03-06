import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../http.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  type: string = 'password';
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSignup() {
    if (this.signUpForm.valid) {
      this.httpService.signUp(this.signUpForm.value)
        .subscribe({
          next: (res => {
            this.signUpForm.reset();
            this.router.navigate(['login']);
          }
          ),
          error: (err) => {
            alert(err?.error + "error");
          }
        })
    }
  }
}
