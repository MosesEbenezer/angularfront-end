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

  constructor(private data: DataService, private rest: RestApiService, public dialog: MatDialog) { }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  }

  showRequest: Boolean = true;
  showSuccess: Boolean = false;
  trigger;

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
                          this.data.error('country is required')
                        }
                      } else {
                        this.data.error('LGA is required')
                      }
                    } else {
                      this.data.error('state is required')
                    }
                  } else {
                    this.data.error('town is required')
                  }
                } else {
                  this.data.error('street is required')
                }
              } else {
                this.data.error('password is required')
              }
            } else {
              this.data.error('phone is required')
            }
          } else {
            this.data.error('email is required')
          }
        } else {
          this.data.error('username is required')
        }
      } else {
        this.data.error('last name is required')
      }
    } else {
      this.data.error('first name is required')
    }
  }

  async requestSignup() {
    this.btnDisabled = true;
    try {
      if(this.validate()) {
        const data = await this.rest.post(
          environment.apiUrl+'register',
          {
            first_name: this.first_name,
            last_name: this.  last_name,
            user_name: this.  user_name,
            email: this.  email,
            phone: this.  phone,
            password: this.  password,
            street: this.  street,
            town: this.  town,
            state: this.  state,
            lga: this.  lga,
            country: this.  country,
          }
        );
        if (data['success']) {
          alert('User Saved successfully')
          this.data.success(' Request For Registration Successful');
          this.showRequest = false;
          this.showSuccess = true;
          this.trigger.drawn;

          this.first_name = '',
          this.last_name = '',
          this.user_name = '',
          this.email = '',
          this.phone = '',
          this.password = '',
          this.street = '',
          this.town = '',
          this.state = '',
          this.lga = '',
          this.country = ''
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message'])
    }
    this.btnDisabled = false;
  }
}

