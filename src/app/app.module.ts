import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PosteComponent } from './poste/poste.component';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { PosteListComponent } from './poste-list/poste-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PosteSource } from './services/poste.source';
import { PosteServiceHTTP } from './services/poste.service.http';
import { PosteServiceInMemory } from './services/poste.service.in-memory';

const appRoutes: Routes = [
  { path: '', redirectTo: '/postes', pathMatch: 'full' },
  { path: 'postes', component: PosteListComponent },
  { path: 'postes/:id', component: PosteComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PosteComponent,
    PosteListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: PosteSource,
      deps: [HttpClient],
      useFactory: (httpClient) => {
        if (environment.disableInMemory) {
          return new PosteServiceHTTP(httpClient);
        } else {
          return new PosteServiceInMemory();
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
