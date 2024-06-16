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
      {
        path: 'product-type',
        loadComponent: () => import('./tipo-producto/tipo-producto.component').then(m => m.TipoProductoComponent),
        data: {
          title: 'Tipos de productos'
        }
      },
      {
        path: 'characteristics',
        loadComponent: () => import('./caracteristicas/caracteristicas.component').then(m => m.CaracteristicasComponent),
        data: {
          title: 'Tipos de productos'
        },
      }

    ]
  }
];

