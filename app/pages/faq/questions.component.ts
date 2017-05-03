/**
 * Created by stefania on 4/26/17.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { FAQService } from "../../services/faq.service";
import { FormGroup } from "@angular/forms";
import { ModalFormComponent } from "../modal-form.component";
import { QuestionsFormComponent } from "./questions-form.component";
import { CheckQuestion, Question, QuestionFilterOptions } from "../../domain/question";
import { Topic } from "../../domain/topic";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog.component";

@Component({
    selector: 'questions',
    templateUrl: './questions.component.html',
})

export class QuestionsComponent implements OnInit {

    // @ViewChild(ModalFormComponent)
    @ViewChild('saveModal')
    public modal:ModalFormComponent;

    @ViewChild('updateModal')
    public updateModal:ModalFormComponent;

    @ViewChild(QuestionsFormComponent)
    public formComponent : QuestionsFormComponent;

    @ViewChild('deleteConfirmationModal')
    public deleteConfirmationModal : DeleteConfirmationDialogComponent;

    public questionsCheckboxes : CheckQuestion[] = [];

    public questions : Question[] = [];

    public errorMessage: string;

    public formGroup : FormGroup;

    public topics: Topic[];

    public filters : QuestionFilterOptions = {id : '', active : null, text : ''};

    ngOnInit() {
        this.getTopics();
        this.getQuestions();
        this.formGroup = this.formComponent.form;
    }

    constructor(private _faqService: FAQService) {}

    getTopics() {
        this._faqService.getTopics().subscribe(
            topics => this.topics = topics,
            error =>  this.errorMessage = <any>error);
    }

    getQuestions() {
        let self = this;
        this._faqService.getQuestions().subscribe(
            questions => {
                self.questions = questions;
                questions.forEach(_ => {
                    self.questionsCheckboxes.push(<CheckQuestion>{question : _, checked : false});
                });
            },
            error =>  this.errorMessage = <any>error);
    }

    public showModal():void {
        this.modal.showModal();
    }

    public toggleCheckBoxes(event) {
        this.questionsCheckboxes.forEach(_ => _.checked = event.target.checked);
    }

    public applyCheck(flag : boolean) {
        this.questionsCheckboxes.forEach(_ => _.checked = flag);
    }

    public getSelectedQuestions() : string[] {
        return this.questionsCheckboxes.filter(question => question.checked == true)
            .map(checkedQuestion => checkedQuestion.question).map(res => res._id);
    }

    public confirmDeleteQuestion(id : string) {
        this.deleteConfirmationModal.ids = [id];
        this.deleteConfirmationModal.showModal();
    }

    public confirmDeleteSelectedQuestions() {
        this.deleteConfirmationModal.ids = this.getSelectedQuestions();
        this.deleteConfirmationModal.showModal();
    }

    public confirmedDeleteQuestions(ids : string[]) {
        this._faqService.deleteQuestions(ids).subscribe(
            _ => this.deleteQuestionsFromArray(ids),
            error => this.handleError(error)
        );
    }

    private deleteQuestionsFromArray(ids : string[]) : void {
        for(let id of ids) {
            let iqc = this.questionsCheckboxes.findIndex(_ => _.question._id == id);
            let iq = this.questions.findIndex(_ => _._id == id);
            this.questionsCheckboxes.splice(iqc, 1);
            this.questions.splice(iqc, 1);
        }
    }

    public editQuestion(i : number) {
        let question : Question = Object.assign({}, this.questionsCheckboxes[i].question);
        // question.topics = <Topic[]>Object.create(this.questionsCheckboxes[i].question.topics);
        let topics : string[] = [];
        for(let topic of <Topic[]>question.topics) {
            topics.push(topic._id)
        }
        question.topics = topics;
        console.log(question);
        this.formGroup.patchValue(question);
        this.updateModal.showModal();
    }

    public toggleQuestion(status : boolean, ids : string[]) {
        this._faqService.toggleQuestion(ids,status).subscribe(
            ret => {
                for(let id of ret) {
                    let i = this.questionsCheckboxes.findIndex(_ => _.question._id == id);
                    this.questionsCheckboxes[i].question.isActive=status;
                }
            },
            error => this.handleError(<any>error)
        );
        this.applyCheck(false);
    }

    public saveQuestion(data : any):void {
        console.log(data);
        this._faqService.saveQuestion(data).subscribe(
            question => this.questionSavedSuccessfully(question),
            error => this.handleError(<any>error)
        );
    }

    public questionSavedSuccessfully(question: Question) {
        this.questionsCheckboxes.push(<CheckQuestion>{question : question, checked : false});
        this.questions.push(question);
        this.applyCheck(false);
    }

    public questionUpdatedSuccessfully(question : Question) {
        this.questionsCheckboxes.find(checkItem => checkItem.question._id==question._id).question = question;
        let index = this.questions.findIndex(checkItem => checkItem._id==question._id);
        this.questions[index] = question;
        this.applyCheck(false);
    }


    public filterQuestion(question : Question) : boolean {

        let idFlag = this.filters.id == '' || (<Topic[]>question.topics).map(_ => _._id).includes(this.filters.id);
        let activeFlag = this.filters.active == null || question.isActive == this.filters.active;
        let textFlag = this.filters.text == '' || (question.question + ' ' +question.answer).match(this.filters.text) != null;
        return idFlag && activeFlag && textFlag;
    }

    public applyFilter() {
        this.questionsCheckboxes = [];
        this.questions.filter(item => this.filterQuestion(item)).forEach(
            _ => this.questionsCheckboxes.push(<CheckQuestion>{question: _, checked: false})
        );
    }

    public filterByTopic(event: any) {
        this.filters.id = event.target.value;
        this.applyFilter();
    }

    public displayAllQuestions() {
        this.filters.active = null;
        this.applyFilter();
    }

    public displayActiveQuestions() {
        this.filters.active = true;
        this.applyFilter();
    }

    public filterBySearch(text : string) {
        this.filters.text = text;
        this.applyFilter();
    }

    public displayInactiveQuestions() {
        this.filters.active = false;
        this.applyFilter();
    }

    handleError(error) {
        if(error == null) {
            this.formComponent.reset();
        }
        this.errorMessage = 'System error saving question (Server responded: ' + error + ')';
    }
}