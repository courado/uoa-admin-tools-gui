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

    ngOnInit(): void {
    }

}