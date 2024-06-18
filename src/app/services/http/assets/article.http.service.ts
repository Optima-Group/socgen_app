import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AssetType } from '../../../model/api/assets/asset-type';
import { GenericHttpService } from '../generic.http.service';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { Article } from 'app/model/api/assets/article';

@Injectable()
export class ArticleHttpService extends GenericHttpService<Article, number> {
    constructor(public http: Http) {
        super(http, "", "articles");
    }
}