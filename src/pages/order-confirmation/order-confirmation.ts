import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClientDTO } from '../../models/client.dto';
import { AddressDTO } from '../../models/address.dto';
import { ClientService } from '../../services/domain/client.service';
import { OrderService } from '../../services/domain/order.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: OrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService,
    public orderService: OrderService,
    public alertCtrl: AlertController) {

    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.order.client.id)
    .subscribe(response => {
      this.client = response as ClientDTO;
      this.address = this.findAddress(this.order.shippingAddress.id, response['addresses']);
    },
    error => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  private findAddress(id: string,list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    this.orderService.insert(this.order)
    .subscribe(response => {
      this.cartService.createOrClearCart();
      console.log(response.headers.get('location')); //backend commit: 358ceb4750b47aa65de389658ed3cc3cb40071c7 / "Authorization and authentication working correctly"

      let alert = this.alertCtrl.create({
        title: 'Order Confirmation',
        message: 'Your order was successfully received!',
        enableBackdropDismiss: false,
        buttons: [
            { text: 'Ok' }
        ]
    });
    alert.present();

      this.navCtrl.setRoot('HomePage');
    },
    error => {
      if (error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    })
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }
}
