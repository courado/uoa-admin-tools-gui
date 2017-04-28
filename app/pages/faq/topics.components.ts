/**
 * Created by stefania on 4/26/17.
 */
import {Component, ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import {Topic, CheckTopic} from "../../domain/topic";
import { FAQService } from "../../services/faq.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'topics',
    templateUrl: './topics.component.html',
})

export class TopicsComponent implements OnInit {

    @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
    public isModalShown:boolean = false;

    public topics: Topic[];
    public topicsCheckboxes : CheckTopic[] = [];
    public errorMessage: string;

    public formGroup : FormGroup;

    ngOnInit() {
        this.getTopics();
    }

    constructor(private _router: Router,
                private _faqService: FAQService,
                private _fb: FormBuilder) {}

    getTopics() {
        let self = this;
        this._faqService.getTopics().subscribe(
            topics => {
                topics.forEach(_ => {
                    console.log(_);
                    self.topicsCheckboxes.push(<CheckTopic>{topic : _, checked : false});
                });
            },
            error =>  this.errorMessage = <any>error);
    }

    public showModal(mode : string):void {
        this.isModalShown = true;
        console.log(this.getSelectedTopics());
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
        this.topicsCheckboxes.forEach(_ => _.checked = event.target.checked);
    }

    public applyCheck(flag : boolean) {
        this.topicsCheckboxes.forEach(_ => _.checked = flag);
    }

    public getSelectedTopics() : Topic[] {
        return this.topicsCheckboxes.filter(topic => topic.checked == true).map(checkedTopic => checkedTopic.topic);
    }

    public saveTopic(data : Topic):void {
        this._faqService.saveTopic(data).subscribe(
            topic => this.topicSavedSuccessfully(topic),
            error => this.handleError(<any>error)
        );
    }

    public topicSavedSuccessfully(topic: Topic) {
        this.topicsCheckboxes.push(<CheckTopic>{topic : topic, checked : false});
        this.hideModal();
        this.applyCheck(false);
    }

    handleError(error) {
        this.errorMessage = 'System error saving topic (Server responded: ' + error + ')';
    }
}