import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
// Components
import { AppComponent } from './app.component';
import { PosteComponent } from './poste/poste.component';
import { PosteListComponent } from './poste-list/poste-list.component';
import { MenuComponent } from './menu/menu.component';
import { PosteCreateComponent } from './poste-create/poste-create.component';
import { PosteListOfflineComponent } from './poste-list-offline/poste-list-offline.component';
import { PosteModifyComponent } from './poste-modify/poste-modify.component'
// Services
import { PosteSource } from './services/poste.source';
import { PosteServiceHTTP } from './services/poste.service.http';
import { PosteServiceInMemory } from './services/poste.service.in-memory';
// Materials
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OfflineDBService } from './services/offline-db.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './common/delete-dialog/delete-dialog.component';

const appRoutes: Routes = [
  { path: '', component: PosteListComponent },
  { path: 'postes', component: PosteListComponent },
  { path: 'postes/:id', component: PosteComponent },
  { path: 'offline-postes', component: PosteListOfflineComponent },
  { path: 'new-poste', component: PosteCreateComponent },
  { path: 'modify-poste/:id', component: PosteModifyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PosteComponent,
    PosteListComponent,
    MenuComponent,
    PosteCreateComponent,
    PosteListOfflineComponent,
    PosteModifyComponent,
    DeleteDialogComponent

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
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: PosteSource,
      deps: [HttpClient, OfflineDBService],
      useFactory: (httpClient, offlineDBService) => {
        if (environment.disableInMemory) {
          return new PosteServiceHTTP(httpClient, offlineDBService);
        } else {
          return new PosteServiceInMemory(offlineDBService);
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
