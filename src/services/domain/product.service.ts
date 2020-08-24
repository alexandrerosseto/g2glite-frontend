import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) {

    }

    findByCategory(category_id: string, page : number = 0, linesPerPage : number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    findById(product_id: string) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`);
    }
}