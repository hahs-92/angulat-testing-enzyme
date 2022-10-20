import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
import { MyValidators } from 'src/app/utils/validators';
import { CreateUserDTO } from '../../../models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email],
        // [MyValidators.validateEmailAsync(this.usersService)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MyValidators.validPassword,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.status = 'loading';
      // const value = this.form.value;
      const value = {
        name: this.form.value.name!,
        email: this.form.value.email!,
        password: this.form.value.password!,
        avatar:
          'https://gravatar.com/avatar/e5e7a5a454fb116f89156a9f4916862a?s=400&d=robohash&r=x',
      };
      this.usersService.create(value as CreateUserDTO).subscribe({
        next: (rta) => {
          // redirect
          // alert
          this.status = 'success';
          //this.router.navigateByUrl('/login');
        },
        error: (error) => {
          // redict
          this.status = 'error';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
