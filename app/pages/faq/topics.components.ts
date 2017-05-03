/**
 * Created by stefania on 4/26/17.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Topic, CheckTopic } from "../../domain/topic";
import { FAQService } from "../../services/faq.service";
import { FormGroup } from "@angular/forms";
import { ModalFormComponent } from "../modal-form.component";
import { TopicsFormComponent } from "./topics-form.component";
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog.component";

@Component({
    selector: 'topics',
    templateUrl: './topics.component.html',
})

export class TopicsComponent implements OnInit {

    // @ViewChild(ModalFormComponent)
    @ViewChild('saveModal')
    public modal:ModalFormComponent;

    @ViewChild('updateModal')
    public updateModal:ModalFormComponent;

    @ViewChild('deleteConfirmationModal')
    public deleteConfirmationModal : DeleteConfirmationDialogComponent;

    @ViewChild(TopicsFormComponent)
    public formComponent : TopicsFormComponent;

    public topicsCheckboxes : CheckTopic[] = [];

    public topics : Topic[] = [];

    public errorMessage: string;

    public formGroup : FormGroup;

    private searchText = '';

    ngOnInit() {
        this.getTopics();
        this.formGroup = this.formComponent.form;
    }

    constructor(private _faqService: FAQService) {}

    getTopics() {
        let self = this;
        this._faqService.getTopics().subscribe(
            topics => {
                self.topics = topics;
                topics.forEach(_ => {
                    self.topicsCheckboxes.push(<CheckTopic>{topic : _, checked : false});
                });
            },
            error =>  this.errorMessage = <any>error);
    }

    public showModal():void {
        this.modal.showModal();
    }

    public toggleCheckBoxes(event) {
        this.topicsCheckboxes.forEach(_ => _.checked = event.target.checked);
    }

    public applyCheck(flag : boolean) {
        this.topicsCheckboxes.forEach(_ => _.checked = flag);
    }

    public getSelectedTopics() : string[] {
        return this.topicsCheckboxes.filter(topic => topic.checked == true).map(checkedTopic => checkedTopic.topic).map(res => res._id);
    }

    private deleteTopicsFromArray(ids : string[]) : void {
        for(let id of ids) {
            let i = this.topicsCheckboxes.findIndex(_ => _.topic._id == id);
            this.topicsCheckboxes.splice(i, 1);
        }
    }

    public confirmDeleteTopic(id : string) {
        this.deleteConfirmationModal.ids = [id];
        this.deleteConfirmationModal.showModal();
    }

    public confirmDeleteSelectedTopics() {
        this.deleteConfirmationModal.ids = this.getSelectedTopics();
        this.deleteConfirmationModal.showModal();
    }

    public confirmedDeleteTopic(ids : string[]) {
        this._faqService.deleteTopics(ids).subscribe(
            _ => this.deleteTopicsFromArray(ids),
            error => this.handleError(error)
        );
    }

    public sort(type : string) {
        if(type=='weight') {
            this.topicsCheckboxes.sort(function(a, b) {
                return a.topic.weight - b.topic.weight;
            });
        } else if (type == 'hits') {

        }
    }

    public editTopic(i : number) {
        let topic : Topic = this.topicsCheckboxes[i].topic;
        this.formGroup.patchValue(topic);
        this.updateModal.showModal();
    }

    public toggleTopic(order : string, ids : string[]) {
        this._faqService.orderTopic(ids,order).subscribe(
            ret => {
                for(let id of ret) {
                    let i = this.topicsCheckboxes.findIndex(_ => _.topic._id == id);
                    this.topicsCheckboxes[i].topic.questionOrder=order;
                }
            },
            error => this.handleError(<any>error)
        );
        this.applyCheck(false);
    }

    public topicSavedSuccessfully(topic: Topic) {
        this.topicsCheckboxes.push(<CheckTopic>{topic : topic, checked : false});
        this.applyCheck(false);
    }

    public topicUpdatedSuccessfully(topic : Topic) {
        this.topicsCheckboxes.find(checkItem => checkItem.topic._id==topic._id).topic = topic;
        this.applyCheck(false);
    }

    public filterBySearch(text : string) {
        this.searchText = text;
        this.applyFilter();
    }

    public applyFilter() {
        this.topicsCheckboxes = [];
        this.topics.filter(item => this.filterQuestion(item)).forEach(
            _ => this.topicsCheckboxes.push(<CheckTopic>{topic: _, checked: false})
        );
    }

    public filterQuestion(topic : Topic) : boolean {
        let textFlag = this.searchText == '' || (topic.name + ' ' +topic.description).match(this.searchText) != null;
        return textFlag;
    }

    handleError(error) {
        if(error == null) {
            this.formComponent.reset();
        }
        this.errorMessage = 'System error saving topic (Server responded: ' + error + ')';
    }
}