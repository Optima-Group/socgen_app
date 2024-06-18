import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { Article } from 'app/model/api/assets/article';

@Component({
    selector: 'article-detail',
    templateUrl: 'article.detail.html'
})
export class ArticleDetail extends GenericDetail<Article, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Article();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}