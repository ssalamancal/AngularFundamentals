import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { userInfo } from "os";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: Http) {
    }

    loginUser(userName: string, password: string) {
        let header: Headers = new Headers({ 'Content-Type': 'application/json' })
        let options: RequestOptions = new RequestOptions({ headers: header })
        let user = { username: userName, password: password }

        return this.http.post('/api/login', JSON.stringify(user), options)
            .do((response) => {
                if (response) {
                    this.currentUser = <IUser>response.json().user
                }
            }).catch(error => {
                return Observable.of(false)
            })
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity')
            .map((response: any) => {
                if (response._body) {
                    return response.json()
                } else {
                    return {}
                }
            })
            .do(currentUser => {
                if (!!currentUser.userName) {                    
                    this.currentUser = currentUser
                }
            })
            .subscribe()
    }

    isAuthenticated() {
        return !!this.currentUser
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
    }
}