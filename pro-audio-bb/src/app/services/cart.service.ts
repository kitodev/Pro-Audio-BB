import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverUrl = environment.SERVER_URL;
  
constructor(private http: HttpClient,
  private productService: ProductService,
  private orderService: OrderService) { 

  }

}
