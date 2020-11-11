import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'; //not included yet

import { NavigationStart, Router } from '@angular/router';

import { RestApiService } from './rest-api.service'; //also not included yet.

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  message = '';
  messageType = 'danger';

  user: any;
  business: any;

  constructor(private router: Router, private rest: RestApiService, private httpClient: HttpClient) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message) {
    this.messageType = 'warning';
    this.message = message;
  }

  private GET_USERS = environment.apiUrl+"all_users";

  private GET_ONE_USER = environment.apiUrl+"find_user";

  // private UPDATE_USER = environment.apiUrl+"update_user";

  private DELETE_USER = environment.apiUrl+"delete_user"

  //get admins that belong to a head business
  public getUsers() {
    return this.rest.get(this.GET_USERS);
  }

  public getOneUser(email) {
    return this.rest.get(this.GET_ONE_USER+`/${email}`)
  }

  // public upDateUserData(_id) {
  //   return this.rest.patch(this.UPDATE_USER+`/${_id}`)
  // }

  public deleteAUser(_id) {
    return this.rest.delete(this.DELETE_USER+`/${_id}`)
  }


}
