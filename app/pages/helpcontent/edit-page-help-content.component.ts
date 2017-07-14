/**
 * Created by stefania on 7/14/17.
 */
import { Component, ViewChild } from '@angular/core';
import { PageContentFormComponent } from "./page-help-content-form.component";

@Component({
    selector: 'edit-page-help-content',
    templateUrl: 'edit-page-help-content.component.html',
})

export class EditPageHelpContentComponent {

    @ViewChild(PageContentFormComponent)
    public formComponent : PageContentFormComponent;

}