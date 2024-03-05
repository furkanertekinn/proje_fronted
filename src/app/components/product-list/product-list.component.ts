import { Component, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { HttpService } from '../../http.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ExitComponent } from '../exit/exit.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, TableModule, ButtonModule, ExitComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  router = inject(Router);
  productList: IProduct[] = [];
  httpService = inject(HttpService)
  toaster = inject(ToastrService)

  isAuthenticated: boolean = false;

  ngOnInit() {
    this.getProductFromServer();
    this.isAuthenticated = this.checkIsAuthenticated();
  }

  getProductFromServer() {
    this.httpService.getAllProduct().subscribe(result => {
      this.productList = result;
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

  checkIsAuthenticated() {
    if (localStorage.getItem("token") != null)
      return true;
    return false;
  }
}