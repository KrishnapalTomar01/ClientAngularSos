import { Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import {AddpostComponent} from '../addpost/addpost.component';
import {EditpostComponent} from '../editpost/editpost.component';
import {NotificationComponent} from '../notification/notification.component';
import {StatisticsComponent} from '../statistics/statistics.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  {path: 'aboutus', component: AboutComponent},
  { path: 'contactus',     component: ContactComponent },
  {path:'addpost',component:AddpostComponent},
  {path:'editpost/:id',component:EditpostComponent},
  {path:'notifications',component:NotificationComponent},
  {path:'statistics',component:StatisticsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];