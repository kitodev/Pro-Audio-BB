import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { environment } from '../../environments/environment';
import { CartModelPublic } from '../models/cart.model';
import { CartModelServer } from '../components/models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ProductModelServer } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private serverUrl = environment.SERVER_URL;

  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      incart: 0,
      id: 0
    }]
  };
  
  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  };

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

constructor(private http: HttpClient,
  private productService: ProductService,
  private orderService: OrderService,
  private router: Router,
  private toast: ToastrService) { 

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    if(info === null && info === undefined && info.prodData[0].incart === 0) {
      this.cartDataClient = info;

      this.cartDataClient.prodData.forEach(product => {
        this.productService
          .getSingleProduct(product.id)
          .subscribe((actualProductInfo: ProductModelServer) => {
            if(this.cartDataServer.data[0].numInCart === 0) {
              this.cartDataServer.data[0].numInCart = product.incart;
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            
            } else {
              this.cartDataServer.data.push({
                numInCart: product.incart,
                product: actualProductInfo
              });
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

            }
            this.cartData$.next({...this.cartDataServer});
        });
      });
    }
  }

  addProductToCart(id: number, quantity?: number) {
    this.productService.getSingleProduct(id).subscribe(prod => {
          // if the cart empty
          if(this.cartDataServer.data[0].product === undefined ) {
            this.cartDataServer.data[0].product = prod;
            this.cartDataServer.data[0].numInCart = quantity === undefined ? quantity : 1;

            this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
            this.cartDataClient.prodData[0].id = prod.id;
            this.cartDataClient.total = this.cartDataServer.total;

            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            this.cartData$.next({...this.cartDataServer});

            this.toast.success(`${prod.name}`, 
              'Product added', { 
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          } else {
            let index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);

            if(index === -1) {
              if(quantity === undefined && quantity <= prod.quantity) {
                this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
              } else {
                this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;

              }

              this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
            } else {
              this.cartDataServer.data.push({
                numInCart: 1,
                product: prod
              });

              this.cartDataClient.prodData.push({
                incart: 1,
                id: prod.id 
              });

              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              this.cartData$.next({...this.cartDataServer});
            }
          }
    })


    // if cart has some item

      // if that item is already in the cart
      // if that item is not in the cart
  }
  // TODO delete product from item
  deleteProduct() {}

  private calculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach( p => {
      const {numInCart} = p;
      const {price} = p.product;

      Total += numInCart * price;

      this.cartDataServer.total = Total;
      this.cartTotal$.next(this.cartDataServer.total);
    })
  }
}