import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

   //url = environment.serverURL;
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) {

     }
     /*Fetch all product*/
     getAllProducts(numberOfResults = 5) {
       return this.http.get(this.SERVER_URL + '/products', {
         params: 
         {
           limit: numberOfResults.toString()
          }
        });
     }

}
