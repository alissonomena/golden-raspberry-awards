import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.Dashboard)
    },
    {
        path: 'filmes',
        loadComponent: () => import('./pages/lista-filmes/lista-filmes').then(c => c.ListaFilmes)
    }, 
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
