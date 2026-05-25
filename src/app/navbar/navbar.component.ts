import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent {
  active: string = 'dashboard';

  ngOnInIt() {}

  setActive(link:string){
    this.active = link;
  }

}
