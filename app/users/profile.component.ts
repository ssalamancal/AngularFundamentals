import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

@Component({
  templateUrl: '/app/users/profile.component.html',
  styles: [`
    em { float: right; color:#E05C65; padding-left: 10px; }
    .error input {background-color:#E3C3C5; }
    .error ::-webkit-input-placehoder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder  { color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr) {
  }
  private firstName: FormControl
  private lastName: FormControl

  profileForm: FormGroup

  ngOnInit() {
    this.firstName = new FormControl(this.authService.currentUser.firstName, Validators.required)
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.toastr.success('Profile Saved')
        })
    }
  }

  cancel() {
    this.router.navigate(['events'])
  }
}