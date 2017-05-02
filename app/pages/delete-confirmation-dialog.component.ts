/**
 * Created by stefania on 5/2/17.
 */
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'delete-confirmation-dialog',
    templateUrl: './delete-confirmation-dialog.component.html'
})
export class DeleteConfirmationDialogComponent {

    @ViewChild('autoShownModal')
    public autoShownModal:ModalDirective;

    @Input()
    public isModalShown:boolean = false;

    @Output() emmitObject: EventEmitter<any> = new EventEmitter();

    private _ids: string[] = [];

    public set ids(ids: string[]) {
        this._ids = ids;
    }

    public showModal():void {
        this.isModalShown = true;
    }

    public hideModal():void {
        this.autoShownModal.hide();
    }

    public onHidden():void {
        this.isModalShown = false;
    }

    public confirmedAction() {
        this.emmitObject.emit(this._ids);
        this.hideModal();
    }

    // public saveCustom(obj : any) {
    //     if (this.type == 'topic') {
    //         this._faqService.saveTopic(<Topic> obj).subscribe(
    //             data => this.emmitObject.emit(data),
    //             error => this.emmitError.emit(error)
    //         );
    //     } else if (this.type == 'question') {
    //         return;
    //     }
    //     this.hideModal();
    // }
}