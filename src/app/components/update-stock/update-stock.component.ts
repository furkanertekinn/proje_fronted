import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../http.service';
import { IUpdateStock } from '../../interfaces/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-stock',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-stock.component.html',
  styleUrl: './update-stock.component.css'
})
export class UpdateStockComponent {
  router = inject(Router);
  httpService = inject(HttpService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);

  updateStockId = this.route.snapshot.params['id'];

  updateStockForm = this.formBuilder.group({
    stock: [0, [Validators.required]]
  });

  ngOnInit() {
    this.httpService.getProduct(this.updateStockId).subscribe(res => {
      this.updateStockForm.patchValue({
        stock: res.productUnitInStock
      })
    })
  };

  updateStock() {
    const product: IUpdateStock = {
      id: this.updateStockId,
      productUnitInStock: this.updateStockForm.value.stock!
    };

    this.httpService.updateStock(product).subscribe(() => {
      this.router.navigateByUrl('product-list')
    });
  }
}
