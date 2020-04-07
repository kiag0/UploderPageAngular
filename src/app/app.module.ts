import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LaddaModule } from 'angular2-ladda';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { ImageComponent } from './image/image.component';

//filepond
// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageFilter from 'filepond-plugin-image-filter';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import { MapComponent } from './map/map.component';
import { UploaderComponent } from './uploader/uploader.component';
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageResize, FilePondPluginImageFilter, FilePondPluginImagePreview );



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    DashboardComponent,
    UsersComponent,
    CreateDepartmentComponent,
    ImageComponent,
    MapComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    LaddaModule.forRoot({
      style: 'expand-up',
      spinnerSize: 27,
      spinnerColor: 'white',
      spinnerLines: 15
  }),
    FormsModule,
    FilePondModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
