/**
 * Created by stefania on 7/14/17.
 */
import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import { PageContentFormComponent } from "./page-help-content-form.component";
import { Subscription } from "rxjs/Subscription";
import { HelpContentService } from "../../services/help-content.service";
import { PageHelpContent } from "../../domain/page-help-content";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'edit-page-help-content',
    templateUrl: 'edit-page-help-content.component.html',
})

export class EditPageHelpContentComponent implements OnInit, OnDestroy{

    @ViewChild(PageContentFormComponent)
    public formComponent : PageContentFormComponent;

    private sub: Subscription;

    private pageHelpContent: PageHelpContent;

    private errorMessage : string = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _helpContentService: HelpContentService) {}

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this._helpContentService.getPageHelpContent(id as string).subscribe(
                pageHelpContent => this.updateForm(pageHelpContent),
                error => this.handleError('System error retrieving page help content', error));
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    handleError(message: string, error) {
        this.errorMessage = message + ' (Server responded: ' + error + ')';
    }

    private updateForm(pageHelpContent : PageHelpContent) {
        this.pageHelpContent = pageHelpContent;
        this.formComponent.myForm.patchValue((pageHelpContent))
        console.log("patching",pageHelpContent);
    }

    private saveCustom() {
        if(this.formComponent.myForm.valid) {
            let pageHelpContent : PageHelpContent = this.formComponent.myForm.value;
            this._helpContentService.savePageHelpContent(pageHelpContent).subscribe(
                _ => console.log(_),
                err => this.errorMessage = err
            );
        } else {
            this.errorMessage = "Please fill all required fields";
        }

    }
}