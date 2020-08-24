import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';
import { LoarderService } from '../../services/loader.service';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public loaderService: LoarderService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let category_id = this.navParams.get('categoryId');
    let loader = this.loaderService.presentLoading();
    this.productService.findByCategory(category_id)
    .subscribe(response => {
      this.items = response['content'];
      loader.dismiss();
      this.loadImageUrls();
    },
    error => {});
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
    }
  }

  showDetail(product_id: string) {
    this.navCtrl.push('ProductDetailPage', {productId: product_id});
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
