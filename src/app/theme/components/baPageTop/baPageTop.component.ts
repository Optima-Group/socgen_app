import { Component, EventEmitter, Output } from '@angular/core';

import {GlobalState} from '../../../global.state';

import 'style-loader!./baPageTop.scss';
import { AppData } from "app/app-data";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})
export class BaPageTop {

  @Output() protected actionFired: EventEmitter<string> = new EventEmitter<string>();

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  public userLogin: {name: ''};

  constructor(private _state:GlobalState, public authenticationService: AuthenticationService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    console.log('Auth: ', authenticationService.userSubject.subscribe(res => this.userLogin = res));
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  private signout() {
    this.actionFired.emit('SIGNOUT');
  }

  private changePassword() {
    this.actionFired.emit('CHANGE_PASSWORD');
  }

  private refresh() {
    this.actionFired.emit('REFRESH_CONFIG_DATA');
  }

    public get isSignedIn(): boolean {
        return AppData.UserIsSignedIn;
    }
}
