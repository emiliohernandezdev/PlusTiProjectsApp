import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'show-client', loadChildren: './pages/show-client/show-client.module#ShowClientPageModule', canActivate: [AuthGuard] },
  { path: 'create-client', loadChildren: './pages/create-client/create-client.module#CreateClientPageModule', canActivate: [AuthGuard] },
  { path: 'create-product', loadChildren: './pages/create-product/create-product.module#CreateProductPageModule', canActivate: [AuthGuard] },
  { path: 'update-product/:id', loadChildren: './pages/update-product/update-product.module#UpdateProductPageModule', canActivate: [AuthGuard] },
  { path: 'view-product', loadChildren: './pages/view-product/view-product.module#ViewProductPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
