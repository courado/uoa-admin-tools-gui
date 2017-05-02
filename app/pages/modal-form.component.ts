/**
 * Created by stefanos on 28/4/2017.
 */
import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup } from "@angular/forms";
import { FAQService } from "../services/faq.service";
import { Topic } from "../domain/topic";

@Component({
    selector: 'modal-form',
    templateUrl: './modal-form.component.html'
})
export class ModalFormComponent {

    constructor(private _faqService : FAQService){
    }

    @ViewChild('autoShownModal')
    public autoShownModal:ModalDirective;

    @Input()
    public isModalShown:boolean = false;

    @Input()
    public saveText : string;

    @Input()
    public titleText : string;

    @Input()
    public formGroup : FormGroup;

    @Input()
    public type : string = 'topic';

    public errorMessage : string = null;

    @Output() emmitObject: EventEmitter<any> = new EventEmitter();

    @Output() emmitError: EventEmitter<any> = new EventEmitter();

    public showModal():void {
        this.isModalShown = true;
    }

    public hideModal():void {
        this.autoShownModal.hide();
    }

    public onHidden():void {
        this.isModalShown = false;
        this.emmitError.emit(null);
    }

    public saveCustom(obj : any) {
        if (this.type == 'topic') {
            this._faqService.saveTopic(<Topic> obj).subscribe(
                data => this.emmitObject.emit(data),
                error => this.emmitError.emit(error)
            );
        } else if (this.type == 'question') {
            return;
        }
        this.hideModal();
    }
}

