import { Component, ViewContainerRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { BaMenuService } from './theme';
import { MENU } from './app.menu';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';

import 'style-loader!./app.scss';
import 'style-loader!./theme/initial.scss';
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "app/services/authentication.service";
import { AppData } from "app/app-data";
import { ModalDirective } from "ng2-bootstrap";
import { TableDefinitionHttpService } from "app/services/http/common/table-definition.http.service";
import { ColumnDefinitionHttpService } from "app/services/http/common/column-definition.http.service";
import { TableDefinition } from "app/model/common/table-definition";
import { ColumnDefinition } from "app/model/common/column-definition";
import { PagedResult } from "app/model/common/paged-result";
import { ConfigValuesHttpService } from "app/services/http/common/config-values.service";
import { ConfigValue } from "app/model/api/common/config-value";
import { AppConfig } from 'app/config';
import { Param } from './model/common/param';

// import '../../node_modules/primeng/resources/themes/bootstrap/theme.css';
// import '../../node_modules/primeng/resources/primeng.min.css';
// import '../../node_modules/font-awesome/css/font-awesome.min.css';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  templateUrl: './app.component.html'
  // template: `
  //   <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
  //     <div class="additional-bg"></div>


  //     <ba-sidebar></ba-sidebar>
  //     <ba-page-top (actionFired)='actionFired($event)'></ba-page-top>
  //     <div class="al-main">
  //       <div class="al-content">
  //         <br>
  //         <router-outlet></router-outlet>
  //       </div>
  //     </div>

  //     <ba-back-top position="200"></ba-back-top>


  //   </main>
  // `
})
export class App {

  @ViewChild('passwordChangeModal') public passwordChangeModal: ModalDirective;

  isMenuCollapsed: boolean = false;
  signedIn: Observable<boolean>;
  name: Observable<string>;
  isAdmin: Observable<boolean>;
  private menuData: Array<any> = new Array<any>();
  private disclaimer: string = '';

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              private _menuService: BaMenuService,
              public authenticationService: AuthenticationService,
              private router: Router,
              private tableDefinitionHttpService: TableDefinitionHttpService,
              private columnDefinitionHttpService: ColumnDefinitionHttpService,
              private configValuesHttpService: ConfigValuesHttpService) {

    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this._state.subscribe('menu.activeLink', (data) => {

      if (!data.title) return;

      //console.log('currentMenu: ' + JSON.stringify(data));

      if(this.menuData.indexOf(data) === -1) {
        this.menuData.push(data);
      }
      // console.log('menus: ' + JSON.stringify(this.menuData));
    });

    //this.signedIn = this.authenticationService.isSignedIn();
    // this.authenticationService.isSignedIn()
    //   .subscribe(data => AppData.UserIsSignedIn = data);

    this.authenticationService.isSignedIn()
        .subscribe((data) => {
          AppData.UserIsSignedIn = data;

          // if (AppData.UserIsSignedIn) {
          //   this._menuService.updateMenuByRoutes(<Routes>MENU);
          // }
        });

    // this.name = this.authenticationService.getUser()
    //     .map((user: any) => (typeof user.given_name !== 'undefined') ? user.given_name : null);
    this.authenticationService.getUser()
        .map((user: any) => {
          return user;
        })
        .subscribe((data: any) => {
          AppData.UserId = data.sub;
        });

    // this.isAdmin = this.authenticationService.getRoles()
    //     .map((roles: string[]) => roles.indexOf("administrator") != -1);
    this.authenticationService.getRoles()
        .map((roles: string) => {
          return roles;
        })
        .subscribe((data: string) => {
          AppData.UserIsAdmin = data.indexOf("administrator") != -1;
          AppData.UserRoles = data;
          this._menuService.updateMenuByRoutes(<Routes>MENU);
        });
  }

  ngOnInit() {
    //this._menuService.updateMenuByRoutes(<Routes>MENU);
    //this.router.navigate(['/signin']);
    this.loadTableConfigurationData();
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private loadTableConfigurationData() {
    this.tableDefinitionHttpService.get(1, 1000000, 'id', 'asc', null)
      .subscribe((tableDefinitions: PagedResult<TableDefinition>) => {

        let params: Array<Param> = new Array<Param>();
        params.push(new Param('roleName', 'administrator'));
        this.columnDefinitionHttpService.get(1, 1000000, 'tableDefinitionId', 'asc', params)
          .subscribe((columnDefinitions: PagedResult<ColumnDefinition>) => {
            AppData.UpdateColumnDefinitions(tableDefinitions.items, columnDefinitions.items);

            this.configValuesHttpService.get(1, 1000000, 'id', 'asc', null)
              .subscribe((configValues: PagedResult<ConfigValue>) => {
                AppData.UpdateConfigValues(configValues.items);

                this._menuService.updateMenuByRoutes(<Routes>MENU);
                this.disclaimer = AppConfig.DISCLAIMER;
              });
          });        
      });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }

  private actionFired(action: string) {
    if (action === 'SIGNOUT') {
      this.signout();
    } else if (action === 'CHANGE_PASSWORD') {
      this.changePassword();
    } else if (action === 'REFRESH_CONFIG_DATA') {
      this.loadTableConfigurationData();
    }
  }

  signout(): void {
    this.authenticationService.signout();
    this.router.navigate(['/signin']);

    this._menuService.updateMenuByRoutes(<Routes>MENU);
  }

  changePassword(): void {
    //this.passwordChangeModal.show();
    this.router.navigate(['/password']);
  }

  private onTabItemSelected(menuItemData: any) {
    //console.log(JSON.stringify(menuItemData.route.path));
    let route: string = '';
    //menuItemData.route.path.spli
    // menuItemData.selected = false;


    menuItemData.route.paths.forEach((path: string) => {
      if (path != '\\') route = route + '\\';
      route = route + path;
    });

    //this.router.navigate(['/' + menuItemData.route.path]);
    this.router.navigate([route]);
  }

  private onTabItemRemoved(menuItemData: any) {
    //console.log(JSON.stringify(menuItemData));

    let newData: Array<any> = new Array<any>();

    let index: number = this.menuData.indexOf(menuItemData);

    if(index > -1) {
        //console.log('index: ' + index.toString());
        if (confirm('Inchideti?') === true)
        {
          this.menuData.splice(index, 1);
        }
    }

    this.menuData.forEach((item: any) => {
        newData.push(item);
    });
  }

  private deleteArray(){
    this.menuData.splice(0, 1);
  }



  //   private onMenuSelected(action: string) {

  //     // this._menuService.getCurrentItem().forEach(key => {
  //     //   console.log(JSON.stringify(value));
  //     // });

  //     let menuItemData: any = this._menuService.getCurrentItem();
  //     //console.log(JSON.stringify(menuItemData));

  //      this.tabsComponent.openTab(
  //       menuItemData.title,
  //       this.Template,
  //     menuItemData.route.paths,
  //     true
  //   );
  //   this.router.navigate([menuItemData.route.paths]);
  // }
}
