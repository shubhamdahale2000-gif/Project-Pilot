import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/Model/loginData.model';
import { ShareDataService } from 'src/app/share-data.service';
import { passwordMatch } from 'src/app/utils/validators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    standalone: false
})
export class SignupComponent {

  userData: any;
  registerUser: RegisterData = new RegisterData;
  registerForm: FormGroup;

  constructor(private router: Router, private shareDataService: ShareDataService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, passwordMatch])
    })
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(x => this.registerForm.get('confirmPassword')?.updateValueAndValidity());
  }

  // onSubmitRegisterForm1(data: RegisterData) {
  //   this.shareDataService.addUser(data).subscribe(res => {
  //     this.router.navigate(['/login'])
  //   })
  // }

  onSubmitRegisterForm(data: RegisterData) {
    this.shareDataService.addUser(data).subscribe({
      next: (res) => {
        console.log("User registered:", res);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log('Registration failed:', err)
      }
    })
  }
}



