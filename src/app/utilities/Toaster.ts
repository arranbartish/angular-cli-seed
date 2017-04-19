import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class Toaster {
    public jumped?: (toast: ToastData) => void;
    public removed?: (toast: ToastData) => void;

    constructor(private toastyService: ToastyService) {
    }

    public default(message: string, title: string = '') {
        this.toastyService.default(this.toasterOptions(title, message));
    }

    public info(message: string, title: string = 'Info') {
        this.toastyService.info(this.toasterOptions(title, message));
    }

    public success(message: string, title: string = 'Success') {
        this.toastyService.success(this.toasterOptions(title, message));
    }

    public wait(message: string, title: string = 'Please wait...') {
        this.toastyService.wait(this.toasterOptions(title, message));
    }

    public warning(message: string, title: string = 'Warning!') {
        this.toastyService.warning(this.toasterOptions(title, message));
    }

    public error(message: string, title: string = 'Error!') {
        this.toastyService.error(this.toasterOptions(title, message));
    }

    private toasterOptions(title: string, message: string): ToastOptions {
        return <ToastOptions> {
            title: title || '',
            msg: message || '',
            showClose: false,
            theme: 'bootstrap',
            timeout: 5000,
            onAdd: this.jumped != null ? this.jumped : null,
            onRemove: this.removed != null ? this.removed : null
        };
    }
}
