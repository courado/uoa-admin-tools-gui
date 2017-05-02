/**
 * Created by stefania on 5/2/17.
 */
import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Topic} from "../../domain/topic";


@Component({
    selector: 'questions-form',
    templateUrl: './questions-form.component.html',
})

export class QuestionsFormComponent implements OnInit{

    @Input('group')
    myForm: FormGroup;

    @Input() availableTopics : Topic[] = [];

    constructor(private _fb: FormBuilder){}

    ngOnInit(): void {
    }

    public get form() {
        return this._fb.group({
            question : ['', Validators.required],
            answer : ['', Validators.required],
            topics : [[''],Validators.required],
            weight : ['0.0', Validators.required],
            isActive : true,
            _id : '',
            date : ''
        });
    }

    public reset() {
        this.myForm.patchValue({
            question : ['', Validators.required],
            answer : ['', Validators.required],
            topics : [[''],Validators.required],
            weight : ['0.0', Validators.required],
            date : '',
            isActive : true,
            _id : ''
        });
    }

}