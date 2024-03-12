import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdatePriceComponent } from './components/update-price/update-price.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'product-list',
        component: ProductListComponent
    },
    {
        path: 'create-product',
        component: ProductFormComponent
    },
    {
        path: 'product/:id',
        component: ProductFormComponent
    },
    {
        path: 'update-price/:id',
        component:UpdatePriceComponent
    }
];
