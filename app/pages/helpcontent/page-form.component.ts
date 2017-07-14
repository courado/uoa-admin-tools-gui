/**
 * Created by stefania on 7/13/17.
 */
import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


@Component({
    selector: 'page-form',
    templateUrl: './page-form.component.html',
})

export class PageFormComponent implements OnInit{

    @Input('group')
    myForm: FormGroup;

    constructor(private _fb: FormBuilder){}

    ngOnInit(): void {
    }

    public get form() {
        return this._fb.group({
            route : ['', Validators.required],
            name : ['', Validators.required],
            _id : ''
        });
    }

    public reset() {
        this.myForm.patchValue({
            route : '',
            name : '',
            _id : ''
        });
    }

}