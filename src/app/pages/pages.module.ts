import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages]
})
export class PagesModule {
  constructor(private translate: TranslateService) {
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }
}
