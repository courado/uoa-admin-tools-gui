/**
 * Created by stefania on 4/26/17.
 */
import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Topic } from "../../domain/topic";
import { FAQService } from "../../services/faq.service";

@Component({
    selector: 'topics',
    templateUrl: './topics.component.html',
})

export class TopicsComponent {

    @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
    public isModalShown:boolean = false;

    public topics: Topic[];
    public errorMessage: string;

    ngOnInit() {
        this.getTopics();
    }

    constructor(private _router: Router,
                private _faqService: FAQService) {}

    getTopics() {
        this._faqService.getTopics().subscribe(
            topics => this.topics = topics,
            error =>  this.errorMessage = <any>error);
    }

    public showModal():void {
        this.isModalShown = true;
    }

    public hideModal():void {
        this.autoShownModal.hide();
    }

    public onHidden():void {
        this.isModalShown = false;
    }

}