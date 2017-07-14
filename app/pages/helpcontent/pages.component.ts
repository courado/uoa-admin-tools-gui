/**
 * Created by stefania on 7/13/17.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { HelpContentService } from "../../services/help-content.service";
import { FormGroup } from "@angular/forms";
import { ModalFormComponent } from "../modal-form.component";
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog.component";
import { PageFormComponent } from "./page-form.component";
import { CheckPage, Page } from "../../domain/page";

@Component({
    selector: 'pages',
    templateUrl: './pages.component.html',
})

export class PagesComponent implements OnInit {

    // @ViewChild(ModalFormComponent)
    @ViewChild('saveModal')
    public modal:ModalFormComponent;

    @ViewChild('updateModal')
    public updateModal:ModalFormComponent;

    @ViewChild('deleteConfirmationModal')
    public deleteConfirmationModal : DeleteConfirmationDialogComponent;

    @ViewChild(PageFormComponent)
    public formComponent : PageFormComponent;

    public pagesCheckboxes : CheckPage[] = [];

    public pages : Page[] = [];

    public errorMessage: string;

    public formGroup : FormGroup;

    private searchText : RegExp = new RegExp('');

    ngOnInit() {
        this.getPages();
        this.formGroup = this.formComponent.form;
    }

    constructor(private _helpContentService: HelpContentService) {}

    getPages() {
        let self = this;
        this._helpContentService.getPages().subscribe(
            pages => {
                self.pages = pages;
                pages.forEach(_ => {
                    self.pagesCheckboxes.push(<CheckPage>{page : _, checked : false});
                });
            },
            error => this.handleError('System error retrieving pages', error));
    }

    public showModal():void {
        this.modal.showModal();
    }

    public toggleCheckBoxes(event) {
        this.pagesCheckboxes.forEach(_ => _.checked = event.target.checked);
    }

    public applyCheck(flag : boolean) {
        this.pagesCheckboxes.forEach(_ => _.checked = flag);
    }

    public getSelectedPages() : string[] {
        return this.pagesCheckboxes.filter(page => page.checked == true).map(checkedPage => checkedPage.page).map(res => res._id);
    }

    private deletePagesFromArray(ids : string[]) : void {
        for(let id of ids) {
            let i = this.pagesCheckboxes.findIndex(_ => _.page._id == id);
            this.pagesCheckboxes.splice(i, 1);
        }
    }

    public confirmDeletePage(id : string) {
        this.deleteConfirmationModal.ids = [id];
        this.deleteConfirmationModal.showModal();
    }

    public confirmDeleteSelectedPages() {
        this.deleteConfirmationModal.ids = this.getSelectedPages();
        this.deleteConfirmationModal.showModal();
    }

    public confirmedDeletePages(ids : string[]) {
        this._helpContentService.deletePages(ids).subscribe(
            _ => this.deletePagesFromArray(ids),
            error => this.handleError('System error deleting the selected pages', error)
        );
    }

    public editPage(i : number) {
        let page : Page = this.pagesCheckboxes[i].page;
        this.formGroup.patchValue(page);
        this.updateModal.showModal();
    }

    public pageSavedSuccessfully(page: Page) {
        this.pagesCheckboxes.push(<CheckPage>{page : page, checked : false});
        this.applyCheck(false);
    }

    public pageUpdatedSuccessfully(page : Page) {
        this.pagesCheckboxes.find(checkItem => checkItem.page._id==page._id).page = page;
        this.applyCheck(false);
    }

    public filterBySearch(text : string) {
        this.searchText = new RegExp(text,'i');
        this.applyFilter();
    }

    public applyFilter() {
        this.pagesCheckboxes = [];
        this.pages.filter(item => this.filterPages(item)).forEach(
            _ => this.pagesCheckboxes.push(<CheckPage>{page: _, checked: false})
        );
    }

    public filterPages(page : Page) : boolean {
        let textFlag = this.searchText.toString() == '' || (page.route + ' ' +page.name).match(this.searchText) != null;
        return textFlag;
    }

    handleError(message: string, error) {
        if(error == null) {
            this.formComponent.reset();
        }
        this.errorMessage = message + ' (Server responded: ' + error + ')';
    }
}