import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { BookList } from './books/book-list/book-list';
import { authGuard } from './core/guards/auth-guard';
import { AccessMatrix } from './roles/access-matrix/access-matrix';


export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'books',
    component: BookList,
    canActivate: [authGuard]
  },
  {
  path: 'access-matrix',
  component: AccessMatrix
}

];
