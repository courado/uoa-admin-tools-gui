/**
 * Created by stefania on 4/26/17.
 */
import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Topic } from "../../domain/topic";
import { FAQService } from "../../services/faq.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'topics',
    templateUrl: './topics.component.html',
})

export class TopicsComponent {

    @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
    public isModalShown:boolean = false;

    public topics: Topic[];
    public errorMessage: string;

    public formGroup : FormGroup;

    ngOnInit() {
        this.getTopics();

    }

    constructor(private _router: Router,
                private _faqService: FAQService,
                private _fb: FormBuilder) {}

    getTopics() {
        this._faqService.getTopics().subscribe(
            topics => this.topics = topics,
            error =>  this.errorMessage = <any>error);
    }

    public showModal(mode : string):void {
        this.isModalShown = true;

        this.formGroup = this._fb.group({
            name : ['', Validators.required],
            description : ['', Validators.required],
            weight : ['0.0', Validators.required],
            questionOrder : 'hits'
        });
    }

    public hideModal():void {
        this.autoShownModal.hide();
    }

    public onHidden():void {
        this.isModalShown = false;
    }

    public toggleCheckBoxes(event) {
        this.topics.forEach(x => x.state = event.target.checked);
        // console.log(event.target.checked);
    }

    public saveTopic(data : Topic):void {
        this._faqService.saveTopic(data).subscribe(
            topic => this.topicSavedSuccessfully(topic),
            error => this.handleError(<any>error)
        );
    }

    public topicSavedSuccessfully(topic: Topic) {
        this.topics.push(topic);
        this.hideModal();
    }

    handleError(error) {
        this.errorMessage = 'System error saving topic (Server responded: ' + error + ')';
    }
}