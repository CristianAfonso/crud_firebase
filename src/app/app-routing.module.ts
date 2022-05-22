import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';

const routes: Routes = [
  { path:'', redirectTo: 'list-products', pathMatch:'full'}, //Cuando iniciamos, nos direccionará a list-products
  { path:'list-products', component: ListProductsComponent},
  { path:'create-products', component: CreateProductsComponent},
  { path:'edit-products/:id', component: CreateProductsComponent},
  { path:'**', redirectTo: 'list-products', pathMatch:'full'} //Cualquier ruta no válida, nos redireccionará a list-products
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
