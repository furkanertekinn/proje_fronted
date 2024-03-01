import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatToolbarModule, MatIconModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  router = inject(Router);
  productList: IProduct[] = [];
  httpService = inject(HttpService)
  toaster = inject(ToastrService)
  displayedColumns: string[] = [
    'id',
    'productName',
    'productUnitPrice',
    'productUnitInStock',
    'total',
    'action'
  ];
  ngOnInit() {
    this.getProductFromServer();
  }

  getProductFromServer() {
    this.httpService.getAllProduct().subscribe(result => {
      this.productList = result;
      console.log(this.productList);
    })
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl("/product/" + id);
  }

  delete(id: number) {
    if (confirm('Are you sure to delete record?'))
      this.httpService.deleteProduct(id).subscribe(() => {
        console.log("deleted");
        this.getProductFromServer();
        this.toaster.success("Deleted successfully.");
      });
  }
}