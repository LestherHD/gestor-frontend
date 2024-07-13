import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard-pedidos.component').then(m => m.DashboardPedidosComponent),
    data: {
      title: $localize`Dashboard`
    }
  }
];

