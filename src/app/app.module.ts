import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { PosteComponent } from './poste/poste.component';
import { PosteListComponent } from './poste-list/poste-list.component';
import { MenuComponent } from './menu/menu.component';

import { PosteSource } from './services/poste.source';
import { PosteServiceHTTP } from './services/poste.service.http';
import { PosteServiceInMemory } from './services/poste.service.in-memory';

import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PosteCreateComponent } from './poste-create/poste-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const appRoutes: Routes = [
  { path: '', redirectTo: '/postes', pathMatch: 'full' },
  { path: 'postes', component: PosteListComponent },
  { path: 'postes/:id', component: PosteComponent },
  { path: 'new-poste', component: PosteCreateComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    PosteComponent,
    PosteListComponent,
    MenuComponent,
    PosteCreateComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
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
    MatSortModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
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
