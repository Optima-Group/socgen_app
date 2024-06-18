import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { PermissionCode } from 'app/model/auth';
import { AuthorizationService } from 'app/services/authorization.service';

@Directive({
    selector: '[disableIfUnauthorized]'
})
export class DisableIfNotUnauthorizedDirective implements OnInit {
    @Input('disableIfUnauthorized') permission: PermissionCode; // Required permission passed in

    constructor(private el: ElementRef, private authorizationService: AuthorizationService) { }

    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.permission)) {
            this.el.nativeElement.disabled = true;
        }
    }
}