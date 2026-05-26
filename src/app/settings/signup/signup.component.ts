import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from '../../utils/validators';
import { RegisterData } from '../../Model/loginData.model';
import { ShareDataService } from '../../share-data.service';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule]
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
      next: (res: any) => {
        console.log("User registered:", res);
        this.router.navigate(['/login'])
      },
      error: (err: any) => {
        console.log('Registration failed:', err)
      }
    })
  }
}



