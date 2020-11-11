import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DataService } from '../../services/data.service';
import { RestApiService } from '../../services/rest-api.service';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  displayedColumns = [
    'seqNo',
    'FirstName',
    'LastName',
    'Email',
    'Phone',
    'view',
    'delete',
  ];

  users = [];
  user: {};

  first_name = '';
  last_name = '';
  user_name = '';
  email = '';
  phone = '';
  password = '';
  street = '';
  town = '';
  state = '';
  lga = '';
  country = '';
  _id = '';

  showTable: Boolean = true;
  showEdit: Boolean = false;

  constructor(
    private dataService: DataService,
    private rest: RestApiService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  back() {
    this.showTable = true;
    this.showEdit = false;
    this.populateUsers()
  }

  async populateUsers() {
    this.dataService.getUsers().then(
      (data1: any[]) => {
        this.users = data1;
        console.log('users', this.users);
      },
      (err) => console.log(err)
    );
  }

  ngOnInit() {
    this.populateUsers();
  }

  showDetails(email: String) {

    this.dataService.getOneUser(email).then(
      (data) => {
        // this.user = data
        console.log('user', this.user);
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.user_name = data.user_name;
        this.email = data.email;
        this.phone = data.phone;
        this.street = data.street;
        this.town = data.town;
        this.state = data.state;
        this.lga = data.lga;
        this.country = data.country;
        this._id = data._id;
      },
      (err) => console.log(err)
    );

    this.showTable = false;
    this.showEdit = true;
  }

  async updateUser(_id: String) {
    try {
      const data = await this.rest.patch(
        environment.apiUrl + `update_user/${_id}`,
        {
          first_name: this.first_name,
          last_name: this.last_name,
          user_name: this.user_name,
          email: this.email,
          phone: this.phone,
          // password: this.password,
          street: this.street,
          town: this.town,
          state: this.state,
          lga: this.lga,
          country: this.country,
        }
      );
      if (data['success']) {
        alert('User Updated successfully');
        this.dataService.success(' Update Successful');
        this.back();
      } else {
        this.dataService.error(data['message']);
      }
    } catch (e) {
      console.log(e);

    }
  }

  async deleteUser(_id: String) {
    try {
      const data = await this.dataService.deleteAUser(_id);

      if (data['success']) {
        alert('User Deleted successfully');
        this.dataService.success(' Delete Successful');
        this.back();
      } else {
        this.dataService.error(data['message']);
      }

    } catch (e) {
      console.log(e);
    }
  }
}
