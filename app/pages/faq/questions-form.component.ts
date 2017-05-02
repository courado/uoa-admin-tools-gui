/**
 * Created by stefania on 5/2/17.
 */
import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


@Component({
    selector: 'questions-form',
    templateUrl: './questions-form.component.html',
})

export class QuestionsFormComponent implements OnInit{

    @Input('group')
    myForm: FormGroup;

    constructor(private _fb: FormBuilder){}

    ngOnInit(): void {
    }

    public get form() {
        return this._fb.group({
            question : ['', Validators.required],
            answer : ['', Validators.required],
            // topics : '',
            weight : ['0.0', Validators.required],
            active : false,
            _id : ''
            // date : '',
        });
    }

    public reset() {
        this.myForm.patchValue({
            question : '',
            answer : '',
            // topics : '',
            weight : '0.0',
            active : false,
            _id : ''
        });
    }

}