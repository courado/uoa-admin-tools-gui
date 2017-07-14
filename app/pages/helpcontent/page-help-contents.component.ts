/**
 * Created by stefania on 7/13/17.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog.component";
import { HelpContentService } from "../../services/help-content.service";
import { PageHelpContent, CheckPageHelpContent, PageHelpContentFilterOptions } from "../../domain/page-help-content";
import { Page } from "../../domain/page";
import {Router} from "@angular/router";

@Component({
    selector: 'page-help-contents',
    templateUrl: './page-help-contents.component.html',
})

export class PageHelpContentsComponent implements OnInit {

    // @ViewChild(ModalFormComponent)
    // @ViewChild('saveModal')
    // public modal:ModalFormComponent;
    //
    // @ViewChild('updateModal')
    // public updateModal:ModalFormComponent;
    //
    // @ViewChild(PageHelpContentsFormComponent)
    // public formComponent : PageHelpContentsFormComponent;

    @ViewChild('deleteConfirmationModal')
    public deleteConfirmationModal : DeleteConfirmationDialogComponent;

    public pageHelpContentsCheckboxes : CheckPageHelpContent[] = [];

    public pageHelpContents : PageHelpContent[] = [];

    public errorMessage: string;

    public formGroup : FormGroup;

    public pages: Page[];

    public checkboxAll : boolean = false;

    public filters : PageHelpContentFilterOptions = {id : '', active : null, text : new RegExp('')};

    public counter = {all : 0, active : 0, inactive : 0};

    ngOnInit() {
        this.getPages();
        this.getPageHelpContents();
        // this.formGroup = this.formComponent.form;
    }

    constructor(private _helpService: HelpContentService, private router : Router) {}

    getPages() {
        this._helpService.getPages().subscribe(
            pages => this.pages = pages,
            error => this.handleError('System error retrieving pages', error));
    }

    public countPageHelpContents() {
        this.counter = {all : 0, active : 0, inactive : 0};
        let filter = Object.assign({},this.filters);
        filter.active = null;
        this.pageHelpContents.forEach(_ => {
            if(this.filterPageHelpContent(_,filter)){
                if (_.isActive==true) this.counter.active++;
                else this.counter.inactive++
            }
        });
        this.counter.all = this.counter.active + this.counter.inactive;
    }

    getPageHelpContents() {
        let self = this;
        this._helpService.getPageHelpContents().subscribe(
            pageHelpContents => {
                self.pageHelpContents = pageHelpContents as Array<PageHelpContent>;
                self.counter.all = self.pageHelpContents.length;
                self.pageHelpContents.forEach(_ => {
                    self.pageHelpContentsCheckboxes.push(<CheckPageHelpContent>{pageHelpContent : _, checked : false});
                });
                self.countPageHelpContents();
            },
            error => this.handleError('System error retrieving page contents', error));
    }

    // public showModal():void {
    //     this.modal.showModal();
    // }

    public toggleCheckBoxes(event) {
        this.pageHelpContentsCheckboxes.forEach(_ => _.checked = event.target.checked);
        this.checkboxAll = event.target.checked;
    }

    public applyCheck(flag : boolean) {
        this.pageHelpContentsCheckboxes.forEach(_ => _.checked = flag);
        this.checkboxAll = false;
    }

    public getSelectedPageHelpContents() : string[] {
        return this.pageHelpContentsCheckboxes.filter(pageHelpContent => pageHelpContent.checked == true)
            .map(checkedPageHelpContent => checkedPageHelpContent.pageHelpContent).map(res => res._id);
    }

    public confirmDeletePageHelpContent(id : string) {
        this.deleteConfirmationModal.ids = [id];
        this.deleteConfirmationModal.showModal();
    }

    public confirmDeleteSelectedPageHelpContents() {
        this.deleteConfirmationModal.ids = this.getSelectedPageHelpContents();
        this.deleteConfirmationModal.showModal();
    }

    public confirmedDeletePageHelpContents(ids : string[]) {
        this._helpService.deletePageHelpContents(ids).subscribe(
            _ => this.deletePageHelpContentsFromArray(ids),
            error => this.handleError('System error deleting the selected page content(s)', error)
        );
    }

    private deletePageHelpContentsFromArray(ids : string[]) : void {
        for(let id of ids) {
            let iqc = this.pageHelpContentsCheckboxes.findIndex(_ => _.pageHelpContent._id == id);
            let iq = this.pageHelpContents.findIndex(_ => _._id == id);
            this.pageHelpContentsCheckboxes.splice(iqc, 1);
            this.pageHelpContents.splice(iqc, 1);
        }
    }

    public editPageHelpContent(_id : string) {
        this.router.navigate(['/pageContents/edit/', _id]);
    }

    public togglePageHelpContents(status : boolean, ids : string[]) {
        this._helpService.togglePageHelpContents(ids,status).subscribe(
            ret => {
                for(let id of ret) {
                    let i = this.pageHelpContentsCheckboxes.findIndex(_ => _.pageHelpContent._id == id);
                    this.pageHelpContentsCheckboxes[i].pageHelpContent.isActive=status;
                }
                this.countPageHelpContents();
                this.applyCheck(false);
            },
            error => this.handleError('System error changing the status of the selected page content(s)', error)
        );
    }

    public savePageHelpContent(data : any):void {
        console.log(data);
        this._helpService.savePageHelpContent(data).subscribe(
            pageHelpContent => this.pageHelpContentSavedSuccessfully(pageHelpContent),
            error => this.handleError('System error saving the specified help content', error)
        );
    }

    public pageHelpContentSavedSuccessfully(pageHelpContent: PageHelpContent) {
        this.pageHelpContentsCheckboxes.push(<CheckPageHelpContent>{pageHelpContent : pageHelpContent, checked : false});
        this.pageHelpContents.push(pageHelpContent);
        this.applyCheck(false);
        this.countPageHelpContents();
    }

    public pageHelpContentUpdatedSuccessfully(pageHelpContent : PageHelpContent) {
        this.pageHelpContentsCheckboxes.find(checkItem => checkItem.pageHelpContent._id==pageHelpContent._id).pageHelpContent = pageHelpContent;
        let index = this.pageHelpContents.findIndex(checkItem => checkItem._id==pageHelpContent._id);
        this.pageHelpContents[index] = pageHelpContent;
        this.applyCheck(false);
        this.countPageHelpContents();
    }


    public filterPageHelpContent(pageHelpContent : PageHelpContent, filters : PageHelpContentFilterOptions) : boolean {
        let idFlag = filters.id == '' || (<Page>pageHelpContent.page)._id == filters.id;
        let activeFlag = filters.active == null || pageHelpContent.isActive == filters.active;
        let textFlag = filters.text.toString() == '' || (pageHelpContent.content).match(filters.text) != null;
        return idFlag && activeFlag && textFlag;
    }

    public applyFilter() {
        this.pageHelpContentsCheckboxes = [];
        this.pageHelpContents.filter(item => this.filterPageHelpContent(item,this.filters)).forEach(
            _ => this.pageHelpContentsCheckboxes.push(<CheckPageHelpContent>{pageHelpContent: _, checked: false})
        );
        this.countPageHelpContents();
    }

    public filterByPage(event: any) {
        this.filters.id = event.target.value;
        this.applyFilter();
    }

    public displayAllPageHelpContents() {
        this.filters.active = null;
        this.applyFilter();
    }

    public displayActivePageHelpContents() {
        this.filters.active = true;
        this.applyFilter();
    }

    public filterBySearch(text : string) {
        this.filters.text = new RegExp(text, "i");
        this.applyFilter();
    }

    public displayInactivePageHelpContents() {
        this.filters.active = false;
        this.applyFilter();
    }

    handleError(message: string, error) {
        if(error == null) {
            // this.formComponent.reset();
        }
        this.errorMessage = message + ' (Server responded: ' + error + ')';
    }
}