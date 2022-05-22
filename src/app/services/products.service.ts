import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) {

   }

   agregarProducto(producto: any): Promise<any>{
     return this.firestore.collection('productos').add(producto);
   }

   getProductos(): Observable<any> {
     return this.firestore.collection('productos', ref => ref.orderBy('Tipo', 'asc')).snapshotChanges();
   }

   removeProducto(id: string): Promise<any> {
     return this.firestore.collection('productos').doc(id).delete();
   }
   getProduct(id:string): Observable<any>{
     return this.firestore.collection('productos').doc(id).snapshotChanges();
   }
   updateProducto(id: string, data: any): Promise<any>{
     return this.firestore.collection('productos').doc(id).update(data);
   }
}
