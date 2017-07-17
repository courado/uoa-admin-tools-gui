/**
 * Created by stefania on 7/13/17.
 */
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PageContentFormComponent } from "./page-help-content-form.component";
import { PageHelpContent } from "../../domain/page-help-content";
import { HelpContentService } from "../../services/help-content.service";

@Component({
    selector: 'new-page-help-content',
    templateUrl: 'new-page-help-content.component.html',
})

export class NewPageHelpContentComponent {

    @ViewChild(PageContentFormComponent)
    public formComponent : PageContentFormComponent;

    private errorMessage : string = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _helpContentService: HelpContentService) {}

    private saveCustom() {

        this.errorMessage = null;
        
        if(this.formComponent.myForm.valid) {
            let pageHelpContent : PageHelpContent = this.formComponent.myForm.value;
            this._helpContentService.savePageHelpContent(pageHelpContent).subscribe(
                _ => this.router.navigate(['/pageContents']),
                err => this.handleError('System error saving page content', err)
            );
        } else {
            this.errorMessage = "Please fill all required fields";
        }
    }

    handleError(message: string, error) {
        this.errorMessage = message + ' (Server responded: ' + error + ')';

    }
}