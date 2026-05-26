import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet, RouterModule] 

})
export class AppComponent {
  title = 'project-pilot';
  showNavBar: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/login' || val.url === '/' || val.url === '/signup') {
          this.showNavBar = false;
        } else {
          this.showNavBar = true;
        }
      }
    });
   }
}
