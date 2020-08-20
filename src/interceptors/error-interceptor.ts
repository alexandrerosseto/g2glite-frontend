import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Error caught by interceptor:");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 422:
                        this.handle422(errorObj);
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Error 401: Authentication failed',
            message: 'Incorrect email or password',
            enableBackdropDismiss: false,
            buttons: [
                { text: 'Ok' }
            ]
        });
        alert.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Error 422: Validation',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                { text: 'Ok' }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        console.log('default: ' + errorObj.errors);
        let alert = this.alertCtrl.create({
            title: 'Error ' + errorObj.status + ': ' + errorObj.error,
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                { text: 'Ok' }
            ]
        });
        alert.present();
    }

    private listErrors(messages: FieldMessage[]) : string {
        let err: string = '';
        for (var i=0; i<messages.length; i++) {
            err += '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
        }
        return err;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};