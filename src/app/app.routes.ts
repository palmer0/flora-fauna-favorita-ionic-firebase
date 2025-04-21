import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'home',
  //   loadComponent: () =>
  //     import('./home/home.page').then((m) => m.HomePage),
  // },
  {
    path: 'item-list/:tipo',
    loadComponent: () =>
      import('./pages/item-list/item-list.page').then(m => m.ItemListPage)
  },
  {
    path: 'item-detail/:id',
    loadComponent: () =>
      import('./pages/item-detail/item-detail.page').then(m => m.ItemDetailPage)
  },
  {
    path: 'item-form',
    loadComponent: () =>
      import('./pages/item-form/item-form.page').then(m => m.ItemFormPage)
  },
  {
    path: 'item-form/:id',
    loadComponent: () =>
      import('./pages/item-form/item-form.page').then(m => m.ItemFormPage)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth-login/auth-login.page').then( m => m.AuthLoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth-register/auth-register.page').then( m => m.AuthRegisterPage)
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/item-favorites/item-favorites.page').then( m => m.ItemFavoritesPage)
  },
];
