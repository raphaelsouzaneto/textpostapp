import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TextPost } from './textpost';
import { TextPostService } from './textpost.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public textPosts: TextPost[];

  constructor(private textPostService: TextPostService){
    this.textPosts = [];
  }

  ngOnInit(){
    this.getTextPosts();
  }

  public getTextPosts(): void {
    this.textPostService.getTextPosts().subscribe(
      (response: TextPost[]) => {
        this.textPosts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    )
  }

  public onOpenModal(): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addTextPostModal');
    if(container != null){
      container.appendChild(button);
    }
    button.click(); 
  }   

  public onAddTextPost(addForm: NgForm): void {
    const e = document.getElementById('add-text-form');
    if(e!=null){
      e.click();
    }
    this.textPostService.addTextPost(addForm.value).subscribe(
      (response: TextPost) => {
        console.log(response);
        this.getTextPosts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpvoteTextPost(id: number): void {
    this.textPostService.upvoteTextPost(id).subscribe(
      (response: TextPost) => {
        this.getTextPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    )
  }
}
