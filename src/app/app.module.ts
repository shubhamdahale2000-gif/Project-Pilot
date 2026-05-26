// import { ErrorHandler, NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LogInComponent } from './settings/log-in/log-in.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NavbarComponent } from './navbar/navbar.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { BarChartComponent } from './bar-chart/bar-chart.component';
// import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
// import { ShareDataService } from './share-data.service';
// import { SignupComponent } from './settings/signup/signup.component';

// @NgModule({ declarations: [AppComponent], 
//         bootstrap: [AppComponent], 
//         imports: [BrowserModule,
//         AppRoutingModule,
//         ReactiveFormsModule,
//         FormsModule,
//         FontAwesomeModule,
//         NgChartsModule, 
//         // LogInComponent,
//         DashboardComponent,
//         // NavbarComponent,
//         BarChartComponent,
//         // SignupComponent
//       ], providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false } }, { provide: ErrorHandler, useClass: ShareDataService }, provideHttpClient(withInterceptorsFromDi())] })
// export class AppModule {
//   constructor(){
//     console.log("App Module called")
//   }
//  }
