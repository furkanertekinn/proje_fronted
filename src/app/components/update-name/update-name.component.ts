import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../http.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUpdateName } from '../../interfaces/product';

@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-name.component.html',
  styleUrl: './update-name.component.css'
})
export class UpdateNameComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  httpService = inject(HttpService);
  route = inject(ActivatedRoute);

  updateNameForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  });

  updateNameId = this.route.snapshot.params['id'];

  ngOnInit() {

    //İlk olarak bu method tetiklenir ve burada ki amaç ürünü çekip bilgileri alarak update formunda metinleri dolu getirmek...

    this.httpService.getProduct(this.updateNameId).subscribe(res => {
      this.updateNameForm.patchValue({
        name: res.productName
      })
    });

  }

  updateName() {

    //Burada ise bilgileri girdiğimizde update işelminin gerçekleştirdiğimiz an...

    const nameEdit: IUpdateName = {
      id: this.updateNameId,
      productName: this.updateNameForm.value.name!
    };

    this.httpService.updateName(nameEdit).subscribe(() => {
      this.router.navigateByUrl('product-list');
    });
  }

}
