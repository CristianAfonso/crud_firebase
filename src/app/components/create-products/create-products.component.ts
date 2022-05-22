import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {
  createProduct: FormGroup;
  submitted= false;
  id: string | null;
  titulo ='Agregar Producto';
  buttonText = 'Agregar';

  constructor(private fb: FormBuilder,
              private _productoService: ProductsService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
    this.createProduct = this.fb.group({
      Nombre:  ['', Validators.required],
      Tipo:    ['', Validators.required],
      Precio:  ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.setPage();
  }

  agregarEditarProducto(){
    this.submitted=true;
    if(this.createProduct.invalid){
      return;
    }
    if(this.id === null){
      this.agregarProducto();
    }else{
      this.editarProducto(this.id);
    }
  }
  agregarProducto(){
    this.submitted=true;
    if(this.createProduct.invalid){
      return;
    }
    const producto: any = {
      Nombre: this.createProduct.value.Nombre,
      Tipo: this.createProduct.value.Tipo,
      Precio: this.createProduct.value.Precio,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._productoService.agregarProducto(producto).then(() =>{
      this.toastr.success('Producto creado con éxito', 'Producto Registrado en Firebase');
      this.router.navigate(['/list-products']);
    }).catch(error => {
      console.log('error');
    })
    
  }

  editarProducto(id: string){
    const producto: any = {
      Nombre: this.createProduct.value.Nombre,
      Tipo: this.createProduct.value.Tipo,
      Precio: this.createProduct.value.Precio,
      fechaActualizacion: new Date()
    }
    this._productoService.updateProducto(id, producto).then(() => {
        this.toastr.info('El producto ha sido actualizado', 'Producto modificado en firebase');
        this.router.navigate(['/list-products']);
    })
  }

  setPage(){
    
    if(this.id !== null){
      this.titulo='Editar Producto';
      this.buttonText='Editar';
      this._productoService.getProduct(this.id).subscribe(data =>
        this.createProduct.setValue({
          Nombre: data.payload.data()['Nombre'],
          Tipo: data.payload.data()['Tipo'],
          Precio: data.payload.data()['Precio']
        }))
    }
  }
}
