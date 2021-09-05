import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];
  cartService: any;

  constructor(private productService: ProductService,
    private route: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((product: ServerResponse) => {
      this.products = product.products;
      console.log(this.products);
    });
  }

  selectProduct(id: Number) {
    this.route.navigate(['/product', id]).then();
  }

  AddToCart(id: number) {
    this.cartService.addProductToCart(id);
  }

}
