/**
 * Created by stefanos on 28/4/2017.
 */

import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


@Component({
    selector: 'topics-form',
    templateUrl: './topics-form.component.html',
})

export class TopicsFormComponent implements OnInit{

    @Input('group')
    myForm: FormGroup;

    constructor(private _fb: FormBuilder){}

    ngOnInit(): void {
    }

    public get form() {
        return this._fb.group({
            name : ['', Validators.required],
            description : '',
            weight : ['0.0', Validators.required],
            questionOrder : 'hits',
            _id : ''
            // date : '',
        });
    }

    public reset() {
        this.myForm.patchValue({
            name : '',
            description : '',
            weight : '0.0',
            questionOrder : 'hits',
            _id : ''
        });
        this.myForm.markAsPristine();
    }

}