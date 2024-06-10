import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Parametrización'
    },
    children: [
      {
        path: 'branches',
        loadComponent: () => import('./sucursales/sucursales.component').then(m => m.SucursalesComponent),
        data: {
          title: 'Sucursales'
        }
      },
    ]
  }
];

