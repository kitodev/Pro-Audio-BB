import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Observable<any[]>;


  constructor(db: AngularFirestore) {
    this.products = db.collection('products').valueChanges();
  }
  ngOnInit(): void {
  }
}
