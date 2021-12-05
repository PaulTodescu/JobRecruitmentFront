import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {CommentService} from "../services/comment/comment.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  comment: string | undefined;

  constructor(
    private injector: Injector,
    private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: { jobId: number }) { }

  public addComment(): void {
    if (this.comment === undefined) {
      this.onFail("Comment cannot be empty");
    }
    else if (this.comment.length < 10){
      this.onFail("Comment is too short");
    }
    else {
      this.commentService.addCommentToJob(this.data.jobId, this.comment).subscribe(
        () => {
          this.onSuccess();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }

  public onSuccess(): void {
    let dialogRef: MatDialogRef<AddCommentComponent> = this.injector.get(MatDialogRef);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Comment added successfully',
      showConfirmButton: false,
      timer: 2000
    }).then(function(){
      dialogRef.close();
    })
  }

  public onFail(message: string): void{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2500
    }).then(function(){})
  }

  ngOnInit(): void {
  }

}
