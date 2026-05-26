import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [CommonModule, RouterLink]

})
export class NavbarComponent {
  active: string = 'dashboard';

  ngOnInit() {}

  setActive(link:string){
    this.active = link;
  }

}
