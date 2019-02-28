import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import {MatTableModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { FileSelectDirective } from 'ng2-file-upload';

import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { FeedbackService } from './services/feedback.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { FavoriteService } from './services/favorite.service';
import {AddpostService} from './services/addpost.service';
import {StatisticsService} from './services/statistics.service';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { SosComponent } from './sos/sos.component';
import { SosService } from './services/sos.service';
import { AddpostComponent } from './addpost/addpost.component';
import { EditpostComponent } from './editpost/editpost.component';
import { NotificationComponent } from './notification/notification.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
    FavoritesComponent,
    SosComponent,
    AddpostComponent,
    FileSelectDirective,
    EditpostComponent,
    NotificationComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule,
    MatTableModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    StorageServiceModule
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    { provide: 'BaseURL', useValue: baseURL },
    ProcessHTTPMsgService,
    FeedbackService,
    AuthService,
    SosService,
    AddpostService,
    StatisticsService,
    FavoriteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  entryComponents: [
        LoginComponent,
        SosComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
