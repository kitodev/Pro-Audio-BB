import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse, ProductModelServer } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

   //url = environment.serverURL;
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {

     }
     /*Fetch all product*/
     getAllProducts(numberOfResults = 5): Observable<ServerResponse> {
       return this.http.get<ServerResponse>(this.SERVER_URL + '/products', {
         params: 
         {
           limit: numberOfResults.toString()
          }
        });
     }

     // Get single product from server

     getSingleProduct(id: number): Observable<ProductModelServer> {
      return this.http.get<ProductModelServer>(this.SERVER_URL + '/products' + id);
     }

     getProductsFromCategory(catName: string): Observable<ProductModelServer[]>{
      return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category' + catName);
     }
}
