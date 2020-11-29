import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

import { ProductModelServer } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   url = environment.serverURL;

  constructor(private http: HttpClient) {

     }

  getAllProducts(numberOfResults = 2) {
    return this.http.get(this.url + 'products', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }
}
