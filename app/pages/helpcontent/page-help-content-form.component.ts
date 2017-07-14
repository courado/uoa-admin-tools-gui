/**
 * Created by stefania on 7/14/17.
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Page } from "../../domain/page";
import { HelpContentService } from "../../services/help-content.service";


@Component({
    selector: 'page-content-form',
    templateUrl: './page-help-content-form.component.html',
})

export class PageContentFormComponent implements OnInit{

    @Input('group')
    myForm: FormGroup;

    private availablePages : Page[] = [];
    private errorMessage: string;

    constructor(private _fb: FormBuilder, private _helpContentService: HelpContentService){}

    ngOnInit() {
        this._helpContentService.getPages().subscribe(
            pages => this.availablePages = pages,
            error => this.handleError('System error retrieving pages', error));
    }

    public get form() {
        return this._fb.group({
            page : [[''],Validators.required],
            placement : ['', Validators.required],
            content : ['', Validators.required],
            order : ['1', Validators.required],
            isActive : true,
            _id : '',
        });
    }

    public reset() {
        this.myForm.patchValue({
            page : '',
            placement : '',
            content : [''],
            order : '1',
            isActive : true,
            _id : ''
        });
        this.myForm.markAsPristine();
    }

    handleError(message: string, error) {
        this.errorMessage = message + ' (Server responded: ' + error + ')';
    }
}