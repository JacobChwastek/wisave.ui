import { Routes } from '@angular/router';

import { IncomesStore } from './store/incomes.store';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views').then((m) => m.IncomesComponent),
  },
];
