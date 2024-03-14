import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { IAddCustom } from '../../interfaces/product';

@Component({
  selector: 'app-add-custom',
  standalone: true,
  imports: [],
  templateUrl: './add-custom.component.html',
  styleUrl: './add-custom.component.css'
})
export class AddCustomComponent {
  http = inject(HttpService);
  router = inject(Router);
  message?: string;

  ngOnInit() {
    this.message = 'Ekleniyor...';
    setTimeout(() => {
      const product: IAddCustom = {
        productName: 'furkan'
      };
      this.http.addCustom(product).subscribe({
        next: () => {
          this.message = 'Eklendi.';
          setTimeout(() => {
            this.router.navigateByUrl('/product-list');
          }, 2000);
        },
        error: (err) => {
          alert(err?.error + "error");
        }
      });
    }, 3000);
  }
}
