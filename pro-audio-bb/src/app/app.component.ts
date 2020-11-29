import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: any[];

  title = 'pro-audio-bb';
  constructor(db: AngularFireDatabase) {
    db.list('/products')
      .valueChanges().subscribe(products => { this.products = products;
      console.log(this.products);
    });
  }
}
