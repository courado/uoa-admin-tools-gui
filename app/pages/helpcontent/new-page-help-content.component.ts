/**
 * Created by stefania on 7/13/17.
 */
import { Component, ViewChild } from '@angular/core';
import { PageContentFormComponent } from "./page-help-content-form.component";
import {PageHelpContent} from "../../domain/page-help-content";
import {HelpContentService} from "../../services/help-content.service";

@Component({
    selector: 'new-page-help-content',
    templateUrl: 'new-page-help-content.component.html',
})

export class NewPageHelpContentComponent {

    @ViewChild(PageContentFormComponent)
    public formComponent : PageContentFormComponent;

    private errorMessage : string = "";

    constructor(
        private _helpContentService: HelpContentService) {}

    private saveCustom() {
        console.log("Saving", this.formComponent.myForm.value);
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