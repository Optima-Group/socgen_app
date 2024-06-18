import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';

import { Router, ActivatedRoute, Params } from "@angular/router";
import { IdentityService } from "app/services/http/identity/identity.service";
import { AppData } from "app/app-data";

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.html',
})
export class PasswordReset {

  public user: string;
  public form: FormGroup;
  public userName: string = '';
  public oldPassword: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;
  private model: any = {};
  private errorMessages: string[] = [];
  private errorMessage: string = '';

  constructor(fb: FormBuilder, private route: ActivatedRoute, public router: Router, private identityService: IdentityService) {
    this.form = fb.group({
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];

    //this.userId = AppData.UserId;
    //this.userId=this.message;


        this.route.params.subscribe((params: Params) => {
            //if (params['userId']) {
                this.userName = params['userName'];
            //}
        });
  }

    public onChangePassword():void {
        this.submitted = true;
        if (this.form.valid) {
            this.model.userId = AppData.UserId;
            this.model.userName = this.userName;
            this.model.password = this.password.value;
            this.changePassword();
        }
    }

    changePassword(): void {

        this.identityService.ResetPassword(this.model)
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
