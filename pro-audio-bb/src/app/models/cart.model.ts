import { ProductModelServer } from './product.model';

export interface CartModelServer {
    total: number;
    data: [{
        product: ProductModelServer,
        numIntCart: number
    }]
}

export interface CartModelPublic {
    total: number;
    prodData: [
        {
            id: number,
            incart: number
        }
    ];
}