import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from './http.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class TranslateConfigService {
    constructor(
        private translateService: TranslateService
    ) {
        this.translateService.use('en')
    }

    changeLanguage(type: string) {
        this.translateService.use(type)
    }
}
