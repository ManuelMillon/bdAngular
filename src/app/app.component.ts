import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  products : Observable<Product[]>;

  productForm = new FormGroup({
    productId: new FormControl(''),
    description: new FormControl(''),
    purchasePrice: new FormControl(0),
    salePrice: new FormControl(0),
    stock: new FormControl(0),
    picture: new FormControl('')
  });

  formButtonText = 'Add product';

  constructor(private productService: ProductService){
    this.products = this.productService.getProducts();
  }
  
  addProduct(){
    this.productService.addProduct(this.productForm.value);
    //Se le pueden pasar parametros por defecto al resetear.
    this.productForm.reset({purchasePrice: 0, salePrice: 0, stock: 0});
  }

  deleteProduct(id: string){
    this.productService.deleteProduct(id);
  }

  updateProduct(id : string){
    this.productService.getProduct(id).subscribe(
      data => this.productForm.patchValue(data)
    );
    this.formButtonText = 'Update product';
  }

  updateProductStep2(){
    this.productService.updateProduct(this.productForm.value);
  }

  formSubmit(){
    (this.formButtonText === 'Add product') ? this.addProduct() : this.updateProductStep2();
  }
}


