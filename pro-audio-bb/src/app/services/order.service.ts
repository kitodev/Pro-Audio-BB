import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http2ServerRequest } from 'http2';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: ProductResponseModel[] = [];
  private serverUrl = environment.SERVER_URL;
constructor(private http: HttpClient) { }

  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>(this.serverUrl + '/orders' + orderId).toPromise();
  }
}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrder: number;
  image: string;
}