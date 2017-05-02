/**
 * Created by stefania on 4/26/17.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { FAQService } from "../../services/faq.service";
import { FormGroup } from "@angular/forms";
import { ModalFormComponent } from "../modal-form.component";
import { QuestionsFormComponent } from "./questions-form.component";
import { CheckQuestion, Question } from "../../domain/question";

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

    public errorMessage: string;

    public formGroup : FormGroup;

    ngOnInit() {
        this.getQuestions();
        this.formGroup = this.formComponent.form;
    }

    constructor(private _faqService: FAQService) {}

    getQuestions() {
        let self = this;
        this._faqService.getQuestions().subscribe(
            questions => {
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

    public sort(type : string) {
        if(type=='weight') {
            this.questionsCheckboxes.sort(function(a, b) {
                return a.question.weight - b.question.weight;
            });
        } else if (type == 'hits') {

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

    handleError(error) {
        if(error == null) {
            this.formComponent.reset();
        }
        this.errorMessage = 'System error saving question (Server responded: ' + error + ')';
    }
}