import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

@Injectable()
export class LoarderService {

    constructor(public loadingCtrl: LoadingController) {}

    presentLoading() {
        let loader = this.loadingCtrl.create({
        content: 'Please wait...'
        });
        loader.present();
        return loader;
    }
}