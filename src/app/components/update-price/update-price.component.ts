import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUpdatePrice } from '../../interfaces/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-price',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-price.component.html',
  styleUrl: './update-price.component.css'
})
export class UpdatePriceComponent {

  httpService = inject(HttpService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);


  updateForm = this.formBuilder.group({
    price: [0, [Validators.required]]
  })

  updateId = this.route.snapshot.params['id']

  ngOnInit() {
    this.httpService.getProduct(this.updateId).subscribe(productRes => {
      this.updateForm.patchValue({
        price: productRes.productUnitPrice
      });
    });
  }

  update() {
    const product: IUpdatePrice = {
      id: this.updateId,
      productUnitPrice: this.updateForm.value.price!
    };

    this.httpService.updatePrice(product).subscribe(() => {
      this.router.navigateByUrl('product-list');
    })
  }
}
