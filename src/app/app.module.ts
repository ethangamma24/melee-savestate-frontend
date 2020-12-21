import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { UploadSavestateComponent } from './pages/upload-savestate/upload-savestate.component';
import { SavestateDetailsComponent } from './pages/savestate-details/savestate-details.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SavestateSearchResultComponent } from './shared/components/savestate-search-result/savestate-search-result.component';

import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    UploadSavestateComponent,
    SavestateDetailsComponent,
    NavbarComponent,
    SavestateSearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
