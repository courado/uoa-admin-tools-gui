/**
 * Created by stefania on 7/13/17.
 */
import { Component, ViewChild } from '@angular/core';
import { PageContentFormComponent } from "./page-help-content-form.component";

@Component({
    selector: 'new-page-help-content',
    templateUrl: 'new-page-help-content.component.html',
})

export class NewPageHelpContentComponent {

    @ViewChild(PageContentFormComponent)
    public formComponent : PageContentFormComponent;

}