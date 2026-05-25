import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
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
