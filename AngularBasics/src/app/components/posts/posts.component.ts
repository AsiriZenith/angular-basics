import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PostService } from '../../services/posts.service'
import { Post } from './posts.model'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postForm: FormGroup
  posts: Post[]

  constructor(private postservice: PostService) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    })
    this.getPost()
  }

  getPost() {
    this.postservice.fetchPost().subscribe((data) => {
      this.posts = data
    })
  }

  onCreatePost() {
    console.log(this.postForm.value)
    const postdata = this.postForm.value
    this.postservice.createPost(postdata).subscribe((res) => {
      this.getPost()
    })
  }
}
