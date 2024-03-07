import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from './interfaces/product';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    return this.http.post<any>(this.baseUrl + "/register", userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(this.baseUrl + "/authenticate", loginObj);
  }

  getDataFromApi(data: any) {
    return this.http.post(this.apiUrl + "/api/Product", data);
  }

  generatePDF(content: HTMLElement, filename: string) {
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('https://www.google.com/url?sa=i&url=https%3A%2F%2Fmysoftbtrans.com%2F&psig=AOvVaw1J_IwCvqzqakP0zqUW0tge&ust=1709898265756000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOD4-MiJ4oQDFQAAAAAdAAAAABAD');
      let pdf = new jsPDF;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename + '.pdf');
    });
  }
}
