import { Component, OnInit } from '@angular/core';
import {PostsService } from "../../services/posts.service";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css'],
  providers:[PostsService]
})
export class InterventionsComponent implements OnInit {
  title!: string;
  info!: string;
  location!: string;
  image!: File;

  posts = [{id:1},{url:'testurl'},{title:'test'}, {info:'test'},{location:'location'},{stages:'stages'},
    {created:'created'},{image:'https://res.cloudinary.com/ireporter2022/image/upload/v1656953718/crime5_r8mbnm.jpg'}];
  selectedPost: any;

  constructor(private api: PostsService, private http: HttpClient) {
    this.getInterventions();
    this.selectedPost ={id:-1, title:'', info:'', location:'', }
  }

  getInterventions=() =>{
    this.api.getAllIntervention().subscribe(
      data => {
        this.posts =data
      },
      error => {
        console.log(error)
      }
    )
  }

  interventionClicked = (post:any)=>{
    this.api.getOneIntervention(post.id).subscribe(
      data => {
        this.selectedPost = data;

      },
      error => {
        console.log(error)
      }
    )
  }

  updatePost =() =>{
    this.api.updateIntervention(this.selectedPost).subscribe(
      data => {
        this.getInterventions();

      },
      error => {
        console.log(error)
      }
    )
  }
  onDetailsChanged(event: any) {
    this.title = event.target.value;
    
  }
  onInfoChanged(event: any) {
    this.info = event.target.value;
  }
  onLocationChanged(event: any) {
    this.location = event.target.value;
  
  }


  onImageChanged(event: any) {
    this.image = event.target.files[0];
  }
  createPost() {
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('info', this.info);
    uploadData.append('location', this.location);
    uploadData.append('image', this.image, this.image.name);
    this.http.post('http://127.0.0.1:8000/api/interventions/', uploadData).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
  deletePost =() =>{
    this.api.deleteIntervention(this.selectedPost.id).subscribe(
      data => {
        this.getInterventions();

      },
      error => {
        console.log(error)
      }
    )
  }


  ngOnInit(): void {
  }

}
