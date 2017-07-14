/**
 * Created by stefania on 7/14/17.
 */
import { Component, ViewChild } from '@angular/core';
import { PageContentFormComponent } from "./page-help-content-form.component";
import { Subscription } from "rxjs/Subscription";
import { HelpContentService } from "../../services/help-content.service";
import { PageHelpContent } from "../../domain/page-help-content";

@Component({
    selector: 'edit-page-help-content',
    templateUrl: 'edit-page-help-content.component.html',
})

export class EditPageHelpContentComponent {

    @ViewChild(PageContentFormComponent)
    public formComponent : PageContentFormComponent;

    private sub: Subscription;

    private pageHelpContent: PageHelpContent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _helpContentService: HelpContentService) {}

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this._helpContentService.getPageHelpContents(id).subscribe(
                pageHelpContent => this.pageHelpContent = pageHelpContent,
                error => this.handleError('System error retrieving page help content', error));
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    handleError(message: string, error) {
        this.errorMessage = message + ' (Server responded: ' + error + ')';
    }
}