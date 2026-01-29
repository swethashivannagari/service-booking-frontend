import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guards';
import { roleGuard } from './core/guards/role.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then((m) => m.RegisterComponent)
    },
    {
        path: 'user/dashboard',
        canActivate: [authGuard, roleGuard(['USER'])],
        loadComponent: () => import('./user/user-dashboard/user-dashboard.component').then((m) => m.UserDashboardComponent)
    },
    {
        path: 'admin/dashboard',
        canActivate: [authGuard, roleGuard(['ADMIN'])],
        loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
    },
    {
        path: 'provider/dashboard',
        canActivate: [authGuard, roleGuard(['PROVIDER'])],
        loadComponent: () => import('./provider/provider-dashboard/provider-dashboard.component').then((m) => m.ProviderDashboardComponent)
    },
    {
        path: 'user/bookings',
        loadComponent: () =>
            import('./user/bookings/bookings.component')
                .then(m => m.BookingsComponent),
        canActivate: [authGuard, roleGuard(['USER'])],
    },

    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }

];
