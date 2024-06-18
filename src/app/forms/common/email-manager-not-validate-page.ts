import { Component } from '@angular/core';
import { EmailManagerHttpService } from 'app/services/http/administration/email-manager.http.service';
import { EmailManagerReason } from 'app/model/api/common/email-manager-reason';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'email-manager-not-validate-page',
    templateUrl: 'email-manager-not-validate-page.html'
})
export class EmailManagerNotValidatePage {
    reason: string = '';
    guid: string = '';
    constructor(private emailManager: EmailManagerHttpService, private route: ActivatedRoute) {
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.guid = params['id'];
            }
        });
    }

    save () {
        let reasonEmail = new EmailManagerReason();
        reasonEmail.reason = this.reason;
        reasonEmail.guid = this.guid;
        this.emailManager.addNewReason(reasonEmail).subscribe( (res) => {

        });
    }
}