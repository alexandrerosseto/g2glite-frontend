import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../models/credentials.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';
import { CartService } from "./domain/cart.service";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public cartService: CartService) {
    }

    authenticate(creds: CredentialsDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        creds, 
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, 
        // The token is automatically included in the request by error-interceptor
        {}, 
        {
            observe: 'response',
            responseType: 'text' // in order to not receive an parse error due to the framework consider this as a reponse in JSON format
        });
    }

    successLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart;
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}