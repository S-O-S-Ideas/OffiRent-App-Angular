import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AccountComponent} from './pages/account/account.component';
import {AccountsComponent} from './pages/accounts/accounts.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: AccountsComponent},
  { path: 'profile/edit', component: AccountComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
