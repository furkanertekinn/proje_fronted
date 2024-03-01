import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from './interfaces/product';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = "https://localhost:7289";
  private baseUrl: string = "https://localhost:7289/api/User";
  http = inject(HttpClient);
  constructor() { }

  getAllProduct() {
    return this.http.get<IProduct[]>(this.apiUrl + "/api/Product");
  }

  createProduct(product: IProduct) {
    return this.http.post(this.apiUrl + "/api/Product", product);
  }

  getProduct(productId: number) {
    return this.http.get<IProduct>(this.apiUrl + "/api/Product/" + productId);
  }

  updateProduct(productId: number, product: IProduct) {
    return this.http.put<IProduct>(this.apiUrl + "/api/Product/" + productId, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete<IProduct>(this.apiUrl + "/api/Product/" + productId);
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

}
