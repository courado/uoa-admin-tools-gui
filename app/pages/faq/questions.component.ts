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
                console.log(self.questions)
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

    public getSelectedQuestions() : Question[] {
        return this.questionsCheckboxes.filter(question => question.checked == true).map(checkedQuestion => checkedQuestion.question);
    }

    private deleteQuestionFromArray(id : string) : void {
        let i = this.questionsCheckboxes.findIndex(_ => _.question._id == id);
        this.questionsCheckboxes.splice(i,1);
    }

    //TODO: make the iteration on the server side
    public deleteQuestion(indexes : number[]) {
        for(let i of indexes) {
            let id = this.questionsCheckboxes[i].question._id;
            this._faqService.deleteQuestion(id).subscribe(
                _ => this.deleteQuestionFromArray(id),
                error => this.handleError(error)
            );
        }
    }

    //TODO: make the iteration on the server side
    public deleteSelected() {
        let ids : string[] = this.getSelectedQuestions().map(res => res._id);
        for(let id of ids) {
            this._faqService.deleteQuestion(id).subscribe(
                _ => this.deleteQuestionFromArray(id),
                error => this.handleError(error)
            );
        }
    }

    public editQuestion(i : number) {
        let question : Question = this.questionsCheckboxes[i].question;
        this.formGroup.patchValue(question);
        this.updateModal.showModal();
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
        this.applyCheck(false);
    }

    public questionUpdatedSuccessfully(question : Question) {
        this.questionsCheckboxes.find(checkItem => checkItem.question._id==question._id).question = question;
        this.applyCheck(false);
    }


    public filterQuestion(question : Question) : boolean {

        let idFlag = this.filters.id == '' || (<Topic[]>question.topics).map(_ => _._id).includes(this.filters.id);
        let activeFlag = this.filters.active == null || question.isActive == this.filters.active;
        let textFlag = true; // TODO apply the question answer search filter
        console.log(this.filters,idFlag,activeFlag);
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