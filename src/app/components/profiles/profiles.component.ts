import { Component, OnInit } from '@angular/core';
import {ProfilesService} from "../../services/profiles.service";
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  providers: [ProfilesService]
})
export class ProfilesComponent implements OnInit {
  users = [{id:1},{username:''},{first_name:''}, {last_name:''},{email:''}];
  selectedProfile: any;
  constructor(private api: ProfilesService) {
    this.getClientsProfiles();
    this.selectedProfile ={id:'', username:'', first_name:'', last_name:'', }
  }
  getClientsProfiles=() =>{
    this.api.getAllUsers().subscribe(
      data => {
        this.users =data
      },
      error => {
        console.log(error)
      }
    )
  }
  clientClicked = (user:any)=>{
    this.api.getOneUser(user.id).subscribe(
      data => {
        this.selectedProfile = data;
      },
      error => {
        console.log(error)
      }
    )
  }
  updateProfile =() =>{
    this.api.updateUser(this.selectedProfile).subscribe(
      data => {
        this.getClientsProfiles();
        alert("profile updated successfully")
      },
      error => {
        console.log(error)
        alert("profile update failed")
      }
    )
  }

  ngOnInit(): void {
  }
}
