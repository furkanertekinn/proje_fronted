import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { HttpService } from '../../http.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ExitComponent } from '../exit/exit.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, TableModule, ButtonModule, ExitComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(private httpService:HttpService){
1
  }
  router = inject(Router);
  productList: IProduct[] = [];
  toaster = inject(ToastrService);
  isAuthenticated: boolean = false;

  // title = 'Convert_To_PDF';
  // @ViewChild('content') content!: ElementRef;
  // data: any;
  product: any;

  ngOnInit() {
    this.getProductFromServer();
    this.isAuthenticated = this.checkIsAuthenticated();
    // this.downloadPDFAPI();
  }

  getProductFromServer() {
    this.httpService.getAllProduct().subscribe(result => {
      this.productList = result;
    })
  }

  edit(id: number) {
    this.router.navigateByUrl("/product/" + id);
  }

  updatePrice(id:number){
    this.router.navigateByUrl('/update-price/'+id)
  }

  delete(id: number) {
    if (confirm('Are you sure to delete record?'))
      this.httpService.deleteProduct(id).subscribe(() => {
        this.getProductFromServer();
        this.toaster.success("Deleted successfully.");
      });
  }

  checkIsAuthenticated() {
    if (localStorage.getItem("token") != null)
      return true;
    return false;
  }

  // downloadPDFAPI() {
  //   let formData = new FormData();
  //   formData.append('vendor_id', "8");
  //   formData.append('language', "en");
  //   this.httpService.getDataFromApi(formData).subscribe((res: any) => {
  //     this.data = res.questionnaires_list;
  //   });
  // }

  // downloadPDF() {
  //   const contentElement = this.content.nativeElement;
  //   this.httpService.generatePDF(contentElement, 'products-pdf');
  // }
}