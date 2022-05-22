import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: any[] = [];
  constructor(firestore: AngularFirestore,
              private _productService: ProductsService,
              private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getProductos();
  }
  getProductos(){
    this._productService.getProductos().subscribe(data=> {
        this.products = [];
      data.forEach((element: any) => {
          this.products.push({
            id:element.payload.doc.id,
            ...element.payload.doc.data()
          })
          
        });
    });
  }
  eliminarProducto(id: string){
    this._productService.removeProducto(id).then(() => {
      this.toastr.success('Producto eliminado con éxito', 'Producto Eliminado en Firebase');
    })
  }
}
