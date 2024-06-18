import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
//import { User } from './../../model/api/identity/user';
import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import 'style-loader!./register.scss';
import { Router } from "@angular/router";
import { IdentityService } from "app/services/http/identity/identity.service";

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {

  public role: string = 'administrator';

  public form:FormGroup;
  public givenName:AbstractControl;
  public familyName:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;
  private model: any = {};
  private errorMessages: string[] = [];
  private errorMessage: string = '';

  constructor(fb: FormBuilder,
              public router: Router,
              private identityService: IdentityService,
              translate: TranslateService) {

    this.form = fb.group({
      'givenName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'familyName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.givenName = this.form.controls['givenName'];
    this.familyName = this.form.controls['familyName'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];

    translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
  }

  public addAccount():void {
    this.submitted = true;
    if (this.form.valid) {
      this.model.givenName = this.givenName.value;
      this.model.familyName = this.familyName.value;
      this.model.username = this.email.value;
      this.model.password = this.password.value;
      this.model.roles = this.role;
      this.signup();
    }
  }

    signup(): void {

        this.identityService.Create(this.model)
            .subscribe(
            (res: any) => {
                // IdentityResult.
                if (res.succeeded) {
                    // Signs in the user.
                    //this.signin();
                    this.router.navigate(['/identity']);
                } else {
                    this.errorMessages = res.errors;
                }

            },
            (error: any) => {

                // Error on post request.
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                console.log(errMsg);

                this.errorMessage = "Server error. Try later.";

            });

    }

    private setSelectedRole(role: string) {
      this.role = role;
  }
}
