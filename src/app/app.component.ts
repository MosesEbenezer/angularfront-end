import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from './modal/modal.component';

import {
  RestApiService
} from '../services/rest-api.service';
import {
  DataService
} from '../services/data.service';
import { environment } from 'src/environments/environment';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'registration-form';

  btnDisabled = false;

  first_name = ''
  last_name = ''
  user_name = ''
  email = ''
  phone = ''
  password = ''
  street = ''
  town = ''
  state = ''
  lga = ''
  country = ''

  users = []

  constructor(private dataService: DataService, private rest: RestApiService, public dialog: MatDialog) { }

  ngOnInit() {}

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      height: '450px',
      width: '700px',

    });
  }

  validate() {
    if(this.first_name) {
      if(this.last_name) {
        if(this.user_name) {
          if(this.email) {
            if(this.phone) {
              if(this.password) {
                if(this.street) {
                  if(this.town) {
                    if(this.state) {
                      if(this.lga) {
                        if(this.country) {
                          return true
                        } else {
                          this.dataService.error('country is required')
                        }
                      } else {
                        this.dataService.error('LGA is required')
                      }
                    } else {
                      this.dataService.error('state is required')
                    }
                  } else {
                    this.dataService.error('town is required')
                  }
                } else {
                  this.dataService.error('street is required')
                }
              } else {
                this.dataService.error('password is required')
              }
            } else {
              this.dataService.error('phone is required')
            }
          } else {
            this.dataService.error('email is required')
          }
        } else {
          this.dataService.error('username is required')
        }
      } else {
        this.dataService.error('last name is required')
      }
    } else {
      this.dataService.error('first name is required')
    }
  }

  async requestSignup() {
    this.btnDisabled = false;
    try {
      if(this.validate()) {
        const data = await this.rest.post(
          environment.apiUrl+'register',
          {
            first_name: this.first_name,
            last_name: this.last_name,
            user_name: this.user_name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            street: this.street,
            town: this.town,
            state: this.state,
            lga: this.lga,
            country: this.country,
          }
        );
        if (data['success']) {
          alert('User Saved successfully')
          this.dataService.success(' Request For Registration Successful');

          this.first_name = ''
          this.last_name = ''
          this.user_name = ''
          this.email = ''
          this.phone = ''
          this.password = ''
          this.street = ''
          this.town = ''
          this.state = ''
          this.lga = ''
          this.country = ''

          this.openDialog()

        } else {
          this.dataService.error(data['message']);
        }
      }
    } catch (error) {
      this.dataService.error(error['message'])
    }
    // this.btnDisabled = true;
  }
}

