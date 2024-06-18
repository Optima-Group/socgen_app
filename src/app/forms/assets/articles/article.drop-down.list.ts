import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { Article } from 'app/model/api/assets/article';

@Component({
    selector: 'article-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class ArticleDropDownList extends GenericDropDownList<Article, number> {
    constructor() {
        super('name', 'asc');
    }
}