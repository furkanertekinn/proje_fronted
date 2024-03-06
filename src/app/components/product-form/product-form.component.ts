import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IProduct } from '../../interfaces/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    stock: [0, [Validators.required]]
  })
  productId!: number;
  isEdit = false;

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.httpService.getProduct(this.productId).subscribe(productRes => {
        this.productForm.patchValue({
          name: productRes.productName,
          price: productRes.productUnitPrice,
          stock: productRes.productUnitInStock
        });
      });
    }
  }

  save() {
    const product: IProduct = {
      productName: this.productForm.value.name!,
      productUnitPrice: this.productForm.value.price!,
      productUnitInStock: this.productForm.value.stock!,
    };
    if (this.isEdit) {
      if (confirm('Are you sure to update record?'))
        this.httpService.updateProduct(this.productId, product)
          .subscribe(() => {
            this.toaster.success("Updated successfully.");
            this.router.navigateByUrl("/product-list");
          });
    } else {
      if (confirm('Are you sure to update record?'))
        this.httpService.createProduct(product).subscribe(() => {
          this.toaster.success("Added successfully.");
          this.router.navigateByUrl("/product-list");
        });
    }
  }
}