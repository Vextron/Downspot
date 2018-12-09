import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppService } from './app.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { WebDownloaderComponent } from './web-downloader/web-downloader.component';
import { CheckComponent } from './check/check.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SongListComponent } from './song-list/song-list.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';

const app_routes: Routes = [

  { path: '',  component: LandingComponent },
  { path: 'web-downloader', canActivate: [AuthGuard], component: NavigationComponent },
  { path: 'check', component: CheckComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    WebDownloaderComponent,
    CheckComponent,
    NavigationComponent,
    PlaylistsComponent,
    SongListComponent,
    AlbumsComponent,
    ArtistsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatSidenavModule,
    MatGridListModule,
    FormsModule,
    RouterModule.forRoot(app_routes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})



export class AppModule { }
