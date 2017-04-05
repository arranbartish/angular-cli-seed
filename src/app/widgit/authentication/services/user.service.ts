import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {
    constructor() { }
    getByUsername(username: string) {
        // find by name.
    }

    register(user: User): Observable<User> {
        // add a new user in state
        return of(new User());
    }

    delete(id: number) {
        // delete a  user
    }


}