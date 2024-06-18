import { Component, NgZone } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { Signin } from '../../services/signin';
import { IdentityService } from "../../services/http/identity/identity.service";
import 'style-loader!./login.scss';
import { AppConfig } from "app/config";
import { TranslateService } from "@ngx-translate/core";

declare global {
  interface Window {
    RTCPeerConnection: any;
    mozRTCPeerConnection: any;
    webkitRTCPeerConnection: any;
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login extends Signin {

  constructor(fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService) {

    super(router, authenticationService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.authenticationService.setToken(token);
        this.router.navigate(['/']);
      } else {
        this.authenticationService.login();
      }
    });
  }

  // public form:FormGroup;
  // public email:AbstractControl;
  // public password:AbstractControl;
  // public empIntCode:AbstractControl;
  // public emailReset:AbstractControl;
  // public submitted:boolean = false;
  // private inventoryListDirectLink: boolean = false;
  //
  // public internalCode: string = '3903B';
  // private notification: string = '';
  // showPasswordBtn = false;
  //
  // // localIp = sessionStorage.getItem('LOCAL_IP');
  //
  // private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);
  //
  // constructor(fb: FormBuilder,
  //   public router: Router,
  //   private zone: NgZone,
  //   public authenticationService: AuthenticationService,
  //   private translate: TranslateService,
  //   private identityService: IdentityService) {
  //
  // super(router, authenticationService);
  //
  // translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
  //   let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  //   this.form = fb.group({
  //     'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
  //     'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
  //     'empIntCode': [''],
  //     'emailReset': ['', [<any>Validators.required,  <any>Validators.pattern(emailRegex) ]]
  //   });
  //
  //   this.email = this.form.controls['email'];
  //   this.password = this.form.controls['password'];
  //   this.empIntCode = this.form.controls['empIntCode'];
  //   this.emailReset = this.form.controls['emailReset'];
  //
  //   this.inventoryListDirectLink = AppConfig.INVENTORYLIST_DIRECTLINK;
  // }
  //
  // public onSubmit(values:Object):void {
  //   this.submitted = true;
  //   if (this.form.valid || !this.showPasswordBtn) {
  //     // your code goes here
  //     // console.log(values);
  //     this.model.username = this.email.value;
  //     this.model.password = this.password.value;
  //     this.signin();
  //   }
  //   // this.determineLocalIp();
  // }
  //
  //
  // public showInventoryList() :void {
  //   let url: string = '';
  //   let internalCode: string = '';
  //
  //   // console.log(this.empIntCode);
  //
  //   internalCode = this.empIntCode.value;
  //
  //   url = `${AppConfig.reportingServer}Report.aspx/?report=inventorylistv3login&reportType=ALL&internalCode=${internalCode}`;
  //
  //   window.open(url);
  // }
  //
  // public resetPassword() :void {
  //
  //   let resetEmail = this.emailReset.value;
  //
  //   if (confirm('Doriti sa resetati parola?')) {
  //     this.identityService.forgetPassword(resetEmail)
  //         .subscribe((res) => {
  //             if(res) {
  //               alert('Emailul a fost trimis cu succes!!');
  //               this.showPasswordBtn = false;
  //             }else {
  //               alert('Userul nu exista!!');
  //             }
  //
  //         }, (error) => {
  //           alert(error);
  //         });
  //
  // }
  //
  //
  // }
  //
  //
  // private showResetPassword () {
  //     this.showPasswordBtn = true;
  // }
  //
  // private back() {
  //   this.showPasswordBtn = false;
  // }

}
