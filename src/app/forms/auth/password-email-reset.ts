import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';

import { Router, ActivatedRoute, Params } from "@angular/router";
import { IdentityService } from "../../services/http/identity/identity.service";
import { AppData } from "../../app-data";

@Component({
  selector: 'password-email-reset',
  templateUrl: './password-email-reset.html',
})
export class PasswordEmailReset {

  public user: string;
  public form: FormGroup;
  public userName: string = '';
  public oldPassword: AbstractControl;
  public password: AbstractControl;
  public usernameEmail: AbstractControl;
  public tokenEmail: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;
  private model: any = {};
  private errorMessages: string[] = [];
  private errorMessage: string = '';
  email = '';
  token = '';

  constructor(fb: FormBuilder, private route: ActivatedRoute, public router: Router, private identityService: IdentityService) {
    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.queryParams['token'];

    this.form = fb.group({
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'usernameEmail': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'tokenEmail': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.usernameEmail = this.passwords.controls['usernameEmail'];
    this.tokenEmail = this.passwords.controls['tokenEmail'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];

    this.usernameEmail.setValue(this.email);
    this.tokenEmail.setValue(this.token);
  }

    public onChangePassword():void {
        this.submitted = true;
        if (this.form.valid) {
            this.model.userName = this.email;
            this.model.token = this.tokenEmail.value;
            this.model.password = this.password.value;
            this.changePassword();
        }
    }

    changePassword(): void {

        this.identityService.ResetEmailPassword(this.model)
            .subscribe(
            (res: any) => {
                // IdentityResult.
                if (res.succeeded) {
                    // Signs in the user.
                    this.router.navigate(['/signin']);
                } else {
                    this.errorMessages = res.errors;
                }

            },
            (error: any) => {

                // Error on post request.
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                this.errorMessage = "Server error. Try later.";

            });

    }
}
