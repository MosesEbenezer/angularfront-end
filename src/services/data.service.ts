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

  async getBusinessProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.rest.get(
          environment.apiUrl+'/main/branch_businesses'
        );
        this.business = data['business'];
      }
    } catch (error) {
      this.error(error);
    }
  }

  private GET_BRANCHES = environment.apiUrl+"/main/branch_business"; // added to get branches belonging to a head business
  private GET_BUSINESS_ADMINS = environment.apiUrl+"/accounts/b/other_admin"; // added to get branches belonging to a head business

  //get all pos under a specific branch
  private GET_POS = environment.apiUrl+"/main/pos"
  private GET_POS_USERS = environment.apiUrl+"/accounts/pos_user"

  public getBranches() {
    // return this.httpClient.get(this.GET_BRANCHES); // this get data from a route with no "CheckJWT"
    return this.rest.get(this.GET_BRANCHES); //this gets the token from the header and attaches it in the get request.
                                            //Hence the system knows who logged in and fetches data based on that.
  }

  public getPOS() {
    // return this.httpClient.get(this.GET_BRANCHES); // this get data from a route with no "CheckJWT"
    return this.rest.get(this.GET_POS); //this gets the token from the header and attaches it in the get request.
                                            //Hence the system knows who logged in and fetches data based on that.
  }

  //get admins that belong to a head business
  public getAdmins() {
    return this.rest.get(this.GET_BUSINESS_ADMINS);
  }

  public getPOSUSers() {
    return this.rest.get(this.GET_POS_USERS);
  }


}
