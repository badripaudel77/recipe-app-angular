import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    @Input('alertMessage') message: string; // can be set from outside component, just an i/p to this component.

    @Output() logoutDecision = new EventEmitter<boolean>();
    ngOnInit(): void {

    }

    closeAlertDialog() {
        this.logoutDecision.emit(false);
    }

    logout() {
        this.logoutDecision.emit(true);
    }

}