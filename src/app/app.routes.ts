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
        loadComponent: () => import('./pages/movies/movies').then(c => c.Movies)
    }, 
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
