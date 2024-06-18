import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { PermissionCode } from 'app/model/auth';
import { AuthorizationService } from 'app/services/authorization.service';

@Directive({
    selector: '[hideIfUnauthorized]'
})
export class HideIfNotUnauthorizedDirective implements OnInit {
    @Input('hideIfUnauthorized') permission: PermissionCode; // Required permission passed in

    constructor(private el: ElementRef, private authorizationService: AuthorizationService) { }

    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.permission)) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}