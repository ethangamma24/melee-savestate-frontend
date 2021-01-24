import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegistrationConfirmationComponent } from './pages/register/registration-confirmation/registration-confirmation.component';
import { SavestateDetailsComponent } from './pages/savestate-details/savestate-details.component';
import { SearchComponent } from './pages/search/search.component';
import { UploadSavestateComponent } from './pages/upload-savestate/upload-savestate.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registration-confirmation', component: RegistrationConfirmationComponent },
  { path: 'savestate-details/:id', component: SavestateDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'upload', component: UploadSavestateComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
