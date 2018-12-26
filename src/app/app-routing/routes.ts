import { Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  {path: 'aboutus', component: AboutComponent},
  { path: 'contactus',     component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];