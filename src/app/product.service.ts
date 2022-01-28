import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, setDoc, addDoc, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  //Agregar producto en base de datos(cogido de doc de firestore)
  async addProduct(product : Product){
    try {
      const docRef = await addDoc(collection(this.firestore, "products"), product); 
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //Cogido de angularfire doc
  getProducts(): Observable<Product[]>{
    return collectionData(collection(this.firestore, 'products'), {idField: 'productId'}) as Observable<Product[]>;
  }

  getProduct(id:string): Observable<Product>{
    return docData(doc(this.firestore,`products/${id}`),{idField: 'productId'}) as Observable<Product>;
  }

  //Eliminar producto
  async deleteProduct(id: string){
    const docRef = doc(this.firestore,`products/${id}`)
    await deleteDoc(docRef);
  }

  //Actualizar producto
  async updateProduct(product : Product){
    await setDoc(doc(this.firestore, `products/${product.productId}`), product);
  }
}

